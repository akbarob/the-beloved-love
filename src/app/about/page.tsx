import type { Metadata } from 'next';
import Link from 'next/link';
import { siteUrl, siteName } from '@/app/metadata';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about The Beloved Love Initiative — a movement helping individuals rediscover who they are in God and walk boldly into their purpose. Founded by Habibat Salawudeen.',
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: `About Us | ${siteName}`,
    description:
      'Helping individuals rediscover who they are in God and walk boldly into their purpose. Learn about our mission, vision, and the story behind TBLI.',
    url: `${siteUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-bg pt-36 pb-20 px-6 text-center">
        <p className="font-lato text-xs tracking-[0.3em] uppercase text-[#b8960c] mb-3">Our Story</p>
        <h1 className="font-cormorant italic text-5xl md:text-6xl text-[#2e3328] mb-4">About Us</h1>
        <div className="section-divider mb-6" />
        <p className="font-cormorant text-xl text-[#4a5240] max-w-2xl mx-auto leading-relaxed">
          Helping individuals <em>rediscover who they are in God</em> and walk <em>boldly</em> into their purpose.
        </p>
      </section>

      {/* Who We Are */}
      <section className="bg-[#f5f0e8] py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair text-3xl text-[#2e3328] text-center mb-4">Who We Are</h2>
          <div className="section-divider mb-10" />
          <p className="font-lato text-sm text-[#5a5a4a] leading-relaxed mb-5">
            In a world where many silently battle brokenness, confusion, emotional exhaustion, and misplaced or
            fractured self-worth, The Beloved Love Initiative exists as a vessel of healing, truth, and intentional becoming.
          </p>
          <p className="font-lato text-sm text-[#5a5a4a] leading-relaxed mb-5">
            We are committed to guiding individuals back to the awareness of their identity in God, helping hearts
            heal with honesty, and empowering lives to grow from a place of wholeness rather than wounds.
          </p>
          <p className="font-lato text-sm text-[#5a5a4a] leading-relaxed">
            Through devotionals, transformational conversations, outreach expressions, media platforms, and
            faith-centered initiatives, TBLI is raising a community that is rooted, restored, and purpose-driven.
          </p>
        </div>
      </section>

      {/* From the Visioner */}
      <section className="py-20 px-6" style={{ background: 'linear-gradient(to bottom, #dde0d6, #c8cfc0)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-3xl text-[#2e3328] mb-4">From the Visioner</h2>
          <div className="section-divider mb-10" />
          <blockquote className="font-cormorant italic text-xl md:text-2xl text-[#2e3328] leading-relaxed mb-6">
            &ldquo;The Beloved Love Initiative was born from a journey of love, surrender, healing, and
            rediscovering identity in God. There was a season where pouring deeply into others left me
            stretched, emptied, and searching for deeper clarity. Yet in that process, God began to reveal
            that true wholeness is not found in what we give away, but in what we receive from Him.&rdquo;
          </blockquote>
          <blockquote className="font-cormorant italic text-xl text-[#4a5240] leading-relaxed mb-8">
            &ldquo;TBLI is the fruit of that revelation — a call to restoration, truth, and becoming. It stands
            as an invitation to every heart seeking healing, identity, and divine alignment.&rdquo;
          </blockquote>
          <p className="font-playfair text-lg text-[#2e3328] font-semibold">Habibat Salawudeen</p>
          <p className="font-lato text-xs tracking-widest uppercase text-[#b8960c] mt-1">Visioner, The Beloved Love Initiative</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#f5f0e8] py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="font-playfair text-2xl text-[#2e3328] mb-4">Our Mission</h3>
            <div className="w-8 h-0.5 bg-[#d4af37] mb-6" />
            <p className="font-lato text-sm text-[#5a5a4a] leading-relaxed">
              To heal hearts, restore identity in Christ, and raise whole individuals through truth,
              shared stories, and purposeful encounters — creating a community that is rooted, restored,
              and purpose-driven.
            </p>
          </div>
          <div>
            <h3 className="font-playfair text-2xl text-[#2e3328] mb-4">Our Vision</h3>
            <div className="w-8 h-0.5 bg-[#d4af37] mb-6" />
            <p className="font-lato text-sm text-[#5a5a4a] leading-relaxed">
              A world where every person knows their identity in Christ, walks in emotional wholeness,
              and uses their voice to impact their community and beyond — living from a place of
              belovedness rather than brokenness.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2e3328] py-16 px-6 text-center">
        <h2 className="font-cormorant italic text-4xl text-[#f5f0e8] mb-4">Ready to walk in your identity?</h2>
        <p className="font-lato text-sm text-[#c8c4b8] mb-8 max-w-md mx-auto">
          There is room for you here. This is a place of truth, discovery, and becoming.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/get-involved" className="px-8 py-3 bg-[#d4af37] text-[#2e3328] font-lato text-sm tracking-widest uppercase rounded-full hover:bg-[#b8960c] transition-colors">
            Get Involved
          </Link>
          <Link href="/contact" className="px-8 py-3 border border-[#f5f0e8] text-[#f5f0e8] font-lato text-sm tracking-widest uppercase rounded-full hover:bg-[#f5f0e8] hover:text-[#2e3328] transition-colors">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
