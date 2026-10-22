import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { LetterData } from './types/letter';
import { defaultLetter } from './data/presets';
import { AmbientCanvas } from './components/AmbientCanvas';
import { ChristmasLights } from './components/ChristmasLights';
import { ControlsBar } from './components/ControlsBar';
import { Envelope } from './components/Envelope';
import { LetterContent } from './components/LetterContent';
import { PolaroidModal } from './components/PolaroidModal';
import {
  playSealCrackSound,
  playPaperSlideSound,
  playSealStampSound,
  playChimeSound,
  toggleAmbientMusic,
  startAmbientMusic,
  isAmbientMusicActive
} from './utils/audio';

export const App: React.FC = () => {
  const [letterData] = useState<LetterData>(defaultLetter);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isBreaking, setIsBreaking] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Automatically start ambient music on first touch or click
  useEffect(() => {
    const handleFirstGesture = () => {
      if (!isAmbientMusicActive()) {
        startAmbientMusic();
        setIsMusicPlaying(true);
      }
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };
  }, []);

  // Trigger opening sequence
  const handleOpenEnvelope = () => {
    if (isOpen || isBreaking) return;
    setIsBreaking(true);
    playSealCrackSound();

    // Automatically ensure ambient music is playing on open
    if (!isAmbientMusicActive()) {
      startAmbientMusic();
      setIsMusicPlaying(true);
    }

    // Golden confetti burst from center of screen
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.55 },
      colors: ['#ffd700', '#c59b27', '#e0a82e', '#fdf3d6', '#ffb74d'],
      ticks: 200,
      gravity: 0.9,
      scalar: 1.15
    });

    setTimeout(() => {
      setIsBreaking(false);
      setIsOpen(true);
      playPaperSlideSound();

      setTimeout(() => {
        playChimeSound();
      }, 500);
    }, 550);
  };

  // Re-seal envelope
  const handleReseal = () => {
    if (!isOpen) return;
    playPaperSlideSound();
    setIsOpen(false);

    setTimeout(() => {
      playSealStampSound();
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.55 },
        colors: ['#c59b27', '#ffd700'],
        ticks: 120,
        gravity: 1.2,
        scalar: 0.85
      });
    }, 600);
  };

  // Toggle ambient music manually
  const handleToggleMusic = () => {
    const active = toggleAmbientMusic((playing) => {
      setIsMusicPlaying(playing);
    });
    setIsMusicPlaying(active);
  };

  return (
    <div className="vintage-desk-viewport">
      {/* Background canvas for falling snowflakes, warm fairy motes, and click sparkles */}
      <AmbientCanvas />

      {/* Draped Glowing Christmas Fairy Lights */}
      <ChristmasLights />

      {/* Warm Ambient Vignette: Candlelight Hearth Glow & Pine Forest Accent */}
      <div className="candlelight-ambient-glow" aria-hidden="true" />
      <div className="pine-ambient-glow" aria-hidden="true" />

      {/* Floating Toolbar Controls */}
      <ControlsBar
        isOpen={isOpen}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        onReseal={handleReseal}
        onPrint={() => window.print()}
      />

      {/* Main Experience Arena */}
      <main className="desk-surface">
        {!isOpen ? (
          <section className="envelope-stage" aria-label="Wax-sealed envelope">
            <Envelope
              data={letterData}
              isOpen={isOpen}
              isBreaking={isBreaking}
              onOpen={handleOpenEnvelope}
            />
            <div
              className="envelope-desk-hint"
              onClick={handleOpenEnvelope}
              role="button"
              tabIndex={0}
              aria-label="Click to break wax seal and open letter"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenEnvelope();
                }
              }}
            >
              <span className="hint-glyph">✦</span>
              <span>Click the golden wax seal to open</span>
              <span className="hint-glyph">✦</span>
            </div>
          </section>
        ) : (
          <section className="letter-stage" aria-label="Unfolded gratitude letter">
            <LetterContent
              data={letterData}
              onSelectPolaroidIndex={(index) => setSelectedPhotoIndex(index)}
              onReseal={handleReseal}
            />
          </section>
        )}
      </main>

      {/* Mobile-Optimized Polaroid Lightbox Modal */}
      <PolaroidModal
        photos={letterData.polaroids}
        initialIndex={selectedPhotoIndex ?? 0}
        isOpen={selectedPhotoIndex !== null}
        onClose={() => setSelectedPhotoIndex(null)}
      />
    </div>
  );
};

export default App;
