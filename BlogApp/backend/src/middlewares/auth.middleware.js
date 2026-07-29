import jwt from 'jsonwebtoken'
import { StatusCodes } from "http-status-codes"

export const IdentifyUser = (req,res,next)=>{
    try {
        const {token} = req.cookies;
        if(!token){
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message:"Authorization token missing!"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

        
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message:"Unathorized access!"
        })
    }
}