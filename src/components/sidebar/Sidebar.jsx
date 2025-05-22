import React, { useState, useEffect, useRef } from "react";
import "./sidebar.css";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#resume", label: "Resume" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
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
          navLinks.forEach(link => {
            const section = document.querySelector(link.href);
            if (section && window.scrollY >= section.offsetTop - 80) {
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
    const handleClickOutside = e => {
      if (menuOpen && navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav ref={navRef} className="navbar" role="navigation">
      <a href="#home" className="nav__logo">
        N<b>.</b>
      </a>
      <button
        className={`nav__toggle${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? "✕" : "☰"}
      </button>
      {/* Mobile menu list, includes footer */}
      <div className={`nav__menu${menuOpen ? " open" : ""}`}>
        <ul className="nav__list">
          {navLinks.map(link => (
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
        <div className="nav__footer">
          <span>&copy; Noel Mthembu - 2023.</span>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
