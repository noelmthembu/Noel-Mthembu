import React, { useState, useEffect } from "react";
import "./sidebar.css";

const navLinks = [
  { href: "#home", icon: "icon-home", label: "Home" },
  { href: "#about", icon: "icon-user-following", label: "About" },
  { href: "#portfolio", icon: "icon-layers", label: "Portfolio" },
  { href: "#resume", icon: "icon-graduation", label: "Resume" },
  { href: "#blog", icon: "icon-note", label: "Blog" },
  { href: "#contact", icon: "icon-bubble", label: "Contact" },
];

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");

  // Highlight active section as you scroll
  useEffect(() => {
    const handleScroll = () => {
      let current = "#home";
      navLinks.forEach(link => {
        const section = document.querySelector(link.href);
        if (section) {
          const sectionTop = section.offsetTop - 70; // adjust for navbar height
          if (window.scrollY >= sectionTop) {
            current = link.href;
          }
        }
      });
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on link click (mobile)
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <a href="#home" className="nav__logo">
        N<b>.</b>
      </a>
      <button
        className={`nav__toggle${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <i className="icon-menu"></i>
      </button>
      <ul className={`nav__list${menuOpen ? " open" : ""}`}>
        {navLinks.map(link => (
          <li className="nav__item" key={link.href}>
            <a
              href={link.href}
              className={`nav__link${active === link.href ? " active" : ""}`}
              onClick={handleLinkClick}
              aria-label={link.label}
            >
              <i className={link.icon}></i>
              <span className="nav__text">{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="nav__footer">
        <span className="copyright">&copy; Noel Mthembu - 2023.</span>
      </div>
    </nav>
  );
};

export default Sidebar;
