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
    name: 'Салатовый & Неон',
    primary: '#B9F24D',
    secondary: '#FFFFFF',
    accent: '#62C9F5',
  },
  {
    id: 'cyber_night',
    name: 'Графит & Фиолет',
    primary: '#252735',
    secondary: '#BDA7FF',
    accent: '#FFB9D5',
  },
  {
    id: 'sky_aurora',
    name: 'Небесный & Мята',
    primary: '#62C9F5',
    secondary: '#E0F7FA',
    accent: '#B9F24D',
  },
  {
    id: 'sunset_glow',
    name: 'Розовый & Золото',
    primary: '#FFB9D5',
    secondary: '#FFF4E0',
    accent: '#BDA7FF',
  },
];

export const OUTFITS = [
  {
    id: 'tech_suit',
    name: 'Герметичный скафандр',
    description: 'Модульный высокотехнологичный костюм с неоновыми светящимися швами',
  },
  {
    id: 'cyber_armor',
    name: 'Легкая композитная броня',
    description: 'Гибкие пластины с аэродинамическими щитками на плечах',
  },
  {
    id: 'hoodie_explorer',
    name: 'Стильное оверсайз-худи',
    description: 'Уютное худи с голографическим принтом и спортивными карго-штанами',
  },
  {
    id: 'magic_tunic',
    name: 'Защитная мантия странника',
    description: 'Мантия с парящими геометрическими узорами и прочным поясом',
  },
];

export const ACCESSORIES = [
  {
    id: 'visor_helmet',
    name: 'Голографический визор',
    description: 'Светящийся экран с интерфейсом данных и эмоциями',
  },
  {
    id: 'jetpack',
    name: 'Двухтурбинный джетпак',
    description: 'Компактный реактивный ранец со световым следом',
  },
  {
    id: 'crystal_orb',
    name: 'Парящий спутник-сфера',
    description: 'Миниатюрный летающий дрон-помощник',
  },
  {
    id: 'energy_blades',
    name: 'Энергетические наручи',
    description: 'Браслеты с выдвижными световыми щитками',
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
    name: 'Сосредоточенный взгляд',
    emoji: '🧐',
    description: 'Внимательно анализирует каждую деталь',
  },
  {
    id: 'playful_wink',
    name: 'Задорный подмигивание',
    emoji: '😉',
    description: 'Веселый и дружелюбный характер',
  },
  {
    id: 'excited_wonder',
    name: 'Эмоция восторга',
    emoji: '🤩',
    description: 'Глаза сияют при виде новых открытий',
  },
];

export const SPECIAL_GEAR = [
  {
    id: 'glowing_boots',
    name: 'Светодиодные кроссовки',
    description: 'Подошвы светятся и оставляют яркие световые искры при беге',
  },
  {
    id: 'badge_star',
    name: 'Орден Звездного Мастера',
    description: 'Золотая эмблема на груди в форме пульсирующей звезды',
  },
  {
    id: 'holo_map',
    name: 'Голографическая карта на руке',
    description: 'Проекция 3D-планеты прямо над запястьем',
  },
  {
    id: 'plasma_cape',
    name: 'Короткий неоновый плащ',
    description: 'Развевается при движении, переливаясь мягким светом',
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
