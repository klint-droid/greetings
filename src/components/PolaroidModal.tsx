import React, { useState, useEffect } from 'react';
import type { PolaroidPhoto } from '../types/letter';

interface PolaroidModalProps {
  photos: PolaroidPhoto[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export const PolaroidModal: React.FC<PolaroidModalProps> = ({
  photos,
  initialIndex,
  isOpen,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  if (!isOpen || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex] || photos[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') onClose();
  };

  // Mobile Touch Swipe detection
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // Threshold of 40px for swipe
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  return (
    <div
      className="modal-backdrop polaroid-lightbox-backdrop"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      tabIndex={0}
    >
      <div
        className="polaroid-modal-content mobile-lightbox-content"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top bar with counter & close */}
        <div className="lightbox-top-bar">
          <span className="lightbox-counter">
            Photo {currentIndex + 1} of {photos.length}
          </span>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close photo viewer">
            ✕
          </button>
        </div>

        {/* Polaroid frame showcasing photo */}
        <div className="polaroid-zoom-frame mobile-zoom-frame">
          <div className="polaroid-zoom-photo mobile-zoom-photo">
            <img
              src={currentPhoto.url}
              alt={currentPhoto.caption}
              key={currentPhoto.id}
              className="lightbox-main-img"
            />
          </div>

          <div className="polaroid-zoom-caption-area">
            <p className="polaroid-view-caption">{currentPhoto.caption}</p>
          </div>
        </div>

        {/* Navigation arrows (Previous / Next) & indicator dots */}
        <div className="lightbox-nav-controls">
          <button
            className="lightbox-nav-btn prev-btn"
            onClick={handlePrev}
            aria-label="Previous photo"
            title="Previous photo"
          >
            ‹
          </button>

          {/* Dots Indicator */}
          <div className="lightbox-dots">
            {photos.map((_, idx) => (
              <button
                key={idx}
                className={`dot-indicator ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to photo ${idx + 1}`}
              />
            ))}
          </div>

          <button
            className="lightbox-nav-btn next-btn"
            onClick={handleNext}
            aria-label="Next photo"
            title="Next photo"
          >
            ›
          </button>
        </div>

        <div className="lightbox-mobile-hint">
          <span>Swipe left / right or tap arrows to view all photos</span>
        </div>
      </div>
    </div>
  );
};
