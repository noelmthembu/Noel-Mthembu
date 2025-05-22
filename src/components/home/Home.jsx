import React, { useState, useEffect } from 'react';
import './home.css';
import Me from '../../assets/profile2.jpeg';
import HeaderSocials from './HeaderSocials';
import ScrollDown from './ScrollDown';

const phrases = [
  "I'm a Software Developer",
  "Music Engineer",
  "Youtuber",
  "Tiktoker"
];
const typingSpeed = 150; // typing speed
const deletingSpeed = 75; // deleting speed

const Home = () => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeout;

    if (!isDeleting && charIndex <= currentPhrase.length) {
      timeout = setTimeout(() => {
        setText(currentPhrase.slice(0, charIndex));
        setCharIndex(prev => prev + 1);
      }, typingSpeed);
    } else if (isDeleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setText(currentPhrase.slice(0, charIndex));
        setCharIndex(prev => prev - 1);
      }, deletingSpeed);
    }

    if (!isDeleting && charIndex === currentPhrase.length + 1) {
      setIsDeleting(true);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((phraseIndex + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <section className="home container" id="home">
      <div className="intro">
        <img src={Me} alt="Profile" className="home__img" />
        <h1 className="home__name">Noel Mthembu</h1>
        <span className="home__education">
          {text}
          <span className="cursor">|</span>
        </span>
        <HeaderSocials />
        <a href="#contact" className="btn">Hire Me</a>
        <ScrollDown />
      </div>
    </section>
  );
};

export default Home;
