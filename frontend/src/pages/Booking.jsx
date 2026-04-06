import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOffer, createBooking } from '../services/api';
import './Booking.css';

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 1,
    paymentMethod: 'card'
  });
  const [submitting, setSubmitting] = useState(false);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const booking = await createBooking({
        offerId: id,
        ...formData,
        totalPrice: offer.price * formData.guests
      });
      alert('Rezervarea a fost trimisă cu succes! Veți primi un email de confirmare.');
      navigate('/');
    } catch (err) {
      alert('A apărut o eroare. Încercați din nou.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Se încarcă...</div>;
  if (!offer) return <div className="error">Oferta nu a fost găsită</div>;

  const totalPrice = offer.price * formData.guests;

  return (
    <div className="booking-page">
      <h1>Finalizează Rezervarea</h1>
      
      <div className="booking-container">
        <div className="booking-summary">
          <h2>Sumar Comandă</h2>
          <div className="summary-offer">
            <img src={offer.image} alt={offer.title} />
            <div>
              <h3>{offer.title}</h3>
              <p>📍 {offer.location}</p>
            </div>
          </div>
          <div className="summary-pricing">
            <p>{offer.price} EUR × {formData.guests} persoane</p>
            <p className="total">Total: {totalPrice} EUR</p>
          </div>
        </div>
        
        <form className="booking-form" onSubmit={handleSubmit}>
          <h2>Date de Contact</h2>
          
          <div className="form-group">
            <label>Nume Complet</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Numele tău complet"
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="email@exemplu.com"
            />
          </div>
          
          <div className="form-group">
            <label>Telefon</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+40 7xx xxx xxx"
            />
          </div>
          
          <div className="form-group">
            <label>Număr Persoane</label>
            <input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              min="1"
              max={offer.availableSlots}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Metodă de Plată</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="card">Card Bancar</option>
              <option value="transfer">Ordin de Plată</option>
            </select>
          </div>
          
          <button type="submit" className="submit-button" disabled={submitting}>
            {submitting ? 'Se procesează...' : `Plătește ${totalPrice} EUR`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Booking;