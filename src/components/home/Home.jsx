import React, { useState, useEffect } from 'react';
import './home.css';
import Me from '../../assets/profile2.jpeg';
import HeaderSocials from './HeaderSocials';
import ScrollDown from './ScrollDown';

const phrases = [
  "I'm a Software Developer",
  "Music Producer",
  "Web Developer"
];
const typingSpeed = 150;
const pauseDuration = 1200;

const Home = () => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    let timeout;

    if (!isDeleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setText(current.substring(0, charIndex));
        setCharIndex(charIndex + 1);
      }, typingSpeed);
    } else if (isDeleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setText(current.substring(0, charIndex));
        setCharIndex(charIndex - 1);
      }, typingSpeed / 2);
    } else if (!isDeleting && charIndex > current.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
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
