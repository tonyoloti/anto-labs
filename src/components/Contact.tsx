import { useState } from 'react';

import { SITE } from '../config';
import { useLang } from '../i18n';
import { GitHubIcon, MailIcon, LinkedInIcon } from './Icons';

export function Contact() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${SITE.email}`;
    }
  };

  return (
    <section id="contact" className="relative z-[2] bg-[#d61f26] px-5 py-24 text-white sm:px-8 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-[14px] tracking-[0.18em] text-white/70 uppercase">{t.contact.eyebrow}</p>
        <h2
          className="max-w-4xl text-[48px] leading-[1] tracking-tight sm:text-[84px]"
          style={{ fontFamily: 'var(--font-heading)' }}>
          {t.contact.title}
        </h2>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-[17px] text-black transition-colors hover:bg-black hover:text-white">
            <MailIcon />
            {SITE.email}
          </a>
          <button
            type="button"
            onClick={copy}
            className="rounded-full border border-white/60 px-6 py-3.5 text-[17px] transition-colors hover:bg-white hover:text-black">
            {copied ? t.contact.copied : t.contact.copy}
          </button>
          <a
            href={SITE.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3.5 text-[17px] transition-colors hover:bg-white hover:text-black">
            <GitHubIcon />
            GitHub
          </a>
          {SITE.links.linkedin ? (
            <a
              href={SITE.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3.5 text-[17px] transition-colors hover:bg-white hover:text-black">
              <LinkedInIcon />
              LinkedIn
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
