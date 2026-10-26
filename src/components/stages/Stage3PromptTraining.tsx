import React, { useState } from 'react';
import { CharacterData } from '../../types/avatar';
import { ASSETS, buildLiveUserPrompt } from '../../data/labData';
import pixelMascotImg from '../../assets/pix/pixel1.webp';
import {
  playClickSound,
  playSuccessSound,
  playBadgeSound,
  playGentleErrorSound,
} from '../../services/soundEffects';
import {
  ArrowRight,
  ArrowLeft,
  Flame,
  Box,
  Zap,
  Scan,
  Trophy,
  CheckCircle2,
  Lightbulb,
  Target,
  Sparkles,
} from 'lucide-react';

interface Stage3PromptTrainingProps {
  character: CharacterData;
  onUpdate?: (data: Partial<CharacterData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

type StoryStep = 'intro' | 'step1' | 'step2' | 'step3' | 'step4' | 'finale';

interface OptionItem {
  id: string;
  text: string;
  isCorrect: boolean;
  hint: string;
}

export const Stage3PromptTraining: React.FC<Stage3PromptTrainingProps> = ({
  character,
  onUpdate,
  onNext,
  onPrev,
}) => {
  const [currentStep, setCurrentStep] = useState<StoryStep>('intro');
  const [shakingOptionId, setShakingOptionId] = useState<string | null>(null);
  const [wrongHint, setWrongHint] = useState<string | null>(null);
  const [step1Solved, setStep1Solved] = useState(false);
  const [step2Solved, setStep2Solved] = useState(false);
  const [step3Solved, setStep3Solved] = useState(false);
  const [step4Solved, setStep4Solved] = useState(false);

  // Sound & Step transition handlers
  const handleStartGame = () => {
    playClickSound();
    setCurrentStep('step1');
  };

  const handleSelectOption = (
    step: 'step1' | 'step2' | 'step3' | 'step4',
    option: OptionItem
  ) => {
    if (option.isCorrect) {
      playSuccessSound();
      setWrongHint(null);
      setShakingOptionId(null);

      if (step === 'step1') {
        setStep1Solved(true);
      } else if (step === 'step2') {
        setStep2Solved(true);
      } else if (step === 'step3') {
        setStep3Solved(true);
      } else if (step === 'step4') {
        setStep4Solved(true);
      }
    } else {
      playGentleErrorSound();
      setShakingOptionId(option.id);
      setWrongHint(option.hint);
      setTimeout(() => {
        setShakingOptionId(null);
      }, 500);
    }
  };

  const handleNextStep = (next: StoryStep) => {
    playBadgeSound();
    setWrongHint(null);
    setCurrentStep(next);
  };

  const handleFinish = () => {
    playSuccessSound();
    if (onUpdate) {
      onUpdate({ hasLearnedStyle: true });
    }
    onNext();
  };

  // Determine current image & badge in the single container
  const getContainerImageData = () => {
    if (currentStep === 'intro') {
      return {
        src: ASSETS.ninjaFlat2d,
        alt: 'Обычный плоский 2D-ниндзя',
        badge: 'Черновик: Без деталей',
        badgeColor: 'bg-slate-200 text-slate-700 border-slate-300',
      };
    }
    if (currentStep === 'step1') {
      if (step1Solved) {
        return {
          src: ASSETS.ninja2dFire,
          alt: '2D Ниндзя с силой огня',
          badge: 'Генерация №2: Добавлена сила огня',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
        };
      }
      return {
        src: ASSETS.ninjaFlat2d,
        alt: 'Обычный плоский ниндзя',
        badge: 'Генерация №1: Забыли про огонь',
        badgeColor: 'bg-slate-200 text-slate-700 border-slate-300',
      };
    }
    if (currentStep === 'step2') {
      if (step2Solved) {
        return {
          src: ASSETS.ninja3dStatic,
          alt: '3D-ниндзя в стиле Roblox',
          badge: 'Генерация №3: Задан стиль Roblox',
          badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
        };
      }
      return {
        src: ASSETS.ninja2dFire,
        alt: '2D Ниндзя с огнем',
        badge: 'Генерация №2: Огонь есть, но это 2D-мультик',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      };
    }
    if (currentStep === 'step3') {
      if (step3Solved) {
        return {
          src: ASSETS.ninja3dFireBusy,
          alt: '3D-ниндзя в стиле Roblox в боевой позе с огнем',
          badge: 'Генерация №4: Динамичная поза и огонь',
          badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
        };
      }
      return {
        src: ASSETS.ninja3dStatic,
        alt: '3D-ниндзя в стиле Roblox стоит неподвижно',
        badge: 'Генерация №3: Стоит как статуя без огня',
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
      };
    }
    if (currentStep === 'step4') {
      if (step4Solved) {
        return {
          src: ASSETS.ninja3dFireWhite,
          alt: '3D-ниндзя в стиле Roblox на чистом белом фоне в полный рост',
          badge: 'Генерация №5: Идеально для 3D! 🏆',
          badgeColor: 'bg-[#B9F24D] text-[#252735] border-[#252735]',
        };
      }
      return {
        src: ASSETS.ninja3dFireBusy,
        alt: '3D ниндзя на сложном фоне',
        badge: 'Генерация №4: Сложный темный фон мешает 3D',
        badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
      };
    }
    // finale
    return {
      src: ASSETS.ninja3dFireWhite,
      alt: 'Готовый концепт для 3D-моделирования',
      badge: 'Готово к 3D-моделированию! 🏆',
      badgeColor: 'bg-[#B9F24D] text-[#252735] border-[#252735]',
    };
  };

  const imageData = getContainerImageData();

  // Questions and options for each of the 4 steps
  const step1Options: OptionItem[] = [
    {
      id: 'opt_power',
      text: 'Описать суперспособность (сила огня)',
      isCorrect: true,
      hint: '',
    },
    {
      id: 'opt_bg',
      text: 'Добавить белый фон',
      isCorrect: false,
      hint: 'Фон пригодится чуть позже! Но сейчас главное — объяснить нейросети, что ниндзя управляет огнём.',
    },
    {
      id: 'opt_name',
      text: 'Придумать имя герою',
      isCorrect: false,
      hint: 'Имя — это здорово, но нейросеть пока ничего не знает про огонь. Сначала добавим суперсилу!',
    },
  ];

  const step2Options: OptionItem[] = [
    {
      id: 'opt_style',
      text: 'Указать стиль: Roblox',
      isCorrect: true,
      hint: '',
    },
    {
      id: 'opt_more_fire',
      text: 'Ещё раз написать про огонь',
      isCorrect: false,
      hint: 'Про огонь нейросеть уже отлично поняла! Теперь нужно изменить плоский 2D-рисунок на игровой 3D-стиль.',
    },
    {
      id: 'opt_rename',
      text: 'Добавить девиз ниндзя',
      isCorrect: false,
      hint: 'Девиз не сделает картинку трёхмерной! Нам нужно прямо сказать нейросети: «стиль Roblox».',
    },
  ];

  const step3Options: OptionItem[] = [
    {
      id: 'opt_dynamic_pose_fire',
      text: 'В динамичной боевой позе с огненной энергией',
      isCorrect: true,
      hint: '',
    },
    {
      id: 'opt_stand_still',
      text: 'Оставить стоять неподвижно как статуя',
      isCorrect: false,
      hint: 'Если герой просто стоит по стойке смирно, он выглядит безжизненно! Нам нужна крутая динамичная боевая поза и огонь.',
    },
    {
      id: 'opt_clouds',
      text: 'Нарисовать облака на небе',
      isCorrect: false,
      hint: 'Облака не сделают позу персонажа героической! Нам нужно добавить движение и огненную мощь самому ниндзя.',
    },
  ];

  const step4Options: OptionItem[] = [
    {
      id: 'opt_white_bg_fullbody',
      text: 'На чистом белом фоне, в полный рост',
      isCorrect: true,
      hint: '',
    },
    {
      id: 'opt_castle_smoke',
      text: 'Добавить тёмный замок, камни и дым',
      isCorrect: false,
      hint: 'Камни, цепи и тёмный дым скроют контуры персонажа, и 3D-редактор запутается! Нужен чистый белый фон.',
    },
    {
      id: 'opt_close_up',
      text: 'Увеличить только лицо крупным планом',
      isCorrect: false,
      hint: 'Крупный план отрежет тело и ноги! Для создания 3D-модели персонаж обязательно должен быть виден целиком во весь рост.',
    },
  ];

  const userLivePrompt = buildLiveUserPrompt(character);

  return (
    <div className="max-w-6xl mx-auto py-2 sm:py-4 px-3 sm:px-6 space-y-4">
      {/* PERSISTENT MISSION OBJECTIVE BANNER (Always visible) */}
      <div className="bg-[#252735] text-white border-3 border-[#252735] rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-[0_5px_0_#151722] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#B9F24D] text-[#252735] flex items-center justify-center shrink-0 border border-[#252735] shadow-xs">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#B9F24D] block">
              ЦЕЛЬ ПИКСА:
            </span>
            <p className="font-display font-black text-xs sm:text-sm md:text-base leading-snug truncate sm:whitespace-normal">
              Создать огненного ниндзя в стиле Roblox для нашей игры.
            </p>
          </div>
        </div>
        <span className="shrink-0 hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-slate-200 border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-[#B9F24D]" />
          Мини-игра
        </span>
      </div>

      {/* Top Header Card */}
      <div className="bg-white/95 border-2 border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#B9F24D] text-[#252735] border border-[#252735]">
                Этап 3
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Интерактивная история
              </span>
            </div>
            <h1 className="font-display font-black text-xl sm:text-2xl text-[#252735]">
              Пикс и нейросеть: Создаём Огненного Ниндзя
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Помоги Пиксу исправить промпт по 4 правилам, чтобы нейросеть создала идеального героя для 3D!
            </p>
          </div>

          {/* Stepper Progress Badges (4 Steps + Finale) */}
          <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-center bg-slate-50 border border-slate-200 p-1.5 rounded-2xl">
            <div
              className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-black transition-all ${
                currentStep === 'step1' || (currentStep === 'intro' && !step1Solved)
                  ? 'bg-[#252735] text-white shadow-xs'
                  : step1Solved
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'text-slate-400'
              }`}
            >
              1. Огонь
            </div>
            <span className="text-slate-300">➔</span>
            <div
              className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-black transition-all ${
                currentStep === 'step2'
                  ? 'bg-[#252735] text-white shadow-xs'
                  : step2Solved
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'text-slate-400'
              }`}
            >
              2. Стиль Roblox
            </div>
            <span className="text-slate-300">➔</span>
            <div
              className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-black transition-all ${
                currentStep === 'step3'
                  ? 'bg-[#252735] text-white shadow-xs'
                  : step3Solved
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'text-slate-400'
              }`}
            >
              3. Поза
            </div>
            <span className="text-slate-300">➔</span>
            <div
              className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-black transition-all ${
                currentStep === 'step4'
                  ? 'bg-[#252735] text-white shadow-xs'
                  : step4Solved
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'text-slate-400'
              }`}
            >
              4. Чистый фон
            </div>
            <span className="text-slate-300">➔</span>
            <div
              className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-black transition-all ${
                currentStep === 'finale'
                  ? 'bg-[#B9F24D] text-[#252735] border border-[#252735]'
                  : 'text-slate-400'
              }`}
            >
              Финал ✨
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage Area */}
      {currentStep !== 'finale' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* LEFT: Single Image Container with smooth transition (5 cols) */}
          <div className="lg:col-span-5 bg-white border-3 border-[#252735] rounded-3xl p-4 sm:p-5 shadow-[0_6px_0_#252735] space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#B9F24D] border border-[#252735]" />
                <h3 className="font-display font-black text-base text-[#252735]">
                  Холст генерации ИИ
                </h3>
              </div>
              <span
                className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${imageData.badgeColor}`}
              >
                {imageData.badge}
              </span>
            </div>

            {/* Single Unified Image Frame */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200 shadow-inner flex items-center justify-center">
              <img
                key={imageData.src}
                src={imageData.src}
                alt={imageData.alt}
                className="w-full h-full object-contain transition-all duration-500 ease-in-out animate-dressup-pop"
              />

              {/* Watermark/Status Indicator */}
              <div className="absolute bottom-2.5 right-2.5 bg-white/90 backdrop-blur-xs border border-slate-200 px-2.5 py-1 rounded-xl text-[10px] font-black text-[#252735] shadow-xs">
                RENDERIA AI • Live
              </div>
            </div>

            {/* Prompt Live Inspection Box */}
            <div className="bg-slate-900 text-slate-100 rounded-2xl p-3.5 border-2 border-[#252735] space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#B9F24D] animate-ping" />
                  Текущий запрос нейросети:
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  prompt_v
                  {currentStep === 'step4' && step4Solved
                    ? '5.0'
                    : currentStep === 'step3' && step3Solved
                    ? '4.0'
                    : currentStep === 'step2' && step2Solved
                    ? '3.0'
                    : currentStep === 'step1' && step1Solved
                    ? '2.0'
                    : '1.0'}
                </span>
              </div>

              <div className="font-mono text-xs sm:text-sm leading-relaxed p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <span>«Создай персонажа ниндзя</span>
                {step1Solved && (
                  <span className="text-[#B9F24D] font-bold bg-[#B9F24D]/15 px-1 py-0.5 rounded mx-1">
                    с силой огня
                  </span>
                )}
                {step2Solved && (
                  <span className="text-sky-300 font-bold bg-sky-400/15 px-1 py-0.5 rounded mx-1">
                    в стиле Roblox
                  </span>
                )}
                {step3Solved && (
                  <span className="text-amber-300 font-bold bg-amber-400/15 px-1 py-0.5 rounded mx-1">
                    в динамичной боевой позе с огненной энергией
                  </span>
                )}
                {step4Solved && (
                  <span className="text-pink-300 font-bold bg-pink-400/15 px-1 py-0.5 rounded mx-1">
                    на чистом белом фоне, в полный рост
                  </span>
                )}
                <span>»</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Pix's Dialog and Interactive Mission Tasks (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Pix Avatar & Dialogue Card */}
            <div className="bg-white border-3 border-[#252735] rounded-3xl p-5 sm:p-6 shadow-[0_6px_0_#252735] flex items-start gap-4">
              <div className="w-16 h-20 sm:w-20 sm:h-24 shrink-0 select-none relative group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#B9F24D]/40 to-[#62C9F5]/40 blur-lg pointer-events-none" />
                <img
                  src={pixelMascotImg}
                  alt="Пикс"
                  className="w-full h-full object-contain relative drop-shadow-md group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-display font-black text-sm text-[#252735]">
                    Пикс
                  </span>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    Лаборатория RENDERIA
                  </span>
                </div>

                {/* Dialog Content by Step */}
                {currentStep === 'intro' && (
                  <div className="space-y-3">
                    <p className="text-sm sm:text-base font-bold text-[#252735] leading-snug">
                      «Привет! Наша цель — создать огненного ниндзя в стиле Roblox для нашей игры. Но я написал нейросети просто: <em>«Создай ниндзя»</em> — и посмотри, что она выдала слева! Скучный плоский рисунок без искр и характера. Поможешь мне исправить промпт?»
                    </p>
                    <button
                      onClick={handleStartGame}
                      className="btn-3d-lime flex items-center gap-2 px-6 py-3 rounded-2xl font-display font-black text-sm sm:text-base border-2 border-[#252735] cursor-pointer"
                    >
                      <span>Давай помогу! 🚀</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                )}

                {currentStep === 'step1' && (
                  <div className="space-y-2">
                    <p className="text-sm sm:text-base font-bold text-[#252735] leading-snug">
                      {!step1Solved
                        ? '«Я хочу огненного ниндзя, но забыл написать про огонь! Получился скучный герой.»'
                        : '«Ура! Огонь появился! Ниндзя теперь пылает энергией! Но посмотри внимательнее: рисунок остался плоским 2D-рисунком, а нам нужен 3D-герой!»'}
                    </p>
                  </div>
                )}

                {currentStep === 'step2' && (
                  <div className="space-y-2">
                    <p className="text-sm sm:text-base font-bold text-[#252735] leading-snug">
                      {!step2Solved
                        ? '«Огонь есть, но это не 3D! Мне нужен стиль Roblox для игры!»'
                        : '«Стиль Roblox задан! Но посмотри на экран: он просто застыл на месте, как манекен...»'}
                    </p>
                  </div>
                )}

                {currentStep === 'step3' && (
                  <div className="space-y-2">
                    <p className="text-sm sm:text-base font-bold text-[#252735] leading-snug">
                      {!step3Solved
                        ? '«Ого, 3D! Но он просто стоит, как статуя. Добавим ему динамичную позу и огонь!»'
                        : '«Вот это движение! Настоящий боевой ниндзя с огненной спиралью! Но остался финальный штрих перед экспортом в 3D...»'}
                    </p>
                  </div>
                )}

                {currentStep === 'step4' && (
                  <div className="space-y-2">
                    <p className="text-sm sm:text-base font-bold text-[#252735] leading-snug">
                      {!step4Solved
                        ? '«Герой крутой и с огнем! Но фон полон темных камней и дыма — 3D-сканер запутается! Что поможет подготовить изображение для 3D?»'
                        : '«Идеально! Теперь он крутой, в позе, с огнем и на белом фоне. Можно делать 3D-модель!»'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Question Card for active steps */}
            {currentStep !== 'intro' && (
              <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
                {/* Step 1 Question & Options */}
                {currentStep === 'step1' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-amber-500" />
                      <h4 className="font-display font-black text-base sm:text-lg text-[#252735]">
                        Вопрос 1: Чего не хватает в задании?
                      </h4>
                    </div>

                    {!step1Solved ? (
                      <div className="space-y-2.5">
                        {step1Options.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectOption('step1', opt)}
                            className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all cursor-pointer flex items-center justify-between ${
                              shakingOptionId === opt.id
                                ? 'animate-shake border-red-400 bg-red-50 text-red-900 ring-2 ring-red-300'
                                : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-[#252735] text-[#252735]'
                            }`}
                          >
                            <span>{opt.text}</span>
                            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
                              Выбрать
                            </span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 text-emerald-900 font-bold text-sm">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          <span>Правильно! Мы добавили силу огня в промпт. (+100 XP)</span>
                        </div>
                        <button
                          onClick={() => handleNextStep('step2')}
                          className="btn-3d-lime shrink-0 px-4 py-2.5 rounded-xl font-display font-black text-xs sm:text-sm border-2 border-[#252735] cursor-pointer"
                        >
                          Шаг 2: Стиль Roblox ➔
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2 Question & Options */}
                {currentStep === 'step2' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Box className="w-5 h-5 text-sky-500" />
                      <h4 className="font-display font-black text-base sm:text-lg text-[#252735]">
                        Вопрос 2: Что нужно уточнить теперь?
                      </h4>
                    </div>

                    {!step2Solved ? (
                      <div className="space-y-2.5">
                        {step2Options.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectOption('step2', opt)}
                            className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all cursor-pointer flex items-center justify-between ${
                              shakingOptionId === opt.id
                                ? 'animate-shake border-red-400 bg-red-50 text-red-900 ring-2 ring-red-300'
                                : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-[#252735] text-[#252735]'
                            }`}
                          >
                            <span>{opt.text}</span>
                            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
                              Выбрать
                            </span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-sky-50 border-2 border-sky-300 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 text-sky-900 font-bold text-sm">
                          <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0" />
                          <span>Верно! Стиль Roblox задан. (+100 XP)</span>
                        </div>
                        <button
                          onClick={() => handleNextStep('step3')}
                          className="btn-3d-lime shrink-0 px-4 py-2.5 rounded-xl font-display font-black text-xs sm:text-sm border-2 border-[#252735] cursor-pointer"
                        >
                          Шаг 3: Поза и огонь ➔
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3 Question & Options */}
                {currentStep === 'step3' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-500" />
                      <h4 className="font-display font-black text-base sm:text-lg text-[#252735]">
                        Вопрос 3: Как оживить нашего 3D-героя?
                      </h4>
                    </div>

                    {!step3Solved ? (
                      <div className="space-y-2.5">
                        {step3Options.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectOption('step3', opt)}
                            className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all cursor-pointer flex items-center justify-between ${
                              shakingOptionId === opt.id
                                ? 'animate-shake border-red-400 bg-red-50 text-red-900 ring-2 ring-red-300'
                                : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-[#252735] text-[#252735]'
                            }`}
                          >
                            <span>{opt.text}</span>
                            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
                              Выбрать
                            </span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 text-amber-900 font-bold text-sm">
                          <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                          <span>Отлично! Ниндзя ожил в динамичной боевой позе с огненной спиралью! (+100 XP)</span>
                        </div>
                        <button
                          onClick={() => handleNextStep('step4')}
                          className="btn-3d-lime shrink-0 px-4 py-2.5 rounded-xl font-display font-black text-xs sm:text-sm border-2 border-[#252735] cursor-pointer"
                        >
                          Шаг 4: Чистый фон ➔
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4 Question & Options */}
                {currentStep === 'step4' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Scan className="w-5 h-5 text-pink-500" />
                      <h4 className="font-display font-black text-base sm:text-lg text-[#252735]">
                        Вопрос 4: Что поможет подготовить изображение для 3D?
                      </h4>
                    </div>

                    {!step4Solved ? (
                      <div className="space-y-2.5">
                        {step4Options.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectOption('step4', opt)}
                            className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all cursor-pointer flex items-center justify-between ${
                              shakingOptionId === opt.id
                                ? 'animate-shake border-red-400 bg-red-50 text-red-900 ring-2 ring-red-300'
                                : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-[#252735] text-[#252735]'
                            }`}
                          >
                            <span>{opt.text}</span>
                            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-200 text-slate-700">
                              Выбрать
                            </span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-[#B9F24D]/25 border-2 border-[#252735] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 text-[#252735] font-bold text-sm">
                          <Trophy className="w-5 h-5 text-amber-600 shrink-0" />
                          <span>Идеально! Чистый белый фон и полный рост гарантируют лёгкое создание 3D-модели! (+150 XP)</span>
                        </div>
                        <button
                          onClick={() => handleNextStep('finale')}
                          className="btn-3d-lime shrink-0 px-4 py-2.5 rounded-xl font-display font-black text-xs sm:text-sm border-2 border-[#252735] cursor-pointer"
                        >
                          Секреты промпта 🏆
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Friendly Hint from Pix on Wrong Choice */}
                {wrongHint && (
                  <div className="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-start gap-2.5 text-xs text-amber-900 font-bold leading-relaxed animate-dressup-pop">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-amber-800 uppercase font-black tracking-wider text-[10px] block">
                        Подсказка от Пикса:
                      </span>
                      {wrongHint}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* FINALE SCREEN: The 4 Secrets of a Great 3D Prompt */
        <div className="space-y-6">
          <div className="bg-white border-3 border-[#252735] rounded-3xl p-6 sm:p-8 shadow-[0_6px_0_#252735] space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-[#B9F24D] text-[#252735] border border-[#252735] font-black text-xs uppercase tracking-wider">
                Мини-игра пройдена! +450 XP
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#252735]">
                4 Секрета отличного промпта для 3D
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Ты помог Пиксу достичь цели: создать огненного ниндзя в стиле Roblox на белом фоне! Запомни эти 4 правила:
              </p>
            </div>

            {/* 4 Secrets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Кто твой герой? */}
              <div className="p-4 rounded-2xl border-2 border-slate-200 bg-amber-50/50 space-y-2.5 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm">
                    1
                  </div>
                  <h4 className="font-display font-black text-sm sm:text-base text-[#252735]">
                    Кто твой герой?
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Опиши роль и суперспособность.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-amber-200/80 text-[11px] text-amber-900 leading-snug">
                  <span className="font-bold text-amber-800 block text-[10px] uppercase tracking-wider mb-0.5">
                    Пример:
                  </span>
                  Кибер-ниндзя, управляющий огнем
                </div>
              </div>

              {/* Card 2: Как он выглядит? */}
              <div className="p-4 rounded-2xl border-2 border-slate-200 bg-sky-50/50 space-y-2.5 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-black text-sm">
                    2
                  </div>
                  <h4 className="font-display font-black text-sm sm:text-base text-[#252735]">
                    Как он выглядит?
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Внешность, костюм, цвета, особые детали.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-sky-200/80 text-[11px] text-sky-900 leading-snug">
                  <span className="font-bold text-sky-800 block text-[10px] uppercase tracking-wider mb-0.5">
                    Пример:
                  </span>
                  Синий костюм и голубое пламя в руках
                </div>
              </div>

              {/* Card 3: Какой стиль? */}
              <div className="p-4 rounded-2xl border-2 border-slate-200 bg-purple-50/50 space-y-2.5 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-sm">
                    3
                  </div>
                  <h4 className="font-display font-black text-sm sm:text-base text-[#252735]">
                    Какой стиль?
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Визуальный стиль.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-purple-200/80 text-[11px] text-purple-900 leading-snug">
                  <span className="font-bold text-purple-800 block text-[10px] uppercase tracking-wider mb-0.5">
                    Пример:
                  </span>
                  3D, 2D, реализм или блочный (как в Roblox)
                </div>
              </div>

              {/* Card 4: Какой фон? */}
              <div className="p-4 rounded-2xl border-2 border-slate-200 bg-emerald-50/50 space-y-2.5 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm">
                    4
                  </div>
                  <h4 className="font-display font-black text-sm sm:text-base text-[#252735]">
                    Какой фон?
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Чистый белый (для 3D) или описание локации.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-emerald-200/80 text-[11px] text-emerald-900 leading-snug">
                  <span className="font-bold text-emerald-800 block text-[10px] uppercase tracking-wider mb-0.5">
                    Пример:
                  </span>
                  Чистый белый (для 3D) или описание локации (город, лес)
                </div>
              </div>
            </div>

            {/* Connection with User's Own Character Prompt */}
            <div className="bg-[#B9F24D]/20 border-2 border-[#252735] rounded-2xl p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-800" />
                  <span className="font-display font-black text-xs sm:text-sm text-[#252735]">
                    Твой персонаж: «{character.name || 'Герой'}»
                  </span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-[#252735] text-[#252735]">
                  Секреты промпта применены ✨
                </span>
              </div>
              <p className="text-xs text-slate-700 font-medium">
                Посмотри, как твои выборы на Этапах 1 и 2 уже автоматически собрались по этим четырем правилам:
              </p>
              <div className="bg-white border-2 border-[#252735] rounded-xl p-3 font-mono text-xs sm:text-sm text-[#252735] leading-relaxed shadow-xs selection:bg-[#B9F24D]">
                {buildLiveUserPrompt({ ...character, hasLearnedStyle: true }) ? (
                  `«${buildLiveUserPrompt({ ...character, hasLearnedStyle: true })}»`
                ) : (
                  <span className="text-slate-400 italic font-sans text-xs">
                    Твой промпт будет собираться здесь по мере того, как ты выбираешь детали для героя...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-3">
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

        {currentStep === 'finale' && (
          <button
            onClick={handleFinish}
            className="btn-3d-lime flex items-center gap-2.5 px-8 py-4 rounded-2xl font-display font-black text-lg cursor-pointer border-2 border-[#252735]"
          >
            <span>Дальше: Собрать техзадание</span>
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </button>
        )}
      </div>
    </div>
  );
};
