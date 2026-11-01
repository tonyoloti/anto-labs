# Anto Labs

Site personnel et portfolio d'Anto — ingénieur IA, fondateur de Bluevolt
Technology (éditeur de [Mapdex](#)).

React, TypeScript, Vite et Tailwind CSS. Aucune autre dépendance.

## Développer

```bash
npm install
npm run dev
```

Puis ouvrir l'adresse affichée (http://localhost:5173).

## Modifier le contenu

Tous les textes, liens et l'e-mail sont dans `src/config.ts`.

Fond de la page d'accueil : un globe animé, dessiné en code, qui tourne au
mouvement de la souris. Pour le remplacer par une vidéo, mettre le fichier dans
`public/` (par exemple `public/hero.mp4`) et indiquer `heroVideo: 'hero.mp4'`
dans `src/config.ts` : la vidéo défilera de la même façon, au mouvement de la
souris.

## Mise en ligne

Chaque push sur `main` met le site en ligne via GitHub Pages
(`.github/workflows/deploy.yml`). Une seule fois : dans les réglages du dépôt,
**Settings → Pages → Source : GitHub Actions**.
