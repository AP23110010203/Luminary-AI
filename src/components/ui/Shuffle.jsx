import React, { useEffect, useRef, useState, useCallback } from 'react';
import './Shuffle.css';

const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export default function Shuffle({
  text = '',
  children,
  className = '',
  style = {},
  duration = 0.35,
  scrambleCharset = DEFAULT_CHARSET,
  tag: Tag = 'p',
  textAlign = 'center',
  triggerOnHover = true
}) {
  const contentText = text || (typeof children === 'string' ? children : String(children || ''));
  const [displayText, setDisplayText] = useState(contentText);
  const intervalRef = useRef(null);

  const startShuffle = useCallback(() => {
    if (!contentText) return;
    if (intervalRef.current) clearInterval(intervalRef.current);

    let iteration = 0;
    const totalSteps = contentText.length * 2.5;

    intervalRef.current = setInterval(() => {
      setDisplayText(
        contentText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / 2.5) {
              return contentText[index];
            }
            return scrambleCharset[Math.floor(Math.random() * scrambleCharset.length)];
          })
          .join('')
      );

      iteration += 1;

      if (iteration > totalSteps) {
        clearInterval(intervalRef.current);
        setDisplayText(contentText);
      }
    }, 25);
  }, [contentText, scrambleCharset]);

  useEffect(() => {
    startShuffle();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [contentText]);

  return (
    <Tag
      className={`shuffle-parent ${className}`}
      style={{ textAlign, ...style }}
      onMouseEnter={triggerOnHover ? startShuffle : undefined}
    >
      {displayText}
    </Tag>
  );
}

export { Shuffle };
