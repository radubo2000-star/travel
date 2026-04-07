import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOffer } from '../services/api';
import './OfferDetail.css';

function OfferDetail() {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOffer(id)
      .then(data => {
        setOffer(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // Generate mock available dates
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 6; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i * 5 + Math.floor(Math.random() * 3));
      dates.push(nextDate.toISOString().split('T')[0]);
    }
    return dates;
  };

  if (loading) return <div className="loading">Se încarcă...</div>;
  if (!offer) return <div className="error">Oferta nu a fost găsită</div>;

  return (
    <div className="offer-detail">
      {/* Hero Image */}
      <div className="offer-hero" style={{backgroundImage: `url(${offer.image})`}}>
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="location-tag">📍 {offer.location}</span>
            <h1>{offer.title}</h1>
            {offer.discount > 0 && (
              <span className="hero-discount">🔥 PROMO -{offer.discount}%</span>
            )}
          </div>
        </div>
      </div>

      <div className="offer-detail-container">
        {/* Main Content */}
        <div className="offer-main">
          {/* Description */}
          <div className="detail-section">
            <h2>✈️ Despre Excursie</h2>
            <p className="description-full">{offer.description}</p>
          </div>

          {/* What's Included */}
          <div className="detail-section">
            <h2>✅ Ce Include</h2>
            <div className="includes-grid">
              {offer.includes?.map((item, idx) => (
                <div key={idx} className="include-item">
                  <span className="check">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Available Dates */}
          <div className="detail-section">
            <h2>📅 Date Disponibile</h2>
            <div className="dates-grid">
              {getAvailableDates().map((date, idx) => (
                <div key={idx} className="date-card">
                  <span className="date-day">{new Date(date).toLocaleDateString('ro-RO', { weekday: 'short' })}</span>
                  <span className="date-date">{new Date(date).toLocaleDateString('ro-RO', { day: '2-digit', month: 'short' })}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Not Included */}
          <div className="detail-section">
            <h2>❌ Nu Include</h2>
            <ul className="not-includes">
              <li>Cheltuieli personale</li>
              <li>Asigurări complementare</li>
              <li>Mese și băuturi nemenționate</li>
              <li>Taxe de intrare în obiective turistice</li>
            </ul>
          </div>

          {/* Important Info */}
          <div className="detail-section">
            <h2>⚠️ Informații Importante</h2>
            <div className="info-cards">
              <div className="info-card">
                <span className="info-icon">⏰</span>
                <div>
                  <h4>Program</h4>
                  <p>Orarul poate varia în funcție de condițiile atmosferice</p>
                </div>
              </div>
              <div className="info-card">
                <span className="info-icon">👟</span>
                <div>
                  <h4>Echipament</h4>
                  <p>Încălțăminte comodă, adaptată tipului de traseu</p>
                </div>
              </div>
              <div className="info-card">
                <span className="info-icon">📋</span>
                <div>
                  <h4>Condiții</h4>
                  <p>Participarea necesită stare bună de sănătate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="offer-sidebar">
          <div className="price-card">
            <div className="price-header">
              <span className="price-label">PREȚ</span>
              {offer.originalPrice && (
                <span className="old-price">{offer.originalPrice} lei</span>
              )}
            </div>
            <div className="price-main">
              <span className="new-price">{offer.price}</span>
              <span className="currency">lei</span>
            </div>
            <span className="per-person">/persoană</span>

            {offer.discount > 0 && (
              <div className="discount-info">
                Economisești {Math.round(offer.price * (offer.discount / 100))} lei!
              </div>
            )}

            <div className="slots-info">
              <span className="slots-label">Disponibilitate:</span>
              <span className={`slots-count ${offer.availableSlots < 5 ? 'low' : ''}`}>
                {offer.availableSlots} locuri rămase
              </span>
            </div>

            <Link to={`/booking/${offer.id}`} className="booking-button-full">
              🎫 Rezervă Acum
            </Link>

            <p className="booking-note">
              * Rezervarea necesită un avans de 30%
            </p>
          </div>

          {/* Contact Card */}
          <div className="contact-card">
            <h3>📞 Ai Întrebări?</h3>
            <p>Contactează-ne pentru detalii suplimentare</p>
            <div className="contact-buttons">
              <a href="tel:+40700000000" className="contact-btn">📱 Sună</a>
              <a href="mailto:contact@travel.ro" className="contact-btn">✉️ Email</a>
            </div>
          </div>

          {/* Share */}
          <div className="share-card">
            <span>📤 Distribuie</span>
            <div className="share-buttons">
              <button>Facebook</button>
              <button>WhatsApp</button>
            </div>
          </div>
        </div>
      </div>

      {/* Back Link */}
      <div className="back-link">
        <Link to="/offers">← Înapoi la Oferte</Link>
      </div>
    </div>
  );
}

export default OfferDetail;