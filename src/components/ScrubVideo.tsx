import { useEffect, useRef, useState } from 'react';

import { useMouseScrub } from '../hooks/useMouseScrub';

/**
 * Vidéo de fond plein écran, sans lecture automatique : sa position suit le
 * mouvement horizontal de la souris. Un seul `seek` à la fois : la position
 * suivante est mise en attente et appliquée à `onSeeked`, pour ne pas noyer
 * le décodeur de demandes.
 */
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

  useMouseScrub(duration, (time) => {
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
      onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
      onSeeked={() => {
        seeking.current = false;
        seek();
      }}
      className="fixed inset-0 z-0 h-full w-full object-cover"
      style={{ objectPosition: '70% center' }}
    />
  );
}
