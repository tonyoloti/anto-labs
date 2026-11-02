import { SITE } from '../config';

export function Footer() {
  return (
    <footer className="relative z-[2] bg-black px-5 py-8 text-[14px] text-white/60 sm:px-8 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4">
        <span>
          © {new Date().getFullYear()} {SITE.brand}, a brand of Bluevolt Technology
        </span>
        <span className="flex gap-6">
          <span>{SITE.location}</span>
          <a href="legal.html" className="underline-offset-2 transition-colors hover:text-white hover:underline">
            Legal notice
          </a>
        </span>
      </div>
    </footer>
  );
}
