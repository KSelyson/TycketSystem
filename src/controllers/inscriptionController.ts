import { Request, Response } from 'express';
import { Inscription } from '../models/Inscription';
import { Event } from '../models/Event';
import { User } from '../models/User';

// Post || Inscrever um usuário em um evento (Deixar a rota privada)
export const subscribeToEvent = async (req: any, res: Response) => {    
    try {
        const { event_id } = req.body;

        // 1. Verificar se o evento existe
        const event = await Event.findById(event_id); //guarda o objeto do evento na variável event
        if (!event) return res.status(404).json({ error: 'Evento não encontrado' });

        // 2. Verificar se o usuário já está inscrito
        const existingInscription = await Inscription.findOne({ event: event_id, user: req.user?._id });
        if (existingInscription) {
            return res.status(400).json({ error: 'Você já está inscrito neste evento' });
        }

        // 3. Verificar se ainda há vagas
        const inscriptionsCount = await Inscription.countDocuments({ event: event_id, status: 'confirmed' });
        if (inscriptionsCount >= event.max_participants) {
            return res.status(400).json({ error: 'Evento lotado' });
        }

        // 4. Criar a inscrição
        const newInscription = new Inscription({
            user: req.user?._id,
            event: event_id,
            status: 'confirmed'
        });

        await newInscription.save();
        res.status(201).json({ message: 'Inscrição realizada com sucesso', newInscription });
    } catch (e: any) {
        res.status(500).json({ error: 'Erro ao realizar inscrição', details: e.message });
    }
};

// GetMyInscriptions || Buscar as inscrições do usuário autenticado (Deixar a rota privada)
export const getMyInscriptions = async (req: Request, res: Response) => {
    try {
        // Busca inscrições do usuário e traz os detalhes do evento junto (populate)
        const inscriptions = await Inscription.find({ _id: req.user?._id }).populate('event_id');
        res.status(200).json(inscriptions);
    } catch (e: any) {
        res.status(500).json({ error: 'Erro ao buscar suas inscrições', details: e.message });
    }
};