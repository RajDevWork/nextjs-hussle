const dns = require('dns');
const net = require('net');

// Step 1: Get the MX record for the email domain
function getMxRecord(domain) {
    return new Promise((resolve, reject) => {
        dns.resolveMx(domain, (err, addresses) => {
            if (err || !addresses || addresses.length === 0) {
                return reject(new Error('No MX records found for this domain.'));
            }
            // Sort by priority (lowest number first)
            addresses.sort((a, b) => a.priority - b.priority);
            resolve(addresses[0].exchange);
        });
    });
}

// Steps 2-5: Connect to the server and run SMTP commands
function verifyMailbox(mxServer, targetEmail, senderEmail) {
    return new Promise((resolve) => {
        const client = net.createConnection(25, mxServer);
        let step = 0;
        let responseBuffer = '';

        // Set a 10-second timeout so the script doesn't hang
        client.setTimeout(10000);
        client.on('timeout', () => {
            client.end();
            resolve({ valid: false, reason: 'Timeout connecting to mail server.' });
        });

        client.on('data', (data) => {
            responseBuffer += data.toString();
            
            // Wait until we get the full multi-line response (ending in newline)
            if (!responseBuffer.endsWith('\n')) return;
            
            const response = responseBuffer.trim();
            responseBuffer = ''; // Clear buffer for next step
            const code = parseInt(response.substring(0, 3));

            // SMTP Handshake Logic Flow
            if (step === 0) {
                // Server greeted us, reply with HELO
                if (code === 220) {
                    client.write(`HELO check.com\r\n`);
                    step++;
                } else {
                    client.end();
                    resolve({ valid: false, reason: `Server connection failed: ${response}` });
                }
            } else if (step === 1) {
                // HELO accepted, send MAIL FROM
                if (code === 250) {
                    client.write(`MAIL FROM:<${senderEmail}>\r\n`);
                    step++;
                } else {
                    client.end();
                    resolve({ valid: false, reason: `HELO rejected: ${response}` });
                }
            } else if (step === 2) {
                // MAIL FROM accepted, send RCPT TO
                if (code === 250) {
                    client.write(`RCPT TO:<${targetEmail}>\r\n`);
                    step++;
                } else {
                    client.end();
                    resolve({ valid: false, reason: `Sender rejected: ${response}` });
                }
            } else if (step === 3) {
                // Final Result: RCPT TO response
                client.write(`QUIT\r\n`);
                client.end();
                
                if (code === 250) {
                    resolve({ valid: true, reason: 'Mailbox exists.' });
                } else if (code === 550 || code === 551 || code === 554) {
                    resolve({ valid: false, reason: 'Mailbox does not exist (Invalid).' });
                } else {
                    resolve({ valid: false, reason: `Server blocked or deferred check: ${response}` });
                }
            }
        });

        client.on('error', (err) => {
            resolve({ valid: false, reason: `Connection error: ${err.message}` });
        });
    });
}

// Main Wrapper Function
async function validateEmail(email) {
    const parts = email.split('@');
    if (parts.length !== 2) {
        return { valid: false, reason: 'Malformed email syntax.' };
    }
    
    const domain = parts[1];
    const senderEmail = 'test@yourdomain.com'; // Use a valid domain if possible

    try {
        const mxServer = await getMxRecord(domain);
        const result = await verifyMailbox(mxServer, email, senderEmail);
        return result;
    } catch (error) {
        return { valid: false, reason: error.message };
    }
}

// --- Run the Script ---
const targetEmail = 'en.monu7@yahoo.in'; 

validateEmail(targetEmail).then(result => {
    console.log(`Result for ${targetEmail}:`, result);
});
