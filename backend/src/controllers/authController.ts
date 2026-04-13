import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

//GetAll || Buscar todos os usuários (Deixar a rota privada)
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select('-password'); //pega todo mundo e coloca no array users
        res.status(200).json({ //retorna
            count: users.length, 
            users }); 
    } catch (e: any) { //captura de erro
        res.status(500).json({ error: 'Erro ao buscar usuários', details: e.message });
    }
};

//GetByID || Buscar por ID especifico (Deixar a rota privada)
export const getByIdUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string }; //pega o id da requisição

        if (!mongoose.Types.ObjectId.isValid(id)) { //verifica se o id é valido 
            return res.status(400).json({ error: "ID inválido" });
        }

        const user = await User.findById(id).select('-password'); //busca o usuário por ID
        if (!user) { //se não encontrar o usuário, retorna erro
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json(user);
    } catch (e: any) {
        res.status(500).json({ error: 'Erro ao buscar usuário', details: e.message });
    }
};

// GetMe || Buscar os dados do usuário autenticado (Deixar a rota privada)
export const getMe = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user?._id).select('-password'); //busca o usuário autenticado por ID, excluindo a senha

        if (!user) { //se não encontrar o usuário, retorna erro
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json(req.user); //retorna os dados do usuário autenticado
    } catch (e: any) {
        res.status(500).json({ error: 'Erro ao buscar dados do usuário', details: e.message });
    }
};

//Create/Post || Criar um novo usuário (Deixar a rota pública)
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password} = req.body; //pega as variaveis da req

        const role = req.path.includes('admin') ? 'admin' : 'user'; //verifica se a rota é para criar um admin ou um usuário comum

        const hashedPassword = await bcrypt.hash(password, 10); //Cria o hash da senha com um salt de 10 rounds

        const newUser = new User({ name, email, password: hashedPassword, role: role}); //cria novo objeto com senha hash
        await newUser.save(); //salva no bd

        //Retorna a mensagem com o objeto
        res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
    } catch (e: any) {
        res.status(500).json({ error: 'Erro ao criar usuário', details: e.message });
    }
};

//Post || Login de usuário (Deixar a rota pública)
export const loginUser = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body; //pega as variaveis da req

        const user = await User.findOne({ email }); //busca o usuário por email
        if (!user) { //se não encontrar o usuário, retorna erro
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password); //compara a senha fornecida com a senha hash armazenada
        if (!isPasswordValid) { //se a senha for inválida, retorna erro
            return res.status(401).json({ error: 'Senha inválida' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email }, //payload do token
            process.env.JWT_SECRET as jwt.Secret, //segredo para assinar o token
            { expiresIn: '1h' } //expiração do token até fazer login novamente, nesse caso 1 hora
        )

        res.status(200).json({ message: 'Login bem-sucedido', user, token }); //retorna mensagem de sucesso e o usuário
    } catch (e: any) {
        res.status(500).json({ error: 'Erro ao fazer login', details: e.message });
    }
}

// Delete || Deletar um usuário (Deixar a rota privada)
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string }; //pega o id da requisição

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        if (req.user?._id.toString() !== id) { //verifica se o usuário autenticado é o mesmo que está tentando deletar
            return res.status(403).json({ error: 'Acesso negado. Você só pode deletar seu próprio usuário.' });
        }

        const deletedUser = await User.findByIdAndDelete(id); //encontra o usuário e deleta

        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json({ message: 'Usuário deletado com sucesso', user: deletedUser });
    } catch (e: any) {
        res.status(500).json({ error: 'Erro ao deletar usuário', details: e.message });
    }
};

