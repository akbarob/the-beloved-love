import Link from 'next/link';

export const metadata = {
  title: 'Programs | The Beloved Love initiative',
};

const programs = [
  {
    icon: '📖',
    title: 'Bible Recitation Movement',
    description:
      'Empowering hearts to speak God\'s Word with passion. Participants memorize and recite scripture as a tool for healing, identity, and spiritual growth.',
    tag: 'Featured Initiative',
  },
  {
    icon: '✝',
    title: 'Identity & Spiritual Growth',
    description:
      'Workshops and retreats designed to help individuals root their identity in Christ and discover their God-given purpose.',
    tag: 'Workshop',
  },
  {
    icon: '🕊',
    title: 'Emotional Healing & Restoration',
    description:
      'Safe spaces for healing from trauma, grief, and emotional wounds through faith-based counseling and community support.',
    tag: 'Support',
  },
  {
    icon: '🌍',
    title: 'Community Impact & Outreach',
    description:
      'Serving our local and global communities through outreach events, resource distribution, and partnership with local churches.',
    tag: 'Outreach',
  },
  {
    icon: '🎙',
    title: 'Voice & Purpose',
    description:
      'Equipping individuals to use their voice — through speaking, writing, and creative expression — to impact the world around them.',
    tag: 'Empowerment',
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

      {/* Programs Grid */}
      <section className="bg-[#f5f0e8] py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((p) => (
            <div key={p.title} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-[#e8e2d8]">
              <div className="flex items-start gap-4">
                <span className="text-3xl">{p.icon}</span>
                <div>
                  <span className="inline-block px-3 py-1 bg-[#4a5240]/10 text-[#4a5240] text-xs tracking-widest uppercase rounded-full mb-3">
                    {p.tag}
                  </span>
                  <h3 className="font-playfair text-xl text-[#2e3328] mb-3">{p.title}</h3>
                  <p className="font-lato text-sm text-[#6a6a5a] leading-relaxed">{p.description}</p>
                </div>
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
