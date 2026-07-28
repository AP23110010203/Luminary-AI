import React, { useEffect, useState, useRef } from 'react';
import './DecryptedText.css';

const DEFAULT_GLYPHS = '011001!@#$%^&*()_+-=[]{}|;:<>?ABCDEFGHJKLMNPQRSTUVWXYZ';

export default function DecryptedText({
  text,
  children,
  speed = 35,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = DEFAULT_GLYPHS,
  className = '',
  encryptedClassName = 'encrypted',
  parentClassName = '',
  animateOn = 'hover',
  ...props
}) {
  const contentText = text || children || '';
  const [displayText, setDisplayText] = useState(contentText);
  const intervalRef = useRef(null);

  const startDecryption = () => {
    if (!contentText) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    let iteration = 0;
    const length = contentText.length;

    intervalRef.current = setInterval(() => {
      setDisplayText(
        contentText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return contentText[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      iteration += 0.6;

      if (iteration >= length) {
        clearInterval(intervalRef.current);
        setDisplayText(contentText);
      }
    }, speed);
  };

  useEffect(() => {
    startDecryption();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [contentText]);

  return (
    <span
      className={`decrypted-text ${parentClassName} ${className}`}
      onMouseEnter={startDecryption}
      {...props}
    >
      {displayText}
    </span>
  );
}

export { DecryptedText };
