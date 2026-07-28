import { useState, useRef, useCallback } from 'react';
import { fetchAIStudyContent } from '../services/api';

export function useAIGenerate() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [data, setData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState(null);
  const [lastPrompt, setLastPrompt] = useState('');
  
  // Active request controller ref to implement "Latest request wins" / abort stale requests
  const abortControllerRef = useRef(null);

  const generate = useCallback(async (promptText, customApiKey = '') => {
    if (!promptText || promptText.trim().length === 0) {
      setError('Please provide a topic or study notes.');
      setStatus('error');
      return;
    }

    const topic = promptText.trim();
    console.log("User Input:", topic);

    // Cancel ongoing request if present
    if (abortControllerRef.current) {
      console.log('[useAIGenerate] Cancelling previous pending request.');
      abortControllerRef.current.abort();
    }

    // Create fresh AbortController
    const controller = new AbortController();
    abortControllerRef.current = controller;

    // STATE CLEANUP BEFORE GENERATION: Clear all previous response state immediately!
    setData(null);
    setMeta(null);
    setError(null);
    setStatus('loading');
    setLastPrompt(topic);

    try {
      const response = await fetchAIStudyContent(topic, customApiKey, controller.signal);

      // Check if this request was aborted during execution
      if (controller.signal.aborted) {
        return;
      }

      console.log("React State (Generated Data Topic):", response.data?.topic);
      setData(response.data);
      setMeta(response.meta);
      setStatus('success');
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('[useAIGenerate] Request aborted cleanly.');
        return;
      }

      console.error('[useAIGenerate Error]', err);
      setError(err.message || 'Failed to generate study content. Please check your network or try again.');
      setStatus('error');
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
    }
  }, []);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setStatus('idle');
      setData(null);
      setError('Generation request cancelled by user.');
    }
  }, []);

  const retry = useCallback((customApiKey = '') => {
    if (lastPrompt) {
      generate(lastPrompt, customApiKey);
    }
  }, [generate, lastPrompt]);

  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setStatus('idle');
    setData(null);
    setMeta(null);
    setError(null);
    setLastPrompt('');
  }, []);

  return {
    status,
    data,
    meta,
    error,
    lastPrompt,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
    generate,
    cancel,
    retry,
    reset,
  };
}
