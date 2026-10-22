import React from 'react';
import type { StampStyle } from '../types/letter';

interface PostalStampProps {
  style: StampStyle;
}

export const PostalStamp: React.FC<PostalStampProps> = ({ style }) => {
  return (
    <div className="postal-stamp-wrapper">
      {/* Cancellation ink stamp mark */}
      <div className="cancellation-mark" aria-hidden="true">
        <div className="cancel-circle">
          <span>POSTE</span>
          <span className="cancel-date">GRATITUDE</span>
          <span>SPECIAL</span>
        </div>
        <div className="cancel-wavy-lines">
          <div className="wave-line" />
          <div className="wave-line" />
          <div className="wave-line" />
        </div>
      </div>

      {/* The Perforated Stamp */}
      <div className={`perforated-stamp stamp-theme-${style}`}>
        <div className="stamp-inner-border">
          <div className="stamp-header">
            <span className="stamp-country">PAR AVION</span>
            <span className="stamp-value">25¢</span>
          </div>

          <div className="stamp-illustration">
            {style === 'botanical-rose' ? (
              <svg viewBox="0 0 40 40" className="stamp-svg">
                <path
                  d="M20 8 C25 8, 30 12, 30 18 C30 24, 25 28, 20 32 C15 28, 10 24, 10 18 C10 12, 15 8, 20 8 Z"
                  fill="#c25975"
                  opacity="0.8"
                />
                <path
                  d="M20 32 L20 38 M16 35 C18 34, 22 34, 24 35"
                  stroke="#3b5e43"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : style === 'airmail-gold' ? (
              <svg viewBox="0 0 40 40" className="stamp-svg">
                <path
                  d="M8 20 L20 12 L32 20 L26 22 L20 18 L14 22 Z M20 18 L20 28"
                  fill="#c59b27"
                  stroke="#8f6b0f"
                  strokeWidth="1.2"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 40 40" className="stamp-svg">
                {/* Vintage fleur-de-lis / monument */}
                <path
                  d="M20 6 L22 18 L28 14 L24 22 L30 26 L22 26 L20 34 L18 26 L10 26 L16 22 L12 14 L18 18 Z"
                  fill="#2b4c7e"
                  opacity="0.85"
                />
              </svg>
            )}
          </div>

          <div className="stamp-footer">
            <span>WITH THANKS</span>
          </div>
        </div>
      </div>
    </div>
  );
};
