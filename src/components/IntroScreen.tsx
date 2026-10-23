import React from 'react';
import labbagImg from '../assets/images/labbag.webp';
import { MascotPixel } from './MascotPixel';
import { AdventureMap } from './AdventureMap';
import { playSuccessSound, startBackgroundMusic } from '../services/soundEffects';
import { Sparkles, ArrowRight } from 'lucide-react';

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  const handleStart = () => {
    playSuccessSound();
    startBackgroundMusic();
    onStart();
  };

  return (
    <div className="w-full flex flex-col">
      {/* 1. Full-Width Clean 3D Laboratory Artwork (No Overlays, No Text, No Fades) */}
      <section className="relative w-full overflow-hidden bg-[#252735]">
        <div className="w-full aspect-16/9 sm:aspect-21/9 max-h-[580px] min-h-[300px] sm:min-h-[420px] relative">
          <img
            src={labbagImg}
            alt="3D Аватар-лаборатория RENDERIA"
            className="w-full h-full object-cover object-center select-none"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* 2. Engaging Hero Text Block (Game Logo Typography & Accents) */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-3 sm:pt-10 sm:pb-4 text-center flex flex-col items-center gap-4">
        {/* Green Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B9F24D] text-[#252735] font-black text-xs uppercase tracking-wider border-2 border-[#252735] shadow-[0_2px_0_#252735]">
          <Sparkles className="w-4 h-4 text-[#252735]" />
          <span>ИНТЕРАКТИВНАЯ МАСТЕРСКАЯ</span>
        </span>

        {/* Game-Logo Heading with vibrant lime accent on "героя" */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-[#252735] leading-[1.18] max-w-3xl">
          Создай{' '}
          <span className="relative inline-block text-[#252735] px-3 py-0.5 rounded-2xl bg-[#B9F24D] border-3 border-[#252735] shadow-[0_4px_0_#252735] -rotate-1 mx-1 hover:rotate-1 transition-transform select-none">
            героя
          </span>
          , которого ещё никто не видел!
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base lg:text-lg font-bold text-slate-600 max-w-2xl leading-relaxed">
          Придумай образ, научись объяснять свои идеи нейросети и подготовь персонажа к жизни в 3D.
        </p>
      </div>

      {/* 3. Main Content Body: Mascot -> Adventure Map -> Start Button */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-10 pb-8 sm:pb-12 pt-2 sm:pt-4">

        {/* Mascot Greeting Dialogue (Clean transparent PNG, NO enclosing white box, NO upload button) */}
        <div className="py-2">
          <MascotPixel
            mood="happy"
            speechText="Привет, создатель! Я Пикс — твой помощник в мире дизайна. Сегодня мы придумаем твоего героя и подготовим его к 3D!"
          />
        </div>

        {/* Adventure Map: 6 Winding Quest Stages with Whimsical Backdrop */}
        <AdventureMap onStartStage={handleStart} />

        {/* Prominent Large Start CTA with Soft Glow placed BELOW Adventure Map */}
        <div className="text-center pt-2 pb-6">
          <button
            onClick={handleStart}
            className="btn-3d-lime relative group inline-flex items-center justify-center gap-3.5 px-10 py-5 sm:px-14 sm:py-6 rounded-3xl font-display font-black text-xl sm:text-2xl cursor-pointer border-3 border-[#252735] shadow-[0_0_35px_rgba(185,242,77,0.7),0_6px_0_#92C634] hover:shadow-[0_0_45px_rgba(185,242,77,0.9),0_8px_0_#92C634] transition-all"
          >
            <Sparkles className="w-6 h-6 text-[#252735] animate-spin-slow" />
            <span>Начать создание персонажа</span>
            <ArrowRight className="w-7 h-7 stroke-[3] group-hover:translate-x-1.5 transition-transform" />
          </button>
          <p className="text-xs font-bold text-slate-400 mt-3">
            Пройди 6 шагов мастерской • Сохрани готовый образ и 3D-промпт
          </p>
        </div>
      </div>
    </div>
  );
};
