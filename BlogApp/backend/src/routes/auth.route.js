import express from 'express'
import { registerUser, loginUser,logOutUser } from '../controllers/auth.controller.js'
const router = express.Router()


router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/logout",logOutUser)

router.get("/health-check",(req,res)=>{
    res.status(200).json({
        message:'ok'
    })
})


export default router