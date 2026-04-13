import { Router } from 'express';
import { subscribeToEvent, getMyInscriptions } from '../controllers/inscriptionController';
import { AuthMiddle } from '../middleware/authMiddleware';

const inscriptionRouter = Router();

inscriptionRouter.use(AuthMiddle); // Todas as rotas de inscrição exigem login

inscriptionRouter.route('/inscriptions')
    .post(subscribeToEvent)
    .get(getMyInscriptions);

export default inscriptionRouter;