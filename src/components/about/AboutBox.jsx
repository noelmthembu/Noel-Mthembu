import React from 'react';
import { playBlipSound } from '../../utils/retroAudio';

const AboutBox = () => {
  const stats = [
    { icon: 'icon-fire', number: '5', label: 'Quests Completed', sub: 'Production & Academic' },
    { icon: 'icon-cup', number: '5670+', label: 'Coffee Potions', sub: 'Fueling Code Dev' },
    { icon: 'icon-people', number: '6', label: 'Party Collabs', sub: 'Team Projects' },
    { icon: 'icon-badge', number: '100%', label: 'Work Ethic', sub: 'Dedication & Drive' },
  ];

  return (
    <div className="about__boxes grid">
      {stats.map((item, idx) => (
        <div
          className="about__box pixel-panel"
          key={idx}
          onMouseEnter={() => playBlipSound()}
        >
          <i className={`about__icon ${item.icon}`}></i>
          <div className="box__content">
            <h3 className="about__title">{item.number}</h3>
            <span className="about__subtitle">{item.label}</span>
            <span className="about__tagline">{item.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutBox;
