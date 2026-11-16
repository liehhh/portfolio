import { capabilities, contact, contactLinks, experience, profile, site } from '@/content/portfolio';
import Orb from './Orb';
import Reveal from './Reveal';

export function Capabilities() {
  return (
    <section id="capabilities" className="caps" aria-labelledby="caps-title">
      <div className="g12 caps-head">
        <div className="mono c1-2">
          (4)
          <br />
          Capabilities
        </div>
        <Reveal as="h2" id="caps-title" className="c3-12">
          Three disciplines, <em>one</em> system.
        </Reveal>
      </div>
      <ul className="cap-grid">
        {capabilities.map((c) => (
          <li className="cap" key={c.n} data-cursor={c.n}>
            <div className="mono cap-top" aria-hidden>
              <span>{c.tag}</span>
              <span>{c.dir}</span>
            </div>
            <div className="cap-n" aria-hidden>
              {c.n}
            </div>
            <div>
              <h3>{c.title}</h3>
              <ul className="mono">
                {c.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Experience() {
  const doc = profile.resumeUrl
    ? { href: profile.resumeUrl, label: 'Résumé (PDF) ↗', cursor: 'PDF ↓' }
    : { href: profile.linkedin, label: 'Full profile — LinkedIn ↗', cursor: 'Open ↗' };
  return (
    <section id="experience" className="exp" aria-labelledby="exp-title">
      <div className="exp-head">
        <h2 className="mono" id="exp-title">
          (5)
          <br />
          Experience
        </h2>
        <a className="mono ul" href={doc.href} target="_blank" rel="noopener noreferrer" data-cursor={doc.cursor}>
          {doc.label}
        </a>
      </div>
      {experience.map((e) => {
        const cells = (
          <>
            <span className="mono">{e.when}</span>
            <span>{e.org}</span>
            <em>{e.role}</em>
            <span className="mono right">
              {e.tag}
              {e.details && (
                <b className="exp-plus" aria-hidden>
                  +
                </b>
              )}
            </span>
          </>
        );
        return e.details ? (
          <details className="exp-item" key={e.org}>
            <summary className="exp-row" data-cursor="Details">
              {cells}
            </summary>
            <ul className="exp-more">
              {e.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </details>
        ) : (
          <div className="exp-row" key={e.org}>
            {cells}
          </div>
        );
      })}
    </section>
  );
}

export function Contact() {
  const links = contactLinks();
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="g12">
        <h2 className="mono c1-2" id="contact-title">
          (6)
          <br />
          Contact
        </h2>
        <p className="lede c3-7">{contact.lede}</p>
      </div>
      <div className="cta">
        <Reveal className="w1">
          <span aria-hidden>Let&apos;s</span>
        </Reveal>
        <Reveal className="w2">
          <span aria-hidden>Build</span>
        </Reveal>
        <Reveal className="w3">
          <span aria-hidden>something.</span>
        </Reveal>
        <span className="sr-only">Let&apos;s build something.</span>
        <Orb />
      </div>
      <ul className="links">
        {links.map((l) => {
          const dl = l.kind === 'download';
          const mail = l.href.startsWith('mailto:');
          return (
            <li key={l.href}>
              <a
                href={l.href}
                target={dl || mail ? undefined : '_blank'}
                rel="noopener noreferrer"
                data-cursor={dl ? 'Download ↓' : mail ? 'Mail ↗' : l.label}
                aria-label={`${l.label}${l.note ? ` (${l.note})` : ''}${dl || mail ? '' : ' — opens in a new tab'}`}
              >
                <span>
                  {mail ? (
                    <>
                      {l.label.split('@')[0]}
                      <wbr />@{l.label.split('@')[1]}
                    </>
                  ) : (
                    l.label
                  )}
                </span>
                <span aria-hidden>{dl ? '↓' : '↗'}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <footer className="mono">
        <span>
          © {new Date().getFullYear()} {profile.name.toUpperCase()}
        </span>
        <span>Designed &amp; engineered in Next.js + TypeScript</span>
        <span>
          {site.volume} / Issue ({site.year})
        </span>
        <a href="#top" className="ul" data-cursor="Top ↑">
          Back to top ↑
        </a>
      </footer>
    </section>
  );
}
