import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, RotateCw } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { useTilt } from '../hooks/useTilt';

const SCENARIOS = [
  {
    task: "Qualify today's inbound leads and schedule the highest-intent calls.",
    note: 'Checking CRM context, recent activity and prior conversation history before I reach out.',
    tools: ['CRM', 'Intent', 'Calendar'],
    metric: '17 high-intent leads found',
    result: '8 meetings booked',
  },
  {
    task: "Triage this week's support backlog and resolve what you can.",
    note: 'Pulling ticket history, plan tier and past resolutions before touching anything.',
    tools: ['Helpdesk', 'Billing', 'Docs'],
    metric: '34 tickets triaged',
    result: '21 resolved automatically',
  },
  {
    task: "Reconcile last night's failed orders and flag anything that needs a human.",
    note: 'Cross-checking payment status, inventory and shipping records.',
    tools: ['Payments', 'Inventory', 'Shipping'],
    metric: '9 orders reconciled',
    result: '2 flagged for review',
  },
];

export function AgentDemo({ go }: { go: (id: string) => void }) {
  const [index, setIndex] = useState(0);
  const tilt = useTilt<HTMLDivElement>(4);
  const scenario = SCENARIOS[index];

  return (
    <section className="section agent-section" id="agents">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="agent-window tilt-target"
          ref={tilt.ref}
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
        >
          <div className="window-bar">
            <span />
            <span />
            <span />
            <label>claxon / agent-runtime</label>
            <button
              className="replay-btn"
              onClick={() => setIndex((i) => (i + 1) % SCENARIOS.length)}
              aria-label="Try another task"
            >
              <RotateCw size={11} />
              Try another
            </button>
          </div>

          <motion.div
            className="agent-body"
            key={index}
            initial="hidden"
            animate="visible"
          >
            <div className="agent-status">
              <i />
              Agent online
              <span>●</span>
            </div>

            <motion.div
              className="message user"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {scenario.task}
            </motion.div>

            <motion.div
              className="message ai"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="ai-avatar">C</div>
              <div>
                <b>On it.</b>
                <p>{scenario.note}</p>
                <div className="tool-row">
                  {scenario.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Zap size={15} />
              <span>{scenario.metric}</span>
              <b>{scenario.result}</b>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="agent-copy">
        <Reveal>
          <p className="eyebrow">Agentic by design</p>
          <h2 className="section-heading">
            Give AI a job. <span className="dim">Not a prompt.</span>
          </h2>
          <p className="section-lede">
            Claxon agents pull context from your systems, decide what to do
            next, and carry a task through several steps without you
            re-prompting them at each one. This is the same runtime handling
            three different jobs — try another to see it switch context.
          </p>
          <button className="btn-text" style={{ marginTop: 30 }} onClick={() => go('contact')}>
            Talk through a use case
            <ArrowRight size={15} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
