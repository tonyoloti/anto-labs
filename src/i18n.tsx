import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { TEXTS, type Lang, type Texts } from './config';

const STORAGE_KEY = 'anto-labs-lang';

/** Langue choisie auparavant, sinon celle du navigateur (français ou anglais). */
function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'fr') return saved;
  } catch {
    // Stockage indisponible (navigation privée stricte…) : on devine.
  }
  return navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

interface LangContextValue {
  lang: Lang;
  t: Texts;
  toggle: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Pas grave : la langue ne sera simplement pas retenue.
    }
  }, [lang]);

  const toggle = useCallback(() => setLang((current) => (current === 'en' ? 'fr' : 'en')), []);
  const value = useMemo(() => ({ lang, t: TEXTS[lang] as Texts, toggle }), [lang, toggle]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const value = useContext(LangContext);
  if (!value) throw new Error('useLang doit être utilisé dans <LangProvider>');
  return value;
}

/** Bouton « EN / FR » : la langue active en plein, l'autre atténuée. */
export function LangSwitch({ className = '' }: { className?: string }) {
  const { lang, t, toggle } = useLang();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.nav.switchLang}
      title={t.nav.switchLang}
      className={`inline-flex items-center gap-1.5 rounded-full px-1 py-1 text-[15px] tracking-wide transition-opacity hover:opacity-80 ${className}`}>
      <span className={lang === 'en' ? 'font-semibold' : 'opacity-60'}>EN</span>
      <span className="opacity-50">/</span>
      <span className={lang === 'fr' ? 'font-semibold' : 'opacity-60'}>FR</span>
    </button>
  );
}
