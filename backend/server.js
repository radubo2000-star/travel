const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = 12001;

app.use(cors());
app.use(bodyParser.json());

// Simple token generation
const generateToken = () => crypto.randomBytes(32).toString('hex');

// Mock data - Users
let users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@travel.ro',
    password: 'admin123',
    role: 'admin',
    phone: '+40 700 000 000'
  }
];

// Mock data - Offers
let offers = [
  {
    id: 1,
    title: 'Vacanță în Maldive',
    location: 'Maldive',
    description: '7 nopți de neuitat într-un resort de lux pe malul oceanului. Include piscină privată, masaj zilnic și croazieră la apus.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
    price: 2500,
    originalPrice: 3000,
    discount: 17,
    availableSlots: 8,
    includes: ['Cazare 7 nopți', 'All inclusive', 'Transfer cu barcă', 'Ghid local', 'Asigurare']
  },
  {
    id: 2,
    title: 'Descoperă Thailanda',
    location: 'Thailanda',
    description: 'Explorarea culturii thailandeze în 10 zile. Vizităm Bangkok, Chiang Mai și plajele din Phuket.',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800',
    price: 1800,
    originalPrice: 2200,
    discount: 18,
    availableSlots: 12,
    includes: ['Cazare 10 nopți', 'Mic dejun', 'Tururi ghidate', 'Bilete avion', 'Asigurare']
  },
  {
    id: 3,
    title: 'Ski în Alpi',
    location: 'Austria, Alpi',
    description: 'O săptămână pe pârtiile din Austria. Hotel de 4 stele cu acces la spa și skipass inclus.',
    image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800',
    price: 1500,
    originalPrice: 1800,
    discount: 17,
    availableSlots: 3,
    includes: ['Cazare 7 nopți', 'Skipass', 'Spa', 'Cina 5 zile', 'Instructor']
  },
  {
    id: 4,
    title: 'Croazieră Mediterana',
    location: 'Italia, Spania, Franța',
    description: '10 zile pe o croazieră de lux vizitând cele mai frumoase orașe mediteraneene.',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800',
    price: 3200,
    originalPrice: 4000,
    discount: 20,
    availableSlots: 15,
    includes: ['Cabină cu balcon', 'Mese incluse', 'Excursii', 'Spectacole', 'Asigurare']
  },
  {
    id: 5,
    title: 'Safari în Kenya',
    location: 'Kenia',
    description: '7 zile de safari în cele mai spectaculoase parcuri naționale din Kenya.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800',
    price: 2800,
    originalPrice: 3500,
    discount: 20,
    availableSlots: 6,
    includes: ['Cazare în lodge', 'Safari zilnic', 'Ghid expert', 'Mese complete', 'Asigurare']
  },
  {
    id: 6,
    title: 'Relaxare în Bali',
    location: 'Indonezia, Bali',
    description: '8 nopți de relaxare în Bali. Yoga, meditație și explorarea templelor.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    price: 1600,
    originalPrice: 2000,
    discount: 20,
    availableSlots: 10,
    includes: ['Cazare 8 nopți', 'Sesiuni yoga', 'Tururi', 'Mic dejun', 'Spa']
  }
];

let bookings = [
  {
    id: 1,
    name: 'Ion Popescu',
    email: 'ion@example.com',
    phone: '+40 721 111 111',
    offerId: 1,
    offerTitle: 'Vacanță în Maldive',
    guests: 2,
    totalPrice: 5000,
    status: 'confirmed',
    paymentMethod: 'card',
    date: '2024-03-15'
  },
  {
    id: 2,
    name: 'Maria Ionescu',
    email: 'maria@example.com',
    phone: '+40 722 222 222',
    offerId: 2,
    offerTitle: 'Descoperă Thailanda',
    guests: 1,
    totalPrice: 1800,
    status: 'pending',
    paymentMethod: 'transfer',
    date: '2024-03-10'
  }
];

// Routes
app.get('/api/offers', (req, res) => {
  res.json(offers);
});

app.get('/api/offers/:id', (req, res) => {
  const offer = offers.find(o => o.id === parseInt(req.params.id));
  if (!offer) {
    return res.status(404).json({ error: 'Offer not found' });
  }
  res.json(offer);
});

app.post('/api/bookings', (req, res) => {
  const { offerId, name, email, phone, guests, paymentMethod, totalPrice, userId } = req.body;
  
  const offer = offers.find(o => o.id === offerId);
  if (!offer) {
    return res.status(404).json({ error: 'Offer not found' });
  }
  
  if (offer.availableSlots < guests) {
    return res.status(400).json({ error: 'Nu sunt suficiente locuri disponibile' });
  }
  
  const newBooking = {
    id: bookings.length + 1,
    userId: userId || null,
    offerId,
    offerTitle: offer.title,
    offerImage: offer.image,
    name: userId ? undefined : name, // Use user data if logged in
    email: userId ? undefined : email,
    phone: userId ? undefined : phone,
    guests,
    totalPrice,
    paymentMethod,
    status: 'pending',
    paymentStatus: 'unpaid',
    date: new Date().toISOString().split('T')[0]
  };
  
  // If user is logged in, get their details
  if (userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
      newBooking.name = user.name;
      newBooking.email = user.email;
      newBooking.phone = user.phone || '';
    }
  }
  
  bookings.push(newBooking);
  offer.availableSlots -= guests;
  
  res.status(201).json(newBooking);
});

app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

app.put('/api/bookings/:id/status', (req, res) => {
  const { status } = req.body;
  const booking = bookings.find(b => b.id === parseInt(req.params.id));
  
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  
  booking.status = status;
  res.json(booking);
});

app.put('/api/offers/:id', (req, res) => {
  const offer = offers.find(o => o.id === parseInt(req.params.id));
  if (!offer) {
    return res.status(404).json({ error: 'Offer not found' });
  }
  
  Object.assign(offer, req.body);
  res.json(offer);
});

app.delete('/api/offers/:id', (req, res) => {
  const index = offers.findIndex(o => o.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Offer not found' });
  }
  
  offers.splice(index, 1);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============ USER AUTHENTICATION ROUTES ============

// Register new user
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, phone } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email și parolă sunt obligatorii' });
  }
  
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'Email deja înregistrat' });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password, // In production, hash this!
    role: 'client',
    phone: phone || ''
  };
  
  users.push(newUser);
  
  const token = generateToken();
  res.status(201).json({
    user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
    token
  });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email și parolă sunt obligatorii' });
  }
  
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Email sau parolă incorectă' });
  }
  
  const token = generateToken();
  res.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    token
  });
});

// Get current user profile
app.get('/api/auth/me', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Nu ești autentificat' });
  }
  
  // In production, validate token against stored tokens
  // For mock, we'll use a simple user lookup
  const userId = parseInt(req.headers['x-user-id']);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(401).json({ error: 'Utilizator invalid' });
  }
  
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone });
});

// Get user's bookings
app.get('/api/my-bookings', (req, res) => {
  const userId = parseInt(req.headers['x-user-id']);
  
  if (!userId) {
    return res.status(401).json({ error: 'Nu ești autentificat' });
  }
  
  const userBookings = bookings.filter(b => b.userId === userId);
  res.json(userBookings);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend API running on port ${PORT}`);
});