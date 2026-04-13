import { Router } from 'express';
import { getAllUsers, getByIdUser, getMe, registerUser, deleteUser, loginUser } from '../controllers/authController';
import { AuthMiddle, AdminAuth } from '../middleware/authMiddleware';
import eventRouter from './eventRoute';

const userRouter = Router();

eventRouter.route('/users')
    .get(AuthMiddle, AdminAuth, getAllUsers) // Rota privada para obter todos os usuários

userRouter.route('/users/register')
    .post(registerUser); // Rota pública para criar um novo usuário

userRouter.route('/users/login')
    .post(loginUser);

userRouter.route('/users/register/admin')
    .post(registerUser); // Rota privada para criar novo user admin

userRouter.route('/users/me')
    .get(AuthMiddle, getMe); // Rota privada para obter os dados do usuário autenticado

userRouter.route('/users/:id')
    .get(AuthMiddle, getByIdUser) // Rota privada para obter um usuário por ID
    .delete(AuthMiddle, AdminAuth, deleteUser); // Rota privada para deletar um usuário

export default userRouter;