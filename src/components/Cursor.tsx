'use client';

import { useEffect, useRef, useState } from 'react';
import { fine, mouse, useFrame } from '@/lib/motion';

/** Inverting dot + glass label driven by [data-cursor] attributes. Mouse/trackpad only. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const tag = useRef<HTMLDivElement>(null);
  const s = useRef({ cx: 0, cy: 0, tx: 0, ty: 0, k: 1, on: false, shown: false });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const m = window.matchMedia('(pointer: fine)');
    const update = () => setActive(fine());
    update();
    m.addEventListener('change', update);
    return () => m.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!active) return;
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest?.('[data-cursor]');
      s.current.on = !!t;
      if (tag.current) {
        if (t) tag.current.textContent = t.getAttribute('data-cursor');
        tag.current.style.opacity = t ? '1' : '0';
      }
    };
    // Hide the native cursor only once the custom one has a position.
    const first = () => root.classList.add('no-cursor');
    const leave = () => {
      if (dot.current) dot.current.style.opacity = '0';
      if (tag.current) tag.current.style.opacity = '0';
    };
    const enter = () => {
      if (dot.current) dot.current.style.opacity = '1';
    };
    document.addEventListener('mouseover', over);
    window.addEventListener('pointermove', first, { once: true });
    document.documentElement.addEventListener('mouseleave', leave);
    document.documentElement.addEventListener('mouseenter', enter);
    return () => {
      root.classList.remove('no-cursor');
      document.removeEventListener('mouseover', over);
      window.removeEventListener('pointermove', first);
      document.documentElement.removeEventListener('mouseleave', leave);
      document.documentElement.removeEventListener('mouseenter', enter);
    };
  }, [active]);

  useFrame(() => {
    if (!active || !mouse.seen) return;
    const c = s.current;
    if (!c.shown) {
      c.cx = c.tx = mouse.x;
      c.cy = c.ty = mouse.y;
      c.shown = true;
      if (dot.current) dot.current.style.opacity = '1';
    }
    c.cx += (mouse.x - c.cx) * 0.35;
    c.cy += (mouse.y - c.cy) * 0.35;
    c.tx += (mouse.x - c.tx) * 0.18;
    c.ty += (mouse.y - c.ty) * 0.18;
    c.k += ((c.on ? 4.2 : 1) - c.k) * 0.18;
    if (dot.current) dot.current.style.transform = `translate3d(${c.cx - 6}px,${c.cy - 6}px,0) scale(${c.k})`;
    if (tag.current) tag.current.style.transform = `translate3d(${c.tx + 30}px,${c.ty + 18}px,0)`;
  });

  if (!active) return null;
  return (
    <>
      <div ref={dot} className="cur-dot" aria-hidden style={{ opacity: 0 }} />
      <div ref={tag} className="cur-tag glass-pill" aria-hidden />
    </>
  );
}
