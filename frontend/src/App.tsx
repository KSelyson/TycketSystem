import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyInscriptions from './pages/MyInscriptions';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <div className="container nav-content">
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
          Tycket
        </Link>
        <div className="nav-links">
          <Link to="/">Eventos</Link>
          {user ? (
            <>
              {user.role === 'admin' && <Link to="/admin" style={{ color: 'var(--danger)', fontWeight: 'bold' }}>Painel Admin</Link>}
              <Link to="/my-inscriptions">Minhas Inscrições</Link>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Olá, {user.name}</span>
              <button className="btn btn-outline" onClick={logout}>Sair</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn btn-primary">Cadastrar</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const PrivateRoute = ({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/my-inscriptions" 
              element={
                <PrivateRoute>
                  <MyInscriptions />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <PrivateRoute adminOnly>
                  <AdminDashboard />
                </PrivateRoute>
              } 
            />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;