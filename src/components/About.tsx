import { SITE } from '../config';
import { useLang } from '../i18n';

export function About() {
  const { t } = useLang();
  return (
    <section id="about" className="relative z-[2] bg-white px-5 py-24 text-black sm:px-8 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
        <div>
          <p className="mb-3 text-[14px] tracking-[0.18em] text-[#d61f26] uppercase">{t.about.eyebrow}</p>
          <h2
            className="text-[44px] leading-[1.02] tracking-tight sm:text-[64px]"
            style={{ fontFamily: 'var(--font-heading)' }}>
            {t.about.title[0]}
            <br />
            {t.about.title[1]}
          </h2>
        </div>

        <div>
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mb-5 text-[19px] leading-relaxed text-black/75 sm:text-[21px]">
              {paragraph}
            </p>
          ))}

          <p className="mt-10 mb-4 text-[14px] tracking-[0.18em] text-black/45 uppercase">{t.about.toolbox}</p>
          <ul className="flex flex-wrap gap-2">
            {SITE.skills.map((skill) => (
              <li key={skill} className="rounded-full bg-[#f5f1ea] px-4 py-2 text-[15px]">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
