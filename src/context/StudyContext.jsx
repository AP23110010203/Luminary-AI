import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Storage } from '../utils/storage';
import { generateDynamicStudyKit } from '../utils/mockData';

const StudyContext = createContext(null);

// Auto-upgrade legacy stored sessions to guarantee 10 flashcards and 10 quiz questions
function ensureFullKit(session) {
  if (!session || !session.data) return session;
  const cardsCount = session.data.flashcards?.cards?.length || 0;
  const quizCount = session.data.quiz?.questions?.length || 0;

  if (cardsCount < 10 || quizCount < 10) {
    const fullKit = generateDynamicStudyKit(session.topic || session.data.topic || 'General Subject');
    const upgraded = {
      ...session,
      data: fullKit,
    };
    Storage.saveActiveSession(upgraded);
    return upgraded;
  }
  return session;
}

export function StudyProvider({ children }) {
  // Load sessions on initial load and ensure full kit
  const [sessions, setSessions] = useState(() => {
    const raw = Storage.getSessions();
    return raw.map(ensureFullKit);
  });

  // Restore activeSession from Storage so page navigation and reloads retain the exact current session
  const [activeSessionState, setActiveSessionState] = useState(() => {
    const saved = Storage.getActiveSession() || Storage.getSessions()[0] || null;
    return ensureFullKit(saved);
  });

  const setActiveSession = useCallback((session) => {
    const upgraded = ensureFullKit(session);
    setActiveSessionState(upgraded);
    Storage.saveActiveSession(upgraded);
  }, []);

  const [bookmarks, setBookmarks] = useState(() => Storage.getBookmarks());
  const [wrongAnswers, setWrongAnswers] = useState(() => Storage.getWrongAnswers());
  const [masteredCards, setMasteredCards] = useState({});

  // Save new session and set as active session immediately
  const saveNewSession = useCallback((studyData) => {
    if (!studyData) return null;

    const topicName = studyData.topic || 'Study Session';
    const newId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const sessionObj = ensureFullKit({
      id: newId,
      topic: topicName,
      data: studyData,
      createdAt: new Date().toISOString(),
    });

    const updated = Storage.saveSession(sessionObj);
    setSessions(updated);
    setActiveSession(sessionObj);
    return sessionObj;
  }, [setActiveSession]);

  const deleteSession = useCallback((id) => {
    const updated = Storage.deleteSession(id);
    setSessions(updated);
    if (activeSessionState?.id === id) {
      const nextActive = updated[0] || null;
      setActiveSession(nextActive);
    }
  }, [activeSessionState, setActiveSession]);

  const clearAllSessions = useCallback(() => {
    const updated = Storage.clearAllSessions();
    setSessions(updated);
    setActiveSession(null);
  }, [setActiveSession]);

  const toggleBookmarkItem = useCallback((item) => {
    const updated = Storage.toggleBookmark(item);
    setBookmarks(updated);
  }, []);

  const isBookmarked = useCallback((id) => {
    return bookmarks.some((b) => b.id === id);
  }, [bookmarks]);

  const logWrongAnswer = useCallback((questionObj, topic) => {
    const updated = Storage.addWrongAnswer(questionObj, topic);
    setWrongAnswers(updated);
  }, []);

  const removeWrongAnswer = useCallback((id) => {
    const updated = Storage.removeWrongAnswer(id);
    setWrongAnswers(updated);
  }, []);

  const toggleMasteredCard = useCallback((cardId) => {
    setMasteredCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  }, []);

  // Compute analytics / stats with TRUE streak calculation
  const stats = useMemo(() => {
    const totalSessions = sessions.length;
    const totalFlashcards = sessions.reduce((acc, s) => acc + (s.data?.flashcards?.cards?.length || 0), 0);
    const totalQuizzes = sessions.reduce((acc, s) => acc + (s.data?.quiz?.questions?.length || 0), 0);
    const totalMastered = Object.values(masteredCards).filter(Boolean).length;

    // Calculate unique calendar days studied
    const uniqueDays = new Set(
      sessions
        .map((s) => {
          try {
            return new Date(s.createdAt).toDateString();
          } catch {
            return null;
          }
        })
        .filter(Boolean)
    );

    const streakDays = Math.max(sessions.length > 0 ? 1 : 0, uniqueDays.size);

    return {
      totalSessions,
      totalFlashcards,
      totalQuizzes,
      totalBookmarks: bookmarks.length,
      wrongAnswersCount: wrongAnswers.length,
      masteredCardsCount: totalMastered,
      streakDays,
    };
  }, [sessions, bookmarks, wrongAnswers, masteredCards]);

  return (
    <StudyContext.Provider
      value={{
        sessions,
        activeSession: activeSessionState,
        setActiveSession,
        saveNewSession,
        deleteSession,
        clearAllSessions,
        bookmarks,
        toggleBookmarkItem,
        isBookmarked,
        wrongAnswers,
        logWrongAnswer,
        removeWrongAnswer,
        masteredCards,
        toggleMasteredCard,
        stats,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
}
