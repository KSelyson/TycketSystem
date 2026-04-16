import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <div className="container nav-content">
        <Link to="/" className="nav-logo">
          Tycket
        </Link>
        <div className="nav-links">
          <Link to="/">Eventos</Link>
          {user ? (
            <>
              {user.role === 'admin' && <Link to="/admin" className="nav-admin-link">Painel Admin</Link>}
              <Link to="/my-inscriptions">Minhas Inscrições</Link>
              <span className="nav-user-greeting">Olá, {user.name}</span>
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

export default Navbar;