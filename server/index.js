import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { generateStudyContent } from './geminiService.js';
import { db } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Attach Auth & Admin API Routers
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '');
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    apiKeyConfigured: hasKey,
    mode: hasKey ? 'live' : 'mock-fallback',
  });
});

// Generate Study Material Endpoint (Records generation event in database)
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, apiKey, userId } = req.body;

    console.log("Received Topic:", prompt);

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid Request',
        message: 'A non-empty prompt or topic is required.',
      });
    }

    const result = await generateStudyContent(prompt.trim(), apiKey);

    // Record generation event & counts into persistent Database
    const flashcardCount = result.data?.flashcards?.cards?.length || 0;
    const quizCount = result.data?.quiz?.questions?.length || 0;

    db.recordAIRequest({
      userId: userId || 'usr_default',
      topic: prompt.trim(),
      flashcardsCount: flashcardCount,
      quizCount: quizCount,
      quizScore: 0,
    });

    return res.json({
      success: true,
      data: result.data,
      meta: {
        source: result.source,
        isMock: result.isMock,
        errorDetails: result.errorDetails || null,
      },
    });

  } catch (err) {
    console.error('[API /generate Error]', err);
    return res.status(500).json({
      error: 'Generation Failed',
      message: err.message || 'An unexpected error occurred during study content generation.',
    });
  }
});

export default app;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 AI SaaS Server running on http://localhost:${PORT}`);
    console.log(`🔐 Admin REST API endpoints mounted at /api/admin/*`);
  });
}
