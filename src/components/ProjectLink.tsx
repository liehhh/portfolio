import type { ExternalLink } from '@/content/portfolio';

/** External project link (demo / download / source). Downloads stay in the tab; pages open in a new one. */
export default function ProjectLink({ link, project, className, short }: { link: ExternalLink; project: string; className: string; short?: boolean }) {
  const dl = link.kind === 'download';
  const label = short ? link.label.replace('Download for ', '') : link.label;
  return (
    <a
      href={link.href}
      className={className}
      data-cursor={dl ? 'Download ↓' : 'Open ↗'}
      target={dl ? undefined : '_blank'}
      rel="noopener noreferrer"
      aria-label={`${project}: ${link.label}${link.note ? ` (${link.note})` : ''}${dl ? '' : ' — opens in a new tab'}`}
    >
      <span>{label}</span>
      {link.note && !short && <span className="mono btn-note">{link.note}</span>}
      <span aria-hidden>{dl ? '↓' : '↗'}</span>
    </a>
  );
}
