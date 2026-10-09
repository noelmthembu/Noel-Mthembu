import React, { useState, useEffect } from 'react';
import { playSelectSound } from '../utils/retroAudio';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    playSelectSound();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '46px',
        height: '46px',
        borderRadius: '4px',
        backgroundColor: 'var(--first-color)',
        color: '#ffffff',
        border: '2px solid #5d87ff',
        boxShadow: '3px 3px 0px #04050a, 0 0 10px rgba(59, 107, 245, 0.4)',
        cursor: 'pointer',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
        fontFamily: 'var(--pixel-font)',
        transition: 'transform 0.15s ease',
      }}
      aria-label="Scroll to top"
      title="Return to Start Screen (Top)"
    >
      ▲
    </button>
  );
};

export default ScrollToTopButton;
