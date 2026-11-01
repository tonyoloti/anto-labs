import { useEffect, useState } from 'react';

import { SITE } from '../config';
import { GitHubIcon, LinkedInIcon } from './Icons';

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
        className={`fixed top-0 left-0 z-10 flex w-full items-center justify-between px-5 py-4 transition-colors duration-300 sm:px-8 sm:py-5 md:grid md:grid-cols-[1fr_auto_1fr] md:px-[6vw] md:py-7 ${scrolled ? 'bg-[#f5f1ea]/85 backdrop-blur-md' : ''}`}>
        <a href="#" className={`relative z-20 flex items-center gap-3 transition-colors ${open ? 'text-black' : ink}`}>
          <span className="text-[21px] tracking-tight sm:text-[26px] xl:text-[28px]" style={{ fontFamily: 'var(--font-heading)' }}>
            {SITE.brand}®
          </span>
          <span className="text-[25px] select-none sm:text-[30px]" style={{ letterSpacing: '-0.02em' }}>
            ✳︎
          </span>
        </a>

        <div className={`hidden items-center gap-12 text-[18px] md:flex lg:gap-16 xl:text-[20px] ${ink}`}>
          {SITE.nav.map((link) => (
            <a key={link.label} href={link.href} className="group relative py-1 transition-opacity hover:opacity-80">
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        <div className={`hidden items-center justify-self-end gap-6 md:flex ${ink}`}>
          <a
            href={SITE.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="transition-opacity hover:opacity-60">
            <GitHubIcon className="h-6 w-6" />
          </a>
          {SITE.links.linkedin ? (
            <a
              href={SITE.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition-opacity hover:opacity-60">
              <LinkedInIcon className="h-[22px] w-[22px]" />
            </a>
          ) : null}
          <a href={contact} className={`rounded-full border px-5 py-2 text-[16px] transition-colors xl:text-[18px] ${onVideo ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}`}>
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
        <div className="flex gap-6 text-black">
          <a href={SITE.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHubIcon className="h-7 w-7" />
          </a>
          {SITE.links.linkedin ? (
            <a href={SITE.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedInIcon className="h-7 w-7" />
            </a>
          ) : null}
        </div>
      </div>
    </>
  );
}
