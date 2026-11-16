import Image from 'next/image';
import type { Figure as FigureData } from '@/content/portfolio';

/** Diagram figures drawn from project facts — stand-ins for product screenshots, which were not supplied. */
export default function Figure({ fig, className, title }: { fig: FigureData; className: string; title: string }) {
  return (
    <figure className={`fig-img ${className}`}>
      <div className={`figp figp-${fig.type}`}>
        {fig.type === 'flow' && (
          <>
            <ol className="flow">
              {fig.steps.map((s, i) => (
                <li key={s.label}>
                  <span className="mono flow-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flow-l">{s.label}</span>
                  {s.detail && <span className="mono flow-d">{s.detail}</span>}
                </li>
              ))}
            </ol>
            {fig.aside && <p className="mono figp-aside">↺ {fig.aside}</p>}
          </>
        )}
        {fig.type === 'image' && (
          <>
            <div className="figp-art">
              <Image src={fig.src} alt={fig.alt} fill sizes="(max-width: 520px) 50vw, (max-width: 900px) 25vw, 12vw" />
            </div>
            {fig.label && <p className="mono figp-aside">{fig.label}</p>}
          </>
        )}
        {fig.type === 'stats' && (
          <>
            <dl className="stats">
              {fig.items.map((s) => (
                <div key={s.label}>
                  <dt className="mono">{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
            {fig.footnote && <p className="mono figp-aside">{fig.footnote}</p>}
          </>
        )}
        {fig.type === 'list' && (
          <ul className="surf">
            {fig.items.map((s) => (
              <li key={s.label}>
                <span className="surf-l">{s.label}</span>
                <span className="mono">{s.detail}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <figcaption className="glass-pill mono">
        {fig.caption}
        <span className="sr-only"> — {title}</span>
      </figcaption>
    </figure>
  );
}
