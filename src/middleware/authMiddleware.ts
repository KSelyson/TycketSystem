import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

dotenv.config();

const secret = process.env.JWT_SECRET as string;

const AuthMiddle = (req: Request, res: Response, next: NextFunction) => {
    // pega o token do header
    const token = req.headers.authorization;

    // se não tiver token, retona
    if(!token) return res.status(401).json({erro: "Sem Token, Acesso negado."});


    try{
        jwt.verify(token, secret); //verifica o token

        next(); //Passa normalmente
    } catch(e){
        // 
        return res.status(401).json({error:"Token inválido."});
    }

};

module.exports = AuthMiddle;