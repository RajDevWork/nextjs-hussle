const fs = require('fs');
const dns = require('dns').promises;
const net = require('net');
const csv = require('csv-parser');
const fastCsv = require('fast-csv');

// --- Helper: Local Disposable Check ---
// In production, load this array from a database or a downloaded text file
const DISPOSABLE_DOMAINS = new Set(['mailinator.com', '10minutemail.com', 'trashmail.com']);
const SPAM_ROLES = new Set(['spam', 'honeypot', 'trap', 'abuse', 'trouble']);

function checkLocalFilters(username, domain) {
    if (DISPOSABLE_DOMAINS.has(domain.toLowerCase())) return 'Disposable';
    if (SPAM_ROLES.has(username.toLowerCase())) return 'Spam';
    return null;
}

// --- Helper: DNS MX Resolution ---
async function getBestMxRecord(domain) {
    try {
        const addresses = await dns.resolveMx(domain);
        if (!addresses || addresses.length === 0) return null;
        addresses.sort((a, b) => a.priority - b.priority);
        return addresses[0].exchange;
    } catch {
        return null;
    }
}

// --- Helper: SMTP Command Promise ---
function sendSmtpCommand(socket, command, expectedCode) {
    return new Promise((resolve) => {
        socket.once('data', (data) => {
            const response = data.toString();
            const code = parseInt(response.substring(0, 3));
            if (code === expectedCode || (expectedCode === 250 && code === 251)) {
                resolve({ success: true, code, response });
            } else {
                resolve({ success: false, code, response });
            }
        });
        socket.write(command + '\r\n');
    });
}

// --- Core Logic: The Double SMTP Check ---
function performSmtpVerification(mxServer, targetEmail, domain) {
    return new Promise((resolve) => {
        const socket = net.createConnection(25, mxServer);
        socket.setTimeout(7000); // 7 second timeout per check

        let step = 'CONNECT';

        socket.once('data', async (data) => {
            const code = parseInt(data.toString().substring(0, 3));
            if (code !== 220) {
                socket.destroy();
                return resolve('Invalid');
            }

            try {
                // 1. Handshake
                let res = await sendSmtpCommand(socket, 'HELO my-mail-server.com', 250);
                if (!res.success) throw new Error('HELO_FAIL');

                // 2. Sender Identity
                res = await sendSmtpCommand(socket, 'MAIL FROM:<verifier@my-mail-server.com>', 250);
                if (!res.success) throw new Error('SENDER_REJECTED');

                // 3. Test Real Target Email
                const realCheck = await sendSmtpCommand(socket, `RCPT TO:<${targetEmail}>`, 250);
                
                if (!realCheck.success) {
                    // Check if server is temporarily greylisting (450/451/452)
                    if (realCheck.code >= 400 && realCheck.code < 500) {
                        socket.write('QUIT\r\n');
                        socket.end();
                        return resolve('Greylisted / Retry');
                    }
                    socket.write('QUIT\r\n');
                    socket.end();
                    return resolve('Invalid');
                }

                // 4. Test Fake Email to detect Catch-all status
                const fakeEmail = `nonexistent_random_user_${Date.now()}@${domain}`;
                const fakeCheck = await sendSmtpCommand(socket, `RCPT TO:<${fakeEmail}>`, 250);

                socket.write('QUIT\r\n');
                socket.end();

                if (fakeCheck.success) {
                    resolve('Catchall');
                } else {
                    resolve('Deliverable');
                }

            } catch (err) {
                socket.destroy();
                resolve('Invalid'); // Treat structural network drops or blocking as Invalid/Unreachable
            }
        });

        socket.on('timeout', () => { socket.destroy(); resolve('Invalid'); });
        socket.on('error', () => { socket.destroy(); resolve('Invalid'); });
    });
}

// --- Main Engine Process ---
async function verifyEmailAddress(email) {
    const parts = email.trim().split('@');
    if (parts.length !== 2) return 'Invalid';

    const [username, domain] = parts;

    // Phase 1: Local Pattern Analysis
    const localStatus = checkLocalFilters(username, domain);
    if (localStatus) return localStatus;

    // Phase 2: DNS Records Validation
    const mxServer = await getBestMxRecord(domain);
    if (!mxServer) return 'Invalid';

    // Phase 3: Active SMTP Matrix Checks
    return await performSmtpVerification(mxServer, email, domain);
}

// --- Worker Loop to process your CSV file securely ---
async function main() {
    const inputPath = './emails.csv';
    const outputPath = './verified_emails.csv';

    const writeStream = fs.createWriteStream(outputPath);
    const csvStream = fastCsv.format({ headers: true });
    csvStream.pipe(writeStream);

    console.log('🔄 Booting custom email engine...');

    fs.createReadStream(inputPath)
        .pipe(csv())
        .on('data', async (row) => {
            const emailKey = Object.keys(row).find(k => k.toLowerCase().includes('email'));
            if (!emailKey || !row[emailKey]) return;

            const email = row[emailKey];
            
            // Note: For extreme production performance, wrap this execution block 
            // inside a worker pool or a concurrency limiter (like 'p-queue')
            const finalStatus = await verifyEmailAddress(email);

            csvStream.write({
                ...row,
                Verification_Status: finalStatus
            });
            console.log(`Processed: ${email} -> ${finalStatus}`);
        })
        .on('end', () => {
            console.log('🏁 Process complete. Local output generated.');
        });
}

main();
