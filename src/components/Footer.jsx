import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Brand from './Brand';
import { company, navLinks, services } from '../data/companyData';

export default function Footer() {
  const { contact, socials } = company;

  return (
    <footer id="site-footer" className="theme-smooth border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <Brand />
          <p className="max-w-xs text-sm leading-relaxed text-muted">{company.tagline}</p>

          {socials.length > 0 && (
            <ul className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted underline-offset-4 hover:text-accent-text hover:underline"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-accent-text">
            Quick Links
          </h2>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted transition hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-accent-text">
            Our Divisions
          </h2>
          <ul className="space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <Link to="/services" className="text-muted transition hover:text-ink">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-accent-text">
            Contact
          </h2>
          <ul className="space-y-3 text-sm text-muted">
            <li className="flex gap-3"><Phone size={16} className="mt-0.5 shrink-0" aria-hidden="true" />{contact.phone}</li>
            <li className="flex gap-3"><Mail size={16} className="mt-0.5 shrink-0" aria-hidden="true" />{contact.email}</li>
            <li className="flex gap-3"><MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />{contact.address}</li>
            <li className="flex gap-3"><Clock size={16} className="mt-0.5 shrink-0" aria-hidden="true" />{contact.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-muted sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}