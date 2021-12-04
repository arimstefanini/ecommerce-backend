import jwt from "jsonwebtoken";
import "dotenv/config";

export const verifyToken = (req:any, res:any, next:any)=>{
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC as string, (err:any,user:any)=>{
            if(err) res.status(403).json("Token inválido");
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("Falha na autenticação");
    }
};

export const verifyTokenAndAuthorization = (req:any,res:any,next:any)=>{
    verifyToken(req,res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json("Falha na autenticação");
        }
    });
};

export const verifyTokenAndAdmin = (req:any,res:any,next:any)=>{
    verifyToken(req,res, ()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("Falha na autenticação");
        }
    });
};

