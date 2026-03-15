import { Router } from 'express';
import { createCategory, getAllCategories, deleteCategory } from '../controllers/categoryController';
import { AuthMiddle, AdminAuth } from '../middleware/authMiddleware';

const categoryRouter = Router();

categoryRouter.route('/categories')
    .get(getAllCategories)
    .post(AuthMiddle, AdminAuth, createCategory);

categoryRouter.route('/categories/:id')
    .delete(AuthMiddle, AdminAuth, deleteCategory);

export default categoryRouter;