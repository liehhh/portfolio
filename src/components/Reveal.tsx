'use client';

import { ReactNode, useEffect, useRef } from 'react';

interface Props {
  as?: 'div' | 'p' | 'h2' | 'h3' | 'span' | 'li';
  className?: string;
  id?: string;
  children?: ReactNode;
}

/** Fades/slides its content in once it enters the viewport (instant under reduced motion — see CSS). */
export default function Reveal({ as = 'div', className = '', id, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('in');
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  // Rendered as the requested tag; typed as div because all variants share HTMLElement behaviour here.
  const Tag = as as 'div';
  return (
    <Tag ref={ref} id={id} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
