import type { Metadata } from 'next';
import { siteUrl, siteName } from '@/app/metadata';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with The Beloved Love Initiative. We would love to hear from you — whether you have a question, a story to share, or want to connect.',
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: `Contact | ${siteName}`,
    description: "Reach out to The Beloved Love Initiative. We are a community-driven foundation — let's walk this journey together.",
    url: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-bg pt-36 pb-20 px-6 text-center">
        <p className="font-lato text-xs tracking-[0.3em] uppercase text-[#b8960c] mb-3">Reach Out</p>
        <h1 className="font-cormorant italic text-5xl md:text-6xl text-[#2e3328] mb-4">Contact Us</h1>
        <div className="section-divider mb-6" />
        <p className="font-lato text-base text-[#4a5240] max-w-xl mx-auto leading-relaxed">
          We&apos;d love to hear from you. Whether you have a question, a story to share, or want to connect — reach out.
        </p>
      </section>

      {/* Contact Form + Info */}
      <section className="bg-[#f5f0e8] py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <ContactForm />

          {/* Info */}
          <div className="flex flex-col gap-8 justify-center">
            <div>
              <h3 className="font-playfair text-xl text-[#2e3328] mb-3">Connect With Us</h3>
              <p className="font-lato text-sm text-[#6a6a5a] leading-relaxed">
                We are a community-driven initiative. Reach out and let&apos;s walk this journey together.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="text-xl">✉️</span>
                <span className="font-lato text-sm text-[#4a5240]">hello@thebelovedlove.org</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xl">📍</span>
                <span className="font-lato text-sm text-[#4a5240]">Nigeria</span>
              </div>
            </div>

            <div>
              <p className="font-lato text-xs tracking-[0.2em] uppercase text-[#b8960c] mb-4">Follow Us</p>
              <div className="flex gap-5">
                <a href="#" aria-label="Facebook" className="text-[#4a5240] hover:text-[#b8960c] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" className="text-[#4a5240] hover:text-[#b8960c] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                </a>
                <a href="#" aria-label="Twitter" className="text-[#4a5240] hover:text-[#b8960c] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
