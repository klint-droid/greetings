/**
 * Web Audio API Sound Synthesizer
 * Provides authentic vintage sound effects and calming ambient music
 * without relying on external audio files that could fail to load.
 */

let audioCtx: AudioContext | null = null;
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
 * ============================================================================
 * CHRISTMAS MUSIC BOX & HEARTH AMBIENT MUSIC
 * A nostalgic, warm music-box & celesta arrangement of "Silent Night" (Stille Nacht)
 * with cozy fireplace pad harmonies and subtle holiday sleigh-bell sparkle.
 * Synthesized dynamically via Web Audio API with 0 external dependencies.
 * ============================================================================
 */

let musicGainNode: GainNode | null = null;
let musicLoopTimeout: number | null = null;

// Musical pitches (Hz) for Christmas Carol in C Major
const PITCH = {
  F2: 87.31,
  G2: 98.00,
  C3: 130.81,
  D3: 146.83,
  E3: 164.81,
  F3: 174.61,
  G3: 196.00,
  A3: 220.00,
  B3: 246.94,
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99
};

interface CarolNote {
  beat: number;
  duration: number;
  freq: number;
}

interface CarolChord {
  beat: number;
  duration: number;
  freqs: number[];
}

// "Silent Night" 24-Measure Score (3/4 time, 72 total beats)
const SILENT_NIGHT_MELODY: CarolNote[] = [
  // Measure 1-4: "Silent night, holy night..."
  { beat: 0, duration: 1.5, freq: PITCH.G4 },
  { beat: 1.5, duration: 0.5, freq: PITCH.A4 },
  { beat: 2, duration: 1.0, freq: PITCH.G4 },
  { beat: 3, duration: 3.0, freq: PITCH.E4 },
  { beat: 6, duration: 1.5, freq: PITCH.G4 },
  { beat: 7.5, duration: 0.5, freq: PITCH.A4 },
  { beat: 8, duration: 1.0, freq: PITCH.G4 },
  { beat: 9, duration: 3.0, freq: PITCH.E4 },

  // Measure 5-8: "All is calm, all is bright..."
  { beat: 12, duration: 2.0, freq: PITCH.D5 },
  { beat: 14, duration: 1.0, freq: PITCH.D5 },
  { beat: 15, duration: 3.0, freq: PITCH.B4 },
  { beat: 18, duration: 2.0, freq: PITCH.C5 },
  { beat: 20, duration: 1.0, freq: PITCH.C5 },
  { beat: 21, duration: 3.0, freq: PITCH.G4 },

  // Measure 9-12: "Round yon virgin mother and child..."
  { beat: 24, duration: 2.0, freq: PITCH.A4 },
  { beat: 26, duration: 1.0, freq: PITCH.A4 },
  { beat: 27, duration: 1.5, freq: PITCH.C5 },
  { beat: 28.5, duration: 0.5, freq: PITCH.B4 },
  { beat: 29, duration: 1.0, freq: PITCH.A4 },
  { beat: 30, duration: 1.5, freq: PITCH.G4 },
  { beat: 31.5, duration: 0.5, freq: PITCH.A4 },
  { beat: 32, duration: 1.0, freq: PITCH.G4 },
  { beat: 33, duration: 3.0, freq: PITCH.E4 },

  // Measure 13-16: "Holy infant so tender and mild..."
  { beat: 36, duration: 2.0, freq: PITCH.A4 },
  { beat: 38, duration: 1.0, freq: PITCH.A4 },
  { beat: 39, duration: 1.5, freq: PITCH.C5 },
  { beat: 40.5, duration: 0.5, freq: PITCH.B4 },
  { beat: 41, duration: 1.0, freq: PITCH.A4 },
  { beat: 42, duration: 1.5, freq: PITCH.G4 },
  { beat: 43.5, duration: 0.5, freq: PITCH.A4 },
  { beat: 44, duration: 1.0, freq: PITCH.G4 },
  { beat: 45, duration: 3.0, freq: PITCH.E4 },

  // Measure 17-20: "Sleep in heavenly peace..."
  { beat: 48, duration: 2.0, freq: PITCH.D5 },
  { beat: 50, duration: 1.0, freq: PITCH.D5 },
  { beat: 51, duration: 1.5, freq: PITCH.F5 },
  { beat: 52.5, duration: 0.5, freq: PITCH.D5 },
  { beat: 53, duration: 1.0, freq: PITCH.B4 },
  { beat: 54, duration: 3.0, freq: PITCH.C5 },
  { beat: 57, duration: 3.0, freq: PITCH.E5 },

  // Measure 21-24: "Sleep in heavenly peace..."
  { beat: 60, duration: 1.0, freq: PITCH.C5 },
  { beat: 61, duration: 1.0, freq: PITCH.G4 },
  { beat: 62, duration: 1.0, freq: PITCH.E4 },
  { beat: 63, duration: 1.5, freq: PITCH.G4 },
  { beat: 64.5, duration: 0.5, freq: PITCH.F4 },
  { beat: 65, duration: 1.0, freq: PITCH.D4 },
  { beat: 66, duration: 3.0, freq: PITCH.C4 },

  // Outro music box flourish
  { beat: 69, duration: 1.0, freq: PITCH.E4 },
  { beat: 70, duration: 1.0, freq: PITCH.G4 },
  { beat: 71, duration: 1.8, freq: PITCH.C5 }
];

const SILENT_NIGHT_CHORDS: CarolChord[] = [
  { beat: 0, duration: 3, freqs: [PITCH.C3, PITCH.G3, PITCH.E4] },
  { beat: 3, duration: 3, freqs: [PITCH.C3, PITCH.G3, PITCH.C4] },
  { beat: 6, duration: 3, freqs: [PITCH.C3, PITCH.G3, PITCH.E4] },
  { beat: 9, duration: 3, freqs: [PITCH.C3, PITCH.G3, PITCH.C4] },

  { beat: 12, duration: 3, freqs: [PITCH.G2, PITCH.D3, PITCH.B3] },
  { beat: 15, duration: 3, freqs: [PITCH.G2, PITCH.D3, PITCH.G3] },
  { beat: 18, duration: 3, freqs: [PITCH.C3, PITCH.G3, PITCH.E4] },
  { beat: 21, duration: 3, freqs: [PITCH.C3, PITCH.G3, PITCH.C4] },

  { beat: 24, duration: 3, freqs: [PITCH.F2, PITCH.C3, PITCH.A3] },
  { beat: 27, duration: 3, freqs: [PITCH.F2, PITCH.C3, PITCH.A3] },
  { beat: 30, duration: 3, freqs: [PITCH.C3, PITCH.G3, PITCH.E4] },
  { beat: 33, duration: 3, freqs: [PITCH.C3, PITCH.G3, PITCH.C4] },

  { beat: 36, duration: 3, freqs: [PITCH.F2, PITCH.C3, PITCH.A3] },
  { beat: 39, duration: 3, freqs: [PITCH.F2, PITCH.C3, PITCH.A3] },
  { beat: 42, duration: 3, freqs: [PITCH.C3, PITCH.G3, PITCH.E4] },
  { beat: 45, duration: 3, freqs: [PITCH.C3, PITCH.G3, PITCH.C4] },

  { beat: 48, duration: 3, freqs: [PITCH.G2, PITCH.D3, PITCH.B3] },
  { beat: 51, duration: 3, freqs: [PITCH.G2, PITCH.D3, PITCH.G3] },
  { beat: 54, duration: 3, freqs: [PITCH.C3, PITCH.G3, PITCH.E4] },
  { beat: 57, duration: 3, freqs: [PITCH.C3, PITCH.G3, PITCH.C4, PITCH.E4] },

  { beat: 60, duration: 3, freqs: [PITCH.C3, PITCH.G3, PITCH.E4] },
  { beat: 63, duration: 3, freqs: [PITCH.G2, PITCH.D3, PITCH.B3] },
  { beat: 66, duration: 3, freqs: [PITCH.C3, PITCH.G3, PITCH.C4, PITCH.E4] },
  { beat: 69, duration: 3, freqs: [PITCH.C3, PITCH.G3, PITCH.C4] }
];

function getMusicMasterGain(ctx: AudioContext): GainNode {
  if (!musicGainNode) {
    musicGainNode = ctx.createGain();
    musicGainNode.gain.setValueAtTime(0.75, ctx.currentTime);
    musicGainNode.connect(ctx.destination);
  }
  return musicGainNode;
}

/**
 * Plays a crystalline music-box note with bell overtones
 */
function scheduleMusicBoxNote(ctx: AudioContext, destination: GainNode, freq: number, startTime: number, duration: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, startTime);

  // Music-box tine sparkle (metallic celestial harmonic)
  const tine = ctx.createOscillator();
  const tineGain = ctx.createGain();
  tine.type = 'sine';
  tine.frequency.setValueAtTime(freq * 2.756, startTime);

  const decay = Math.max(0.6, Math.min(duration * 0.95, 2.6));

  // Natural bell envelope
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.linearRampToValueAtTime(0.065, startTime + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + decay);

  tineGain.gain.setValueAtTime(0.0001, startTime);
  tineGain.gain.linearRampToValueAtTime(0.014, startTime + 0.008);
  tineGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.35);

  osc.connect(gain);
  gain.connect(destination);

  tine.connect(tineGain);
  tineGain.connect(destination);

  osc.start(startTime);
  osc.stop(startTime + decay + 0.05);

  tine.start(startTime);
  tine.stop(startTime + 0.4);
}

/**
 * Plays a warm acoustic fireplace chord pad
 */
function scheduleHearthChord(ctx: AudioContext, destination: GainNode, freqs: number[], startTime: number, duration: number) {
  freqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = idx === 0 ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(520, startTime);
    filter.frequency.exponentialRampToValueAtTime(320, startTime + duration);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(idx === 0 ? 0.038 : 0.02, startTime + 0.45);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  });
}

/**
 * Subtle holiday sleigh-bell shimmer on measure downbeats
 */
function scheduleSleighBell(ctx: AudioContext, destination: GainNode, startTime: number) {
  const bellFreqs = [2489, 2960, 3520];
  bellFreqs.forEach((freq) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(0.006, startTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.14);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(startTime);
    osc.stop(startTime + 0.16);
  });
}

export function isAmbientMusicActive(): boolean {
  return isMusicPlaying;
}

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

/**
 * Starts continuous Christmas ambient music loop
 */
export function startAmbientMusic(): void {
  if (isMusicPlaying) return;
  const ctx = getAudioContext();
  const musicDest = getMusicMasterGain(ctx);

  isMusicPlaying = true;
  musicDest.gain.cancelScheduledValues(ctx.currentTime);
  musicDest.gain.setValueAtTime(0.001, ctx.currentTime);
  musicDest.gain.linearRampToValueAtTime(0.75, ctx.currentTime + 1.2);

  // 66 BPM = ~0.909 seconds per beat
  const beatSec = 60 / 66;
  const totalBeats = 72;
  const loopDuration = totalBeats * beatSec; // ~65.45 seconds

  function scheduleCarolCycle(cycleStartTime: number) {
    if (!isMusicPlaying) return;

    // 1. Schedule all melody notes
    SILENT_NIGHT_MELODY.forEach((note) => {
      const noteTime = cycleStartTime + note.beat * beatSec;
      const noteDur = note.duration * beatSec;
      scheduleMusicBoxNote(ctx, musicDest, note.freq, noteTime, noteDur);
    });

    // 2. Schedule harmony pads
    SILENT_NIGHT_CHORDS.forEach((chord) => {
      const chordTime = cycleStartTime + chord.beat * beatSec;
      const chordDur = chord.duration * beatSec;
      scheduleHearthChord(ctx, musicDest, chord.freqs, chordTime, chordDur);
    });

    // 3. Schedule gentle sleigh bells every measure (every 3 beats)
    for (let b = 0; b < totalBeats; b += 3) {
      const bellTime = cycleStartTime + b * beatSec;
      scheduleSleighBell(ctx, musicDest, bellTime);
    }

    // Schedule next cycle slightly before current ends for a seamless loop
    const nextStartTime = cycleStartTime + loopDuration;
    const delayMs = Math.max(100, (loopDuration - 1.2) * 1000);

    musicLoopTimeout = window.setTimeout(() => {
      if (isMusicPlaying) {
        scheduleCarolCycle(nextStartTime);
      }
    }, delayMs);
  }

  scheduleCarolCycle(ctx.currentTime + 0.1);
}

/**
 * Stops Christmas music with smooth fade-out
 */
export function stopAmbientMusic(): void {
  isMusicPlaying = false;

  if (musicLoopTimeout !== null) {
    clearTimeout(musicLoopTimeout);
    musicLoopTimeout = null;
  }

  if (audioCtx && musicGainNode) {
    try {
      musicGainNode.gain.cancelScheduledValues(audioCtx.currentTime);
      musicGainNode.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
    } catch {
      // AudioContext already suspended or disposed
    }
  }
}

