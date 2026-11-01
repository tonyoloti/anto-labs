import { useEffect } from 'react';

/** Accélère puis ralentit : le départ et l'arrivée restent doux. */
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Les liens internes (`#projects`, `#about`…) font défiler la page en douceur
 * au lieu de sauter d'un coup. La durée dépend de la distance : 450 à 900 ms.
 * La barre de navigation fixe est prise en compte pour ne pas cacher le titre.
 */
export function useSmoothAnchors() {
  useEffect(() => {
    let frame = 0;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const link = (event.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;

      const hash = link.getAttribute('href') ?? '#';
      const target = hash === '#' ? null : document.querySelector(hash);
      if (hash !== '#' && !target) return;
      event.preventDefault();

      const nav = document.querySelector('nav');
      const offset = target ? (nav?.getBoundingClientRect().height ?? 0) : 0;
      const start = window.scrollY;
      const end = target ? Math.max(0, target.getBoundingClientRect().top + start - offset) : 0;
      const distance = end - start;

      history.pushState(null, '', hash === '#' ? location.pathname : hash);

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo(0, end);
        return;
      }

      const duration = Math.min(900, Math.max(450, Math.abs(distance) * 0.35));
      const began = performance.now();
      cancelAnimationFrame(frame);
      const step = (now: number) => {
        const t = Math.min(1, (now - began) / duration);
        window.scrollTo(0, start + distance * easeInOutCubic(t));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    // Un coup de molette ou un toucher arrête l'animation.
    const stop = () => cancelAnimationFrame(frame);

    document.addEventListener('click', onClick);
    window.addEventListener('wheel', stop, { passive: true });
    window.addEventListener('touchstart', stop, { passive: true });
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('wheel', stop);
      window.removeEventListener('touchstart', stop);
      cancelAnimationFrame(frame);
    };
  }, []);
}
