import express from 'express'
import AuthRouter from './routes/auth.js'
import cookieParser from 'cookie-parser';
import { StatusCodes } from 'http-status-codes';
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",AuthRouter);




// centralize error handling
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === StatusCodes.BAD_REQUEST && "body" in err) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Invalid JSON format"
        });
    }

    next(err);
});

export default app