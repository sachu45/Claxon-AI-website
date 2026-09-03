import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { nav } from '../data';
import { MagneticButton } from './ui/Button';

export function Nav({ go, active }: { go: (id: string) => void; active: string }) {
  const [menu, setMenu] = useState(false);
  const [hidden, setHidden] = useState(false);
  const reduceMotion = useReducedMotion();
  const lastY = useRef(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const delta = latest - lastY.current;

    if (menu || latest < 120) {
      setHidden(false);
    } else if (delta > 8) {
      setHidden(true);
    } else if (delta < -8) {
      setHidden(false);
    }

    lastY.current = latest;
  });

  return (
    <>
      <motion.header
        className="nav"
        animate={{ y: !reduceMotion && hidden ? -96 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <button className="brand" onClick={() => go('top')} aria-label="Claxon AI, back to top">
          <img className="brand-logo" src="/claxon-logo.png" alt="Claxon AI" />
        </button>

        <nav className="desktop-nav">
          {nav.map(([label, id]) => (
            <MagneticButton
              key={label}
              className={id === active ? 'active' : ''}
              onClick={() => go(id)}
            >
              {label}
            </MagneticButton>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="btn btn-primary" onClick={() => go('contact')}>
            Book a demo
          </button>
        </div>

        <button
          className="mobile-menu"
          onClick={() => setMenu((v) => !v)}
          aria-label={menu ? 'Close menu' : 'Open menu'}
          aria-expanded={menu}
        >
          {menu ? <X size={19} /> : <Menu size={19} />}
        </button>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="mobile-panel"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {nav.map(([label, id]) => (
              <button
                key={label}
                onClick={() => {
                  go(id);
                  setMenu(false);
                }}
              >
                {label}
              </button>
            ))}

            <button
              className="btn btn-primary"
              onClick={() => {
                go('contact');
                setMenu(false);
              }}
            >
              Book a demo
              <ArrowUpRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
