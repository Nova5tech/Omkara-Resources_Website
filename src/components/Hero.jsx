import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services } from '../data/companyData';

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-28">
        {/* Text */}
        <div>
          <p className="fade-up mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent-text">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Manpower · Construction · IT
          </p>

          <h1
            className="fade-up text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl lg:text-6xl"
            style={{ animationDelay: '0.08s' }}
          >
            <span className="block">Building People.</span>
            <span className="block">Building Structures.</span>
            <span className="block">Building Futures.</span>
          </h1>

          <p
            className="fade-up mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            style={{ animationDelay: '0.16s' }}
          >
            OMKARA RESOURCES brings together manpower solutions, civil construction expertise and
            IT services to support business growth and development.
          </p>

          <div
            className="fade-up mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: '0.24s' }}
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Explore Our Services <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-accent"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Visual panel: replace with real photos later if you wish */}
        <div
          className="fade-up bg-grid relative overflow-hidden rounded-3xl border border-line bg-surface p-5 sm:p-8"
          style={{ animationDelay: '0.2s' }}
          aria-label="Our three business divisions"
        >
          <div className="flex flex-col gap-4">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.id}
                  className={`float-slow flex items-center gap-4 rounded-2xl border border-line bg-page p-4 shadow-sm sm:p-5 ${
                    i === 1 ? 'lg:ml-10' : i === 2 ? 'lg:ml-20' : ''
                  }`}
                  style={{ animationDelay: `${i * 0.8}s` }}
                >
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-on-accent">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-lg font-bold text-ink">{s.title}</p>
                    <p className="text-sm text-muted">{s.categories.slice(0, 2).join(' · ')}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}