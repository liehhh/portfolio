"use client";

import { useRef, useState } from "react";
import { profile } from "@/content/portfolio";
import { fine, mouse, reducedMotion, useFrame } from "@/lib/motion";

/**
 * Magnetic glass orb. With an email configured it copies the address;
 * otherwise (the current source material lists none) it opens LinkedIn.
 */
export default function Orb() {
  const el = useRef<HTMLElement | null>(null);
  const m = useRef({ x: 0, y: 0 });
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useFrame(() => {
    const b = el.current;
    if (!b) return;
    const c = m.current;
    const on = fine() && !reducedMotion() && mouse.seen;
    if (!on && Math.abs(c.x) < 0.1 && Math.abs(c.y) < 0.1) return;
    const r = b.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const cx = r.left + r.width / 2 - c.x,
      cy = r.top + r.height / 2 - c.y;
    const dx = mouse.x - cx,
      dy = mouse.y - cy,
      near = on && Math.hypot(dx, dy) < r.width * 1.1;
    c.x += ((near ? dx * 0.4 : 0) - c.x) * 0.12;
    c.y += ((near ? dy * 0.4 : 0) - c.y) * 0.12;
    b.style.transform = `translate3d(${c.x}px,${c.y}px,0)`;
  });

  if (!profile.email) {
    return (
      <a
        ref={(n) => {
          el.current = n;
        }}
        className="orb"
        href={profile.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="Connect"
        aria-label="Connect on LinkedIn — opens in a new tab"
      >
        <span className="mono">Connect on</span>
        <b>LinkedIn ↗</b>
      </a>
    );
  }

  const email = profile.email;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2200);
  };
  return (
    <button
      ref={(n) => {
        el.current = n;
      }}
      type="button"
      className="orb"
      onClick={copy}
      data-cursor="Copy"
      aria-label={`Copy email address ${email}`}
    >
      <span className="mono" aria-live="polite">
        {state === "copied"
          ? "Copied ✓"
          : state === "failed"
          ? "Copy blocked — use Email link"
          : "Copy email"}
      </span>
      <b>
        {email.split("@")[0]}
        <wbr />@{email.split("@")[1]}
      </b>
    </button>
  );
}
