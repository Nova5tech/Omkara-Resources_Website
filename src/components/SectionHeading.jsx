export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
    const alignment = align === 'center' ? 'mx-auto text-center' : '';
    const eyebrowAlign = align === 'center' ? 'justify-center' : '';
  
    return (
      <div className={`max-w-2xl ${alignment}`}>
        {eyebrow && (
          <p
            className={`mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent-text ${eyebrowAlign}`}
          >
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{description}</p>
        )}
      </div>
    );
  }