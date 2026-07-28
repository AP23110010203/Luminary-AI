import React, { createContext, useContext, useState, useEffect } from 'react';
import { Storage } from '../utils/storage';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [settings, setSettingsState] = useState(() => Storage.getSettings());

  useEffect(() => {
    // Apply dark mode class to root HTML
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [settings.theme]);

  const updateSettings = (newPartial) => {
    const updated = { ...settings, ...newPartial };
    setSettingsState(updated);
    Storage.saveSettings(updated);
  };

  return (
    <ThemeContext.Provider value={{ settings, updateSettings }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
