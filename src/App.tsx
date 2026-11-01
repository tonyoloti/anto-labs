import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ScrubScene } from './components/ScrubScene';
import { ScrubVideo } from './components/ScrubVideo';
import { SITE } from './config';

export default function App() {
  return (
    <>
      {SITE.heroVideo ? <ScrubVideo src={`./${SITE.heroVideo}`} /> : <ScrubScene />}
      <Navbar />
      <main>
        <Hero />
      </main>
    </>
  );
}
