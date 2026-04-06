import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getMyBookings } from '../services/api';
import './MyBookings.css';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await getMyBookings();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed': return 'status-confirmed';
      case 'pending': return 'status-pending';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  const getPaymentStatusClass = (status) => {
    switch (status) {
      case 'paid': return 'payment-paid';
      case 'unpaid': return 'payment-unpaid';
      default: return '';
    }
  };

  if (!user) {
    return (
      <div className="my-bookings-page">
        <div className="no-bookings">
          <h2>Trebuie să fii autentificat</h2>
          <p>Pentru a vedea rezervările tale, autentifică-te sau creează un cont.</p>
          <div className="auth-buttons">
            <Link to="/login" className="btn-login">Autentifică-te</Link>
            <Link to="/register" className="btn-register">Creează cont</Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="my-bookings-page"><div className="loading">Se încarcă...</div></div>;
  }

  return (
    <div className="my-bookings-page">
      <div className="container">
        <h1> Rezervările Mele</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        {bookings.length === 0 ? (
          <div className="no-bookings">
            <h2>Nu ai nicio rezervare</h2>
            <p>Explorează ofertele noastre și rezervă acum următoarea ta vacanță!</p>
            <Link to="/offers" className="btn-offers">Vezi oferte</Link>
          </div>
        ) : (
          <div className="bookings-grid">
            {bookings.map(booking => (
              <div key={booking.id} className="booking-card">
                {booking.offerImage && (
                  <div className="booking-image">
                    <img src={booking.offerImage} alt={booking.offerTitle} />
                  </div>
                )}
                <div className="booking-content">
                  <h3>{booking.offerTitle}</h3>
                  <div className="booking-details">
                    <p><strong>Data:</strong> {booking.date}</p>
                    <p><strong>Persoane:</strong> {booking.guests}</p>
                    <p><strong>Total:</strong> {booking.totalPrice} EUR</p>
                  </div>
                  <div className="booking-statuses">
                    <span className={`status ${getStatusClass(booking.status)}`}>
                      {booking.status === 'confirmed' ? 'Confirmat' : 
                       booking.status === 'pending' ? 'În așteptare' : 'Anulat'}
                    </span>
                    <span className={`payment ${getPaymentStatusClass(booking.paymentStatus)}`}>
                      {booking.paymentStatus === 'paid' ? 'Plătit' : 'Neachitat'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;