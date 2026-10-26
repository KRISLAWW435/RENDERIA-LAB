export type StageId = 
  | 'intro'
  | 'stage1_concept'
  | 'stage2_appearance'
  | 'stage3_training'
  | 'stage4_prompt'
  | 'stage5_image'
  | 'stage6_3d'
  | 'victory';

export type RoleId = 'cosmic_explorer' | 'cyber_ninja' | 'nature_guardian' | 'fantasy_traveler' | 'custom';

export type VisualStyleId = 'roblox_3d' | 'plastic_toy' | 'cyber_future';

export interface RoleOption {
  id: RoleId;
  title: string;
  badge: string;
  tagline: string;
  image: string;
  description: string;
  defaultPower: string;
  suggestedPowers: string[];
  colorTheme: string;
  iconSvg: string;
}

export interface AppearanceState {
  colorPalette: {
    id: string;
    name: string;
    promptColors: string;
    colors?: string[];
    primary: string;
    secondary: string;
    accent: string;
  } | null;
  outfit: {
    id: string;
    name: string;
    description: string;
    image?: string;
  } | null;
  accessory: {
    id: string;
    name: string;
    description: string;
    image?: string;
  } | null;
  expression: {
    id: string;
    name: string;
    emoji?: string;
    description: string;
    image?: string;
  } | null;
  pose: {
    id: string;
    name: string;
    description: string;
    image?: string;
  } | null;
  specialGear?: {
    id: string;
    name: string;
    description: string;
    image?: string;
  } | null;
}

export interface CharacterData {
  name: string;
  role: RoleId | null | '';
  customRoleTitle?: string;
  power: string;
  style: VisualStyleId;
  hasLearnedStyle?: boolean;
  appearance: AppearanceState;
  customPromptRu?: string;
  customPromptEn?: string;
  livePrompt?: string;
  isPromptCustomized: boolean;
  generatedImageUrl?: string;
  generatedImageSource: 'sample' | 'uploaded' | null;
  evaluationNote?: string;
  threeDChecks: {
    fullBody: boolean;
    singleHero: boolean;
    clearBackground: boolean;
    sharpDetails: boolean;
  };
  threeDResultUrl?: string;
}

export interface BadgeItem {
  id: string;
  title: string;
  description: string;
  xp: number;
  earned: boolean;
}
