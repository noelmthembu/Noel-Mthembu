import React, { useState } from 'react';
import './about.css';
import PixelCharacterEngine from '../home/PixelCharacterEngine';
import AboutBox from './AboutBox';
import ResumePdf from '../../assets/Noel Mthembu__Resume 2023.pdf';
import { playCoinSound, playBlipSound } from '../../utils/retroAudio';

const skillsList = [
  { name: 'C# / .NET', level: 80, classKey: 'c-sharp', category: 'Backend' },
  { name: 'Java', level: 70, classKey: 'java', category: 'Backend' },
  { name: 'HTML5 & CSS3', level: 80, classKey: 'html', category: 'Frontend' },
  { name: 'JavaScript', level: 60, classKey: 'javascript', category: 'Frontend' },
  { name: 'React JS', level: 65, classKey: 'react-js', category: 'Frontend' },
  { name: 'PHP', level: 70, classKey: 'php', category: 'Backend' },
  { name: 'MySQL / SQL', level: 80, classKey: 'sql', category: 'Database' },
  { name: 'Azure Cloud', level: 80, classKey: 'azure', category: 'Cloud' },
  { name: 'REST APIs', level: 65, classKey: 'rest-api', category: 'Architecture' },
  { name: 'Bootstrap', level: 70, classKey: 'bootstrap', category: 'Frontend' },
  { name: 'Git & GitHub', level: 60, classKey: 'git', category: 'Tools' },
];

const About = () => {
  const [photoView, setPhotoView] = useState('pixel');
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', 'Frontend', 'Backend', 'Database', 'Cloud'];

  const filteredSkills =
    activeCategory === 'ALL'
      ? skillsList
      : skillsList.filter((s) => s.category === activeCategory);

  return (
    <section className="about container section" id="about">
      <div className="section-header-wrap">
        <h2 className="section__title">Character Profile & Attributes</h2>
        <div className="section__subtitle">LEVEL 01: THE ORIGIN & CORE ATTRIBUTES</div>
      </div>

      <div className="about__container grid">
        {/* Left Column: Character Sprite & Class Info */}
        <div className="about__sprite-col pixel-panel">
          <div className="sprite-header">
            <span className="sprite-tag">CLASS: DEVELOPER</span>
            <div className="sprite-toggles">
              <button
                className={`sprite-tab ${photoView === 'pixel' ? 'active' : ''}`}
                onClick={() => {
                  setPhotoView('pixel');
                  playBlipSound();
                }}
              >
                FACE
              </button>
              <button
                className={`sprite-tab ${photoView === 'body' ? 'active' : ''}`}
                onClick={() => {
                  setPhotoView('body');
                  playBlipSound();
                }}
              >
                SPRITE
              </button>
            </div>
          </div>

          <div className="sprite-img-wrap">
            <PixelCharacterEngine
              mode={photoView === 'body' ? 'body' : 'portrait'}
              isAlive={true}
            />
          </div>

          <div className="sprite-meta">
            <h3 className="character-name">Noel Mthembu</h3>
            <span className="character-title">Software Developer</span>
            <div className="character-credentials">
              <span>Rosebank College Graduate</span>
              <span>Dip. IT Software Development</span>
            </div>
          </div>

          <a
            download="Noel_Mthembu_Resume.pdf"
            href={ResumePdf}
            target="_blank"
            rel="noreferrer"
            className="pixel-btn btn--gold about__download-btn"
            onClick={() => playCoinSound()}
          >
            📜 DOWNLOAD RESUME
          </a>
        </div>

        {/* Right Column: Bio & RPG Skill Tree */}
        <div className="about__data pixel-panel">
          <div className="about__bio-box">
            <div className="bio-title-bar">
              <span className="bio-prompt">NOEL.EXE // BIO</span>
              <span className="bio-status">READY FOR HIRE</span>
            </div>
            <p className="about__description">
              Dedicated and highly motivated recent graduate with a Diploma in Software
              Development from Rosebank College. Eager to take on an entry-level position
              as a Software Developer to apply my knowledge in developing innovative,
              robust software solutions. Passionate about object-oriented programming,
              cloud computing, and creating engaging digital interfaces.
            </p>
          </div>

          {/* Skill Filter Chips */}
          <div className="skills-filter-bar">
            <span className="filter-label">SKILL ATTRIBUTES:</span>
            <div className="filter-chips">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-chip ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => {
                    playBlipSound();
                    setActiveCategory(cat);
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Bars */}
          <div className="about__skills grid">
            {filteredSkills.map((skill) => (
              <div
                className="skills__data"
                key={skill.name}
                onMouseEnter={() => playBlipSound()}
              >
                <div className="skills__title">
                  <span className="skills__name">{skill.name}</span>
                  <span className="skills__number">{skill.level}%</span>
                </div>

                <div className="skills__bar">
                  <div
                    className={`skills__percentage ${skill.classKey}`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quest / Accomplishment Boxes */}
      <AboutBox />
    </section>
  );
};

export default About;
