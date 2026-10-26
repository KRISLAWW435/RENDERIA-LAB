import React, { useState, useEffect } from 'react';
import { CharacterData } from '../../types/avatar';
import { buildSynthesizedPrompt, sanitizePromptRu } from '../../data/labData';
import { MascotPixel } from '../MascotPixel';
import { playClickSound, playSuccessSound } from '../../services/soundEffects';
import { ArrowRight, ArrowLeft, Copy, Check, RotateCcw, Sparkles } from 'lucide-react';

interface Stage4PromptAssemblyProps {
  character: CharacterData;
  onUpdate: (data: Partial<CharacterData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Stage4PromptAssembly: React.FC<Stage4PromptAssemblyProps> = ({
  character,
  onUpdate,
  onNext,
  onPrev,
}) => {
  const [lang, setLang] = useState<'ru' | 'en'>('ru');
  const [copied, setCopied] = useState(false);

  // Compute synthesized prompts (hardcoded to Roblox 3D style)
  const synthesized = buildSynthesizedPrompt(
    character.name,
    character.role,
    'roblox_3d',
    character.appearance,
    character.customRoleTitle
  );

  const [promptTextRu, setPromptTextRu] = useState<string>(() => {
    if (character.isPromptCustomized && character.customPromptRu) {
      return sanitizePromptRu(character.customPromptRu);
    }
    return sanitizePromptRu(synthesized.ru);
  });

  const [promptTextEn, setPromptTextEn] = useState<string>(
    character.customPromptEn || synthesized.en
  );

  const isCustomized = character.isPromptCustomized;
  const hasBasicSelections = Boolean(character.role);

  useEffect(() => {
    if (!character.isPromptCustomized) {
      const synth = buildSynthesizedPrompt(
        character.name,
        character.role,
        'roblox_3d',
        character.appearance,
        character.customRoleTitle
      );
      setPromptTextRu(sanitizePromptRu(synth.ru));
      setPromptTextEn(synth.en);
    } else if (character.customPromptRu) {
      const cleaned = sanitizePromptRu(character.customPromptRu);
      if (cleaned !== promptTextRu) {
        setPromptTextRu(cleaned);
      }
    }
  }, [character]);

  const currentDisplayPrompt = lang === 'ru' ? promptTextRu : promptTextEn;

  const handleTextChange = (newVal: string) => {
    if (lang === 'ru') {
      const sanitized = sanitizePromptRu(newVal);
      setPromptTextRu(sanitized);
      onUpdate({ customPromptRu: sanitized, isPromptCustomized: true, style: 'roblox_3d' });
    } else {
      setPromptTextEn(newVal);
      onUpdate({ customPromptEn: newVal, isPromptCustomized: true, style: 'roblox_3d' });
    }
  };

  const handleResetToAuto = () => {
    playClickSound();
    const newSynth = buildSynthesizedPrompt(
      character.name,
      character.role,
      'roblox_3d',
      character.appearance,
      character.customRoleTitle
    );
    const cleanedRu = sanitizePromptRu(newSynth.ru);
    setPromptTextRu(cleanedRu);
    setPromptTextEn(newSynth.en);
    onUpdate({
      style: 'roblox_3d',
      customPromptRu: cleanedRu,
      customPromptEn: newSynth.en,
      isPromptCustomized: false,
    });
  };

  const handleCopy = async () => {
    if (!currentDisplayPrompt) return;
    playSuccessSound();
    try {
      await navigator.clipboard.writeText(currentDisplayPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for non-secure contexts
      const textArea = document.createElement('textarea');
      textArea.value = currentDisplayPrompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleContinue = () => {
    playSuccessSound();
    onUpdate({
      style: 'roblox_3d',
      customPromptRu: sanitizePromptRu(promptTextRu),
      customPromptEn: promptTextEn,
    });
    onNext();
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Mascot Guidance with no click interaction, no green arrow hint, and updated educational tip */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs">
        <MascotPixel
          mood="celebrate"
          speechText="Этап 4: Мы собрали настоящее техническое задание! Все твои выборы объединены в цельный промпт. Скопируй его и подготовься к запуску генератора!"
          tip="Большая часть нейросетей лучше всего понимают английский текст, поэтому мы подготовили оба варианта!"
          showHint={false}
          interactive={false}
        />
      </div>

      {/* Prompt Laboratory Terminal */}
      <div className="bg-[#252735] text-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_0_#181922] space-y-4">
        {/* Terminal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-[#B9F24D]" />
            </div>
            <span className="font-mono text-xs sm:text-sm font-bold text-slate-300">
              RENDERIA_PROMPT_TERMINAL.ai
              {character.name?.trim() ? ` [Мой проект: ${character.name.trim()}]` : ''}
            </span>
          </div>

          {/* Controls: Language toggle & Reset button */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-800 rounded-xl p-1 border border-slate-700">
              <button
                onClick={() => {
                  playClickSound();
                  setLang('ru');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  lang === 'ru'
                    ? 'bg-[#B9F24D] text-[#252735]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Русский
              </button>
              <button
                onClick={() => {
                  playClickSound();
                  setLang('en');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  lang === 'en'
                    ? 'bg-[#B9F24D] text-[#252735]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                English (для ИИ)
              </button>
            </div>

            {/* Reset to auto if modified */}
            {isCustomized && (
              <button
                onClick={handleResetToAuto}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1 transition-colors border border-slate-700 cursor-pointer"
                title="Сбросить к исходному авто-промпту"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Сбросить</span>
              </button>
            )}
          </div>
        </div>

        {/* Editable Prompt Area */}
        <div className="relative">
          <textarea
            value={currentDisplayPrompt}
            onChange={(e) => handleTextChange(e.target.value)}
            rows={7}
            className="w-full bg-slate-900/90 text-slate-100 font-mono text-xs sm:text-sm p-4 rounded-2xl border border-slate-700 focus:border-[#B9F24D] focus:outline-none leading-relaxed resize-y placeholder:text-slate-500 placeholder:italic placeholder:font-sans"
            placeholder="Твой промпт будет собираться здесь по мере того, как ты выбираешь детали для героя..."
          />
        </div>

        {/* Copy CTA & Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-400">
            {lang === 'en' ? (
              <span>⚡️ Английский промпт даёт самый точный результат в DALL-E, Recraft и Midjourney</span>
            ) : (
              <span>📖 Русский промпт поможет тебе и родителям полностью понять каждую деталь</span>
            )}
          </div>

          {hasBasicSelections && currentDisplayPrompt.trim().length > 0 ? (
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-display font-black text-sm cursor-pointer transition-all ${
                copied
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'btn-3d-lime border border-[#B9F24D]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Скопировано в буфер!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Скопировать промпт</span>
                </>
              )}
            </button>
          ) : (
            <span className="text-xs font-bold text-amber-400/90 bg-amber-400/10 px-3 py-1.5 rounded-xl border border-amber-400/20">
              💡 Выбери класс героя на Этапе 1, чтобы скопировать промпт
            </span>
          )}
        </div>
      </div>

      {/* Readiness Check Block (Cards & Chips, NO bullet lists!) */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">
        <h3 className="font-display font-black text-base text-[#252735] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#B9F24D]" />
          <span>Проверка готовности технического задания</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
              ✓
            </span>
            <span className="text-xs font-bold text-emerald-900">
              Герой описан
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
              ✓
            </span>
            <span className="text-xs font-bold text-emerald-900">
              Детали указаны
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
              ✓
            </span>
            <span className="text-xs font-bold text-emerald-900">
              Стиль: Roblox
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
              ✓
            </span>
            <span className="text-xs font-bold text-emerald-900">
              Требования к 3D
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => {
            playClickSound();
            onPrev();
          }}
          className="btn-3d-white flex items-center gap-2 px-6 py-3.5 rounded-2xl font-display font-black text-base cursor-pointer border-2 border-slate-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Назад: Тренировка</span>
        </button>

        <button
          onClick={handleContinue}
          className="btn-3d-lime flex items-center gap-2.5 px-8 py-4 rounded-2xl font-display font-black text-lg cursor-pointer border-2 border-[#252735]"
        >
          <span>Дальше: Создать картинку</span>
          <ArrowRight className="w-5 h-5 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
