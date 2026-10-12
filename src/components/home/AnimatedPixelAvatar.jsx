import React, { useState, useEffect } from 'react';
import PixelCharacterEngine from './PixelCharacterEngine';
import { playCoinSound } from '../../utils/retroAudio';

const defaultDialogueLines = [
  "Hey! I'm Noel Mthembu. Welcome to my retro pixel arcade!",
  "Full Stack Developer specializing in C#, Java, React & Azure.",
  "Looking for an energetic junior developer to join your party?",
  "Check out Level 02 for my quests and projects below!",
  "Click my character or buttons to see me blink, smile & move!",
];

const moodDialogueMap = {
  smile: "Always coding with high enthusiasm and positive drive!",
  neutral: "Focused developer mode engaged. Analyzing challenges...",
  blink: "System check: Optical sensors nominal! 100% focused.",
  hero: "Ready for epic software quests! Select your adventure.",
};

const AnimatedPixelAvatar = () => {
  const [currentMood, setCurrentMood] = useState('neutral');
  const [dialogueText, setDialogueText] = useState(defaultDialogueLines[0]);
  const [showDialogue, setShowDialogue] = useState(true);

  // Periodic dialogue cycle
  useEffect(() => {
    let index = 0;
    const dialogueInterval = setInterval(() => {
      index = (index + 1) % defaultDialogueLines.length;
      setDialogueText(defaultDialogueLines[index]);
    }, 7500);
    return () => clearInterval(dialogueInterval);
  }, []);

  const handleMoodChange = (mood) => {
    setCurrentMood(mood);
    if (moodDialogueMap[mood]) {
      setDialogueText(moodDialogueMap[mood]);
    }
  };

  const handleActionTrigger = (act) => {
    if (act === 'jump') {
      setDialogueText("Leaping over bugs like an arcade platformer! ⬆️");
    } else if (act === 'code') {
      setDialogueText("Compiling clean architecture code: C#, Java & React! 💻");
    } else if (act === 'walk') {
      setDialogueText("Exploring new frameworks and technologies! 🚶");
    }
  };

  const handleNextDialogue = () => {
    playCoinSound();
    const randomLine = defaultDialogueLines[Math.floor(Math.random() * defaultDialogueLines.length)];
    setDialogueText(randomLine);
  };

  return (
    <div className="alive-avatar-widget">
      {/* Speech Dialogue Bubble */}
      {showDialogue && (
        <div className="pixel-dialogue-bubble" onClick={handleNextDialogue} title="Click for new line">
          <div className="dialogue-header">
            <span className="speaker-name">NOEL [CREATIVE / HUSTLER]</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDialogue(false);
              }}
              className="dialogue-close"
              title="Close speech bubble"
            >
              ✕
            </button>
          </div>
          <p className="dialogue-text">{dialogueText}</p>
          <div className="dialogue-prompt-hint">► CLICK FOR NEXT DIALOGUE</div>
          <div className="dialogue-arrow"></div>
        </div>
      )}

      {/* Main Interactive Character Engine */}
      <PixelCharacterEngine
        mode="portrait"
        initialExpression={currentMood}
        isAlive={true}
        onMoodChange={handleMoodChange}
        onActionTrigger={handleActionTrigger}
      />
    </div>
  );
};

export default AnimatedPixelAvatar;
