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
  accMagicStaff: '/src/assets/images/acc_magic_staff_1792783689708.jpg',
  gearGlowSneakers: '/src/assets/images/gear_glow_sneakers_1792783146398.jpg',
  gearStarBadge: '/src/assets/images/gear_star_badge_1792783146561.jpg',
  gearHoloMap: '/src/assets/images/gear_holo_map_1792783147508.jpg',
  gearPlasmaCape: '/src/assets/images/gear_plasma_cape_1792783147414.jpg',
  gearCyberCrown: '/src/assets/images/gear_cyber_crown_1792783691084.jpg',
  gearMagicPet: '/src/assets/images/gear_magic_pet_1792783690749.jpg',
};

// External AI Image Generator Services (Single configuration point)
export const EXTERNAL_IMAGE_GENERATORS = [
  {
    id: 'bing',
    name: 'Bing Image Creator (DALL-E 3)',
    url: 'https://www.bing.com/images/create',
    description: 'Бесплатный генератор от Microsoft, отлично понимает сложные промпты',
    color: '#62C9F5',
  },
  {
    id: 'recraft',
    name: 'Recraft AI',
    url: 'https://www.recraft.ai/',
    description: 'Специализирован на 3D-иконках, векторной графике и чистых фонах',
    color: '#B9F24D',
  },
  {
    id: 'leonardo',
    name: 'Leonardo.Ai',
    url: 'https://leonardo.ai/',
    description: 'Популярен среди геймдев-дизайнеров для создания игровых персонажей',
    color: '#BDA7FF',
  },
  {
    id: 'ideogram',
    name: 'Ideogram',
    url: 'https://ideogram.ai/',
    description: 'Точно следует стилю персонажей и пропорциям',
    color: '#FFB9D5',
  },
];

// External 3D Model Generator Services (Single configuration point)
export const EXTERNAL_3D_GENERATORS = [
  {
    id: 'tripo3d',
    name: 'Tripo3D',
    url: 'https://www.tripo3d.ai/',
    description: 'Быстрое превращение картинки в 3D-модель (GLB) за 10 секунд',
    color: '#62C9F5',
  },
  {
    id: 'meshy',
    name: 'Meshy AI',
    url: 'https://www.meshy.ai/',
    description: 'Генерация 3D-моделей с текстурами и оптимизированной сеткой для игр',
    color: '#BDA7FF',
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
    name: 'Салатовый и неон',
    primary: '#B9F24D',
    secondary: '#FFFFFF',
    accent: '#62C9F5',
  },
  {
    id: 'cyber_night',
    name: 'Ночной космос',
    primary: '#252735',
    secondary: '#BDA7FF',
    accent: '#FFB9D5',
  },
  {
    id: 'sky_aurora',
    name: 'Мятное небо',
    primary: '#62C9F5',
    secondary: '#E0F7FA',
    accent: '#B9F24D',
  },
  {
    id: 'sunset_glow',
    name: 'Розовый закат',
    primary: '#FFB9D5',
    secondary: '#FFF4E0',
    accent: '#BDA7FF',
  },
  {
    id: 'cotton_candy',
    name: 'Сахарная вата',
    primary: '#FF94C2',
    secondary: '#70E1FF',
    accent: '#FFD166',
  },
  {
    id: 'golden_phoenix',
    name: 'Золотой феникс',
    primary: '#E11D48',
    secondary: '#FBBF24',
    accent: '#FB923C',
  },
];

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
    name: 'Голо-визор',
    description: 'Светящийся экран с интерфейсом и эмоциями',
    image: ASSETS.accHoloVisor,
  },
  {
    id: 'jetpack',
    name: 'Реактивный джетпак',
    description: 'Компактный ранец со световым реактивным следом',
    image: ASSETS.accTwinJetpack,
  },
  {
    id: 'crystal_orb',
    name: 'Робот-сфера',
    description: 'Летающий круглый дрон-спутник с сенсорами',
    image: ASSETS.accDroneSphere,
  },
  {
    id: 'energy_blades',
    name: 'Световые клинки',
    description: 'Энергетические браслеты с выдвижными лезвиями',
    image: ASSETS.accEnergyBlades,
  },
  {
    id: 'cyber_wings',
    name: 'Крылья феи',
    description: 'Голографические полупрозрачные крылья за спиной',
    image: ASSETS.accCyberWings,
  },
  {
    id: 'magic_staff',
    name: 'Магический посох',
    description: 'Кристаллический посох с парящим энергетическим ядром',
    image: ASSETS.accMagicStaff,
  },
];

export const EXPRESSIONS = [
  {
    id: 'confident_smile',
    name: 'Смелая улыбка',
    emoji: '😎',
    description: 'Уверенность в победе и готовность к исследованию',
  },
  {
    id: 'focused_determined',
    name: 'Умный взгляд',
    emoji: '🧐',
    description: 'Внимательно анализирует каждую деталь',
  },
  {
    id: 'playful_wink',
    name: 'Подмигивание',
    emoji: '😉',
    description: 'Веселый и дружелюбный характер',
  },
  {
    id: 'excited_wonder',
    name: 'Восторг',
    emoji: '🤩',
    description: 'Глаза сияют при виде новых открытий',
  },
  {
    id: 'cute_happy',
    name: 'Милая улыбка',
    emoji: '🥰',
    description: 'Теплый, открытый и дружелюбный взгляд',
  },
  {
    id: 'cool_hero',
    name: 'Крутой герой',
    emoji: '🦸',
    description: 'Решительный вид настоящего супергероя',
  },
];

export const SPECIAL_GEAR = [
  {
    id: 'glowing_boots',
    name: 'Светящиеся кроссовки',
    description: 'Подошвы светятся и оставляют яркие световые искры при беге',
    image: ASSETS.gearGlowSneakers,
  },
  {
    id: 'badge_star',
    name: 'Золотой орден',
    description: 'Золотая эмблема на груди в форме пульсирующей звезды',
    image: ASSETS.gearStarBadge,
  },
  {
    id: 'holo_map',
    name: 'Голо-карта',
    description: 'Проекция 3D-планеты прямо над запястьем',
    image: ASSETS.gearHoloMap,
  },
  {
    id: 'plasma_cape',
    name: 'Неоновый плащ',
    description: 'Развевается при движении, переливаясь мягким светом',
    image: ASSETS.gearPlasmaCape,
  },
  {
    id: 'cyber_crown',
    name: 'Сияющая корона',
    description: 'Парящая кристальная диадема с мягким неоновым блеском',
    image: ASSETS.gearCyberCrown,
  },
  {
    id: 'magic_pet',
    name: 'Волшебный питомец',
    description: 'Маленький сияющий кибер-зверек на плече героя',
    image: ASSETS.gearMagicPet,
  },
];

export const VISUAL_STYLES: { id: VisualStyleId; name: string; description: string; tag: string }[] = [
  {
    id: 'roblox_3d',
    name: 'Стилизованный 3D-герой',
    description: 'Четкие узнаваемые формы, чистые текстуры, идеальные пропорции для 3D-моделирования',
    tag: 'Stylized 3D Character Figurine',
  },
  {
    id: 'plastic_toy',
    name: 'Виниловая стилизованная фигурка',
    description: 'Гладкий полуматовый пластик, мягкие скругления, акцентный студийный свет',
    tag: 'Stylized Vinyl Toy / Collectible',
  },
  {
    id: 'cyber_future',
    name: 'Футуристический кибер-стиль',
    description: 'Современные детали, светящиеся контуры, легкий неоновый акцент',
    tag: 'Sci-Fi Hero / Vibrant Digital 3D',
  },
];

/**
 * Prompt Synthesizer
 * Formulates structured prompt in Russian and English with strict 3D-ready requirements.
 */
export function buildSynthesizedPrompt(
  name: string,
  roleId: RoleId,
  power: string,
  styleId: VisualStyleId,
  appearance: AppearanceState,
  customRoleTitle?: string
): { ru: string; en: string } {
  const role = ROLES.find((r) => r.id === roleId) || ROLES[0];
  const charName = name.trim() || 'Герой RENDERIA';
  const roleTitleRu = roleId === 'custom' && customRoleTitle?.trim() ? customRoleTitle.trim() : role.title;
  const styleObj = VISUAL_STYLES.find((s) => s.id === styleId) || VISUAL_STYLES[0];

  // Russian prompt
  const ru = `3D-персонаж: ${charName}, роль — ${roleTitleRu}.
Особенность и способность: ${power}.
Внешний вид и одежда: ${appearance.outfit.name} (${appearance.outfit.description}).
Цветовая палитра костюма: основной цвет ${appearance.colorPalette.primary}, дополнительный ${appearance.colorPalette.secondary}, акцент ${appearance.colorPalette.accent}.
Аксессуар: ${appearance.accessory.name} (${appearance.accessory.description}).
Выражение лица: ${appearance.expression.name}.
Особая деталь: ${appearance.specialGear.name}.
Визуальный стиль: ${styleObj.name}, стилизованная 3D-фигурка / cartoon figurine, чистые гладкие поверхности, яркое равномерное освещение.
Ракурс и композиция для 3D-генерации: персонаж показан в полный рост (full-body), стоит прямо, один главный герой по центру, четкий силуэт, изолирован на чистом однородном светлом фоне, студийное освещение, без мелкого фонового мусора, высокое качество 3D-концепта.`;

  // English prompt optimized for AI image models (DALL-E 3, Midjourney, Recraft, Leonardo)
  const roleEnglishMap: Record<RoleId, string> = {
    cosmic_explorer: 'Cosmic Space Explorer',
    cyber_ninja: 'Cyber Ninja Hero',
    nature_guardian: 'Bio Nature Guardian',
    fantasy_traveler: 'Fantasy Mystic Traveler',
    custom: customRoleTitle?.trim() || 'Custom Stylized Hero',
  };

  const stylePromptMap: Record<VisualStyleId, string> = {
    roblox_3d: 'stylized 3D game character figurine, Pixar cartoon proportions, smooth toy materials',
    plastic_toy: 'stylized vinyl toy collectible, smooth matte plastic, clean rounded beveled edges',
    cyber_future: 'futuristic friendly sci-fi game character, clean metallic and glowing polymer panels',
  };

  const en = `Full-body stylized 3D character hero named "${charName}".
Role: ${roleEnglishMap[roleId] || 'Hero'}.
Special ability/power: ${power}.
Outfit: ${appearance.outfit.name}, ${appearance.outfit.description}.
Color scheme: primary ${appearance.colorPalette.name} with vibrant accents (${appearance.colorPalette.primary}, ${appearance.colorPalette.secondary}, ${appearance.colorPalette.accent}).
Accessory: ${appearance.accessory.name}, ${appearance.accessory.description}.
Face: expressive glowing visor face with ${appearance.expression.name}.
Distinctive gear: ${appearance.specialGear.name}, ${appearance.specialGear.description}.
Art Style: ${stylePromptMap[styleId]}, colorful vibrant lighting, studio toy render.
Camera & Composition for 3D modeling: Full-body standing pose, single character centered, high contrast, clean solid plain light studio background, isolated, sharp crisp silhouette ready for image-to-3D mesh generation, no background clutter, 8k render quality.`;

  return { ru, en };
}
