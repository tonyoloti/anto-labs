import { Fragment, useEffect, useState } from 'react';

import { SITE } from '../config';
import { GitHubIcon } from './Icons';

export function Navbar() {
  const [open, setOpen] = useState(false);
  // Texte blanc sur fond sombre ; noir quand le menu mobile (fond blanc) est ouvert.
  // Une fois la vidéo dépassée, la barre prend un fond clair et du texte noir.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight - 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const onVideo = SITE.heroTone === 'dark' && !scrolled;
  const ink = onVideo ? 'text-white' : 'text-black';
  const bar = onVideo && !open ? 'bg-white' : 'bg-black';
  const contact = `mailto:${SITE.email}`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-10 flex w-full items-center justify-between px-5 py-4 transition-colors duration-300 sm:px-8 sm:py-5 ${scrolled ? 'bg-[#f5f1ea]/85 backdrop-blur-md' : ''}`}>
        <a href="#" className={`relative z-20 flex items-center gap-3 transition-colors ${open ? 'text-black' : ink}`}>
          <span className="text-[21px] tracking-tight sm:text-[26px]" style={{ fontFamily: 'var(--font-heading)' }}>
            {SITE.brand}®
          </span>
          <span className="text-[25px] select-none sm:text-[30px]" style={{ letterSpacing: '-0.02em' }}>
            ✳︎
          </span>
        </a>

        <div className={`hidden text-[23px] md:flex ${ink}`}>
          {SITE.nav.map((link, index) => (
            <Fragment key={link.label}>
              {index > 0 ? <span>,&nbsp;</span> : null}
              <a href={link.href} className="transition-opacity hover:opacity-60">
                {link.label}
              </a>
            </Fragment>
          ))}
        </div>

        <div className={`hidden items-center gap-5 md:flex ${ink}`}>
          <a
            href={SITE.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition-opacity hover:opacity-60">
            <GitHubIcon className="h-6 w-6" />
          </a>
          <a href={contact} className="text-[23px] underline underline-offset-2 transition-opacity hover:opacity-60">
            Get in touch
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="relative z-20 flex flex-col gap-[5px] p-1 md:hidden">
          <span className={`h-[2px] w-6 ${bar} transition-all duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`h-[2px] w-6 ${bar} transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`h-[2px] w-6 ${bar} transition-all duration-300 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </nav>

      <div
        className="fixed inset-0 z-[9] flex flex-col justify-center gap-8 bg-white/95 px-8 backdrop-blur-sm transition-opacity duration-300 md:hidden"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}>
        {SITE.nav.map((link) => (
          <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="text-[32px] font-medium text-black">
            {link.label}
          </a>
        ))}
        <a href={contact} onClick={() => setOpen(false)} className="text-[32px] font-medium text-black underline underline-offset-2">
          Get in touch
        </a>
      </div>
    </>
  );
}
