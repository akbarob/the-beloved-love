'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const links = [
  { href: '/about', label: 'About' },
  { href: '/programs', label: 'Programs' },
  { href: '/get-involved', label: 'Get Involved' },
  // { href: '/donate', label: 'Donate' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 px-6 md:px-10 py-3 flex items-center justify-between bg-[#f5f0e8]/90 backdrop-blur-sm shadow-sm">
      {/* Logo */}
      <Link href="/" aria-label="The Beloved Love Initiative — Home">
        <Image
          src="/logo-nav.svg"
          alt="The Beloved Love Initiative"
          width={80}
          height={54}
          priority
          className="h-14 w-auto"
        />
      </Link>

      {/* Desktop nav */}
      <ul className="hidden md:flex gap-8">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="font-lato text-xs tracking-widest uppercase text-[#2e3328] hover:text-[#b8960c] transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile toggle */}
      <button
        className="md:hidden text-[#2e3328]"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open
            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-[#f5f0e8] shadow-md md:hidden">
          <ul className="flex flex-col py-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-3 font-lato text-sm tracking-widest uppercase text-[#2e3328] hover:text-[#b8960c]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
