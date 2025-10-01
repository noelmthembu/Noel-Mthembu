import React from 'react';
import './home.css';
import Me from '../../assets/profile2.jpeg';
import HeaderSocials from './HeaderSocials';
import ScrollDown from './ScrollDown';

const Home = () => {
  return (
    <section className="home container" id="home">
      <div className="intro">
        <img src={Me} alt="Profile" className="home__img reveal-bottom" />
        <h1 className="home__name reveal-bottom delay-1">Noel Mthembu <i class="fa-solid fa-code"></i></h1>
        <span className="home__education reveal-bottom delay-2">
          I'm a Software Developer
        </span>
        <HeaderSocials />
        <a href="#contact" className="btn reveal-bottom delay-3">Hire Me</a>
        <ScrollDown />
      </div>
    </section>
  );
};

export default Home;
