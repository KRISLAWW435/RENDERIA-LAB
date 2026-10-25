import React, { useState } from 'react';
import { CharacterData } from '../types/avatar';
import { buildLiveUserPrompt, resolvePaletteColors, VISUAL_STYLES } from '../data/labData';
import { Sparkles, Copy, Check, ChevronDown, ChevronUp, Terminal } from 'lucide-react';
import { playClickSound, playSuccessSound } from '../services/soundEffects';

interface LivePromptBannerProps {
  character: CharacterData;
  compact?: boolean;
}

export const LivePromptBanner: React.FC<LivePromptBannerProps> = ({
  character,
  compact = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!compact);

  const promptText = buildLiveUserPrompt(character);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(promptText);
      playSuccessSound();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard fail
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-[#252735] to-slate-900 text-white border-2 border-[#252735] rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-[0_4px_0_#252735] transition-all">
      {/* Header bar */}
      <div
        onClick={() => {
          playClickSound();
          setIsExpanded(!isExpanded);
        }}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#B9F24D] text-[#252735] flex items-center justify-center font-black">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-xs sm:text-sm tracking-wide text-white">
                Мой промпт для нейросети
              </span>
              <span className="hidden sm:inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#B9F24D] text-[#252735]">
                Живое обновление
              </span>
            </div>
            <p className="text-[11px] text-slate-300 hidden sm:block">
              Каждый твой клик моментально дописывает техническую инструкцию для ИИ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-bold text-xs transition-colors border border-white/15 cursor-pointer"
            title="Скопировать промпт"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#B9F24D]" />
                <span className="text-[#B9F24D]">Скопировано</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Копировать</span>
              </>
            )}
          </button>

          <button
            type="button"
            className="p-1.5 rounded-xl text-slate-400 hover:text-white transition-colors"
            aria-label={isExpanded ? 'Свернуть' : 'Развернуть'}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Prompt Content */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-slate-700/80 space-y-2.5 animate-dressup-pop">
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 font-mono text-xs sm:text-[13px] leading-relaxed text-[#B9F24D]">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-sans font-bold uppercase tracking-wider mb-1">
              <Terminal className="w-3 h-3 text-[#62C9F5]" />
              <span>Формула 3D-промпта:</span>
            </div>
            <p className="text-white/95 leading-relaxed selection:bg-[#B9F24D] selection:text-[#252735]">
              «{promptText}»
            </p>
          </div>

          {/* Micro badges showing active elements: Роль, Сила, Костюм, Аксессуар, Цвета, Характер, Поза */}
          <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
            <span className="px-2 py-0.5 rounded-lg bg-sky-950/80 text-sky-300 border border-sky-800/60">
              Роль: {character.role === 'custom' && character.customRoleTitle ? character.customRoleTitle : character.name || 'Герой'}
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-amber-950/80 text-amber-300 border border-amber-800/60">
              Сила: {character.power || 'Стихия'}
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-lime-950/80 text-[#B9F24D] border border-lime-800/60">
              Костюм: {character.appearance.outfit.name}
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-purple-950/80 text-purple-300 border border-purple-800/60">
              Аксессуар: {character.appearance.accessory.name}
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-teal-950/80 text-teal-300 border border-teal-800/60">
              Цвета: {resolvePaletteColors(character.appearance.colorPalette)}
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-pink-950/80 text-pink-300 border border-pink-800/60">
              Характер: {character.appearance.expression.name}
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-indigo-950/80 text-indigo-300 border border-indigo-800/60">
              Поза: {character.appearance.pose?.name || 'Стоит ровно (T-поза)'}
            </span>
            {character.hasLearnedStyle && (
              <span className="px-2 py-0.5 rounded-lg bg-emerald-950/80 text-[#B9F24D] border border-emerald-800/60">
                Стиль: {VISUAL_STYLES.find((s) => s.id === character.style)?.name || 'стиль Roblox'}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
