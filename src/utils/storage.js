const KEYS = {
  SESSIONS: 'luminary_study_sessions',
  BOOKMARKS: 'luminary_bookmarks',
  WRONG_ANSWERS: 'luminary_wrong_answers',
  QUIZ_HISTORY: 'luminary_quiz_history',
  SETTINGS: 'luminary_settings',
  ACTIVE_SESSION: 'luminary_active_session',
};

export const Storage = {
  getSessions() {
    try {
      const data = localStorage.getItem(KEYS.SESSIONS);
      if (!data) return [];
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return [];
      return parsed;
    } catch (e) {
      console.error('Failed to read sessions from storage', e);
      return [];
    }
  },

  saveSession(session) {
    try {
      const sessions = this.getSessions();
      // Always store new session with unique timestamp id at top of list
      const freshSession = {
        ...session,
        id: session.id || 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        createdAt: new Date().toISOString()
      };
      
      const updated = [freshSession, ...sessions.slice(0, 49)]; // keep latest 50
      localStorage.setItem(KEYS.SESSIONS, JSON.stringify(updated));
      this.saveActiveSession(freshSession);
      return updated;
    } catch (e) {
      console.error('Failed to save session to storage', e);
      return [];
    }
  },

  getActiveSession() {
    try {
      const data = localStorage.getItem(KEYS.ACTIVE_SESSION);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  saveActiveSession(session) {
    try {
      if (session) {
        localStorage.setItem(KEYS.ACTIVE_SESSION, JSON.stringify(session));
      } else {
        localStorage.removeItem(KEYS.ACTIVE_SESSION);
      }
    } catch (e) {
      console.error('Failed to save active session', e);
    }
  },

  deleteSession(id) {
    try {
      const sessions = this.getSessions().filter((s) => s.id !== id);
      localStorage.setItem(KEYS.SESSIONS, JSON.stringify(sessions));
      const active = this.getActiveSession();
      if (active?.id === id) {
        this.saveActiveSession(null);
      }
      return sessions;
    } catch (e) {
      console.error('Failed to delete session', e);
      return [];
    }
  },

  clearAllSessions() {
    try {
      localStorage.removeItem(KEYS.SESSIONS);
      localStorage.removeItem(KEYS.ACTIVE_SESSION);
      return [];
    } catch (e) {
      return [];
    }
  },

  getBookmarks() {
    try {
      const data = localStorage.getItem(KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  toggleBookmark(item) {
    try {
      const bookmarks = this.getBookmarks();
      const exists = bookmarks.some((b) => b.id === item.id);
      let updated;
      if (exists) {
        updated = bookmarks.filter((b) => b.id !== item.id);
      } else {
        updated = [{ ...item, savedAt: new Date().toISOString() }, ...bookmarks];
      }
      localStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(updated));
      return updated;
    } catch (e) {
      return [];
    }
  },

  getWrongAnswers() {
    try {
      const data = localStorage.getItem(KEYS.WRONG_ANSWERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  addWrongAnswer(questionObj, topic) {
    try {
      const list = this.getWrongAnswers();
      if (!list.some((q) => q.id === questionObj.id)) {
        const updated = [{ ...questionObj, topic, addedAt: new Date().toISOString() }, ...list];
        localStorage.setItem(KEYS.WRONG_ANSWERS, JSON.stringify(updated));
        return updated;
      }
      return list;
    } catch (e) {
      return [];
    }
  },

  removeWrongAnswer(id) {
    try {
      const list = this.getWrongAnswers().filter((q) => q.id !== id);
      localStorage.setItem(KEYS.WRONG_ANSWERS, JSON.stringify(list));
      return list;
    } catch (e) {
      return [];
    }
  },

  getSettings() {
    try {
      const data = localStorage.getItem(KEYS.SETTINGS);
      return data
        ? JSON.parse(data)
        : {
            theme: 'dark',
            customApiKey: '',
            enableShortcuts: true,
            autoSave: true,
            strictValidation: true,
          };
    } catch (e) {
      return {
        theme: 'dark',
        customApiKey: '',
        enableShortcuts: true,
        autoSave: true,
        strictValidation: true,
      };
    }
  },

  saveSettings(settings) {
    try {
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  },
};
