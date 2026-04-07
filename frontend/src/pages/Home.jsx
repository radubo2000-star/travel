import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOffers } from '../services/api';
import './Home.css';

function Home() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      const data = await getOffers();
      setOffers(data.slice(0, 6));
    } catch (error) {
      console.error('Error loading offers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section" style={{backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920)'}}>
        <div className="hero-container">
          <h1>🌴 Hai să Explorăm!</h1>
          <p className="hero-subtitle">Descoperă destinații incredibile alături de noi</p>
          <Link to="/offers" className="hero-btn">Vezi Excursiile</Link>
        </div>
      </section>

      {/* Featured Trips */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">🎯 Excursii Recente</h2>
          {loading ? (
            <div className="loading">Se încarcă...</div>
          ) : (
            <div className="trips-grid">
              {offers.map(offer => (
                <div key={offer.id} className="trip-card">
                  <div className="trip-image">
                    <img src={offer.image} alt={offer.title} />
                    {offer.discount > 0 && (
                      <span className="discount-badge">-{offer.discount}%</span>
                    )}
                    <span className="slots-badge">{offer.availableSlots} locuri</span>
                  </div>
                  <div className="trip-content">
                    <h3>{offer.title}</h3>
                    <p className="trip-location">📍 {offer.location}</p>
                    <div className="trip-price">
                      <span className="price">{offer.price} lei</span>
                      {offer.originalPrice && (
                        <span className="old-price">{offer.originalPrice} lei</span>
                      )}
                    </div>
                    <Link to={`/offers/${offer.id}`} className="trip-btn">Vezi Detalii</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="center-btn">
            <Link to="/offers" className="view-all-btn">Toate Excursiile →</Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">🏔️ Tipuri de Excursii</h2>
          <div className="categories-grid">
            <Link to="/offers" className="category-card">
              <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400" alt="Montane" />
              <h3>Evenimente Montane</h3>
            </Link>
            <Link to="/offers" className="category-card">
              <img src="https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400" alt="Turistice" />
              <h3>Evenimente Turistice</h3>
            </Link>
            <Link to="/offers" className="category-card">
              <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400" alt="Socializare" />
              <h3>Socializare</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-title">💙 Despre Noi</h2>
          <div className="about-content">
            <div className="about-text">
              <h3>De unde am plecat</h3>
              <p>Pornind de la realitatea actuală, în care mediul virtual ocupă o mare parte din viața socială, am creat această comunitate din dorința de a socializa atât online cât și offline, prin organizarea de reuniuni pe diverse teme.</p>
              
              <h3>Unde am ajuns</h3>
              <p>Suntem o comunitate care promovează formarea și dezvoltarea relațiilor sociale prin intermediul activităților de grup, fie ca acestea se desfășoară în natură, în oraș sau oriunde dincolo de ecranul calculatorului.</p>
            </div>
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Excursii Organizate</span>
              </div>
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Participanți Fericiți</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Destinații</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">💬 Ce Spun Participanții</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-avatar">👨‍💼</div>
              <p className="testimonial-text">"Am fost la prima excursie și cu siguranță voi mai reveni! Oameni de calitate, trasee frumoase și multă distracție."</p>
              <p className="testimonial-author">- Ciprian, București</p>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-avatar">👩‍💻</div>
              <p className="testimonial-text">"O experiență minunată! Am întâlnit oameni noi cu care până la finalul evenimentului m-am împrietenit. Recomand cu drag!"</p>
              <p className="testimonial-author">- Elena, Cluj</p>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-avatar">👨‍🎨</div>
              <p className="testimonial-text">"Cel mai fain mod de a explora România! Ghizi profesioniști, grupuri vesele și destinații de vis."</p>
              <p className="testimonial-author">- Marius, Timișoara</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>🚀 Alătură-te Comunității!</h2>
          <p>Înscrie-te acum și profita de reduceri exclusive pentru membri</p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-btn-primary">Creează Cont</Link>
            <Link to="/offers" className="cta-btn-secondary">Vezi Ofertele</Link>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="footer-info">
        <div className="container">
          <div className="info-grid">
            <div className="info-item">
              <h4>📞 Contact</h4>
              <p>contact@travelagency.ro</p>
              <p>+40 700 000 000</p>
            </div>
            <div className="info-item">
              <h4>📍 Sediul</h4>
              <p>București, Sector 1</p>
              <p>Str. Exemplu Nr. 123</p>
            </div>
            <div className="info-item">
              <h4>📋 Informații</h4>
              <p>Termeni și Condiții</p>
              <p>Politica de Confidențialitate</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;