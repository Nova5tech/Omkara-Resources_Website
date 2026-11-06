import usePageMeta from '../hooks/usePageMeta';

export default function PhasePlaceholder({ eyebrow, title, description, phase }) {
  usePageMeta(title, description);

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent-text">
        <span className="h-px w-8 bg-accent" aria-hidden="true" />
        {eyebrow}
      </p>
      <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] text-ink sm:text-6xl">
        {title}
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{description}</p>
      <p className="mt-10 inline-block rounded-full border border-line bg-surface px-4 py-2 text-sm text-muted">
        This page is built in {phase}.
      </p>
    </section>
  );
}