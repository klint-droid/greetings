import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import type { LetterData, PolaroidPhoto } from './types/letter';
import { defaultLetter } from './data/presets';
import { AmbientCanvas } from './components/AmbientCanvas';
import { ControlsBar } from './components/ControlsBar';
import { Envelope } from './components/Envelope';
import { LetterContent } from './components/LetterContent';
import { EditModal } from './components/EditModal';
import { PolaroidModal } from './components/PolaroidModal';
import {
  playSealCrackSound,
  playPaperSlideSound,
  playSealStampSound,
  playChimeSound,
  toggleAmbientMusic
} from './utils/audio';

export const App: React.FC = () => {
  const [letterData, setLetterData] = useState<LetterData>(defaultLetter);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isBreaking, setIsBreaking] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [isPenMode, setIsPenMode] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedPolaroid, setSelectedPolaroid] = useState<PolaroidPhoto | null>(null);

  // Trigger opening sequence
  const handleOpenEnvelope = () => {
    if (isOpen || isBreaking) return;
    setIsBreaking(true);
    playSealCrackSound();

    // Golden confetti burst from center of screen
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.55 },
      colors: ['#ffd700', '#c59b27', '#8b1e1e', '#fdf3d6', '#ffb74d'],
      ticks: 200,
      gravity: 0.9,
      scalar: 1.1
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
        particleCount: 20,
        spread: 40,
        origin: { y: 0.55 },
        colors: ['#c59b27', '#ffd700'],
        ticks: 120,
        gravity: 1.2,
        scalar: 0.8
      });
    }, 600);
  };

  // Toggle ambient music
  const handleToggleMusic = () => {
    const active = toggleAmbientMusic((playing) => {
      setIsMusicPlaying(playing);
    });
    setIsMusicPlaying(active);
  };

  // Toggle pen reveal animation
  const handleTogglePenMode = () => {
    setIsPenMode((prev) => !prev);
  };

  // Sprinkle gratitude particles & sound
  const handleSprinkleLove = () => {
    playChimeSound();
    confetti({
      particleCount: 50,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#f48fb1', '#ffd700', '#ffb74d', '#e0f2f1', '#ffcdd2'],
      shapes: ['circle'],
      scalar: 1.2
    });
  };

  // Update polaroid photo
  const handleUpdatePhoto = (updated: PolaroidPhoto) => {
    setLetterData((prev) => ({
      ...prev,
      polaroids: prev.polaroids.map((p) => (p.id === updated.id ? updated : p))
    }));
  };

  return (
    <div className="vintage-desk-viewport">
      {/* Background canvas for warm candlelight dust and click sparkles */}
      <AmbientCanvas />

      {/* Warm Ambient Vignette & Candlelight Glow in Top Corner */}
      <div className="candlelight-ambient-glow" aria-hidden="true" />

      {/* Floating Toolbar Controls */}
      <ControlsBar
        isOpen={isOpen}
        isMusicPlaying={isMusicPlaying}
        isPenMode={isPenMode}
        onToggleMusic={handleToggleMusic}
        onTogglePenMode={handleTogglePenMode}
        onOpenEdit={() => setIsEditModalOpen(true)}
        onSprinkleLove={handleSprinkleLove}
        onReseal={handleReseal}
        onPrint={() => window.print()}
      />

      {/* Main Experience Arena */}
      <main className="desk-surface">
        {!isOpen ? (
          <section className="envelope-stage" aria-label="Wax-sealed envelope">
            <div className="stage-intro-badge">
              <span className="quill-icon">🪶</span>
              <span>A Sealed Message of Gratitude</span>
            </div>

            <Envelope
              data={letterData}
              isOpen={isOpen}
              isBreaking={isBreaking}
              onOpen={handleOpenEnvelope}
            />

            <div className="stage-instruction">
              <p className="instruction-text">Tap the wax seal to unveil this heartfelt letter</p>
              <button
                className="btn-open-fallback"
                onClick={handleOpenEnvelope}
                disabled={isBreaking}
              >
                Break Seal & Open Letter
              </button>
            </div>
          </section>
        ) : (
          <section className="letter-stage" aria-label="Unfolded gratitude letter">
            <LetterContent
              data={letterData}
              isPenMode={isPenMode}
              onSelectPolaroid={(photo) => setSelectedPolaroid(photo)}
              onReseal={handleReseal}
              onOpenEdit={() => setIsEditModalOpen(true)}
              onSprinkleLove={handleSprinkleLove}
            />
          </section>
        )}
      </main>

      {/* Modal: Customize Letter */}
      <EditModal
        data={letterData}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={(newData) => setLetterData(newData)}
      />

      {/* Modal: Zoom & Edit Polaroid */}
      <PolaroidModal
        photo={selectedPolaroid}
        isOpen={selectedPolaroid !== null}
        onClose={() => setSelectedPolaroid(null)}
        onUpdatePhoto={handleUpdatePhoto}
      />
    </div>
  );
};

export default App;
