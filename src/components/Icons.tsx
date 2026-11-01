/** Petites icônes en SVG, sans bibliothèque. */

export function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M3.5 10.5l7-7M5 3.5h5.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GitHubIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export function MailIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="1.75" y="3.25" width="14.5" height="11.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 4.5L9 9.5l6.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function LinkedInIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M0 1.15C0 .52.52 0 1.17 0h13.66C15.48 0 16 .52 16 1.15v13.7c0 .63-.52 1.15-1.17 1.15H1.17C.52 16 0 15.48 0 14.85V1.15zM4.94 13.4V6.17h-2.4v7.23h2.4zM3.74 5.18c.84 0 1.36-.55 1.36-1.25-.02-.71-.52-1.25-1.35-1.25-.82 0-1.36.54-1.36 1.25 0 .7.52 1.25 1.33 1.25h.02zm4.93 8.22V9.36c0-.21.02-.43.08-.58.17-.43.57-.88 1.24-.88.87 0 1.22.66 1.22 1.64v3.86h2.4V9.25c0-2.22-1.18-3.25-2.77-3.25-1.29 0-1.86.71-2.18 1.21v.03h-.02l.02-.03V6.17h-2.4c.03.68 0 7.23 0 7.23h2.41z" />
    </svg>
  );
}
