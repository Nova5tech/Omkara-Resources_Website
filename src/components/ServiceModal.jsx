import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, ArrowRight } from 'lucide-react';

const EXIT_MS = 200; // must match the exit animation length in index.css

export default function ServiceModal({ service, onClose, onEnquire }) {
  const [closing, setClosing] = useState(false);
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);
  const closeTimer = useRef(null);
  const closingRef = useRef(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const Icon = service.icon;

  // Play the exit animation, then tell the parent to remove the modal
  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    closeTimer.current = setTimeout(() => onCloseRef.current(), EXIT_MS);
  }, []);

  // Lock background scrolling while open, restore it afterwards
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
    };
  }, []);

  // Keyboard: Escape closes, Tab stays inside the modal; focus is restored on close
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeBtnRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        requestClose();
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        const nodes = panelRef.current.querySelectorAll('a[href], button:not([disabled])');
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      clearTimeout(closeTimer.current);
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, [requestClose]);

  // Click on the dark overlay (but not inside the panel) closes the modal
  const handleOverlayMouseDown = (e) => {
    if (e.target === e.currentTarget) requestClose();
  };

  return createPortal(
    <div
      data-closing={closing}
      onMouseDown={handleOverlayMouseDown}
      className="modal-overlay fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-3 backdrop-blur-sm sm:items-center sm:p-6"
    >
      <div
        ref={panelRef}
        data-closing={closing}
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
        className="modal-panel relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start gap-4 border-b border-line p-5 sm:p-7">
          <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-on-accent">
            <Icon size={28} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-xs uppercase tracking-widest text-accent-text">
              Our Services
            </p>
            <h2
              id="service-modal-title"
              className="mt-1 text-2xl font-extrabold leading-tight text-ink sm:text-3xl"
            >
              {service.title}
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={requestClose}
            aria-label="Close dialog"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-page text-ink transition hover:border-accent hover:text-accent-text"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          <p className="text-base leading-relaxed text-muted">{service.description}</p>

          <h3 className="mt-7 text-lg font-bold text-ink">Service Offerings</h3>
          <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {service.categories.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 rounded-xl border border-line bg-page px-3.5 py-2.5 text-sm text-ink"
              >
                <Check size={16} className="mt-0.5 shrink-0 text-accent-text" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <h3 className="mt-7 text-lg font-bold text-ink">Key Benefits</h3>
          <ul className="mt-3 space-y-2.5">
            {service.benefits.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-line p-5 sm:flex-row sm:justify-end sm:p-6">
          <button
            type="button"
            onClick={requestClose}
            className="inline-flex items-center justify-center rounded-full border border-line bg-page px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onEnquire(service)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Enquire Now <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}