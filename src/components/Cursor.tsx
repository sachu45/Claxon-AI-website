import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * A minimal two-part cursor: a dot that tracks the pointer exactly and a
 * ring that trails it with a little spring lag, widening over anything
 * clickable. Fine-pointer devices only, and it never replaces the system
 * cursor for anyone who hasn't opted into motion — reduced-motion and
 * touch/coarse-pointer devices get the default cursor untouched.
 */
export function Cursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.4 });

  useEffect(() => {
    if (reduceMotion) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    setEnabled(true);
    document.documentElement.classList.add('custom-cursor');

    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      setHovering(Boolean(target.closest('a, button, [data-cursor-hover]')));
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);

    return () => {
      document.documentElement.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [reduceMotion, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} aria-hidden="true" />
      <motion.div
        className={`cursor-ring ${hovering ? 'is-hovering' : ''}`}
        style={{ x: ringX, y: ringY }}
        aria-hidden="true"
      />
    </>
  );
}
