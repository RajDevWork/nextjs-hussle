import express from 'express'
import dotenv from 'dotenv'
import app from './src/app.js'
import connectToDB from './src/config/connection.js';
const PORT = process.env.PORT || 3000;

//accessing environment variable
dotenv.config()

//connect to db
connectToDB();

app.listen(PORT,()=>{
    console.log(`Server is running on port : ${PORT}`)
})






