import React, { useState, useEffect } from 'react';
import './home.css';
import Me from "../../assets/profile2.jpeg";
import HeaderSocials from './HeaderSocials';
import ScrollDown from './ScrollDown';

const Home = () => {
  const texts = ["I'm a Software Developer", "I'm a Youtuber", "I'm an Artist"];
  const [currentText, setCurrentText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typeEffect = () => {
      const currentWord = texts[index];
      let i = 0;
      let typingInterval = setInterval(() => {
        setCurrentText((prev) => prev + currentWord[i]);
        i++;
        if (i === currentWord.length) {
          clearInterval(typingInterval);
          setTimeout(() => {
            setCurrentText('');
            setIndex((prevIndex) => (prevIndex + 1) % texts.length);
          }, 1000);
        }
      }, 150); // Adjust typing speed here
    };

    typeEffect();
    // Set interval to start typing effect after delay
    const interval = setInterval(typeEffect, 4500); // Change text every 4.5s
    return () => clearInterval(interval);
  }, [index, texts]);

  return (
    <section className="home container" id="home">
      <div className="intro">
        <img src={Me} alt="" className="home__img" />
        <h1 className="home__name">Noel Mthembu</h1>
        <span className="home__education">{currentText}</span>
        <HeaderSocials />
        <a href="#contact" className="btn">Hire Me</a>
        <ScrollDown />
      </div>
    </section>
  );
};

export default Home;
