import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useAdmin } from '../../hooks/useAdmin';
import { PlusCircle, LayoutGrid } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { categories, createEvent, createCategory } = useAdmin();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(0);
  const [categoryId, setCategoryId] = useState('');

  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await createEvent({
      title,
      description,
      date,
      location,
      max_participants: maxParticipants,
      category_id: categoryId
    });
    
    if (success) {
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
      setMaxParticipants(0);
      setCategoryId('');
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await createCategory({ name: catName, description: catDesc });
    if (success) {
      setCatName('');
      setCatDesc('');
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
          <h2 className="admin-section-title">
            <LayoutGrid size={20} /> Nova Categoria
          </h2>
          <form onSubmit={handleCategorySubmit}>
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
        <div className="card admin-card-wide">
          <h2 className="admin-section-title">
            <PlusCircle size={20} /> Novo Evento
          </h2>
          <form onSubmit={handleEventSubmit} className="grid admin-form-grid">
            <div className="form-group">
              <label>Título</label>
              <input value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Data</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
            </div>
            <div className="form-group form-group-full">
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
            <div className="form-group form-group-full">
              <label>Categoria</label>
              <select 
                className="admin-select"
                value={categoryId} 
                onChange={e => setCategoryId(e.target.value)}
                required
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary admin-btn-full">Publicar Evento</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;