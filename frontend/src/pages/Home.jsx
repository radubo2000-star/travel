import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Descoperă Lumea cu Noi</h1>
          <p>Călătorii de neuitat la prețuri accesibile</p>
          <Link to="/offers" className="hero-button">
            Vezi Ofertele
          </Link>
        </div>
      </section>
      
      <section className="features">
        <div className="feature-card">
          <h3>🌴 Destinații Exotice</h3>
          <p>Explorează cele mai frumoase locuri din lume</p>
        </div>
        <div className="feature-card">
          <h3>🏨 Cazare Premium</h3>
          <p>Hoteluri de 4 și 5 stele incluse</p>
        </div>
        <div className="feature-card">
          <h3>✈️ Ghid Expert</h3>
          <p>Asistență turistică completă</p>
        </div>
      </section>
    </div>
  );
}

export default Home;