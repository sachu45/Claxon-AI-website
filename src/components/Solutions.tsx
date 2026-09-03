import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { solutions } from '../data';

export function Solutions() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section solutions" id="solutions">
      <div className="section-head">
        <Reveal>
          <p className="eyebrow">What it's built to do</p>
          <h2 className="section-heading">
            Built around the work <span className="dim">that matters.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="section-lede">
            Four things Claxon is actually good at. Click one for the
            specifics — hover the list and the rest steps back.
          </p>
        </Reveal>
      </div>

      <div className="solution-rows">
        {solutions.map((solution, index) => {
          const open = openIndex === index;

          return (
            <Reveal key={solution.number} delay={index * 0.05}>
              <div className={`solution-row ${open ? 'is-open' : ''}`}>
                <button
                  className="solution-row-trigger"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                >
                  <span className="solution-index">{solution.number}</span>
                  <h3>{solution.title}</h3>
                  <p>{solution.text}</p>
                  <span className="solution-go" aria-hidden="true">
                    <ChevronDown size={16} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      className="solution-detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="solution-detail-inner">
                        {solution.detail.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
