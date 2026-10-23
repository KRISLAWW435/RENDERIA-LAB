import React from 'react';
import { ASSETS } from '../data/labData';
import { MascotPixel } from './MascotPixel';
import { AdventureMap } from './AdventureMap';
import { playSuccessSound } from '../services/soundEffects';
import { Sparkles, ArrowRight } from 'lucide-react';

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  const handleStart = () => {
    playSuccessSound();
    onStart();
  };

  return (
    <div className="relative overflow-hidden py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
        {/* Hero Visual Scene with Panoramic Laboratory Background */}
        <div className="relative rounded-3xl overflow-hidden border-3 border-[#252735] shadow-[0_8px_0_#252735] bg-gradient-to-b from-[#62C9F5]/30 to-[#B9F24D]/20">
          <div className="aspect-16/9 sm:aspect-21/9 w-full relative">
            <img
              src={ASSETS.labBg}
              alt="Творческая лаборатория RENDERIA"
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />
            {/* Subtle soft gradient scrim for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#252735]/85 via-[#252735]/40 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white" />

            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 text-white flex flex-col items-start gap-2 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B9F24D] text-[#252735] font-black text-xs uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#252735]" />
                Интерактивная мастерская
              </span>
              <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight leading-tight drop-shadow-md text-white">
                Создай героя, которого ещё никто не видел!
              </h1>
              <p className="text-sm sm:text-lg font-medium text-slate-100 max-w-xl drop-shadow-sm">
                Придумай образ, научись объяснять свои идеи нейросети и подготовь персонажа к жизни в 3D.
              </p>
            </div>
          </div>
        </div>

        {/* Mascot Greeting Dialogue (Clean transparent PNG, NO enclosing white box, NO upload button) */}
        <div className="py-2">
          <MascotPixel
            mood="happy"
            speechText="Привет, создатель! Я Пиксель — твой помощник в мире дизайна. Сегодня мы придумаем твоего героя и подготовим его к 3D!"
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
