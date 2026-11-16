/** Small mono pill for a project's release status (e.g. "On TestFlight"). Not a link. */
export default function StatusBadge({ status, className = '' }: { status: string; className?: string }) {
  return (
    <span className={`badge mono ${className}`}>
      <i aria-hidden />
      {status}
    </span>
  );
}
