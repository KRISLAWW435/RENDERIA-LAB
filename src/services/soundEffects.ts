import bgMusicUrl from '../assets/audio/Modern Future-Pop Kids Studio.mp3';

/**
 * Procedural Web Audio Synthesizer & Background Music Controller
 */

let audioCtx: AudioContext | null = null;
let isMuted = false;
let bgAudio: HTMLAudioElement | null = null;

type SoundStateListener = (muted: boolean, isMusicPlaying: boolean) => void;
const listeners = new Set<SoundStateListener>();

export function subscribeSoundState(listener: SoundStateListener): () => void {
  listeners.add(listener);
  listener(getMuted(), isMusicPlaying());
  return () => {
    listeners.delete(listener);
  };
}

function notifySoundState() {
  const muted = getMuted();
  const playing = isMusicPlaying();
  listeners.forEach((fn) => {
    try {
      fn(muted, playing);
    } catch {
      // Ignore listener error
    }
  });
}

export function isMusicPlaying(): boolean {
  return !!bgAudio && !bgAudio.paused && !bgAudio.muted;
}

export function getBackgroundAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  if (!bgAudio) {
    bgAudio = new Audio(bgMusicUrl);
    bgAudio.loop = true;
    bgAudio.volume = 0.25;
    bgAudio.preload = 'auto';

    bgAudio.addEventListener('play', () => {
      notifySoundState();
    });
    bgAudio.addEventListener('pause', () => {
      notifySoundState();
    });
    bgAudio.addEventListener('volumechange', () => {
      notifySoundState();
    });
  }
  return bgAudio;
}

export function startBackgroundMusic(): void {
  if (getMuted()) return;
  const audio = getBackgroundAudio();
  if (!audio) return;
  if (audio.paused) {
    audio.play().catch((err) => {
      console.warn('Background music autoplay blocked or failed:', err);
    });
  }
}

export function toggleMusic(): boolean {
  const currentMuted = getMuted();
  const nextMuted = !currentMuted;
  setMuted(nextMuted);
  return !nextMuted;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setMuted(muted: boolean) {
  isMuted = muted;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('renderia_sound_muted', muted ? 'true' : 'false');
  }
  const audio = getBackgroundAudio();
  if (audio) {
    if (muted) {
      audio.pause();
    } else {
      audio.play().catch((err) => {
        console.warn('Playback error on unmute:', err);
      });
    }
  }
  notifySoundState();
}

export function getMuted(): boolean {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('renderia_sound_muted');
    if (stored !== null) {
      isMuted = stored === 'true';
    }
  }
  return isMuted;
}

export function playClickSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(720, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // AudioContext might be blocked until user gesture
  }
}

export function playSelectSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.09); // A5

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch {
    // Ignore audio errors
  }
}

export function playSuccessSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);

      gain.gain.setValueAtTime(0.14, ctx.currentTime + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.07);
      osc.stop(ctx.currentTime + idx * 0.07 + 0.2);
    });
  } catch {
    // Ignore
  }
}

export function playBadgeSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const notes = [659.25, 783.99, 987.77, 1318.51]; // E5, G5, B5, E6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.35);
    });
  } catch {
    // Ignore
  }
}

export function playFanfareSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const melody = [
      { freq: 523.25, time: 0, dur: 0.15 },
      { freq: 659.25, time: 0.14, dur: 0.15 },
      { freq: 783.99, time: 0.28, dur: 0.18 },
      { freq: 1046.5, time: 0.46, dur: 0.5 },
    ];

    melody.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.freq, ctx.currentTime + note.time);

      gain.gain.setValueAtTime(0.2, ctx.currentTime + note.time);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.time + note.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + note.time);
      osc.stop(ctx.currentTime + note.time + note.dur);
    });
  } catch {
    // Ignore
  }
}

export function playGentleErrorSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(330, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  } catch {
    // Ignore
  }
}
