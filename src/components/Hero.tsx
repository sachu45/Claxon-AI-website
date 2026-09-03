import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from 'framer-motion';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { MagneticButton } from './ui/Button';
import { useTilt } from '../hooks/useTilt';

const BAR_HEIGHTS = [0.4, 0.7, 1, 0.55, 0.85, 0.35, 0.6, 0.9, 0.45, 0.75, 0.3, 0.65];

/**
 * The hero's one signature moment: a "signal" panel — a nod to what
 * a klaxon actually does (broadcast a signal) rather than a generic
 * decorative orb. The arcs draw in on load and fade slightly on scroll;
 * on top of that it tilts toward the cursor and its pulse quickens on
 * hover, so it reads as something live rather than a still image.
 */
function SignalPanel({ scrollFade }: { scrollFade: MotionValue<number> }) {
  const tilt = useTilt<HTMLDivElement>(6);

  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="signal-panel tilt-target"
      style={{ opacity: scrollFade }}
    >
      <svg
        className="signal-arcs"
        viewBox="0 0 400 320"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {[70, 110, 150, 190].map((r, i) => (
          <motion.circle
            key={r}
            cx="20"
            cy="320"
            r={r}
            fill="none"
            stroke="rgba(132,137,217,0.5)"
            strokeWidth="1"
            strokeDasharray={2 * Math.PI * r}
            initial={{ strokeDashoffset: 2 * Math.PI * r, opacity: 0 }}
            animate={{ strokeDashoffset: 0, opacity: 1 - i * 0.18 }}
            transition={{ duration: 1.1, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </svg>

      <div className="signal-panel-top">
        <span>CLAXON / SIGNAL</span>
        <span className="signal-status">
          <i />
          ACTIVE
        </span>
      </div>

      <div className="signal-body">
        <div className="signal-bars" aria-hidden="true">
          {BAR_HEIGHTS.map((h, i) => (
            <span
              key={i}
              style={{
                height: `${h * 100}%`,
                animationDelay: `${i * 0.09}s`,
              }}
            />
          ))}
        </div>

        <div className="signal-readout">
          <span>
            AGENTS ONLINE <b>12</b>
          </span>
          <span>
            LATENCY <b>210ms</b>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero({ go }: { go: (id: string) => void }) {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -60]);
  const signalFade = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 0.35]);

  const onHeroMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.style.setProperty('--mx', `${x}%`);
    event.currentTarget.style.setProperty('--my', `${y}%`);
  };

  return (
    <section className="hero" id="top" ref={heroRef} onMouseMove={onHeroMouseMove}>
      <div className="hero-spotlight" />
      <div className="hero-grid" />

      <motion.div className="hero-copy" style={{ y: heroY }}>
        <Reveal>
          <div className="eyebrow">
            
            The operating layer for AI at work
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <h1>
            Where AI
            <br />
            <span className="accent-word">goes to work.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p>
            Claxon connects your systems, your data and your team to agents
            that carry a task through to the end — not just describe what
            should happen next.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="hero-cta">
            <MagneticButton className="btn btn-primary" onClick={() => go('contact')}>
              Book a demo
              <ArrowRight size={17} />
            </MagneticButton>

            <button className="watch" onClick={() => go('platform')}>
              <span className="play">
                <Play size={12} fill="currentColor" />
              </span>
              See how it works
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="trust-line">
            <span>Built for teams already running on real tools —</span>
            <div className="mini-logos">
              <b>CRM</b>
              <b>VOICE</b>
              <b>DATA</b>
              <b>OPS</b>
            </div>
          </div>
        </Reveal>
      </motion.div>

      <div className="hero-visual">
        <SignalPanel scrollFade={signalFade} />
      </div>

      <div className="scroll-cue">
        Scroll
        <motion.div
          animate={reduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ChevronDown size={14} />
        </motion.div>
      </div>
    </section>
  );
}
