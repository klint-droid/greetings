import React from 'react';
import type { LetterData } from '../types/letter';
import { WaxSeal } from './WaxSeal';

interface EnvelopeProps {
  data: LetterData;
  isOpen: boolean;
  isBreaking: boolean;
  onOpen: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({
  data,
  isOpen,
  isBreaking,
  onOpen
}) => {
  return (
    <div
      className={`envelope-container ${isOpen ? 'envelope-open' : 'envelope-closed'} ${isBreaking ? 'envelope-breaking' : ''}`}
      onClick={!isOpen && !isBreaking ? onOpen : undefined}
      role="button"
      tabIndex={!isOpen ? 0 : -1}
      aria-label="Interactive vintage envelope for Synchrony employees. Click to break the wax seal."
      onKeyDown={(e) => {
        if (!isOpen && !isBreaking && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      <div className="envelope-3d-wrapper">
        {/* Luxury Gold Border Inlay */}
        <div className="envelope-gold-border" aria-hidden="true" />

        {/* Envelope Back Plate (visible behind letter when open) */}
        <div className="envelope-back">
          <div className="envelope-pocket-interior" />
        </div>

        {/* Top Triangular Flap (clean, folds down without cutting through any text or stamps) */}
        <div className="envelope-flap">
          <div className="flap-triangle">
            <div className="flap-gold-trim" />
            <div className="flap-triangle-inner" />
          </div>
        </div>

        {/* The Wax Seal sitting cleanly at the tip of the flap (zero text overlap) */}
        {!isOpen && (
          <div className="envelope-seal-positioner">
            <WaxSeal
              color={data.sealColor}
              icon={data.sealIcon}
              isBreaking={isBreaking}
              onClick={onOpen}
              disabled={isBreaking || isOpen}
              size={78}
            />
          </div>
        )}

        {/* Envelope Front Dedication & Addressing (Spaciously positioned in the lower half) */}
        <div className="envelope-front">
          <div className="envelope-dedication-area">
            <div className="dedication-label">Delivered with honor to:</div>
            <div className="dedication-recipient">{data.recipientName}</div>
            <div className="dedication-sub">In recognition of your dedication, excellence & teamwork</div>
            <div className="dedication-sender">From: {data.senderName}</div>
          </div>

          {/* Lower Corner Accents */}
          <div className="envelope-bottom-accents">
            <span className="accent-badge-left">❦ SYNCHRONY ❦</span>
            <span className="accent-badge-right">HONORING OUR PEOPLE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
