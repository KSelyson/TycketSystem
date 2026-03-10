import { Event } from '../models/Event';

//GetAll || Buscar todos os eventos (deixar a rota publica)
const getAllEvents = async (req: any, res: any) => {
    try {
        const events = await Event.find();//pega todo mundo e coloca no array events
        res.status(200).json(events);
    } catch (e: any) {
        //captura de erro
        res.status(500).json({ error: 'Erro ao buscar eventos', details: e.message });
    }
};

//GetByID || Buscar por ID especifico (Deixar a rota publica)
const getByIdEvent = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({ error: 'Evento não encontrado' });
        }
        res.status(200).json(event);
    } catch (e: any) {
        res.status(500).json({ error: 'Erro ao buscar evento', details: e.message });
    }
};

// Create/Post || Criar um novo evento (Deixar a rota privada)
const createEvent = async (req: any, res: any) => {
    try {
        const { title, description, date, location, max_participants, category_id, createdBy_id } = req.body; //captura os dados do corpo da requisição
        const newEvent = new Event({ title, description, date, location, max_participants, category_id, createdBy_id }); //novo objeto
        await newEvent.save(); //salva o evento no DB
        if (!newEvent) {
            return res.status(400).json({ error: 'Erro ao criar evento' });
        }
        res.status(201).json(newEvent); //retorna o evento criado com status 201 (Created)
    } catch (e: any) {
        //captura de erro
        res.status(500).json({ error: 'Erro ao criar evento', details: e.message });
    };
};

// Update/Put || Atualizar um evento existente (Deixar a rota privada)
const updateEvent = async (req: any, res: any) => {
    try {
        const { id } = req.params; // pega o id
        const { name, date, location } = req.body; // pega as alterações da requisição
        const updatedEvent = await Event.findByIdAndUpdate(id, { name, date, location }, { new: true }); //encontra o evento e atualiza
    
        if (!updatedEvent) {
            // se não tiver evento na const, quer dizer que não foi encontrado, então retorna erro 404
            return res.status(404).json({ error: 'Evento não encontrado' });
        }
        res.status(200).json(updatedEvent);//mensagem de sucesso, retorna o evento atualizado
    } catch (e: any) {
        // captura de erro
        res.status(500).json({ error: 'Erro ao atualizar evento', details: e.message });
    }
};

// Delete || Deletar um evento (Deixar a rota privada)
const deleteEvent = async (req: any, res: any) => {
    try {
        const { id } = req.params; // pega o id
        const deletedEvent = await Event.findByIdAndDelete(id); // encontra o evento e deleta
        if (!deletedEvent) {
            //se não tiver evento na const, quer dizer que não foi encontrado, então retorna erro 404
            return res.status(404).json({ error: 'Evento não encontrado' });
        }
        res.status(200).json({ message: 'Evento deletado com sucesso' });
    } catch (e: any) {
        //captura de erro
        res.status(500).json({ error: 'Erro ao deletar evento', details: e.message });
    }
};

module.exports = {
    getAllEvents,
    getByIdEvent,
    createEvent,
    updateEvent,
    deleteEvent
};