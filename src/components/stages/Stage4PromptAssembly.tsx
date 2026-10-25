import React, { useState, useEffect } from 'react';
import { CharacterData, VisualStyleId } from '../../types/avatar';
import { VISUAL_STYLES, buildSynthesizedPrompt } from '../../data/labData';
import { MascotPixel } from '../MascotPixel';
import { playClickSound, playSuccessSound, playSelectSound } from '../../services/soundEffects';
import { ArrowRight, ArrowLeft, Copy, Check, RotateCcw, Languages, Sparkles } from 'lucide-react';

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
  const [selectedStyle, setSelectedStyle] = useState<VisualStyleId>(character.style || 'roblox_3d');

  // Compute synthesized prompts
  const synthesized = buildSynthesizedPrompt(
    character.name,
    character.role,
    character.power,
    selectedStyle,
    character.appearance,
    character.customRoleTitle
  );

  const [promptTextRu, setPromptTextRu] = useState(
    character.customPromptRu || synthesized.ru
  );
  const [promptTextEn, setPromptTextEn] = useState(
    character.customPromptEn || synthesized.en
  );

  const isCustomized = character.isPromptCustomized;

  const currentDisplayPrompt = lang === 'ru' ? promptTextRu : promptTextEn;

  const handleStyleChange = (styleId: VisualStyleId) => {
    setSelectedStyle(styleId);
    playSelectSound();
    const newSynth = buildSynthesizedPrompt(
      character.name,
      character.role,
      character.power,
      styleId,
      character.appearance,
      character.customRoleTitle
    );
    setPromptTextRu(newSynth.ru);
    setPromptTextEn(newSynth.en);
    onUpdate({
      style: styleId,
      customPromptRu: newSynth.ru,
      customPromptEn: newSynth.en,
    });
  };

  const handleTextChange = (newVal: string) => {
    if (lang === 'ru') {
      setPromptTextRu(newVal);
      onUpdate({ customPromptRu: newVal, isPromptCustomized: true });
    } else {
      setPromptTextEn(newVal);
      onUpdate({ customPromptEn: newVal, isPromptCustomized: true });
    }
  };

  const handleResetToAuto = () => {
    playClickSound();
    const newSynth = buildSynthesizedPrompt(
      character.name,
      character.role,
      character.power,
      selectedStyle,
      character.appearance,
      character.customRoleTitle
    );
    setPromptTextRu(newSynth.ru);
    setPromptTextEn(newSynth.en);
    onUpdate({
      customPromptRu: newSynth.ru,
      customPromptEn: newSynth.en,
      isPromptCustomized: false,
    });
  };

  const handleCopy = async () => {
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
      style: selectedStyle,
      customPromptRu: promptTextRu,
      customPromptEn: promptTextEn,
    });
    onNext();
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Mascot Guidance */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs">
        <MascotPixel
          mood="celebrate"
          speechText="Этап 4: Мы собрали настоящее техническое задание! Все твои выборы объединены в цельный промпт. Скопируй его и подготовься к запуску генератора!"
          tip="Генераторы вроде DALL-E и Midjourney лучше всего понимают английский текст, поэтому мы подготовили оба варианта!"
        />
      </div>

      {/* Visual Style Selector */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-black text-lg text-[#252735]">
            Выбери финальный стиль рендера
          </h3>
          <span className="text-xs font-bold text-slate-500">
            Определяет фактуру и материалы
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {VISUAL_STYLES.map((st) => {
            const isSelected = selectedStyle === st.id;
            return (
              <div
                key={st.id}
                onClick={() => handleStyleChange(st.id)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#252735] bg-[#B9F24D]/20 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-black text-sm text-[#252735] first-letter:uppercase">
                      {st.name}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#B9F24D] border border-[#252735] flex items-center justify-center text-[#252735]">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {st.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
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
            className="w-full bg-slate-900/90 text-slate-100 font-mono text-xs sm:text-sm p-4 rounded-2xl border border-slate-700 focus:border-[#B9F24D] focus:outline-none leading-relaxed resize-y"
            placeholder="Текст промпта..."
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
              Стиль выбран
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
