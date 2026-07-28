import React, { useEffect, useRef, useState, useCallback } from 'react';
import './ScrambledText.css';

const DEFAULT_CHARS = '!@#$%^&*.:/?<>ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export default function ScrambledText({
  children,
  text,
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = DEFAULT_CHARS,
  className = '',
  style = {}
}) {
  const contentText = text || (typeof children === 'string' ? children : String(children || ''));
  const [displayText, setDisplayText] = useState(contentText);
  const intervalRef = useRef(null);

  const triggerScramble = useCallback(() => {
    if (!contentText) return;
    if (intervalRef.current) clearInterval(intervalRef.current);

    let iteration = 0;
    const totalSteps = contentText.length * 3;

    intervalRef.current = setInterval(() => {
      setDisplayText(
        contentText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / 3) {
              return contentText[index];
            }
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join('')
      );

      iteration += 1;

      if (iteration > totalSteps) {
        clearInterval(intervalRef.current);
        setDisplayText(contentText);
      }
    }, 25);
  }, [contentText, scrambleChars]);

  useEffect(() => {
    setDisplayText(contentText);
  }, [contentText]);

  return (
    <span
      className={`scrambled-text-container ${className}`}
      style={{ display: 'inline-block', ...style }}
      onMouseEnter={triggerScramble}
    >
      {displayText}
    </span>
  );
}

export { ScrambledText };
