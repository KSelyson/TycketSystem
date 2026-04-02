import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Calendar, MapPin, Users } from 'lucide-react';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  max_participants: number;
  category: { name: string };
}

const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      setEvents(response.data);
    } catch (err) {
      console.error('Erro ao buscar eventos', err);
    }
  };

  const handleSubscribe = async (eventId: string) => {
    if (!user) {
      alert('Faça login para se inscrever!');
      return;
    }

    try {
      await api.post('/inscriptions', { event_id: eventId });
      alert('Inscrição realizada com sucesso!');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erro ao se inscrever');
    }
  };

  return (
    <div>
      <h1 className="title">Próximos Eventos</h1>
      <div className="grid">
        {events.map((event) => (
          <div key={event._id} className="card">
            <span style={{ 
              fontSize: '0.75rem', 
              background: 'var(--bg)', 
              padding: '0.2rem 0.5rem', 
              borderRadius: '1rem',
              color: 'var(--primary)',
              fontWeight: 600
            }}>
              {event.category?.name || 'Sem Categoria'}
            </span>
            <h3 style={{ margin: '0.5rem 0' }}>{event.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              {event.description}
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={16} />
                {new Date(event.date).toLocaleDateString()}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} />
                {event.location}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={16} />
                Capacidade: {event.max_participants}
              </div>
            </div>

            <button 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '1.5rem' }}
              onClick={() => handleSubscribe(event._id)}
            >
              Inscrever-se
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;