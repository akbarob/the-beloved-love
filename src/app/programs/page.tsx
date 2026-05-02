import type { Metadata } from 'next';
import Link from 'next/link';
import { siteUrl, siteName } from '@/app/metadata';

export const metadata: Metadata = {
  title: 'Programs',
  description:
    'Explore TBLI programs including the Bible Recitation Movement, Identity & Spiritual Growth, Emotional Healing, Community Outreach, and A Moment With Love podcast.',
  alternates: { canonical: `${siteUrl}/programs` },
  openGraph: {
    title: `Programs | ${siteName}`,
    description:
      'Every program is designed to restore, equip, and empower individuals to walk in wholeness — from the Bible Recitation Movement to A Moment With Love.',
    url: `${siteUrl}/programs`,
  },
};

const programs = [
  {
    icon: '📖',
    title: 'Bible Recitation Movement',
    tag: 'Flagship Initiative',
    description:
      'A bold call to restore reverence for the spoken Word of God through public scripture declaration, organized recitations, and transformational faith gatherings. This movement exists to reignite hunger for the Word, stir spiritual awakening, and create encounters where hearts are drawn back to truth through vocal scripture immersion.',
  },
  {
    icon: '✝',
    title: 'Identity & Spiritual Growth',
    tag: 'Core Program',
    description:
      'Through scriptural teachings, devotionals, prayer encounters, and truth-centered guidance, we help individuals identify purpose, rediscover their identity in Christ, and build a spiritually grounded life.',
  },
  {
    icon: '🕊',
    title: 'Emotional Healing & Restoration',
    tag: 'Healing Space',
    description:
      'We create thoughtful spaces for hearts to process pain, release unhealthy patterns, unlearn false narratives, and embrace a journey of healing that leads to lasting wholeness.',
  },
  {
    icon: '🌍',
    title: 'Community Impact & Outreach',
    tag: 'Outreach',
    description:
      'Through compassionate outreach, support initiatives, and meaningful interventions, we extend practical love and transformational presence to individuals and communities in need.',
  },
  {
    icon: '🎤',
    title: 'A Moment With Love — Voice & Purpose',
    tag: 'Podcast & Conversations',
    description:
      'Our signature podcast and conversation platform gives voice to lived experiences, emotional journeys, faith stories, and transformational testimonies — creating healing through honest dialogue and purposeful expression.',
  },
];

export default function ProgramsPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-bg pt-36 pb-20 px-6 text-center">
        <p className="font-lato text-xs tracking-[0.3em] uppercase text-[#b8960c] mb-3">What We Do</p>
        <h1 className="font-cormorant italic text-5xl md:text-6xl text-[#2e3328] mb-4">Our Programs</h1>
        <div className="section-divider mb-6" />
        <p className="font-lato text-base text-[#4a5240] max-w-xl mx-auto leading-relaxed">
          Every program is designed to restore, equip, and empower individuals to walk in wholeness.
        </p>
      </section>

      {/* Programs */}
      <section className="bg-[#f5f0e8] py-20 px-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {programs.map((p) => (
            <div key={p.title} className="bg-white rounded-xl p-8 shadow-sm border border-[#e8e2d8] flex gap-6 items-start hover:shadow-md transition-shadow">
              <span className="text-4xl shrink-0">{p.icon}</span>
              <div>
                <span className="inline-block px-3 py-1 bg-[#4a5240]/10 text-[#4a5240] text-xs tracking-widest uppercase rounded-full mb-3">
                  {p.tag}
                </span>
                <h3 className="font-playfair text-xl text-[#2e3328] mb-3">{p.title}</h3>
                <p className="font-lato text-sm text-[#6a6a5a] leading-relaxed">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2e3328] py-16 px-6 text-center">
        <h2 className="font-cormorant italic text-4xl text-[#f5f0e8] mb-4">Want to participate?</h2>
        <p className="font-lato text-sm text-[#c8c4b8] mb-8 max-w-md mx-auto">
          Join one of our programs and begin your journey toward wholeness and purpose.
        </p>
        <Link href="/get-involved" className="px-8 py-3 bg-[#d4af37] text-[#2e3328] font-lato text-sm tracking-widest uppercase rounded-full hover:bg-[#b8960c] transition-colors">
          Get Involved
        </Link>
      </section>
    </>
  );
}
