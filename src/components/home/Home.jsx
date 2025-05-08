import React, { useState, useEffect } from 'react';
import "./home.css";
import Me from "../../assets/profile2.jpeg";
import HeaderSocials from './HeaderSocials';
import ScrollDown from './ScrollDown';

const Home = () => {
  const [currentText, setCurrentText] = useState(0);
  const texts = ["I'm a Software Developer", "I'm a Youtuber", "I'm an Artist"];
  
  useEffect(() => {
    const typingInterval = setInterval(() => {
      setCurrentText((prevText) => (prevText + 1) % texts.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(typingInterval);
  }, [texts.length]);

  return (
    <section className="home container" id="home">
      <div className="intro">
        <img src={Me} alt="" className="home__img" />
        <h1 className="home__name">Noel Mthembu</h1>
        <span className="home__education">{texts[currentText]}</span>
        <HeaderSocials />
        <a href="#contact" className="btn">Hire Me</a>
        <ScrollDown />
      </div>
    </section>
  );
};

export default Home;
