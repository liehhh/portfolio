'use client';

import { useEffect, useRef } from 'react';

export const mouse = { x: 0, y: 0, seen: false };
export const scroll = { y: 0, v: 0 };
export const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

const mq = (q: string) => typeof window !== 'undefined' && window.matchMedia(q).matches;
/** Fine pointer (mouse / trackpad) — hover-driven effects only run here. */
export const fine = () => mq('(pointer: fine)');
export const reducedMotion = () => mq('(prefers-reduced-motion: reduce)');

const subs = new Set<() => void>();
let started = false;
let raf = 0;

function loop() {
  scroll.v += (window.scrollY - scroll.y - scroll.v) * 0.12;
  scroll.y = window.scrollY;
  subs.forEach((f) => f());
  raf = requestAnimationFrame(loop);
}

function start() {
  if (started) return;
  started = true;
  mouse.x = window.innerWidth / 2;
  mouse.y = window.innerHeight / 2;
  scroll.y = window.scrollY;
  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.seen = true;
    },
    { passive: true },
  );
  // Pause the shared loop while the tab is hidden.
  document.addEventListener('visibilitychange', () => {
    cancelAnimationFrame(raf);
    if (!document.hidden) raf = requestAnimationFrame(loop);
  });
  raf = requestAnimationFrame(loop);
}

/** Subscribe to the single shared requestAnimationFrame loop. */
export function useFrame(cb: () => void) {
  const ref = useRef(cb);
  useEffect(() => {
    ref.current = cb;
  });
  useEffect(() => {
    start();
    const f = () => ref.current();
    subs.add(f);
    return () => {
      subs.delete(f);
    };
  }, []);
}
