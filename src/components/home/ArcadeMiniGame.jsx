import React, { useRef, useEffect, useState, useCallback } from 'react';
import { playLaserSound, playExplosionSound, playPowerUpSound, playGameOverSound } from '../../utils/retroAudio';

const ArcadeMiniGame = ({ onExit }) => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('retro_arcade_hiscore') || '1200', 10);
    } catch {
      return 1200;
    }
  });
  const [gameOver, setGameOver] = useState(false);
  const [wave, setWave] = useState(1);
  const [health, setHealth] = useState(3);

  const gameStateRef = useRef({
    player: { x: 260, y: 340, width: 36, height: 32, speed: 6 },
    lasers: [],
    enemies: [],
    particles: [],
    powerups: [],
    keys: { left: false, right: false, shoot: false },
    score: 0,
    health: 3,
    wave: 1,
    lastShootTime: 0,
    enemySpawnTimer: 0,
    powerupSpawnTimer: 0,
    running: true,
  });

  // Handle keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        gameStateRef.current.keys.left = true;
      }
      if (['ArrowRight', 'KeyD'].includes(e.code)) {
        gameStateRef.current.keys.right = true;
      }
      if (['Space', 'ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        gameStateRef.current.keys.shoot = true;
      }
      if (e.code === 'Escape') {
        onExit();
      }
    };

    const handleKeyUp = (e) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        gameStateRef.current.keys.left = false;
      }
      if (['ArrowRight', 'KeyD'].includes(e.code)) {
        gameStateRef.current.keys.right = false;
      }
      if (['Space', 'ArrowUp', 'KeyW'].includes(e.code)) {
        gameStateRef.current.keys.shoot = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onExit]);

  // Restart game
  const restartGame = useCallback(() => {
    gameStateRef.current = {
      player: { x: 260, y: 340, width: 36, height: 32, speed: 6 },
      lasers: [],
      enemies: [],
      particles: [],
      powerups: [],
      keys: { left: false, right: false, shoot: false },
      score: 0,
      health: 3,
      wave: 1,
      lastShootTime: 0,
      enemySpawnTimer: 0,
      powerupSpawnTimer: 0,
      running: true,
    };
    setScore(0);
    setHealth(3);
    setWave(1);
    setGameOver(false);
  }, []);

  // Main game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const bugLabels = ['BUG', '404', 'SYNTAX', 'LEAK', 'CRASH'];
    const bugColors = ['#ff4c60', '#ffd15c', '#ff7849', '#ea3c53', '#e056fd'];

    const updateAndDraw = () => {
      const state = gameStateRef.current;
      if (!state.running) return;

      const cw = canvas.width;
      const ch = canvas.height;

      // 1. Clear background
      ctx.fillStyle = '#080918';
      ctx.fillRect(0, 0, cw, ch);

      // Starfield effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 30; i++) {
        const sx = ((i * 37 + Date.now() * 0.05) % cw);
        const sy = (i * 29) % ch;
        ctx.fillRect(sx, sy, 2, 2);
      }

      if (!gameOver) {
        // 2. Player Movement
        if (state.keys.left && state.player.x > 10) {
          state.player.x -= state.player.speed;
        }
        if (state.keys.right && state.player.x < cw - state.player.width - 10) {
          state.player.x += state.player.speed;
        }

        // 3. Player Shoot
        const now = Date.now();
        if (state.keys.shoot && now - state.lastShootTime > 180) {
          state.lasers.push({
            x: state.player.x + state.player.width / 2 - 2,
            y: state.player.y - 8,
            width: 4,
            height: 12,
            speed: 9,
          });
          state.lastShootTime = now;
          playLaserSound();
        }

        // 4. Spawn Enemies
        state.enemySpawnTimer++;
        const spawnInterval = Math.max(35, 75 - state.wave * 5);
        if (state.enemySpawnTimer >= spawnInterval) {
          state.enemySpawnTimer = 0;
          const labelIndex = Math.floor(Math.random() * bugLabels.length);
          state.enemies.push({
            x: Math.random() * (cw - 60) + 10,
            y: -25,
            width: 44,
            height: 24,
            speed: 1.5 + Math.random() * 1.5 + state.wave * 0.3,
            label: bugLabels[labelIndex],
            color: bugColors[labelIndex],
            hp: 1,
          });
        }

        // 5. Spawn Powerups (Coffee / React Core)
        state.powerupSpawnTimer++;
        if (state.powerupSpawnTimer >= 320) {
          state.powerupSpawnTimer = 0;
          state.powerups.push({
            x: Math.random() * (cw - 30) + 15,
            y: -20,
            size: 20,
            speed: 2,
            type: Math.random() > 0.5 ? 'coffee' : 'boost',
          });
        }

        // 6. Update Lasers
        state.lasers.forEach((l) => (l.y -= l.speed));
        state.lasers = state.lasers.filter((l) => l.y > -20);

        // 7. Update Powerups
        state.powerups.forEach((p) => {
          p.y += p.speed;
          // Check collision with player
          if (
            p.x < state.player.x + state.player.width &&
            p.x + p.size > state.player.x &&
            p.y < state.player.y + state.player.height &&
            p.y + p.size > state.player.y
          ) {
            p.collected = true;
            playPowerUpSound();
            if (p.type === 'coffee') {
              state.score += 250;
              setScore(state.score);
              if (state.health < 3) {
                state.health += 1;
                setHealth(state.health);
              }
            } else {
              state.score += 150;
              setScore(state.score);
            }
          }
        });
        state.powerups = state.powerups.filter((p) => p.y < ch && !p.collected);

        // 8. Update Enemies & Collision
        state.enemies.forEach((enemy) => {
          enemy.y += enemy.speed;

          // Hit player check
          if (
            enemy.x < state.player.x + state.player.width &&
            enemy.x + enemy.width > state.player.x &&
            enemy.y < state.player.y + state.player.height &&
            enemy.y + enemy.height > state.player.y
          ) {
            enemy.destroyed = true;
            state.health -= 1;
            setHealth(state.health);
            playExplosionSound();
            if (state.health <= 0) {
              setGameOver(true);
              playGameOverSound();
              if (state.score > highScore) {
                setHighScore(state.score);
                try {
                  localStorage.setItem('retro_arcade_hiscore', String(state.score));
                } catch {
                  // ignore
                }
              }
            }
          }

          // Laser hit enemy check
          state.lasers.forEach((laser) => {
            if (
              laser.x < enemy.x + enemy.width &&
              laser.x + laser.width > enemy.x &&
              laser.y < enemy.y + enemy.height &&
              laser.y + laser.height > enemy.y
            ) {
              enemy.destroyed = true;
              laser.destroyed = true;
              state.score += 50;
              setScore(state.score);
              playExplosionSound();

              // Spawn particles
              for (let i = 0; i < 6; i++) {
                state.particles.push({
                  x: enemy.x + enemy.width / 2,
                  y: enemy.y + enemy.height / 2,
                  vx: (Math.random() - 0.5) * 6,
                  vy: (Math.random() - 0.5) * 6,
                  color: enemy.color,
                  life: 18,
                });
              }

              // Wave check
              if (state.score % 500 === 0) {
                state.wave += 1;
                setWave(state.wave);
              }
            }
          });
        });

        // Filter destroyed / escaped
        state.lasers = state.lasers.filter((l) => !l.destroyed);
        state.enemies = state.enemies.filter((e) => {
          if (e.y > ch) {
            state.health -= 1;
            setHealth(state.health);
            if (state.health <= 0) {
              setGameOver(true);
              playGameOverSound();
            }
            return false;
          }
          return !e.destroyed;
        });

        // Update particles
        state.particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.life--;
        });
        state.particles = state.particles.filter((p) => p.life > 0);
      }

      // --- RENDERING ---

      // Render Lasers
      ctx.fillStyle = '#00f2fe';
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 8;
      state.lasers.forEach((l) => {
        ctx.fillRect(l.x, l.y, l.width, l.height);
      });
      ctx.shadowBlur = 0;

      // Render Enemies
      state.enemies.forEach((enemy) => {
        // Pixel bug body
        ctx.fillStyle = enemy.color;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        ctx.fillStyle = '#000';
        ctx.fillRect(enemy.x + 2, enemy.y + 2, enemy.width - 4, enemy.height - 4);

        // Bug label
        ctx.fillStyle = enemy.color;
        ctx.font = '10px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(enemy.label, enemy.x + enemy.width / 2, enemy.y + 15);
      });

      // Render Powerups
      state.powerups.forEach((p) => {
        ctx.fillStyle = p.type === 'coffee' ? '#ffd15c' : '#38ef7d';
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.fillStyle = '#000';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(p.type === 'coffee' ? '☕' : '⚡', p.x + p.size / 2, p.y + p.size - 5);
      });

      // Render Particles
      state.particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 3, 3);
      });

      // Render Player (Retro Pixel Spaceship / Noel's Code Cruiser)
      if (!gameOver) {
        const px = state.player.x;
        const py = state.player.y;

        // Ship base
        ctx.fillStyle = '#3b6bf5';
        ctx.fillRect(px + 4, py + 12, 28, 14);
        // Wing thrusters
        ctx.fillStyle = '#ffd15c';
        ctx.fillRect(px, py + 18, 6, 12);
        ctx.fillRect(px + 30, py + 18, 6, 12);
        // Cockpit nose
        ctx.fillStyle = '#00f2fe';
        ctx.fillRect(px + 14, py + 2, 8, 12);
        // Noel in cockpit: Beanie & Glasses (from blueprint)
        ctx.fillStyle = '#14161f';
        ctx.fillRect(px + 14, py + 4, 8, 4);
        ctx.fillStyle = '#6e432d';
        ctx.fillRect(px + 15, py + 8, 6, 4);
        ctx.fillStyle = '#000000';
        ctx.fillRect(px + 15, py + 9, 6, 2);
        // Center canon
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(px + 16, py, 4, 6);
      }

      animationId = requestAnimationFrame(updateAndDraw);
    };

    animationId = requestAnimationFrame(updateAndDraw);
    return () => cancelAnimationFrame(animationId);
  }, [gameOver, highScore]);

  return (
    <div className="arcade-game-container">
      {/* HUD Header */}
      <div className="arcade-game-hud">
        <div className="hud-metric">
          <span className="hud-label">SCORE</span>
          <span className="hud-val">{String(score).padStart(6, '0')}</span>
        </div>
        <div className="hud-metric">
          <span className="hud-label">HI-SCORE</span>
          <span className="hud-val">{String(Math.max(score, highScore)).padStart(6, '0')}</span>
        </div>
        <div className="hud-metric">
          <span className="hud-label">SHIELD</span>
          <div className="health-hearts">
            {[1, 2, 3].map((h) => (
              <span key={h} className={h <= health ? 'heart-full' : 'heart-empty'}>
                {h <= health ? '♥' : '♡'}
              </span>
            ))}
          </div>
        </div>
        <div className="hud-metric">
          <span className="hud-label">WAVE</span>
          <span className="hud-val">{wave}</span>
        </div>
        <button
          onClick={onExit}
          className="hud-exit-btn"
          title="Exit game back to Start Screen"
        >
          ✕ EXIT
        </button>
      </div>

      {/* Arcade Canvas */}
      <div className="arcade-canvas-wrap">
        <canvas
          ref={canvasRef}
          width={540}
          height={380}
          className="arcade-canvas"
        />

        {/* Game Over Screen */}
        {gameOver && (
          <div className="game-over-overlay">
            <h3 className="game-over-title">GAME OVER</h3>
            <p className="game-over-score">FINAL SCORE: {score}</p>
            {score >= highScore && score > 0 && (
              <p className="game-over-hiscore">★ NEW HIGH SCORE! ★</p>
            )}
            <div className="game-over-actions">
              <button onClick={restartGame} className="pixel-btn btn--gold">
                ► PLAY AGAIN
              </button>
              <button onClick={onExit} className="pixel-btn btn--outline">
                RETURN TO MENU
              </button>
            </div>
          </div>
        )}
      </div>

      {/* On-Screen Mobile Controls */}
      <div className="arcade-touch-controls">
        <div className="touch-dpad">
          <button
            onPointerDown={() => (gameStateRef.current.keys.left = true)}
            onPointerUp={() => (gameStateRef.current.keys.left = false)}
            onPointerLeave={() => (gameStateRef.current.keys.left = false)}
            className="touch-btn"
          >
            ◀ LEFT
          </button>
          <button
            onPointerDown={() => (gameStateRef.current.keys.right = true)}
            onPointerUp={() => (gameStateRef.current.keys.right = false)}
            onPointerLeave={() => (gameStateRef.current.keys.right = false)}
            className="touch-btn"
          >
            RIGHT ▶
          </button>
        </div>
        <button
          onPointerDown={() => {
            gameStateRef.current.keys.shoot = true;
          }}
          onPointerUp={() => (gameStateRef.current.keys.shoot = false)}
          onPointerLeave={() => (gameStateRef.current.keys.shoot = false)}
          className="touch-btn fire-btn"
        >
          ⚡ SHOOT (SPACE)
        </button>
      </div>
    </div>
  );
};

export default ArcadeMiniGame;
