import React, { useState } from 'react';
import { CharacterData } from '../../types/avatar';
import { EXTERNAL_IMAGE_GENERATORS, buildSynthesizedPrompt, sanitizePromptRu } from '../../data/labData';
import { MascotPixel } from '../MascotPixel';
import { playClickSound, playSuccessSound, playSelectSound } from '../../services/soundEffects';
import {
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Check,
  Copy,
  CheckCheck,
  Globe,
  Sparkles,
  ClipboardPaste,
  Wand2,
  Download,
} from 'lucide-react';

interface Stage5GenerateImageProps {
  character: CharacterData;
  onUpdate: (data: Partial<CharacterData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Stage5GenerateImage: React.FC<Stage5GenerateImageProps> = ({
  character,
  onNext,
  onPrev,
}) => {
  // Google Flow is selected by default
  const [selectedId, setSelectedId] = useState<string>('google_flow');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Retrieve current synthesized or customized Russian prompt
  const synthesized = buildSynthesizedPrompt(
    character.name,
    character.role,
    'roblox_3d',
    character.appearance,
    character.customRoleTitle
  );
  const promptRu = character.isPromptCustomized && character.customPromptRu
    ? sanitizePromptRu(character.customPromptRu)
    : sanitizePromptRu(synthesized.ru);

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(promptRu);
      playSuccessSound();
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2500);
    } catch {
      // Fallback
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2500);
    }
  };

  const handleCardClick = (id: string) => {
    playSelectSound();
    setSelectedId(id);
  };

  const handleContinue = () => {
    playSuccessSound();
    onNext();
  };

  const selectedGenerator =
    EXTERNAL_IMAGE_GENERATORS.find((g) => g.id === selectedId) ||
    EXTERNAL_IMAGE_GENERATORS[0];

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Mascot Guidance */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs">
        <MascotPixel
          mood="happy"
          speechText="Этап 5: Создание изображения! Выбери удобный генератор нейросети, вставь свой промпт и получи оригинальный концепт-арт."
          tip="Выбери удобный генератор, вставь скопированный промпт и нажми «Создать». Когда картинка будет готова — скачай её и возвращайся на сайт."
        />
      </div>

      {/* AI Generator Cards */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Выбор нейросети
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-display text-[#252735]">
              Где сгенерировать персонажа?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Нажми на карточку, чтобы выбрать генератор и перейти к созданию арта:
            </p>
          </div>

          {/* Quick open active button */}
          <a
            href={selectedGenerator.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClickSound()}
            className="btn-3d-lime inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-display font-black text-sm border-2 border-[#252735] shrink-0"
          >
            <span>Открыть {selectedGenerator.name.split(' ')[0]}</span>
            <ExternalLink className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>

        {/* 4 Generator Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXTERNAL_IMAGE_GENERATORS.map((gen) => {
            const isSelected = selectedId === gen.id;
            return (
              <div
                key={gen.id}
                onClick={() => handleCardClick(gen.id)}
                className={`relative group p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                  isSelected
                    ? 'border-[#252735] bg-[#F8FAFD] shadow-[0_6px_0_#252735]'
                    : 'border-slate-200 bg-white hover:border-slate-400 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-display font-black text-base sm:text-lg text-[#252735]">
                        {gen.name}
                      </span>
                      {gen.isRecommended && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider bg-[#B9F24D] text-[#252735] px-2.5 py-0.5 rounded-full border border-[#252735]">
                          <Sparkles className="w-3 h-3" />
                          Рекомендуем
                        </span>
                      )}
                    </div>

                    {/* Selection Indicator Checkmark */}
                    <div
                      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'bg-[#B9F24D] border-[#252735] text-[#252735]'
                          : 'border-slate-300 bg-slate-50 text-transparent group-hover:border-slate-400'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {gen.description}
                  </p>
                </div>

                {/* Card footer: open link */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500">
                    {isSelected ? '✓ Выбранный генератор' : 'Нажми для выбора'}
                  </span>
                  <a
                    href={gen.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      playClickSound();
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-black text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-xl border border-sky-200 transition-colors"
                  >
                    <span>Перейти на сайт</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step-by-Step Instructions Block */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Инструкция
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-display text-[#252735]">
            Пошаговый план генерации
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Следуй простым шагам, чтобы создать изображение персонажа:
          </p>
        </div>

        {/* 5 Visual Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-col justify-between gap-3">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-[#B9F24D] border border-[#252735] flex items-center justify-center font-display font-black text-sm text-[#252735]">
                1
              </div>
              <h3 className="font-display font-black text-sm text-[#252735]">
                Скопируй промпт
              </h3>
              <p className="text-xs text-slate-500 leading-snug">
                (на Этапе 4)
              </p>
            </div>
            <button
              onClick={handleCopyPrompt}
              className={`w-full py-1.5 px-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                copiedPrompt
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-white hover:bg-slate-100 text-[#252735] border-slate-300'
              }`}
            >
              {copiedPrompt ? (
                <>
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Скопировано!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-600" />
                  <span>Скопировать</span>
                </>
              )}
            </button>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-col justify-between gap-3">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-[#62C9F5] border border-[#252735] flex items-center justify-center font-display font-black text-sm text-[#252735]">
                2
              </div>
              <h3 className="font-display font-black text-sm text-[#252735]">
                Открой выбранный генератор
              </h3>
              <p className="text-xs text-slate-500 leading-snug">
                (нажми на карточку)
              </p>
            </div>
            <div className="text-[11px] font-bold text-slate-400 bg-white/70 py-1 px-2 rounded-lg border border-slate-200 text-center">
              🌐 В новой вкладке
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-col justify-between gap-3">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-[#BDA7FF] border border-[#252735] flex items-center justify-center font-display font-black text-sm text-[#252735]">
                3
              </div>
              <h3 className="font-display font-black text-sm text-[#252735]">
                Вставь промпт в поле ввода
              </h3>
              <p className="text-xs text-slate-500 leading-snug">
                (внутри нейросети)
              </p>
            </div>
            <div className="text-[11px] font-bold text-slate-400 bg-white/70 py-1 px-2 rounded-lg border border-slate-200 text-center">
              ⌨️ Ctrl + V / ⌘ + V
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-col justify-between gap-3">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-[#FFB9D5] border border-[#252735] flex items-center justify-center font-display font-black text-sm text-[#252735]">
                4
              </div>
              <h3 className="font-display font-black text-sm text-[#252735]">
                Нажми кнопку «Создать»
              </h3>
              <p className="text-xs text-slate-500 leading-snug">
                (или «Generate»)
              </p>
            </div>
            <div className="text-[11px] font-bold text-slate-400 bg-white/70 py-1 px-2 rounded-lg border border-slate-200 text-center">
              ⚡️ Генерация 10-30 сек
            </div>
          </div>

          {/* Step 5 */}
          <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-col justify-between gap-3">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-[#B9F24D] border border-[#252735] flex items-center justify-center font-display font-black text-sm text-[#252735]">
                5
              </div>
              <h3 className="font-display font-black text-sm text-[#252735]">
                Скачай готовую картинку
              </h3>
              <p className="text-xs text-slate-500 leading-snug">
                (она понадобится на следующем шаге)
              </p>
            </div>
            <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 py-1 px-2 rounded-lg border border-emerald-200 text-center">
              💾 Сохрани на ПК
            </div>
          </div>
        </div>

        {/* Live Prompt snippet box so children don't even need to switch tabs to read it */}
        <div className="p-4 rounded-2xl bg-[#62C9F5]/10 border border-[#62C9F5]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
              Твой готовый промпт:
            </span>
            <p className="text-xs text-[#252735] font-medium line-clamp-2 max-w-2xl">
              {promptRu}
            </p>
          </div>
          <button
            onClick={handleCopyPrompt}
            className="btn-3d-white shrink-0 px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 flex items-center gap-1.5 cursor-pointer"
          >
            {copiedPrompt ? (
              <>
                <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Скопировано!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Скопировать промпт</span>
              </>
            )}
          </button>
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
          <span>Назад: Техзадание</span>
        </button>

        <button
          onClick={handleContinue}
          className="btn-3d-lime flex items-center gap-2.5 px-8 py-4 rounded-2xl font-display font-black text-lg border-2 border-[#252735] cursor-pointer"
        >
          <span>Дальше: Проверить героя для 3D</span>
          <ArrowRight className="w-5 h-5 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
