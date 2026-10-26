import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CharacterData, AppearanceState } from '../types/avatar';
import { sanitizePromptRu } from '../data/labData';

export const EMPTY_APPEARANCE: AppearanceState = {
  colorPalette: null,
  outfit: null,
  accessory: null,
  expression: null,
  pose: null,
  specialGear: null,
};

export const INITIAL_EMPTY_CHARACTER: CharacterData = {
  name: '',
  role: null,
  customRoleTitle: '',
  style: 'roblox_3d',
  hasLearnedStyle: false,
  appearance: EMPTY_APPEARANCE,
  isPromptCustomized: false,
  threeDChecks: {
    fullBody: true,
    singleHero: true,
    clearBackground: true,
    sharpDetails: true,
  },
  generatedImageSource: null,
};

const ACCESSORY_NAME_MIGRATION: Record<string, string> = {
  'Голо-визор': 'Светящийся голо-визор',
  'Реактивный джетпак': 'Реактивный джетпак с пламенем',
  'Плащ': 'Неоновая корона',
  'Светящийся энергетический плащ': 'Неоновая корона',
  'Наручи': 'Боевые наручи с энергетическими клинками',
  'Крылья': 'Светящиеся крылья феи',
  'Шлем': 'Кибер-наушники с антеннами',
  'Футуристичный шлем с визором': 'Кибер-наушники с антеннами',
};

interface CharacterContextType {
  character: CharacterData;
  updateCharacter: (patch: Partial<CharacterData>) => void;
  resetCharacter: () => void;
  setCharacter: React.Dispatch<React.SetStateAction<CharacterData>>;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

const STORAGE_KEY = 'renderia_lab_state_v2';

export const CharacterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [character, setCharacter] = useState<CharacterData>(() => {
    try {
      // First check v2 storage
      const savedV2 = localStorage.getItem(STORAGE_KEY);
      if (savedV2) {
        const parsed = JSON.parse(savedV2);
        if (parsed.character) {
          const char = parsed.character;
          delete char.power; // Remove legacy power property

          // Migrate any legacy accessory name
          if (char.appearance?.accessory?.name && ACCESSORY_NAME_MIGRATION[char.appearance.accessory.name]) {
            char.appearance.accessory.name = ACCESSORY_NAME_MIGRATION[char.appearance.accessory.name];
          }

          return {
            ...INITIAL_EMPTY_CHARACTER,
            ...char,
            customPromptRu: char.customPromptRu ? sanitizePromptRu(char.customPromptRu) : undefined,
            style: 'roblox_3d',
            appearance: {
              ...EMPTY_APPEARANCE,
              ...(char.appearance || {}),
            },
          };
        }
      }

      // Check legacy storage and migrate away from hardcoded initial character
      const savedLegacy = localStorage.getItem('renderia_lab_state');
      if (savedLegacy) {
        const parsed = JSON.parse(savedLegacy);
        if (parsed.character && parsed.character.name === 'Астро-Пилот') {
          localStorage.removeItem('renderia_lab_state');
          return INITIAL_EMPTY_CHARACTER;
        }
      }
    } catch {
      // fallback to initial empty state
    }
    return INITIAL_EMPTY_CHARACTER;
  });

  const updateCharacter = (patch: Partial<CharacterData>) => {
    setCharacter((prev) => {
      const nextAppearance = patch.appearance
        ? { ...prev.appearance, ...patch.appearance }
        : prev.appearance;
      const updated: CharacterData = {
        ...prev,
        ...patch,
        appearance: nextAppearance,
      };

      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ character: updated })
        );
      } catch {
        // ignore
      }

      return updated;
    });
  };

  const resetCharacter = () => {
    setCharacter(INITIAL_EMPTY_CHARACTER);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('renderia_lab_state');
    } catch {
      // ignore
    }
  };

  return (
    <CharacterContext.Provider
      value={{ character, updateCharacter, resetCharacter, setCharacter }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = (): CharacterContextType => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
};
