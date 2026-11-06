import { Link } from 'react-router-dom';
import { company } from '../data/companyData';

export default function Brand({ size = 'md', onClick }) {
  const box = size === 'lg' ? 'h-14 w-14' : 'h-11 w-11';

  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="OMKARA RESOURCES – Home"
      className="flex min-w-0 items-center gap-3"
    >
      {/* Cropped view of the ORIGINAL logo file (not stretched). */}
      <span
        className={`relative shrink-0 overflow-hidden rounded-xl bg-[#f1f3f4] ring-1 ring-line ${box}`}
      >
        <img
          src={company.logo}
          alt="OMKARA RESOURCES logo"
          width="1024"
          height="683"
          className="absolute max-w-none select-none"
          style={{ width: '359%', left: '-47.4%', top: '-57.9%' }}
          draggable="false"
        />
      </span>

      <span className="min-w-0 leading-tight">
        <span className="block truncate font-display text-lg font-extrabold tracking-tight text-ink sm:text-xl">
          OMKARA <span className="text-accent-text">RESOURCES</span>
        </span>
         <span className="hidden truncate text-[10px] font-medium tracking-wide text-muted min-[480px]:block lg:hidden xl:block sm:text-[11px]">
          {company.tagline}
        </span>
      </span>
    </Link>
  );
}