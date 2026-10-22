/**
 * Web Audio API Sound Synthesizer
 * Provides authentic vintage sound effects and calming ambient music
 * without relying on external audio files that could fail to load.
 */

let audioCtx: AudioContext | null = null;
let ambientInterval: number | null = null;
let isMusicPlaying = false;
let masterGain: GainNode | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.7, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Creates a quick burst of filtered noise
 */
function createNoiseBuffer(ctx: AudioContext, duration: number): AudioBuffer {
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

/**
 * Sound of breaking the vintage wax seal (crisp snap + resonant pop)
 */
export function playSealCrackSound(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // 1. High frequency snap / fracture
    const noiseBuffer = createNoiseBuffer(ctx, 0.12);
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(2400, now);
    noiseFilter.Q.setValueAtTime(3, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.8, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noiseSource.start(now);

    // 2. Body thud / mechanical separation
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.25);

    oscGain.gain.setValueAtTime(0.6, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  } catch (e) {
    console.warn('Audio not allowed or supported', e);
  }
}

/**
 * Sound of parchment sliding out of the envelope
 */
export function playPaperSlideSound(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const duration = 0.45;

    const noiseBuffer = createNoiseBuffer(ctx, duration);
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(900, now);
    filter.frequency.linearRampToValueAtTime(1800, now + duration * 0.6);
    filter.frequency.linearRampToValueAtTime(700, now + duration);
    filter.Q.setValueAtTime(1.8, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noiseSource.start(now);
  } catch (e) {
    console.warn('Audio playback error', e);
  }
}

/**
 * Subtle fountain pen scratch sound for typing/drawing effect
 */
export function playPenNibSound(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const duration = 0.04;

    const noise = createNoiseBuffer(ctx, duration);
    const source = ctx.createBufferSource();
    source.buffer = noise;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(3200 + Math.random() * 800, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start(now);
  } catch (e) {
    // Silent fail for pen sounds
  }
}

/**
 * Pleasant celestial harp chime for reactions or open moments
 */
export function playChimeSound(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C E G C arpeggio

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + i * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.18, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 1.2);
    });
  } catch (e) {
    console.warn(e);
  }
}

/**
 * Heavy authentic brass stamp and hot wax thud for re-sealing
 */
export function playSealStampSound(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Stamp metallic hit
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(38, now + 0.3);

    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);

    // Subtle paper crush underneath
    const noise = createNoiseBuffer(ctx, 0.15);
    const source = ctx.createBufferSource();
    source.buffer = noise;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    const nGain = ctx.createGain();
    nGain.gain.setValueAtTime(0.3, now);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    source.connect(filter);
    filter.connect(nGain);
    nGain.connect(ctx.destination);
    source.start(now);
  } catch (e) {
    console.warn(e);
  }
}

/**
 * Warm, relaxing vintage ambient music loop (acoustic rhodes progression)
 */
export function toggleAmbientMusic(onStateChange?: (playing: boolean) => void): boolean {
  if (isMusicPlaying) {
    stopAmbientMusic();
    onStateChange?.(false);
    return false;
  } else {
    startAmbientMusic();
    onStateChange?.(true);
    return true;
  }
}

export function isAmbientMusicActive(): boolean {
  return isMusicPlaying;
}

export function startAmbientMusic(): void {
  if (isMusicPlaying) return;
  const ctx = getAudioContext();
  isMusicPlaying = true;

  // Chord notes for a soothing, emotional gratitude progression:
  // Fmaj7 (F3, A3, C4, E4) -> Dm9 (D3, A3, C4, E4, F4) -> Bbmaj7 (Bb2, F3, A3, D4) -> C9sus4 (C3, G3, Bb3, D4, F4)
  const progression = [
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [146.83, 220.00, 261.63, 329.63, 349.23], // Dm9
    [116.54, 174.61, 220.00, 293.66], // Bbmaj7
    [130.81, 196.00, 233.08, 293.66, 349.23]  // C9sus4
  ];

  let chordIndex = 0;

  function playChord(notes: number[]) {
    if (!isMusicPlaying) return;
    const now = ctx.currentTime;
    const chordDuration = 4.2;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = idx === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, now);
      filter.frequency.exponentialRampToValueAtTime(320, now + chordDuration);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(idx === 0 ? 0.07 : 0.035, now + 0.6 + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + chordDuration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + chordDuration + 0.1);
    });
  }

  // Play immediately
  playChord(progression[0]);
  chordIndex = 1;

  ambientInterval = window.setInterval(() => {
    if (!isMusicPlaying) return;
    playChord(progression[chordIndex]);
    chordIndex = (chordIndex + 1) % progression.length;
  }, 4200);
}

export function stopAmbientMusic(): void {
  isMusicPlaying = false;
  if (ambientInterval !== null) {
    clearInterval(ambientInterval);
    ambientInterval = null;
  }
}
