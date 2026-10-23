import React, { useState, useEffect } from 'react';
import pixelMascotImg from '../assets/pix/pixel1.webp';
import { playClickSound } from '../services/soundEffects';

export type PixelMood = 'happy' | 'thinking' | 'celebrate';

interface MascotPixelProps {
  mood?: PixelMood;
  speechText: string;
  tip?: string;
  className?: string;
  showHint?: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  dx: string;
  dy: string;
  rot: string;
  size: number;
  color: string;
  char: string;
}

const PIX_EDUCATIONAL_PHRASES = [
  'Привет, создатель! Нейросети не умеют читать мысли. Чем точнее ты опишешь героя, тем круче он получится!',
  'Знаешь секрет? ИИ обожает яркие цвета и странные детали. Не бойся экспериментировать!',
  'Для 3D-модели важен чистый фон. Как для космонавта — скафандр!',
  'Если ИИ нарисует герою три руки — не пугайся! Просто в следующий раз напиши в промпте «ровно две руки».',
  'Твой герой будет жить в 3D! Представь, как он будет выглядеть, если на него посмотреть сбоку или сзади.',
  'Хочешь, чтобы герой получился эпичным? Придумай ему не только крутой костюм, но и уникальную суперспособность!',
];

const PARTICLE_SYMBOLS = ['✦', '★', '✨', '⭐', '●'];
const PARTICLE_COLORS = ['#B9F24D', '#62C9F5', '#FFB9D5', '#BDA7FF', '#FBBF24', '#38BDF8'];

export const MascotPixel: React.FC<MascotPixelProps> = ({
  mood = 'happy',
  speechText,
  tip,
  className = '',
  showHint = true,
}) => {
  const [customSpeech, setCustomSpeech] = useState<string | null>(null);
  const [lastPhraseIndex, setLastPhraseIndex] = useState<number>(-1);
  const [particles, setParticles] = useState<Particle[]>([]);

  // When stage changes, sync speech back to the stage's default text
  useEffect(() => {
    setCustomSpeech(null);
  }, [speechText]);

  const getImageSrc = () => {
    return pixelMascotImg;
  };

  const handlePixelClick = () => {
    playClickSound();

    // 1. Pick a random phrase (different from current)
    let nextIndex = Math.floor(Math.random() * PIX_EDUCATIONAL_PHRASES.length);
    if (nextIndex === lastPhraseIndex) {
      nextIndex = (nextIndex + 1) % PIX_EDUCATIONAL_PHRASES.length;
    }
    setLastPhraseIndex(nextIndex);
    setCustomSpeech(PIX_EDUCATIONAL_PHRASES[nextIndex]);

    // 2. Trigger burst of 5-8 colorful star/sparkle particles
    const particleCount = 7;
    const newParticles: Particle[] = [];
    const now = Date.now();

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
      const distance = 40 + Math.random() * 45;
      const dxVal = Math.cos(angle) * distance;
      const dyVal = -35 - Math.random() * 65; // float upwards
      const rotVal = (Math.random() - 0.5) * 180;

      newParticles.push({
        id: now + i + Math.random(),
        x: 50 + (Math.random() - 0.5) * 20,
        y: 50 + (Math.random() - 0.5) * 20,
        dx: `${Math.round(dxVal)}px`,
        dy: `${Math.round(dyVal)}px`,
        rot: `${Math.round(rotVal)}deg`,
        size: Math.floor(14 + Math.random() * 8),
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        char: PARTICLE_SYMBOLS[Math.floor(Math.random() * PARTICLE_SYMBOLS.length)],
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);

    // Clean up particles after 0.8s
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
    }, 850);
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 ${className}`}>
      {/* Mascot Image Area with Visual Cue and Particle Effect */}
      <div className="flex flex-col items-center shrink-0">
        <div
          onClick={handlePixelClick}
          className="relative cursor-pointer transition-transform hover:scale-105 active:scale-95 group select-none"
          title="Нажми на Пикса, чтобы услышать совет!"
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handlePixelClick();
            }
          }}
        >
          {/* Subtle glowing aura */}
          <div className="absolute inset-0 -m-2.5 rounded-full bg-gradient-to-tr from-[#B9F24D]/35 to-[#62C9F5]/35 blur-xl opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Clean transparent container with soft natural drop shadow */}
          <div
            className="relative w-32 h-32 sm:w-44 sm:h-44 flex items-center justify-center select-none"
            style={{ cursor: 'pointer' }}
          >
            <img
              src={getImageSrc()}
              alt="Пикс"
              className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(37,39,53,0.2)] drop-shadow-[0_4px_14px_rgba(98,201,245,0.35)] transition-transform duration-300 group-hover:rotate-1"
              style={{ cursor: 'pointer' }}
              referrerPolicy="no-referrer"
            />

            {/* Particle Burst Overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              {particles.map((p) => (
                <span
                  key={p.id}
                  className="absolute animate-pix-particle pointer-events-none font-bold select-none leading-none drop-shadow-sm"
                  style={
                    {
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      fontSize: `${p.size}px`,
                      color: p.color,
                      '--p-dx': p.dx,
                      '--p-dy': p.dy,
                      '--p-rot': p.rot,
                    } as React.CSSProperties
                  }
                >
                  {p.char}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Mascot Name and Label */}
        <div className="text-center mt-3 sm:mt-2 space-y-0.5">
          <div className="font-display font-black text-base sm:text-lg text-[#252735] tracking-wide flex items-center justify-center">
            <span>Пикс</span>
          </div>
          <div className="text-[11px] font-bold text-slate-500 bg-white/90 px-2.5 py-0.5 rounded-full border border-slate-200 shadow-2xs whitespace-nowrap">
            Помощник в мире дизайна
          </div>
        </div>
      </div>

      {/* Right Column: Speech Bubble + Hint directly below it */}
      <div className="flex-1 w-full flex flex-col gap-2.5">
        {/* Speech Bubble (dialogue panel) */}
        <div className="relative bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-center min-h-[105px]">
          <div className="space-y-3">
            <p className="text-[#252735] text-base sm:text-lg font-bold leading-relaxed font-sans">
              {customSpeech || speechText}
            </p>

            {tip && (
              <div className="text-xs sm:text-sm text-slate-600 bg-[#62C9F5]/10 border border-[#62C9F5]/30 rounded-xl px-3 py-2 flex items-center gap-2">
                <span className="font-bold text-[#252735]">💡 Подсказка Пикса:</span>
                <span>{tip}</span>
              </div>
            )}
          </div>
        </div>

        {/* Mascot Hint with upward curved arrow directly below the chat bubble */}
        {showHint && (
          <div className="flex items-center gap-2 px-1 select-none pointer-events-none animate-pix-bob">
            {/* Playful curved arrow swooping up and left towards Pix */}
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8 text-[#166534] shrink-0 drop-shadow-xs"
              viewBox="0 0 36 32"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 32 26 C 20 26, 10 18, 6 8"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 1 16 L 6 7 L 14 11"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Dark green text, formatted naturally (not as a button), aligned below chat bubble */}
            <span className="font-display font-black text-xs sm:text-sm text-[#166534] tracking-wide leading-tight drop-shadow-xs">
              Нажми на Пикса, чтобы услышать совет!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
