import React from 'react';
import { StageId } from '../types/avatar';
import { Sparkles, Check, Lock, ChevronRight } from 'lucide-react';
import { playClickSound } from '../services/soundEffects';

interface StageRoadmapProps {
  currentStage: StageId;
  onSelectStage: (stage: StageId) => void;
  completedStages: Record<string, boolean>;
}

interface StepMeta {
  id: StageId;
  num: number;
  title: string;
  shortTitle: string;
  icon: string;
  color: string;
}

const STEPS: StepMeta[] = [
  {
    id: 'stage1_concept',
    num: 1,
    title: 'Кто твой герой?',
    shortTitle: 'Идея',
    icon: '🚀',
    color: '#62C9F5',
  },
  {
    id: 'stage2_appearance',
    num: 2,
    title: 'Собери образ',
    shortTitle: 'Внешность',
    icon: '🎨',
    color: '#FFB9D5',
  },
  {
    id: 'stage3_training',
    num: 3,
    title: 'Прокачай промпт',
    shortTitle: 'Тренировка',
    icon: '💡',
    color: '#BDA7FF',
  },
  {
    id: 'stage4_prompt',
    num: 4,
    title: 'Собери техзадание',
    shortTitle: 'Промпт',
    icon: '📝',
    color: '#B9F24D',
  },
  {
    id: 'stage5_image',
    num: 5,
    title: 'Создай изображение',
    shortTitle: 'Картинка',
    icon: '🖼️',
    color: '#62C9F5',
  },
  {
    id: 'stage6_3d',
    num: 6,
    title: 'Подготовь к 3D',
    shortTitle: '3D-модель',
    icon: '🧊',
    color: '#B9F24D',
  },
];

export const StageRoadmap: React.FC<StageRoadmapProps> = ({
  currentStage,
  onSelectStage,
  completedStages,
}) => {
  if (currentStage === 'intro' || currentStage === 'victory') {
    return null;
  }

  const currentIdx = STEPS.findIndex((s) => s.id === currentStage);

  return (
    <div className="w-full bg-white border-b border-slate-200 py-3 px-4 overflow-x-auto scrollbar-none">
      <div className="max-w-5xl mx-auto flex items-center justify-between min-w-[620px] gap-2">
        {STEPS.map((step, idx) => {
          const isCurrent = step.id === currentStage;
          const isCompleted = completedStages[step.id];
          const isAccessible = isCompleted || idx <= currentIdx;

          return (
            <React.Fragment key={step.id}>
              {/* Step Button Island */}
              <button
                onClick={() => {
                  if (isAccessible) {
                    playClickSound();
                    onSelectStage(step.id);
                  }
                }}
                disabled={!isAccessible}
                className={`group flex items-center gap-2.5 px-3 py-2 rounded-2xl transition-all duration-200 select-none ${
                  isCurrent
                    ? 'bg-[#252735] text-white shadow-md scale-105 ring-2 ring-[#B9F24D]'
                    : isCompleted
                    ? 'bg-[#B9F24D]/20 text-[#252735] hover:bg-[#B9F24D]/40 cursor-pointer'
                    : isAccessible
                    ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer'
                    : 'bg-slate-50 text-slate-400 opacity-60 cursor-not-allowed'
                }`}
              >
                {/* Step badge / status indicator */}
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-transform ${
                    isCurrent
                      ? 'bg-[#B9F24D] text-[#252735] shadow-xs'
                      : isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isCompleted && !isCurrent ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <span>{step.num}</span>
                  )}
                </div>

                {/* Title */}
                <div className="text-left">
                  <div className="text-xs font-bold leading-tight flex items-center gap-1">
                    <span>{step.icon}</span>
                    <span className="whitespace-nowrap">{step.shortTitle}</span>
                  </div>
                </div>
              </button>

              {/* Connecting line */}
              {idx < STEPS.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-1 rounded-full transition-colors ${
                    isCompleted ? 'bg-emerald-400' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
