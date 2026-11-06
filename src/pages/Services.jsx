import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import usePageMeta from '../hooks/usePageMeta';
import ServiceCard from '../components/ServiceCard';
import ServiceModal from '../components/ServiceModal';
import { services } from '../data/companyData';

export default function Services() {
  usePageMeta(
    'Services',
    'Explore the services of OMKARA RESOURCES: manpower supplies, civil constructions and IT services.'
  );

  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  // Go to Contact Us and pass the chosen service (Phase 5 uses it to prefill the form)
  const handleEnquire = (service) => {
    navigate('/contact', { state: { service: service.title } });
  };

  return (
    <>
      {/* Page header */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent-text">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Services
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            Our Services
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Three business divisions: Manpower Supplies, Civil Constructions and IT Services. Select
            a service to see what it includes.
          </p>
        </div>
      </section>

      {/* Service cards */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} onSelect={setSelected} />
          ))}
        </div>
      </section>

      {/* Enquiry call to action */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
        <div className="theme-smooth flex flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-surface p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
              Not sure which service you need?
            </h2>
            <p className="mt-2 max-w-xl text-base text-muted">
              Tell us about your requirements and we will point you in the right direction.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Contact Us <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Popup modal (rendered only when a service is selected) */}
      {selected && (
        <ServiceModal
          service={selected}
          onClose={() => setSelected(null)}
          onEnquire={handleEnquire}
        />
      )}
    </>
  );
}