import type { Metadata } from 'next';
import CheckInClient from './CheckInClient';
import ExportButton from './ExportButton';

export const metadata: Metadata = {
  title: 'Staff Check-In | 144Hours Mandate',
  robots: { index: false, follow: false },
};

export default function CheckInPage() {
  return (
    <section className="min-h-screen bg-[#2e3328] flex flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-lato text-[10px] tracking-[0.4em] uppercase text-[#d4af37] mb-2">
            Staff Portal
          </p>
          <h1 className="font-cormorant italic text-3xl text-[#f5f0e8] mb-1">
            Event Check-In
          </h1>
          <p className="font-lato text-xs text-[#9a9a8a] tracking-wide">
            144Hours Mandate · Guinness World Record
          </p>
          <div className="w-8 h-px bg-[#d4af37]/50 mx-auto mt-4" />
        </div>

        <CheckInClient />

        {/* Export */}
        <div className="mt-10 pt-8 border-t border-[#ffffff10]">
          <p className="font-lato text-[10px] tracking-[0.3em] uppercase text-[#6a6a7a] text-center mb-4">
            Export Registrations
          </p>
          <ExportButton />
        </div>
      </div>
    </section>
  );
}
