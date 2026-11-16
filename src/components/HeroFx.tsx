'use client';

import { useEffect, useRef, useState } from 'react';
import { clamp, fine, mouse, reducedMotion, useFrame } from '@/lib/motion';

const S = 220;

/**
 * Client island for the hero: letters swell (weight + width) as the cursor approaches,
 * plus the liquid-glass lens (SVG displacement + per-channel offset = refraction + chromatic split).
 * Renders nothing visible until hydrated; disabled for touch input and reduced motion.
 */
export default function HeroFx() {
  const marker = useRef<HTMLSpanElement>(null);
  const lens = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLElement | null>(null);
  const letters = useRef<HTMLElement[]>([]);
  const k = useRef<number[]>([]);
  const s = useRef({ x: 0, y: 0, o: 0 });
  const [map, setMap] = useState('');
  const [mode, setMode] = useState<'off' | 'svg' | 'blur'>('off');

  useEffect(() => {
    host.current = marker.current?.closest('section') ?? null;
    letters.current = Array.from(host.current?.querySelectorAll<HTMLElement>('.li') ?? []);
    const decide = () => {
      if (!fine() || reducedMotion()) return setMode('off');
      const ua = navigator.userAgent;
      // backdrop-filter: url() is Chromium-only; other engines get a soft blur lens.
      setMode(/Chrome\//.test(ua) && !/Firefox/.test(ua) ? 'svg' : 'blur');
    };
    decide();
    const m1 = window.matchMedia('(pointer: fine)');
    const m2 = window.matchMedia('(prefers-reduced-motion: reduce)');
    m1.addEventListener('change', decide);
    m2.addEventListener('change', decide);
    return () => {
      m1.removeEventListener('change', decide);
      m2.removeEventListener('change', decide);
    };
  }, []);

  useEffect(() => {
    if (mode !== 'svg' || map) return;
    const c = document.createElement('canvas');
    c.width = c.height = S;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const im = ctx.createImageData(S, S);
    for (let y = 0; y < S; y++)
      for (let x = 0; x < S; x++) {
        const nx = ((x + 0.5) / S) * 2 - 1,
          ny = ((y + 0.5) / S) * 2 - 1,
          r = Math.hypot(nx, ny);
        let dx = 0,
          dy = 0;
        if (r < 1) {
          const a = 0.32 + 0.68 * r ** 4;
          dx = -nx * a;
          dy = -ny * a;
        }
        const i = (y * S + x) * 4;
        im.data[i] = 128 + dx * 127;
        im.data[i + 1] = 128 + dy * 127;
        im.data[i + 2] = 128;
        im.data[i + 3] = 255;
      }
    ctx.putImageData(im, 0, 0);
    s.current.x = mouse.x;
    s.current.y = mouse.y;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time generated asset
    setMap(c.toDataURL());
  }, [mode, map]);

  useFrame(() => {
    const h = host.current;
    if (!h) return;
    const hr = h.getBoundingClientRect();
    const visible = hr.bottom > 0 && hr.top < innerHeight;
    const on = mode !== 'off' && mouse.seen;
    const inside = on && visible && mouse.x >= hr.left && mouse.x <= hr.right && mouse.y >= Math.max(hr.top, 70) && mouse.y <= hr.bottom;

    if (visible && (on || k.current.some((v) => v > 0.001))) {
      const R = innerWidth * 0.26;
      letters.current.forEach((el, i) => {
        const r = el.parentElement!.getBoundingClientRect();
        const d = Math.hypot(mouse.x - (r.left + r.width / 2), mouse.y - (r.top + r.height / 2));
        let t = inside ? clamp(1 - d / R, 0, 1) : 0;
        t = t * t * (3 - 2 * t);
        const prev = k.current[i] || 0;
        let nk = prev + (t - prev) * 0.1;
        if (nk < 0.001 && t === 0) nk = 0;
        k.current[i] = nk;
        if (nk !== prev)
          el.style.fontVariationSettings = `'wght' ${(250 + nk * 650).toFixed(1)}, 'wdth' ${(100 + nk * 25).toFixed(1)}`;
      });
    }

    const l = lens.current;
    if (!l) return;
    const c = s.current;
    c.o += ((inside ? 1 : 0) - c.o) * 0.12;
    if (c.o < 0.002 && !inside) {
      if (l.style.opacity !== '0') l.style.opacity = '0';
      c.x = mouse.x;
      c.y = mouse.y;
      return;
    }
    const px = c.x,
      py = c.y;
    c.x += (mouse.x - c.x) * 0.16;
    c.y += (mouse.y - c.y) * 0.16;
    const vx = c.x - px,
      vy = c.y - py,
      sp = Math.min(Math.hypot(vx, vy) / 60, 0.28);
    const a = (Math.atan2(vy, vx) * 180) / Math.PI,
      sc = 0.6 + 0.4 * c.o;
    l.style.opacity = c.o.toFixed(3);
    l.style.transform = `translate3d(${c.x - S / 2}px,${c.y - S / 2}px,0) rotate(${a}deg) scale(${(1 + sp) * sc},${clamp(1 - sp * 0.6, 0.5, 1) * sc}) rotate(${-a}deg)`;
  });

  const ch = (scale: number, id: string, m: string) => (
    <>
      <feDisplacementMap in="SourceGraphic" in2="map" scale={scale} xChannelSelector="R" yChannelSelector="G" result={'d' + id} />
      <feColorMatrix in={'d' + id} type="matrix" values={m} result={id} />
    </>
  );

  return (
    <>
      <span ref={marker} hidden />
      {mode === 'svg' && (
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
          <filter id="lens" x="0" y="0" width={S} height={S} filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            {map && <feImage href={map} x="0" y="0" width={S} height={S} preserveAspectRatio="none" result="map" />}
            {ch(190, 'r', '1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0')}
            {ch(204, 'g', '0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0')}
            {ch(218, 'b', '0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0')}
            <feBlend in="r" in2="g" mode="screen" result="rg" />
            <feBlend in="rg" in2="b" mode="screen" />
          </filter>
        </svg>
      )}
      {mode !== 'off' && (
        <div ref={lens} className="lens" aria-hidden style={{ backdropFilter: mode === 'svg' ? 'url(#lens)' : 'blur(3px) saturate(1.6) contrast(1.1)' }} />
      )}
    </>
  );
}
