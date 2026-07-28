import jwt from 'jsonwebtoken';
import { db } from './db.js';

export const JWT_SECRET = process.env.JWT_SECRET || 'luminary_ai_super_secret_jwt_key_2026';

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Bearer token required.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if session is active in database
    const session = db.findActiveSession(token);
    if (!session) {
      return res.status(401).json({ error: 'Session Expired', message: 'Token is inactive or expired.' });
    }

    req.user = decoded;
    req.token = token;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Token', message: 'JWT token verification failed.' });
  }
}

export function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({
      error: 'Forbidden Access',
      message: 'Admin authorization required. Access denied.'
    });
  }
  next();
}
