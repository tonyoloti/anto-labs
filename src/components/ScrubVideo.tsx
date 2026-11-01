import { useEffect, useRef, useState, type CSSProperties } from 'react';

import { useMouseScrub } from '../hooks/useMouseScrub';

/** Où se trouve le sujet dans la vidéo, en part de sa largeur. */
const SUBJECT_X = 0.68;
/** Où le placer à l'écran : à droite sur grand écran, au centre sur mobile. */
const TARGET_X_DESKTOP = 0.74;
const TARGET_X_MOBILE = 0.5;
/** Couleur du bord gauche de la vidéo, pour combler un éventuel vide. */
const EDGE_COLOR = 'rgb(122, 0, 12)';

/**
 * Place la vidéo à la hauteur de l'écran, sans la déformer, et la décale
 * pour que le sujet tombe à l'endroit voulu. `object-fit: cover` ne permet
 * pas de viser un point précis quelle que soit la forme de l'écran.
 */
function useFraming(ratio: number) {
  const compute = (): CSSProperties => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    let height = h;
    let width = h * ratio;
    // Écran plus large que la vidéo : on agrandit pour couvrir la largeur.
    if (width < w) {
      width = w;
      height = w / ratio;
    }
    const target = w < 768 ? TARGET_X_MOBILE : TARGET_X_DESKTOP;
    let left = target * w - SUBJECT_X * width;
    // Jamais de vide à droite.
    left = Math.max(left, w - width);
    return { width, height, left, top: (h - height) / 2 };
  };
  const [style, setStyle] = useState<CSSProperties>(compute);
  useEffect(() => {
    const update = () => setStyle(compute());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratio]);
  return style;
}

/**
 * Vidéo de fond plein écran, sans lecture automatique : sa position suit le
 * mouvement horizontal de la souris. Un seul `seek` à la fois : la position
 * suivante est mise en attente et appliquée à `onSeeked`, pour ne pas noyer
 * le décodeur de demandes.
 */
/** Position de départ, en part de la durée. */
const START = 0.4;

export function ScrubVideo({ src }: { src: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  // Proportions de la vidéo, connues au chargement (2250 x 742 par défaut).
  const [ratio, setRatio] = useState(2250 / 742);
  const framing = useFraming(ratio);
  const target = useRef(0);
  const seeking = useRef(false);

  const seek = () => {
    const element = video.current;
    if (!element || seeking.current) return;
    if (Math.abs(element.currentTime - target.current) < 0.01) return;
    seeking.current = true;
    element.currentTime = target.current;
  };

  const time = useMouseScrub(duration, (time) => {
    target.current = time;
    seek();
  });

  useEffect(() => {
    const element = video.current;
    if (element && element.readyState >= 1) setDuration(element.duration);
  }, []);

  return (
    <>
      <div aria-hidden className="fixed inset-0 z-0" style={{ background: EDGE_COLOR }} />
      <video
      ref={video}
      src={src}
      muted
      playsInline
      preload="auto"
      onLoadedMetadata={(event) => {
        // Départ au milieu de la vidéo : on peut ensuite aller dans les deux
        // sens avec la souris.
        const length = event.currentTarget.duration;
        const { videoWidth, videoHeight } = event.currentTarget;
        if (videoWidth && videoHeight) setRatio(videoWidth / videoHeight);
        setDuration(length);
        time.current = length * START;
        target.current = length * START;
        seek();
      }}
      onSeeked={() => {
        seeking.current = false;
        seek();
      }}
      className="fixed z-0 max-w-none"
      style={framing}
    />
    </>
  );
}
