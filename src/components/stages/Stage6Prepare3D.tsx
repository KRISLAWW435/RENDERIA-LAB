import React, { useState } from 'react';
import { CharacterData } from '../../types/avatar';
import { EXTERNAL_3D_GENERATORS } from '../../data/labData';
import { MascotPixel } from '../MascotPixel';
import { playClickSound, playSelectSound, playSuccessSound, playBadgeSound } from '../../services/soundEffects';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  ExternalLink,
  Upload,
  Sparkles,
  Trash2,
} from 'lucide-react';

interface Stage6Prepare3DProps {
  character: CharacterData;
  onUpdate: (data: Partial<CharacterData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Stage6Prepare3D: React.FC<Stage6Prepare3DProps> = ({
  character,
  onUpdate,
  onNext,
  onPrev,
}) => {
  const [checks, setChecks] = useState(
    character.threeDChecks || {
      fullBody: true,
      singleHero: true,
      clearBackground: true,
      sharpDetails: true,
    }
  );

  const uploadedImage =
    character.uploaded3DImage || character.threeDResultUrl || character.generatedImageUrl;

  const toggleCheck = (key: keyof typeof checks) => {
    playSelectSound();
    const updated = { ...checks, [key]: !checks[key] };
    setChecks(updated);
    onUpdate({ threeDChecks: updated });
  };

  const allPassed =
    checks.fullBody && checks.singleHero && checks.clearBackground && checks.sharpDetails;
  const hasUploadedImage = Boolean(uploadedImage);
  const canFinish = hasUploadedImage && allPassed;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      playBadgeSound();
      const reader = new FileReader();
      reader.onload = () => {
        const res = reader.result as string;
        onUpdate({
          uploaded3DImage: res,
          threeDResultUrl: res,
          generatedImageUrl: res,
          generatedImageSource: 'uploaded',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    playClickSound();
    onUpdate({
      uploaded3DImage: undefined,
      threeDResultUrl: undefined,
      generatedImageUrl: undefined,
      generatedImageSource: null,
    });
  };

  const handleFinish = () => {
    if (!canFinish) return;
    playSuccessSound();
    onNext();
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Mascot Guidance */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs">
        <MascotPixel
          mood={canFinish ? 'celebrate' : allPassed ? 'happy' : 'thinking'}
          speechText="Этап 6: Мост в 3D! Картинка — это плоский рисунок из пикселей, а 3D-модель состоит из полигонов, её можно поворачивать на 360° и использовать в 3D-дизайне!"
          tip="Загрузи сюда готовый скриншот своего героя или 3D-модели — он появится на твоём официальном сертификате!"
        />
      </div>

      {/* Main Stage 6 Block: Single Upload Area + 3D Readiness Checklist */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Проверка результата
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-display text-[#252735]">
            Подготовка концепта к объёмному миру
          </h2>
        </div>

        {/* Single Upload Zone (Left) & 3D Readiness Checklist (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Side: Single Main Container for Uploaded Image */}
          <div className="flex flex-col gap-3">
            {uploadedImage ? (
              <div className="flex flex-col gap-2.5">
                <div className="relative rounded-2xl overflow-hidden border-3 border-[#252735] shadow-[0_6px_0_#252735] bg-slate-50 aspect-square flex items-center justify-center">
                  <img
                    src={uploadedImage}
                    alt="Загруженный герой"
                    className="w-full h-full object-contain transition-all duration-300"
                    style={{ objectFit: 'contain' }}
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute top-3 left-3 bg-[#252735]/85 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#B9F24D]" />
                    <span>Готово для сертификата</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label className="btn-3d-white flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold border-2 border-slate-300 hover:border-[#252735] cursor-pointer transition-colors shadow-2xs">
                    <Upload className="w-4 h-4 text-[#252735]" />
                    <span>Заменить фото</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-2.5 rounded-xl border-2 border-slate-200 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 text-slate-500 cursor-pointer transition-colors"
                    title="Удалить фото"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <label className="relative rounded-3xl border-3 border-dashed border-slate-300 hover:border-[#252735] hover:bg-slate-100/70 bg-slate-50 aspect-square flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all group shadow-xs">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-300 group-hover:border-[#252735] group-hover:scale-105 flex items-center justify-center mb-3 shadow-xs transition-all">
                  <Upload className="w-8 h-8 text-slate-500 group-hover:text-[#252735] transition-colors" />
                </div>
                <span className="font-display font-black text-base sm:text-lg text-[#252735] mb-1">
                  Загрузите сюда вашу 3D-модель или скриншот
                </span>
                <p className="text-xs text-slate-500 max-w-xs mb-3">
                  Прикрепи готовую картинку героя или скриншот из Tripo3D / Meshy (PNG, JPG)
                </p>
                <span className="btn-3d-lime px-4 py-2 rounded-xl text-xs font-display font-black border border-[#252735]">
                  Выбрать файл с ПК
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Right Side: 3D Model Readiness Check Cards */}
          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="font-display font-black text-lg text-[#252735]">
                Чек-лист готовности к 3D
              </h3>
              <p className="text-xs text-slate-600">
                Нажимай на карточки, чтобы подтвердить соответствие:
              </p>
            </div>

            {/* Card 1: Full body */}
            <div
              onClick={() => toggleCheck('fullBody')}
              className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                checks.fullBody
                  ? 'border-emerald-500 bg-emerald-50/70'
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="space-y-0.5">
                <span className="font-bold text-sm text-[#252735] block">
                  1. Персонаж виден в полный рост
                </span>
                <span className="text-xs text-slate-500">
                  Видны голова, туловище, руки и ноги без обрезки краями
                </span>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  checks.fullBody
                    ? 'bg-emerald-500 border-emerald-600 text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {checks.fullBody && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            </div>

            {/* Card 2: Single hero */}
            <div
              onClick={() => toggleCheck('singleHero')}
              className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                checks.singleHero
                  ? 'border-emerald-500 bg-emerald-50/70'
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="space-y-0.5">
                <span className="font-bold text-sm text-[#252735] block">
                  2. Один главный герой в кадре
                </span>
                <span className="text-xs text-slate-500">
                  В центре только один персонаж, без лишних фигур
                </span>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  checks.singleHero
                    ? 'bg-emerald-500 border-emerald-600 text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {checks.singleHero && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            </div>

            {/* Card 3: Clear background */}
            <div
              onClick={() => toggleCheck('clearBackground')}
              className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                checks.clearBackground
                  ? 'border-emerald-500 bg-emerald-50/70'
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="space-y-0.5">
                <span className="font-bold text-sm text-[#252735] block">
                  3. Чистый однородный фон
                </span>
                <span className="text-xs text-slate-500">
                  Фон отделяется от костюма, нет сложных декораций
                </span>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  checks.clearBackground
                    ? 'bg-emerald-500 border-emerald-600 text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {checks.clearBackground && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            </div>

            {/* Card 4: Sharp details */}
            <div
              onClick={() => toggleCheck('sharpDetails')}
              className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                checks.sharpDetails
                  ? 'border-emerald-500 bg-emerald-50/70'
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="space-y-0.5">
                <span className="font-bold text-sm text-[#252735] block">
                  4. Чёткие и узнаваемые детали
                </span>
                <span className="text-xs text-slate-500">
                  Шлем, аксессуары и форма легко считываются
                </span>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  checks.sharpDetails
                    ? 'bg-emerald-500 border-emerald-600 text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {checks.sharpDetails && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            </div>
          </div>
        </div>

        {/* External 3D Services */}
        <div className="pt-4 border-t border-slate-200 space-y-4">
          <div className="space-y-1">
            <h3 className="font-display font-black text-base text-[#252735]">
              Преобразование в 3D-модель (Сервисы Image-to-3D)
            </h3>
            <p className="text-xs text-slate-600">
              Загрузи полученное изображение в один из специализированных 3D-генераторов:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EXTERNAL_3D_GENERATORS.map((gen) => {
              const isTripo = gen.id === 'tripo3d';
              return (
                <a
                  key={gen.id}
                  href={gen.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClickSound()}
                  className={`relative p-5 rounded-3xl border-2 transition-all flex flex-col justify-between gap-3 group ${
                    isTripo
                      ? 'border-[#B9F24D] bg-[#B9F24D]/10 hover:bg-[#B9F24D]/20 shadow-[0_0_25px_rgba(185,242,77,0.45)] ring-2 ring-[#B9F24D]'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display font-black text-lg text-[#252735]">
                          {gen.name}
                        </span>
                        {isTripo && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider bg-[#B9F24D] text-[#252735] px-2.5 py-0.5 rounded-full border border-[#252735] shadow-xs">
                            <Sparkles className="w-3 h-3 text-[#252735]" />
                            Рекомендуем
                          </span>
                        )}
                      </div>
                      <ExternalLink className={`w-4 h-4 shrink-0 ${isTripo ? 'text-[#252735]' : 'text-slate-400'}`} />
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{gen.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold">
                    <span className={isTripo ? 'text-emerald-800 font-extrabold' : 'text-slate-500'}>
                      {isTripo ? '⚡️ Генерация 3D за 10 секунд' : '3D меши и полигоны'}
                    </span>
                    <span className={`inline-flex items-center gap-1 ${isTripo ? 'text-[#252735] font-black underline' : 'text-sky-600'}`}>
                      Открыть сайт →
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <button
          onClick={() => {
            playClickSound();
            onPrev();
          }}
          className="btn-3d-white w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-display font-black text-base cursor-pointer border-2 border-slate-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Назад: Изображение</span>
        </button>

        <div className="flex flex-col items-center sm:items-end gap-1.5 w-full sm:w-auto">
          <button
            onClick={handleFinish}
            disabled={!canFinish}
            className={`w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-display font-black text-lg border-2 transition-all ${
              canFinish
                ? 'btn-3d-lime border-[#252735] cursor-pointer'
                : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'
            }`}
          >
            <span>Завершить и получить сертификат</span>
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </button>
          {!hasUploadedImage && (
            <span className="text-xs font-bold text-amber-600">
              ⬆️ Загрузи изображение в рамку слева, чтобы получить сертификат
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
