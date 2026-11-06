/**
 * Tout le contenu modifiable du site, au même endroit.
 */
export const SITE = {
  brand: 'Anto Labs',
  name: 'Anto',
  email: 'contact@anto-labs.com',

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

  /** Liens du hero (les libellés sont dans TEXTS). */
  actions: [
    { key: 'projects', href: '#projects' },
    { key: 'github', href: 'https://github.com/tonyoloti' },
    { key: 'linkedin', href: 'https://www.linkedin.com/in/antoine-mardon/' },
  ] as const,

  skills: ['Python', 'TypeScript', 'LLMs & agents', 'RAG', 'n8n', 'React', 'React Native / Expo', 'Node.js'],
};

export type Lang = 'en' | 'fr';

/**
 * Tous les textes du site, en anglais et en français. Pour modifier une
 * phrase, change-la dans les deux langues.
 */
export const TEXTS = {
  en: {
    nav: { projects: 'Projects', about: 'About', contact: 'Contact', getInTouch: 'Get in touch', openMenu: 'Open menu', closeMenu: 'Close menu', switchLang: 'Passer le site en français' },
    hero: {
      role: 'AI engineer · LLMs, agents & automation',
      title: "Hey there, I'm Anto.",
      typewriter: 'I build AI products and apps people actually use. So, what are we building?',
      actions: { projects: 'See my projects', github: 'GitHub', linkedin: 'LinkedIn' },
      reachMe: 'Reach me:',
      copied: 'Copied!',
    },
    projects: { eyebrow: 'Selected work', title: 'Projects', allCode: 'All my code on GitHub', viewCode: 'View code', privateCode: 'Private code' },
    about: {
      eyebrow: 'About',
      title: ['AI engineer,', 'app maker.'],
      // Texte provisoire : à remplacer par ta vraie présentation.
      paragraphs: [
        "I'm an AI engineer who likes shipping. I design and build products end to end: from the model or the data pipeline to an interface people enjoy using.",
        'On the side, I publish my own apps. The latest is Mapdex, an offline interactive map and guide for one of the most anticipated games of the decade.',
      ],
      toolbox: 'Toolbox',
    },
    contact: { eyebrow: 'Contact', title: "Got a project in mind? Let's talk.", copy: 'Copy email', copied: 'Copied!' },
    footer: { location: 'Paris, France', legal: 'Legal notice' },
  },
  fr: {
    nav: { projects: 'Projets', about: 'À propos', contact: 'Contact', getInTouch: 'Me contacter', openMenu: 'Ouvrir le menu', closeMenu: 'Fermer le menu', switchLang: 'Switch the site to English' },
    hero: {
      role: 'Ingénieur IA · LLM, agents & automatisation',
      title: "Salut, moi c'est Anto.",
      typewriter: 'Je conçois des produits IA et des apps que les gens utilisent vraiment. Alors, on construit quoi ?',
      actions: { projects: 'Voir mes projets', github: 'GitHub', linkedin: 'LinkedIn' },
      reachMe: 'Écrivez-moi :',
      copied: 'Copié !',
    },
    projects: { eyebrow: 'Réalisations', title: 'Projets', allCode: 'Tout mon code sur GitHub', viewCode: 'Voir le code', privateCode: 'Code privé' },
    about: {
      eyebrow: 'À propos',
      title: ['Ingénieur IA,', "créateur d'apps."],
      paragraphs: [
        "Je suis ingénieur IA et j'aime livrer. Je conçois et développe des produits de bout en bout : du modèle ou du pipeline de données jusqu'à une interface agréable à utiliser.",
        "À côté, je publie mes propres apps. La dernière, Mapdex, est une carte interactive et un guide hors ligne pour l'un des jeux les plus attendus de la décennie.",
      ],
      toolbox: 'Boîte à outils',
    },
    contact: { eyebrow: 'Contact', title: 'Un projet en tête ? Parlons-en.', copy: "Copier l'e-mail", copied: 'Copié !' },
    footer: { location: 'Paris, France', legal: 'Mentions légales' },
  },
};

export type Texts = (typeof TEXTS)['en'];

export interface Project {
  name: string;
  /** Une ou deux phrases : ce que ça fait, pour qui, dans les deux langues. */
  summary: Record<Lang, string>;
  tags: string[];
  /** Image de couverture dans `public/projects/` (paysage). */
  image?: string;
  /** Couleur de fond de la carte quand il n'y a pas d'image. */
  color?: string;
  /** Lien vers le code (GitHub). Absent : code privé. */
  code?: string;
  /** Lien vers le projet en ligne (site, store…). */
  live?: { label: string; href: string };
  /** Code non public : affiche « Private code » à la place du lien. */
  privateCode?: boolean;
}

/**
 * Les projets, dans l'ordre d'affichage. Pour en ajouter un : copier un bloc
 * et l'adapter. Mettre l'image dans `public/projects/`.
 */
export const PROJECTS: Project[] = [
  {
    name: 'Mapdex',
    summary: {
      en: 'Unofficial companion app for GTA 6: an offline interactive map engine with 1,300+ raster tiles, a data-driven guide, dark mode and accent themes. Published on Google Play.',
      fr: 'Application compagnon non officielle pour GTA 6 : un moteur de carte interactive hors ligne avec plus de 1 300 tuiles, un guide piloté par les données, un mode sombre et des thèmes de couleur. Publiée sur Google Play.',
    },
    tags: ['React Native', 'Expo', 'TypeScript', 'MapLibre'],
    image: 'mapdex.png',
    live: {
      label: 'Google Play',
      href: 'https://play.google.com/store/apps/details?id=com.bluevolt.mapdex',
    },
    privateCode: true,
  },
  {
    name: 'Anto Labs',
    summary: {
      en: 'This site: a full-screen hero whose video scrubs with the mouse, a typewriter intro and a projects grid, all with React, Vite and Tailwind CSS.',
      fr: 'Ce site : un écran d’accueil dont la vidéo suit la souris, une intro tapée à la machine et une grille de projets, avec React, Vite et Tailwind CSS.',
    },
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    image: 'anto-labs.jpg',
    code: 'https://github.com/tonyoloti/anto-labs',
  },
];

// Vérifie à la compilation que la version française a les mêmes textes que l'anglaise.
const _sameShape: Texts = TEXTS.fr;
void _sameShape;
