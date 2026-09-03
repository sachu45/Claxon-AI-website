import { useState, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Globe,
  Palette,
  Layers,
  Wand2,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { useTilt } from '../hooks/useTilt';

const PALETTE = [
  { name: 'Periwinkle', value: '#8489d9' },
  { name: 'Terracotta', value: '#f0906a' },
  { name: 'Emerald', value: '#6fcf97' },
  { name: 'Amber', value: '#e8b34c' },
];

function BrandthisPreview({
  swatch,
  onSwatch,
}: {
  swatch: number;
  onSwatch: (i: number) => void;
}) {
  const [scanning, setScanning] = useState(false);
  const [complete, setComplete] = useState(false);
  const tilt = useTilt<HTMLDivElement>(4);

  const startScan = () => {
    setScanning(true);
    setComplete(false);
    window.setTimeout(() => {
      setScanning(false);
      setComplete(true);
    }, 1800);
  };

  return (
    <div
      className="brandthis-preview tilt-target"
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
    >
      <div className="brandthis-window-bar">
        <div className="window-dots">
          <span />
          <span />
          <span />
        </div>
        <div className="window-title">brandthis / brand intelligence</div>
        <div className="window-status">
          <span />
          Live
        </div>
      </div>

      <div className="brandthis-body">
        <div className="brandthis-sidebar">
          <div className="bt-logo">B</div>
          <span className="sidebar-line active" />
          <span className="sidebar-line" />
          <span className="sidebar-line" />
          <span className="sidebar-line" />
        </div>

        <div className="brandthis-main">
          <div className="brandthis-heading">
            <div>
              <span>BRAND INTELLIGENCE</span>
              <h3>Your brand DNA</h3>
            </div>
            <div className="dna-status">
              <CheckCircle2 size={14} />
              Ready
            </div>
          </div>

          <div className="brand-scan-card">
            <div className="scan-top">
              <Globe size={16} />
              <span>{complete ? 'brandthis.ai' : 'Paste your website'}</span>
              {complete && <CheckCircle2 size={15} />}
            </div>

            <button onClick={startScan} disabled={scanning}>
              {scanning ? 'Reading your brand…' : complete ? 'Scanned ✓' : 'Scan brand'}
            </button>
          </div>

          <AnimatePresence>
            {(complete || scanning) && (
              <motion.div
                className="dna-grid"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="dna-card">
                  <Palette size={16} />
                  <span>Color system</span>
                  <div className="mini-colors">
                    {PALETTE.map((c, i) => (
                      <button
                        key={c.name}
                        className={i === swatch ? 'is-active' : ''}
                        style={{ background: c.value }}
                        onClick={() => onSwatch(i)}
                        aria-label={`Preview the ${c.name} brand color`}
                        aria-pressed={i === swatch}
                      />
                    ))}
                  </div>
                </div>
                <div className="dna-card">
                  <Layers size={16} />
                  <span>Visual identity</span>
                  <strong>Detected</strong>
                </div>
                <div className="dna-card">
                  <Wand2 size={16} />
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

export function Ecosystem() {
  const [swatch, setSwatch] = useState(0);

  return (
    <section className="section ecosystem" id="ecosystem">
      <div className="ecosystem-inner">
        <div className="ecosystem-copy">
          <Reveal>
            <p className="eyebrow">The Claxon ecosystem</p>
            <h2 className="section-heading">
              Intelligence takes <span className="dim">different forms.</span>
            </h2>
            <p className="section-lede">
              Claxon also builds standalone products for specific jobs. The
              first is a brand intelligence tool for teams who need AI to
              create on-brand, not just on-topic.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            style={{ '--bt-accent': PALETTE[swatch].value } as CSSProperties}
          >
            <div className="product-label">
              <Building2 size={14} />A CLAXON ECOSYSTEM COMPANY
            </div>

            <div className="brandthis-title">
              BRAND<span>THIS</span>
            </div>

            <p className="brandthis-description">
              Turn a website into a brand profile an AI can actually use —
              color system, visual identity and voice, kept consistent
              across everything it generates. The swatches below are live —
              click one.
            </p>

            <div className="brandthis-tags">
              <span>Brand DNA</span>
              <span>Creative AI</span>
              <span>Brand intelligence</span>
            </div>

            <BrandthisPreview swatch={swatch} onSwatch={setSwatch} />

            <button className="btn-text" style={{ marginTop: 26 }}>
              Explore Brandthis
              <ArrowUpRight size={16} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
