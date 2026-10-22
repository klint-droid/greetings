import React, { useState } from 'react';
import type { LetterData, SealColor, SealIcon, StampStyle } from '../types/letter';
import { gratitudePresets, type PresetTemplate } from '../data/presets';

interface EditModalProps {
  data: LetterData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newData: LetterData) => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  data,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<LetterData>({ ...data });

  if (!isOpen) return null;

  const handleApplyPreset = (preset: PresetTemplate) => {
    setFormData((prev) => ({
      ...prev,
      recipientName: preset.recipientDefault,
      salutation: preset.salutationDefault,
      paragraphs: [...preset.paragraphs],
      closing: preset.closingDefault,
      sealColor: preset.sealColor,
      sealIcon: preset.sealIcon
    }));
  };

  const handleParagraphChange = (index: number, text: string) => {
    const updated = [...formData.paragraphs];
    updated[index] = text;
    setFormData({ ...formData, paragraphs: updated });
  };

  const handleAddParagraph = () => {
    setFormData({
      ...formData,
      paragraphs: [...formData.paragraphs, '']
    });
  };

  const handleRemoveParagraph = (index: number) => {
    if (formData.paragraphs.length <= 1) return;
    const updated = formData.paragraphs.filter((_, i) => i !== index);
    setFormData({ ...formData, paragraphs: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const sealColors: Array<{ id: SealColor; label: string; hex: string }> = [
    { id: 'crimson', label: 'Royal Crimson', hex: '#8B1E1E' },
    { id: 'gold', label: 'Antique Gold', hex: '#C59B27' },
    { id: 'emerald', label: 'Forest Emerald', hex: '#1E5E3A' },
    { id: 'navy', label: 'Midnight Navy', hex: '#1A365D' },
    { id: 'rose', label: 'Vintage Rose', hex: '#9C4153' }
  ];

  const sealIcons: Array<{ id: SealIcon; label: string; icon: string }> = [
    { id: 'heart', label: 'Heart', icon: '❤️' },
    { id: 'branch', label: 'Olive Branch', icon: '🌿' },
    { id: 'quill', label: 'Quill Pen', icon: '🪶' },
    { id: 'star', label: 'Star', icon: '⭐' },
    { id: 'rose', label: 'Rose', icon: '🌹' }
  ];

  const stampStyles: Array<{ id: StampStyle; label: string }> = [
    { id: 'vintage-paris', label: 'Classic Par Avion' },
    { id: 'botanical-rose', label: 'Botanical Rose' },
    { id: 'airmail-gold', label: 'Golden Airmail' }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="edit-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <h2 id="modal-title">Personalize Your Letter of Gratitude</h2>
            <p className="modal-subtitle">Craft words of appreciation that will warm their heart</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Quick Presets Carousel */}
          <div className="form-section">
            <label className="section-label">Select An Inspiring Preset:</label>
            <div className="presets-list">
              {gratitudePresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className="preset-card-btn"
                  onClick={() => handleApplyPreset(preset)}
                >
                  <span className="preset-name">{preset.title}</span>
                  <span className="preset-desc">{preset.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-grid-two">
            {/* Recipient */}
            <div className="form-group">
              <label htmlFor="recipientName">Recipient Name / Title</label>
              <input
                id="recipientName"
                type="text"
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                required
              />
            </div>

            {/* Sender */}
            <div className="form-group">
              <label htmlFor="senderName">Sender / Sign-off Name</label>
              <input
                id="senderName"
                type="text"
                value={formData.senderName}
                onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Salutation & Date */}
          <div className="form-grid-two">
            <div className="form-group">
              <label htmlFor="salutation">Opening Salutation</label>
              <input
                id="salutation"
                type="text"
                value={formData.salutation}
                onChange={(e) => setFormData({ ...formData, salutation: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="letterDate">Date</label>
              <input
                id="letterDate"
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Paragraphs */}
          <div className="form-section">
            <div className="paragraphs-header">
              <label className="section-label">Letter Body (Your Words of Thanks):</label>
              <button
                type="button"
                className="add-paragraph-btn"
                onClick={handleAddParagraph}
              >
                + Add Paragraph
              </button>
            </div>

            {formData.paragraphs.map((p, index) => (
              <div key={index} className="paragraph-editor-item">
                <textarea
                  rows={3}
                  value={p}
                  onChange={(e) => handleParagraphChange(index, e.target.value)}
                  placeholder={`Paragraph ${index + 1}...`}
                  required
                />
                {formData.paragraphs.length > 1 && (
                  <button
                    type="button"
                    className="delete-paragraph-btn"
                    onClick={() => handleRemoveParagraph(index)}
                    title="Remove paragraph"
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Sign-off Closing */}
          <div className="form-group">
            <label htmlFor="closing">Closing Sign-off Phrase</label>
            <input
              id="closing"
              type="text"
              value={formData.closing}
              onChange={(e) => setFormData({ ...formData, closing: e.target.value })}
              required
            />
          </div>

          {/* Wax Seal Customization */}
          <div className="form-section">
            <label className="section-label">Wax Seal Styling:</label>
            <div className="wax-options-container">
              {/* Seal Colors */}
              <div className="color-picker-row">
                <span className="picker-label">Color:</span>
                <div className="color-swatches">
                  {sealColors.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className={`color-swatch-btn ${formData.sealColor === c.id ? 'active' : ''}`}
                      style={{ backgroundColor: c.hex }}
                      onClick={() => setFormData({ ...formData, sealColor: c.id })}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              {/* Seal Icon */}
              <div className="icon-picker-row">
                <span className="picker-label">Embossed Icon:</span>
                <div className="icon-buttons">
                  {sealIcons.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`icon-choice-btn ${formData.sealIcon === item.id ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, sealIcon: item.id })}
                    >
                      <span>{item.icon}</span>
                      <small>{item.label}</small>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stamp Style */}
              <div className="icon-picker-row">
                <span className="picker-label">Postal Stamp:</span>
                <div className="icon-buttons">
                  {stampStyles.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`icon-choice-btn ${formData.stampStyle === item.id ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, stampStyle: item.id })}
                    >
                      <small>{item.label}</small>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Apply Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
