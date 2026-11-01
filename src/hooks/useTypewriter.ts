import { useEffect, useState } from 'react';

/** Révèle `text` un caractère à la fois, après `startDelay` ms. */
export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    let interval: ReturnType<typeof setInterval> | undefined;

    const start = setTimeout(() => {
      interval = setInterval(() => {
        setCount((current) => {
          if (current >= text.length) {
            clearInterval(interval);
            return current;
          }
          return current + 1;
        });
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed: text.slice(0, count), done: count >= text.length };
}
