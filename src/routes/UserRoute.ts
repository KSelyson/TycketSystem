import { Router } from 'express';
import { getAllUsers, getByIdUser, getMe, registerUser, deleteUser, loginUser } from '../controllers/authController';
import { AuthMiddle, AdminAuth } from '../middleware/authMiddleware';
import eventRouter from './eventRoute';

const userRouter = Router();

eventRouter.route('/users')
    .get(AdminAuth, AuthMiddle, getAllUsers) // Rota privada para obter todos os usuários

userRouter.route('/users/register')
    .post(registerUser); // Rota pública para criar um novo usuário

userRouter.route('/users/login')
    .post(loginUser);

userRouter.route('/users/register/admin')
    .post(AdminAuth, AuthMiddle, registerUser); // Rota privada para criar novo user admin

userRouter.route('/users/me')
    .get(AuthMiddle, getMe); // Rota privada para obter os dados do usuário autenticado

userRouter.route('/users/:id')
    .get(AuthMiddle, getByIdUser) // Rota privada para obter um usuário por ID
    .delete(AdminAuth, AuthMiddle, deleteUser); // Rota privada para deletar um usuário

export default userRouter;