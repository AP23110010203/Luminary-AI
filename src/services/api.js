import { StudyContentSchema, normalizeStudyPayload } from '../schemas/studySchema.js';
import { repairAndParseJSON } from '../utils/jsonFixer.js';
import { generateDynamicStudyKit } from '../utils/mockData.js';

/**
 * Service to request AI generation from backend API or client fallback
 */
export async function fetchAIStudyContent(promptText, customApiKey = '', signal = null) {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: promptText,
        apiKey: customApiKey,
      }),
      signal,
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      throw new Error(errJson.message || `Server returned HTTP ${response.status}`);
    }

    const result = await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.error || 'Server did not return study data');
    }

    // Normalize and validate structure using Zod frontend schema
    const normalizedData = normalizeStudyPayload(result.data);
    const validatedData = StudyContentSchema.parse(normalizedData);

    return {
      data: validatedData,
      meta: result.meta || { source: 'api', isMock: false },
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error; // Let caller handle abort cleanly
    }

    console.warn('[API Client Warning] Backend API fetch failed, activating resilient dynamic client fallback:', error.message);

    // Dynamic topic fallback generator (0 hardcoded data)
    const mockPayload = generateDynamicStudyKit(promptText);
    const normalizedFallback = normalizeStudyPayload(mockPayload);
    const validatedFallback = StudyContentSchema.parse(normalizedFallback);

    return {
      data: validatedFallback,
      meta: {
        source: 'client-fallback',
        isMock: true,
        fallbackReason: error.message,
      },
    };
  }
}
