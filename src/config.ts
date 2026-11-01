/**
 * Tout le contenu modifiable du site, au même endroit.
 */
export const SITE = {
  brand: 'Anto Labs',
  name: 'Anto',
  email: 'contact@anto-labs.com',
  company: 'Bluevolt Technology',

  links: {
    github: 'https://github.com/tonyoloti',
    // Laisse vide pour masquer le lien.
    linkedin: 'https://www.linkedin.com/in/antoine-mardon/',
  },

  /**
   * Vidéo de fond, contrôlée par la souris. `null` : fond animé dessiné en
   * code (original). Pour utiliser ta propre vidéo, mets le fichier dans
   * `public/` et indique son nom ici, par exemple `'hero.mp4'`.
   */
  heroVideo: 'hero.mp4' as string | null,

  /**
   * Couleur du texte posé sur le fond : `light` (texte noir) pour un fond
   * clair, `dark` (texte blanc) pour un fond sombre ou saturé comme la vidéo.
   */
  heroTone: 'dark' as 'light' | 'dark',

  nav: [
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],

  /** Petite étiquette au-dessus du titre, puis le titre lui-même. */
  role: 'AI engineer · Founder of Bluevolt Technology',
  title: "Hey there, I'm Anto.",
  /** Sous-titre, tapé lettre par lettre. */
  typewriter: 'I build AI products and apps people actually use. So, what are we building?',

  actions: [
    { label: 'See my projects', href: '#projects' },
    { label: 'GitHub', href: 'https://github.com/tonyoloti' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/antoine-mardon/' },
  ],

  about: {
    // Texte provisoire : à remplacer par ta vraie présentation.
    paragraphs: [
      "I'm an AI engineer who likes shipping. I design and build products end to end: from the model or the data pipeline to an interface people enjoy using.",
      'Through Bluevolt Technology, I publish my own apps. The latest is Mapdex, an offline interactive map and guide for one of the most anticipated games of the decade.',
    ],
    skills: [
      'Python',
      'TypeScript',
      'LLMs & agents',
      'RAG',
      'Automation (n8n)',
      'React',
      'React Native / Expo',
      'Node.js',
    ],
  },
};

export interface Project {
  name: string;
  /** Une ou deux phrases : ce que ça fait, pour qui. */
  summary: string;
  tags: string[];
  /** Image de couverture dans `public/projects/` (paysage). */
  image?: string;
  /** Couleur de fond de la carte quand il n'y a pas d'image. */
  color?: string;
  /** Lien vers le code (GitHub). Absent : code privé. */
  code?: string;
  /** Lien vers le projet en ligne (site, store…). */
  live?: { label: string; href: string };
  /** Mention affichée à la place du lien de code, par exemple « Private code ». */
  note?: string;
}

/**
 * Les projets, dans l'ordre d'affichage. Pour en ajouter un : copier un bloc
 * et l'adapter. Mettre l'image dans `public/projects/`.
 */
export const PROJECTS: Project[] = [
  {
    name: 'Mapdex',
    summary:
      'Unofficial companion app for GTA 6: an offline interactive map engine with 1,300+ raster tiles, a data-driven guide, dark mode and accent themes. Published on Google Play.',
    tags: ['React Native', 'Expo', 'TypeScript', 'MapLibre'],
    image: 'mapdex.png',
    live: {
      label: 'Google Play',
      href: 'https://play.google.com/store/apps/details?id=com.bluevolt.mapdex',
    },
    note: 'Private code',
  },
  {
    name: 'Anto Labs',
    summary:
      'This site: a full-screen hero whose video scrubs with the mouse, a typewriter intro and a projects grid, all with React, Vite and Tailwind CSS.',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    image: 'anto-labs.jpg',
    code: 'https://github.com/tonyoloti/anto-labs',
  },
];
