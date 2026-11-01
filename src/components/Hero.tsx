import { useEffect, useState } from 'react';

import { SITE } from '../config';
import { useTypewriter } from '../hooks/useTypewriter';

const PILL =
  'inline-flex items-center justify-center rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap transition-colors duration-200';

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
    fontSize: 'clamp(18px, 4vw, 26px)',
    fontWeight: 400,
    color: dark ? '#fff' : '#000',
    // Léger halo pour rester lisible quel que soit le passage de la vidéo.
    textShadow: dark ? '0 1px 12px rgba(0, 0, 0, 0.35)' : undefined,
  };

  return (
    <section className="relative z-[1] flex h-screen flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0">
      <div className="relative z-10 max-w-xl">
        <p
          className="pointer-events-none mb-5 select-none sm:mb-6"
          style={{ ...textStyle, lineHeight: 1.3, filter: 'blur(4px)' }}
          aria-hidden>
          {SITE.intro[0]}
          <br />
          {SITE.intro[1]}
        </p>
        {/* Texte complet pour les lecteurs d'écran et le référencement. */}
        <h1 className="sr-only">
          {SITE.intro.join(' ')} — {SITE.typewriter}
        </h1>

        <p className="mb-5 sm:mb-6" style={{ ...textStyle, lineHeight: 1.35, minHeight: 54 }} aria-hidden>
          {displayed}
          {!done ? (
            <span
              className={`ml-[2px] inline-block h-[1.1em] w-[2px] align-middle ${dark ? 'bg-white' : 'bg-black'}`}
              style={{ animation: 'blink 1s step-end infinite' }}
            />
          ) : null}
        </p>

        <div
          className="flex flex-wrap gap-y-1"
          style={{
            opacity: showActions ? 1 : 0,
            transform: showActions ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}>
          {SITE.actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
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
