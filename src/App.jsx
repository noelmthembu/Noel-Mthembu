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
    <Home/>
    <About/>
    <Portfolio/>
    <Resume/>
    <Blog/>
    <Contact/>
    </main>
    </>
  );
}

export default App;