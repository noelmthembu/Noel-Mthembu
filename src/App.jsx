import React from 'react';
import './App.css';
import Home from './components/home/Home';
import About from './components/about/About';
import Portfolio from './components/portfolio/Portfolio';
import Resume from './components/resume/Resume';
import Sidebar from './components/sidebar/Sidebar';
import Blog from './components/blog/Blog';
import Contact from './components/contact/Contact';

const App = () => {
  return (
    <>
      <Sidebar/>
      <main className="main">
        <section id="home">
          <Home/>
        </section>
        <section id="about">
          <About/>
        </section>
        <section id="portfolio">
          <Portfolio/>
        </section>
        <section id="resume">
          <Resume/>
        </section>
        <section id="blog">
          <Blog/>
        </section>
        <section id="contact">
          <Contact/>
        </section>
      </main>
    </>
  );
}

export default App;
