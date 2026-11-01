import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ScrubScene } from './components/ScrubScene';
import { ScrubVideo } from './components/ScrubVideo';
import { SITE } from './config';

export default function App() {
  return (
    <>
      {SITE.heroVideo ? <ScrubVideo src={`./${SITE.heroVideo}`} /> : <ScrubScene />}
      {/* Sur mobile, le texte passe sur la vidéo : un dégradé sombre en bas
          de l'écran le garde lisible. */}
      {SITE.heroVideo && SITE.heroTone === 'dark' ? (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[60vh] md:hidden"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.55))' }}
        />
      ) : null}
      <Navbar />
      <main>
        <Hero />
      </main>
    </>
  );
}
