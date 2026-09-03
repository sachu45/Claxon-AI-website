import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

import { Nav } from './components/Nav';
import { Cursor } from './components/Cursor';
import { Hero } from './components/Hero';
import { Statement } from './components/Statement';
import { Solutions } from './components/Solutions';
import { AgentDemo } from './components/AgentDemo';
import { Ecosystem } from './components/Ecosystem';
import { Story } from './components/Story';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { nav } from './data';

export function App() {
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
  });

  const [active, setActive] = useState('platform');

  useEffect(() => {
    const ids = nav.map(([, id]) => id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="site">
      <Cursor />

      <div className="progress">
        <motion.div style={{ scaleX: smoothScroll, transformOrigin: 'left' }} />
      </div>

      <Nav go={go} active={active} />

      <main>
        <Hero go={go} />
        <Statement />
        <Solutions />
        <AgentDemo go={go} />
        <Ecosystem />
        <Story />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
