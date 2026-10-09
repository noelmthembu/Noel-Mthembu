import React, { useState } from 'react';
import './portfolio.css';
import Menu from './Menu';
import { playSelectSound, playBlipSound } from '../../utils/retroAudio';

const filterCategories = [
  { label: 'ALL QUESTS', key: 'Everything' },
  { label: 'HTML, CSS & JS', key: 'javascript' },
  { label: 'BOOTSTRAP', key: 'bootstrap' },
  { label: 'ASP.NET CORE', key: 'asp.net' },
  { label: 'API & CREATIVE', key: 'creative' },
];

const Portfolio = () => {
  const [items, setItems] = useState(Menu);
  const [activeFilter, setActiveFilter] = useState('Everything');

  const filterItem = (filterKey) => {
    playSelectSound();
    setActiveFilter(filterKey);
    if (filterKey === 'Everything') {
      setItems(Menu);
      return;
    }
    const updatedItems = Menu.filter((curElem) => {
      return curElem.category.toLowerCase().includes(filterKey.toLowerCase());
    });
    setItems(updatedItems);
  };

  return (
    <section className="work container section" id="portfolio">
      <div className="section-header-wrap">
        <h2 className="section__title">Quest Log & Project Missions</h2>
        <div className="section__subtitle">LEVEL 02: THE WEAPONRY & COMPLETED EXPEDITIONS</div>
      </div>

      {/* Filter Tabs (Functional buttons with active states) */}
      <div className="work__filters-bar">
        {filterCategories.map((cat) => (
          <button
            key={cat.key}
            className={`work__filter-btn ${activeFilter === cat.key ? 'active' : ''}`}
            onClick={() => filterItem(cat.key)}
            onMouseEnter={() => playBlipSound()}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Mission Cards Grid */}
      <div className="work__container grid">
        {items.map((elem, idx) => {
          const { id, image, title, category, link } = elem;
          return (
            <div
              className="work__card pixel-panel"
              key={id}
              onMouseEnter={() => playBlipSound()}
            >
              {/* Quest Rank Header */}
              <div className="card-top-strip">
                <span className="quest-id">MISSION #{String(idx + 1).padStart(2, '0')}</span>
                <span className="quest-status">COMPLETED</span>
              </div>

              {/* Thumbnail */}
              <div className="work__thumbnail">
                <img
                  src={image}
                  alt={title}
                  className="work__img"
                  loading="lazy"
                />
                <div className="work__scanline-effect"></div>
              </div>

              {/* Card Body */}
              <div className="card-body">
                {/* Tech metadata unboxed with separators */}
                <div className="work__meta">
                  {category.split('&').map((cat, cIdx) => (
                    <React.Fragment key={cIdx}>
                      {cIdx > 0 && <span className="meta-sep" aria-hidden="true">·</span>}
                      <span>{cat.trim().toUpperCase()}</span>
                    </React.Fragment>
                  ))}
                </div>

                <h3 className="work__title">{title}</h3>

                {/* Action button */}
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="pixel-btn btn--gold work__action-btn"
                  onClick={() => playSelectSound()}
                >
                  <span>INSPECT CODE</span>
                  <i className="icon-link"></i>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Portfolio;
