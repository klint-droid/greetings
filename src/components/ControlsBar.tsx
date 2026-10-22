import React from 'react';

interface ControlsBarProps {
  isOpen: boolean;
  onReseal: () => void;
  onPrint: () => void;
}

export const ControlsBar: React.FC<ControlsBarProps> = ({
  isOpen,
  onReseal,
  onPrint
}) => {
  return (
    <header
      className={`controls-dock no-print ${isOpen ? 'dock-has-actions' : 'dock-brand-only'}`}
      role="toolbar"
      aria-label="Greeting letter controls"
    >
      <div className="dock-left">
        <div className="dock-brand">
          <span className="brand-crest">🎄</span>
          <span className="brand-title">Synchrony • Holiday Gratitude</span>
        </div>
      </div>

      {isOpen && (
        <div className="dock-center">
          {/* Reseal letter action */}
          <button
            className="dock-btn highlight-btn"
            onClick={onReseal}
            title="Fold and re-seal letter into envelope"
            aria-label="Reseal letter"
          >
            <span className="btn-icon">✉️</span>
            <span className="btn-label">Reseal</span>
          </button>

          {/* Print action (Hidden on mobile) */}
          <button
            className="dock-btn print-desktop-only"
            onClick={onPrint}
            title="Save or Print as Keepsake"
            aria-label="Print letter"
          >
            <span className="btn-icon">🖨️</span>
            <span className="btn-label">Print</span>
          </button>
        </div>
      )}
    </header>
  );
};
