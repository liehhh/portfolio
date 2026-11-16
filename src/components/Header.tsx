'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { profile, projects, site, Theme, themes } from '@/content/portfolio';

const nav = [
  { href: '#top', label: 'Index' },
  { href: '#work', label: 'Work', sup: String(projects.length).padStart(2, '0') },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

// Theme lives on <html data-theme>; the inline script in layout.tsx restores it before paint.
const themeListeners = new Set<() => void>();
const readTheme = () => (document.documentElement.dataset.theme as Theme) || 'Paper';
function setTheme(t: Theme) {
  document.documentElement.dataset.theme = t;
  try {
    localStorage.setItem('theme', t);
  } catch {
    /* storage unavailable — theme still applies for this visit */
  }
  themeListeners.forEach((f) => f());
}
const subscribeTheme = (f: () => void) => {
  themeListeners.add(f);
  return () => {
    themeListeners.delete(f);
  };
};

function useTheme() {
  return useSyncExternalStore(subscribeTheme, readTheme, () => 'Paper' as Theme);
}

function ThemeButton({ className = '' }: { className?: string }) {
  const theme = useTheme();
  const next = themes[(themes.indexOf(theme) + 1) % themes.length];
  return (
    <button
      type="button"
      className={`theme-btn glass-pill ${className}`}
      onClick={() => setTheme(next)}
      data-cursor="Theme"
      aria-label={`Theme: ${theme}. Switch to ${next}`}
    >
      {theme}
    </button>
  );
}

function Clock() {
  const el = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: profile.timeZone, hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const tick = () => {
      if (el.current) el.current.textContent = fmt.format(new Date());
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="clock mono">
      {profile.clockLabel}
      <br />
      <span ref={el} aria-label={`Local time in ${profile.location}`}>
        --:--:--
      </span>
    </div>
  );
}

function MobileMenu() {
  const dlg = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    const onClose = () => setOpen(false);
    d.addEventListener('close', onClose);
    // Close if the viewport grows past the mobile breakpoint while open.
    const m = window.matchMedia('(min-width: 901px)');
    const onMq = () => m.matches && d.open && d.close();
    m.addEventListener('change', onMq);
    return () => {
      d.removeEventListener('close', onClose);
      m.removeEventListener('change', onMq);
    };
  }, []);
  const show = () => {
    dlg.current?.showModal();
    setOpen(true);
  };
  return (
    <>
      <button type="button" className="menu-btn glass-pill" onClick={show} aria-haspopup="dialog" aria-expanded={open} aria-controls="site-menu">
        Menu
      </button>
      <dialog id="site-menu" ref={dlg} className="menu" aria-label="Site navigation">
        <div className="menu-top">
          <span className="mono">
            {profile.name}
            <br />
            {site.volume} — {site.year}
          </span>
          <form method="dialog">
            <button className="menu-btn menu-close" autoFocus>
              Close
            </button>
          </form>
        </div>
        <nav className="menu-nav" aria-label="Mobile">
          {nav.map((n, i) => (
            <a key={n.href} href={n.href} onClick={() => dlg.current?.close()}>
              <span className="mono">({i + 1})</span>
              <span>{n.label}</span>
              {n.sup && <sup className="mono">{n.sup}</sup>}
            </a>
          ))}
        </nav>
        <div className="menu-foot mono">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="ul">
            LinkedIn ↗
          </a>
          <ThemeButton className="menu-theme" />
        </div>
      </dialog>
    </>
  );
}

export default function Header() {
  return (
    <header className="hdr">
      <a href="#top" className="brand" data-cursor="Top ↑" aria-label={`${profile.name} — back to top`}>
        <span className="mono-box" aria-hidden>
          {profile.initials}®
        </span>
        <span className="brand-meta glass-pill-sq" aria-hidden>
          Portfolio
          <br />
          {site.volume} — {site.year}
        </span>
      </a>
      <nav className="nav glass-pill" aria-label="Primary">
        {nav.map((n) => (
          <a key={n.href} href={n.href}>
            {n.label}
            {n.sup && <sup aria-label={`(${Number(n.sup)} projects)`}>{n.sup}</sup>}
          </a>
        ))}
      </nav>
      <div className="hdr-r">
        <ThemeButton />
        <Clock />
        <a href="#contact" className="avail" data-cursor="Say hi">
          <i aria-hidden />
          Get in touch
        </a>
        <MobileMenu />
      </div>
    </header>
  );
}
