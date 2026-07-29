import express from 'express'
const router = express.Router()


router.post("/register",(req,res)=>{

})

router.get("/health-check",(req,res)=>{
    res.status(200).json({
        message:'ok'
    })
})


export default router