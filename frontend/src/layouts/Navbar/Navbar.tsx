import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

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

export default Navbar