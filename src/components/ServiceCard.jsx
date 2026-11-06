import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const buttonClass =
  'inline-flex items-center gap-2 text-sm font-semibold text-accent-text transition group-hover:gap-3';

export default function ServiceCard({ service, onSelect }) {
  const Icon = service.icon;

  return (
    <article
      onClick={onSelect ? () => onSelect(service) : undefined}
      className={`group theme-smooth flex h-full flex-col rounded-3xl border border-line bg-surface p-7 transition duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-xl ${
        onSelect ? 'cursor-pointer' : ''
      }`}
    >
      <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-on-accent">
        <Icon size={28} aria-hidden="true" />
      </span>

      <h3 className="text-2xl font-bold text-ink">{service.title}</h3>
      <p className="mt-3 flex-1 text-base leading-relaxed text-muted">{service.short}</p>

      <div className="mt-6">
        {onSelect ? (
          <button type="button" onClick={() => onSelect(service)} className={buttonClass}>
            View Details <ArrowRight size={16} aria-hidden="true" />
          </button>
        ) : (
          <Link to="/services" className={buttonClass}>
            View Details <ArrowRight size={16} aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}