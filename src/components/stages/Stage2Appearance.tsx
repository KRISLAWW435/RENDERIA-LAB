import React, { useState } from 'react';
import { CharacterData, AppearanceState } from '../../types/avatar';
import { COLOR_PALETTES, OUTFITS, ACCESSORIES, EXPRESSIONS, SPECIAL_GEAR, ROLES } from '../../data/labData';
import { MascotPixel } from '../MascotPixel';
import { playClickSound, playSelectSound, playSuccessSound } from '../../services/soundEffects';
import { ArrowRight, ArrowLeft, Palette, Shirt, Shield, Smile, Sparkles, Check } from 'lucide-react';

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

  const roleMeta = ROLES.find((r) => r.id === character.role) || ROLES[0];

  const updatePalette = (palette: typeof COLOR_PALETTES[0]) => {
    playSelectSound();
    const updated: AppearanceState = { ...appearance, colorPalette: palette };
    setAppearance(updated);
    onUpdate({ appearance: updated });
  };

  const updateOutfit = (outfit: typeof OUTFITS[0]) => {
    playSelectSound();
    const updated: AppearanceState = { ...appearance, outfit };
    setAppearance(updated);
    onUpdate({ appearance: updated });
  };

  const updateAccessory = (accessory: typeof ACCESSORIES[0]) => {
    playSelectSound();
    const updated: AppearanceState = { ...appearance, accessory };
    setAppearance(updated);
    onUpdate({ appearance: updated });
  };

  const updateExpression = (expression: typeof EXPRESSIONS[0]) => {
    playSelectSound();
    const updated: AppearanceState = { ...appearance, expression };
    setAppearance(updated);
    onUpdate({ appearance: updated });
  };

  const updateGear = (gear: typeof SPECIAL_GEAR[0]) => {
    playSelectSound();
    const updated: AppearanceState = { ...appearance, specialGear: gear };
    setAppearance(updated);
    onUpdate({ appearance: updated });
  };

  const handleNext = () => {
    playSuccessSound();
    onNext();
  };

  const getTabQuestion = () => {
    switch (activeTab) {
      case 'colors':
        return 'Какой цвет лучше всего передаст характер твоего героя? Салатовый и неон символизируют энергию, фиолетовый — тайну!';
      case 'outfit':
        return 'В чём герой отправится в приключение? Скафандр, броня или свободное техно-худи?';
      case 'accessory':
        return 'Какая функциональная деталь сделает силуэт узнаваемым? Например, джетпак или визор!';
      case 'expression':
        return 'Какое настроение на лице твоего персонажа? Уверенная улыбка или исследовательский восторг?';
      case 'gear':
        return 'Какая особая технологическая фишка удивит других игроков в мире 3D?';
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Mascot Guidance */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs">
        <MascotPixel
          mood="thinking"
          speechText={getTabQuestion()}
          tip="В хорошем дизайне персонажа каждый элемент костюма дополняет его способности!"
        />
      </div>

      {/* Main Workshop Grid: Interactive Tabs + "My Project" Live Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Category Navigator & Options (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Category Tabs (Segmented visual buttons, NO pills) */}
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

          {/* Tab Content Cards */}
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs min-h-[380px] flex flex-col justify-between">
            {/* Colors Tab */}
            {activeTab === 'colors' && (
              <div className="space-y-4">
                <h3 className="font-display font-black text-lg text-[#252735]">
                  Цветовая гамма костюма
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {COLOR_PALETTES.map((pal) => {
                    const isSelected = appearance.colorPalette.id === pal.id;
                    return (
                      <div
                        key={pal.id}
                        onClick={() => updatePalette(pal)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-[#252735] bg-[#B9F24D]/15 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="font-bold text-sm text-[#252735]">
                            {pal.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <span
                              className="w-5 h-5 rounded-full border border-slate-300"
                              style={{ backgroundColor: pal.primary }}
                            />
                            <span
                              className="w-5 h-5 rounded-full border border-slate-300"
                              style={{ backgroundColor: pal.secondary }}
                            />
                            <span
                              className="w-5 h-5 rounded-full border border-slate-300"
                              style={{ backgroundColor: pal.accent }}
                            />
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-[#B9F24D] border border-[#252735] flex items-center justify-center text-[#252735]">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Outfit Tab */}
            {activeTab === 'outfit' && (
              <div className="space-y-4">
                <h3 className="font-display font-black text-lg text-[#252735]">
                  Одежда и костюм
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {OUTFITS.map((outfit) => {
                    const isSelected = appearance.outfit.id === outfit.id;
                    return (
                      <div
                        key={outfit.id}
                        onClick={() => updateOutfit(outfit)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#252735] bg-[#62C9F5]/15 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="font-bold text-sm text-[#252735]">
                            {outfit.name}
                          </span>
                          {isSelected && (
                            <div className="w-6 h-6 rounded-full bg-[#62C9F5] border border-[#252735] flex items-center justify-center text-[#252735] shrink-0">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {outfit.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Accessory Tab */}
            {activeTab === 'accessory' && (
              <div className="space-y-4">
                <h3 className="font-display font-black text-lg text-[#252735]">
                  Аксессуар и экипировка
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ACCESSORIES.map((acc) => {
                    const isSelected = appearance.accessory.id === acc.id;
                    return (
                      <div
                        key={acc.id}
                        onClick={() => updateAccessory(acc)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#252735] bg-[#FFB9D5]/20 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="font-bold text-sm text-[#252735]">
                            {acc.name}
                          </span>
                          {isSelected && (
                            <div className="w-6 h-6 rounded-full bg-[#FFB9D5] border border-[#252735] flex items-center justify-center text-[#252735] shrink-0">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {acc.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Expression Tab */}
            {activeTab === 'expression' && (
              <div className="space-y-4">
                <h3 className="font-display font-black text-lg text-[#252735]">
                  Выражение лица и эмоция
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {EXPRESSIONS.map((expr) => {
                    const isSelected = appearance.expression.id === expr.id;
                    return (
                      <div
                        key={expr.id}
                        onClick={() => updateExpression(expr)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-[#252735] bg-[#BDA7FF]/20 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{expr.emoji}</span>
                          <div>
                            <span className="font-bold text-sm text-[#252735] block">
                              {expr.name}
                            </span>
                            <span className="text-xs text-slate-500">
                              {expr.description}
                            </span>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-[#BDA7FF] border border-[#252735] flex items-center justify-center text-[#252735] shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Gear Tab */}
            {activeTab === 'gear' && (
              <div className="space-y-4">
                <h3 className="font-display font-black text-lg text-[#252735]">
                  Особенная уникальная деталь
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SPECIAL_GEAR.map((gear) => {
                    const isSelected = appearance.specialGear.id === gear.id;
                    return (
                      <div
                        key={gear.id}
                        onClick={() => updateGear(gear)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#252735] bg-[#B9F24D]/20 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="font-bold text-sm text-[#252735]">
                            {gear.name}
                          </span>
                          {isSelected && (
                            <div className="w-6 h-6 rounded-full bg-[#B9F24D] border border-[#252735] flex items-center justify-center text-[#252735] shrink-0">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {gear.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick Next Category Helper */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Кликни по характеристике, чтобы обновить концепт</span>
              <div className="flex gap-1.5">
                {(['colors', 'outfit', 'accessory', 'expression', 'gear'] as AppearanceTab[]).map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        activeTab === tab ? 'w-6 bg-[#252735]' : 'bg-slate-300'
                      }`}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: "My Project" Live Concept Board (5 cols) */}
        <div className="lg:col-span-5 bg-white border-3 border-[#252735] rounded-3xl p-6 shadow-[0_6px_0_#252735] space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#B9F24D] border border-[#252735]" />
              <h3 className="font-display font-black text-lg text-[#252735]">
                Мой проект: концепт-доска
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500">
              3D Ready
            </span>
          </div>

          {/* Hero Profile Header */}
          <div className="bg-gradient-to-br from-[#62C9F5]/20 via-[#FFB9D5]/15 to-[#B9F24D]/20 p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white border-2 border-[#252735] shadow-xs flex items-center justify-center text-2xl font-black font-display text-[#252735]">
              {appearance.expression.emoji}
            </div>
            <div>
              <h4 className="font-black font-display text-lg text-[#252735] leading-tight">
                {character.name || 'Безымянный Герой'}
              </h4>
              <p className="text-xs font-bold text-slate-600">
                {character.role === 'custom' && character.customRoleTitle
                  ? character.customRoleTitle
                  : roleMeta.title}
              </p>
            </div>
          </div>

          {/* Attribute Cards (Visual, NO bullet lists!) */}
          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Способность:</span>
              <span className="text-xs font-black text-[#252735] max-w-[210px] text-right truncate">
                {character.power}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Цвета костюма:</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#252735]">
                  {appearance.colorPalette.name}
                </span>
                <span
                  className="w-4 h-4 rounded-full border border-slate-300"
                  style={{ backgroundColor: appearance.colorPalette.primary }}
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Костюм:</span>
              <span className="text-xs font-bold text-[#252735]">
                {appearance.outfit.name}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Аксессуар:</span>
              <span className="text-xs font-bold text-[#252735]">
                {appearance.accessory.name}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">Особая деталь:</span>
              <span className="text-xs font-bold text-[#252735]">
                {appearance.specialGear.name}
              </span>
            </div>
          </div>

          <div className="bg-[#B9F24D]/15 border border-[#B9F24D] rounded-xl p-3 text-xs text-slate-700 font-semibold leading-relaxed">
            ✨ Все эти параметры автоматически войдут в итоговый промпт для генерации!
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
