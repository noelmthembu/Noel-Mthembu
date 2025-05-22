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

  // Highlight active section on scroll (using requestAnimationFrame)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          let current = "#home";
          navLinks.forEach(link => {
            const section = document.querySelector(link.href);
            if (section) {
              const sectionTop = section.offsetTop - 70;
              if (window.scrollY >= sectionTop) {
                current = link.href;
              }
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

  // Close menu on outside click (mobile)
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
        {/* Hamburger / Close icon */}
        {menuOpen ? "✕" : "☰"}
      </button>
      <ul className={`nav__list${menuOpen ? " open" : ""}`}>
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
        <span className="copyright">&copy; Noel Mthembu - 2023.</span>
      </div>
    </nav>
  );
};

export default Sidebar;
