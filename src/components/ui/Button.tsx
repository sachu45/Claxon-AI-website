import React, { useRef } from 'react';

/**
 * A restrained magnetic hover: small, capped displacement, reset on leave.
 * No bounce, no spring overshoot — just a subtle sense that the button
 * notices the cursor.
 */
export function MagneticButton({
  children,
  className = '',
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const move = (event: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    el.style.transform = `translate(${x * 0.06}px, ${y * 0.08}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0px, 0px)';
  };

  return (
    <button
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={move}
      onMouseLeave={reset}
    >
      {children}
    </button>
  );
}
