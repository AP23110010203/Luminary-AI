import React, { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const targetPos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  const [hoverState, setHoverState] = useState('default'); // 'default' | 'button' | 'input' | 'card'
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch-only devices
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      setIsTouchDevice(true);
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      let el = e.target;
      if (!el) return;

      // Handle text nodes
      if (el.nodeType === 3) {
        el = el.parentElement;
      }

      if (!el || typeof el.closest !== 'function') {
        setHoverState('default');
        return;
      }

      try {
        const isButtonOrLink =
          el.tagName === 'BUTTON' ||
          el.tagName === 'A' ||
          Boolean(el.closest('button')) ||
          Boolean(el.closest('a')) ||
          (typeof el.getAttribute === 'function' && el.getAttribute('role') === 'button') ||
          (el.classList && el.classList.contains('cursor-pointer'));

        const isInput =
          el.tagName === 'INPUT' ||
          el.tagName === 'TEXTAREA' ||
          el.isContentEditable;

        const isCard = Boolean(el.closest('.glass-card')) || Boolean(el.closest('[data-hover-card]'));

        if (isInput) {
          setHoverState('input');
        } else if (isButtonOrLink) {
          setHoverState('button');
        } else if (isCard) {
          setHoverState('card');
        } else {
          setHoverState('default');
        }
      } catch (err) {
        setHoverState('default');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // 60FPS / 120FPS RequestAnimationFrame Lerp Animation Loop
    let animationFrameId;

    const render = () => {
      // Lerp Dot (Fast & Precise)
      dotPos.current.x += (targetPos.current.x - dotPos.current.x) * 0.55;
      dotPos.current.y += (targetPos.current.y - dotPos.current.y) * 0.55;

      // Lerp Ring (Smooth Fluid Follower)
      ringPos.current.x += (targetPos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (targetPos.current.y - ringPos.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  // Dynamic Ring Size & Styling per hover state
  let ringSize = 'w-10 h-10 border-[#00E5FF]/60 bg-transparent shadow-[0_0_20px_rgba(0,229,255,0.3)]';
  let dotSize = 'w-2.5 h-2.5 bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]';

  if (hoverState === 'button') {
    ringSize = 'w-14 h-14 border-[#00E5FF] bg-[#00E5FF]/15 shadow-[0_0_30px_rgba(0,229,255,0.7)] scale-110';
    dotSize = 'w-3.5 h-3.5 bg-white shadow-[0_0_15px_#ffffff]';
  } else if (hoverState === 'input') {
    ringSize = 'w-6 h-6 border-[#7B61FF] bg-[#7B61FF]/20 shadow-[0_0_15px_rgba(123,97,255,0.6)]';
    dotSize = 'w-1.5 h-1.5 bg-[#7B61FF]';
  } else if (hoverState === 'card') {
    ringSize = 'w-12 h-12 border-[#4F8CFF]/80 bg-[#4F8CFF]/10 shadow-[0_0_25px_rgba(79,140,255,0.5)]';
    dotSize = 'w-2.5 h-2.5 bg-[#00E5FF]';
  }

  if (isClicking) {
    ringSize += ' scale-75 border-pink-500 shadow-[0_0_25px_#ec4899]';
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Silky Smooth Glowing Aura Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border-2 transition-all duration-300 ease-out will-change-transform ${ringSize}`}
        style={{ left: 0, top: 0 }}
      />

      {/* Inner Precision Cyan Glowing Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full transition-all duration-150 ease-out will-change-transform ${dotSize}`}
        style={{ left: 0, top: 0 }}
      />
    </div>
  );
}
