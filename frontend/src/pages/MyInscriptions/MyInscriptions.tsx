import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Calendar, MapPin, CheckCircle } from 'lucide-react';
import './MyInscriptions.css';

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
  const fetchMyInscriptions = async () => {
      try {
        const response = await api.get('/inscriptions');
        setInscriptions(response.data);
      } catch (err) {
        console.error('Erro ao buscar inscrições', err);
      }
    };

    fetchMyInscriptions();
  }, 
  []);

  return (
    <div>
      <h1 className="title">Minhas Inscrições</h1>
      <div className="grid">
        {inscriptions.length === 0 ? (
          <p className="no-inscriptions">Você ainda não se inscreveu em nenhum evento.</p>
        ) : (
          inscriptions.map((inscription) => (
            <div key={inscription._id} className="card">
              <div className="inscription-header">
                <h3 className="inscription-title">{inscription.event?.title || 'Evento não encontrado'}</h3>
                <span className="inscription-status">
                  <CheckCircle size={12} /> {inscription.status}
                </span>
              </div>
              
              <div className="inscription-info-list">
                {inscription.event && (
                  <>
                    <div className="inscription-info-item">
                      <Calendar size={16} />
                      {new Date(inscription.event.date).toLocaleDateString()}
                    </div>
                    <div className="inscription-info-item">
                      <MapPin size={16} />
                      {inscription.event.location}
                    </div>
                  </>
                )}
                <div className="inscription-footer">
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