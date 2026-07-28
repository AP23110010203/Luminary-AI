import { z } from 'zod';

// Flashcards schema (Supports 8-12 cards)
export const FlashcardItemSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).substring(2, 9)),
  question: z.string().min(3, "Question is too short"),
  answer: z.string().min(1, "Answer cannot be empty"),
  difficulty: z.string().default('medium'),
  hint: z.string().optional().default(''),
  topic: z.string().optional().default('General'),
});

export const FlashcardsBlockSchema = z.object({
  topic: z.string().default('Study Topic'),
  cards: z.array(FlashcardItemSchema).min(1, "Must contain flashcards"),
});

// Quiz schema (Supports 10 questions with correctAnswer string or correctAnswerIndex)
export const QuizQuestionSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).substring(2, 9)),
  question: z.string().min(5, "Question is too short"),
  options: z.array(z.string()).min(2, "Must have at least 2 options"),
  correctAnswer: z.string().optional(),
  correctAnswerIndex: z.number().int().optional().default(0),
  explanation: z.string().default("No explanation provided."),
  difficulty: z.string().optional().default("medium"),
});

export const QuizBlockSchema = z.object({
  topic: z.string().default('Study Topic'),
  questions: z.array(QuizQuestionSchema).min(1, "Must contain quiz questions"),
});

// Summary schema (Supports key_points, important_terms, real_world_examples)
export const SummarySectionSchema = z.object({
  title: z.string().default("Section"),
  content: z.string().default(""),
  subPoints: z.array(z.string()).optional().default([]),
});

export const SummaryBlockSchema = z.object({
  title: z.string().default("Topic Summary"),
  topic: z.string().default("Study Topic"),
  overview: z.string().default(""),
  key_points: z.array(z.string()).optional().default([]),
  important_terms: z.array(z.string()).optional().default([]),
  real_world_examples: z.array(z.string()).optional().default([]),
  keyTakeaways: z.array(z.string()).optional().default([]),
  sections: z.array(SummarySectionSchema).optional().default([]),
});

// Checklist schema
export const ChecklistItemSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).substring(2, 9)),
  task: z.string().min(2, "Task description required"),
  category: z.string().default("General"),
  completed: z.boolean().default(false),
});

export const ChecklistBlockSchema = z.object({
  topic: z.string().default("Study Topic"),
  items: z.array(ChecklistItemSchema).optional().default([]),
});

// Knowledge Graph schema (Supports 8-15 nodes & 10-20 edges)
export const KnowledgeGraphNodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  category: z.string().optional().default('Concept'),
  description: z.string().default('Core concept definition.'),
  val: z.number().optional().default(1),
});

export const KnowledgeGraphEdgeSchema = z.object({
  id: z.string().optional().default(() => Math.random().toString(36).substring(2, 9)),
  source: z.string(),
  target: z.string(),
  label: z.string().optional().default('connects to'),
  relationship: z.string().optional().default('related'),
});

export const KnowledgeGraphBlockSchema = z.object({
  topic: z.string().default("Study Topic"),
  nodes: z.array(KnowledgeGraphNodeSchema).min(1, "Must contain graph nodes"),
  edges: z.array(KnowledgeGraphEdgeSchema).default([]),
});

// Helper function to normalize raw AI JSON payloads into the app format
export function normalizeStudyPayload(raw) {
  if (!raw) return null;

  const topicName = raw.title || raw.topic || 'Study Topic';

  // Normalize Summary
  const summaryObj = raw.summary || {};
  const overviewText = summaryObj.overview || '';
  const keyPointsArr = summaryObj.key_points || summaryObj.keyTakeaways || [];
  const importantTermsArr = summaryObj.important_terms || [];
  const realWorldExamplesArr = summaryObj.real_world_examples || [];

  const sectionsArr = summaryObj.sections || [
    {
      title: `1. Core Principles of ${topicName}`,
      content: overviewText,
      subPoints: keyPointsArr.slice(0, 4),
    },
    {
      title: `2. Key Terminology & Concepts`,
      content: `Essential vocabulary and domain terms for ${topicName}.`,
      subPoints: importantTermsArr.length > 0 ? importantTermsArr : keyPointsArr.slice(4, 8),
    },
    {
      title: `3. Practical Real-World Applications`,
      content: `Practical implementations and real-world utility of ${topicName}.`,
      subPoints: realWorldExamplesArr.length > 0 ? realWorldExamplesArr : keyPointsArr.slice(8),
    }
  ];

  // Normalize Flashcards
  let rawCards = Array.isArray(raw.flashcards) ? raw.flashcards : (raw.flashcards?.cards || []);
  const normalizedCards = rawCards.map((c, idx) => ({
    id: c.id || `card-${idx + 1}`,
    question: c.question || `Question ${idx + 1}`,
    answer: c.answer || `Answer ${idx + 1}`,
    difficulty: c.difficulty || 'medium',
    hint: c.hint || '',
    topic: c.topic || topicName,
  }));

  // Normalize Quiz
  let rawQuiz = Array.isArray(raw.quiz) ? raw.quiz : (raw.quiz?.questions || []);
  const normalizedQuiz = rawQuiz.map((q, idx) => {
    let correctIdx = 0;
    if (typeof q.correctAnswerIndex === 'number') {
      correctIdx = q.correctAnswerIndex;
    } else if (q.correctAnswer && Array.isArray(q.options)) {
      const found = q.options.findIndex(opt => opt.trim().toLowerCase() === String(q.correctAnswer).trim().toLowerCase());
      if (found !== -1) correctIdx = found;
    }

    return {
      id: q.id || `quiz-${idx + 1}`,
      question: q.question || `Question ${idx + 1}`,
      options: Array.isArray(q.options) && q.options.length >= 2 ? q.options : ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: q.correctAnswer || (q.options ? q.options[correctIdx] : ''),
      correctAnswerIndex: correctIdx,
      explanation: q.explanation || 'Detailed factual explanation.',
      difficulty: q.difficulty || 'medium',
    };
  });

  // Normalize Knowledge Graph
  const rawGraph = raw.knowledgeGraph || {};
  const rawNodes = Array.isArray(rawGraph.nodes) ? rawGraph.nodes : [];
  const rawEdges = Array.isArray(rawGraph.edges) ? rawGraph.edges : [];

  const normalizedNodes = rawNodes.map((n, idx) => ({
    id: n.id || `node-${idx + 1}`,
    label: n.label || n.id || `Concept ${idx + 1}`,
    category: n.category || (idx === 0 ? 'Core Topic' : 'Sub-concept'),
    description: n.description || `Concept definition for ${n.label || topicName}.`,
    val: n.val || (idx === 0 ? 3 : 2),
  }));

  const normalizedEdges = rawEdges.map((e, idx) => ({
    id: e.id || `edge-${idx + 1}`,
    source: e.source || (normalizedNodes[0]?.id || 'n1'),
    target: e.target || (normalizedNodes[Math.min(idx + 1, normalizedNodes.length - 1)]?.id || 'n2'),
    label: e.relationship || e.label || 'relates to',
    relationship: e.relationship || e.label || 'related',
  }));

  // Normalize Checklist
  const normalizedChecklist = (raw.checklist?.items || normalizedCards.slice(0, 5).map((c, i) => ({
    id: `ck-${i + 1}`,
    task: `Review ${c.question.substring(0, 40)}`,
    category: 'Study',
    completed: false,
  })));

  return {
    topic: topicName,
    summary: {
      title: `${topicName}: Comprehensive Guide`,
      topic: topicName,
      overview: overviewText,
      key_points: keyPointsArr,
      important_terms: importantTermsArr,
      real_world_examples: realWorldExamplesArr,
      keyTakeaways: keyPointsArr.length > 0 ? keyPointsArr : keyPointsArr,
      sections: sectionsArr,
    },
    flashcards: {
      topic: topicName,
      cards: normalizedCards,
    },
    quiz: {
      topic: topicName,
      questions: normalizedQuiz,
    },
    checklist: {
      topic: topicName,
      items: normalizedChecklist,
    },
    knowledgeGraph: {
      topic: topicName,
      nodes: normalizedNodes,
      edges: normalizedEdges,
    },
  };
}

// Combined AI Response Schema
export const StudyContentSchema = z.object({
  topic: z.string().optional().default("Study Topic"),
  summary: SummaryBlockSchema,
  flashcards: FlashcardsBlockSchema,
  quiz: QuizBlockSchema,
  checklist: ChecklistBlockSchema.optional(),
  knowledgeGraph: KnowledgeGraphBlockSchema.optional(),
});
