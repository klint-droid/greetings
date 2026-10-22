import React from 'react';

interface ControlsBarProps {
  isOpen: boolean;
  isMusicPlaying: boolean;
  isPenMode: boolean;
  onToggleMusic: () => void;
  onTogglePenMode: () => void;
  onOpenEdit: () => void;
  onSprinkleLove: () => void;
  onReseal: () => void;
  onPrint: () => void;
}

export const ControlsBar: React.FC<ControlsBarProps> = ({
  isOpen,
  isMusicPlaying,
  isPenMode,
  onToggleMusic,
  onTogglePenMode,
  onOpenEdit,
  onSprinkleLove,
  onReseal,
  onPrint
}) => {
  return (
    <header className="controls-dock no-print" role="toolbar" aria-label="Greeting letter controls">
      <div className="dock-left">
        <div className="dock-brand">
          <span className="brand-crest">❦</span>
          <span className="brand-title">A Gratitude Letter</span>
        </div>
      </div>

      <div className="dock-center">
        {/* Ambient Soundtrack Toggle */}
        <button
          className={`dock-btn ${isMusicPlaying ? 'active' : ''}`}
          onClick={onToggleMusic}
          title={isMusicPlaying ? 'Pause calming ambient music' : 'Play calming ambient music'}
          aria-label={isMusicPlaying ? 'Pause ambient music' : 'Play ambient music'}
        >
          <span className="btn-icon">{isMusicPlaying ? '🎵' : '🔇'}</span>
          <span className="btn-label">{isMusicPlaying ? 'Music: On' : 'Music: Off'}</span>
        </button>

        {/* Fountain Pen Mode Toggle */}
        {isOpen && (
          <button
            className={`dock-btn ${isPenMode ? 'active' : ''}`}
            onClick={onTogglePenMode}
            title={isPenMode ? 'Disable fountain pen typewriter animation' : 'Replay with fountain pen handwriting reveal'}
          >
            <span className="btn-icon">🪶</span>
            <span className="btn-label">{isPenMode ? 'Pen: Writing' : 'Pen: Written'}</span>
          </button>
        )}

        {/* Sparkle / Gratitude Hearts */}
        <button
          className="dock-btn"
          onClick={onSprinkleLove}
          title="Sprinkle golden gratitude sparkles"
        >
          <span className="btn-icon">✨</span>
          <span className="btn-label">Sprinkle</span>
        </button>

        {/* Edit / Personalize */}
        <button
          className="dock-btn highlight-btn"
          onClick={onOpenEdit}
          title="Personalize recipient, message, and styling"
        >
          <span className="btn-icon">✍️</span>
          <span className="btn-label">Personalize</span>
        </button>

        {/* Reseal if open */}
        {isOpen && (
          <button
            className="dock-btn"
            onClick={onReseal}
            title="Fold and re-seal letter into envelope"
          >
            <span className="btn-icon">✉️</span>
            <span className="btn-label">Reseal</span>
          </button>
        )}

        {/* Print / Save */}
        {isOpen && (
          <button
            className="dock-btn"
            onClick={onPrint}
            title="Save or Print as Keepsake"
          >
            <span className="btn-icon">🖨️</span>
            <span className="btn-label">Print</span>
          </button>
        )}
      </div>
    </header>
  );
};
