import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, RotateCcw, Maximize, Minimize } from 'lucide-react';
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
  const [isFullscreen, setIsFullscreen] = useState<boolean>(() => {
    return typeof document !== 'undefined' && Boolean(document.fullscreenElement);
  });

  useEffect(() => {
    const unsubscribe = subscribeSoundState((muted, playing) => {
      setIsMuted(muted);
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const handleToggleSound = () => {
    playClickSound();
    toggleMusic();
  };

  const handleToggleFullscreen = async () => {
    playClickSound();
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        } else if ((document.documentElement as any).webkitRequestFullscreen) {
          await (document.documentElement as any).webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen request failed:', err);
    }
  };

  const handleLogoClick = () => {
    playClickSound();
    onGoHome();
  };

  const [showResetModal, setShowResetModal] = useState(false);

  const handleOpenResetModal = () => {
    playClickSound();
    setShowResetModal(true);
  };

  const handleConfirmReset = () => {
    playClickSound();
    setShowResetModal(false);
    onReset();
  };

  return (
    <>
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

            {/* Fullscreen Toggle */}
            <button
              onClick={handleToggleFullscreen}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border cursor-pointer ${
                isFullscreen
                  ? 'bg-[#B9F24D]/25 hover:bg-[#B9F24D]/40 text-[#252735] border-[#252735]'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
              }`}
              title={isFullscreen ? 'Выйти из полноэкранного режима' : 'На весь экран'}
              aria-label={isFullscreen ? 'Выйти из полноэкранного режима' : 'На весь экран'}
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4 text-[#252735]" />
              ) : (
                <Maximize className="w-4 h-4 text-[#252735]" />
              )}
            </button>

            {/* Reset progress button */}
            <button
              type="button"
              onClick={handleOpenResetModal}
              className="h-9 px-2.5 sm:px-3 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 text-slate-600 flex items-center justify-center gap-1.5 transition-all border border-slate-200 cursor-pointer active:scale-95"
              title="Начать сначала (Сбросить прогресс)"
              aria-label="Сбросить прогресс"
            >
              <RotateCcw className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden md:inline text-xs font-bold">Сброс</span>
            </button>
          </div>
        </div>
      </header>

      {/* Custom Reset Confirmation Modal (works inside iframes where window.confirm is blocked) */}
      {showResetModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#252735]/60 backdrop-blur-xs animate-fadeIn"
          onClick={() => setShowResetModal(false)}
        >
          <div
            className="bg-white border-3 border-[#252735] rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-[0_8px_0_#252735] space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 border-2 border-[#252735] flex items-center justify-center text-rose-600 shrink-0 shadow-[0_3px_0_#252735]">
                <RotateCcw className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-display font-black text-lg sm:text-xl text-[#252735]">
                  Сбросить весь прогресс?
                </h3>
                <p className="text-xs font-bold text-slate-500">
                  Начать создание героя с чистого листа
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 font-medium leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              Все выбранные детали персонажа, имя, собранный промпт и заработанные очки <strong className="text-[#252735]">XP</strong> будут полностью очищены.
            </p>

            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setShowResetModal(false);
                }}
                className="btn-3d-white px-5 py-2.5 rounded-xl font-display font-black text-sm border-2 border-slate-300 cursor-pointer"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="btn-3d-pink px-5 py-2.5 rounded-xl font-display font-black text-sm border-2 border-[#252735] cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4 stroke-[2.5]" />
                <span>Да, сбросить</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
