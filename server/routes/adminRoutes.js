import express from 'express';
import { db } from '../db.js';
import { verifyToken, requireAdmin } from '../authMiddleware.js';

const router = express.Router();

// Enforce verifyToken AND requireAdmin on ALL routes in this router!
router.use(verifyToken);
router.use(requireAdmin);

// GET /api/admin/dashboard
router.get('/dashboard', (req, res) => {
  const metrics = db.getAggregatedAdminMetrics();
  return res.json({
    success: true,
    data: metrics,
    timestamp: new Date().toISOString(),
  });
});

// GET /api/admin/users
router.get('/users', (req, res) => {
  const databaseData = db.read();

  const userList = databaseData.users.map(user => {
    const userRequests = databaseData.ai_requests.filter(r => r.user_id === user.id).length;
    const userCards = databaseData.flashcards
      .filter(f => f.user_id === user.id)
      .reduce((sum, f) => sum + (f.card_count || 0), 0);
    const userQuizzes = databaseData.quizzes
      .filter(q => q.user_id === user.id)
      .reduce((sum, q) => sum + (q.question_count || 0), 0);
    const isActive = databaseData.active_sessions.some(s => s.user_id === user.id && s.is_active);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      created_at: user.created_at,
      last_login: user.last_login,
      status: isActive ? 'Online' : 'Offline',
      requests_count: userRequests,
      flashcards_count: userCards,
      quiz_count: userQuizzes,
      study_time_minutes: Math.max(10, userRequests * 12),
    };
  });

  return res.json({
    success: true,
    data: userList,
    count: userList.length,
  });
});

// GET /api/admin/online-users
router.get('/online-users', (req, res) => {
  const databaseData = db.read();
  const now = Date.now();

  const activeUsers = databaseData.active_sessions
    .filter(s => s.is_active)
    .map(session => {
      const loginMs = new Date(session.login_time).getTime();
      const elapsedSec = Math.max(1, Math.floor((now - loginMs) / 1000));
      const mins = Math.floor(elapsedSec / 60);
      const secs = elapsedSec % 60;

      return {
        session_id: session.token.substring(0, 12),
        user_id: session.user_id,
        name: session.user_name || 'Active User',
        email: session.user_email || 'user@luminary.ai',
        login_time: session.login_time,
        session_duration: mins > 0 ? `${mins}m ${secs}s` : `${secs}s`,
        session_duration_seconds: elapsedSec,
        status: 'Online',
        browser: session.browser,
        device: session.device,
        ip: session.ip,
        last_activity: session.last_activity,
      };
    });

  return res.json({
    success: true,
    data: activeUsers,
    count: activeUsers.length,
  });
});

// GET /api/admin/analytics
router.get('/analytics', (req, res) => {
  const databaseData = db.read();

  // Aggregate popular topics from AI requests
  const topicCounts = {};
  databaseData.ai_requests.forEach(r => {
    const t = r.topic || 'General';
    topicCounts[t] = (topicCounts[t] || 0) + 1;
  });

  const popularTopics = Object.entries(topicCounts)
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count);

  return res.json({
    success: true,
    data: {
      daily_users: databaseData.users.length,
      ai_requests_total: databaseData.ai_requests.length,
      flashcards_total: databaseData.flashcards.reduce((sum, f) => sum + (f.card_count || 0), 0),
      quizzes_total: databaseData.quizzes.reduce((sum, q) => sum + (q.question_count || 0), 0),
      popular_topics: popularTopics,
    }
  });
});

// GET /api/admin/activity
router.get('/activity', (req, res) => {
  const databaseData = db.read();
  return res.json({
    success: true,
    data: databaseData.login_logs.slice(0, 50),
  });
});

export default router;
