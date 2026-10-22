import React from 'react';
import type { LetterData } from '../types/letter';
import { WaxSeal } from './WaxSeal';
import { PostalStamp } from './PostalStamp';

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
    <div className={`envelope-container ${isOpen ? 'envelope-open' : 'envelope-closed'} ${isBreaking ? 'envelope-breaking' : ''}`}>
      <div className="envelope-3d-wrapper">
        {/* Airmail Vintage Border Accent */}
        <div className="airmail-stripes" aria-hidden="true" />

        {/* Envelope Back Plate (visible behind letter when open) */}
        <div className="envelope-back">
          <div className="envelope-pocket-interior" />
        </div>

        {/* Envelope Front Body / Folds */}
        <div className="envelope-front">
          {/* Postmark & Stamp in Top Right */}
          <div className="envelope-stamp-area">
            <PostalStamp style={data.stampStyle} />
          </div>

          {/* Vintage Postmark Badge */}
          <div className="envelope-badge">
            <span className="badge-text">SPECIAL DELIVERY</span>
            <span className="badge-sub">EXPRESS GRATITUDE</span>
          </div>

          {/* Recipient Handwritten Address */}
          <div className="envelope-address">
            <div className="address-label">For:</div>
            <div className="address-recipient">{data.recipientName}</div>
            <div className="address-line">A person of grace & rare kindness</div>
            <div className="address-line">From: {data.senderName}</div>
          </div>

          {/* Bottom Left Vintage Crest */}
          <div className="envelope-crest" aria-hidden="true">
            <span>❦ WITH THANKS ❦</span>
          </div>
        </div>

        {/* Top Flap (flips 180deg upward on open) */}
        <div className="envelope-flap">
          <div className="flap-triangle">
            <div className="flap-triangle-inner" />
          </div>
        </div>

        {/* The Wax Seal sitting on the flap join */}
        {!isOpen && (
          <div className="envelope-seal-positioner">
            <WaxSeal
              color={data.sealColor}
              icon={data.sealIcon}
              isBreaking={isBreaking}
              onClick={onOpen}
              disabled={isBreaking || isOpen}
            />
          </div>
        )}
      </div>
    </div>
  );
};
