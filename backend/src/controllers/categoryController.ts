import { Request, Response } from 'express';
import { Category } from '../models/Category';

// Create/Post || Criar uma nova categoria (Deixar a rota privada)
export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const newCategory = new Category({ name, description });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (e: any) {
        res.status(500).json({ error: 'Erro ao criar categoria', details: e.message });
    }
};

// GetAll || Buscar todas as categorias (Deixar a rota publica)
export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (e: any) {
        res.status(500).json({ error: 'Erro ao buscar categorias', details: e.message });
    }
};

// GetByID || Buscar por ID especifico (Deixar a rota publica)
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) return res.status(404).json({ error: 'Categoria não encontrada' });
        res.status(200).json({ message: 'Categoria deletada com sucesso' });
    } catch (e: any) {
        res.status(500).json({ error: 'Erro ao deletar categoria', details: e.message });
    }
};