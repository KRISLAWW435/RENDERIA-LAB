import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, HelpCircle, RotateCcw, Download } from 'lucide-react';
import { getMuted, toggleMusic, subscribeSoundState, playClickSound, isMusicPlaying } from '../services/soundEffects';
import { StageId } from '../types/avatar';

interface HeaderProps {
  currentStage: StageId;
  xp: number;
  onReset: () => void;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStage,
  xp,
  onReset,
  onGoHome,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(isMusicPlaying());
  const [isMuted, setIsMuted] = useState<boolean>(getMuted());

  useEffect(() => {
    const unsubscribe = subscribeSoundState((muted, playing) => {
      setIsMuted(muted);
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  const handleToggleSound = () => {
    playClickSound();
    toggleMusic();
  };

  const handleLogoClick = () => {
    playClickSound();
    onGoHome();
  };

  const getStageNumber = (stage: StageId): number => {
    switch (stage) {
      case 'intro':
        return 0;
      case 'stage1_concept':
        return 1;
      case 'stage2_appearance':
        return 2;
      case 'stage3_training':
        return 3;
      case 'stage4_prompt':
        return 4;
      case 'stage5_image':
        return 5;
      case 'stage6_3d':
        return 6;
      case 'victory':
        return 6;
      default:
        return 1;
    }
  };

  const stageNum = getStageNumber(currentStage);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Lockup - Clickable to return to Start/Intro */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-3 cursor-pointer group text-left select-none transition-transform active:scale-95"
          title="Вернуться на главную страницу"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#B9F24D] border-2 border-[#252735] shadow-[0_3px_0_#252735] group-hover:shadow-[0_4px_0_#252735] group-hover:-translate-y-0.5 transition-all flex items-center justify-center font-display font-black text-xl text-[#252735]">
            R
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-[#252735] group-hover:text-emerald-700 transition-colors">
                RENDERIA
              </span>
              <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-[#FFB9D5] text-[#252735] border border-[#252735]/20">
                LAB
              </span>
            </div>
            <p className="text-xs text-slate-500 font-semibold hidden sm:block">
              Аватар-лаборатория
            </p>
          </div>
        </button>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* XP Counter Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#252735] text-white shadow-sm border border-slate-700">
            <Sparkles className="w-4 h-4 text-[#B9F24D] animate-spin-slow" />
            <span className="text-xs sm:text-sm font-black font-display tracking-wide tabular-nums text-[#B9F24D]">
              {xp}
            </span>
            <span className="text-[11px] font-bold text-slate-300">XP</span>
          </div>

          {/* Background Music & Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border cursor-pointer ${
              isPlaying
                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border-emerald-300 shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-500 border-slate-200'
            }`}
            title={isPlaying ? 'Выключить музыку (Пауза)' : 'Включить музыку'}
            aria-label={isPlaying ? 'Выключить музыку' : 'Включить музыку'}
          >
            {isPlaying ? (
              <Volume2 className="w-4 h-4 text-emerald-600 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Reset progress button */}
          <button
            onClick={() => {
              if (window.confirm('Сбросить весь прогресс и начать заново?')) {
                onReset();
              }
            }}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-500 flex items-center justify-center transition-colors border border-slate-200 cursor-pointer"
            title="Начать сначала"
            aria-label="Начать сначала"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
