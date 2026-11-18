/**
 * Small mono pill. `status` — release/availability status (e.g. "On TestFlight"), accent dot.
 * `org` — professional context ("Built at eToro"), square marker, set apart from independent work. Not a link.
 */
export default function StatusBadge({ status, org, className = '' }: { status?: string; org?: string; className?: string }) {
  const isOrg = !status && !!org;
  return (
    <span className={`badge mono ${isOrg ? 'badge-org' : ''} ${className}`}>
      <i aria-hidden />
      {isOrg ? `Built at ${org}` : status}
    </span>
  );
}
