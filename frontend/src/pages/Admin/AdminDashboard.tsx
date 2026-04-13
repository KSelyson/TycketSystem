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
    try {
      await api.post('/events', {
        title,
        description,
        date,
        location,
        max_participants: maxParticipants,
        category_id: categoryId
      });
      alert('Evento criado com sucesso!');
      reloadData();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.error || 'Erro ao criar evento');
      } else {
        alert('Erro inesperado');
      }
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/categories', { name: catName, description: catDesc });
      alert('Categoria criada!');
      reloadData();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.error || 'Erro ao criar categoria');
      } else {
        alert('Erro inesperado');
      }
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
          <form onSubmit={handleCreateCategory}>
            <div className="form-group">
              <label>Nome</label>
              <input value={catName} onChange={e => setCatName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Descrição</label>
              <input value={catDesc} onChange={e => setCatDesc(e.target.value)} required />
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }}>Criar Categoria</button>
          </form>
        </div>

        {/* Formulário de Evento */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PlusCircle size={20} /> Novo Evento
          </h2>
          <form onSubmit={handleCreateEvent} className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Título</label>
              <input value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Data</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label>Descrição</label>
              <input value={description} onChange={e => setDescription(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Local</label>
              <input value={location} onChange={e => setLocation(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Vagas</label>
              <input type="number" value={maxParticipants} onChange={e => setMaxParticipants(Number(e.target.value))} required />
            </div>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label>Categoria</label>
              <select 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                value={categoryId} 
                onChange={e => setCategoryId(e.target.value)}
                required
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((c: { _id: string; name: string }) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary" style={{ gridColumn: 'span 2' }}>Publicar Evento</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;