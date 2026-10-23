import React, { useState } from 'react';
import pixelMascotImg from '../assets/pix/pixel1.webp';
import { playClickSound } from '../services/soundEffects';

export type PixelMood = 'happy' | 'thinking' | 'celebrate';

interface MascotPixelProps {
  mood?: PixelMood;
  speechText: string;
  tip?: string;
  className?: string;
}

export const MascotPixel: React.FC<MascotPixelProps> = ({
  mood = 'happy',
  speechText,
  tip,
  className = '',
}) => {
  const [clickCount, setClickCount] = useState(0);

  const getImageSrc = () => {
    return pixelMascotImg;
  };

  const funEasterEggs = [
    'Бип-боп! Я готов проектировать крутого 3D-героя!',
    'Знаешь ли ты? Нейросеть рисует лучше всего, когда ты называешь конкретные цвета и вещи!',
    'В 3D-моделях важен чистый силуэт — тогда персонаж не теряет детали в игре!',
    'Отличный выбор! Твой герой уже выглядит эпично!',
    'Я заряжаюсь от твоих творческих идей! ⚡️',
  ];

  const handlePixelClick = () => {
    playClickSound();
    setClickCount((prev) => (prev + 1) % funEasterEggs.length);
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 ${className}`}>
      {/* Clean Mascot Image (NO white box, NO upload button, transparent WebP with soft drop-shadow) */}
      <div className="flex flex-col items-center shrink-0">
        <div
          onClick={handlePixelClick}
          className="relative cursor-pointer transition-transform hover:scale-105 active:scale-95 group"
          title="Нажми на Пикса, чтобы услышать совет!"
        >
          {/* Subtle glowing aura */}
          <div className="absolute inset-0 -m-2.5 rounded-full bg-gradient-to-tr from-[#B9F24D]/35 to-[#62C9F5]/35 blur-xl opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Clean transparent container with soft natural drop shadow */}
          <div className="relative w-32 h-32 sm:w-44 sm:h-44 flex items-center justify-center select-none">
            <img
              src={getImageSrc()}
              alt="Пикс"
              className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(37,39,53,0.2)] drop-shadow-[0_4px_14px_rgba(98,201,245,0.35)] transition-transform duration-300 group-hover:rotate-1"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Mascot Name and Label (No robot emoji) */}
        <div className="text-center mt-2 space-y-0.5">
          <div className="font-display font-black text-base sm:text-lg text-[#252735] tracking-wide flex items-center justify-center">
            <span>Пикс</span>
          </div>
          <div className="text-[11px] font-bold text-slate-500 bg-white/90 px-2.5 py-0.5 rounded-full border border-slate-200 shadow-2xs whitespace-nowrap">
            Помощник в мире дизайна
          </div>
        </div>
      </div>

      {/* Speech Bubble directly next to mascot */}
      <div className="relative flex-1 bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-center min-h-[105px]">
        <div className="space-y-3">
          <p className="text-[#252735] text-base sm:text-lg font-bold leading-relaxed font-sans">
            {clickCount > 0 ? funEasterEggs[clickCount] : speechText}
          </p>

          {tip && (
            <div className="text-xs sm:text-sm text-slate-600 bg-[#62C9F5]/10 border border-[#62C9F5]/30 rounded-xl px-3 py-2 flex items-center gap-2">
              <span className="font-bold text-[#252735]">💡 Подсказка Пикса:</span>
              <span>{tip}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
