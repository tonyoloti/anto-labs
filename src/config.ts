/**
 * Tout le contenu modifiable du site, au même endroit.
 */
export const SITE = {
  brand: 'Anto Labs',
  email: 'contact@anto-labs.com',

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
    { label: 'Mapdex', href: '#mapdex' },
    { label: 'About', href: '#about' },
  ],

  intro: ["Hey there, I'm Anto,", 'AI engineer & founder of Bluevolt Technology'],
  typewriter: 'I build AI products and apps people actually use. So, what are we building?',

  actions: [
    { label: 'See my projects', href: '#projects' },
    { label: 'Discover Mapdex', href: '#mapdex' },
    { label: 'Download my résumé', href: '#resume' },
    { label: 'Send a quick hello', href: 'mailto:contact@anto-labs.com' },
  ],
};
