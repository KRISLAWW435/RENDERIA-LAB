import React from 'react';
import { playSelectSound } from '../services/soundEffects';
import { Rocket, Palette, Sparkles as SparklesIcon, FileText, Image as ImageIcon, Box, ChevronRight, Star, Play } from 'lucide-react';

interface AdventureMapProps {
  onStartStage: (stageNum?: number) => void;
}

interface MapNode {
  num: number;
  stageName: string;
  tagline: string;
  icon: React.ReactNode;
  bgGradient: string;
  borderColor: string;
  shadowColor: string;
  accentColor: string;
  badgeText: string;
  isFirst?: boolean;
  isFinal?: boolean;
}

const MAP_NODES: MapNode[] = [
  {
    num: 1,
    stageName: 'Кто твой герой?',
    tagline: 'Выбери класс, имя и суперсилу',
    icon: <Rocket className="w-6 h-6 text-[#252735]" />,
    bgGradient: 'from-[#62C9F5]/25 via-white to-[#B9F24D]/20',
    borderColor: '#252735',
    shadowColor: 'rgba(185,242,77,0.45)',
    accentColor: '#B9F24D',
    badgeText: 'СТАРТ ЗДЕСЬ',
    isFirst: true,
  },
  {
    num: 2,
    stageName: 'Собери внешний вид',
    tagline: 'Костюм, палитра, аксессуары и эмоция',
    icon: <Palette className="w-6 h-6 text-[#252735]" />,
    bgGradient: 'from-[#FFB9D5]/30 via-white to-[#FFB9D5]/15',
    borderColor: '#FFB9D5',
    shadowColor: 'rgba(255,185,213,0.4)',
    accentColor: '#FFB9D5',
    badgeText: 'ОБРАЗ',
  },
  {
    num: 3,
    stageName: 'Прокачай промпт',
    tagline: 'Мини-игра: секреты точных слов для ИИ',
    icon: <SparklesIcon className="w-6 h-6 text-[#252735]" />,
    bgGradient: 'from-[#BDA7FF]/30 via-white to-[#BDA7FF]/15',
    borderColor: '#BDA7FF',
    shadowColor: 'rgba(189,167,255,0.4)',
    accentColor: '#BDA7FF',
    badgeText: 'ТРЕНИРОВКА',
  },
  {
    num: 4,
    stageName: 'Собери техзадание',
    tagline: 'Автоматический промпт на 2 языках',
    icon: <FileText className="w-6 h-6 text-[#252735]" />,
    bgGradient: 'from-[#B9F24D]/30 via-white to-[#62C9F5]/15',
    borderColor: '#B9F24D',
    shadowColor: 'rgba(185,242,77,0.4)',
    accentColor: '#B9F24D',
    badgeText: 'ПРОМПТ',
  },
  {
    num: 5,
    stageName: 'Создай изображение',
    tagline: 'Генератор арта и оценка результата',
    icon: <ImageIcon className="w-6 h-6 text-[#252735]" />,
    bgGradient: 'from-[#62C9F5]/30 via-white to-[#FFB9D5]/15',
    borderColor: '#62C9F5',
    shadowColor: 'rgba(98,201,245,0.4)',
    accentColor: '#62C9F5',
    badgeText: 'КАРТИНКА',
  },
  {
    num: 6,
    stageName: 'Подготовь к 3D',
    tagline: 'Чек-лист для перехода в 3D',
    icon: <Box className="w-6 h-6 text-[#252735]" />,
    bgGradient: 'from-[#B9F24D]/40 via-white to-[#BDA7FF]/25',
    borderColor: '#252735',
    shadowColor: 'rgba(37,39,53,0.35)',
    accentColor: '#B9F24D',
    badgeText: 'ФИНИШ 3D',
    isFinal: true,
  },
];

// Predefined magic sparkles coordinates & colors
const MAGIC_SPARKLES = [
  { top: '6%', left: '8%', color: '#62C9F5', size: 14, delay: '0s' },
  { top: '10%', right: '12%', color: '#B9F24D', size: 16, delay: '0.6s' },
  { top: '18%', left: '22%', color: '#FFB9D5', size: 12, delay: '1.2s' },
  { top: '24%', right: '6%', color: '#BDA7FF', size: 18, delay: '1.8s' },
  { top: '32%', left: '10%', color: '#B9F24D', size: 14, delay: '0.4s' },
  { top: '38%', right: '20%', color: '#62C9F5', size: 12, delay: '1.4s' },
  { top: '48%', left: '6%', color: '#FFB9D5', size: 16, delay: '0.9s' },
  { top: '56%', right: '10%', color: '#B9F24D', size: 14, delay: '2.1s' },
  { top: '65%', left: '18%', color: '#BDA7FF', size: 18, delay: '0.3s' },
  { top: '72%', right: '22%', color: '#FFB9D5', size: 12, delay: '1.7s' },
  { top: '82%', left: '8%', color: '#62C9F5', size: 16, delay: '1.1s' },
  { top: '90%', right: '14%', color: '#B9F24D', size: 14, delay: '0.7s' },
];

export const AdventureMap: React.FC<AdventureMapProps> = ({ onStartStage }) => {
  return (
    <div className="relative py-8 px-4 sm:px-8 rounded-3xl overflow-hidden bg-gradient-to-b from-sky-50/40 via-white to-lime-50/40 border-2 border-slate-200/80 shadow-xs">
      {/* Subtle Animated Magic Sparkles (Twinkling stars & glowing dots, NO weird pill shapes) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {MAGIC_SPARKLES.map((sp, idx) => (
          <div
            key={idx}
            className="absolute animate-sparkle"
            style={{
              top: sp.top,
              left: sp.left,
              right: sp.right,
              animationDelay: sp.delay,
            }}
          >
            {/* 4-point magical star SVG */}
            <svg
              width={sp.size}
              height={sp.size}
              viewBox="0 0 24 24"
              fill="none"
              className="drop-shadow-xs"
            >
              <path
                d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
                fill={sp.color}
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Map Header */}
      <div className="relative z-10 text-center mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#B9F24D] text-[#252735] text-xs font-black uppercase tracking-wider shadow-2xs border border-[#252735]/20">
          <Star className="w-3.5 h-3.5 fill-[#252735]" />
          <span>Карта приключения • 6 игровых островков</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black font-display text-[#252735] tracking-tight">
          Твой путь от идеи до 3D-концепта
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-slate-600 max-w-lg mx-auto">
          Пройди 6 этапов мастерской, принимай решения дизайнера и подготовь героя к 3D!
        </p>
      </div>

      {/* Organic Winding Trail with Staggered Cards */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-8 sm:space-y-12">
        {MAP_NODES.map((node, index) => {
          // Stagger cards left and right to create a natural meandering pathway
          const isLeft = index % 2 === 0;
          const alignClass = isLeft
            ? 'sm:mr-auto sm:ml-0 md:translate-x-0'
            : 'sm:ml-auto sm:mr-0 md:translate-x-4';

          return (
            <div key={node.num} className="relative">
              {/* Winding Connecting Stepping Path between nodes */}
              {index < MAP_NODES.length - 1 && (
                <div
                  className={`hidden sm:flex absolute -bottom-9 sm:-bottom-12 ${
                    isLeft ? 'left-1/3' : 'right-1/3'
                  } z-0 items-center justify-center`}
                >
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B9F24D] border border-[#252735] shadow-xs" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#62C9F5] border border-[#252735] shadow-xs" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFB9D5] border border-[#252735] shadow-xs" />
                  </div>
                </div>
              )}

              {/* Island Card */}
              <div
                onClick={() => {
                  playSelectSound();
                  onStartStage(node.num);
                }}
                className={`group relative max-w-md w-full p-5 sm:p-6 rounded-3xl border-3 border-[#252735] bg-gradient-to-br ${node.bgGradient} cursor-pointer transition-all duration-300 hover:-translate-y-1.5 select-none ${alignClass}`}
                style={{
                  boxShadow: `0 6px 0 #252735, 0 12px 28px ${node.shadowColor}`,
                }}
              >
                {/* Island Number Pin with Star Badge */}
                <div
                  className={`absolute -top-3.5 ${
                    isLeft ? 'left-4' : 'right-4'
                  } flex items-center gap-1.5 px-3 py-1 rounded-2xl border-2 border-white shadow-md text-xs font-black font-display tracking-wider ${
                    node.isFirst
                      ? 'bg-[#B9F24D] text-[#252735]'
                      : node.isFinal
                      ? 'bg-amber-400 text-[#252735]'
                      : 'bg-[#252735] text-white'
                  }`}
                >
                  <span>{node.isFirst ? '🚀' : node.isFinal ? '🏆' : '★'}</span>
                  <span>ОСТРОВОК {node.num}/6 • {node.badgeText}</span>
                </div>

                <div className="flex items-center gap-4 mt-1">
                  {/* Icon Container */}
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-[#252735] shadow-[0_3px_0_#252735] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ backgroundColor: node.accentColor }}
                  >
                    {node.icon}
                  </div>

                  {/* Title & Tagline */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-black text-base sm:text-lg text-[#252735] leading-snug group-hover:text-emerald-800 transition-colors">
                      {node.stageName}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5 leading-snug">
                      {node.tagline}
                    </p>
                  </div>

                  {/* Special Start Button for Island 1 */}
                  {node.isFirst ? (
                    <div className="btn-3d-lime shrink-0 px-3 py-2 rounded-xl text-xs font-black border-2 border-[#252735] flex items-center gap-1 shadow-xs">
                      <span>Старт</span>
                      <Play className="w-3.5 h-3.5 fill-[#252735]" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center shrink-0 group-hover:bg-[#252735] group-hover:text-white transition-colors">
                      <ChevronRight className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
