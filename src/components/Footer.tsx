import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#2e3328] text-[#c8c4b8] py-10 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        {/* Logo */}
        <Link href="/" aria-label="The Beloved Love Initiative">
          <Image
            src="/logo.svg"
            alt="The Beloved Love Initiative"
            width={180}
            height={90}
            className="h-16 w-auto opacity-80 hover:opacity-100 transition-opacity brightness-0 invert"
          />
        </Link>
        {/* Social icons */}
        <div className="flex gap-6">
          {/* <a href="#" aria-label="Facebook" className="hover:text-[#d4af37] transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a> */}
          <a href="https://www.instagram.com/tblinitiative" aria-label="Instagram" className="hover:text-[#d4af37] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-[#d4af37] transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center gap-4 text-xs tracking-widest uppercase">
          {[
            { href: '/about', label: 'About' },
            { href: '/programs', label: 'Programs' },
            { href: '/get-involved', label: 'Get Involved' },
            // { href: '/donate', label: 'Donate' },
            { href: '/contact', label: 'Contact' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[#d4af37] transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-[#7a7a6a] tracking-wide">
          © {new Date().getFullYear()} The Beloved Love initiative. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
