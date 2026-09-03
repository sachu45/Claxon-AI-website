import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from 'framer-motion';
import { Reveal } from './ui/Reveal';

const LINE_ONE = "The best AI transformation doesn't feel like a technology project.";
const LINE_TWO = 'It feels like your business suddenly has more capacity.';

function Word({
  children,
  progress,
  range,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <motion.span className="scrub-word" style={{ opacity }}>
      {children}
    </motion.span>
  );
}

function ScrubbedLine({
  text,
  progress,
  start,
  end,
}: {
  text: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const words = text.split(' ');
  const span = end - start;

  return (
    <span>
      {words.map((word, i) => {
        const wordStart = start + (span * i) / words.length;
        const wordEnd = start + (span * (i + 1)) / words.length;
        return (
          <Word key={`${word}-${i}`} progress={progress} range={[wordStart, wordEnd]}>
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </Word>
        );
      })}
    </span>
  );
}

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.15'],
  });

  return (
    <section className="section story" id="about">
      <div className="story-inner">
        <Reveal>
          <p className="eyebrow">What changes</p>
          <h2 className="section-heading">
            Less busywork. <span className="dim">More business.</span>
          </h2>
        </Reveal>

        <div className="pull-quote" ref={ref}>
          {reduceMotion ? (
            <p>
              {LINE_ONE} <span>{LINE_TWO}</span>
            </p>
          ) : (
            <p aria-hidden="true">
              <ScrubbedLine text={LINE_ONE} progress={scrollYProgress} start={0} end={0.62} />{' '}
              <ScrubbedLine
                text={LINE_TWO}
                progress={scrollYProgress}
                start={0.62}
                end={1}
              />
            </p>
          )}
          {!reduceMotion && (
            <p className="sr-only">
              {LINE_ONE} {LINE_TWO}
            </p>
          )}
          <span className="pull-quote-attr">— Claxon AI</span>
        </div>
      </div>
    </section>
  );
}
