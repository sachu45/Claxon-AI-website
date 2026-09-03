
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion';

import {
  ArrowRight,
  ArrowUpRight,
  Play,
  Sparkles,
  Bot,
  Phone,
  BrainCircuit,
  ShieldCheck,
  Zap,
  Menu,
  X,
  ChevronDown,
  Globe,
  Palette,
  Layers,
  Wand2,
  ScanLine,
  Building2,
  CheckCircle2,
} from 'lucide-react';

import './styles.css';

const nav = [
  ['Platform', 'platform'],
  ['Solutions', 'solutions'],
  ['Agents', 'agents'],
  ['Ecosystem', 'ecosystem'],
  ['Stories', 'stories'],
];

const stats = [
  ['10×', 'faster workflows'],
  ['24/7', 'AI availability'],
  ['40+', 'business use cases'],
  ['99.9%', 'platform uptime'],
];

const solutions = [
  {
    number: '01',
    title: 'AI that works across your business',
    text: 'Connect intelligence to the workflows that matter — customer experience, sales, operations and internal teams.',
    icon: BrainCircuit,
  },
  {
    number: '02',
    title: 'Voice agents that feel human',
    text: 'Automate inbound and outbound conversations with natural, contextual AI agents.',
    icon: Phone,
  },
  {
    number: '03',
    title: 'Agents that take action',
    text: 'Give AI the tools, context and permissions to complete tasks instead of simply recommending them.',
    icon: Bot,
  },
  {
    number: '04',
    title: 'Governed from day one',
    text: 'Security, observability and human controls are designed into every layer of the CLAXON ecosystem.',
    icon: ShieldCheck,
  },
];

const useCases = [
  'Customer service',
  'Lead qualification',
  'Sales automation',
  'Internal copilots',
  'Voice operations',
  'Workflow automation',
];

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: 45,
        filter: 'blur(8px)',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const move = (event: React.MouseEvent) => {
    const button = buttonRef.current;

    if (!button) return;

    const rect = button.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left -
      rect.width / 2;

    const y =
      event.clientY -
      rect.top -
      rect.height / 2;

    button.style.transform =
      `translate(${x * 0.08}px, ${y * 0.1}px)`;
  };

  const reset = () => {
    if (buttonRef.current) {
      buttonRef.current.style.transform =
        'translate(0px, 0px)';
    }
  };

  return (
    <button
      ref={buttonRef}
      className={className}
      onClick={onClick}
      onMouseMove={move}
      onMouseLeave={reset}
    >
      {children}
    </button>
  );
}

function Orb() {
  return (
    <div className="orb-wrap">
      <motion.div
        className="orb-glow"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.8, 0.35],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="orb"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="orb-inner"
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Sparkles size={38} />
      </motion.div>

      <motion.div
        className="orb-satellite satellite-one"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <span />
      </motion.div>

      <motion.div
        className="orb-satellite satellite-two"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <span />
      </motion.div>
    </div>
  );
}

function BrandthisPreview() {
  const [scanning, setScanning] = useState(false);
  const [complete, setComplete] = useState(false);

  const startScan = () => {
    setScanning(true);
    setComplete(false);

    setTimeout(() => {
      setScanning(false);
      setComplete(true);
    }, 2200);
  };

  return (
    <div className="brandthis-preview">
      <div className="brandthis-window-bar">
        <div className="window-dots">
          <span />
          <span />
          <span />
        </div>

        <div className="window-title">
          brandthis / brand intelligence
        </div>

        <div className="window-status">
          <span />
          Live
        </div>
      </div>

      <div className="brandthis-body">
        <div className="brandthis-sidebar">
          <div className="bt-logo">
            B
          </div>

          <span className="sidebar-line active" />
          <span className="sidebar-line" />
          <span className="sidebar-line" />
          <span className="sidebar-line" />
        </div>

        <div className="brandthis-main">
          <div className="brandthis-heading">
            <div>
              <span>BRAND INTELLIGENCE</span>

              <h3>
                Your Brand DNA
              </h3>
            </div>

            <div className="dna-status">
              <CheckCircle2 size={15} />
              Ready
            </div>
          </div>

          <motion.div
            className="brand-scan-card"
            animate={
              scanning
                ? {
                    boxShadow: [
                      '0 0 0 rgba(255,255,255,0)',
                      '0 0 40px rgba(255,255,255,.12)',
                      '0 0 0 rgba(255,255,255,0)',
                    ],
                  }
                : {}
            }
            transition={{
              duration: 1,
              repeat: scanning ? Infinity : 0,
            }}
          >
            <div className="scan-top">
              <Globe size={18} />

              <span>
                {complete
                  ? 'brandthis.ai'
                  : 'Paste your website'}
              </span>

              {complete && (
                <CheckCircle2 size={16} />
              )}
            </div>

            <button
              onClick={startScan}
              disabled={scanning}
            >
              {scanning
                ? 'Reading your brand...'
                : complete
                ? 'Brand scanned ✓'
                : 'Scan brand'}
            </button>
          </motion.div>

          <AnimatePresence>
            {(complete || scanning) && (
              <motion.div
                className="dna-grid"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                }}
              >
                <div className="dna-card">
                  <Palette size={17} />

                  <span>Color system</span>

                  <div className="mini-colors">
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>

                <div className="dna-card">
                  <Layers size={17} />

                  <span>Visual identity</span>

                  <strong>Detected</strong>
                </div>

                <div className="dna-card">
                  <Wand2 size={17} />

                  <span>Brand voice</span>

                  <strong>Defined</strong>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [menu, setMenu] = useState(false);
  const [activeUseCase, setActiveUseCase] =
    useState(0);

  const { scrollYProgress } = useScroll();

  const smoothScroll = useSpring(
    scrollYProgress,
    {
      stiffness: 90,
      damping: 25,
    },
  );

  const heroY = useTransform(
    smoothScroll,
    [0, 0.25],
    [0, -130],
  );

  const orbY = useTransform(
    smoothScroll,
    [0, 0.3],
    [0, -180],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveUseCase((previous) =>
        previous === useCases.length - 1
          ? 0
          : previous + 1,
      );
    }, 3200);

    return () => clearInterval(timer);
  }, []);

  const go = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: 'smooth',
      });

    setMenu(false);
  };

  return (
    <div className="site">
      {/* Scroll progress */}

      <div className="progress">
        <motion.div
          style={{
            scaleX: smoothScroll,
            transformOrigin: 'left',
          }}
        />
      </div>

      {/* Navigation */}

      <header className="nav">
        <button
          className="brand"
          onClick={() => go('top')}
        >
          <img
            className="brand-logo brand-logo-full"
            src="https://i.ibb.co/LdjQHW8j/Claxon-AI-LOGO-removebg-preview.png"
            alt="Claxon AI"
          />
        </button>

        <nav className="desktop-nav">
          {nav.map(([label, id]) => (
            <button
              key={label}
              onClick={() => go(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        

        <button
          className="mobile-menu"
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>

      {/* Mobile navigation */}

      <AnimatePresence>
        {menu && (
          <motion.div
            className="mobile-panel"
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
          >
            {nav.map(([label, id]) => (
              <button
                key={label}
                onClick={() => go(id)}
              >
                {label}
              </button>
            ))}

            <button
              onClick={() => go('contact')}
            >
              Book a demo
              <ArrowUpRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="top">

        {/* HERO */}

        <section className="hero">
          <div className="noise" />
          <div className="hero-grid" />

          <motion.div
            className="hero-copy"
            style={{ y: heroY }}
          >
            <Reveal>
              <div className="eyebrow">
                <span className="live-dot" />

                THE AI OPERATING LAYER
                FOR MODERN BUSINESS
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1>
                Where AI
                <br />

                <em>
                  goes to work.
                </em>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p>
                CLAXON AI transforms complex
                business processes into intelligent
                systems that understand, decide
                and take action.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="hero-cta">
                <MagneticButton
                  className="pill big"
                  onClick={() =>
                    go('contact')
                  }
                >
                  Build with CLAXON
                  <ArrowRight size={18} />
                </MagneticButton>

                <button
                  className="watch"
                  onClick={() =>
                    go('platform')
                  }
                >
                  <span className="play">
                    <Play
                      size={13}
                      fill="currentColor"
                    />
                  </span>

                  See how it works
                </button>
              </div>
            </Reveal>

            <motion.div
              className="trust-line"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.8,
              }}
            >
              <span>
                Intelligence that moves with your business.
              </span>

              <div className="mini-logos">
                <b>AI</b>
                <b>DATA</b>
                <b>VOICE</b>
                <b>AGENTS</b>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-orb"
            style={{ y: orbY }}
          >
            <Orb />
          </motion.div>

          <div className="scroll-cue">
            <span>
              Scroll to explore
            </span>

            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              <ChevronDown size={18} />
            </motion.div>
          </div>
        </section>

        {/* PLATFORM */}

        <section
          className="statement"
          id="platform"
        >
          <Reveal>
            <p className="kicker">
              THE CLAXON DIFFERENCE
            </p>

            <h2>
              AI shouldn't just
              <span> answer.</span>

              <br />

              It should
              <strong> move.</strong>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="statement-copy">
              CLAXON connects models, data,
              tools and people into one
              intelligent operating layer —
              turning AI from something you use
              into something that works.
            </p>
          </Reveal>

          <div className="stats">
            {stats.map(([value, label], index) => (
              <Reveal
                key={label}
                delay={index * 0.07}
              >
                <motion.div
                  className="stat"
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                  }}
                >
                  <strong>{value}</strong>

                  <span>{label}</span>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SOLUTIONS */}

        <section
          className="dark-section"
          id="solutions"
        >
          <div className="section-head">
            <Reveal>
              <p className="kicker">
                ONE PLATFORM. MANY POSSIBILITIES.
              </p>

              <h2>
                Built around the
                <br />

                <span>
                  work that matters.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p>
                CLAXON brings intelligence
                directly into the workflows
                where your teams create value.
              </p>
            </Reveal>
          </div>

          <div className="solution-grid">
            {solutions.map(
              (solution, index) => {
                const Icon = solution.icon;

                return (
                  <Reveal
                    key={solution.number}
                    delay={index * 0.08}
                  >
                    <motion.article
                      className="solution-card"
                      whileHover={{
                        y: -10,
                        rotateX: 2,
                        rotateY: -2,
                      }}
                    >
                      <div className="card-top">
                        <span>
                          {solution.number}
                        </span>

                        <Icon size={21} />
                      </div>

                      <h3>
                        {solution.title}
                      </h3>

                      <p>
                        {solution.text}
                      </p>

                      <div className="card-arrow">
                        <ArrowUpRight size={18} />
                      </div>
                    </motion.article>
                  </Reveal>
                );
              },
            )}
          </div>
        </section>

        {/* AGENTS */}

        <section
          className="agent-section"
          id="agents"
        >
          <motion.div
            className="agent-visual"
            initial={{
              opacity: 0,
              x: -50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
            }}
          >
            <motion.div
              className="agent-window"
              whileHover={{
                rotateY: -2,
                rotateX: 2,
              }}
            >
              <div className="window-bar">
                <span />
                <span />
                <span />

                <label>
                  claxon / agent-runtime
                </label>
              </div>

              <div className="agent-body">
                <motion.div
                  className="agent-status"
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <i />
                  Agent online
                  <span>●</span>
                </motion.div>

                <motion.div
                  className="message user"
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                >
                  Qualify today's inbound leads
                  and schedule the highest-intent calls.
                </motion.div>

                <motion.div
                  className="message ai"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.2,
                  }}
                >
                  <div className="ai-avatar">
                    C
                  </div>

                  <div>
                    <b>On it.</b>

                    <p>
                      I'm checking CRM context,
                      company signals and
                      conversation history.
                    </p>

                    <div className="tool-row">
                      <span>CRM</span>
                      <span>Intent</span>
                      <span>Calendar</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="result"
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.5,
                  }}
                >
                  <Zap size={16} />

                  <span>
                    17 high-intent leads found
                  </span>

                  <b>
                    8 meetings booked
                  </b>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          <div className="agent-copy">
            <Reveal>
              <p className="kicker">
                AGENTIC BY DESIGN
              </p>

              <h2>
                Give AI a job.
                <br />

                <span>
                  Not a prompt.
                </span>
              </h2>

              <p>
                CLAXON Agents reason across
                context, connect to your tools
                and execute multi-step workflows.
              </p>

              <button
                className="outline-btn"
                onClick={() =>
                  go('contact')
                }
              >
                Explore agents
                <ArrowRight size={16} />
              </button>
            </Reveal>
          </div>
        </section>

        {/* ECOSYSTEM / BRANDTHIS */}

        <section
          className="ecosystem"
          id="ecosystem"
        >
          <div className="ecosystem-glow" />

          <div className="ecosystem-copy">
            <Reveal>
              <p className="kicker">
                THE CLAXON ECOSYSTEM
              </p>

              <h2>
                Intelligence takes
                <br />

                <span>
                  different forms.
                </span>
              </h2>

              <p>
                CLAXON builds intelligent
                products for the way modern
                businesses operate, create
                and grow.
              </p>
            </Reveal>
          </div>

          <div className="ecosystem-product">
            <Reveal delay={0.15}>
              <div className="product-label">
                <Building2 size={16} />

                A CLAXON ECOSYSTEM COMPANY
              </div>

              <div className="brandthis-title">
                BRAND
                <span>THIS</span>
              </div>

              <p className="brandthis-description">
                Turn your brand into intelligence
                AI can understand, remember
                and use to create consistently.
              </p>

              <div className="brandthis-tags">
                <span>Brand DNA</span>
                <span>Creative AI</span>
                <span>Brand Intelligence</span>
              </div>

              <BrandthisPreview />

              <motion.button
                className="brandthis-button"
                whileHover={{
                  x: 4,
                }}
              >
                Explore BRANDTHIS
                <ArrowUpRight size={17} />
              </motion.button>
            </Reveal>
          </div>
        </section>

        {/* USE CASES */}

        
        {/* STORY */}

        <section
          className="story"
          id="about"
        >
          <Reveal>
            <div className="story-number">
              01
            </div>

            <p className="kicker">
              THE OUTCOME
            </p>

            <h2>
              Less busywork.
              <br />

              <span>
                More business.
              </span>
            </h2>

            <p className="story-copy">
              The best AI transformation doesn't
              feel like a technology project.
              It feels like your business
              suddenly has more capacity.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <motion.div
              className="quote"
              whileHover={{
                y: -5,
              }}
            >
              

              <p>
                CLAXON helped me rethink what
                an AI-first operation could
                actually look like.
              </p>

              <span>
                — Frontend Developer
              </span>
            </motion.div>
          </Reveal>
        </section>

        {/* CONTACT */}

        
      </main>

      <footer>
        <div className="footer-brand">
          

          CLAXON AI
        </div>

        <span>
           CLAXON AI
        </span>

        <span>
          Intelligence in motion.
        </span>
      </footer>
    </div>
  );
}

createRoot(
  document.getElementById('root')!,
).render(<App />);
