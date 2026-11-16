'use client';

import { useEffect } from 'react';

const PREFIX = '#/work/';

/**
 * Syncs the URL hash with the project dialogs:
 *  - `#/work/<slug>` opens that dialog (deep-linkable, Back button closes it),
 *  - closing a dialog (Esc, Close button, backdrop click) clears the hash.
 */
export default function DialogController() {
  useEffect(() => {
    const dialogs = Array.from(document.querySelectorAll<HTMLDialogElement>('dialog.pd'));
    let pushed = false; // whether the current hash came from in-page navigation

    const slugFromHash = () => (location.hash.startsWith(PREFIX) ? decodeURIComponent(location.hash.slice(PREFIX.length)) : null);
    const clearHash = () => history.replaceState(history.state, '', location.pathname + location.search);

    const sync = () => {
      const slug = slugFromHash();
      const target = slug ? dialogs.find((d) => d.dataset.slug === slug) : undefined;
      dialogs.forEach((d) => {
        if (d !== target && d.open) {
          d.dataset.silent = '1';
          d.close();
        }
      });
      if (target && !target.open) {
        target.showModal();
        target.scrollTop = 0;
      }
      if (slug && !target) clearHash();
    };

    const onHash = () => {
      pushed = !!slugFromHash();
      sync();
    };

    // Prev/next inside a dialog swap projects without stacking history entries.
    const onNav = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('.pd-nav a');
      if (!a) return;
      e.preventDefault();
      history.replaceState(history.state, '', a.getAttribute('href'));
      sync();
    };

    const onClose = (e: Event) => {
      const d = e.currentTarget as HTMLDialogElement;
      if (d.dataset.silent) {
        delete d.dataset.silent;
        return;
      }
      if (!slugFromHash()) return;
      // Prefer stepping back so the history stays clean; deep links just drop the hash.
      if (pushed) {
        pushed = false;
        history.back();
      } else clearHash();
    };

    // Clicking the backdrop (outside the panel) closes the dialog.
    const onClick = (e: MouseEvent) => {
      const d = e.currentTarget as HTMLDialogElement;
      if (e.target === d) d.close();
    };

    dialogs.forEach((d) => {
      d.addEventListener('close', onClose);
      d.addEventListener('click', onClick);
      d.addEventListener('click', onNav);
    });
    window.addEventListener('hashchange', onHash);
    sync();
    return () => {
      window.removeEventListener('hashchange', onHash);
      dialogs.forEach((d) => {
        d.removeEventListener('close', onClose);
        d.removeEventListener('click', onClick);
        d.removeEventListener('click', onNav);
      });
    };
  }, []);
  return null;
}
