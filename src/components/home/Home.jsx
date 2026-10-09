import React, { useState } from 'react';
import './home.css';
import ResumePdf from '../../assets/Noel Mthembu__Resume 2023.pdf';
import HeaderSocials from './HeaderSocials';
import ScrollDown from './ScrollDown';
import ArcadeMiniGame from './ArcadeMiniGame';
import AnimatedPixelAvatar from './AnimatedPixelAvatar';
import {
  playCoinSound,
  playBlipSound,
  playSelectSound,
  playStartSound,
  toggleSound,
  isSoundEnabled,
} from '../../utils/retroAudio';

const Home = () => {
  const [isPlayingGame, setIsPlayingGame] = useState(false);
  const [credits, setCredits] = useState(2);
  const [soundOn, setSoundOn] = useState(() => isSoundEnabled());
  const [crtOn, setCrtOn] = useState(true);

  const handleInsertCoin = () => {
    setCredits((prev) => prev + 1);
    playCoinSound();
  };

  const handleStartGame = () => {
    playStartSound();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLaunchArcade = () => {
    playStartSound();
    setIsPlayingGame(true);
  };

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const handleToggleCrt = () => {
    setCrtOn((prev) => {
      const next = !prev;
      if (typeof document !== 'undefined') {
        if (next) {
          document.body.classList.add('crt-active');
        } else {
          document.body.classList.remove('crt-active');
        }
      }
      playBlipSound();
      return next;
    });
  };

  return (
    <section className="home container" id="home">
      {/* Arcade Cabinet Outer Shell */}
      <div className="arcade-cabinet">
        {/* Arcade Cabinet Marquee Header */}
        <div className="arcade-marquee">
          <div className="marquee-strip">
            <span className="marquee-stars">★ ★ ★</span>
            <span className="marquee-title">NOEL MTHEMBU ARCADE</span>
            <span className="marquee-stars">★ ★ ★</span>
          </div>

          {/* Top Quick Controls HUD */}
          <div className="arcade-controls-hud">
            <button
              onClick={handleToggleSound}
              className={`hud-pill-btn ${soundOn ? 'active' : ''}`}
              title="Toggle retro 8-bit sound effects"
            >
              {soundOn ? '🔊 SFX: ON' : '🔇 SFX: OFF'}
            </button>
            <button
              onClick={handleToggleCrt}
              className={`hud-pill-btn ${crtOn ? 'active' : ''}`}
              title="Toggle retro CRT scanline monitor overlay"
            >
              {crtOn ? '📺 CRT: ON' : '📺 CRT: OFF'}
            </button>
            <button
              onClick={handleInsertCoin}
              className="hud-pill-btn coin-btn"
              title="Insert coin for extra retro credit"
            >
              🪙 INSERT COIN ({credits})
            </button>
          </div>
        </div>

        {/* CRT Bezel & Screen Frame */}
        <div className="crt-monitor-frame">
          <div className="crt-screen">
            {/* Top CRT Status Strip */}
            <div className="crt-status-bar">
              <span className="status-item">1P: READY</span>
              <span className="status-item highlight">LEVEL 01: DEVELOPER REALM</span>
              <span className="status-item">CREDITS: {String(credits).padStart(2, '0')}</span>
            </div>

            {isPlayingGame ? (
              /* Playable In-Hero Arcade Minigame */
              <ArcadeMiniGame onExit={() => setIsPlayingGame(false)} />
            ) : (
              /* Hero Retro Start Screen */
              <div className="start-screen-content">
                {/* Main Retro Title Block */}
                <div className="title-block">
                  <div className="arcade-badge">START SCREEN</div>
                  <h1 className="arcade-hero-name">NOEL MTHEMBU</h1>
                  <div className="arcade-tagline">
                    &lt; SOFTWARE DEVELOPER /&gt;
                  </div>
                  <p className="arcade-subtitle">
                    Specializing in C#, Java, React, PHP & Cloud Software Development.
                  </p>
                </div>

                {/* Character Select & Profile Showcase */}
                <div className="character-showcase">
                  <AnimatedPixelAvatar />

                  {/* Character RPG Stats Card */}
                  <div className="character-stats-card">
                    <div className="stat-header">
                      <span className="stat-name">PLAYER: NOEL</span>
                      <span className="stat-lvl">LV. 24</span>
                    </div>

                    <div className="stat-row">
                      <span className="stat-label">CLASS:</span>
                      <span className="stat-val">Full Stack Developer</span>
                    </div>

                    <div className="stat-row">
                      <span className="stat-label">STATUS:</span>
                      <span className="stat-val status-hire">OPEN TO HIRE / ENTRY-LEVEL</span>
                    </div>

                    <div className="stat-row">
                      <span className="stat-label">MANA:</span>
                      <span className="stat-val">C# · Java · React · PHP · SQL · Azure</span>
                    </div>

                    <div className="stat-meter-group">
                      <div className="meter-label">
                        <span>HP (DRIVE & MOTIVATION)</span>
                        <span>100%</span>
                      </div>
                      <div className="pixel-meter">
                        <div className="pixel-meter-fill hp-fill" style={{ width: '100%' }}></div>
                      </div>

                      <div className="meter-label">
                        <span>MP (CODE EXPERTISE)</span>
                        <span>85%</span>
                      </div>
                      <div className="pixel-meter">
                        <div className="pixel-meter-fill mp-fill" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Blinking Call to Action */}
                <div className="press-start-prompt" onClick={handleStartGame}>
                  ► PRESS START TO EXPLORE ◄
                </div>

                {/* Primary Arcade Action Menu */}
                <div className="start-menu-grid">
                  <button
                    onClick={handleStartGame}
                    className="pixel-btn btn--gold start-menu-btn"
                  >
                    ► START GAME / BIO
                  </button>

                  <button
                    onClick={handleLaunchArcade}
                    className="pixel-btn start-menu-btn arcade-action-btn"
                  >
                    🕹️ PLAY MINIGAME
                  </button>

                  <a
                    href="#portfolio"
                    onClick={() => playSelectSound()}
                    className="pixel-btn btn--outline start-menu-btn"
                  >
                    ⚔️ QUESTS (PROJECTS)
                  </a>

                  <a
                    href={ResumePdf}
                    download="Noel_Mthembu_Resume.pdf"
                    onClick={() => playCoinSound()}
                    className="pixel-btn btn--outline start-menu-btn"
                  >
                    📜 RESUME SCROLL
                  </a>
                </div>

                {/* Social Connectors & External Links */}
                <div className="arcade-social-hub">
                  <span className="social-hub-label">JOIN MULTIPLAYER PARTY:</span>
                  <HeaderSocials />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Arcade Cabinet Bottom Panel & Coin Slot Decoration */}
        <div className="arcade-bottom-panel">
          <div className="speaker-grille">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <div className="coin-slot-housing" onClick={handleInsertCoin}>
            <div className="coin-slot">
              <span className="coin-label">25¢ INSERT COIN</span>
              <div className="coin-opening"></div>
            </div>
          </div>
          <div className="speaker-grille">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>
      </div>

      <ScrollDown />
    </section>
  );
};

export default Home;
