import React, { useState } from 'react';
import { CharacterData } from '../../types/avatar';
import { MascotPixel } from '../MascotPixel';
import pixelMascotImg from '../../assets/pix/pixel1.webp';
import { playClickSound, playSelectSound, playSuccessSound, playBadgeSound } from '../../services/soundEffects';
import { ArrowRight, ArrowLeft, Check, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';

interface Stage3PromptTrainingProps {
  character: CharacterData;
  onNext: () => void;
  onPrev: () => void;
}

export const Stage3PromptTraining: React.FC<Stage3PromptTrainingProps> = ({
  character,
  onNext,
  onPrev,
}) => {
  const [selectedOption, setSelectedOption] = useState<'vague' | 'detailed' | null>(null);
  const [activeExperiment, setActiveExperiment] = useState<string>('lighting');
  const [hasTestedTweak, setHasTestedTweak] = useState(false);

  const handleSelectOption = (opt: 'vague' | 'detailed') => {
    setSelectedOption(opt);
    if (opt === 'detailed') {
      playBadgeSound();
    } else {
      playSelectSound();
    }
  };

  const handleTweakExperiment = (key: string) => {
    playClickSound();
    setActiveExperiment(key);
    setHasTestedTweak(true);
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
          mood={selectedOption === 'detailed' ? 'happy' : 'thinking'}
          speechText="Этап 3: Прокачай промпт! Промпт — это подробная инструкция для искусственного интеллекта. Чем конкретнее детали, тем ближе картинка к твоей задумке."
          tip="Нейросеть не умеет читать мысли, но отлично понимает точные слова: цвета, ракурс, фон и материалы!"
        />
      </div>

      {/* Mini-Game: Compare Two Prompts */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            Интерактивная мини-игра
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-display text-[#252735]">
            Какое описание лучше объясняет задумку нейросети?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Выбери карточку, которая даст предсказуемый и качественный результат:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Option A: Vague */}
          <div
            onClick={() => handleSelectOption('vague')}
            className={`p-6 rounded-3xl border-3 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
              selectedOption === 'vague'
                ? 'border-amber-400 bg-amber-50/60 shadow-md scale-[1.01]'
                : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
                  Вариант А
                </span>
                {selectedOption === 'vague' && (
                  <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> Слишком размыто!
                  </span>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 font-mono text-sm text-slate-800 italic">
                «Сделай крутого персонажа»
              </div>

              <div className="space-y-1 text-xs text-slate-600">
                <p>⚠️ Нейросеть не знает, кто это: робот, зверь или человек.</p>
                <p>⚠️ Непонятно, какие цвета и какая одежда нужны.</p>
                <p>⚠️ Картинка получится случайной и неконтролируемой.</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-xs font-bold text-slate-500">
              {selectedOption === 'vague' ? 'Выбрано для проверки' : 'Нажми, чтобы проверить'}
            </div>
          </div>

          {/* Option B: Detailed & Structured */}
          <div
            onClick={() => handleSelectOption('detailed')}
            className={`p-6 rounded-3xl border-3 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
              selectedOption === 'detailed'
                ? 'border-[#252735] bg-[#B9F24D]/20 shadow-[0_6px_0_#252735] scale-[1.01]'
                : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#B9F24D] text-[#252735] border border-[#252735]/20">
                  Вариант Б
                </span>
                {selectedOption === 'detailed' && (
                  <span className="text-xs font-black text-emerald-800 flex items-center gap-1">
                    <Check className="w-4 h-4 stroke-[3]" /> Идеальный выбор! +150 XP
                  </span>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 font-mono text-sm text-[#252735] leading-relaxed">
                «Создай игрового космического исследователя в бело-салатовом костюме, с голубым шлемом, большим рюкзаком и светящимися ботинками. Покажи его целиком на простом светлом фоне».
              </div>

              <div className="space-y-1 text-xs text-slate-700">
                <p>✅ Указана роль, цвета, ключевые аксессуары.</p>
                <p>✅ Задана композиция: персонаж в полный рост (full-body).</p>
                <p>✅ Чистый фон облегчает будущую конвертацию в 3D!</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-xs font-bold text-[#252735]">
              {selectedOption === 'detailed' ? '✓ Выбрано: Мастерский промпт!' : 'Нажми, чтобы выбрать'}
            </div>
          </div>
        </div>

        {/* Pixel's Explanation & Takeaway */}
        {selectedOption && (
          <div
            className={`p-5 rounded-2xl border-2 flex items-start gap-4 transition-all ${
              selectedOption === 'detailed'
                ? 'bg-[#B9F24D]/25 border-[#252735]'
                : 'bg-amber-50 border-amber-300'
            }`}
          >
            <div className="w-12 h-12 shrink-0 select-none">
              <img
                src={pixelMascotImg}
                alt="Пикс"
                className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(37,39,53,0.15)]"
              />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-[#252735]">
                {selectedOption === 'detailed'
                  ? 'Пикс: «Ты абсолютно прав! Во втором описании нейросеть получает конкретные координаты!»'
                  : 'Пикс: «Попробуй вариант Б! В первом варианте нейросеть будет наугад придумывать каждую деталь.»'}
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                Формула сильного промпта: <strong>[Кто?]</strong> + <strong>[В чём одет и какие цвета?]</strong> + <strong>[Какие аксессуары?]</strong> + <strong>[Стиль и чистый фон]</strong>.
              </p>
            </div>
          </div>
        )}

        {/* Interactive Experiment: Tweak One Element */}
        <div className="pt-4 border-t border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-black text-base text-[#252735]">
              Эксперимент: Добавь профессиональную деталь к промпту
            </h3>
            <span className="text-xs font-bold text-slate-500">
              Попробуй разные варианты
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleTweakExperiment('lighting')}
              className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                activeExperiment === 'lighting'
                  ? 'border-[#252735] bg-[#62C9F5]/20 font-bold'
                  : 'border-slate-200 bg-slate-50 hover:bg-white'
              }`}
            >
              <div className="text-xs font-bold text-sky-700 mb-1">Студийный свет 💡</div>
              <p className="text-xs text-slate-600">
                «Мягкое равномерное освещение без глубоких теней»
              </p>
            </button>

            <button
              onClick={() => handleTweakExperiment('background')}
              className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                activeExperiment === 'background'
                  ? 'border-[#252735] bg-[#FFB9D5]/25 font-bold'
                  : 'border-slate-200 bg-slate-50 hover:bg-white'
              }`}
            >
              <div className="text-xs font-bold text-pink-700 mb-1">Изолированный фон ⚪️</div>
              <p className="text-xs text-slate-600">
                «Чистый однородный светлый фон, без фонового мусора»
              </p>
            </button>

            <button
              onClick={() => handleTweakExperiment('pose')}
              className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                activeExperiment === 'pose'
                  ? 'border-[#252735] bg-[#BDA7FF]/25 font-bold'
                  : 'border-slate-200 bg-slate-50 hover:bg-white'
              }`}
            >
              <div className="text-xs font-bold text-purple-700 mb-1">Поза в полный рост 🧍</div>
              <p className="text-xs text-slate-600">
                «Персонаж стоит прямо, руки и ноги видны целиком»
              </p>
            </button>
          </div>

          {hasTestedTweak && (
            <p className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
              🎉 Отлично! Мы автоматически добавим эти требования в твоё техзадание на следующем шаге.
            </p>
          )}
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
          <span>Назад: Внешность</span>
        </button>

        <button
          onClick={handleContinue}
          className="btn-3d-lime flex items-center gap-2.5 px-8 py-4 rounded-2xl font-display font-black text-lg cursor-pointer border-2 border-[#252735]"
        >
          <span>Дальше: Собрать техзадание</span>
          <ArrowRight className="w-5 h-5 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
