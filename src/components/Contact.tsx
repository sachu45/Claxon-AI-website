import { useState } from 'react';
import { ArrowRight, Copy, Check } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { MagneticButton } from './ui/Button';

const EMAIL = 'support@claxonai.in';

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Clipboard API unavailable (older browser, insecure context) — the
      // mailto link on the address itself still works as a fallback.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="section contact" id="contact">
      <Reveal>
        <p className="eyebrow">Get in touch</p>
        <h2 className="section-heading">
          Let's find out <span>where this fits.</span>
        </h2>
        <p className="contact-copy">
          Tell us what you're trying to automate. We'll tell you plainly
          whether Claxon is the right fit for it — no pressure to bring on
          a platform you don't need.
        </p>

        <div className="contact-actions">
          <MagneticButton
            className="btn btn-primary on-light"
            onClick={() => window.location.assign(`mailto:${EMAIL}`)}
          >
            Book a demo
            <ArrowRight size={17} />
          </MagneticButton>

          <div className="contact-email-group">
            <a className="contact-email" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <button
              className="contact-copy-btn"
              onClick={copyEmail}
              aria-label="Copy email address"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </Reveal>

      <div className="contact-meta">
        <span>CLAXON AI</span>
        <span>The AI operating layer for modern business</span>
      </div>
    </section>
  );
}
