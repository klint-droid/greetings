import React from 'react';

interface BulbConfig {
  color: string;
  glow: string;
  delay: string;
  duration: string;
}

export const ChristmasLights: React.FC = () => {
  // Preset holiday light colors
  const bulbs: BulbConfig[] = [
    { color: '#e63946', glow: 'rgba(230, 57, 70, 0.75)', delay: '0s', duration: '2.1s' },    // Ruby Red
    { color: '#ffb703', glow: 'rgba(255, 183, 3, 0.8)', delay: '0.4s', duration: '1.9s' },   // Warm Amber Gold
    { color: '#2a9d8f', glow: 'rgba(42, 157, 143, 0.75)', delay: '0.8s', duration: '2.4s' }, // Pine Emerald
    { color: '#ffffff', glow: 'rgba(255, 255, 255, 0.85)', delay: '1.2s', duration: '1.8s' }, // Ice White
    { color: '#e63946', glow: 'rgba(230, 57, 70, 0.75)', delay: '0.3s', duration: '2.2s' },
    { color: '#fb8500', glow: 'rgba(251, 133, 0, 0.8)', delay: '0.7s', duration: '2.0s' },
    { color: '#2a9d8f', glow: 'rgba(42, 157, 143, 0.75)', delay: '1.1s', duration: '2.3s' },
    { color: '#ffd166', glow: 'rgba(255, 209, 102, 0.8)', delay: '0.2s', duration: '1.7s' },
    { color: '#e63946', glow: 'rgba(230, 57, 70, 0.75)', delay: '0.6s', duration: '2.5s' },
    { color: '#ffffff', glow: 'rgba(255, 255, 255, 0.85)', delay: '0.9s', duration: '1.9s' },
    { color: '#2a9d8f', glow: 'rgba(42, 157, 143, 0.75)', delay: '0.1s', duration: '2.1s' },
    { color: '#ffb703', glow: 'rgba(255, 183, 3, 0.8)', delay: '0.5s', duration: '2.0s' },
    { color: '#e63946', glow: 'rgba(230, 57, 70, 0.75)', delay: '1.0s', duration: '2.2s' },
    { color: '#ffd166', glow: 'rgba(255, 209, 102, 0.8)', delay: '0.3s', duration: '1.8s' },
    { color: '#2a9d8f', glow: 'rgba(42, 157, 143, 0.75)', delay: '0.7s', duration: '2.4s' },
    { color: '#ffffff', glow: 'rgba(255, 255, 255, 0.85)', delay: '1.2s', duration: '1.9s' },
  ];

  return (
    <div className="christmas-lights-banner" aria-hidden="true">
      {/* Wire strand running across top */}
      <svg className="lights-wire-svg" preserveAspectRatio="none" viewBox="0 0 1600 60">
        <path
          d="M0,15 Q100,38 200,18 Q300,42 400,20 Q500,45 600,19 Q700,42 800,22 Q900,44 1000,18 Q1100,42 1200,20 Q1300,45 1400,19 Q1500,38 1600,16"
          fill="none"
          stroke="rgba(40, 60, 45, 0.65)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Glowing Bulbs */}
      <div className="lights-bulbs-container">
        {bulbs.map((bulb, idx) => (
          <div
            key={idx}
            className="christmas-bulb-wrapper"
            style={{
              animationDelay: bulb.delay,
              animationDuration: bulb.duration
            }}
          >
            {/* Dark green socket cap */}
            <div className="bulb-socket" />
            {/* Glowing teardrop bulb */}
            <div
              className="bulb-glass"
              style={{
                backgroundColor: bulb.color,
                boxShadow: `0 3px 12px ${bulb.glow}, 0 0 24px ${bulb.glow}`
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
