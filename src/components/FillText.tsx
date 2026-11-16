'use client';

import { ReactNode, useRef } from 'react';
import { clamp, reducedMotion, useFrame } from '@/lib/motion';

/** Paragraph whose ink "fills" top-to-bottom as it scrolls through the viewport. */
export default function FillText({ className, children }: { className: string; children: ReactNode }) {
  const p = useRef<HTMLParagraphElement>(null);
  const last = useRef(-1);
  useFrame(() => {
    const el = p.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const t = reducedMotion() ? 1 : clamp((innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.25), 0, 1);
    if (Math.abs(t - last.current) < 0.001) return;
    last.current = t;
    const pc = t * 116 - 8;
    el.style.backgroundImage = `linear-gradient(180deg, var(--ink) ${pc}%, var(--faint) ${pc + 8}%)`;
  });
  return (
    <p ref={p} className={className}>
      {children}
    </p>
  );
}
