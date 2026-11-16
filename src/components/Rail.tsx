'use client';

import { useRef } from 'react';
import { clamp, useFrame } from '@/lib/motion';

const widths = [5, 12, 2, 16, 7, 3, 10, 2, 8, 4, 14, 2, 6];
const gaps = [2, 1, 4, 2, 3, 1, 2, 4, 1, 2, 1, 3, 0];

/** Barcode rail beside the featured case studies; bars grow with scroll progress. */
export default function Rail() {
  const root = useRef<HTMLDivElement>(null);
  const bars = useRef<(HTMLDivElement | null)[]>([]);
  const last = useRef(-1);
  useFrame(() => {
    const h = root.current?.parentElement;
    if (!h) return;
    const r = h.getBoundingClientRect();
    const p = clamp((innerHeight - r.top) / (r.height + innerHeight * 0.2), 0, 1);
    if (Math.abs(p - last.current) < 0.0005) return;
    last.current = p;
    bars.current.forEach((b, i) => {
      if (b) b.style.transform = `scaleY(${clamp(0.08 + (p * 1.5 - (((i * 37) % 13) / 13) * 0.5), 0.04, 1).toFixed(3)})`;
    });
  });
  return (
    <div className="rail" ref={root} aria-hidden>
      <div className="rail-in">
        {widths.map((w, i) => (
          <div
            key={i}
            ref={(el) => {
              bars.current[i] = el;
            }}
            style={{ width: w, marginRight: gaps[i], transformOrigin: i % 2 ? 'bottom' : 'top', transform: 'scaleY(0.08)' }}
          />
        ))}
      </div>
    </div>
  );
}
