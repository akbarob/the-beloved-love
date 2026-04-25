'use client';

import Link from 'next/link';
import { useState } from 'react';

function CrownIcon() {
  return (
    <svg width="24" height="18" viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-0.5">
      <path d="M2 22 L6 8 L12 16 L18 2 L24 16 L30 8 L34 22 Z" fill="#d4af37" stroke="#b8960c" strokeWidth="0.8" strokeLinejoin="round" />
      <rect x="2" y="22" width="32" height="3" rx="1.5" fill="#d4af37" stroke="#b8960c" strokeWidth="0.5" />
      <circle cx="18" cy="5" r="1.8" fill="#fff8e7" />
      <circle cx="6.5" cy="10" r="1.4" fill="#fff8e7" />
      <circle cx="29.5" cy="10" r="1.4" fill="#fff8e7" />
    </svg>
  );
}

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
    <nav className="sticky top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between  bg-transparent backdrop-blur-sm shadow-sm">
      <Link href="/" className="flex flex-col items-center">
        <CrownIcon />
        <span className="font-playfair text-2xl font-bold tracking-widest text-[#2e3328]">TBL</span>
        <span className="font-lato text-[9px] tracking-[0.25em] uppercase text-[#4a5240]">The Beloved Love</span>
        <span className="font-lato text-[9px] tracking-[0.25em] uppercase text-[#4a5240]">initiative</span>
      </Link>

      {/* Desktop */}
      {/* <ul className="hidden md:flex gap-8">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="font-lato text-sm tracking-widest uppercase text-[#2e3328] hover:text-[#b8960c] transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul> */}

      {/* Mobile toggle */}
      {/* <button className="md:hidden text-[#2e3328]" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open
            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button> */}

      {/* {open && (
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
      )} */}
    </nav>
  );
}
