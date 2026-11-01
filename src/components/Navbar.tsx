import { Fragment, useState } from 'react';

import { SITE } from '../config';

export function Navbar() {
  const [open, setOpen] = useState(false);
  // Texte blanc sur fond sombre ; noir quand le menu mobile (fond blanc) est ouvert.
  const ink = SITE.heroTone === 'dark' ? 'text-white' : 'text-black';
  const bar = SITE.heroTone === 'dark' && !open ? 'bg-white' : 'bg-black';
  const contact = `mailto:${SITE.email}`;

  return (
    <>
      <nav className="fixed top-0 left-0 z-10 flex w-full items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
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

        <a
          href={contact}
          className={`hidden text-[23px] underline underline-offset-2 transition-opacity hover:opacity-60 md:block ${ink}`}>
          Get in touch
        </a>

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
