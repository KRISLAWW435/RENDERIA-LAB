import React, { useState } from 'react';
import { RoleId, CharacterData } from '../../types/avatar';
import { ROLES } from '../../data/labData';
import pixelMascotImg from '../../assets/pix/pixel1.webp';
import { playClickSound, playSelectSound, playSuccessSound } from '../../services/soundEffects';
import { ArrowRight, Check, Wand2, Sparkles, Plus } from 'lucide-react';

interface Stage1ConceptProps {
  character: CharacterData;
  onUpdate: (data: Partial<CharacterData>) => void;
  onNext: () => void;
}

export const Stage1Concept: React.FC<Stage1ConceptProps> = ({
  character,
  onUpdate,
  onNext,
}) => {
  const [selectedRole, setSelectedRole] = useState<RoleId>(character.role || 'cosmic_explorer');
  const [heroName, setHeroName] = useState(character.name || 'Астро-Пилот');
  const [customRoleTitle, setCustomRoleTitle] = useState(character.customRoleTitle || '');
  const [heroPower, setHeroPower] = useState(
    character.power || ROLES.find((r) => r.id === character.role)?.defaultPower || ROLES[0].defaultPower
  );

  const currentRoleMeta = ROLES.find((r) => r.id === selectedRole) || ROLES[0];

  const handleRoleSelect = (roleId: RoleId) => {
    setSelectedRole(roleId);
    playSelectSound();
    const roleMeta = ROLES.find((r) => r.id === roleId);
    if (roleMeta) {
      const isCustomPowerTyped = !ROLES.some((r) => r.suggestedPowers.includes(heroPower));
      if (!isCustomPowerTyped) {
        setHeroPower(roleMeta.defaultPower);
        onUpdate({ role: roleId, power: roleMeta.defaultPower });
      } else {
        onUpdate({ role: roleId });
      }
    } else {
      onUpdate({ role: roleId });
    }
  };

  const handlePowerPreset = (powerText: string) => {
    playClickSound();
    setHeroPower(powerText);
    onUpdate({ power: powerText });
  };

  const handleCustomRoleChange = (title: string) => {
    setCustomRoleTitle(title);
    onUpdate({ customRoleTitle: title });
  };

  const handleContinue = () => {
    playSuccessSound();
    onUpdate({
      role: selectedRole,
      customRoleTitle: selectedRole === 'custom' ? customRoleTitle.trim() || 'Свой Герой' : undefined,
      name: heroName.trim() || 'Мой Герой',
      power: heroPower.trim() || currentRoleMeta.defaultPower,
    });
    onNext();
  };

  const isCustomSuperpower =
    heroPower.trim().length > 0 &&
    !currentRoleMeta.suggestedPowers.some((p) => p.trim() === heroPower.trim());

  // Mascot dynamic speech text reacting to user choices
  const getPixelSpeech = () => {
    if (selectedRole === 'custom') {
      return customRoleTitle.trim()
        ? `«Класс «${customRoleTitle.trim()}» — звучит великолепно! Теперь выбери имя и суперсилу в панели справа!»`
        : '«Отличный выбор! Введи название своего класса в панели справа и настрой способность!»';
    }
    switch (selectedRole) {
      case 'cosmic_explorer':
        return '«Космос зовёт! Гравитационные ранцы и звёздные порталы готовы к 3D-моделированию!»';
      case 'cyber_ninja':
        return '«Кибер-стиль! Ловкий ниндзя с неоновыми клинками — идеальный герой для 3D!»';
      case 'nature_guardian':
        return '«Сила природы! Живая био-энергия и светящиеся кристаллы будут круто смотреться в 3D!»';
      case 'fantasy_traveler':
        return '«Древняя магия! Парящий диск и кристаллический посох придадут герою загадочности!»';
      default:
        return '«Выбери класс своего героя, настрой его суперсилу и дай ему имя!»';
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-2 sm:py-4 px-3 sm:px-6 space-y-5">
      {/* Top Area: Clean Text Panel with Instructions (NO mascot image, NO white square frame) */}
      <div className="bg-white/95 border-2 border-slate-200 rounded-3xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#B9F24D] text-[#252735] border border-[#252735]">
                Этап 1
              </span>
              <h1 className="text-xl sm:text-2xl font-black font-display text-[#252735]">
                Кто твой герой?
              </h1>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-600">
              Выбери класс персонажа из готовых архетипов или создай свой вариант, придумай имя и настрой суперсилу!
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-2xl border border-slate-200 shadow-2xs">
              ✨ 5 вариантов классов
            </span>
          </div>
        </div>
      </div>

      {/* Main Game Screen: Split Layout (Cards on Left, Config Panel on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Side: Role Cards (7 cols) - 4 Predefined Archetypes + 1 Custom Option */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-base sm:text-lg font-black font-display text-[#252735] flex items-center gap-2">
              <span>Выбери класс героя</span>
              <span className="text-xs font-bold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                1 клик
              </span>
            </h2>
            <span className="text-xs font-bold text-slate-500">
              {selectedRole === 'custom'
                ? (customRoleTitle.trim() ? `Свой: ${customRoleTitle}` : 'Свой вариант')
                : currentRoleMeta.title}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {/* 4 Standard Roles */}
            {ROLES.filter((r) => r.id !== 'custom').map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <div
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`group relative p-3 sm:p-3.5 rounded-3xl cursor-pointer transition-all duration-200 select-none flex flex-col justify-between bg-white ${
                    isSelected
                      ? 'border-3 border-[#252735] ring-4 ring-[#B9F24D] shadow-[0_0_24px_rgba(185,242,77,0.55),0_6px_0_#252735] -translate-y-1 scale-[1.02]'
                      : 'border-2 border-slate-200 hover:border-[#62C9F5] shadow-xs hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  {/* Selected checkmark with bounce */}
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-[#B9F24D] border-2 border-[#252735] flex items-center justify-center text-[#252735] shadow-xs animate-bounce">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}

                  <div className="space-y-2">
                    {/* Character Card Image: Smooth radial blend into card's white background without hard edges */}
                    <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-white flex items-center justify-center p-0">
                      <img
                        src={role.image}
                        alt={role.title}
                        className="w-full h-full object-contain scale-110 group-hover:scale-115 transition-transform duration-300"
                        style={{
                          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 50%, transparent 85%)',
                          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 50%, transparent 85%)',
                        }}
                        loading="lazy"
                      />
                      {/* Soft vignette overlay to ensure seamless white blend */}
                      <div className="absolute inset-0 pointer-events-none rounded-2xl [background:radial-gradient(ellipse_at_center,transparent_55%,rgba(255,255,255,0.7)_80%,#ffffff_100%)]" />

                      <span className="absolute top-2.5 left-2.5 z-10 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg bg-[#252735]/90 text-[#B9F24D] shadow-xs backdrop-blur-xs">
                        {role.badge}
                      </span>
                    </div>

                    {/* Short title and tagline */}
                    <div className="px-1">
                      <h3 className="text-sm sm:text-base font-black font-display text-[#252735] leading-snug line-clamp-1">
                        {role.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs font-bold text-slate-500 line-clamp-1 mt-0.5">
                        ✨ {role.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100">
                    {isSelected ? (
                      <div className="w-full py-1.5 px-3 rounded-xl text-xs font-black bg-[#B9F24D] text-[#252735] border-2 border-[#252735] shadow-[0_2px_0_#252735] flex items-center justify-center gap-1.5 transition-all">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Выбран</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="w-full py-1.5 px-3 rounded-xl text-xs font-black bg-slate-100 hover:bg-[#62C9F5]/20 text-slate-700 hover:text-[#252735] border-2 border-slate-200 hover:border-[#62C9F5] shadow-2xs hover:shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:translate-y-0.5"
                      >
                        <span>Выбрать</span>
                        <span className="text-xs">→</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* 5th Card: "Свой вариант" (Clean, no duplicated input inside) */}
            <div
              onClick={() => handleRoleSelect('custom')}
              className={`group relative p-3 sm:p-3.5 rounded-3xl cursor-pointer transition-all duration-200 select-none flex flex-col justify-between col-span-2 sm:col-span-1 bg-white ${
                selectedRole === 'custom'
                  ? 'border-3 border-[#252735] ring-4 ring-[#BDA7FF] shadow-[0_0_24px_rgba(189,167,255,0.55),0_6px_0_#252735] -translate-y-1 scale-[1.02]'
                  : 'border-2 border-dashed border-[#BDA7FF]/80 hover:border-[#BDA7FF] shadow-xs hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              {/* Selected checkmark with bounce */}
              {selectedRole === 'custom' && (
                <div className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-[#BDA7FF] border-2 border-[#252735] flex items-center justify-center text-[#252735] shadow-xs animate-bounce">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              )}

              <div className="space-y-2">
                {/* 3D-Styled Creative Wand Visual Frame */}
                <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-gradient-to-br from-[#BDA7FF]/30 via-[#62C9F5]/20 to-[#B9F24D]/25 border border-slate-200/90 flex flex-col items-center justify-center p-3 relative">
                  {/* Floating sparkles background accents */}
                  <div className="absolute inset-0 bg-[radial-gradient(#BDA7FF_1px,transparent_1px)] [background-size:14px_14px] opacity-40 pointer-events-none" />

                  <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-3xl bg-white/95 border-2 border-[#252735] shadow-[0_4px_0_#252735] flex items-center justify-center text-[#252735] group-hover:rotate-6 group-hover:scale-110 transition-transform">
                    <Wand2 className="w-9 h-9 sm:w-10 sm:h-10 text-[#252735] stroke-[2.2]" />
                    <Sparkles className="w-4 h-4 text-[#BDA7FF] absolute -top-1 -right-1 fill-[#BDA7FF]" />
                  </div>

                  <span className="absolute top-2.5 left-2.5 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg bg-[#252735]/90 text-[#BDA7FF] shadow-xs backdrop-blur-xs">
                    Творчество
                  </span>
                  <span className="text-[11px] font-extrabold text-[#252735] mt-2 bg-white/85 px-2.5 py-0.5 rounded-md border border-slate-200">
                    Любая твоя идея!
                  </span>
                </div>

                {/* Short title and tagline */}
                <div className="px-1">
                  <h3 className="text-sm sm:text-base font-black font-display text-[#252735] leading-snug flex items-center gap-1.5">
                    <span>Свой вариант</span>
                    <span className="text-xs">✨</span>
                  </h3>
                  <p className="text-[11px] sm:text-xs font-bold text-slate-500 line-clamp-1 mt-0.5">
                    Придумай уникальный класс
                  </p>
                </div>
              </div>

              {/* Clean Card Action Button (No duplicated input field) */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1.5">
                {selectedRole === 'custom' ? (
                  <>
                    <div className="w-full py-1.5 px-3 rounded-xl text-xs font-black bg-[#BDA7FF] text-[#252735] border-2 border-[#252735] shadow-[0_2px_0_#252735] flex items-center justify-center gap-1.5 transition-all">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Свой вариант выбран</span>
                    </div>
                    <div className="py-1 px-2 rounded-xl bg-[#BDA7FF]/15 border border-[#BDA7FF]/30 text-center">
                      <span className="text-[11px] font-bold text-[#252735]">
                        👉 Укажи класс в панели справа
                      </span>
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    className="w-full py-1.5 px-3 rounded-xl text-xs font-black bg-slate-100 hover:bg-[#BDA7FF]/25 text-slate-700 hover:text-[#252735] border-2 border-slate-200 hover:border-[#BDA7FF] shadow-2xs hover:shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:translate-y-0.5"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Создать свой</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Game Workshop Hero Config Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border-3 border-[#252735] rounded-3xl p-4 sm:p-5 shadow-[0_6px_0_#252735] space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b-2 border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎮</span>
                <h3 className="font-display font-black text-base sm:text-lg text-[#252735]">
                  Панель героя
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-[#252735] border border-slate-200">
                {selectedRole === 'custom'
                  ? (customRoleTitle.trim() || 'Свой вариант')
                  : currentRoleMeta.title}
              </span>
            </div>

            {/* When "Свой вариант" is selected: Clean Custom Class Input Field */}
            {selectedRole === 'custom' && (
              <div className="space-y-1.5 bg-[#BDA7FF]/15 p-3.5 rounded-2xl border-2 border-[#BDA7FF]">
                <label className="block text-xs font-black uppercase tracking-wider text-[#252735] flex items-center justify-between">
                  <span>Класс твоего героя:</span>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#BDA7FF] text-[#252735]">
                    ✨ Творчество
                  </span>
                </label>
                <input
                  type="text"
                  value={customRoleTitle}
                  onChange={(e) => handleCustomRoleChange(e.target.value)}
                  placeholder="Например: Звёздный Рыцарь, Кибер-Маг, Алхимик"
                  autoFocus
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#BDA7FF] focus:border-[#252735] focus:ring-4 focus:ring-[#BDA7FF]/25 focus:outline-none font-bold text-sm sm:text-base text-[#252735] bg-white transition-all shadow-inner"
                />
                <p className="text-[11px] font-semibold text-slate-600">
                  Введи название класса для своего уникального героя
                </p>
              </div>
            )}

            {/* Hero Name Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                Имя героя:
              </label>
              <input
                type="text"
                value={heroName}
                onChange={(e) => {
                  setHeroName(e.target.value);
                  onUpdate({ name: e.target.value });
                }}
                placeholder="Например: Астро-Рейнджер"
                className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-[#62C9F5] focus:ring-4 focus:ring-[#62C9F5]/20 focus:outline-none font-bold text-sm sm:text-base text-[#252735] bg-slate-50 focus:bg-white transition-all shadow-inner"
              />
              <p className="text-[11px] font-semibold text-slate-400">
                Придумай звучное имя для своего героя в мире 3D!
              </p>
            </div>

            {/* Hero Power Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                  Главная суперспособность:
                </label>
                {isCustomSuperpower && (
                  <span className="text-[10px] font-extrabold text-[#62C9F5] bg-[#62C9F5]/10 px-2 py-0.5 rounded-md border border-[#62C9F5]/30">
                    ✏️ Своя способность
                  </span>
                )}
              </div>
              <input
                type="text"
                value={heroPower}
                onChange={(e) => {
                  setHeroPower(e.target.value);
                  onUpdate({ power: e.target.value });
                }}
                placeholder="Например: Управляет гравитацией"
                className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-[#B9F24D] focus:ring-4 focus:ring-[#B9F24D]/20 focus:outline-none font-bold text-sm sm:text-base text-[#252735] bg-slate-50 focus:bg-white transition-all shadow-inner"
              />
            </div>

            {/* Quick Superpower Idea Chips (7 variety options) */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 block">
                  Готовые способности:
                </span>
                <span className="text-[10px] font-bold text-slate-400">
                  Нажми для выбора
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
                {currentRoleMeta.suggestedPowers.map((idea) => {
                  const isActive = heroPower.trim() === idea.trim();
                  return (
                    <button
                      key={idea}
                      type="button"
                      onClick={() => handlePowerPreset(idea)}
                      className={`text-[11px] font-bold px-2.5 py-1.5 rounded-xl transition-all border cursor-pointer select-none text-left leading-tight ${
                        isActive
                          ? 'bg-[#B9F24D] text-[#252735] border-[#252735] shadow-xs scale-102 ring-2 ring-[#B9F24D]/40'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      ⚡️ {idea}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next Step CTA Button */}
            <button
              onClick={handleContinue}
              className="btn-3d-lime w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl font-display font-black text-base sm:text-lg border-2 border-[#252735] cursor-pointer shadow-[0_4px_0_#252735] hover:shadow-[0_2px_0_#252735] active:translate-y-1 transition-all"
            >
              <span>Дальше: Собрать образ</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>

          {/* Mascot (Pix) and Speech Bubble directly below the Hero Panel */}
          <div className="flex items-center gap-3 sm:gap-4 px-1 select-none">
            {/* Mascot Character Image using pixel1.webp (clean, no background frame) */}
            <div
              onClick={() => playClickSound()}
              className="relative w-20 h-24 sm:w-24 sm:h-28 shrink-0 transition-transform duration-300 hover:scale-105 cursor-pointer"
              title="Пикс рад помочь!"
            >
              {/* Soft glowing aura */}
              <div className="absolute inset-0 -m-1.5 rounded-full bg-gradient-to-tr from-[#B9F24D]/35 to-[#62C9F5]/35 blur-xl pointer-events-none opacity-80" />
              <img
                src={pixelMascotImg}
                alt="Пикс"
                className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(37,39,53,0.2)]"
              />
            </div>

            {/* Speech bubble horizontally aligned with Pix under Hero Panel */}
            <div className="relative flex-1 bg-white border-2 border-[#252735] rounded-2xl p-3 sm:p-3.5 shadow-[0_4px_0_#252735]">
              {/* Little speech bubble tail pointing towards Pix */}
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-y-6 border-y-transparent border-r-8 border-r-[#252735]" />
              <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-0 h-0 border-y-5 border-y-transparent border-r-7 border-r-white" />

              <div className="text-[10px] font-black uppercase tracking-wider text-[#62C9F5] flex items-center gap-1 mb-1">
                <span className="font-display font-black text-xs text-[#252735]">Пикс</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500 font-bold">Советник по дизайну</span>
              </div>
              <p className="text-xs sm:text-[13px] font-bold text-[#252735] leading-snug">
                {getPixelSpeech()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
