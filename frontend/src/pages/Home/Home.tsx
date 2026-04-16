import { useAuth } from '../../hooks/useAuth';
import { useEvents } from '../../hooks/useEvents';
import { Calendar, MapPin, Users } from 'lucide-react';
import './Home.css';

const Home = () => {
  const { user } = useAuth();
  const { events, subscribeToEvent } = useEvents();

  return (
    <div>
      <h1 className="title">Próximos Eventos</h1>
      <div className="grid">
        {events.map((event) => (
          <div key={event._id} className="card">
            <span className="event-tag">
              {event.category?.name || 'Sem Categoria'}
            </span>
            <h3 className="event-title">{event.title}</h3>
            <p className="event-description">
              {event.description}
            </p>
            
            <div className="event-info-list">
              <div className="event-info-item">
                <Calendar size={16} />
                {new Date(event.date).toLocaleDateString()}
              </div>
              <div className="event-info-item">
                <MapPin size={16} />
                {event.location}
              </div>
              <div className="event-info-item">
                <Users size={16} />
                Capacidade: {event.max_participants}
              </div>
            </div>

            <button 
              className="btn btn-primary event-subscribe-btn" 
              onClick={() => subscribeToEvent(event._id, user)}
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