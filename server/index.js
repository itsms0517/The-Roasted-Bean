import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());

// Data storage helpers
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

function readData(file, fallback = []) {
  try {
    const filePath = path.join(dataDir, file);
    if (!fs.existsSync(filePath)) return fallback;
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
    return fallback;
  }
}

function writeData(file, data) {
  try {
    const filePath = path.join(dataDir, file);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${file}:`, err);
    return false;
  }
}

// 1. Health Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'The Roasted Bean',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// 2. Menu Endpoints
app.get('/api/menu', (req, res) => {
  const menu = readData('menu.json', { coffees: [], foods: [] });
  res.json(menu);
});

app.get('/api/menu/coffee', (req, res) => {
  const menu = readData('menu.json', { coffees: [], foods: [] });
  res.json(menu.coffees || []);
});

app.get('/api/menu/food', (req, res) => {
  const menu = readData('menu.json', { coffees: [], foods: [] });
  res.json(menu.foods || []);
});

// 3. Table Reservations
app.post('/api/reservations', (req, res) => {
  const { name, phone, email, guests, date, time, notes } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const reservations = readData('reservations.json', []);
  const bookingId = 'TRB-' + Math.floor(1000 + Math.random() * 9000);
  
  const newReservation = {
    id: bookingId,
    name: name.trim(),
    phone: phone ? phone.trim() : null,
    email: email ? email.trim() : null,
    guests: guests || '2 Guests',
    date: date || new Date().toISOString().split('T')[0],
    time: time || '18:00',
    notes: notes || '',
    status: 'CONFIRMED',
    createdAt: new Date().toISOString()
  };

  reservations.push(newReservation);
  writeData('reservations.json', reservations);

  res.status(201).json({
    success: true,
    message: 'Reservation confirmed successfully',
    bookingId,
    reservation: newReservation
  });
});

app.get('/api/reservations', (req, res) => {
  const reservations = readData('reservations.json', []);
  res.json(reservations);
});

// 4. Newsletter Subscription
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email address is required' });
  }

  const subscribers = readData('subscribers.json', []);
  const normalized = email.trim().toLowerCase();

  if (subscribers.some(sub => sub.email === normalized)) {
    return res.json({
      success: true,
      alreadySubscribed: true,
      message: 'You are already subscribed to The Roasted Bean Reserve.'
    });
  }

  const newSubscriber = {
    email: normalized,
    subscribedAt: new Date().toISOString()
  };

  subscribers.push(newSubscriber);
  writeData('subscribers.json', subscribers);

  res.status(201).json({
    success: true,
    message: 'Welcome to The Roasted Bean Reserve. Your welcome invitation is on its way.'
  });
});

// 5. Orders / Inquiries
app.post('/api/orders', (req, res) => {
  const { item, type, customerName, tableNumber } = req.body;
  const orderId = 'ORD-' + Math.floor(10000 + Math.random() * 90000);

  res.status(201).json({
    success: true,
    orderId,
    message: `Order received for ${item || 'Artisanal Selection'}. Our barista is crafting it now.`,
    timestamp: new Date().toISOString()
  });
});

// 6. Serve Production Frontend Static Assets
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[The Roasted Bean] Server running on http://0.0.0.0:${PORT}`);
});
