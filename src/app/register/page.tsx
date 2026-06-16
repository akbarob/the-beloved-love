import type { Metadata } from 'next';
import { siteUrl, siteName } from '@/app/metadata';
import RegistrationForm from './RegistrationForm';

export const metadata: Metadata = {
  title: 'Register — Bible Reading Marathon',
  description:
    'Register for the Guinness World Record Attempt for the World\'s Longest Bible Reading Marathon, hosted by The Beloved Love Initiative.',
  alternates: { canonical: `${siteUrl}/register` },
  openGraph: {
    title: `Register | ${siteName}`,
    description:
      'Secure your spot for the Guinness World Record Attempt — World\'s Longest Bible Reading Marathon.',
    url: `${siteUrl}/register`,
  },
};

export default function RegisterPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-bg pt-36 pb-20 px-6 text-center">
        <p className="font-lato text-xs tracking-[0.3em] uppercase text-[#b8960c] mb-3">
          Guinness World Record Attempt
        </p>
        <h1 className="font-cormorant italic text-5xl md:text-6xl text-[#2e3328] mb-4">
          Register
        </h1>
        <div className="section-divider mb-6" />
        <p className="font-lato text-base text-[#4a5240] max-w-2xl mx-auto leading-relaxed">
          World&apos;s Longest Bible Reading Marathon — complete this form to secure your place.
          The information you provide will be used for participant scheduling, invitation creation,
          event communication, and Guinness World Record documentation.
        </p>
      </section>

      {/* Form */}
      <section className="bg-[#f5f0e8] py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <RegistrationForm />
        </div>
      </section>
    </>
  );
}
