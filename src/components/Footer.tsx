import { SITE } from '../config';

export function Footer() {
  return (
    <footer className="relative z-[2] bg-black px-5 py-8 text-[14px] text-white/60 sm:px-8 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4">
        <span>
          © {new Date().getFullYear()} {SITE.brand} — {SITE.company}
        </span>
        <span>12 rue des Bas Sablons, 78360 Montesson, France</span>
      </div>
    </footer>
  );
}
