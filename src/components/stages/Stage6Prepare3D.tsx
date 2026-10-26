import React, { useState } from 'react';
import { CharacterData } from '../../types/avatar';
import { EXTERNAL_3D_GENERATORS } from '../../data/labData';
import { MascotPixel } from '../MascotPixel';
import { playClickSound, playSelectSound, playSuccessSound, playBadgeSound } from '../../services/soundEffects';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Box,
  ExternalLink,
  Upload,
  Sparkles,
  Image as ImageIcon,
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

  const [threeDResultUrl, setThreeDResultUrl] = useState<string | undefined>(
    character.threeDResultUrl
  );
  const [wireframeMode, setWireframeMode] = useState(false);
  const [viewMode, setViewMode] = useState<'3d_model' | '2d_concept'>(() => {
    if (character.threeDResultUrl) return '3d_model';
    if (character.generatedImageUrl) return '2d_concept';
    return '3d_model';
  });

  const toggleCheck = (key: keyof typeof checks) => {
    playSelectSound();
    const updated = { ...checks, [key]: !checks[key] };
    setChecks(updated);
    onUpdate({ threeDChecks: updated });
  };

  const allPassed =
    checks.fullBody && checks.singleHero && checks.clearBackground && checks.sharpDetails;

  const handle2DImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      playBadgeSound();
      const reader = new FileReader();
      reader.onload = () => {
        const res = reader.result as string;
        onUpdate({
          generatedImageUrl: res,
          generatedImageSource: 'uploaded',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThreeDUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      playBadgeSound();
      const reader = new FileReader();
      reader.onload = () => {
        const res = reader.result as string;
        setThreeDResultUrl(res);
        onUpdate({ threeDResultUrl: res });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFinish = () => {
    playSuccessSound();
    onNext();
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Mascot Guidance */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs">
        <MascotPixel
          mood={allPassed ? 'happy' : 'thinking'}
          speechText="Этап 6: Мост в 3D! Картинка — это плоский рисунок из пикселей, а 3D-модель состоит из полигонов, её можно поворачивать на 360° и использовать в 3D-дизайне!"
          tip="Чтобы нейросеть Tripo3D или Meshy правильно построила объёмную модель, картинка должна иметь чистый фон и чёткие границы."
        />
      </div>

      {/* 2D vs 3D Concept Comparison Stage */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Сравнение технологий
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-display text-[#252735]">
              Подготовка концепта к объёмному миру
            </h2>
          </div>

          {/* Wireframe / 3D Grid Simulator Toggle */}
          <button
            onClick={() => {
              playClickSound();
              setWireframeMode(!wireframeMode);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              wireframeMode
                ? 'bg-[#252735] text-[#B9F24D] border-[#252735]'
                : 'bg-slate-100 text-slate-700 border-slate-300'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>{wireframeMode ? 'Режим: 3D-сетка активна' : 'Включить 3D-сетку'}</span>
          </button>
        </div>

        {/* Visual Dual Display: 2D Concept & 3D Simulation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Visual Concept / 3D Viewport with Empty Upload State */}
          <div className="flex flex-col gap-3">
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setViewMode('3d_model');
                }}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  viewMode === '3d_model'
                    ? 'bg-white text-[#252735] shadow-xs font-black'
                    : 'text-slate-500 hover:text-[#252735]'
                }`}
              >
                <Box className="w-3.5 h-3.5 text-indigo-500" />
                <span>3D-модель {threeDResultUrl ? '✓' : ''}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setViewMode('2d_concept');
                }}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  viewMode === '2d_concept'
                    ? 'bg-white text-[#252735] shadow-xs font-black'
                    : 'text-slate-500 hover:text-[#252735]'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5 text-sky-500" />
                <span>2D-концепт {character.generatedImageUrl ? '✓' : ''}</span>
              </button>
            </div>

            {/* Viewport Box */}
            {viewMode === '3d_model' ? (
              threeDResultUrl ? (
                <div className="flex flex-col gap-2">
                  <div className="relative rounded-2xl overflow-hidden border-3 border-[#252735] shadow-[0_6px_0_#252735] bg-slate-50 aspect-square flex items-center justify-center">
                    <img
                      src={threeDResultUrl}
                      alt="3D-модель"
                      className={`w-full h-full object-contain transition-all duration-300 ${
                        wireframeMode ? 'brightness-90 contrast-125' : ''
                      }`}
                      referrerPolicy="no-referrer"
                    />

                    {wireframeMode && (
                      <div
                        className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,#B9F24D_1px,transparent_1px),linear-gradient(to_bottom,#B9F24D_1px,transparent_1px)] bg-[size:24px_24px]"
                      />
                    )}

                    <div className="absolute top-3 left-3 bg-[#252735]/85 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#B9F24D]" />
                      <span>Твоя 3D-модель</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="btn-3d-white flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold border-2 border-slate-300 hover:border-[#252735] cursor-pointer transition-colors shadow-2xs">
                      <Upload className="w-3.5 h-3.5 text-[#252735]" />
                      <span>Заменить 3D-скриншот</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleThreeDUpload}
                        className="hidden"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setThreeDResultUrl(undefined);
                        onUpdate({ threeDResultUrl: undefined });
                      }}
                      className="p-2 rounded-xl border border-slate-200 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-500 cursor-pointer"
                      title="Удалить скриншот"
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
                    Сделай скриншот модели в Tripo3D / Meshy и прикрепи его сюда (PNG, JPG)
                  </p>
                  <span className="btn-3d-lime px-4 py-2 rounded-xl text-xs font-display font-black border border-[#252735]">
                    Выбрать файл с ПК
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThreeDUpload}
                    className="hidden"
                  />
                </label>
              )
            ) : character.generatedImageUrl ? (
              <div className="flex flex-col gap-2">
                <div className="relative rounded-2xl overflow-hidden border-3 border-[#252735] shadow-[0_6px_0_#252735] bg-slate-50 aspect-square flex items-center justify-center">
                  <img
                    src={character.generatedImageUrl}
                    alt="2D концепт"
                    className={`w-full h-full object-contain transition-all duration-300 ${
                      wireframeMode ? 'brightness-90 contrast-125' : ''
                    }`}
                    referrerPolicy="no-referrer"
                  />

                  {wireframeMode && (
                    <div
                      className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,#B9F24D_1px,transparent_1px),linear-gradient(to_bottom,#B9F24D_1px,transparent_1px)] bg-[size:24px_24px]"
                    />
                  )}

                  <div className="absolute top-3 left-3 bg-[#252735]/85 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#62C9F5]" />
                    <span>2D концепт-арт</span>
                  </div>
                </div>

                <label className="btn-3d-white flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold border-2 border-slate-300 hover:border-[#252735] cursor-pointer transition-colors shadow-2xs">
                  <Upload className="w-3.5 h-3.5 text-[#252735]" />
                  <span>Заменить картинку героя</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handle2DImageUpload}
                    className="hidden"
                  />
                </label>
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
                  Загрузите концепт-арт или рендер (PNG, JPG)
                </p>
                <span className="btn-3d-lime px-4 py-2 rounded-xl text-xs font-display font-black border border-[#252735]">
                  Выбрать файл с ПК
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handle2DImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* 3D Model Readiness Check Cards (NO bullet lists!) */}
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

        {/* External 3D Services & Optional 3D Screenshot Upload */}
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

          {/* Optional: upload 3D model screenshot */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="text-xs font-bold text-[#252735]">
                {threeDResultUrl ? '✓ 3D-результат прикреплён к паспорту героя' : 'Сделал 3D-модель? Прикрепи скриншот!'}
              </span>
              <p className="text-xs text-slate-500">
                Скриншот или рендер из Tripo3D / Meshy войдёт в твой итоговый сертификат дизайнера.
              </p>
            </div>

            <label className="btn-3d-white shrink-0 px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 cursor-pointer flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5" />
              <span>{threeDResultUrl ? 'Заменить скриншот' : 'Загрузить скриншот 3D'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleThreeDUpload}
                className="hidden"
              />
            </label>
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
          <span>Назад: Изображение</span>
        </button>

        <button
          onClick={handleFinish}
          disabled={!allPassed}
          className={`flex items-center gap-2.5 px-8 py-4 rounded-2xl font-display font-black text-lg border-2 ${
            allPassed
              ? 'btn-3d-lime border-[#252735] cursor-pointer'
              : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'
          }`}
        >
          <span>Завершить и получить сертификат</span>
          <ArrowRight className="w-5 h-5 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
