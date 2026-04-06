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

  if (loading) return <div className="loading">Se încarcă...</div>;
  if (!offer) return <div className="error">Oferta nu a fost găsită</div>;

  return (
    <div className="offer-detail">
      <div className="offer-detail-header">
        <img src={offer.image} alt={offer.title} />
        {offer.discount > 0 && (
          <span className="discount-badge">-{offer.discount}%</span>
        )}
      </div>
      
      <div className="offer-detail-content">
        <h1>{offer.title}</h1>
        <p className="location">📍 {offer.location}</p>
        
        <div className="offer-detail-price">
          <span className="old-price">{offer.originalPrice} EUR</span>
          <span className="new-price">{offer.price} EUR</span>
          <span className="per-person">/persoană</span>
        </div>
        
        <div className="offer-slots-info">
          <span className={offer.availableSlots < 5 ? 'low-stock' : ''}>
            {offer.availableSlots} locuri disponibile
          </span>
        </div>
        
        <div className="offer-description-full">
          <h2>Descriere</h2>
          <p>{offer.description}</p>
        </div>
        
        <div className="offer-includes">
          <h2>Include</h2>
          <ul>
            {offer.includes && offer.includes.map((item, index) => (
              <li key={index}>✓ {item}</li>
            ))}
          </ul>
        </div>
        
        <Link to={`/booking/${offer.id}`} className="booking-button">
          Rezervă Acum
        </Link>
      </div>
    </div>
  );
}

export default OfferDetail;