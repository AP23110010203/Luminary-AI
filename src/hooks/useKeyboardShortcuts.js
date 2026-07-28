import { useEffect } from 'react';

export function useKeyboardShortcuts(shortcutsMap, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(event) {
      // Ignore key events when user is typing inside text inputs, textareas, or contentEditable
      const target = event.target;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      if (isInput) return;

      const key = event.key;
      const isCtrlOrCmd = event.metaKey || event.ctrlKey;

      if (isCtrlOrCmd && key.toLowerCase() === 'k' && shortcutsMap['ctrl+k']) {
        event.preventDefault();
        shortcutsMap['ctrl+k']();
        return;
      }

      if (shortcutsMap[key]) {
        event.preventDefault();
        shortcutsMap[key]();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcutsMap, enabled]);
}
