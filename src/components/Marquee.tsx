'use client';

import { useRef } from 'react';
import { clamp, reducedMotion, scroll, useFrame } from '@/lib/motion';
import { marquee } from '@/content/portfolio';

function Track({ words, sep, dir, speed, skew }: { words: string[]; sep: string; dir: 1 | -1; speed: number; skew?: boolean }) {
  const track = useRef<HTMLDivElement>(null);
  const x = useRef(0);
  useFrame(() => {
    const t = track.current;
    if (!t?.firstElementChild || reducedMotion()) return;
    const r = t.getBoundingClientRect();
    if (r.bottom < -200 || r.top > innerHeight + 200) return;
    const w = (t.firstElementChild as HTMLElement).offsetWidth || 1;
    x.current += dir * (speed + scroll.v * 0.6);
    if (x.current <= -w) x.current += w;
    if (x.current > 0) x.current -= w;
    t.style.transform = `translate3d(${x.current}px,0,0) skewX(${skew ? clamp(-scroll.v * 0.5, -16, 16) : 0}deg)`;
  });
  const row = (hidden: boolean) => (
    <div className="mq-row" aria-hidden={hidden || undefined}>
      {words.flatMap((w, i) => [<span key={'w' + i}>{w}</span>, <span key={'s' + i} aria-hidden>{sep}</span>])}
    </div>
  );
  return (
    <div ref={track} className="mq-track">
      {row(false)}
      {row(true)}
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="mq" aria-label="Stack and focus areas">
      <div className="mq-a">
        <Track words={marquee.stack} sep="✕" dir={-1} speed={1.1} skew />
      </div>
      <div className="mq-b glass-band">
        <Track words={marquee.themes} sep="—" dir={1} speed={0.8} />
      </div>
    </section>
  );
}
