import { RoleOption, AppearanceState, RoleId, VisualStyleId } from '../types/avatar';

// Real generated assets from project
export const ASSETS = {
  labBg: '/src/assets/images/labbag.webp',
  pixelHappy: '/src/assets/pix/pixel1.webp',
  pixelThinking: '/src/assets/pix/pixel1.webp',
  pixelCelebrate: '/src/assets/pix/pixel1.webp',
  pixel1: '/src/assets/pix/pixel1.webp',
  robloxSampleHero: '/src/assets/images/roblox_sample_hero_1792768750990.jpg',
  roleCosmicExplorer: '/src/assets/images/role_cosmic_explorer_1792773201896.jpg',
  roleCyberNinja: '/src/assets/images/role_cyber_ninja_1792773216031.jpg',
  roleNatureGuardian: '/src/assets/images/role_nature_guardian_1792773231863.jpg',
  roleFantasyTraveler: '/src/assets/images/role_fantasy_traveler_1792773247734.jpg',
  suitTechSpacesuit: '/src/assets/images/suit_tech_spacesuit_1792783141357.jpg',
  suitCyberArmor: '/src/assets/images/suit_cyber_armor_1792783142647.jpg',
  suitHoodieTech: '/src/assets/images/suit_hoodie_tech_1792783143309.jpg',
  suitMagicTunic: '/src/assets/images/suit_magic_tunic_1792783143427.jpg',
  suitCyberDress: '/src/assets/images/suit_cyber_dress_1792783730282.jpg',
  suitPilotSuit: '/src/assets/images/suit_pilot_suit_1792783689073.jpg',
  accHoloVisor: '/src/assets/images/acc_holo_visor_1792783143024.jpg',
  accTwinJetpack: '/src/assets/images/acc_twin_jetpack_1792783145083.jpg',
  accDroneSphere: '/src/assets/images/acc_drone_sphere_1792783145273.jpg',
  accEnergyBlades: '/src/assets/images/acc_energy_blades_1792783146549.jpg',
  accCyberWings: '/src/assets/images/acc_cyber_wings_1792783688879.jpg',
  starGlasses: '/src/assets/images/star_glasses_1792999476154.jpg',
  heartGlasses: '/src/assets/images/heart_glasses_1792999492193.jpg',
  neonCrown: '/src/assets/images/neon_crown_1792999507768.jpg',
  propellerHat: '/src/assets/images/propeller_hat_1792999521493.jpg',
  cyberHeadphones: '/src/assets/images/cyber_headphones_antenna_1793000367539.jpg',
  wizardHat: '/src/assets/images/wizard_hat_1792999549301.jpg',
  accMagicStaff: '/src/assets/images/acc_magic_staff_1792783689708.jpg',
  gearGlowSneakers: '/src/assets/images/gear_glow_sneakers_1792783146398.jpg',
  gearStarBadge: '/src/assets/images/gear_star_badge_1792783146561.jpg',
  gearHoloMap: '/src/assets/images/gear_holo_map_1792783147508.jpg',
  gearPlasmaCape: '/src/assets/images/gear_plasma_cape_1792783147414.jpg',
  gearCyberCrown: '/src/assets/images/gear_cyber_crown_1792783691084.jpg',
  gearMagicPet: '/src/assets/images/gear_magic_pet_1792783690749.jpg',
  faceConfidentSmile: '/src/assets/images/face_confident_smile_1792861734760.jpg',
  faceSmartLook: '/src/assets/images/face_smart_look_1792861735348.jpg',
  facePlayfulWink: '/src/assets/images/face_playful_wink_1792861735426.jpg',
  faceExcitedWonder: '/src/assets/images/face_excited_wonder_1792861752905.jpg',
  faceCuteSmile: '/src/assets/images/face_cute_smile_1792861752651.jpg',
  faceCoolHero: '/src/assets/images/face_cool_hero_1792861753690.jpg',
  traitCheerful: '/src/assets/images/trait_cheerful_1792863801369.jpg',
  traitSerious: '/src/assets/images/trait_serious_1792863895522.jpg',
  traitSly: '/src/assets/images/trait_sly_1792863910086.jpg',
  traitVillain: '/src/assets/images/trait_villain_1792863925553.jpg',
  traitSmart: '/src/assets/images/trait_smart_1792863940275.jpg',
  traitGrumpy: '/src/assets/images/trait_grumpy_1792863955852.jpg',
  ninjaFlat2d: '/src/assets/images/ninja_flat_2d_1792913625393.jpg',
  ninja2dFire: '/src/assets/images/ninja_two_d_fire_clean_1792915072679.jpg',
  ninja3dStatic: '/src/assets/images/roblox_ninja_static_1792917005423.jpg',
  ninja3dFireBusy: '/src/assets/images/roblox_ninja_fire_busy_1792917016875.jpg',
  ninja3dFireWhite: '/src/assets/images/roblox_ninja_fire_white_1792917039773.jpg',
  ninja3dBlockyFire: '/src/assets/images/roblox_ninja_fire_busy_1792917016875.jpg',
  ninja3dTPose: '/src/assets/images/roblox_ninja_fire_white_1792917039773.jpg',
  accCyberHelmet: '/src/assets/images/acc_cyber_helmet_1792915560330.jpg',
  poseTPose: '/src/assets/images/pose_tpose_1792915571532.jpg',
  poseBattle: '/src/assets/images/pose_battle_1792915583739.jpg',
  poseHandsHips: '/src/assets/images/pose_hands_hips_1792915595620.jpg',
  poseVictory: '/src/assets/images/pose_victory_1792915606545.jpg',
  poseCrossedArms: '/src/assets/images/pose_crossed_arms_1792915616529.jpg',
  poseJump: '/src/assets/images/pose_jump_1792915627631.jpg',
  certificateBg: '/src/assets/images/certificate_bg_1793000138165.jpg',
  certGameBg: '/src/assets/images/cert_game_bg_1793001214533.jpg',
  certificatePng: '/src/assets/images/certificate.png',
  goldSeal: '/src/assets/images/gold_seal_1793000149791.jpg',
  printSeal: '/src/assets/images/print.png',
  signatureImg: '/src/assets/images/signature.png',
};

// External AI Image Generator Services (Single configuration point)
export const EXTERNAL_IMAGE_GENERATORS = [
  {
    id: 'google_flow',
    name: 'Google Flow',
    url: 'https://flow.google.com/',
    description:
      'Бесплатная генерация изображений с помощью моделей Imagen и Nano Banana. Позволяет не только создавать, но и редактировать картинки прямо в браузере.',
    color: '#B9F24D',
    isRecommended: true,
  },
  {
    id: 'qwen_chat',
    name: 'Qwen Chat',
    url: 'https://chat.qwen.ai/',
    description:
      'Бесплатный доступ к мощной модели Qwen-Image. Отлично понимает длинные промпты и точно передаёт детали.',
    color: '#62C9F5',
    isRecommended: false,
  },
  {
    id: 'bing',
    name: 'Bing Image Creator (DALL-E 3)',
    url: 'https://www.bing.com/images/create',
    description:
      'Бесплатный генератор от Microsoft на базе DALL-E 3. Хорошо справляется со сложными и точными описаниями.',
    color: '#BDA7FF',
    isRecommended: false,
  },
  {
    id: 'leonardo',
    name: 'Leonardo.Ai',
    url: 'https://leonardo.ai/',
    description:
      'Популярен среди гейм-дизайнеров. Специализируется на 3D-иконках, игровых ассетах и текстурах.',
    color: '#FFB9D5',
    isRecommended: false,
  },
];

// External 3D Model Generator Services (Single configuration point)
export const EXTERNAL_3D_GENERATORS = [
  {
    id: 'tripo3d',
    name: 'Tripo3D',
    url: 'https://www.tripo3d.ai/',
    description: 'Быстрое превращение картинки в 3D-модель (GLB) за 10 секунд',
    color: '#B9F24D',
    isRecommended: true,
  },
  {
    id: 'meshy',
    name: 'Meshy AI',
    url: 'https://www.meshy.ai/',
    description: 'Генерация 3D-моделей с текстурами и оптимизированной сеткой для игр',
    color: '#BDA7FF',
    isRecommended: false,
  },
];

export const ROLES: RoleOption[] = [
  {
    id: 'cosmic_explorer',
    title: 'Космический исследователь',
    badge: 'Галактика',
    tagline: 'Покоритель галактик',
    image: ASSETS.roleCosmicExplorer,
    description: 'Первооткрыватель далёких планет, летает на грави-ранцах и сканирует редкие звёздные кристаллы.',
    defaultPower: 'Управляет гравитацией и открывает порталы',
    suggestedPowers: [
      'Управляет гравитацией и открывает порталы',
      'Летает на реактивном квантовом ранце',
      'Сканирует тайные древние артефакты',
      'Защищается энергетическим звездным щитом',
      'Стреляет ослепительными фотонными лучами',
      'Создает защитные силовые купола для команды',
      'Путешествует сквозь гиперпространство со скоростью света',
    ],
    colorTheme: '#62C9F5',
    iconSvg: 'Rocket',
  },
  {
    id: 'cyber_ninja',
    title: 'Кибер-ниндзя',
    badge: 'Неополис',
    tagline: 'Мастер скрытности и кода',
    image: ASSETS.roleCyberNinja,
    description: 'Ловкий защитник цифровых городов с неоновыми клинками, способный мгновенно исчезать в коде.',
    defaultPower: 'Телепортируется сквозь цифровые стены',
    suggestedPowers: [
      'Телепортируется сквозь цифровые стены',
      'Раздваивается голографическими иллюзиями',
      'Заряжает прыжки электрической волной',
      'Взламывает защитные коды взглядом',
      'Метает неоновые сюрикены из чистой плазмы',
      'Становится абсолютно невидимым в тени',
      'Замедляет время в кибер-пространстве',
    ],
    colorTheme: '#B9F24D',
    iconSvg: 'Zap',
  },
  {
    id: 'nature_guardian',
    title: 'Хранитель природы',
    badge: 'Биосфера',
    tagline: 'Хранитель живого мира',
    image: ASSETS.roleNatureGuardian,
    description: 'Защитник волшебных экосистем, оживляет светящиеся растения и дружит с бионическими зверями.',
    defaultPower: 'Выращивает светящиеся био-кристаллы',
    suggestedPowers: [
      'Выращивает светящиеся био-кристаллы',
      'Понимает язык кибернетических животных',
      'Управляет потоками чистой энергии ветра',
      'Исцеляет механизмы живой лозой',
      'Призывает волшебного духа-помощника',
      'Окружает себя непробиваемым щитом из древней коры',
      'Очищает природу волной исцеляющего света',
    ],
    colorTheme: '#B9F24D',
    iconSvg: 'Sparkles',
  },
  {
    id: 'fantasy_traveler',
    title: 'Фантастический странник',
    badge: 'Кристаллиум',
    tagline: 'Искатель древних тайн',
    image: ASSETS.roleFantasyTraveler,
    description: 'Исследователь древней магии и технологий, носит зачарованный компас и кристаллический посох.',
    defaultPower: 'Замораживает время в радужной сфере',
    suggestedPowers: [
      'Замораживает время в радужной сфере',
      'Создает защитные рунические барьеры',
      'Превращает свет в твердые ступени',
      'Летает на парящем магическом диске',
      'Призывает стихийные вихри огня и воды',
      'Оживляет древние звездные созвездия',
      'Открывает скрытые сундуки с тайными сокровищами',
    ],
    colorTheme: '#BDA7FF',
    iconSvg: 'Compass',
  },
  {
    id: 'custom',
    title: 'Свой вариант',
    badge: 'Творчество',
    tagline: 'Придумай свой класс',
    image: ASSETS.pixelCelebrate,
    description: 'Твой собственный класс персонажа с уникальной ролью и суперспособностью.',
    defaultPower: 'Управляет энергией звезд и материей',
    suggestedPowers: [
      'Управляет космической гравитацией и порталами',
      'Создает непробиваемый голографический щит',
      'Стреляет стихийными искрами молнии и пламени',
      'Летает на сверхзвуковом парящем ранце',
      'Исцеляет союзников радужным сиянием',
      'Превращает мысли в светящиеся 3D-конструкции',
      'Телепортируется и проходит сквозь любые преграды',
    ],
    colorTheme: '#BDA7FF',
    iconSvg: 'Wand2',
  },
];

export const COLOR_PALETTES = [
  {
    id: 'lime_space',
    name: 'Салатовый и Белый',
    colors: ['салатовый', 'белый', 'неоновый'],
    promptColors: 'салатовый, белый, неоновый',
    primary: '#B9F24D',
    secondary: '#FFFFFF',
    accent: '#62C9F5',
  },
  {
    id: 'cyber_night',
    name: 'Темно-синий и Фиолетовый',
    colors: ['темно-синий', 'фиолетовый', 'розовый'],
    promptColors: 'темно-синий, фиолетовый, розовый',
    primary: '#252735',
    secondary: '#BDA7FF',
    accent: '#FFB9D5',
  },
  {
    id: 'sky_aurora',
    name: 'Голубой и Мятный',
    colors: ['голубой', 'мятный', 'белый'],
    promptColors: 'голубой, мятный, белый',
    primary: '#62C9F5',
    secondary: '#E0F7FA',
    accent: '#B9F24D',
  },
  {
    id: 'sunset_glow',
    name: 'Розовый и Персиковый',
    colors: ['розовый', 'персиковый', 'лавандовый'],
    promptColors: 'розовый, персиковый, лавандовый',
    primary: '#FFB9D5',
    secondary: '#FFF4E0',
    accent: '#BDA7FF',
  },
  {
    id: 'cotton_candy',
    name: 'Розовый и Бирюзовый',
    colors: ['розовый', 'бирюзовый', 'жёлтый'],
    promptColors: 'розовый, бирюзовый, жёлтый',
    primary: '#FF94C2',
    secondary: '#70E1FF',
    accent: '#FFD166',
  },
  {
    id: 'golden_phoenix',
    name: 'Красный и Оранжевый',
    colors: ['красный', 'золотой', 'оранжевый'],
    promptColors: 'красный, золотой, оранжевый',
    primary: '#E11D48',
    secondary: '#FBBF24',
    accent: '#FB923C',
  },
];

/**
 * Resolve plain literal color string for prompts and UI tags.
 * Ensures abstract names (like "Мятное небо", "Ночной космос") never leak into the prompt text.
 */
export function resolvePaletteColors(palette?: {
  id?: string;
  name?: string;
  promptColors?: string;
  colors?: string[];
  primary?: string;
  secondary?: string;
  accent?: string;
} | null): string {
  if (!palette || !palette.id) return '';

  // 1. If primary, secondary, and accent hexes exist, always list them directly without any label or prefix
  if (palette.primary && palette.secondary && palette.accent) {
    return `${palette.primary}, ${palette.secondary}, ${palette.accent}`;
  }

  // 2. Extract hex codes if present in promptColors or name (e.g. "Мой цвет (#06b0f9, #fb5050, #08c485)")
  const rawColorsText = `${palette.promptColors || ''} ${palette.name || ''}`;
  const hexMatch = rawColorsText.match(/#[0-9a-fA-F]{3,8}(?:\s*,\s*#[0-9a-fA-F]{3,8})+/);
  if (hexMatch) {
    return hexMatch[0];
  }

  // 3. If preset id matches, always return its canonical literal colors
  const preset = COLOR_PALETTES.find((p) => p.id === palette.id);
  if (preset) {
    return preset.promptColors || preset.colors.join(', ');
  }

  // 4. If colors array exists
  if (Array.isArray(palette.colors) && palette.colors.length > 0) {
    return palette.colors.join(', ');
  }

  // 5. If promptColors is provided, sanitize and check against legacy titles
  if (palette.promptColors && typeof palette.promptColors === 'string') {
    let cleaned = palette.promptColors.trim();
    if (cleaned.toLowerCase().includes('мой цвет') || cleaned.toLowerCase().includes('свой цвет')) {
      const match = cleaned.match(/\((.*?)\)/);
      if (match && match[1]) {
        cleaned = match[1].trim();
      } else {
        cleaned = cleaned.replace(/^(мой|свой)\s+цвет\s*:?\s*/i, '').trim();
      }
    }
    const legacyTitles = [
      'Мятное небо',
      'Небесный & Мята',
      'Ночной космос',
      'Розовый закат',
      'Золотой феникс',
      'Сахарная вата',
      'Салатовый и неон',
    ];
    if (!legacyTitles.includes(cleaned) && cleaned) {
      return cleaned;
    }
  }

  // 6. Custom palette fallback
  if (palette.id === 'custom_palette') {
    if (palette.name && palette.name !== 'Свой цвет' && palette.name !== 'Мой цвет') {
      return palette.name;
    }
  }

  return '';
}

export const OUTFITS = [
  {
    id: 'tech_suit',
    name: 'Космический скафандр',
    description: 'Модульный белый скафандр со светящимися линиями',
    image: ASSETS.suitTechSpacesuit,
  },
  {
    id: 'cyber_armor',
    name: 'Броня ниндзя',
    description: 'Гибкая высокотехнологичная броня с неоновыми щитками',
    image: ASSETS.suitCyberArmor,
  },
  {
    id: 'hoodie_explorer',
    name: 'Неоновое худи',
    description: 'Яркое оверсайз-худи с капюшоном и спортивными штанами',
    image: ASSETS.suitHoodieTech,
  },
  {
    id: 'magic_tunic',
    name: 'Мантия мага',
    description: 'Парящая волшебная мантия с сияющими рунами',
    image: ASSETS.suitMagicTunic,
  },
  {
    id: 'cyber_dress',
    name: 'Кибер-платье',
    description: 'Футуристическое светящееся платье с геометрическими узорами',
    image: ASSETS.suitCyberDress,
  },
  {
    id: 'pilot_suit',
    name: 'Костюм пилота',
    description: 'Стильный летный комбинезон звездного пилота с ремнями',
    image: ASSETS.suitPilotSuit,
  },
];

export const ACCESSORIES = [
  {
    id: 'visor_helmet',
    name: 'Светящийся голо-визор',
    description: 'Светящийся экран с интерфейсом и эмоциями',
    image: ASSETS.accHoloVisor,
  },
  {
    id: 'jetpack',
    name: 'Реактивный джетпак с пламенем',
    description: 'Компактный ранец со световым реактивным следом',
    image: ASSETS.accTwinJetpack,
  },
  {
    id: 'energy_bracers',
    name: 'Боевые наручи с энергетическими клинками',
    description: 'Боевые наручи со световыми защитными щитками',
    image: ASSETS.accEnergyBlades,
  },
  {
    id: 'cyber_wings',
    name: 'Светящиеся крылья феи',
    description: 'Голографические полупрозрачные крылья за спиной',
    image: ASSETS.accCyberWings,
  },
  {
    id: 'star_glasses',
    name: 'Звездные очки',
    description: 'Стильные золотые очки в форме сияющих звезд',
    image: ASSETS.starGlasses,
  },
  {
    id: 'heart_glasses',
    name: 'Очки в форме сердечек',
    description: 'Яркие розовые очки в форме сердец с глянцем',
    image: ASSETS.heartGlasses,
  },
  {
    id: 'neon_crown',
    name: 'Неоновая корона',
    description: 'Королевская корона из золота и бирюзового неона',
    image: ASSETS.neonCrown,
  },
  {
    id: 'propeller_hat',
    name: 'Смешная шапка-пропеллер',
    description: 'Разноцветная кепка с забавным вращающимся пропеллером',
    image: ASSETS.propellerHat,
  },
  {
    id: 'cyber_headphones',
    name: 'Кибер-наушники с антеннами',
    description: 'Футуристичные наушники со светящимися антеннами',
    image: ASSETS.cyberHeadphones,
  },
  {
    id: 'wizard_hat',
    name: 'Волшебная шляпа звездочета',
    description: 'Магический колпак с золотыми звездами и созвездиями',
    image: ASSETS.wizardHat,
  },
];

export const EXPRESSIONS = [
  {
    id: 'cheerful',
    name: 'Радостный',
    emoji: '✨',
    image: ASSETS.traitCheerful,
    description: 'Полон позитива, открытой улыбки и бодрой энергии',
  },
  {
    id: 'serious',
    name: 'Серьезный',
    emoji: '🎯',
    image: ASSETS.traitSerious,
    description: 'Сфокусирован, решителен и предельно собран',
  },
  {
    id: 'sly',
    name: 'Хитрый',
    emoji: '🦊',
    image: ASSETS.traitSly,
    description: 'Любит загадки, ловкие ходы и хитрые трюки',
  },
  {
    id: 'villain',
    name: 'Злодей',
    emoji: '😈',
    image: ASSETS.traitVillain,
    description: 'Коварный гений с озорной ухмылкой',
  },
  {
    id: 'smart',
    name: 'Умный',
    emoji: '🧠',
    image: ASSETS.traitSmart,
    description: 'Аналитический склад ума, логика и интеллект',
  },
  {
    id: 'grumpy',
    name: 'Ворчун',
    emoji: '😒',
    image: ASSETS.traitGrumpy,
    description: 'Скептик с забавным комичным выражением лица',
  },
];

export const POSES = [
  {
    id: 'tpose',
    name: 'Стоит ровно (T-поза)',
    description: 'Классическая Т-поза с разведенными руками для 3D-моделирования',
    image: ASSETS.poseTPose,
  },
  {
    id: 'battle',
    name: 'Динамичная боевая стойка',
    description: 'Готовность к бою с полусогнутыми коленями и поднятыми кулаками',
    image: ASSETS.poseBattle,
  },
  {
    id: 'hands_hips',
    name: 'Руки на поясе',
    description: 'Уверенная героическая стойка супергероя',
    image: ASSETS.poseHandsHips,
  },
  {
    id: 'victory',
    name: 'Победная поза',
    description: 'Триумфальный жест победы с поднятым вверх кулаком',
    image: ASSETS.poseVictory,
  },
  {
    id: 'arms_crossed',
    name: 'Скрещенные руки',
    description: 'Спокойная и крутая поза со скрещенными на груди руками',
    image: ASSETS.poseCrossedArms,
  },
  {
    id: 'jump',
    name: 'Прыжок в воздухе',
    description: 'Динамичный прыжок в движении с согнутыми ногами',
    image: ASSETS.poseJump,
  },
];

// Deprecated alias for backwards compatibility
export const SPECIAL_GEAR = POSES;

export const VISUAL_STYLES: { id: VisualStyleId; name: string; description: string; tag: string }[] = [
  {
    id: 'roblox_3d',
    name: 'стиль Roblox',
    description: 'Блочный аватар, классические пропорции, чистые текстуры для 3D-моделирования',
    tag: 'Classic Roblox Blocky Avatar 3D',
  },
  {
    id: 'plastic_toy',
    name: 'виниловая 3D-фигурка',
    description: 'Гладкий полуматовый пластик, мягкие скругления, акцентный студийный свет',
    tag: 'Stylized Vinyl Toy / Collectible',
  },
  {
    id: 'cyber_future',
    name: 'футуристический кибер-стиль',
    description: 'Современные детали, светящиеся контуры, легкий неоновый акцент',
    tag: 'Sci-Fi Hero / Vibrant Digital 3D',
  },
];

/**
 * Prompt Synthesizer
 * Formulates structured prompt in Russian and English with strict 3D-ready requirements.
 * Appends visual style only when hasLearnedStyle is true.
 */
export function buildSynthesizedPrompt(
  name?: string,
  roleId?: RoleId | null | '',
  styleId?: VisualStyleId,
  appearance?: AppearanceState | null,
  customRoleTitle?: string,
  hasLearnedStyle: boolean = true
): { ru: string; en: string } {
  const hasRole = Boolean(roleId);
  const hasOutfit = Boolean(appearance?.outfit?.name?.trim());
  const hasAccessory = Boolean(appearance?.accessory?.name?.trim());
  const colors = resolvePaletteColors(appearance?.colorPalette);
  const hasColors = Boolean(colors?.trim());
  const hasExpression = Boolean(appearance?.expression?.name?.trim());
  const hasPose = Boolean(appearance?.pose?.name?.trim());

  const hasAnyCategory =
    hasRole || hasOutfit || hasAccessory || hasColors || hasExpression || hasPose;

  if (!hasAnyCategory) {
    return { ru: '', en: '' };
  }

  let ru = 'Создай оригинального игрового персонажа. ';
  if (hasRole) {
    const role = ROLES.find((r) => r.id === roleId);
    const roleTitleRu =
      roleId === 'custom' && customRoleTitle?.trim() ? customRoleTitle.trim() : (role?.title || 'Герой');
    ru += `Роль: ${roleTitleRu}. `;
  }
  if (hasOutfit) ru += `Костюм: ${appearance!.outfit!.name.trim()}. `;
  if (hasAccessory) ru += `Аксессуар: ${appearance!.accessory!.name.trim()}. `;
  if (hasColors) ru += `Цвета костюма: ${colors.trim()}. `;
  if (hasExpression) ru += `Характер: ${appearance!.expression!.name.trim()}. `;
  if (hasPose) ru += `Поза: ${appearance!.pose!.name.trim()}. `;

  ru += 'Покажи персонажа целиком на чистом изолированном белом фоне.';

  if (hasLearnedStyle) {
    ru += ' Стиль: Roblox.';
  }

  // English prompt optimized for AI image models (DALL-E 3, Midjourney, Recraft, Leonardo)
  const roleEnglishMap: Record<RoleId, string> = {
    cosmic_explorer: 'Cosmic Space Explorer',
    cyber_ninja: 'Cyber Ninja Hero',
    nature_guardian: 'Bio Nature Guardian',
    fantasy_traveler: 'Fantasy Mystic Traveler',
    custom: customRoleTitle?.trim() || 'Custom Stylized Hero',
  };

  let en = 'Create an original 3D game character. ';
  if (hasRole && roleId) {
    en += `Role: ${roleEnglishMap[roleId] || 'Hero'}. `;
  }
  if (hasOutfit) en += `Costume: ${appearance!.outfit!.name.trim()}. `;
  if (hasAccessory) en += `Accessory: ${appearance!.accessory!.name.trim()}. `;
  if (hasColors) en += `Colors: ${colors.trim()}. `;
  if (hasExpression) en += `Character: ${appearance!.expression!.name.trim()}. `;
  if (hasPose) en += `Pose: ${appearance!.pose!.name.trim()}. `;

  en +=
    'Full-body shot, single character centered, high contrast, clean solid plain light studio background, isolated, sharp crisp silhouette ready for image-to-3D mesh generation.';

  if (hasLearnedStyle) {
    en += ' Art style: classic Roblox blocky avatar style, clean block proportions, smooth plastic toy materials.';
  }

  return { ru: sanitizePromptRu(ru), en: en.trim() };
}

/**
 * Ensures Russian prompt strings strictly conform to specification:
 * - "Цвета костюма: ..." instead of "Цвета: ..." or "Цвета: Мой цвет (...)"
 * - "на чистом изолированном белом фоне" instead of "на чистом светлом фоне"
 * - "Стиль: Roblox."
 */
export function sanitizePromptRu(prompt?: string | null): string {
  if (!prompt) return '';
  return prompt
    .replace(/Имя:\s*[^.]*\.\s*/gi, '')
    .replace(/Суперспособность:\s*[^.]*\.\s*/gi, '')
    .replace(/Аксессуар:\s*Голо-визор\./gi, 'Аксессуар: Светящийся голо-визор.')
    .replace(/Аксессуар:\s*Реактивный джетпак\./gi, 'Аксессуар: Реактивный джетпак с пламенем.')
    .replace(/Аксессуар:\s*Плащ\./gi, 'Аксессуар: Светящийся энергетический плащ.')
    .replace(/Аксессуар:\s*Наручи\./gi, 'Аксессуар: Боевые наручи с энергетическими клинками.')
    .replace(/Аксессуар:\s*Крылья\./gi, 'Аксессуар: Светящиеся крылья феи.')
    .replace(/Аксессуар:\s*Шлем\./gi, 'Аксессуар: Футуристичный шлем с визором.')
    .replace(/Цвета:\s*(?:Мой цвет|Свой цвет)?\s*\((.*?)\)/gi, 'Цвета костюма: $1')
    .replace(/Цвета:\s*(?:Мой цвет|Свой цвет)\s*/gi, 'Цвета костюма: ')
    .replace(/Цвета:\s*/gi, 'Цвета костюма: ')
    .replace(/Цвета костюма:\s*(?:Мой цвет|Свой цвет)\s*\((.*?)\)/gi, 'Цвета костюма: $1')
    .replace(/Цвета костюма:\s*(?:Мой цвет|Свой цвет)\s*/gi, 'Цвета костюма: ')
    .replace(/на чистом светлом фоне/gi, 'на чистом изолированном белом фоне')
    .replace(/Стиль:\s*стиль\s+Roblox\.?/gi, 'Стиль: Roblox.')
    .replace(/Стиль:\s*Roblox\.?/gi, 'Стиль: Roblox.')
    .replace(/Стиль\s+Roblox\.?/gi, 'Стиль: Roblox.')
    .replace(/Стиль:\s*виниловая 3D-фигурка\.?/gi, 'Стиль: Roblox.')
    .replace(/Стиль:\s*футуристический кибер-стиль\.?/gi, 'Стиль: Roblox.')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Dynamic "Мой промпт" (Live Prompt Builder)
 * Automatically updates as the child selects role, colors, suit, accessory, trait, and pose in Stages 1 & 2.
 * Follows conditional puzzle logic: only appends text for categories that have been chosen.
 * If nothing selected yet, returns an empty string.
 */
export function buildLiveUserPrompt(character: {
  role?: RoleId | null | '';
  customRoleTitle?: string;
  name?: string;
  style?: VisualStyleId;
  appearance?: AppearanceState | null;
  hasLearnedStyle?: boolean;
}): string {
  const hasRole = Boolean(character.role);
  const hasOutfit = Boolean(character.appearance?.outfit?.name?.trim());
  const hasAccessory = Boolean(character.appearance?.accessory?.name?.trim());
  const colors = resolvePaletteColors(character.appearance?.colorPalette);
  const hasColors = Boolean(colors?.trim());
  const hasExpression = Boolean(character.appearance?.expression?.name?.trim());
  const hasPose = Boolean(character.appearance?.pose?.name?.trim());

  const hasAnyCategory =
    hasRole || hasOutfit || hasAccessory || hasColors || hasExpression || hasPose;

  if (!hasAnyCategory) {
    return '';
  }

  let prompt = 'Создай оригинального игрового персонажа. ';
  if (hasRole) {
    const roleMeta = ROLES.find((r) => r.id === character.role);
    const roleTitle =
      character.role === 'custom' && character.customRoleTitle?.trim()
        ? character.customRoleTitle.trim()
        : (roleMeta?.title || 'Герой');
    prompt += `Роль: ${roleTitle}. `;
  }
  if (hasOutfit) prompt += `Костюм: ${character.appearance!.outfit!.name.trim()}. `;
  if (hasAccessory) prompt += `Аксессуар: ${character.appearance!.accessory!.name.trim()}. `;
  if (hasColors) prompt += `Цвета костюма: ${colors.trim()}. `;
  if (hasExpression) prompt += `Характер: ${character.appearance!.expression!.name.trim()}. `;
  if (hasPose) prompt += `Поза: ${character.appearance!.pose!.name.trim()}. `;

  prompt += 'Покажи персонажа целиком на чистом изолированном белом фоне.';

  if (character.hasLearnedStyle) {
    prompt += ' Стиль: Roblox.';
  }

  return sanitizePromptRu(prompt);
}
