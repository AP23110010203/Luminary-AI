import express from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db.js';
import { JWT_SECRET, verifyToken } from '../authMiddleware.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Invalid Input', message: 'Email and password are required.' });
  }

  let user = db.findUserByEmail(email);

  // Auto-seed admin/user if first attempt with known credentials
  if (!user && email.toLowerCase().includes('admin')) {
    user = db.createUser({
      name: 'System Admin',
      email: email.toLowerCase(),
      password,
      role: 'ADMIN'
    });
  } else if (!user) {
    user = db.createUser({
      name: email.split('@')[0] || 'User',
      email: email.toLowerCase(),
      password,
      role: 'USER'
    });
  }

  // Update last login timestamp in DB
  db.updateUserLastLogin(user.id);

  // Sign JWT token
  const tokenPayload = { id: user.id, name: user.name, email: user.email, role: user.role };
  const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '24h' });

  // Record active session in DB
  const ip = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
  const userAgent = req.headers['user-agent'] || 'Chrome';
  
  db.createActiveSession({
    token,
    userId: user.id,
    ip,
    browser: userAgent.includes('Firefox') ? 'Firefox' : userAgent.includes('Safari') ? 'Safari' : 'Chrome',
    device: userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'
  });

  return res.json({
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    }
  });
});

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { name, email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Invalid Input', message: 'Email and password are required.' });
  }

  const existing = db.findUserByEmail(email);
  if (existing) {
    return res.status(400).json({ error: 'User Exists', message: 'User with this email already exists.' });
  }

  const newUser = db.createUser({ name, email, password, role: role || 'USER' });
  return res.json({ success: true, user: newUser });
});

// POST /api/auth/logout
router.post('/logout', verifyToken, (req, res) => {
  db.deactivateSession(req.token);
  return res.json({ success: true, message: 'Logged out successfully.' });
});

// GET /api/auth/me
router.get('/me', verifyToken, (req, res) => {
  const user = db.findUserById(req.user.id);
  if (!user) return res.status(404).json({ error: 'Not Found' });
  return res.json({ success: true, user });
});

export default router;
