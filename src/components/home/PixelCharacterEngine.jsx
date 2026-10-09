import React, { useState, useEffect, useRef } from 'react';
import NoelFaceImg from '../../assets/noel_pixel_face.jpg';
import SmileFaceImg from '../../assets/noel_pixel_face_smile.jpg';
import BlinkFaceImg from '../../assets/noel_pixel_face_blink.jpg';
import FullBodyImg from '../../assets/images/noel_full_body_sprite_1791536165641.jpg';
import HeroAltImg from '../../assets/images/hero_pixel_avatar_1791535504486.jpg';
import {
  playBlipSound,
  playSelectSound,
  playCoinSound,
  playJumpSound,
  playLaserSound,
} from '../../utils/retroAudio';

/**
 * PixelCharacterEngine
 * Interactive Sprite & Pixel Character Engine for Noel Mthembu:
 * - Direct rendering of Noel's authentic pixel art face portrait as uploaded (Neutral, Smile, Blink, Full-Body, Hero)
 * - Alive life-like animations: natural auto-blinking loops, breathing bob, interaction reactions
 * - Action controls for full-body sprite (Idle, Walk, Jump, Code)
 * - Built-in Sprite Sheet Uploader & Custom Frame Animator (supports user-provided sprite sheets)
 */
const PixelCharacterEngine = ({
  mode = 'portrait', // 'portrait' | 'body' | 'custom'
  initialExpression = 'neutral',
  isAlive = true,
  onMoodChange,
  onActionTrigger,
}) => {
  const [currentMood, setCurrentMood] = useState(initialExpression);
  const [bodyAction, setBodyAction] = useState('idle'); // 'idle' | 'walk' | 'jump' | 'code'
  const [aliveActive, setAliveActive] = useState(isAlive);
  const [clickCount, setClickCount] = useState(0);
  const [floatingHeart, setFloatingHeart] = useState(null);

  // Custom Sprite Sheet State
  const [customSpriteData, setCustomSpriteData] = useState(() => {
    try {
      return localStorage.getItem('custom_noel_sprite_sheet') || null;
    } catch {
      return null;
    }
  });
  const [customCols, setCustomCols] = useState(4);
  const [customRows, setCustomRows] = useState(1);
  const [customSpeed, setCustomSpeed] = useState(6); // FPS
  const [customCurrentFrame, setCustomCurrentFrame] = useState(0);
  const fileInputRef = useRef(null);
  const spriteCanvasRef = useRef(null);
  const customImgRef = useRef(null);

  // Natural Blinking Loop for Portrait (Alive mode)
  useEffect(() => {
    if (!aliveActive || mode !== 'portrait') return;

    let blinkTimer;
    let restoreTimer;

    const triggerNextBlink = () => {
      // Natural blink timing between 2.6s and 4.8s
      const delay = Math.random() * 2200 + 2600;
      blinkTimer = setTimeout(() => {
        setCurrentMood((prev) => {
          if (prev === 'blink') return prev;
          return 'blink';
        });

        // Hold blink for 140ms
        restoreTimer = setTimeout(() => {
          setCurrentMood((prev) => {
            if (prev === 'blink') {
              // 25% chance to smile briefly after blinking
              return Math.random() < 0.25 ? 'smile' : 'neutral';
            }
            return prev;
          });
          triggerNextBlink();
        }, 140);
      }, delay);
    };

    triggerNextBlink();

    return () => {
      clearTimeout(blinkTimer);
      clearTimeout(restoreTimer);
    };
  }, [aliveActive, mode]);

  // Sync prop expression
  useEffect(() => {
    if (initialExpression) {
      setCurrentMood(initialExpression);
    }
  }, [initialExpression]);

  // Custom Sprite Sheet Animation Loop
  useEffect(() => {
    if (!customSpriteData || mode !== 'custom') return;

    const totalFrames = customCols * customRows;
    if (totalFrames <= 1) return;

    const intervalMs = Math.max(50, 1000 / customSpeed);
    const animTimer = setInterval(() => {
      setCustomCurrentFrame((prev) => (prev + 1) % totalFrames);
    }, intervalMs);

    return () => clearInterval(animTimer);
  }, [customSpriteData, customCols, customRows, customSpeed, mode]);

  // Render Custom Sprite Frame onto Canvas
  useEffect(() => {
    if (!customSpriteData || mode !== 'custom' || !spriteCanvasRef.current) return;

    const canvas = spriteCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = customSpriteData;
    img.onload = () => {
      customImgRef.current = img;
      const frameW = img.width / customCols;
      const frameH = img.height / customRows;
      const col = customCurrentFrame % customCols;
      const row = Math.floor(customCurrentFrame / customCols) % customRows;

      canvas.width = 240;
      canvas.height = 240;
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      ctx.fillStyle = '#0a1029';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw active frame scaled to canvas
      ctx.drawImage(
        img,
        col * frameW,
        row * frameH,
        frameW,
        frameH,
        20,
        20,
        200,
        200
      );
    };
  }, [customSpriteData, customCols, customRows, customCurrentFrame, mode]);

  // Handle Mood Click
  const handleMoodSelect = (mood) => {
    playSelectSound();
    setCurrentMood(mood);
    if (onMoodChange) onMoodChange(mood);
  };

  // Handle Body Action Click
  const handleActionSelect = (act) => {
    setBodyAction(act);
    if (act === 'jump') {
      playJumpSound();
    } else if (act === 'code') {
      playLaserSound();
    } else if (act === 'walk') {
      playBlipSound();
    } else {
      playSelectSound();
    }
    if (onActionTrigger) onActionTrigger(act);
  };

  // Handle Clicking Character (Interactive reaction)
  const handleCharacterClick = () => {
    playCoinSound();
    setClickCount((c) => c + 1);

    // Spawn heart / EXP reaction
    setFloatingHeart({
      id: Date.now(),
      text: clickCount % 3 === 0 ? '+100 EXP!' : '★ LEVEL UP!',
    });
    setTimeout(() => setFloatingHeart(null), 1200);

    // React with smile
    setCurrentMood('smile');
    if (onMoodChange) onMoodChange('smile');

    setTimeout(() => {
      setCurrentMood('neutral');
      if (onMoodChange) onMoodChange('neutral');
    }, 2200);
  };

  // Handle Custom File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result;
      if (typeof dataUrl === 'string') {
        setCustomSpriteData(dataUrl);
        try {
          localStorage.setItem('custom_noel_sprite_sheet', dataUrl);
        } catch {
          // storage quota fallback
        }
        playCoinSound();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetCustomSprite = () => {
    playBlipSound();
    setCustomSpriteData(null);
    try {
      localStorage.removeItem('custom_noel_sprite_sheet');
    } catch {
      // ignore
    }
  };

  // Determine active portrait image source
  const getPortraitSrc = () => {
    switch (currentMood) {
      case 'smile':
        return SmileFaceImg;
      case 'blink':
        return BlinkFaceImg;
      case 'hero':
        return HeroAltImg;
      case 'neutral':
      default:
        return NoelFaceImg;
    }
  };

  return (
    <div className={`pixel-character-engine mode-${mode}`}>
      {/* Main Interactive Character Display Box */}
      <div
        className={`engine-character-box ${aliveActive ? 'alive-bobbing' : ''} action-${bodyAction}`}
        onClick={handleCharacterClick}
        title="Click Noel to interact and gain EXP!"
      >
        {/* Floating Interactive FX */}
        {floatingHeart && (
          <div className="floating-exp-badge" key={floatingHeart.id}>
            {floatingHeart.text}
          </div>
        )}

        {/* 1. PORTRAIT VIEW (Direct Noel Pixel Art Face Rendering) */}
        {mode === 'portrait' && (
          <div className="portrait-sprite-wrapper">
            <img
              src={getPortraitSrc()}
              alt={`Noel Mthembu - ${currentMood}`}
              className={`portrait-pixel-img mood-${currentMood}`}
            />
            <div className="crt-glass-reflection"></div>
          </div>
        )}

        {/* 2. FULL-BODY SPRITE VIEW */}
        {mode === 'body' && (
          <div className={`fullbody-sprite-wrapper action-${bodyAction}`}>
            <img
              src={FullBodyImg}
              alt="Noel Mthembu - Full Body Sprite"
              className={`fullbody-pixel-img ${bodyAction === 'walk' ? 'walk-bob' : ''} ${bodyAction === 'jump' ? 'jump-leap' : ''}`}
            />
            {bodyAction === 'code' && (
              <div className="coding-particles">
                <span className="code-particle p1">0101</span>
                <span className="code-particle p2">&lt;/&gt;</span>
                <span className="code-particle p3">C#</span>
              </div>
            )}
            <div className="shadow-ground"></div>
          </div>
        )}

        {/* 3. CUSTOM USER SPRITE SHEET ANIMATOR */}
        {mode === 'custom' && (
          <div className="custom-sprite-wrapper">
            {customSpriteData ? (
              <canvas ref={spriteCanvasRef} className="custom-sprite-canvas" />
            ) : (
              <div className="custom-sprite-placeholder">
                <span className="placeholder-icon">👾</span>
                <span className="placeholder-text">NO SPRITE LOADED</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="pixel-btn btn--gold upload-action-btn"
                >
                  📁 LOAD SPRITE SHEET (.PNG)
                </button>
              </div>
            )}
          </div>
        )}

        {/* Status Pill Badge */}
        <div className="engine-status-pill">
          <span className="live-dot">●</span>
          <span className="status-label">
            {mode === 'portrait'
              ? currentMood.toUpperCase()
              : mode === 'body'
              ? bodyAction.toUpperCase()
              : `FRAME ${customCurrentFrame + 1}/${customCols * customRows}`}
          </span>
        </div>

        {/* Interactive Click Hint */}
        <div className="interactive-hint-tag">CLICK ME</div>
      </div>

      {/* Hidden File Input for Sprite Sheet Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />

      {/* CONTROLS BAR: PORTRAIT EXPRESSIONS */}
      {mode === 'portrait' && (
        <div className="sprite-control-dock">
          <div className="dock-row">
            <span className="dock-label">EXPRESSION:</span>
            <div className="dock-buttons">
              <button
                onClick={() => handleMoodSelect('neutral')}
                className={`dock-btn ${currentMood === 'neutral' ? 'active' : ''}`}
                title="Focused Developer"
              >
                😐 NEUTRAL
              </button>
              <button
                onClick={() => handleMoodSelect('smile')}
                className={`dock-btn ${currentMood === 'smile' ? 'active' : ''}`}
                title="Friendly Smile"
              >
                😄 SMILE
              </button>
              <button
                onClick={() => handleMoodSelect('blink')}
                className={`dock-btn ${currentMood === 'blink' ? 'active' : ''}`}
                title="Wink / Blink eyes"
              >
                😉 BLINK
              </button>
              <button
                onClick={() => handleMoodSelect('hero')}
                className={`dock-btn ${currentMood === 'hero' ? 'active' : ''}`}
                title="Retro Hero Stance"
              >
                🎮 HERO
              </button>
            </div>
          </div>

          <div className="dock-row alive-toggle-row">
            <button
              onClick={() => {
                setAliveActive(!aliveActive);
                playBlipSound();
              }}
              className={`alive-pill-toggle ${aliveActive ? 'active' : ''}`}
              title="Toggle natural eye blinking and breathing motion"
            >
              {aliveActive ? '⚡ ALIVE (BREATH & BLINK): ON' : '⏸️ ALIVE: PAUSED'}
            </button>
          </div>
        </div>
      )}

      {/* CONTROLS BAR: FULL BODY ACTIONS */}
      {mode === 'body' && (
        <div className="sprite-control-dock">
          <div className="dock-row">
            <span className="dock-label">ACTION:</span>
            <div className="dock-buttons">
              <button
                onClick={() => handleActionSelect('idle')}
                className={`dock-btn ${bodyAction === 'idle' ? 'active' : ''}`}
              >
                🧍 IDLE
              </button>
              <button
                onClick={() => handleActionSelect('walk')}
                className={`dock-btn ${bodyAction === 'walk' ? 'active' : ''}`}
              >
                🚶 WALK
              </button>
              <button
                onClick={() => handleActionSelect('jump')}
                className={`dock-btn ${bodyAction === 'jump' ? 'active' : ''}`}
              >
                ⬆️ JUMP
              </button>
              <button
                onClick={() => handleActionSelect('code')}
                className={`dock-btn ${bodyAction === 'code' ? 'active' : ''}`}
              >
                💻 CODE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTROLS BAR: CUSTOM SPRITE SHEET CONFIGURATOR */}
      {mode === 'custom' && (
        <div className="sprite-control-dock custom-dock">
          <div className="dock-row">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="dock-btn upload-btn"
            >
              📁 {customSpriteData ? 'REPLACE SPRITE (.PNG)' : 'UPLOAD SPRITE SHEET'}
            </button>
            {customSpriteData && (
              <button
                onClick={handleResetCustomSprite}
                className="dock-btn reset-btn"
                title="Clear uploaded sprite"
              >
                ✕ RESET
              </button>
            )}
          </div>

          {customSpriteData && (
            <div className="custom-grid-settings">
              <div className="setting-col">
                <span className="setting-label">COLUMNS: {customCols}</span>
                <div className="stepper-btns">
                  <button
                    onClick={() => setCustomCols((c) => Math.max(1, c - 1))}
                    className="stepper-btn"
                  >
                    -
                  </button>
                  <button
                    onClick={() => setCustomCols((c) => Math.min(16, c + 1))}
                    className="stepper-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="setting-col">
                <span className="setting-label">ROWS: {customRows}</span>
                <div className="stepper-btns">
                  <button
                    onClick={() => setCustomRows((r) => Math.max(1, r - 1))}
                    className="stepper-btn"
                  >
                    -
                  </button>
                  <button
                    onClick={() => setCustomRows((r) => Math.min(16, r + 1))}
                    className="stepper-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="setting-col">
                <span className="setting-label">FPS: {customSpeed}</span>
                <div className="stepper-btns">
                  <button
                    onClick={() => setCustomSpeed((s) => Math.max(1, s - 2))}
                    className="stepper-btn"
                  >
                    -
                  </button>
                  <button
                    onClick={() => setCustomSpeed((s) => Math.min(24, s + 2))}
                    className="stepper-btn"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PixelCharacterEngine;
