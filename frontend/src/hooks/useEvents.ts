import { useState, useEffect } from 'react';
import api from '../services/api';
import axios from 'axios';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  max_participants: number;
  category: { name: string };
}

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await api.get('/events');
      setEvents(response.data);
    } catch (err) {
      console.error('Erro ao buscar eventos', err);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToEvent = async (eventId: string, user: any) => {
    if (!user) {
      alert('Faça login para se inscrever!');
      return false;
    }

    try {
      await api.post('/inscriptions', { event_id: eventId });
      alert('Inscrição realizada com sucesso!');
      return true;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.error || 'Erro ao se inscrever');
      } else {
        alert('Erro inesperado');
      }
      return false;
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    loading,
    subscribeToEvent,
    refreshEvents: fetchEvents
  };
};
