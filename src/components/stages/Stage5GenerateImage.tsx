import React, { useState } from 'react';
import { CharacterData } from '../../types/avatar';
import { EXTERNAL_IMAGE_GENERATORS, ASSETS } from '../../data/labData';
import { MascotPixel } from '../MascotPixel';
import { playClickSound, playSuccessSound, playSelectSound, playBadgeSound } from '../../services/soundEffects';
import { ArrowRight, ArrowLeft, Upload, ExternalLink, RefreshCw, Check, Sparkles, Image as ImageIcon } from 'lucide-react';

interface Stage5GenerateImageProps {
  character: CharacterData;
  onUpdate: (data: Partial<CharacterData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Stage5GenerateImage: React.FC<Stage5GenerateImageProps> = ({
  character,
  onUpdate,
  onNext,
  onPrev,
}) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(character.generatedImageUrl);
  const [imageSource, setImageSource] = useState<'sample' | 'uploaded' | null>(
    character.generatedImageSource
  );
  const [selectedGenerator, setSelectedGenerator] = useState(EXTERNAL_IMAGE_GENERATORS[0]);
  const [reflectionChoice, setReflectionChoice] = useState<string | undefined>(
    character.evaluationNote
  );
  const [isMatch, setIsMatch] = useState<boolean | null>(
    character.evaluationNote ? true : null
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      playSuccessSound();
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImageUrl(result);
        setImageSource('uploaded');
        onUpdate({
          generatedImageUrl: result,
          generatedImageSource: 'uploaded',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUseSample = () => {
    playBadgeSound();
    setImageUrl(ASSETS.robloxSampleHero);
    setImageSource('sample');
    onUpdate({
      generatedImageUrl: ASSETS.robloxSampleHero,
      generatedImageSource: 'sample',
    });
  };

  const handleRemoveImage = () => {
    playClickSound();
    setImageUrl(undefined);
    setImageSource(null);
    onUpdate({
      generatedImageUrl: undefined,
      generatedImageSource: null,
    });
  };

  const handleSelectReflection = (reason: string) => {
    playSelectSound();
    setReflectionChoice(reason);
    onUpdate({ evaluationNote: reason });
  };

  const handleContinue = () => {
    playSuccessSound();
    onNext();
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Mascot Guidance */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs">
        <MascotPixel
          mood={imageUrl ? 'happy' : 'thinking'}
          speechText={
            imageUrl
              ? 'Ура, изображение загружено в лабораторию! Теперь давай внимательно оценим результат — похоже ли это на твою задумку?'
              : 'Этап 5: Создай изображение! Скопируй промпт и открой генератор, либо загрузи готовую картинку из галереи!'
          }
          tip={
            imageUrl
              ? 'Профессиональные дизайнеры всегда делают несколько дублей, чтобы найти самый выразительный образ!'
              : 'Если у тебя нет интернета или аккаунта в сервисах, нажми «Использовать концепт лаборатории», чтобы продолжить обучение!'
          }
        />
      </div>

      {/* Generator Links & Offline Mode Buttons */}
      {!imageUrl && (
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Шаг 1 из 2
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-display text-[#252735]">
              Где сгенерировать персонажа?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Выбери один из проверенных генераторов, вставь свой скопированный промпт и скачай результат:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EXTERNAL_IMAGE_GENERATORS.map((gen) => (
              <a
                key={gen.id}
                href={gen.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClickSound()}
                className="group p-4 rounded-2xl border-2 border-slate-200 hover:border-[#252735] hover:bg-slate-50 transition-all flex items-center justify-between text-left"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-[#252735] group-hover:text-blue-600">
                      {gen.name}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                  </div>
                  <p className="text-xs text-slate-500">{gen.description}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Offline Quick Preset Fallback */}
          <div className="p-4 rounded-2xl bg-[#B9F24D]/15 border-2 border-dashed border-[#B9F24D] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="text-xs font-black text-[#252735] uppercase tracking-wider">
                💡 Офлайн-режим / Быстрый тест
              </span>
              <p className="text-xs text-slate-700">
                Нет интернета или генератора прямо сейчас? Загрузи официальный 3D-концепт лаборатории RENDERIA!
              </p>
            </div>
            <button
              onClick={handleUseSample}
              className="btn-3d-lime shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold border border-[#252735] cursor-pointer"
            >
              Использовать концепт лаборатории
            </button>
          </div>
        </div>
      )}

      {/* Upload & Preview Stage */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            {imageUrl ? 'Результат генерации' : 'Шаг 2 из 2'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-display text-[#252735]">
            {imageUrl ? 'Герой в лаборатории' : 'Загрузи полученное изображение'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {imageUrl
              ? 'Изображение готово для проверки требований к 3D-моделированию:'
              : 'Перетащи файл картинки сюда или нажми кнопку для выбора файла с компьютера:'}
          </p>
        </div>

        {/* Display Image or Upload Dropzone */}
        {imageUrl ? (
          <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-3xl bg-slate-50 border-2 border-slate-200">
            {/* Image Preview Box */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border-3 border-[#252735] shadow-[0_6px_0_#252735] bg-white flex items-center justify-center shrink-0">
              <img
                src={imageUrl}
                alt="Сгенерированный персонаж"
                className="w-full h-full object-contain select-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-[#252735]/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {imageSource === 'sample' ? 'Концепт RENDERIA' : 'Пользовательский арт'}
              </div>
            </div>

            {/* Evaluation & Reflection Panel */}
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <h3 className="font-display font-black text-lg text-[#252735]">
                  Анализ результата с Пикселем
                </h3>
                <p className="text-xs text-slate-600">
                  Похож ли полученный герой на то, что ты задумал в начале пути?
                </p>

                {/* Yes / No simple buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      playSelectSound();
                      setIsMatch(true);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      isMatch === true
                        ? 'bg-[#B9F24D] text-[#252735] border-[#252735]'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    👍 Да, очень похож!
                  </button>
                  <button
                    onClick={() => {
                      playSelectSound();
                      setIsMatch(false);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      isMatch === false
                        ? 'bg-[#FFB9D5] text-[#252735] border-[#252735]'
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    🤔 Хочу ещё улучшить
                  </button>
                </div>
              </div>

              {/* Reflection choices: What would you improve next? */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-600">
                  Что стоит скорректировать в следующем дубле?
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'color', label: '🎨 Цвет костюма' },
                    { id: 'accessory', label: '🎒 Аксессуары' },
                    { id: 'pose', label: '🧍 Позу персонажа' },
                    { id: 'background', label: '⚪️ Очистить фон' },
                    { id: 'details', label: '✨ Больше мелких деталей' },
                  ].map((item) => {
                    const isSelected = reflectionChoice === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectReflection(item.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#252735] text-white border-[#252735]'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Replace / Change Image Action */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={handleRemoveImage}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Загрузить другой файл</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Upload Dropzone */
          <div className="border-3 border-dashed border-slate-300 hover:border-[#62C9F5] rounded-3xl p-8 sm:p-12 text-center transition-colors bg-slate-50/50 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-[#62C9F5]/20 flex items-center justify-center text-3xl">
              🖼️
            </div>
            <div className="space-y-1 max-w-sm">
              <h3 className="font-display font-black text-base text-[#252735]">
                Перетащи изображение сюда
              </h3>
              <p className="text-xs text-slate-500">
                Поддерживаются PNG, JPG, WEBP. Файл обрабатывается прямо в браузере без отправки на сервер.
              </p>
            </div>

            <label className="btn-3d-sky inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-display font-black text-sm cursor-pointer border border-[#3BA5D3]">
              <Upload className="w-4 h-4" />
              <span>Выбрать файл с компьютера</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        )}
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
          disabled={!imageUrl}
          className={`flex items-center gap-2.5 px-8 py-4 rounded-2xl font-display font-black text-lg border-2 ${
            imageUrl
              ? 'btn-3d-lime border-[#252735] cursor-pointer'
              : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'
          }`}
        >
          <span>Дальше: Подготовить к 3D</span>
          <ArrowRight className="w-5 h-5 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
