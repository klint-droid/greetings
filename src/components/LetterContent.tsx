import React, { useState, useEffect, useRef } from 'react';
import type { LetterData } from '../types/letter';
import { playPenNibSound } from '../utils/audio';

interface LetterContentProps {
  data: LetterData;
  onSelectPolaroidIndex: (index: number) => void;
  onReseal: () => void;
}

export const LetterContent: React.FC<LetterContentProps> = ({
  data,
  onSelectPolaroidIndex,
  onReseal
}) => {
  const fullText = `${data.salutation}\n\n${data.paragraphs.join('\n\n')}\n\n${data.closing}\n${data.senderName}`;
  const [revealedCharCount, setRevealedCharCount] = useState<number>(0);
  const typingTimerRef = useRef<number | null>(null);

  const isWritingComplete = revealedCharCount >= fullText.length;

  // Automatically start writing with a measured, elegant handwritten pace
  useEffect(() => {
    setRevealedCharCount(0);
    let index = 0;
    const speed = 34; // relaxed, elegant calligraphy writing pace (lower speed)

    typingTimerRef.current = window.setInterval(() => {
      index += 1; // 1 character at a time for authentic stroke reveal
      setRevealedCharCount(index);

      // Play soft fountain pen nib sound on rhythm
      if (index % 8 === 0) {
        playPenNibSound();
      }

      if (index >= fullText.length) {
        if (typingTimerRef.current !== null) {
          clearInterval(typingTimerRef.current);
          typingTimerRef.current = null;
        }
      }
    }, speed);

    return () => {
      if (typingTimerRef.current !== null) {
        clearInterval(typingTimerRef.current);
      }
    };
  }, [fullText]);

  // Corner filigree ornament SVG
  const cornerOrnament = (
    <svg viewBox="0 0 100 100" className="corner-filigree" aria-hidden="true">
      <path
        d="M10 10 C35 10, 45 25, 45 45 C45 35, 35 30, 25 30 C35 30, 40 40, 40 50 C25 45, 10 35, 10 10 Z 
           M10 10 L10 70 C10 50, 20 40, 30 35 C20 30, 15 20, 10 10 Z
           M10 10 L70 10 C50 10, 40 20, 35 30 C30 20, 20 15, 10 10 Z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );

  // Floating Realistic Fountain Pen - aligned directly against the written text
  const renderFountainPen = () => (
    <span className="pen-nib-anchor" aria-hidden="true">
      <div className={`animated-fountain-pen ${isWritingComplete ? 'pen-lifted' : 'pen-writing'}`}>
        <svg viewBox="0 0 60 180" className="fountain-pen-svg">
          <defs>
            <linearGradient id="goldNibGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff3b0" />
              <stop offset="45%" stopColor="#d4af37" />
              <stop offset="85%" stopColor="#aa7c11" />
              <stop offset="100%" stopColor="#7a5505" />
            </linearGradient>
            <linearGradient id="penBodyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2c140e" />
              <stop offset="50%" stopColor="#522319" />
              <stop offset="100%" stopColor="#1a0b07" />
            </linearGradient>
          </defs>

          {/* Upper barrel */}
          <path
            d="M21 10 L39 10 L37 115 L23 115 Z"
            fill="url(#penBodyGrad)"
            stroke="#120603"
            strokeWidth="0.8"
          />
          {/* Gold barrel ring */}
          <rect x="22" y="115" width="16" height="5" fill="url(#goldNibGrad)" />
          {/* Section grip */}
          <path d="M23 120 L37 120 L35 138 L25 138 Z" fill="#181818" />
          {/* Nib collar */}
          <rect x="24" y="138" width="12" height="3" fill="url(#goldNibGrad)" />
          {/* Golden fountain pen nib (tip at x=30, y=176) */}
          <path
            d="M25 141 L35 141 L33 162 L30 176 L27 162 Z"
            fill="url(#goldNibGrad)"
            stroke="#634505"
            strokeWidth="0.6"
          />
          {/* Nib breather hole & ink slit */}
          <circle cx="30" cy="154" r="1.5" fill="#150a04" />
          <line x1="30" y1="155" x2="30" y2="176" stroke="#150a04" strokeWidth="0.8" />
          {/* Nib engraved flourish */}
          <path d="M28 147 Q30 151, 32 147" stroke="#7a5505" strokeWidth="0.6" fill="none" />
          {/* Ink droplet at tip */}
          <circle cx="30" cy="176" r="1.2" fill="#2b1d14" opacity="0.95" />
        </svg>
      </div>
    </span>
  );

  return (
    <div className="parchment-letter-wrapper" id="printable-letter">
      {/* Decorative deckle border & filigrees */}
      <div className="parchment-border">
        <div className="corner-filigree-wrapper top-left">{cornerOrnament}</div>
        <div className="corner-filigree-wrapper top-right">{cornerOrnament}</div>
        <div className="corner-filigree-wrapper bottom-left">{cornerOrnament}</div>
        <div className="corner-filigree-wrapper bottom-right">{cornerOrnament}</div>

        {/* Vintage Paperclip & Botanical Pressed Sprig */}
        <div className="botanical-sprig-container" aria-hidden="true" title="Pressed Botanical Keepsake">
          <div className="brass-paperclip" />
          <svg viewBox="0 0 80 140" className="botanical-svg">
            <path d="M40 130 Q38 80, 42 20" stroke="#556b2f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M40 100 Q20 90, 25 80 Q35 88, 40 100" fill="#6b8e23" opacity="0.8" />
            <path d="M41 85 Q60 75, 54 65 Q45 73, 41 85" fill="#6b8e23" opacity="0.8" />
            <path d="M40 65 Q22 55, 28 45 Q37 53, 40 65" fill="#6b8e23" opacity="0.8" />
            <ellipse cx="42" cy="18" rx="4" ry="7" fill="#c59b27" opacity="0.85" />
            <ellipse cx="38" cy="24" rx="4" ry="6" fill="#e0a82e" opacity="0.85" />
            <ellipse cx="45" cy="27" rx="4" ry="6" fill="#8a4f7d" opacity="0.85" />
            <ellipse cx="37" cy="35" rx="4" ry="6" fill="#c59b27" opacity="0.85" />
            <ellipse cx="44" cy="38" rx="4" ry="6" fill="#e0a82e" opacity="0.85" />
            <ellipse cx="38" cy="48" rx="4" ry="6" fill="#8a4f7d" opacity="0.85" />
            <ellipse cx="43" cy="50" rx="4" ry="6" fill="#c59b27" opacity="0.85" />
          </svg>
        </div>

        {/* Clean Vintage Header: Date & Synchrony Recognition Badge */}
        <div className="parchment-header">
          <div className="vintage-date">
            <span className="date-icon">❦</span>
            <span className="date-text">{data.date}</span>
            <span className="date-icon">❦</span>
          </div>

          <div className="postmark-header-badge">
            <span>SYNCHRONY • RECOGNITION & GRATITUDE</span>
          </div>
        </div>

        {/* Letter Body with Live Automatic Fountain Pen Handwriting */}
        <div className="parchment-body">
          {/* Salutation */}
          <div className="letter-salutation">
            {fullText.slice(0, Math.min(revealedCharCount, data.salutation.length))}
            {!isWritingComplete && revealedCharCount <= data.salutation.length && renderFountainPen()}
          </div>

          {/* Paragraphs */}
          <div className="letter-paragraphs">
            {data.paragraphs.map((p, idx) => {
              const prevText = `${data.salutation}\n\n${data.paragraphs.slice(0, idx).join('\n\n')}`;
              const startChar = prevText.length + 2;
              const endChar = startChar + p.length;

              if (revealedCharCount < startChar) {
                return null;
              }

              const visibleSlice = p.slice(0, Math.max(0, revealedCharCount - startChar));
              const isPenHere = !isWritingComplete && revealedCharCount >= startChar && revealedCharCount < endChar;

              return (
                <p key={idx} className="letter-paragraph">
                  {visibleSlice}
                  {isPenHere && renderFountainPen()}
                </p>
              );
            })}
          </div>

          {/* Closing & Signature */}
          {revealedCharCount > data.salutation.length + data.paragraphs.join('\n\n').length && (
            <div className="letter-closing-section">
              <div className="letter-closing">
                {(() => {
                  const closingStart = fullText.lastIndexOf(data.closing);
                  const visible = fullText.slice(closingStart, Math.min(revealedCharCount, closingStart + data.closing.length));
                  const isPenHere = !isWritingComplete && revealedCharCount >= closingStart && revealedCharCount < closingStart + data.closing.length;
                  return (
                    <>
                      {visible}
                      {isPenHere && renderFountainPen()}
                    </>
                  );
                })()}
              </div>

              {revealedCharCount >= fullText.length - data.senderName.length && (
                <div className="letter-signature">
                  {fullText.slice(fullText.length - data.senderName.length, revealedCharCount)}
                  {!isWritingComplete && renderFountainPen()}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Polaroid Memory Keepsakes Section (Mobile & Desktop Optimized) */}
        {data.polaroids && data.polaroids.length > 0 && (
          <div className="parchment-polaroids-section">
            <div className="polaroids-title-row">
              <div className="polaroids-title">
                <span>Keepsakes & Team Milestones</span>
                <span className="polaroids-hint">({data.polaroids.length} memories • tap to enlarge)</span>
              </div>
            </div>

            {/* Responsive Polaroid Gallery Grid */}
            <div className="polaroids-gallery-container">
              <div className="polaroids-grid">
                {data.polaroids.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="polaroid-card"
                    style={{ transform: `rotate(${photo.rotation}deg)` }}
                    onClick={() => onSelectPolaroidIndex(index)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View photo ${index + 1}: ${photo.caption}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectPolaroidIndex(index);
                      }
                    }}
                  >
                    <div className="washi-tape" />
                    <div className="polaroid-photo-frame">
                      <img src={photo.url} alt={photo.caption} loading="lazy" />
                    </div>
                    <div className="polaroid-caption">{photo.caption}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action bar at the bottom of the letter */}
        <div className="parchment-actions no-print">
          <button
            className="action-btn reseal-btn"
            onClick={onReseal}
            title="Fold and re-seal letter into envelope"
          >
            <span className="btn-icon">✉️</span>
            <span>Fold & Seal Again</span>
          </button>

          <button
            className="action-btn print-btn"
            onClick={() => window.print()}
            title="Print or save as high-quality PDF keepsake"
          >
            <span className="btn-icon">🖨️</span>
            <span>Save Keepsake</span>
          </button>
        </div>
      </div>
    </div>
  );
};
