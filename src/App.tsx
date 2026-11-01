import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Projects } from './components/Projects';
import { ScrubScene } from './components/ScrubScene';
import { ScrubVideo } from './components/ScrubVideo';
import { SITE } from './config';
import { useSmoothAnchors } from './hooks/useSmoothAnchors';

export default function App() {
  useSmoothAnchors();
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
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
