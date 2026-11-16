import Image from 'next/image';
import { profile, projects, site } from '@/content/portfolio';
import HeroFx from './HeroFx';

// Deterministic bar heights for the signal panel shown when no portrait is supplied.
const BARS = Array.from({ length: 15 }, (_, i) => 0.18 + 0.82 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.45)));

function PortraitPanel() {
  if (profile.portrait) {
    return (
      <Image
        src={profile.portrait.src}
        alt={profile.portrait.alt}
        fill
        priority
        sizes="(max-width: 900px) 60vw, 21vw"
        style={{ objectFit: 'cover' }}
      />
    );
  }
  return (
    <div className="signal" aria-hidden>
      <div className="signal-bars">
        {BARS.map((h, i) => (
          <i key={i} style={{ '--h': h.toFixed(3), '--i': i } as React.CSSProperties} />
        ))}
      </div>
      <span className="signal-tag mono">{profile.initials} — Live</span>
    </div>
  );
}

export default function Hero() {
  const words = profile.name.toUpperCase().split(/\s+/).slice(0, 2);
  const longest = Math.max(...words.map((w) => w.length));
  let n = 0;
  return (
    <section id="top" className="hero" aria-labelledby="hero-name">
      <div className="g12 hero-top">
        <div className="mono c1-2">
          (1)
          <br />
          Index / Intro
        </div>
        <p className="lede c3-7">
          {profile.intro} <span className="dim">Currently NOC Engineer at eToro.</span>
        </p>
        <div className="lede c10-12 right">
          /{site.volume.replace('Vol', 'V')} — Portfolio
          <br />({site.year})
        </div>
      </div>
      <div className="hero-mid">
        <div className="portrait">
          <PortraitPanel />
          <span className="fig mono">(Fig. 01) {profile.portrait ? 'Portrait' : 'Signal'}</span>
        </div>
        <h1 className="name" id="hero-name" aria-label={profile.name} style={{ '--chars': longest } as React.CSSProperties}>
          {words.map((w, wi) => (
            <span className="nrow" key={wi} aria-hidden style={{ '--row-chars': w.length } as React.CSSProperties}>
              {Array.from(w).map((ch, ci) => (
                <span className="lw" key={ci}>
                  <span className="li" style={{ '--d': `${200 + n++ * 70}ms` } as React.CSSProperties}>
                    {ch}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </h1>
      </div>
      <div className="g12 hero-bot">
        <p className="role c1-4">
          Full-stack developer
          <br />
          <em>&amp;</em> AI engineer
        </p>
        <div className="hint mono c5-8" aria-hidden>
          <span>(Move cursor — refract)</span>
          <i />
        </div>
        <a href="#work" className="mono c9-12 right hero-scroll">
          Selected work — {String(projects.length).padStart(2, '0')} projects
          <br />
          Scroll ↓
        </a>
      </div>
      <HeroFx />
    </section>
  );
}
