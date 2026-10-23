import React, { useState } from 'react';
import { CharacterData, AppearanceState } from '../../types/avatar';
import { COLOR_PALETTES, OUTFITS, ACCESSORIES, EXPRESSIONS, SPECIAL_GEAR, ROLES } from '../../data/labData';
import { MascotPixel } from '../MascotPixel';
import { playClickSound, playSelectSound, playSuccessSound } from '../../services/soundEffects';
import {
  ArrowRight,
  ArrowLeft,
  Palette,
  Shirt,
  Shield,
  Smile,
  Sparkles,
  Check,
  Pipette,
  Wand2,
} from 'lucide-react';

interface Stage2AppearanceProps {
  character: CharacterData;
  onUpdate: (data: Partial<CharacterData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

type AppearanceTab = 'colors' | 'outfit' | 'accessory' | 'expression' | 'gear';

export const Stage2Appearance: React.FC<Stage2AppearanceProps> = ({
  character,
  onUpdate,
  onNext,
  onPrev,
}) => {
  const [activeTab, setActiveTab] = useState<AppearanceTab>('colors');
  const [appearance, setAppearance] = useState<AppearanceState>(character.appearance);
  const [justSelectedId, setJustSelectedId] = useState<string | null>(null);

  // Custom states across categories
  const [customPaletteName, setCustomPaletteName] = useState<string>(
    appearance.colorPalette.id === 'custom_palette' ? appearance.colorPalette.name : 'Мой цвет'
  );
  const [customPrimary, setCustomPrimary] = useState<string>(
    appearance.colorPalette.id === 'custom_palette' ? appearance.colorPalette.primary : '#38BDF8'
  );
  const [customSecondary, setCustomSecondary] = useState<string>(
    appearance.colorPalette.id === 'custom_palette' ? appearance.colorPalette.secondary : '#FFFFFF'
  );
  const [customAccent, setCustomAccent] = useState<string>(
    appearance.colorPalette.id === 'custom_palette' ? appearance.colorPalette.accent : '#F43F5E'
  );

  const [customOutfitName, setCustomOutfitName] = useState<string>(
    appearance.outfit.id === 'custom_outfit' ? appearance.outfit.name : 'Костюм из облаков'
  );

  const [customAccessoryName, setCustomAccessoryName] = useState<string>(
    appearance.accessory.id === 'custom_accessory' ? appearance.accessory.name : 'Летающий скейт'
  );

  const [customExpressionName, setCustomExpressionName] = useState<string>(
    appearance.expression.id === 'custom_expression' ? appearance.expression.name : 'Супер-восторг'
  );
  const [customExpressionEmoji, setCustomExpressionEmoji] = useState<string>(
    appearance.expression.id === 'custom_expression' ? appearance.expression.emoji : '✨'
  );

  const [customGearName, setCustomGearName] = useState<string>(
    appearance.specialGear.id === 'custom_gear' ? appearance.specialGear.name : 'Лазерный компас'
  );

  const roleMeta = ROLES.find((r) => r.id === character.role) || ROLES[0];
  const roleTitle =
    character.role === 'custom' && character.customRoleTitle
      ? character.customRoleTitle
      : roleMeta.title;

  const triggerSelectEffect = (id: string) => {
    playSelectSound();
    setJustSelectedId(id);
    setTimeout(() => {
      setJustSelectedId(null);
    }, 400);
  };

  // Preset Handlers
  const updatePalette = (palette: (typeof COLOR_PALETTES)[0]) => {
    triggerSelectEffect(palette.id);
    const updated: AppearanceState = { ...appearance, colorPalette: palette };
    setAppearance(updated);
    onUpdate({ appearance: updated });
  };

  const updateOutfit = (outfit: (typeof OUTFITS)[0]) => {
    triggerSelectEffect(outfit.id);
    const updated: AppearanceState = { ...appearance, outfit };
    setAppearance(updated);
    onUpdate({ appearance: updated });
  };

  const updateAccessory = (accessory: (typeof ACCESSORIES)[0]) => {
    triggerSelectEffect(accessory.id);
    const updated: AppearanceState = { ...appearance, accessory };
    setAppearance(updated);
    onUpdate({ appearance: updated });
  };

  const updateExpression = (expression: (typeof EXPRESSIONS)[0]) => {
    triggerSelectEffect(expression.id);
    const updated: AppearanceState = { ...appearance, expression };
    setAppearance(updated);
    onUpdate({ appearance: updated });
  };

  const updateGear = (gear: (typeof SPECIAL_GEAR)[0]) => {
    triggerSelectEffect(gear.id);
    const updated: AppearanceState = { ...appearance, specialGear: gear };
    setAppearance(updated);
    onUpdate({ appearance: updated });
  };

  // Custom Handlers
  const applyCustomColor = (primary: string, secondary: string, accent: string, name?: string) => {
    const palName = name !== undefined ? name : customPaletteName;
    const customPalette = {
      id: 'custom_palette',
      name: palName.trim() || 'Свой цвет',
      primary,
      secondary,
      accent,
    };
    const updated: AppearanceState = { ...appearance, colorPalette: customPalette };
    setAppearance(updated);
    onUpdate({ appearance: updated });
  };

  const applyCustomOutfit = (name: string) => {
    const customOutfit = {
      id: 'custom_outfit',
      name: name.trim() || 'Свой костюм',
      description: 'Уникальный авторский костюм персонажа',
    };
    const updated: AppearanceState = { ...appearance, outfit: customOutfit };
    setAppearance(updated);
    onUpdate({ appearance: updated });
  };

  const applyCustomAccessory = (name: string) => {
    const customAcc = {
      id: 'custom_accessory',
      name: name.trim() || 'Свой аксессуар',
      description: 'Уникальный авторский аксессуар',
    };
    const updated: AppearanceState = { ...appearance, accessory: customAcc };
    setAppearance(updated);
    onUpdate({ appearance: updated });
  };

  const applyCustomExpression = (name: string, emoji: string) => {
    const customExpr = {
      id: 'custom_expression',
      name: name.trim() || 'Своя эмоция',
      emoji: emoji || '✨',
      description: 'Уникальное авторское выражение лица',
    };
    const updated: AppearanceState = { ...appearance, expression: customExpr };
    setAppearance(updated);
    onUpdate({ appearance: updated });
  };

  const applyCustomGear = (name: string) => {
    const customG = {
      id: 'custom_gear',
      name: name.trim() || 'Своя деталь',
      description: 'Уникальная авторская технологичная деталь',
    };
    const updated: AppearanceState = { ...appearance, specialGear: customG };
    setAppearance(updated);
    onUpdate({ appearance: updated });
  };

  const handleNext = () => {
    playSuccessSound();
    onNext();
  };

  // Dynamic educational mascot tips per tab
  const getTabMascotContent = () => {
    switch (activeTab) {
      case 'colors':
        return {
          speech:
            'Цвета задают характер героя! Салатовый заряжает энергией, а глубокий графит окутывает тайной!',
          tip: 'Выбирай готовую палитру или настрой свои любимые цвета пипеткой!',
        };
      case 'outfit':
        return {
          speech:
            'Выбирай силуэт! В 3D-моделировании важно, чтобы форма костюма была выразительной и узнаваемой издалека!',
          tip: 'Выбери один из 6 крутых костюмов или назови свой собственный в поле «Свой вариант»!',
        };
      case 'accessory':
        return {
          speech:
            'Аксессуар — визитная карточка персонажа! Двухтурбинный джетпак или голо-визор сразу приковывают внимание!',
          tip: 'Один крупный запоминающийся предмет работает в концепте лучше, чем десяток мелких деталей!',
        };
      case 'expression':
        return {
          speech:
            'Эмоция оживляет арт! Уверенная улыбка или исследовательский восторг сразу показывают дух героя!',
          tip: 'Аниматоры всегда начинают с выражения глаз — именно они передают эмоции персонажа!',
        };
      case 'gear':
        return {
          speech:
            'Особенная фишка — секретный штрих! Светодиодные кроссовки или голо-карта сделают героя неповторимым!',
          tip: 'Уникальная технологичная деталь вызывает восторг у друзей, когда они рассматривают концепт-доску!',
        };
    }
  };

  const currentMascot = getTabMascotContent();

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Mascot Guidance with dynamic educational speech and tips */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs">
        <MascotPixel
          mood="thinking"
          speechText={currentMascot.speech}
          tip={currentMascot.tip}
          showHint={false}
        />
      </div>

      {/* Main Dress-up Workshop Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Category Navigator & Illustrated Options (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl overflow-x-auto border border-slate-200">
            <button
              onClick={() => {
                playClickSound();
                setActiveTab('colors');
              }}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'colors'
                  ? 'bg-white text-[#252735] shadow-xs'
                  : 'text-slate-600 hover:text-[#252735]'
              }`}
            >
              <Palette className="w-4 h-4 text-emerald-500" />
              <span>Палитра</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                setActiveTab('outfit');
              }}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'outfit'
                  ? 'bg-white text-[#252735] shadow-xs'
                  : 'text-slate-600 hover:text-[#252735]'
              }`}
            >
              <Shirt className="w-4 h-4 text-sky-500" />
              <span>Костюм</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                setActiveTab('accessory');
              }}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'accessory'
                  ? 'bg-white text-[#252735] shadow-xs'
                  : 'text-slate-600 hover:text-[#252735]'
              }`}
            >
              <Shield className="w-4 h-4 text-amber-500" />
              <span>Аксессуар</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                setActiveTab('expression');
              }}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'expression'
                  ? 'bg-white text-[#252735] shadow-xs'
                  : 'text-slate-600 hover:text-[#252735]'
              }`}
            >
              <Smile className="w-4 h-4 text-pink-500" />
              <span>Эмоция</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                setActiveTab('gear');
              }}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'gear'
                  ? 'bg-white text-[#252735] shadow-xs'
                  : 'text-slate-600 hover:text-[#252735]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>Особая деталь</span>
            </button>
          </div>

          {/* Tab Content Cards Container */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs min-h-[460px] flex flex-col justify-between">
            {/* 1. COLOR PALETTES (6 Presets + 7th Custom Color Card) */}
            {activeTab === 'colors' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-black text-lg text-[#252735]">
                    Цветовая гамма костюма
                  </h3>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    6 вариантов + свой цвет
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                  {/* Preset Color Palettes (6 items) */}
                  {COLOR_PALETTES.map((pal) => {
                    const isSelected = appearance.colorPalette.id === pal.id;
                    const isPopping = justSelectedId === pal.id;
                    return (
                      <div
                        key={pal.id}
                        onClick={() => updatePalette(pal)}
                        className={`group relative p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                          isPopping ? 'animate-dressup-pop' : ''
                        } ${
                          isSelected
                            ? 'border-[#252735] bg-[#B9F24D]/15 shadow-sm ring-3 ring-[#B9F24D]/40'
                            : 'border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100/80'
                        }`}
                      >
                        {/* Check Badge */}
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#B9F24D] border-2 border-[#252735] flex items-center justify-center text-[#252735] z-10 shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}

                        <div className="space-y-2.5">
                          {/* Large Color Swatches Grouped Together */}
                          <div className="flex items-center justify-center gap-2 p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                            <div
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-slate-300 shadow-xs transition-transform group-hover:scale-105"
                              style={{ backgroundColor: pal.primary }}
                              title={`Основной: ${pal.primary}`}
                            />
                            <div
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-slate-300 shadow-xs transition-transform group-hover:scale-105"
                              style={{ backgroundColor: pal.secondary }}
                              title={`Дополнительный: ${pal.secondary}`}
                            />
                            <div
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-slate-300 shadow-xs transition-transform group-hover:scale-105"
                              style={{ backgroundColor: pal.accent }}
                              title={`Акцент: ${pal.accent}`}
                            />
                          </div>

                          {/* Palette Title */}
                          <div className="text-center">
                            <span className="font-display font-black text-xs sm:text-sm text-[#252735] block truncate">
                              {pal.name}
                            </span>
                            <span className="text-[10px] text-slate-500 font-semibold block truncate">
                              {pal.primary} • {pal.accent}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* 7th Card: "Свой цвет" (Custom Colors with HTML color pickers + custom name) */}
                  {(() => {
                    const isCustomSelected = appearance.colorPalette.id === 'custom_palette';
                    return (
                      <div
                        onClick={() => {
                          if (!isCustomSelected) {
                            applyCustomColor(
                              customPrimary,
                              customSecondary,
                              customAccent,
                              customPaletteName
                            );
                          }
                        }}
                        className={`group relative p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                          isCustomSelected
                            ? 'border-[#252735] bg-sky-50 shadow-sm ring-3 ring-sky-300'
                            : 'border-dashed border-sky-300 hover:border-sky-400 bg-sky-50/50 hover:bg-sky-50'
                        }`}
                      >
                        {/* Check Badge */}
                        {isCustomSelected && (
                          <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-sky-400 border-2 border-[#252735] flex items-center justify-center text-white z-10 shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}

                        <div className="space-y-2">
                          {/* Pickers */}
                          <div className="flex items-center justify-center gap-2 p-2 bg-white rounded-xl border border-slate-200 shadow-2xs">
                            {/* Primary Picker */}
                            <label
                              className="relative cursor-pointer group/picker"
                              title="Выбрать основной цвет"
                            >
                              <div
                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-slate-400 shadow-xs flex items-center justify-center transition-transform hover:scale-110"
                                style={{ backgroundColor: customPrimary }}
                              >
                                <Pipette className="w-3 h-3 text-white drop-shadow-xs" />
                              </div>
                              <input
                                type="color"
                                value={customPrimary}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setCustomPrimary(val);
                                  applyCustomColor(
                                    val,
                                    customSecondary,
                                    customAccent,
                                    customPaletteName
                                  );
                                }}
                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                              />
                            </label>

                            {/* Secondary Picker */}
                            <label
                              className="relative cursor-pointer group/picker"
                              title="Выбрать фоновый цвет"
                            >
                              <div
                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-slate-400 shadow-xs flex items-center justify-center transition-transform hover:scale-110"
                                style={{ backgroundColor: customSecondary }}
                              >
                                <Pipette className="w-3 h-3 text-slate-700 drop-shadow-xs" />
                              </div>
                              <input
                                type="color"
                                value={customSecondary}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setCustomSecondary(val);
                                  applyCustomColor(
                                    customPrimary,
                                    val,
                                    customAccent,
                                    customPaletteName
                                  );
                                }}
                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                              />
                            </label>

                            {/* Accent Picker */}
                            <label
                              className="relative cursor-pointer group/picker"
                              title="Выбрать цвет акцента"
                            >
                              <div
                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-slate-400 shadow-xs flex items-center justify-center transition-transform hover:scale-110"
                                style={{ backgroundColor: customAccent }}
                              >
                                <Pipette className="w-3 h-3 text-white drop-shadow-xs" />
                              </div>
                              <input
                                type="color"
                                value={customAccent}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setCustomAccent(val);
                                  applyCustomColor(
                                    customPrimary,
                                    customSecondary,
                                    val,
                                    customPaletteName
                                  );
                                }}
                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                              />
                            </label>
                          </div>

                          <div className="text-center">
                            <span className="font-display font-black text-xs sm:text-sm text-[#252735] flex items-center justify-center gap-1">
                              <Wand2 className="w-3.5 h-3.5 text-sky-500" />
                              <span>Свой цвет</span>
                            </span>
                            <input
                              type="text"
                              value={customPaletteName}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => {
                                const val = e.target.value;
                                setCustomPaletteName(val);
                                applyCustomColor(customPrimary, customSecondary, customAccent, val);
                              }}
                              placeholder="Название цвета"
                              className="w-full text-[11px] font-bold text-center mt-1 py-1 px-1.5 rounded-lg border border-slate-300 focus:outline-none focus:border-sky-500 bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* 2. OUTFIT (6 3D Pixar Outfits + 7th Custom Card with Text Input) */}
            {activeTab === 'outfit' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-black text-lg text-[#252735]">
                    Одежда и костюм
                  </h3>
                  <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                    6 костюмов + свой вариант
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                  {OUTFITS.map((outfit) => {
                    const isSelected = appearance.outfit.id === outfit.id;
                    const isPopping = justSelectedId === outfit.id;
                    return (
                      <div
                        key={outfit.id}
                        onClick={() => updateOutfit(outfit)}
                        className={`group relative p-2.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-between ${
                          isPopping ? 'animate-dressup-pop' : ''
                        } ${
                          isSelected
                            ? 'border-[#252735] bg-[#62C9F5]/20 shadow-sm ring-3 ring-[#62C9F5]/40'
                            : 'border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100/80'
                        }`}
                      >
                        {/* Selected Check Badge */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#62C9F5] border-2 border-[#252735] flex items-center justify-center text-[#252735] z-10 shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}

                        {/* Rich 3D Pixar Illustration */}
                        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-white border border-slate-200 shadow-2xs group-hover:scale-102 transition-transform">
                          <img
                            src={outfit.image}
                            alt={outfit.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Outfit Short Title */}
                        <div className="mt-2 text-center w-full px-1">
                          <span className="font-display font-black text-xs sm:text-sm text-[#252735] block truncate">
                            {outfit.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* 7th Card: "Свой вариант" with Creative Icon and Inline Text Input */}
                  {(() => {
                    const isCustomSelected = appearance.outfit.id === 'custom_outfit';
                    return (
                      <div
                        onClick={() => {
                          if (!isCustomSelected) {
                            applyCustomOutfit(customOutfitName);
                          }
                        }}
                        className={`group relative p-2.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-between ${
                          isCustomSelected
                            ? 'border-[#252735] bg-sky-50 shadow-sm ring-3 ring-sky-300'
                            : 'border-dashed border-sky-300 hover:border-sky-400 bg-sky-50/50 hover:bg-sky-50'
                        }`}
                      >
                        {/* Selected Check Badge */}
                        {isCustomSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-sky-400 border-2 border-[#252735] flex items-center justify-center text-white z-10 shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}

                        {/* Creative Custom Icon Banner */}
                        <div className="w-full aspect-[4/3] rounded-xl flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-indigo-50 to-purple-100 border border-sky-200 shadow-2xs group-hover:scale-102 transition-transform">
                          <Wand2 className="w-8 h-8 text-sky-600 mb-1" />
                          <span className="text-[10px] font-bold text-sky-700 bg-white/80 px-2 py-0.5 rounded-full border border-sky-200">
                            Твой дизайн
                          </span>
                        </div>

                        {/* Custom Outfit Title & Text Input */}
                        <div className="mt-2 text-center w-full px-1">
                          <span className="font-display font-black text-xs sm:text-sm text-[#252735] block truncate">
                            Свой вариант
                          </span>
                          <input
                            type="text"
                            value={customOutfitName}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCustomOutfitName(val);
                              applyCustomOutfit(val);
                            }}
                            placeholder="Назови костюм..."
                            className="w-full text-[11px] font-bold text-center mt-1 py-1 px-1.5 rounded-lg border border-slate-300 focus:outline-none focus:border-sky-500 bg-white"
                          />
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* 3. ACCESSORIES (6 3D Pixar Accessories + 7th Custom Card with Text Input) */}
            {activeTab === 'accessory' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-black text-lg text-[#252735]">
                    Аксессуар и экипировка
                  </h3>
                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    6 аксессуаров + свой вариант
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                  {ACCESSORIES.map((acc) => {
                    const isSelected = appearance.accessory.id === acc.id;
                    const isPopping = justSelectedId === acc.id;
                    return (
                      <div
                        key={acc.id}
                        onClick={() => updateAccessory(acc)}
                        className={`group relative p-2.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-between ${
                          isPopping ? 'animate-dressup-pop' : ''
                        } ${
                          isSelected
                            ? 'border-[#252735] bg-[#FFB9D5]/25 shadow-sm ring-3 ring-[#FFB9D5]/50'
                            : 'border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100/80'
                        }`}
                      >
                        {/* Selected Check Badge */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#FFB9D5] border-2 border-[#252735] flex items-center justify-center text-[#252735] z-10 shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}

                        {/* Rich 3D Pixar Illustration */}
                        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-white border border-slate-200 shadow-2xs group-hover:scale-102 transition-transform">
                          <img
                            src={acc.image}
                            alt={acc.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Accessory Short Title */}
                        <div className="mt-2 text-center w-full px-1">
                          <span className="font-display font-black text-xs sm:text-sm text-[#252735] block truncate">
                            {acc.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* 7th Card: "Свой вариант" with Creative Icon and Inline Text Input */}
                  {(() => {
                    const isCustomSelected = appearance.accessory.id === 'custom_accessory';
                    return (
                      <div
                        onClick={() => {
                          if (!isCustomSelected) {
                            applyCustomAccessory(customAccessoryName);
                          }
                        }}
                        className={`group relative p-2.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-between ${
                          isCustomSelected
                            ? 'border-[#252735] bg-amber-50 shadow-sm ring-3 ring-amber-300'
                            : 'border-dashed border-amber-300 hover:border-amber-400 bg-amber-50/50 hover:bg-amber-50'
                        }`}
                      >
                        {/* Selected Check Badge */}
                        {isCustomSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-amber-400 border-2 border-[#252735] flex items-center justify-center text-white z-10 shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}

                        {/* Creative Custom Icon Banner */}
                        <div className="w-full aspect-[4/3] rounded-xl flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 border border-amber-200 shadow-2xs group-hover:scale-102 transition-transform">
                          <Wand2 className="w-8 h-8 text-amber-600 mb-1" />
                          <span className="text-[10px] font-bold text-amber-700 bg-white/80 px-2 py-0.5 rounded-full border border-amber-200">
                            Твой аксессуар
                          </span>
                        </div>

                        {/* Custom Accessory Title & Text Input */}
                        <div className="mt-2 text-center w-full px-1">
                          <span className="font-display font-black text-xs sm:text-sm text-[#252735] block truncate">
                            Свой вариант
                          </span>
                          <input
                            type="text"
                            value={customAccessoryName}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCustomAccessoryName(val);
                              applyCustomAccessory(val);
                            }}
                            placeholder="Назови аксессуар..."
                            className="w-full text-[11px] font-bold text-center mt-1 py-1 px-1.5 rounded-lg border border-slate-300 focus:outline-none focus:border-amber-500 bg-white"
                          />
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* 4. EXPRESSIONS (6 Expressions + 7th Custom Card with Text Input) */}
            {activeTab === 'expression' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-black text-lg text-[#252735]">
                    Выражение лица и эмоция
                  </h3>
                  <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-full border border-pink-200">
                    6 эмоций + свой вариант
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                  {EXPRESSIONS.map((expr) => {
                    const isSelected = appearance.expression.id === expr.id;
                    const isPopping = justSelectedId === expr.id;
                    return (
                      <div
                        key={expr.id}
                        onClick={() => updateExpression(expr)}
                        className={`group relative p-2.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-between ${
                          isPopping ? 'animate-dressup-pop' : ''
                        } ${
                          isSelected
                            ? 'border-[#252735] bg-[#BDA7FF]/20 shadow-sm ring-3 ring-[#BDA7FF]/40'
                            : 'border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100/80'
                        }`}
                      >
                        {/* Selected Check Badge */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#BDA7FF] border-2 border-[#252735] flex items-center justify-center text-[#252735] z-10 shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}

                        {/* Large Expressive Emoji Portrait */}
                        <div className="w-full aspect-[4/3] rounded-xl flex items-center justify-center bg-gradient-to-br from-slate-100 to-white border border-slate-200 shadow-2xs group-hover:scale-105 transition-transform">
                          <span className="text-4xl select-none filter drop-shadow-sm">
                            {expr.emoji}
                          </span>
                        </div>

                        {/* Expression Short Title */}
                        <div className="mt-2 text-center w-full px-1">
                          <span className="font-display font-black text-xs sm:text-sm text-[#252735] block truncate">
                            {expr.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* 7th Card: "Свой вариант" with Emoji selection + Text Input */}
                  {(() => {
                    const isCustomSelected = appearance.expression.id === 'custom_expression';
                    const quickEmojis = ['✨', '🔥', '😺', '🦊', '⚡', '🌈'];
                    return (
                      <div
                        onClick={() => {
                          if (!isCustomSelected) {
                            applyCustomExpression(customExpressionName, customExpressionEmoji);
                          }
                        }}
                        className={`group relative p-2.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-between ${
                          isCustomSelected
                            ? 'border-[#252735] bg-pink-50 shadow-sm ring-3 ring-pink-300'
                            : 'border-dashed border-pink-300 hover:border-pink-400 bg-pink-50/50 hover:bg-pink-50'
                        }`}
                      >
                        {/* Selected Check Badge */}
                        {isCustomSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-pink-400 border-2 border-[#252735] flex items-center justify-center text-white z-10 shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}

                        {/* Emoji Quick Picker Container */}
                        <div className="w-full aspect-[4/3] rounded-xl flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 border border-pink-200 shadow-2xs p-1">
                          <span className="text-3xl mb-1 select-none filter drop-shadow-sm">
                            {customExpressionEmoji}
                          </span>
                          <div className="flex gap-1">
                            {quickEmojis.map((em) => (
                              <button
                                key={em}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCustomExpressionEmoji(em);
                                  applyCustomExpression(customExpressionName, em);
                                }}
                                className={`text-xs p-1 rounded-md transition-transform hover:scale-125 cursor-pointer ${
                                  customExpressionEmoji === em ? 'bg-white shadow-xs' : ''
                                }`}
                              >
                                {em}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Custom Expression Title & Text Input */}
                        <div className="mt-2 text-center w-full px-1">
                          <span className="font-display font-black text-xs sm:text-sm text-[#252735] block truncate">
                            Свой вариант
                          </span>
                          <input
                            type="text"
                            value={customExpressionName}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCustomExpressionName(val);
                              applyCustomExpression(val, customExpressionEmoji);
                            }}
                            placeholder="Назови эмоцию..."
                            className="w-full text-[11px] font-bold text-center mt-1 py-1 px-1.5 rounded-lg border border-slate-300 focus:outline-none focus:border-pink-500 bg-white"
                          />
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* 5. SPECIAL GEAR (6 3D Pixar Gear + 7th Custom Card with Text Input) */}
            {activeTab === 'gear' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-black text-lg text-[#252735]">
                    Особенная уникальная деталь
                  </h3>
                  <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                    6 деталей + свой вариант
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                  {SPECIAL_GEAR.map((gear) => {
                    const isSelected = appearance.specialGear.id === gear.id;
                    const isPopping = justSelectedId === gear.id;
                    return (
                      <div
                        key={gear.id}
                        onClick={() => updateGear(gear)}
                        className={`group relative p-2.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-between ${
                          isPopping ? 'animate-dressup-pop' : ''
                        } ${
                          isSelected
                            ? 'border-[#252735] bg-[#B9F24D]/20 shadow-sm ring-3 ring-[#B9F24D]/50'
                            : 'border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100/80'
                        }`}
                      >
                        {/* Selected Check Badge */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#B9F24D] border-2 border-[#252735] flex items-center justify-center text-[#252735] z-10 shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}

                        {/* Rich 3D Pixar Illustration */}
                        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-white border border-slate-200 shadow-2xs group-hover:scale-102 transition-transform">
                          <img
                            src={gear.image}
                            alt={gear.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Special Gear Short Title */}
                        <div className="mt-2 text-center w-full px-1">
                          <span className="font-display font-black text-xs sm:text-sm text-[#252735] block truncate">
                            {gear.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* 7th Card: "Свой вариант" with Creative Icon and Inline Text Input */}
                  {(() => {
                    const isCustomSelected = appearance.specialGear.id === 'custom_gear';
                    return (
                      <div
                        onClick={() => {
                          if (!isCustomSelected) {
                            applyCustomGear(customGearName);
                          }
                        }}
                        className={`group relative p-2.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-between ${
                          isCustomSelected
                            ? 'border-[#252735] bg-purple-50 shadow-sm ring-3 ring-purple-300'
                            : 'border-dashed border-purple-300 hover:border-purple-400 bg-purple-50/50 hover:bg-purple-50'
                        }`}
                      >
                        {/* Selected Check Badge */}
                        {isCustomSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-purple-400 border-2 border-[#252735] flex items-center justify-center text-white z-10 shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}

                        {/* Creative Custom Icon Banner */}
                        <div className="w-full aspect-[4/3] rounded-xl flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-fuchsia-50 to-pink-100 border border-purple-200 shadow-2xs group-hover:scale-102 transition-transform">
                          <Sparkles className="w-8 h-8 text-purple-600 mb-1" />
                          <span className="text-[10px] font-bold text-purple-700 bg-white/80 px-2 py-0.5 rounded-full border border-purple-200">
                            Твоя деталь
                          </span>
                        </div>

                        {/* Custom Gear Title & Text Input */}
                        <div className="mt-2 text-center w-full px-1">
                          <span className="font-display font-black text-xs sm:text-sm text-[#252735] block truncate">
                            Свой вариант
                          </span>
                          <input
                            type="text"
                            value={customGearName}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCustomGearName(val);
                              applyCustomGear(val);
                            }}
                            placeholder="Назови деталь..."
                            className="w-full text-[11px] font-bold text-center mt-1 py-1 px-1.5 rounded-lg border border-slate-300 focus:outline-none focus:border-purple-500 bg-white"
                          />
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* Quick Next Category Navigation Bullets */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Кликни по предмету, чтобы добавить его на концепт-доску</span>
              <div className="flex gap-1.5">
                {(['colors', 'outfit', 'accessory', 'expression', 'gear'] as AppearanceTab[]).map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        activeTab === tab ? 'w-6 bg-[#252735]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Visual Collage ("Mood Board" / Концепт-борд) (5 cols) */}
        <div className="lg:col-span-5 bg-white border-3 border-[#252735] rounded-3xl p-5 sm:p-6 shadow-[0_6px_0_#252735] space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#B9F24D] border border-[#252735]" />
              <h3 className="font-display font-black text-lg text-[#252735]">
                Мой проект: концепт-доска
              </h3>
            </div>
            <span className="text-xs font-black text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-300">
              Mood Board
            </span>
          </div>

          {/* Hero Profile Header */}
          <div className="bg-gradient-to-r from-slate-900 via-[#252735] to-slate-900 text-white rounded-2xl p-3.5 border-2 border-[#252735] flex items-center justify-between">
            <div className="min-w-0">
              <h4 className="font-display font-black text-base truncate text-white">
                {character.name || 'Безымянный Герой'}
              </h4>
              <p className="text-xs font-bold text-slate-300 truncate">
                {roleTitle}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-xl shrink-0">
              {appearance.expression.emoji}
            </div>
          </div>

          {/* VISUAL COLLAGE (MOOD BOARD TILES) */}
          <div className="space-y-3">
            {/* 1. Main Feature Tile: Selected Suit */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-50 group">
              <div className="aspect-[16/10] w-full overflow-hidden bg-white">
                {appearance.outfit.image ? (
                  <img
                    src={appearance.outfit.image}
                    alt={appearance.outfit.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 text-sky-600 p-4">
                    <Wand2 className="w-12 h-12 mb-2 animate-bounce" />
                    <span className="font-display font-black text-sm text-[#252735]">
                      {appearance.outfit.name}
                    </span>
                    <span className="text-xs text-sky-600 font-bold mt-0.5">
                      Авторский концепт костюма
                    </span>
                  </div>
                )}
              </div>
              <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Костюм героя
                  </span>
                  <span className="font-display font-black text-sm text-[#252735] truncate block">
                    {appearance.outfit.name}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-lg border border-sky-200 shrink-0">
                  {appearance.outfit.image ? 'Основа' : '✨ Свой'}
                </span>
              </div>
            </div>

            {/* 2. Two-Column Grid: Accessory + Special Gear */}
            <div className="grid grid-cols-2 gap-3">
              {/* Accessory Tile */}
              <div className="rounded-2xl overflow-hidden border-2 border-slate-200 bg-white flex flex-col">
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-50">
                  {appearance.accessory.image ? (
                    <img
                      src={appearance.accessory.image}
                      alt={appearance.accessory.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 text-amber-600 p-2 text-center">
                      <Wand2 className="w-7 h-7 mb-1" />
                      <span className="text-[11px] font-bold text-[#252735] line-clamp-1">
                        {appearance.accessory.name}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-2.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Аксессуар
                  </span>
                  <span className="font-display font-black text-xs text-[#252735] truncate block">
                    {appearance.accessory.name}
                  </span>
                </div>
              </div>

              {/* Special Gear Tile */}
              <div className="rounded-2xl overflow-hidden border-2 border-slate-200 bg-white flex flex-col">
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-50">
                  {appearance.specialGear.image ? (
                    <img
                      src={appearance.specialGear.image}
                      alt={appearance.specialGear.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 text-purple-600 p-2 text-center">
                      <Sparkles className="w-7 h-7 mb-1" />
                      <span className="text-[11px] font-bold text-[#252735] line-clamp-1">
                        {appearance.specialGear.name}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-2.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Особая деталь
                  </span>
                  <span className="font-display font-black text-xs text-[#252735] truncate block">
                    {appearance.specialGear.name}
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Color Swatches Strip */}
            <div className="p-3 rounded-2xl bg-slate-50 border-2 border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Палитра костюма
                </span>
                <span className="font-display font-black text-xs sm:text-sm text-[#252735]">
                  {appearance.colorPalette.name}
                </span>
              </div>
              <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span
                  className="w-6 h-6 rounded-full border border-slate-300 shadow-xs"
                  style={{ backgroundColor: appearance.colorPalette.primary }}
                  title={appearance.colorPalette.primary}
                />
                <span
                  className="w-6 h-6 rounded-full border border-slate-300 shadow-xs"
                  style={{ backgroundColor: appearance.colorPalette.secondary }}
                  title={appearance.colorPalette.secondary}
                />
                <span
                  className="w-6 h-6 rounded-full border border-slate-300 shadow-xs"
                  style={{ backgroundColor: appearance.colorPalette.accent }}
                  title={appearance.colorPalette.accent}
                />
              </div>
            </div>
          </div>

          <div className="bg-[#B9F24D]/15 border border-[#B9F24D] rounded-xl p-3 text-xs text-slate-700 font-semibold leading-relaxed flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Все элементы концепт-доски формируют итоговый 3D-промпт!</span>
          </div>
        </div>
      </div>

      {/* Nav Actions */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => {
            playClickSound();
            onPrev();
          }}
          className="btn-3d-white flex items-center gap-2 px-6 py-3.5 rounded-2xl font-display font-black text-base cursor-pointer border-2 border-slate-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Назад: Роль</span>
        </button>

        <button
          onClick={handleNext}
          className="btn-3d-lime flex items-center gap-2.5 px-8 py-4 rounded-2xl font-display font-black text-lg cursor-pointer border-2 border-[#252735]"
        >
          <span>Дальше: Прокачать промпт</span>
          <ArrowRight className="w-5 h-5 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
