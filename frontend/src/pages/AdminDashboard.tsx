import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { PlusCircle, Trash2, LayoutGrid, Calendar } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [catsRes, eventsRes] = await Promise.all([
        api.get('/categories'),
        api.get('/events')
      ]);
      setCategories(catsRes.data);
      setEvents(eventsRes.data);
    } catch (err) {
      console.error('Erro ao buscar dados', err);
    }
  };

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
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erro ao criar evento');
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/categories', { name: catName, description: catDesc });
      alert('Categoria criada!');
      fetchData();
    } catch (err) {
      alert('Erro ao criar categoria');
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
                {categories.map((c: any) => (
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