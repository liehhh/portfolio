'use client';

import { useRef, useState } from 'react';
import { projects } from '@/content/portfolio';
import { clamp, fine, mouse, reducedMotion, useFrame } from '@/lib/motion';
import { projectHash } from './projectHash';
import Reveal from './Reveal';
import StatusBadge from './StatusBadge';

function Preview({ idx, list }: { idx: number; list: React.RefObject<HTMLUListElement | null> }) {
  const el = useRef<HTMLDivElement>(null);
  const s = useRef({ x: 0, y: 0, o: 0 });
  const p = projects[Math.max(idx, 0)];
  useFrame(() => {
    const e = el.current;
    if (!e) return;
    const c = s.current;
    // Hide when the list scrolls out from under a stationary cursor (no mouseleave fires then).
    const r = list.current?.getBoundingClientRect();
    const over = !!r && mouse.x >= r.left && mouse.x <= r.right && mouse.y >= r.top && mouse.y <= r.bottom;
    const target = idx >= 0 && over && fine() ? 1 : 0;
    if (target === 0 && c.o < 0.002) {
      if (e.style.opacity !== '0') e.style.opacity = '0';
      c.x = mouse.x;
      c.y = mouse.y;
      return;
    }
    c.o += (target - c.o) * 0.14;
    const ox = c.x;
    const rm = reducedMotion();
    c.x += (mouse.x - c.x) * (rm ? 1 : 0.13);
    c.y += (mouse.y - c.y) * (rm ? 1 : 0.13);
    const rot = rm ? 0 : clamp((c.x - ox) * 0.6, -14, 14);
    const left = c.x + 340 > innerWidth ? c.x - 360 : c.x + 36;
    e.style.opacity = c.o.toFixed(3);
    e.style.transform = `translate3d(${left}px,${clamp(c.y - 130, 70, innerHeight - 290)}px,0) rotate(${rot}deg) scale(${0.82 + 0.18 * c.o})`;
  });
  return (
    <div ref={el} className="preview glass-card" aria-hidden>
      <div className="pv-img">
        <b>{p.no}</b>
        <span className="mono">[ {p.platform} — {p.stack} ]</span>
      </div>
      <div className="pv-cap">
        <span>{p.title}</span>
        <span className="mono">{p.kind}</span>
      </div>
    </div>
  );
}

export default function Work() {
  const [hover, setHover] = useState(-1);
  const list = useRef<HTMLUListElement>(null);
  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <div className="big-head">
        <Reveal as="h2" id="work-title">
          WORK
        </Reveal>
        <Reveal>
          <span aria-hidden>S03</span>
        </Reveal>
      </div>
      <div className="bar" />
      <div className="row head mono" aria-hidden>
        <span>No.</span>
        <span>Project</span>
        <span>Discipline</span>
        <span>Stack</span>
        <span>Platform</span>
        <span />
      </div>
      <ul ref={list} className="work-list" onMouseLeave={() => setHover(-1)}>
        {projects.map((p, i) => (
          <li key={p.slug}>
            <a
              href={projectHash(p.slug)}
              className="row item"
              data-cursor="View ↗"
              onMouseEnter={() => setHover(i)}
              aria-label={`${p.title} — ${p.kind}${p.status ? ` (${p.status})` : ''}. ${p.discipline}. ${p.stack}. Open project details`}
            >
              <span className="mono">{p.no}</span>
              <span className="t">
                {p.title} <em>— {p.sub}</em>
                {p.status && <StatusBadge status={p.status} className="badge-row" />}
              </span>
              <span className="d">{p.discipline}</span>
              <span className="mono s">{p.stack}</span>
              <span className="mono">{p.platform}</span>
              <span aria-hidden>↗</span>
            </a>
          </li>
        ))}
      </ul>
      <Preview idx={hover} list={list} />
    </section>
  );
}
