import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Target,
  Eye,
  ShieldCheck,
  Briefcase,
  Award,
  Handshake,
  Smile,
  TrendingUp,
  Layers,
  HeartHandshake,
  Puzzle,
  Check,
} from 'lucide-react';
import usePageMeta from '../hooks/usePageMeta';
import SectionHeading from '../components/SectionHeading';
import { services } from '../data/companyData';

/* ---------------------------------------------------------------
   EDITABLE CONTENT: change the wording here, not in the layout.
   --------------------------------------------------------------- */

const mission =
  'To deliver useful, dependable business solutions through manpower, civil construction and technology services, helping our clients meet their operational and project goals.';

const vision =
  'To grow steadily as a trusted business partner, known for quality work, professional conduct and long-term relationships built on customer trust.';

const coreValues = [
  { icon: ShieldCheck, title: 'Integrity', text: 'Honest, transparent dealings with clients, partners and people.' },
  { icon: Briefcase, title: 'Professionalism', text: 'A responsible, courteous and well-organised way of working.' },
  { icon: Award, title: 'Quality', text: 'Careful attention to the standard of everything we deliver.' },
  { icon: Handshake, title: 'Reliability', text: 'Doing what we say we will do, and doing it on time.' },
  { icon: Smile, title: 'Customer Satisfaction', text: 'Listening first, so our solutions fit what you actually need.' },
  { icon: TrendingUp, title: 'Continuous Improvement', text: 'Learning from every engagement and raising our standards.' },
];

/* "image" is optional. To use a real photo, put the file in
   public/images/ and set, for example:  image: '/images/manpower.jpg'
   Leave it as null to show the designed panel instead. */
const divisionDetails = {
  manpower: {
    image: null,
    imageAlt: 'Workforce and manpower services',
    text: 'We help organisations meet their staffing and operational needs by providing manpower support and recruitment assistance.',
  },
  civil: {
    image: null,
    imageAlt: 'Civil construction and infrastructure work',
    text: 'We support construction and infrastructure projects with planning and professional execution.',
  },
  it: {
    image: null,
    imageAlt: 'IT and technology services',
    text: 'We provide technology services that help businesses run and grow their digital operations.',
  },
};

const whyPoints = [
  {
    icon: Layers,
    title: 'Three capabilities, one partner',
    text: 'Staffing, construction and technology needs can be discussed with a single organisation.',
  },
  {
    icon: Puzzle,
    title: 'Joined-up solutions',
    text: 'Because our divisions work together, projects can be supported from several angles.',
  },
  {
    icon: HeartHandshake,
    title: 'Client-first thinking',
    text: 'We begin with your requirements and shape our services around them.',
  },
];

/* ---------------------------------------------------------------
   PAGE
   --------------------------------------------------------------- */

export default function About() {
  usePageMeta(
    'About Us',
    'Learn about OMKARA RESOURCES: our mission, vision, core values and our three business divisions: manpower supplies, civil constructions and IT services.'
  );

  return (
    <>
      {/* Page header */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent-text">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            About Us
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            About OMKARA RESOURCES
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Manpower, civil construction and IT services, brought together to support business
            growth and development.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading eyebrow="Our company" title="Who We Are" />
          <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              OMKARA RESOURCES is a multi-division business serving organisations through three
              areas of work: <strong className="text-ink">Manpower Supplies</strong>,{' '}
              <strong className="text-ink">Civil Constructions</strong> and{' '}
              <strong className="text-ink">IT Services</strong>.
            </p>
            <p>
              Our tagline, <em className="not-italic text-ink">Building People, Building
              Structures, Building Futures</em>, reflects how these divisions fit together: we
              support the people behind a business, the structures it relies on and the technology
              that carries it forward.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-y border-line bg-surface py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {[
            { icon: Target, label: 'Our Mission', text: mission },
            { icon: Eye, label: 'Our Vision', text: vision },
          ].map(({ icon: Icon, label, text }) => (
            <article
              key={label}
              className="theme-smooth rounded-3xl border border-line bg-page p-8 transition hover:border-accent sm:p-10"
            >
              <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-on-accent">
                <Icon size={28} aria-hidden="true" />
              </span>
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{label}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="What guides us"
          title="Our Core Values"
          description="The principles behind how we work with clients and with each other."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="theme-smooth rounded-2xl border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-md"
            >
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-page text-accent-text">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3 className="text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Business Divisions */}
      <section className="border-y border-line bg-surface py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What we do"
            title="Our Business Divisions"
            description="Three divisions that work independently or together, depending on what you need."
          />

          <div className="mt-14 space-y-8">
            {services.map((s, i) => {
              const Icon = s.icon;
              const detail = divisionDetails[s.id];
              const flip = i % 2 === 1;

              return (
                <article
                  key={s.id}
                  className="theme-smooth grid overflow-hidden rounded-3xl border border-line bg-page lg:grid-cols-2"
                >
                  {/* Visual: real photo if provided, otherwise a designed panel */}
                  <div
                    className={`relative min-h-[220px] ${flip ? 'lg:order-2' : ''} ${
                      detail.image ? '' : 'bg-grid'
                    }`}
                  >
                    {detail.image ? (
                      <img
                        src={detail.image}
                        alt={detail.imageAlt}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full min-h-[220px] items-center justify-center p-8">
                        <span className="inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-accent text-on-accent shadow-lg">
                          <Icon size={48} aria-hidden="true" />
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Text */}
                  <div className="p-7 sm:p-10">
                    <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent-text">
                      Division 0{i + 1}
                    </p>
                    <h3 className="text-2xl font-extrabold text-ink sm:text-3xl">{s.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-muted">{detail.text}</p>

                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {s.categories.slice(0, 4).map((c) => (
                        <li key={c} className="flex items-start gap-2 text-sm text-ink">
                          <Check
                            size={16}
                            className="mt-0.5 shrink-0 text-accent-text"
                            aria-hidden="true"
                          />
                          {c}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/services"
                      className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent-text transition hover:gap-3"
                    >
                      View Services <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose OMKARA RESOURCES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Our approach"
          title="Why Choose OMKARA RESOURCES?"
          description="An integrated approach: one organisation that can support your people, your projects and your technology."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {whyPoints.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="theme-smooth rounded-2xl border border-line bg-surface p-6 transition hover:border-accent"
            >
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-on-accent">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3 className="text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing call to action */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
        <div className="rounded-3xl bg-accent px-6 py-14 text-center text-on-accent sm:px-12 sm:py-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
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