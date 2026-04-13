import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import { User, IUser } from '../models/User';

dotenv.config();

declare global {
    namespace Express {
        interface Request {
            user?: IUser; // Adicione a propriedade 'user' ao tipo Request, assim da pra usar req.user em outros lugares do código sem problemas de tipagem
        }
    }
}

const secret = process.env.JWT_SECRET as jwt.Secret;

export const AuthMiddle = async(req: Request, res: Response, next: NextFunction) => {
    let token;
    //variavel que vai ser alterada para receber o token do header da requisição

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, secret) as { id: string };
            //decodifica o token para obter o ID do usuário

            const user = await User.findById(decoded.id).select('-password'); 
            //busca o usuário no banco de dados, excluindo a senha

            if (!user) { //se não encontrar o usuário, retorna erro
                return res.status(401).json({ error: 'Usuário não encontrado.' });
            }

            req.user = user; //adiciona o usuário à requisição para uso posterior
            next(); 
        } catch (e) { //captura de erro, como token inválido ou expirado
            return res.status(401).json({ error: 'Token inválido.' });
        }
    }

    if (!token) { //se não vier nada, retorna erro de acesso negado
        return res.status(401).json({ error: 'Sem token, acesso negado.' });
    }
};

// Middleware para verificar se o usuário é administrador
export const AdminAuth = (req: Request, res: Response, next: NextFunction) => { 
    if (req.user?.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ error: 'Acesso restrito a administradores.' });
    }
};