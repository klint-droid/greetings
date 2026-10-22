import React, { useState } from 'react';
import type { PolaroidPhoto } from '../types/letter';

interface PolaroidModalProps {
  photo: PolaroidPhoto | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdatePhoto: (updated: PolaroidPhoto) => void;
}

export const PolaroidModal: React.FC<PolaroidModalProps> = ({
  photo,
  isOpen,
  onClose,
  onUpdatePhoto
}) => {
  if (!isOpen || !photo) return null;

  const [caption, setCaption] = useState(photo.caption);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUpdatePhoto({
            ...photo,
            url: reader.result,
            caption
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCaption = () => {
    onUpdatePhoto({
      ...photo,
      caption
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="polaroid-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="polaroid-zoom-frame">
          <div className="polaroid-zoom-photo">
            <img src={photo.url} alt={photo.caption} />
          </div>

          <div className="polaroid-zoom-caption-area">
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="polaroid-caption-input"
              placeholder="Add handwritten memory note..."
            />
          </div>
        </div>

        <div className="polaroid-modal-tools">
          <label className="upload-photo-btn">
            <span>📷 Replace Photo</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>

          <button className="btn-submit" onClick={handleSaveCaption}>
            Save Memory
          </button>
        </div>
      </div>
    </div>
  );
};
