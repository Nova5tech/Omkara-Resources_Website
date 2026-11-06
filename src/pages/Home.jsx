import { Link } from 'react-router-dom';
import { ArrowRight, Layers, HeartHandshake, Briefcase, BadgeCheck, Puzzle } from 'lucide-react';
import usePageMeta from '../hooks/usePageMeta';
import Hero from '../components/Hero';
import HomeOverview from '../components/HomeOverview';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/companyData';

// Editable: qualitative points only (no invented numbers or achievements).
const whyChooseUs = [
  {
    icon: Layers,
    title: 'Multiple Business Capabilities',
    text: 'Manpower, civil construction and IT services under one organisation.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer-Focused Approach',
    text: 'We start by understanding your requirements before recommending a solution.',
  },
  {
    icon: Briefcase,
    title: 'Professional Service Delivery',
    text: 'Clear communication and a structured approach to every engagement.',
  },
  {
    icon: BadgeCheck,
    title: 'Commitment to Quality',
    text: 'Quality is treated as a standard, not an afterthought.',
  },
  {
    icon: Puzzle,
    title: 'Integrated Business Solutions',
    text: 'Our divisions work together, so one partner can support several needs.',
  },
];

export default function Home() {
  usePageMeta(
    'Home',
    'OMKARA RESOURCES offers manpower supplies, civil constructions and IT services. Building People | Building Structures | Building Futures.'
  );

  return (
    <>
      <Hero />

      {/* Overview container */}
      <HomeOverview />

      {/* Who We Are */}
      <section
        id="who-we-are"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="About us" title="Who We Are" />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              OMKARA RESOURCES is a multi-division business serving organisations through three
              areas of work: <strong className="text-ink">Manpower Supplies</strong>,{' '}
              <strong className="text-ink">Civil Constructions</strong> and{' '}
              <strong className="text-ink">IT Services</strong>. Together, they let us support
              people, projects and technology needs in a single, connected approach.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-accent"
            >
              Learn More <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <li
                  key={s.id}
                  className="theme-smooth flex items-center gap-4 rounded-2xl border border-line bg-surface p-5"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-on-accent">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="font-display text-lg font-bold text-ink">{s.title}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Our Services */}
      <section
        id="our-services"
        className="scroll-mt-20 border-y border-line bg-surface py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What we do"
            title="Our Services"
            description="Three divisions, one commitment: practical solutions for your business."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        id="why-choose-us"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <SectionHeading eyebrow="Our approach" title="Why Choose Us?" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="theme-smooth rounded-2xl border border-line bg-surface p-6 transition hover:border-accent"
              >
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-page text-accent-text">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call To Action */}
      <section
        id="get-in-touch"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24"
      >
        <div className="rounded-3xl bg-accent px-6 py-14 text-center text-on-accent sm:px-12 sm:py-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Let&rsquo;s Build Something Together.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base opacity-90 sm:text-lg">
            Connect with OMKARA RESOURCES to discuss your business requirements.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-on-accent px-7 py-3.5 text-sm font-semibold text-accent transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Get In Touch <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}