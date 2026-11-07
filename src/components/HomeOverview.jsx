import { ArrowDown, Users, Layers, ListChecks, Handshake, MapPin } from 'lucide-react';

// Editable: each "href" must match a section id on the Home page.
const overviewItems = [
  { icon: Users, title: 'Who We Are', text: 'Our company and three divisions', href: '#who-we-are' },
  { icon: Layers, title: 'Our Services', text: 'Manpower, Civil, IT', href: '#our-services' },
  { icon: ListChecks, title: 'Why Choose Us', text: 'What sets our approach apart', href: '#why-choose-us' },
  { icon: Handshake, title: 'Work With Us', text: 'Start a conversation', href: '#get-in-touch' },
  { icon: MapPin, title: 'Contact Details', text: 'Find us in the footer', href: '#site-footer' },
];

export default function HomeOverview() {
  return (
    <section
      aria-labelledby="overview-heading"
      className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8"
    >
      <div className="theme-smooth rounded-3xl border border-line bg-surface p-6 sm:p-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-2 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent-text">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              Overview
            </p>
            <h2 id="overview-heading" className="text-2xl font-extrabold text-ink sm:text-3xl">
              Home at a Glance
            </h2>
          </div>
          <p className="text-sm text-muted">Tap a section to jump straight to it.</p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {overviewItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-page p-4 transition hover:-translate-y-1 hover:border-accent hover:shadow-md"
                >
                  <div className="mb-3 flex items-center justify-between">  
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-on-accent">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </div>
                  <p className="font-display text-base font-bold text-ink">{item.title}</p>
                  <p className="mt-1 flex-1 text-sm text-muted">{item.text}</p>
                  <ArrowDown
                    size={16}
                    aria-hidden="true"
                    className="mt-3 text-accent-text transition group-hover:translate-y-1"
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}