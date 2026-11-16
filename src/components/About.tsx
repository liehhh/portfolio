import { about } from '@/content/portfolio';
import FillText from './FillText';
import Reveal from './Reveal';

export default function About() {
  return (
    <section id="about" className="about g12" aria-labelledby="about-label">
      <Reveal className="mono c1-2">
        (2)
        <br />
        <span id="about-label">About</span>
        <br />
        S/02
      </Reveal>
      <FillText className="about-text c3-12">
        {about.statement.lead}
        <em>{about.statement.em}</em>
        {about.statement.rest}
      </FillText>
      <div className="about-notes c3-12">
        {about.notes.map((n, i) => (
          <Reveal as="p" key={n.label}>
            ({i + 1}) {n.label} — {n.text}
          </Reveal>
        ))}
      </div>
      <ul className="about-how c3-12 mono" aria-label="How I work">
        {about.principles.map((t, i) => (
          <li key={i}>
            <span aria-hidden>({String.fromCharCode(65 + i)})</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
