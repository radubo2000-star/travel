import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOffers } from '../services/api';
import './Offers.css';

function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    getOffers()
      .then(data => {
        setOffers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Generate mock dates for each offer
  const getNextDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 3; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i * 7 + Math.floor(Math.random() * 5));
      dates.push(nextDate.toISOString().split('T')[0]);
    }
    return dates;
  };

  if (loading) return <div className="loading">Se încarcă...</div>;

  return (
    <div className="offers-page">
      <div className="offers-header">
        <h1>🎯 Excursii & Evenimente</h1>
        <p>Explorează cele mai interesante destinații alături de noi</p>
        
        <div className="category-filters">
          <button 
            className={category === 'all' ? 'active' : ''} 
            onClick={() => setCategory('all')}
          >
            Toate
          </button>
          <button 
            className={category === 'montane' ? 'active' : ''} 
            onClick={() => setCategory('montane')}
          >
            🏔️ Montane
          </button>
          <button 
            className={category === 'turistice' ? 'active' : ''} 
            onClick={() => setCategory('turistice')}
          >
            🏛️ Turistice
          </button>
          <button 
            className={category === 'socializare' ? 'active' : ''} 
            onClick={() => setCategory('socializare')}
          >
            🎉 Socializare
          </button>
        </div>
      </div>

      <div className="offers-grid">
        {offers.map(offer => (
          <div key={offer.id} className="offer-card">
            <div className="offer-image">
              <img src={offer.image} alt={offer.title} />
              {offer.discount > 0 && (
                <span className="discount-badge">-{offer.discount}%</span>
              )}
              <span className="slots-badge">
                {offer.availableSlots} locuri libere
              </span>
            </div>
            
            <div className="offer-content">
              <h3>{offer.title}</h3>
              <p className="offer-location">📍 {offer.location}</p>
              
              <div className="offer-dates">
                <span className="date-label">📅 Următoarele date:</span>
                <div className="date-list">
                  {getNextDates().map((date, idx) => (
                    <span key={idx} className="date-chip">
                      {new Date(date).toLocaleDateString('ro-RO', { day: '2-digit', month: 'short' })}
                    </span>
                  ))}
                </div>
              </div>
              
              <p className="offer-description">{offer.description}</p>
              
              <div className="offer-includes">
                <span>✅ Include:</span>
                <div className="includes-list">
                  {offer.includes?.slice(0, 3).map((item, idx) => (
                    <span key={idx} className="include-tag">{item}</span>
                  ))}
                </div>
              </div>
              
              <div className="offer-footer">
                <div className="offer-price">
                  {offer.originalPrice && (
                    <span className="old-price">{offer.originalPrice} lei</span>
                  )}
                  <span className="new-price">{offer.price} lei</span>
                </div>
                <Link to={`/offers/${offer.id}`} className="offer-button">
                  Vezi Detalii →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="offers-info">
        <div className="info-box">
          <h3>📞 Ai întrebări?</h3>
          <p>Contactează-ne pentru informații suplimentare despre excursii</p>
          <Link to="/contact" className="info-btn">Contact</Link>
        </div>
      </div>
    </div>
  );
}

export default Offers;