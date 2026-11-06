import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import Brand from './Brand';
import ThemeToggle from './ThemeToggle';
import { navLinks, company } from '../data/companyData';

const linkClass = ({ isActive }) =>
  `rounded-full border px-4 py-2 text-sm font-medium transition ${
    isActive
      ? 'border-line bg-surface text-ink'
      : 'border-transparent text-muted hover:text-ink'
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu whenever the page changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="theme-smooth sticky top-0 z-40 border-b border-line bg-page/85 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Brand />

        {/* Desktop navigation */}
        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            to="/contact"
            className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition hover:-translate-y-0.5 hover:shadow-lg xl:inline-flex"
          >
            Get In Touch <ArrowRight size={16} aria-hidden="true" />
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink lg:hidden"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="menu-enter border-t border-line bg-page lg:hidden">
          <nav
            aria-label="Mobile navigation"
            className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
          >
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-base font-medium transition ${
                    isActive ? 'bg-surface text-ink ring-1 ring-line' : 'text-muted hover:text-ink'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-on-accent"
            >
              Get In Touch <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <p className="px-4 pt-3 text-xs text-muted">{company.tagline}</p>
          </nav>
        </div>
      )}
    </header>
  );
}