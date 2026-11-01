import { useEffect, useRef } from 'react';

/** Part de la durée parcourue quand la souris traverse tout l'écran. */
export const SENSITIVITY = 0.8;

/**
 * Fait avancer ou reculer une « tête de lecture » selon le mouvement
 * horizontal de la souris (ou du doigt) : vers la droite on avance, vers la
 * gauche on recule. `duration` est la longueur totale ; `onScrub` reçoit la
 * nouvelle position, bornée entre 0 et `duration`.
 */
export function useMouseScrub(duration: number, onScrub: (time: number) => void, initial = 0) {
  const time = useRef(initial);
  const callback = useRef(onScrub);
  callback.current = onScrub;

  useEffect(() => {
    let prevX: number | null = null;

    const move = (x: number) => {
      if (prevX === null) {
        prevX = x;
        return;
      }
      const delta = x - prevX;
      prevX = x;
      const next = time.current + (delta / window.innerWidth) * SENSITIVITY * duration;
      time.current = Math.min(duration, Math.max(0, next));
      callback.current(time.current);
    };

    const onMouse = (event: MouseEvent) => move(event.clientX);
    const onTouch = (event: TouchEvent) => move(event.touches[0]?.clientX ?? 0);
    const onTouchEnd = () => {
      prevX = null;
    };

    window.addEventListener('mousemove', onMouse);
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [duration]);

  return time;
}
