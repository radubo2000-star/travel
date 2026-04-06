import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🌴 Travel Agency
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/">Acasă</Link></li>
          <li><Link to="/offers">Oferte</Link></li>
          {user ? (
            <>
              <li><Link to="/my-bookings">Rezervările Mele</Link></li>
              {user.role === 'admin' && <li><Link to="/admin">Admin</Link></li>}
              <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Autentificare</Link></li>
              <li><Link to="/register" className="register-link">Creează cont</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;