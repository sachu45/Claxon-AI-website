import { Reveal } from './ui/Reveal';
import { facts } from '../data';

export function Statement() {
  return (
    <section className="section statement" id="platform">
      <Reveal>
        <p className="eyebrow">The Claxon difference</p>
        <h2 className="section-heading">
          AI shouldn't just answer. <em>It should move.</em>
        </h2>
      </Reveal>

      <Reveal delay={0.08}>
        <p className="statement-copy">
          Most AI tools stop at a chat window. Claxon connects your models,
          your data and the tools you already use so an agent can carry work
          through to the end, instead of describing what someone else should
          do next.
        </p>
      </Reveal>

      <Reveal delay={0.14}>
        <div className="statement-facts">
          {facts.map(([title, text]) => (
            <div className="statement-fact" key={title}>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
