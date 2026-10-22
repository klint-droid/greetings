import React, { useState, useEffect, useRef } from 'react';
import type { LetterData, PolaroidPhoto } from '../types/letter';
import { playPenNibSound } from '../utils/audio';

interface LetterContentProps {
  data: LetterData;
  isPenMode: boolean;
  onSelectPolaroid: (photo: PolaroidPhoto) => void;
  onReseal: () => void;
  onOpenEdit: () => void;
  onSprinkleLove: () => void;
}

export const LetterContent: React.FC<LetterContentProps> = ({
  data,
  isPenMode,
  onSelectPolaroid,
  onReseal,
  onOpenEdit,
  onSprinkleLove
}) => {
  // If pen mode is on, animate the visible text
  const [revealedCharCount, setRevealedCharCount] = useState<number>(isPenMode ? 0 : 99999);
  const fullText = `${data.salutation}\n\n${data.paragraphs.join('\n\n')}\n\n${data.closing}\n${data.senderName}`;
  const typingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPenMode) {
      setRevealedCharCount(fullText.length);
      return;
    }

    setRevealedCharCount(0);
    let index = 0;
    const speed = 25; // ms per character

    typingTimerRef.current = window.setInterval(() => {
      index += 2;
      setRevealedCharCount(index);
      if (index % 12 === 0) {
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
  }, [isPenMode, fullText]);

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

  return (
    <div className="parchment-letter-wrapper" id="printable-letter">
      {/* Decorative deckle border & filigrees */}
      <div className="parchment-border">
        <div className="corner-filigree-wrapper top-left">{cornerOrnament}</div>
        <div className="corner-filigree-wrapper top-right">{cornerOrnament}</div>
        <div className="corner-filigree-wrapper bottom-left">{cornerOrnament}</div>
        <div className="corner-filigree-wrapper bottom-right">{cornerOrnament}</div>

        {/* Vintage Paperclip & Botanical Lavender Sprig */}
        <div className="botanical-sprig-container" aria-hidden="true" title="Pressed Botanical Keepsake">
          <div className="brass-paperclip" />
          <svg viewBox="0 0 80 140" className="botanical-svg">
            {/* Stem */}
            <path
              d="M40 130 Q38 80, 42 20"
              stroke="#556b2f"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Small leaves */}
            <path d="M40 100 Q20 90, 25 80 Q35 88, 40 100" fill="#6b8e23" opacity="0.8" />
            <path d="M41 85 Q60 75, 54 65 Q45 73, 41 85" fill="#6b8e23" opacity="0.8" />
            <path d="M40 65 Q22 55, 28 45 Q37 53, 40 65" fill="#6b8e23" opacity="0.8" />
            {/* Lavender / blossom buds */}
            <ellipse cx="42" cy="18" rx="4" ry="7" fill="#8a4f7d" opacity="0.85" />
            <ellipse cx="38" cy="24" rx="4" ry="6" fill="#9b5b8d" opacity="0.85" />
            <ellipse cx="45" cy="27" rx="4" ry="6" fill="#7b436e" opacity="0.85" />
            <ellipse cx="37" cy="35" rx="4" ry="6" fill="#8a4f7d" opacity="0.85" />
            <ellipse cx="44" cy="38" rx="4" ry="6" fill="#9b5b8d" opacity="0.85" />
            <ellipse cx="38" cy="48" rx="4" ry="6" fill="#7b436e" opacity="0.85" />
            <ellipse cx="43" cy="50" rx="4" ry="6" fill="#8a4f7d" opacity="0.85" />
          </svg>
        </div>

        {/* Header: Date & Postmark */}
        <div className="parchment-header">
          <div className="vintage-date">
            <span className="date-icon">❦</span>
            <span className="date-text">{data.date}</span>
            <span className="date-icon">❦</span>
          </div>
          <div className="postmark-header-badge">
            <span>MEMORANDUM OF GRATITUDE</span>
          </div>
        </div>

        {/* Letter Body */}
        <div className="parchment-body">
          {/* Salutation */}
          <div className="letter-salutation">
            {isPenMode ? (
              fullText.slice(0, Math.min(revealedCharCount, data.salutation.length))
            ) : (
              data.salutation
            )}
          </div>

          {/* Paragraphs */}
          <div className="letter-paragraphs">
            {data.paragraphs.map((p, idx) => {
              // Calculate paragraph character offsets for typing effect
              const prevText = `${data.salutation}\n\n${data.paragraphs.slice(0, idx).join('\n\n')}`;
              const startChar = prevText.length + 2;
              const endChar = startChar + p.length;

              if (isPenMode && revealedCharCount < startChar) {
                return null;
              }

              const visibleSlice = isPenMode
                ? p.slice(0, Math.max(0, revealedCharCount - startChar))
                : p;

              return (
                <p key={idx} className="letter-paragraph">
                  {visibleSlice}
                  {isPenMode && revealedCharCount >= startChar && revealedCharCount < endChar && (
                    <span className="typing-cursor">|</span>
                  )}
                </p>
              );
            })}
          </div>

          {/* Closing & Signature */}
          <div className="letter-closing-section">
            <div className="letter-closing">{data.closing}</div>
            <div className="letter-signature">{data.senderName}</div>
          </div>
        </div>

        {/* Polaroid Memory Keepsakes */}
        {data.polaroids && data.polaroids.length > 0 && (
          <div className="parchment-polaroids-section">
            <div className="polaroids-title">
              <span>Keepsakes & Memories</span>
              <span className="polaroids-hint">(click to enlarge)</span>
            </div>
            <div className="polaroids-grid">
              {data.polaroids.map((photo) => (
                <div
                  key={photo.id}
                  className="polaroid-card"
                  style={{ transform: `rotate(${photo.rotation}deg)` }}
                  onClick={() => onSelectPolaroid(photo)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View photo: ${photo.caption}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectPolaroid(photo);
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
            className="action-btn customize-btn"
            onClick={onOpenEdit}
            title="Edit recipient name, message, and styling"
          >
            <span className="btn-icon">✍️</span>
            <span>Personalize Letter</span>
          </button>

          <button
            className="action-btn love-btn"
            onClick={onSprinkleLove}
            title="Sprinkle golden sparkles and flower petals"
          >
            <span className="btn-icon">✨</span>
            <span>Sprinkle Gratitude</span>
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
