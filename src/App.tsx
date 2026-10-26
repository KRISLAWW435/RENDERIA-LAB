/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StageId, CharacterData, BadgeItem } from './types/avatar';
import { COLOR_PALETTES, POSES } from './data/labData';
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
import { CharacterProvider, useCharacter } from './context/CharacterContext';

const INITIAL_BADGES: BadgeItem[] = [
  {
    id: 'b1',
    title: 'Придумал концепцию',
    description: 'Определил класс и звучное имя своего героя',
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

const STAGE_TO_HASH: Record<StageId, string> = {
  intro: '#/',
  stage1_concept: '#/stage-1',
  stage2_appearance: '#/stage-2',
  stage3_training: '#/stage-3',
  stage4_prompt: '#/stage-4',
  stage5_image: '#/stage-5',
  stage6_3d: '#/stage-6',
  victory: '#/victory',
};

const HASH_TO_STAGE: Record<string, StageId> = {
  '': 'intro',
  '#': 'intro',
  '#/': 'intro',
  '#/stage-1': 'stage1_concept',
  '#stage-1': 'stage1_concept',
  '#/stage-2': 'stage2_appearance',
  '#stage-2': 'stage2_appearance',
  '#/stage-3': 'stage3_training',
  '#stage-3': 'stage3_training',
  '#/stage-4': 'stage4_prompt',
  '#stage-4': 'stage4_prompt',
  '#/stage-5': 'stage5_image',
  '#stage-5': 'stage5_image',
  '#/stage-6': 'stage6_3d',
  '#stage-6': 'stage6_3d',
  '#/victory': 'victory',
  '#victory': 'victory',
};

function AppContent() {
  const [currentStage, setCurrentStage] = useState<StageId>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash && hash !== '#/' && hash !== '#' && HASH_TO_STAGE[hash]) {
        return HASH_TO_STAGE[hash];
      }
      try {
        const saved = localStorage.getItem('renderia_lab_session');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.currentStage) {
            return parsed.currentStage;
          }
        }
      } catch {
        // Ignore
      }
    }
    return 'intro';
  });

  const { character, updateCharacter, resetCharacter } = useCharacter();
  const [badges, setBadges] = useState<BadgeItem[]>(() => {
    try {
      const saved = localStorage.getItem('renderia_lab_session');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.badges)) return parsed.badges;
      }
    } catch {
      // Ignore
    }
    return INITIAL_BADGES.map((b) => ({ ...b }));
  });
  const [completedStages, setCompletedStages] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('renderia_lab_session');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.completedStages && typeof parsed.completedStages === 'object') {
          return parsed.completedStages;
        }
      }
    } catch {
      // Ignore
    }
    return {};
  });
  const [sessionKey, setSessionKey] = useState(0);

  // Sync hash routing changes (Back/Forward or direct hash entry)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (HASH_TO_STAGE[hash] && HASH_TO_STAGE[hash] !== currentStage) {
        setCurrentStage(HASH_TO_STAGE[hash]);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentStage]);

  // Sync stage to URL hash when currentStage changes
  useEffect(() => {
    const targetHash = STAGE_TO_HASH[currentStage] || '#/';
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
  }, [currentStage]);

  // Save stage and badges changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'renderia_lab_session',
        JSON.stringify({
          currentStage,
          badges,
          completedStages,
        })
      );
    } catch {
      // Ignore
    }
  }, [currentStage, badges, completedStages]);

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
    try {
      localStorage.removeItem('renderia_lab_session');
      localStorage.removeItem('renderia_lab_state_v2');
      localStorage.removeItem('renderia_lab_state');
      sessionStorage.clear();
    } catch {
      // Ignore storage errors
    }

    resetCharacter();
    setBadges(INITIAL_BADGES.map((b) => ({ ...b, earned: false })));
    setCompletedStages({});
    setCurrentStage('intro');
    setSessionKey((prev) => prev + 1);

    if (typeof window !== 'undefined') {
      window.location.hash = '#/';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
      <main key={sessionKey} className="flex-1 pb-16">
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

export default function App() {
  return (
    <CharacterProvider>
      <AppContent />
    </CharacterProvider>
  );
}
