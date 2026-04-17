import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { PlusCircle, LayoutGrid } from 'lucide-react';
import axios from 'axios';
// tinha variveis chamadas Trash2 e Calendar, não entendi o proposito nesse import no lucide-react

const AdminDashboard = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  // const [events, setEvents] = useState([]); // Não é necessário manter os eventos no estado, pois eles não são exibidos ou editados diretamente aqui, pelo o menos por enquanto que eu estou refatorando

  // Estados para formulário de Evento
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(0);
  const [categoryId, setCategoryId] = useState('');

  //feedbacks para os formulários
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [loadingEvent, setLoadingEvent] = useState(false);
  const [errorCategory, setErrorCategory] = useState('');
  const [errorEvent, setErrorEvent] = useState('');
  const [successCategory, setSuccessCategory] = useState('');
  const [successEvent, setSuccessEvent] = useState('');

  // Estados para formulário de Categoria
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');

  const reloadData =  async () => {
    try {
      const [catsRes] = await Promise.all([
        api.get('/categories'),
        api.get('/events')
      ]);
      setCategories(catsRes.data);
      // setEvents(eventsRes.data); // Não é necessário manter os eventos no estado, pois eles não são exibidos ou editados diretamente aqui NO MOMENTO
    } catch (err) {
      console.error('Erro ao buscar dados', err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
      const [catsRes] = await Promise.all([
        api.get('/categories'),
        api.get('/events')
      ]);
      setCategories(catsRes.data);
      // setEvents(eventsRes.data); // Não é necessário manter os eventos no estado, pois eles não são exibidos ou editados diretamente aqui NO MOMENTO
    } catch (err) {
      console.error('Erro ao buscar dados', err);
    }
  };

    fetchData();
  }, []);

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoadingEvent(true);
    setErrorEvent('');
    setSuccessEvent('');

    try {
      await api.post('/events', {
        title,
        description,
        date,
        location,
        max_participants: maxParticipants,
        category_id: categoryId
      });

      setSuccessEvent('Evento criado com sucesso!');
      reloadData();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setErrorEvent(err.response?.data?.error || 'Erro ao criar evento');
      } else {
        setErrorEvent('Erro inesperado');
      }
    } finally {
      setLoadingEvent(false);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoadingCategory(true);
    setErrorCategory('');
    setSuccessCategory('');

    try {
      await api.post('/categories', { name: catName, description: catDesc });
      setSuccessCategory('Categoria criada com sucesso!');
      reloadData();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setErrorCategory(err.response?.data?.error || 'Erro ao criar categoria');
      } else {
        setErrorCategory('Erro inesperado');
      }
    } finally {
      setLoadingCategory(false);
    }
  };

  if (user?.role !== 'admin') {
    return <div className="container">Acesso negado. Apenas administradores.</div>;
  }

  return (
    <div className="container">
      <h1 className="title">Painel do Administrador</h1>
      
      <div className="grid">
        {/* Formulário de Categoria */}
        <div className="card">
          <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LayoutGrid size={20} /> Nova Categoria
          </h2>
          { errorCategory && <p style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{errorCategory}</p> }
          { successCategory && <p style={{ color: 'var(--success)', marginBottom: '1rem' }}>{successCategory}</p> }


          <form onSubmit={handleCreateCategory}>
            <div className="form-group">
              <label>Nome</label>
              <input value={catName} onChange={e => setCatName(e.target.value)}  />
            </div>
            <div className="form-group">
              <label>Descrição</label>
              <input value={catDesc} onChange={e => setCatDesc(e.target.value)}  />
            </div>
            <button className="btn btn-primary" disabled={loadingCategory} style={{ width: '100%' }}>
              {loadingCategory ? 'Criando...' : 'Criar Categoria'}
            </button>
          </form>
        </div>

        {/* Formulário de Evento */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PlusCircle size={20} /> Novo Evento
          </h2>
          { errorEvent && <p style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{errorEvent}</p> }
          { successEvent && <p style={{ color: 'var(--success)', marginBottom: '1rem' }}>{successEvent}</p> }

          <form onSubmit={handleCreateEvent} className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Título</label>
              <input value={title} onChange={e => setTitle(e.target.value)}  />
            </div>
            <div className="form-group">
              <label>Data</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)}  />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label>Descrição</label>
              <input value={description} onChange={e => setDescription(e.target.value)}  />
            </div>
            <div className="form-group">
              <label>Local</label>
              <input value={location} onChange={e => setLocation(e.target.value)}  />
            </div>
            <div className="form-group">
              <label>Vagas</label>
              <input type="number" value={maxParticipants} onChange={e => setMaxParticipants(Number(e.target.value))}  />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label>Categoria</label>
              <select 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                value={categoryId} 
                onChange={e => setCategoryId(e.target.value)}
                
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((c: { _id: string; name: string }) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary" disabled={loadingEvent} style={{ gridColumn: 'span 2' }}>
              {loadingEvent ? 'Publicando...' : 'Publicar Evento'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;