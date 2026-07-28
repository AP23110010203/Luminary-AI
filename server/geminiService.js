import { GoogleGenerativeAI } from '@google/generative-ai';
import { StudyContentSchema, normalizeStudyPayload } from '../src/schemas/studySchema.js';
import { repairAndParseJSON } from '../src/utils/jsonFixer.js';
import { generateDynamicStudyKit } from '../src/utils/mockData.js';

export async function generateStudyContent(topicOrText, customApiKey) {
  const apiKey = customApiKey || process.env.GEMINI_API_KEY;
  const userTopic = (topicOrText || '').trim();

  if (!apiKey || apiKey.trim() === '') {
    console.log(`[GeminiService] Synthesizing rich topic-specific study kit for: "${userTopic}"`);
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const mockPayload = generateDynamicStudyKit(userTopic);
    const normalized = normalizeStudyPayload(mockPayload);
    const validated = StudyContentSchema.parse(normalized);
    console.log("Parsed JSON (Multi-Domain Synthesizer):", validated.topic);
    return { data: validated, source: 'dynamic-synthesizer', isMock: true };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    let model;
    try {
      model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });
    } catch {
      model = genAI.getGenerativeModel({
        model: 'gemini-1.5-pro',
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });
    }

    const prompt = `
You are a World-Class AI Master Tutor and Subject Matter Expert.

CRITICAL INSTRUCTION:
Generate deep, factually accurate, highly specific study material ONLY for the topic: "${userTopic}".

ABSOLUTE REQUIREMENTS:
1. TOPIC ACCURACY:
   - If "${userTopic}" is a TV show (e.g., "Tom and Jerry", "Friends", "Game of Thrones", "HBO"), generate facts, characters, creators, episodes, awards, and broadcast history specific to "${userTopic}".
   - If "${userTopic}" is a programming topic (e.g., "React Hooks", "Python", "Java", "C++", "Rust"), generate code concepts, methods, hooks, paradigms, and syntax rules specific to "${userTopic}".
   - If "${userTopic}" is a computer science topic (e.g., "Operating System", "DBMS", "Computer Networks", "DSA"), generate exact algorithms, memory models, protocols, and architectural facts specific to "${userTopic}".

2. NO BOILERPLATE / NO REPETITION:
   - DO NOT output generic phrases like "What is the core function of X" or "Question testing key concept".
   - Write REAL, concrete, testable questions and factual, complete answers.
   - Every question must test a different specific aspect of "${userTopic}".
   - Every answer must provide specific, educational details.

3. QUANTITATIVE OUTPUTS:
   - FLASHCARDS: EXACTLY 10 unique, detailed flashcards about "${userTopic}".
   - QUIZ: EXACTLY 10 multiple-choice questions about "${userTopic}" with 4 distinct options, correct answer string, and detailed explanation.
   - KNOWLEDGE GRAPH: 8 to 15 concept nodes representing specific real-world sub-topics of "${userTopic}", plus 10 to 20 relationship edges connecting them.
   - SUMMARY: Detailed overview, 5 key points, 4 important terms with definitions, and 2 real-world examples specifically explaining "${userTopic}".

Return ONLY raw valid JSON matching this schema:

{
  "title": "${userTopic}",
  "summary": {
    "overview": "Detailed factual overview specifically explaining ${userTopic}...",
    "key_points": [
      "Factual key point 1 about ${userTopic}",
      "Factual key point 2 about ${userTopic}",
      "Factual key point 3 about ${userTopic}",
      "Factual key point 4 about ${userTopic}",
      "Factual key point 5 about ${userTopic}"
    ],
    "important_terms": [
      "Term 1: Specific definition in ${userTopic}",
      "Term 2: Specific definition in ${userTopic}"
    ],
    "real_world_examples": [
      "Real application 1 of ${userTopic}",
      "Real application 2 of ${userTopic}"
    ]
  },
  "flashcards": [
    {
      "id": "fc-1",
      "question": "Specific testable question about ${userTopic}?",
      "answer": "Factually precise detailed answer.",
      "difficulty": "easy"
    }
  ],
  "quiz": [
    {
      "id": "q-1",
      "question": "Specific multiple choice question about ${userTopic}?",
      "options": ["Correct option text", "Incorrect distractor B", "Incorrect distractor C", "Incorrect distractor D"],
      "correctAnswer": "Correct option text",
      "explanation": "Detailed explanation of why this answer is correct for ${userTopic}.",
      "difficulty": "easy"
    }
  ],
  "knowledgeGraph": {
    "nodes": [
      {
        "id": "n1",
        "label": "Specific sub-concept of ${userTopic}",
        "description": "Definition of this specific sub-concept."
      }
    ],
    "edges": [
      {
        "source": "n1",
        "target": "n2",
        "relationship": "meaningful relationship description"
      }
    ]
  }
}
`;

    console.log("Prompt:", prompt);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text();

    console.log("AI Response:", rawText.substring(0, 300) + '...');

    const parsedJSON = repairAndParseJSON(rawText);
    console.log("Parsed JSON:", parsedJSON?.title || parsedJSON?.topic);

    const normalizedData = normalizeStudyPayload(parsedJSON);
    const validatedData = StudyContentSchema.parse(normalizedData);

    return { data: validatedData, source: 'gemini-api', isMock: false };

  } catch (error) {
    console.error('[GeminiService Error]', error.message);
    const fallbackPayload = generateDynamicStudyKit(userTopic);
    const normalizedFallback = normalizeStudyPayload(fallbackPayload);
    const validatedFallback = StudyContentSchema.parse(normalizedFallback);
    return { data: validatedFallback, source: 'dynamic-fallback', isMock: true, errorDetails: error.message };
  }
}
