import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Email e senha são obrigatórios');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/users/login', { email, password });
      const { token, user } = response.data;

      if (!token || !user) {
        setError('Resposta inválida do servidor');
        return;
      }

      login(token, user);

      setSuccess('Login realizado com sucesso!');

      setTimeout(() => {
        navigate('/');
      }, 1000);

    } catch (err: unknown) {

      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Erro ao fazer login');

      } else {
        setError('Erro inesperado no servidor');
        
      } 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto' }} className="card">
      <h2 className="title" style={{ textAlign: 'center' }}>Login</h2>
      {error && <p style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</p>}
      {success && <p style={{ color: 'var(--success)', marginBottom: '1rem' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
             
          />
        </div>
        <div className="form-group">
          <label>Senha</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
             
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
        Não tem uma conta? <Link to="/register" style={{ color: 'var(--primary)' }}>Cadastre-se</Link>
      </p>
    </div>
  );
};

export default Login;