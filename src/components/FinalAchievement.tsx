import React, { useEffect } from 'react';
import { CharacterData, BadgeItem } from '../types/avatar';
import { ASSETS, ROLES } from '../data/labData';
import { MascotPixel } from './MascotPixel';
import { playFanfareSound, playClickSound } from '../services/soundEffects';
import confetti from 'canvas-confetti';
import { Download, Award, Sparkles, RotateCcw, Share2, Check, Printer } from 'lucide-react';

interface FinalAchievementProps {
  character: CharacterData;
  xp: number;
  badges: BadgeItem[];
  onRestart: () => void;
}

export const FinalAchievement: React.FC<FinalAchievementProps> = ({
  character,
  xp,
  badges,
  onRestart,
}) => {
  const roleMeta = ROLES.find((r) => r.id === character.role) || ROLES[0];

  useEffect(() => {
    playFanfareSound();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B9F24D', '#62C9F5', '#FFB9D5', '#BDA7FF'],
      });
    } catch {
      // Ignore if canvas is unavailable
    }
  }, []);

  const handleDownloadTxt = () => {
    playClickSound();
    const content = `=====================================================
     АВАТАР-ЛАБОРАТОРИЯ RENDERIA: ПАСПОРТ ГЕРОЯ
=====================================================
Имя персонажа: ${character.name || 'Мой Герой'}
Класс/Роль: ${character.role === 'custom' && character.customRoleTitle ? character.customRoleTitle : (roleMeta?.title || 'Не выбран')}
Главная способность: ${character.power || 'Не указана'}
Цветовая палитра: ${character.appearance?.colorPalette?.name || 'Не выбрана'}
Костюм: ${character.appearance?.outfit?.name || 'Не выбран'}${character.appearance?.outfit?.description ? ` (${character.appearance.outfit.description})` : ''}
Аксессуар: ${character.appearance?.accessory?.name || 'Не выбран'}${character.appearance?.accessory?.description ? ` (${character.appearance.accessory.description})` : ''}
Характер: ${character.appearance?.expression?.name || 'Не выбран'}
Поза: ${character.appearance?.pose?.name || 'Стоит ровно (T-поза)'}
Стиль: Stylized 3D Figurine

-----------------------------------------------------
ТЕХНИЧЕСКОЕ ЗАДАНИЕ (ПРОМПТ ДЛЯ НЕЙРОСЕТИ):
-----------------------------------------------------
[РУССКИЙ]:
${character.customPromptRu || 'Не сформирован'}

[ENGLISH (FOR AI GENERATORS)]:
${character.customPromptEn || 'Not specified'}

-----------------------------------------------------
ДОСТИЖЕНИЯ В ЛАБОРАТОРИИ RENDERIA:
Заработано очков опыта: ${xp} XP
Получено навыков: 6 из 6

Разработано в лаборатории RENDERIA (https://renderia.app)
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `renderia_${(character.name || 'hero').toLowerCase().replace(/\s+/g, '_')}_spec.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Celebrating Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B9F24D] text-[#252735] font-black font-display text-sm uppercase tracking-wider shadow-xs">
          <Sparkles className="w-4 h-4" />
          Лабораторный диплом выдан
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-[#252735] tracking-tight">
          Готово! Ты создал концепцию своего 3D-персонажа!
        </h1>
        <p className="text-sm sm:text-base font-semibold text-slate-600 max-w-2xl mx-auto">
          Ты прошёл путь от идеи до точного промпта и подготовил героя к жизни в 3D.
        </p>
      </div>

      {/* Mascot Congratulations Box */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <MascotPixel
          mood="celebrate"
          speechText={`Поздравляю, юный дизайнер! Твой герой «${character.name || 'Герой'}» спроектирован по всем правилам геймдева. Теперь ты умеешь объяснять искусственному интеллекту любые творческие задачи!`}
          tip="Сохрани техническое задание в файл TXT, чтобы использовать промпт в любимых нейросетях в любое время!"
        />
      </div>

      {/* Main Diploma / Character Passport Card */}
      <div className="bg-white border-3 border-[#252735] rounded-3xl p-6 sm:p-10 shadow-[0_8px_0_#252735] space-y-6 print:border-none print:shadow-none">
        {/* Passport Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-slate-200 pb-5 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Сертификат цифрового дизайнера RENDERIA
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-[#252735]">
              Паспорт персонажа: {character.name || 'Безымянный Герой'}
            </h2>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#252735] text-[#B9F24D] font-display font-black text-lg">
            <span>{xp} XP</span>
          </div>
        </div>

        {/* Hero Visual & Key Stats Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Hero Image Showcase (5 cols) */}
          <div className="md:col-span-5 relative rounded-2xl overflow-hidden border-3 border-[#252735] shadow-sm bg-slate-50 aspect-square flex items-center justify-center">
            <img
              src={character.generatedImageUrl || ASSETS.robloxSampleHero}
              alt="Финальный концепт героя"
              className="w-full h-full object-contain select-none"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 left-3 bg-[#252735]/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
              {character.role === 'custom' && character.customRoleTitle
                ? character.customRoleTitle
                : roleMeta.title}
            </div>
          </div>

          {/* Details & Specifications (7 cols) */}
          <div className="md:col-span-7 space-y-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-500 block mb-0.5">
                Главная способность:
              </span>
              <span className="text-sm font-black text-[#252735]">
                {character.power || 'Не указана'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-500 block mb-0.5">
                  Палитра:
                </span>
                <span className="text-xs font-bold text-[#252735]">
                  {character.appearance?.colorPalette?.name || 'Не выбрана'}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-500 block mb-0.5">
                  Экипировка:
                </span>
                <span className="text-xs font-bold text-[#252735]">
                  {character.appearance?.outfit?.name || 'Не выбран'}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-500 block mb-0.5">
                  Аксессуар:
                </span>
                <span className="text-xs font-bold text-[#252735]">
                  {character.appearance?.accessory?.name || 'Не выбран'}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-slate-500 block mb-0.5">
                  Поза:
                </span>
                <span className="text-xs font-bold text-[#252735]">
                  {character.appearance?.pose?.name || 'Стоит ровно (T-поза)'}
                </span>
              </div>
            </div>

            {/* 3D Check passed stamp */}
            <div className="p-3.5 rounded-2xl bg-[#B9F24D]/25 border border-[#B9F24D] flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#252735] text-[#B9F24D] flex items-center justify-center font-bold text-sm shrink-0">
                ✓
              </div>
              <div>
                <span className="text-xs font-black text-[#252735] block">
                  Проверка требований к 3D пройдена
                </span>
                <span className="text-[11px] text-slate-700">
                  Персонаж готов для загрузки в Tripo3D, Meshy и создания 3D-модели
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Earned Badges Section (NO bullet lists!) */}
        <div className="pt-4 border-t-2 border-slate-200 space-y-3">
          <h3 className="font-display font-black text-lg text-[#252735]">
            Освоенные навыки и награды:
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {badges.map((b) => (
              <div
                key={b.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-xl bg-[#B9F24D] text-[#252735] border border-[#252735] flex items-center justify-center font-bold text-xs shrink-0">
                  ★
                </div>
                <div>
                  <span className="text-xs font-black text-[#252735] block leading-tight">
                    {b.title}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold">
                    +{b.xp} XP
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons: Export TXT, Print, Create New Hero */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <button
          onClick={handleDownloadTxt}
          className="btn-3d-lime w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-display font-black text-base cursor-pointer border-2 border-[#252735]"
        >
          <Download className="w-5 h-5" />
          <span>Скачать техзадание в TXT</span>
        </button>

        <button
          onClick={handlePrint}
          className="btn-3d-white w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-display font-black text-base cursor-pointer border-2 border-slate-300"
        >
          <Printer className="w-5 h-5 text-slate-700" />
          <span>Печать / Сохранить в PDF</span>
        </button>

        <button
          onClick={onRestart}
          className="btn-3d-white w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-display font-black text-base cursor-pointer border-2 border-slate-300"
        >
          <RotateCcw className="w-5 h-5 text-slate-700" />
          <span>Создать нового героя</span>
        </button>
      </div>
    </div>
  );
};
