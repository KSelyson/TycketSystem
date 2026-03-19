import { Router } from 'express';
// @ts-ignore: temporary - create ../controllers/inscriptionController.ts to provide these exports
import { subscribeToEvent, getMyInscriptions } from '../controllers/inscriptionController.ts';
import { AuthMiddle } from '../middleware/authMiddleware';

const inscriptionRouter = Router();

inscriptionRouter.use(AuthMiddle); // Todas as rotas de inscrição exigem login

inscriptionRouter.route('/inscriptions')
    .post(subscribeToEvent)
    .get(getMyInscriptions);

export default inscriptionRouter;