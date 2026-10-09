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
        <Home />
        <About />
        <Portfolio />
        <Resume />
        <Contact />
      </main>
      <footer className="arcade-footer">
        <div className="container footer-content">
          <div className="footer-title">NOEL MTHEMBU · PORTFOLIO</div>
          <div className="footer-sub">FULL STACK DEVELOPER · JOHANNESBURG, SOUTH AFRICA</div>
          <div className="footer-credits">INSERT COIN TO CONTINUE // ALL RIGHTS RESERVED © 2026</div>
        </div>
      </footer>
      <ScrollToTopButton />
    </>
  );
};

export default App;
