import { useEffect, useRef, useState } from 'react';

import { useMouseScrub } from '../hooks/useMouseScrub';

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
        setDuration(length);
        time.current = length * START;
        target.current = length * START;
        seek();
      }}
      onSeeked={() => {
        seeking.current = false;
        seek();
      }}
      // Cadrage : sur mobile, le visage (à 68 % de la largeur de la vidéo)
      // au centre ; sur grand écran, le bord droit, pour laisser la gauche
      // libre pour le texte.
      className="fixed inset-0 z-0 h-full w-full object-cover object-[68%_center] md:object-[100%_center]"
    />
  );
}
