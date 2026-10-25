/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StageId, CharacterData, BadgeItem } from './types/avatar';
import { COLOR_PALETTES, OUTFITS, ACCESSORIES, EXPRESSIONS, POSES, SPECIAL_GEAR, ROLES } from './data/labData';
import { Header } from './components/Header';
import { StageRoadmap } from './components/StageRoadmap';
import { IntroScreen } from './components/IntroScreen';
import { Stage1Concept } from './components/stages/Stage1Concept';
import { Stage2Appearance } from './components/stages/Stage2Appearance';
import { Stage3PromptTraining } from './components/stages/Stage3PromptTraining';
import { Stage4PromptAssembly } from './components/stages/Stage4PromptAssembly';
import { Stage5GenerateImage } from './components/stages/Stage5GenerateImage';
import { Stage6Prepare3D } from './components/stages/Stage6Prepare3D';
import { FinalAchievement } from './components/FinalAchievement';
import { startBackgroundMusic } from './services/soundEffects';

const INITIAL_CHARACTER: CharacterData = {
  name: 'Астро-Пилот',
  role: 'cosmic_explorer',
  power: 'Управляет гравитацией и открывает порталы',
  style: 'roblox_3d',
  hasLearnedStyle: false,
  appearance: {
    colorPalette: COLOR_PALETTES[0],
    outfit: OUTFITS[0],
    accessory: ACCESSORIES[0],
    expression: EXPRESSIONS[0],
    pose: POSES[0],
    specialGear: POSES[0],
  },
  isPromptCustomized: false,
  threeDChecks: {
    fullBody: true,
    singleHero: true,
    clearBackground: true,
    sharpDetails: true,
  },
  generatedImageSource: null,
};

const INITIAL_BADGES: BadgeItem[] = [
  {
    id: 'b1',
    title: 'Придумал концепцию',
    description: 'Определил класс и уникальную способность героя',
    xp: 100,
    earned: false,
  },
  {
    id: 'b2',
    title: 'Собрал образ героя',
    description: 'Спроектировал палитру, костюм и экипировку',
    xp: 150,
    earned: false,
  },
  {
    id: 'b3',
    title: 'Научился уточнять промпт',
    description: 'Освоил структуру точного описания для ИИ',
    xp: 150,
    earned: false,
  },
  {
    id: 'b4',
    title: 'Собрал техзадание',
    description: 'Сформировал технический промпт на двух языках',
    xp: 100,
    earned: false,
  },
  {
    id: 'b5',
    title: 'Подготовил изображение',
    description: 'Получил и проанализировал 2D концепт-арт',
    xp: 200,
    earned: false,
  },
  {
    id: 'b6',
    title: 'Проверил готовность к 3D',
    description: 'Убедился в соответствии требованиям 3D-моделирования',
    xp: 200,
    earned: false,
  },
];

export default function App() {
  const [currentStage, setCurrentStage] = useState<StageId>('intro');
  const [character, setCharacter] = useState<CharacterData>(INITIAL_CHARACTER);
  const [badges, setBadges] = useState<BadgeItem[]>(INITIAL_BADGES);
  const [completedStages, setCompletedStages] = useState<Record<string, boolean>>({});

  // Load from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('renderia_lab_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.character) {
          const char = parsed.character;
          if (char.appearance) {
            // Harmonize color palette with current presets
            if (char.appearance.colorPalette?.id) {
              const matchedPalette = COLOR_PALETTES.find((p) => p.id === char.appearance.colorPalette.id);
              if (matchedPalette) {
                char.appearance.colorPalette = {
                  ...matchedPalette,
                  ...char.appearance.colorPalette,
                  name: matchedPalette.name,
                  promptColors: matchedPalette.promptColors,
                  colors: matchedPalette.colors,
                };
              }
            }
            // Harmonize pose if missing or using old specialGear
            if (!char.appearance.pose && char.appearance.specialGear) {
              char.appearance.pose = char.appearance.specialGear;
            }
            if (char.appearance.pose?.id) {
              const matchedPose = POSES.find((p) => p.id === char.appearance.pose.id);
              if (matchedPose) {
                char.appearance.pose = {
                  ...matchedPose,
                  ...char.appearance.pose,
                  name: matchedPose.name,
                };
              }
            }
          }
          setCharacter(char);
        }
        if (parsed.currentStage) setCurrentStage(parsed.currentStage);
        if (parsed.badges) setBadges(parsed.badges);
        if (parsed.completedStages) setCompletedStages(parsed.completedStages);
      }
    } catch {
      // Ignore
    }
  }, []);

  // Save state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'renderia_lab_state',
        JSON.stringify({
          character,
          currentStage,
          badges,
          completedStages,
        })
      );
    } catch {
      // Ignore
    }
  }, [character, currentStage, badges, completedStages]);

  const updateCharacter = (patch: Partial<CharacterData>) => {
    setCharacter((prev) => ({ ...prev, ...patch }));
  };

  const markBadgeEarned = (badgeIndex: number) => {
    setBadges((prev) =>
      prev.map((b, idx) => (idx === badgeIndex ? { ...b, earned: true } : b))
    );
  };

  // Stage transitions with badge awards
  const goToStage1 = () => {
    startBackgroundMusic();
    setCurrentStage('stage1_concept');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStage1Complete = () => {
    markBadgeEarned(0);
    setCompletedStages((prev) => ({ ...prev, stage1_concept: true }));
    setCurrentStage('stage2_appearance');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStage2Complete = () => {
    markBadgeEarned(1);
    setCompletedStages((prev) => ({ ...prev, stage2_appearance: true }));
    setCurrentStage('stage3_training');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStage3Complete = () => {
    markBadgeEarned(2);
    setCompletedStages((prev) => ({ ...prev, stage3_training: true }));
    updateCharacter({ hasLearnedStyle: true });
    setCurrentStage('stage4_prompt');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStage4Complete = () => {
    markBadgeEarned(3);
    setCompletedStages((prev) => ({ ...prev, stage4_prompt: true }));
    setCurrentStage('stage5_image');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStage5Complete = () => {
    markBadgeEarned(4);
    setCompletedStages((prev) => ({ ...prev, stage5_image: true }));
    setCurrentStage('stage6_3d');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStage6Complete = () => {
    markBadgeEarned(5);
    setCompletedStages((prev) => ({ ...prev, stage6_3d: true }));
    setCurrentStage('victory');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setCharacter(INITIAL_CHARACTER);
    setBadges(INITIAL_BADGES);
    setCompletedStages({});
    setCurrentStage('intro');
    try {
      localStorage.removeItem('renderia_lab_state');
    } catch {
      // Ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalXP = badges
    .filter((b) => b.earned)
    .reduce((sum, b) => sum + b.xp, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFD] text-[#252735] flex flex-col font-sans">
      {/* Top Header */}
      <Header
        currentStage={currentStage}
        xp={totalXP}
        onReset={handleReset}
        onGoHome={() => {
          setCurrentStage('intro');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Quest Adventure Roadmap */}
      <StageRoadmap
        currentStage={currentStage}
        onSelectStage={(stage) => {
          setCurrentStage(stage);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        completedStages={completedStages}
      />

      {/* Stage Views */}
      <main className="flex-1 pb-16">
        {currentStage === 'intro' && <IntroScreen onStart={goToStage1} />}

        {currentStage === 'stage1_concept' && (
          <Stage1Concept
            character={character}
            onUpdate={updateCharacter}
            onNext={handleStage1Complete}
          />
        )}

        {currentStage === 'stage2_appearance' && (
          <Stage2Appearance
            character={character}
            onUpdate={updateCharacter}
            onNext={handleStage2Complete}
            onPrev={() => setCurrentStage('stage1_concept')}
          />
        )}

        {currentStage === 'stage3_training' && (
          <Stage3PromptTraining
            character={character}
            onUpdate={updateCharacter}
            onNext={handleStage3Complete}
            onPrev={() => setCurrentStage('stage2_appearance')}
          />
        )}

        {currentStage === 'stage4_prompt' && (
          <Stage4PromptAssembly
            character={character}
            onUpdate={updateCharacter}
            onNext={handleStage4Complete}
            onPrev={() => setCurrentStage('stage3_training')}
          />
        )}

        {currentStage === 'stage5_image' && (
          <Stage5GenerateImage
            character={character}
            onUpdate={updateCharacter}
            onNext={handleStage5Complete}
            onPrev={() => setCurrentStage('stage4_prompt')}
          />
        )}

        {currentStage === 'stage6_3d' && (
          <Stage6Prepare3D
            character={character}
            onUpdate={updateCharacter}
            onNext={handleStage6Complete}
            onPrev={() => setCurrentStage('stage5_image')}
          />
        )}

        {currentStage === 'victory' && (
          <FinalAchievement
            character={character}
            xp={totalXP}
            badges={badges}
            onRestart={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 text-center text-xs text-slate-500 font-medium">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              setCurrentStage('intro');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            title="Вернуться на главную страницу"
          >
            <span className="font-display font-black text-[#252735]">
              RENDERIA
            </span>
            <span>•</span>
            <span>Аватар-лаборатория для детей</span>
          </button>

          <div className="text-slate-400 font-semibold">
            Творческая мастерская персонажей
          </div>
        </div>
      </footer>
    </div>
  );
}
