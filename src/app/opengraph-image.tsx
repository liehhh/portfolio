import { ImageResponse } from 'next/og';
import { profile, projects, site } from '@/content/portfolio';

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Social preview in the site's Paper palette: monogram, name, role line. */
export default function OpengraphImage() {
  const [first, last] = profile.name.toUpperCase().split(' ');
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#ECEBE7', color: '#0D0D0C', padding: 56 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontSize: 20, textTransform: 'uppercase' }}>
          <div style={{ display: 'flex', background: '#0D0D0C', color: '#ECEBE7', fontSize: 34, fontWeight: 900, padding: '10px 14px', letterSpacing: -1 }}>
            {profile.initials}®
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span>
              Portfolio {site.volume} — {site.year}
            </span>
            <span>{profile.location}</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto', fontSize: 150, lineHeight: 0.86, letterSpacing: -6, fontWeight: 300 }}>
          <span>{first}</span>
          <span>{last}</span>
        </div>
        <div style={{ display: 'flex', height: 18, background: '#0D0D0C', marginTop: 28 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18, fontSize: 24, textTransform: 'uppercase' }}>
          <span>Full-stack developer &amp; AI engineer</span>
          <span>{projects.map((p) => p.title).join(' · ')}</span>
        </div>
      </div>
    ),
    size,
  );
}
