import express from 'express'
import AuthRouter from './routes/auth.js'
const app = express();



app.use("/api/user",AuthRouter);


export default app