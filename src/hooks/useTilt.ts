import { useCallback, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * A restrained cursor-tilt: the element leans toward the pointer within a
 * few degrees, eases back on leave. Skipped entirely under
 * prefers-reduced-motion. Meant for one or two "physical" surfaces per
 * page, not everything — applied to the hero signal panel, the agent
 * window and the Brandthis preview.
 */
export function useTilt<T extends HTMLElement>(strength = 7) {
  const ref = useRef<T>(null);
  const reduceMotion = useReducedMotion();

  const onMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (reduceMotion) return;
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;

      el.style.transform = `perspective(1000px) rotateY(${(px * strength).toFixed(
        2,
      )}deg) rotateX(${(-py * strength).toFixed(2)}deg)`;
    },
    [reduceMotion, strength],
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
