import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Calendar, MapPin, CheckCircle } from 'lucide-react';

interface Inscription {
  _id: string;
  status: string;
  createdAt: string;
  event: {
    _id: string;
    title: string;
    date: string;
    location: string;
  };
}

const MyInscriptions = () => {
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);

  useEffect(() => {
    fetchMyInscriptions();
  }, []);

  const fetchMyInscriptions = async () => {
    try {
      const response = await api.get('/inscriptions');
      setInscriptions(response.data);
    } catch (err) {
      console.error('Erro ao buscar inscrições', err);
    }
  };

  return (
    <div>
      <h1 className="title">Minhas Inscrições</h1>
      <div className="grid">
        {inscriptions.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>Você ainda não se inscreveu em nenhum evento.</p>
        ) : (
          inscriptions.map((inscription) => (
            <div key={inscription._id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ margin: '0 0 1rem 0' }}>{inscription.event?.title || 'Evento não encontrado'}</h3>
                <span style={{ 
                  fontSize: '0.7rem', 
                  background: 'var(--success)', 
                  color: 'white', 
                  padding: '0.2rem 0.5rem', 
                  borderRadius: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}>
                  <CheckCircle size={12} /> {inscription.status}
                </span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {inscription.event && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar size={16} />
                      {new Date(inscription.event.date).toLocaleDateString()}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <MapPin size={16} />
                      {inscription.event.location}
                    </div>
                  </>
                )}
                <div style={{ marginTop: '0.5rem', borderTop: '1px solid var(--border)', paddingTop: '0.5rem', fontSize: '0.75rem' }}>
                  Inscrito em: {new Date(inscription.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyInscriptions;