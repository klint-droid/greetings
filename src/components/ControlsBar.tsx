import React from 'react';

interface ControlsBarProps {
  isOpen: boolean;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onReseal: () => void;
  onPrint: () => void;
}

export const ControlsBar: React.FC<ControlsBarProps> = ({
  isOpen,
  isMusicPlaying,
  onToggleMusic,
  onReseal,
  onPrint
}) => {
  return (
    <header className="controls-dock no-print" role="toolbar" aria-label="Greeting letter controls">
      <div className="dock-left">
        <div className="dock-brand">
          <span className="brand-crest">🎄</span>
          <span className="brand-title">Synchrony • Holiday Gratitude</span>
        </div>
      </div>

      <div className="dock-center">
        {/* Ambient Soundtrack Toggle */}
        <button
          className={`dock-btn ${isMusicPlaying ? 'active' : ''}`}
          onClick={onToggleMusic}
          title={isMusicPlaying ? 'Mute ambient soundtrack' : 'Play ambient soundtrack'}
          aria-label={isMusicPlaying ? 'Mute ambient soundtrack' : 'Play ambient soundtrack'}
        >
          <span className="btn-icon">{isMusicPlaying ? '🎵' : '🔇'}</span>
          <span className="btn-label">{isMusicPlaying ? 'Music: On' : 'Music: Off'}</span>
        </button>

        {/* Reseal if open */}
        {isOpen && (
          <button
            className="dock-btn highlight-btn"
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
