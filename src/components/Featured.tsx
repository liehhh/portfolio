import { featuredProjects } from '@/content/portfolio';
import Figure from './Figure';
import ProjectLink from './ProjectLink';
import { projectHash } from './projectHash';
import Rail from './Rail';
import Reveal from './Reveal';
import StatusBadge from './StatusBadge';

type FP = (typeof featuredProjects)[number];

function Article({ p, flip }: { p: FP; flip: boolean }) {
  const f = p.featured;
  const titleId = `feat-${p.slug}-title`;
  const title = (
    <Reveal as="h3" id={titleId}>
      {p.title}
    </Reveal>
  );
  const code = (
    <Reveal>
      <span aria-hidden>{f.code}</span>
    </Reveal>
  );
  const text = (
    <Reveal className="ft-text">
      {p.status && <StatusBadge status={p.status} />}
      <p>{p.summary}</p>
      <dl className="mono">
        <dt>Role</dt>
        <dd>{f.role}</dd>
        <dt>Stack</dt>
        <dd>{p.technologies.slice(0, 5).join(', ')}</dd>
        <dt>Outcome</dt>
        <dd>{f.outcome}</dd>
      </dl>
      <div className="btns">
        <a href={projectHash(p.slug)} className="btn" data-cursor="Read ↗" aria-label={`Read the ${p.title} case study`}>
          <span>Read case study</span>
          <span aria-hidden>→</span>
        </a>
        {p.links.map((l) => (
          <ProjectLink key={l.href} link={l} project={p.title} className="btn btn-ghost" short />
        ))}
      </div>
    </Reveal>
  );
  const [a, b] = f.figures;
  const figs = (
    <>
      <Figure fig={a} title={p.title} className="f-a" />
      <Figure fig={b} title={p.title} className="f-b" />
    </>
  );
  return (
    <article id={p.slug} className={`feat ${flip ? 'flip' : ''}`} aria-labelledby={titleId}>
      <div className="big-head sm">
        {flip ? code : title}
        {flip ? title : code}
      </div>
      <div className="bar thin" />
      <div className="g12 meta">
        <span className="c1-4">{p.no}</span>
        <span className={flip ? 'c9-11' : 'c5-8'}>{f.blurb}</span>
        <span className="c12 right">{p.platform}</span>
      </div>
      <div className="g12 body">
        {flip ? figs : text}
        {flip ? text : figs}
      </div>
    </article>
  );
}

export default function Featured() {
  return (
    <section id="featured" className="featured" aria-label="Featured case studies">
      <Rail />
      <div className="feat-list">
        {featuredProjects.map((p, i) => (
          <Article key={p.slug} p={p} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
