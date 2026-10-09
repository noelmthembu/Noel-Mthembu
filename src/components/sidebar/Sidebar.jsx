import React, { useState, useEffect, useRef } from "react";
import "./sidebar.css";
import ResumePdf from "../../assets/Noel Mthembu__Resume 2023.pdf";
import { playBlipSound, playSelectSound, playCoinSound } from "../../utils/retroAudio";

const navLinks = [
  { href: "#home", label: "HOME" },
  { href: "#about", label: "ABOUT" },
  { href: "#portfolio", label: "PROJECTS" },
  { href: "#resume", label: "RESUME" },
  { href: "#contact", label: "CONTACT" },
];

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const navRef = useRef(null);

  // Highlight active section on scroll
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          let current = "#home";
          navLinks.forEach((link) => {
            const section = document.querySelector(link.href);
            if (section && window.scrollY >= section.offsetTop - 120) {
              current = link.href;
            }
          });
          setActive(current);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleLinkClick = () => {
    playSelectSound();
    setMenuOpen(false);
  };

  const handleToggleClick = () => {
    playBlipSound();
    setMenuOpen(!menuOpen);
  };

  return (
    <nav ref={navRef} className="navbar" role="navigation">
      <div className="navbar__container">
        {/* Zone 1: Wordmark / Brand */}
        <a href="#home" className="nav__logo" onClick={() => playSelectSound()}>
          <span className="logo-text">NOEL</span>
          <span className="logo-dot">.DEV</span>
        </a>

        {/* Zone 2: Navigation Links */}
        <div className={`nav__menu${menuOpen ? " open" : ""}`}>
          <ul className="nav__list">
            {navLinks.map((link) => (
              <li className="nav__item" key={link.href}>
                <a
                  href={link.href}
                  className={`nav__link${active === link.href ? " active" : ""}`}
                  onClick={handleLinkClick}
                  aria-label={link.label}
                  aria-current={active === link.href ? "page" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Zone 3: Primary Action */}
        <div className="nav__actions">
          <a
            href={ResumePdf}
            download="Noel_Mthembu_Resume.pdf"
            onClick={() => playCoinSound()}
            className="pixel-btn nav__resume-btn"
          >
            📜 RESUME
          </a>
          <button
            className={`nav__toggle${menuOpen ? " open" : ""}`}
            onClick={handleToggleClick}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
