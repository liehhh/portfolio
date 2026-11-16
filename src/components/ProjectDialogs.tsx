import { projects } from '@/content/portfolio';
import DialogController from './DialogController';
import ProjectLink from './ProjectLink';
import StatusBadge from './StatusBadge';

/**
 * One native <dialog> per project, fully server-rendered.
 * Opened by links to `#/work/<slug>`; DialogController wires hash ⇄ dialog.
 */
export default function ProjectDialogs() {
  return (
    <>
      {projects.map((p, i) => {
        const prev = projects[(i - 1 + projects.length) % projects.length];
        const next = projects[(i + 1) % projects.length];
        return (
          <dialog key={p.slug} id={`dlg-${p.slug}`} className="pd" aria-labelledby={`pd-${p.slug}-title`} data-slug={p.slug}>
            <div className="pd-in">
              <div className="pd-top mono">
                <span className="pd-top-l">
                  <span>
                    ({p.no}) Project — {p.platform}
                  </span>
                  {p.status && <StatusBadge status={p.status} />}
                </span>
                <form method="dialog">
                  <button className="pd-close glass-pill" data-cursor="Close" aria-label={`Close ${p.title} details`}>
                    Close ✕
                  </button>
                </form>
              </div>
              <div className="big-head sm pd-head">
                <h2 id={`pd-${p.slug}-title`}>{p.title}</h2>
                <span aria-hidden>{p.no}</span>
              </div>
              <div className="bar thin" />
              <div className="pd-grid">
                <div className="pd-main">
                  <p className="pd-kind mono">{p.kind}</p>
                  <p className="pd-summary">{p.summary}</p>
                  {p.focus && <p className="pd-focus">{p.focus}</p>}
                  <h3 className="mono pd-h">What I built</h3>
                  <ol className="pd-list">
                    {p.contributions.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ol>
                </div>
                <aside className="pd-side">
                  <dl className="mono pd-dl">
                    <dt>Discipline</dt>
                    <dd>{p.discipline}</dd>
                    <dt>Platform</dt>
                    <dd>{p.platform}</dd>
                    {p.featured && (
                      <>
                        <dt>Role</dt>
                        <dd>{p.featured.role}</dd>
                      </>
                    )}
                  </dl>
                  <h3 className="mono pd-h">Technology</h3>
                  <ul className="pd-tags mono">
                    {p.technologies.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  {p.context && <p className="pd-context">{p.context}</p>}
                  <h3 className="mono pd-h">Links</h3>
                  {p.links.length ? (
                    <div className="pd-links">
                      {p.links.map((l) => (
                        <ProjectLink key={l.href} link={l} project={p.title} className="btn" />
                      ))}
                    </div>
                  ) : p.status ? (
                    <div className="pd-status">
                      <StatusBadge status={p.status} />
                      {p.statusNote && <p className="mono pd-none">{p.statusNote}</p>}
                    </div>
                  ) : (
                    <p className="mono pd-none">No public demo or repository for this project.</p>
                  )}
                </aside>
              </div>
              <nav className="pd-nav mono" aria-label="Other projects">
                <a href={`#/work/${prev.slug}`} data-cursor="Prev ←">
                  ← {prev.title}
                </a>
                <a href={`#/work/${next.slug}`} data-cursor="Next →">
                  {next.title} →
                </a>
              </nav>
            </div>
          </dialog>
        );
      })}
      <DialogController />
    </>
  );
}
