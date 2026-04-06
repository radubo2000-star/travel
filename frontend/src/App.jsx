import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Offers from './pages/Offers';
import OfferDetail from './pages/OfferDetail';
import Booking from './pages/Booking';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBookings from './pages/MyBookings';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/offers/:id" element={<OfferDetail />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
