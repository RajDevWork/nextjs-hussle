import express from 'express'
import { createUser } from '../controllers/auth.controller.js'
const router = express.Router()


router.post("/register",createUser)

router.get("/health-check",(req,res)=>{
    res.status(200).json({
        message:'ok'
    })
})


export default router