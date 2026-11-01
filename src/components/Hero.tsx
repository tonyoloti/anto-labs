import { useEffect, useState } from 'react';

import { SITE } from '../config';
import { useTypewriter } from '../hooks/useTypewriter';

const PILL =
  'inline-flex items-center justify-center rounded-full text-[14px] sm:text-[16px] xl:text-[18px] px-5 xl:px-6 py-[0.5em] whitespace-nowrap transition-colors duration-200';

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" stroke="currentColor" />
      <path d="M8.5 2V1.7c0-.66-.54-1.2-1.2-1.2H1.7C1.04.5.5 1.04.5 1.7v5.6c0 .66.54 1.2 1.2 1.2H2" stroke="currentColor" />
    </svg>
  );
}

export function Hero() {
  const { displayed, done } = useTypewriter(SITE.typewriter);
  const [showActions, setShowActions] = useState(false);
  const [copied, setCopied] = useState(false);

  // Les boutons apparaissent 400 ms après le chargement, sans attendre la
  // fin de la machine à écrire.
  useEffect(() => {
    const timer = setTimeout(() => setShowActions(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  const dark = SITE.heroTone === 'dark';
  const textStyle = {
    fontWeight: 400,
    color: dark ? '#fff' : '#000',
    // Léger halo pour rester lisible quel que soit le passage de la vidéo.
    textShadow: dark ? '0 1px 12px rgba(0, 0, 0, 0.35)' : undefined,
  };

  return (
    <section className="relative z-[1] flex h-screen flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:pb-0 md:pl-[6vw] md:pr-0">
      <div className="relative z-10 w-full md:max-w-[46vw]">
        <p
          className="pointer-events-none mb-5 select-none sm:mb-8"
          style={{ ...textStyle, fontSize: 'clamp(17px, 1.6vw, 30px)', lineHeight: 1.3, filter: 'blur(4px)' }}
          aria-hidden>
          {SITE.intro[0]}
          <br />
          {SITE.intro[1]}
        </p>
        {/* Texte complet pour les lecteurs d'écran et le référencement. */}
        <h1 className="sr-only">
          {SITE.intro.join(' ')} — {SITE.typewriter}
        </h1>

        {/* Le texte complet, invisible, réserve la place : la mise en page
            ne bouge pas pendant que la machine à écrire tape. */}
        <p
          className="mb-8 grid font-medium sm:mb-10"
          style={{ ...textStyle, fontSize: 'clamp(30px, 3.6vw, 68px)', lineHeight: 1.08, letterSpacing: '-0.025em', fontFamily: 'var(--font-heading)' }}
          aria-hidden>
          <span className="invisible col-start-1 row-start-1">{SITE.typewriter}</span>
          <span className="col-start-1 row-start-1">
            {displayed}
            {!done ? (
              <span
                className={`ml-[3px] inline-block h-[0.9em] w-[3px] align-baseline ${dark ? 'bg-white' : 'bg-black'}`}
                style={{ animation: 'blink 1s step-end infinite' }}
              />
            ) : null}
          </span>
        </p>

        <div
          className="flex flex-wrap gap-2 sm:gap-3"
          style={{
            opacity: showActions ? 1 : 0,
            transform: showActions ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}>
          {SITE.actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              {...(action.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
              className={`${PILL} border border-black/10 bg-white text-black hover:bg-black hover:text-white`}>
              {action.label}
            </a>
          ))}
          {/* Pastille « contour » : blanche sur fond sombre, noire sur fond
              clair. */}
          <button
            type="button"
            onClick={copyEmail}
            className={`${PILL} gap-2 border bg-transparent sm:gap-3 ${dark ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'}`}>
            <span>
              {copied ? 'Copied!' : (
                <>
                  Reach me: <span className="underline underline-offset-1">{SITE.email}</span>
                </>
              )}
            </span>
            <CopyIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
