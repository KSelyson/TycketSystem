import { AdminAuth } from './../middleware/authMiddleware';
import { Router } from 'express';
import { createEvent, getAllEvents, getByIdEvent, updateEvent, deleteEvent } from '../controllers/eventController';
import { AuthMiddle } from '../middleware/authMiddleware';


const eventRouter = Router();

    // Rotas para operações gerais
eventRouter.route('/events')
    .get(getAllEvents) // Rota pública para obter todos os eventos
    .post(AdminAuth, AuthMiddle, createEvent); // Rota privada para criar um novo evento

    // Rotas para operações específicas por ID
eventRouter.route('/events/:id')
    .get(getByIdEvent) // Rota pública para obter um evento por ID
    .put(AdminAuth, AuthMiddle, updateEvent) // Rota privada para atualizar um evento existente
    .delete(AdminAuth, AuthMiddle, deleteEvent); // Rota privada para deletar um evento

export default eventRouter;