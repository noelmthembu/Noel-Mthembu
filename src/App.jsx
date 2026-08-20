import React from 'react';
import './App.css';
import Home from './components/home/Home';
import About from './components/about/About';
import Portfolio from './components/portfolio/Portfolio';
import Resume from './components/resume/Resume';
import Sidebar from './components/sidebar/Sidebar';
import Contact from './components/contact/Contact';
import ScrollToTopButton from './components/ScrollToTopButton';

const App = () => {
  return (
    <>
      <Sidebar />
      <main className="main">
        <section id="home">
          <Home />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="portfolio">
          <Portfolio />
        </section>
        <section id="resume">
          <Resume />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <ScrollToTopButton />
    </>
  );
};

export default App;

