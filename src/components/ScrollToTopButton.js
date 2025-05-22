// components/ScrollToTopButton.js
import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        padding: '1rem',
        borderRadius: '50%',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s',
        zIndex: 1000,
      }}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;
