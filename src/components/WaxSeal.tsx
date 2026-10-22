import React from 'react';
import type { SealColor, SealIcon } from '../types/letter';

interface WaxSealProps {
  color: SealColor;
  icon: SealIcon;
  isBreaking?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  size?: number;
  showPrompt?: boolean;
}

export const WaxSeal: React.FC<WaxSealProps> = ({
  color,
  icon,
  isBreaking = false,
  onClick,
  disabled = false,
  size = 90,
  showPrompt = true
}) => {
  // Color configuration presets
  const colorConfigs: Record<
    SealColor,
    { base: string; highlight: string; shadow: string; rim: string; text: string; glow: string }
  > = {
    crimson: {
      base: '#8B1E1E',
      highlight: '#D32F2F',
      shadow: '#4A0E0E',
      rim: '#6E1616',
      text: '#FFCDD2',
      glow: 'rgba(211, 47, 47, 0.45)'
    },
    gold: {
      base: '#C59B27',
      highlight: '#F6D365',
      shadow: '#6D500B',
      rim: '#9B7819',
      text: '#FFF8E1',
      glow: 'rgba(246, 211, 101, 0.5)'
    },
    emerald: {
      base: '#1E5E3A',
      highlight: '#2E8540',
      shadow: '#0B2918',
      rim: '#16482B',
      text: '#C8E6C9',
      glow: 'rgba(46, 133, 64, 0.45)'
    },
    navy: {
      base: '#1A365D',
      highlight: '#2B6CB0',
      shadow: '#0C1B2F',
      rim: '#132845',
      text: '#BEE3F8',
      glow: 'rgba(43, 108, 176, 0.45)'
    },
    rose: {
      base: '#9C4153',
      highlight: '#D86B81',
      shadow: '#521F2A',
      rim: '#77303E',
      text: '#FCE4EC',
      glow: 'rgba(216, 107, 129, 0.45)'
    }
  };

  const currentTheme = colorConfigs[color] || colorConfigs.crimson;

  const renderIconSvg = () => {
    switch (icon) {
      case 'branch':
        return (
          <path
            d="M32 68 C32 40, 48 30, 68 28 C64 36, 52 42, 44 43 C52 46, 62 48, 64 56 C56 56, 48 52, 42 50 C44 56, 48 64, 46 68 C42 66, 38 58, 36 53 Z"
            fill="currentColor"
            opacity="0.88"
          />
        );
      case 'quill':
        return (
          <path
            d="M68 28 C62 38, 52 46, 46 54 L44 68 L48 64 C56 58, 64 48, 70 34 C64 36, 58 36, 52 38 C56 34, 62 30, 68 28 Z M42 66 L34 74 L38 68 Z"
            fill="currentColor"
            opacity="0.88"
          />
        );
      case 'star':
        return (
          <path
            d="M50 26 L54 42 L70 42 L57 52 L62 68 L50 58 L38 68 L43 52 L30 42 L46 42 Z"
            fill="currentColor"
            opacity="0.88"
          />
        );
      case 'rose':
        return (
          <path
            d="M50 32 C58 32, 64 38, 64 46 C64 54, 56 62, 50 66 C44 62, 36 54, 36 46 C36 38, 42 32, 50 32 Z M50 38 C46 38, 42 42, 42 46 C42 50, 46 54, 50 56 C54 54, 58 50, 58 46 C58 42, 54 38, 50 38 Z"
            fill="currentColor"
            opacity="0.88"
          />
        );
      case 'heart':
      default:
        return (
          <path
            d="M50 68 C50 68, 32 54, 32 42 C32 34, 38 30, 44 30 C47.5 30, 50 33, 50 33 C50 33, 52.5 30, 56 30 C62 30, 68 34, 68 42 C68 54, 50 68, 50 68 Z"
            fill="currentColor"
            opacity="0.88"
          />
        );
    }
  };

  return (
    <div
      className={`wax-seal-container ${isBreaking ? 'wax-seal-breaking' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={!disabled ? onClick : undefined}
      style={{ width: size, height: size }}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="Wax seal - Click to break seal and open letter"
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Ribbon underneath seal */}
      <div className="seal-ribbon">
        <div className="ribbon-tail left" style={{ backgroundColor: currentTheme.shadow }} />
        <div className="ribbon-tail right" style={{ backgroundColor: currentTheme.shadow }} />
      </div>

      <svg
        viewBox="0 0 100 100"
        className="wax-seal-svg"
        style={{
          filter: `drop-shadow(0 6px 12px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 16px ${currentTheme.glow})`
        }}
      >
        <defs>
          {/* Melted organic wax radial gradient */}
          <radialGradient id={`waxGrad-${color}`} cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor={currentTheme.highlight} />
            <stop offset="60%" stopColor={currentTheme.base} />
            <stop offset="92%" stopColor={currentTheme.rim} />
            <stop offset="100%" stopColor={currentTheme.shadow} />
          </radialGradient>

          {/* Inner impressed circle gradient */}
          <radialGradient id={`innerGrad-${color}`} cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor={currentTheme.base} />
            <stop offset="75%" stopColor={currentTheme.rim} />
            <stop offset="100%" stopColor={currentTheme.shadow} />
          </radialGradient>

          {/* Highlight sheen */}
          <linearGradient id="sheenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
          </linearGradient>

          {/* Filter for wax texture / displacement */}
          <filter id="waxRoughness" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        {/* Outer irregular melted wax puddle shape */}
        <path
          d="M50 4 
             C64 3, 76 8, 86 18 
             C94 28, 98 40, 96 54 
             C94 68, 88 80, 76 88 
             C64 96, 48 98, 36 94 
             C24 90, 12 82, 6 68 
             C1 54, 4 38, 12 26 
             C20 14, 34 5, 50 4 Z"
          fill={`url(#waxGrad-${color})`}
          filter="url(#waxRoughness)"
        />

        {/* Glossy top sheen overlay */}
        <path
          d="M50 6 C62 5, 74 10, 83 19 C70 18, 55 22, 42 30 C30 38, 20 48, 14 62 C8 50, 10 36, 18 24 C26 14, 38 7, 50 6 Z"
          fill="url(#sheenGrad)"
          opacity="0.6"
        />

        {/* Inner stamped rim ring */}
        <circle
          cx="50"
          cy="50"
          r="34"
          fill="none"
          stroke={currentTheme.shadow}
          strokeWidth="3.5"
          opacity="0.8"
        />
        <circle
          cx="50"
          cy="50"
          r="33"
          fill={`url(#innerGrad-${color})`}
          stroke={currentTheme.highlight}
          strokeWidth="1.2"
        />
        <circle
          cx="50"
          cy="50"
          r="29"
          fill="none"
          stroke={currentTheme.shadow}
          strokeWidth="1.5"
          strokeDasharray="2.5 2"
          opacity="0.6"
        />

        {/* Embossed icon with 3D bevel shadow */}
        <g style={{ color: currentTheme.text }}>
          {/* Embossed drop shadow */}
          <g transform="translate(1, 1.5)" opacity="0.5" style={{ color: currentTheme.shadow }}>
            {renderIconSvg()}
          </g>
          {/* Main icon */}
          {renderIconSvg()}
          {/* Top highlight */}
          <g transform="translate(-0.5, -0.5)" opacity="0.3" style={{ color: '#ffffff' }}>
            {renderIconSvg()}
          </g>
        </g>
      </svg>

      {/* Floating prompt tooltip */}
      {showPrompt && !disabled && (
        <div className="seal-prompt">
          <span>Click to break seal</span>
        </div>
      )}
    </div>
  );
};
