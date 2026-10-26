import React, { useState } from 'react';
import { CharacterData } from '../../types/avatar';
import { EXTERNAL_3D_GENERATORS, ASSETS } from '../../data/labData';
import { MascotPixel } from '../MascotPixel';
import { playClickSound, playSelectSound, playSuccessSound, playBadgeSound } from '../../services/soundEffects';
import { ArrowRight, ArrowLeft, Check, Box, Layers, ExternalLink, Upload, Sparkles, RefreshCw } from 'lucide-react';

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
          {/* 2D Image Viewport & Upload */}
          <div className="flex flex-col gap-3">
            <div className="relative rounded-2xl overflow-hidden border-3 border-[#252735] shadow-[0_6px_0_#252735] bg-slate-50 aspect-square flex items-center justify-center">
              <img
                src={character.generatedImageUrl || ASSETS.robloxSampleHero}
                alt="2D концепт"
                className={`w-full h-full object-contain transition-all duration-300 ${
                  wireframeMode ? 'brightness-90 contrast-125' : ''
                }`}
                referrerPolicy="no-referrer"
              />

              {/* Wireframe mesh overlay effect when toggled */}
              {wireframeMode && (
                <div
                  className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,#B9F24D_1px,transparent_1px),linear-gradient(to_bottom,#B9F24D_1px,transparent_1px)] bg-[size:24px_24px]"
                />
              )}

              <div className="absolute top-3 left-3 bg-[#252735]/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                {character.generatedImageUrl ? 'Твой концепт-арт' : 'Образец концепта'}
              </div>
            </div>

            {/* 2D Image Upload Button */}
            <label className="btn-3d-white flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold border-2 border-slate-300 hover:border-[#252735] cursor-pointer transition-colors shadow-2xs">
              <Upload className="w-4 h-4 text-[#252735]" />
              <span>
                {character.generatedImageUrl
                  ? 'Заменить картинку героя'
                  : 'Загрузить созданную картинку'}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handle2DImageUpload}
                className="hidden"
              />
            </label>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EXTERNAL_3D_GENERATORS.map((gen) => (
              <a
                key={gen.id}
                href={gen.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className="p-4 rounded-2xl border-2 border-slate-200 hover:border-[#252735] hover:bg-slate-50 transition-all flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-[#252735]">
                      {gen.name}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <p className="text-xs text-slate-500">{gen.description}</p>
                </div>
              </a>
            ))}
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
