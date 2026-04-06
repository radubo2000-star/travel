import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOffers } from '../services/api';
import './Offers.css';

function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="loading">Se încarcă...</div>;

  return (
    <div className="offers-page">
      <h1>Oferte Turistice</h1>
      <div className="offers-grid">
        {offers.map(offer => (
          <div key={offer.id} className="offer-card">
            <div className="offer-image">
              <img src={offer.image} alt={offer.title} />
              {offer.discount > 0 && (
                <span className="discount-badge">-{offer.discount}%</span>
              )}
            </div>
            <div className="offer-content">
              <h3>{offer.title}</h3>
              <p className="offer-location">📍 {offer.location}</p>
              <p className="offer-description">{offer.description}</p>
              <div className="offer-footer">
                <div className="offer-price">
                  <span className="old-price">{offer.originalPrice} EUR</span>
                  <span className="new-price">{offer.price} EUR</span>
                </div>
                <div className="offer-slots">
                  <span className={offer.availableSlots < 5 ? 'low-stock' : ''}>
                    {offer.availableSlots} locuri disponibile
                  </span>
                </div>
              </div>
              <Link to={`/offers/${offer.id}`} className="offer-button">
                Detalii
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offers;