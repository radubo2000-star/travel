import { useState, useEffect } from 'react';
import { getOffers, getBookings, updateOffer, deleteOffer } from '../services/api';
import './Admin.css';

function Admin() {
  const [offers, setOffers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('offers');
  const [loading, setLoading] = useState(true);
  const [editingOffer, setEditingOffer] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const offersData = await getOffers();
      const bookingsData = await getBookings();
      setOffers(offersData);
      setBookings(bookingsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOffer = async (id) => {
    if (confirm('Sigur doriți să ștergeți această ofertă?')) {
      try {
        await deleteOffer(id);
        setOffers(offers.filter(o => o.id !== id));
      } catch (err) {
        alert('Eroare la ștergere');
      }
    }
  };

  const handleUpdateOffer = async (offer) => {
    try {
      await updateOffer(offer.id, offer);
      setOffers(offers.map(o => o.id === offer.id ? offer : o));
      setEditingOffer(null);
      alert('Oferta actualizată!');
    } catch (err) {
      alert('Eroare la actualizare');
    }
  };

  if (loading) return <div className="loading">Se încarcă...</div>;

  return (
    <div className="admin-page">
      <h1>Panou de Administrare</h1>
      
      <div className="admin-tabs">
        <button 
          className={activeTab === 'offers' ? 'active' : ''} 
          onClick={() => setActiveTab('offers')}
        >
          Oferte ({offers.length})
        </button>
        <button 
          className={activeTab === 'bookings' ? 'active' : ''} 
          onClick={() => setActiveTab('bookings')}
        >
          Rezervări ({bookings.length})
        </button>
      </div>
      
      {activeTab === 'offers' && (
        <div className="admin-offers">
          <table>
            <thead>
              <tr>
                <th>Titlu</th>
                <th>Locație</th>
                <th>Preț</th>
                <th>Locuri</th>
                <th>Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {offers.map(offer => (
                <tr key={offer.id}>
                  <td>{offer.title}</td>
                  <td>{offer.location}</td>
                  <td>{offer.price} EUR</td>
                  <td>{offer.availableSlots}</td>
                  <td>
                    <button 
                      className="edit-btn"
                      onClick={() => setEditingOffer(offer)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteOffer(offer.id)}
                    >
                      Șterge
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {activeTab === 'bookings' && (
        <div className="admin-bookings">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nume</th>
                <th>Email</th>
                <th>Ofertă</th>
                <th>Persoane</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.id}>
                  <td>#{booking.id}</td>
                  <td>{booking.name}</td>
                  <td>{booking.email}</td>
                  <td>{booking.offerTitle}</td>
                  <td>{booking.guests}</td>
                  <td>{booking.totalPrice} EUR</td>
                  <td>
                    <span className={`status status-${booking.status}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {editingOffer && (
        <div className="modal">
          <div className="modal-content">
            <h2>Editează Ofertă</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdateOffer(editingOffer);
            }}>
              <div className="form-group">
                <label>Titlu</label>
                <input 
                  type="text" 
                  value={editingOffer.title}
                  onChange={(e) => setEditingOffer({...editingOffer, title: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Preț</label>
                <input 
                  type="number" 
                  value={editingOffer.price}
                  onChange={(e) => setEditingOffer({...editingOffer, price: parseInt(e.target.value)})}
                />
              </div>
              <div className="form-group">
                <label>Locuri Disponibile</label>
                <input 
                  type="number" 
                  value={editingOffer.availableSlots}
                  onChange={(e) => setEditingOffer({...editingOffer, availableSlots: parseInt(e.target.value)})}
                />
              </div>
              <div className="modal-buttons">
                <button type="submit">Salvează</button>
                <button type="button" onClick={() => setEditingOffer(null)}>Anulează</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;