import { type NextFunction, type Request, type Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"
const JWT_SECRET = process.env.JWT_SECRET as string;

function authMiddleware(req: Request, res: Response, next: NextFunction){
    const token = req.headers["token"];
    const decoded = jwt.verify(token as string, JWT_SECRET) as JwtPayload;

    if(decoded){
        req.userId = decoded.id;    
        next();
    }else{
        res.status(403).json({
            message:"Incorrect credentials"
        })
    }
}

export default {
    authMiddleware
};