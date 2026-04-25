import Link from 'next/link';

export const metadata = {
  title: 'About | The Beloved Love initiative',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-bg pt-36 pb-20 px-6 text-center">
        <p className="font-lato text-xs tracking-[0.3em] uppercase text-[#b8960c] mb-3">Our Story</p>
        <h1 className="font-cormorant italic text-5xl md:text-6xl text-[#2e3328] mb-4">About Us</h1>
        <div className="section-divider mb-6" />
        <p className="font-lato text-base text-[#4a5240] max-w-xl mx-auto leading-relaxed">
          We exist to help individuals rediscover who they are in God and walk boldly into their purpose.
        </p>
      </section>

      {/* Mission */}
      <section className="bg-[#f5f0e8] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-3xl text-[#2e3328] mb-6">Our Mission</h2>
          <div className="section-divider mb-8" />
          <p className="font-cormorant text-xl text-[#4a5240] leading-relaxed">
            The Beloved Love initiative is a movement dedicated to healing hearts,
            restoring identity in Christ, and raising whole individuals who walk in
            the fullness of who God created them to be.
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 px-6" style={{ background: 'linear-gradient(to bottom, #dde0d6, #c8cfc0)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-3xl text-[#2e3328] mb-6">Our Vision</h2>
          <div className="section-divider mb-8" />
          <p className="font-cormorant text-xl text-[#4a5240] leading-relaxed">
            A world where every person knows their identity in Christ, walks in
            emotional wholeness, and uses their voice to impact their community
            and beyond.
          </p>
        </div>
      </section>

      {/* From the Visioner */}
      <section className="bg-[#f5f0e8] py-20 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-center">
          <div className="w-56 h-56 rounded-full bg-[#4a5240]/20 flex-shrink-0 flex items-center justify-center shadow-lg">
            <span className="font-cormorant italic text-5xl text-[#4a5240]/40">TBL</span>
          </div>
          <div>
            <p className="font-lato text-xs tracking-[0.3em] uppercase text-[#b8960c] mb-3">From the Visioner</p>
            <p className="font-cormorant text-xl text-[#2e3328] leading-relaxed mb-4">
              &ldquo;This initiative was born out of my own journey — a journey of pain, healing,
              and ultimately finding my identity in the love of God. I believe that when we
              know who we are, we can change the world around us.&rdquo;
            </p>
            <p className="font-lato text-sm text-[#4a5240] tracking-wide">— Founder, The Beloved Love initiative</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2e3328] py-16 px-6 text-center">
        <h2 className="font-cormorant italic text-4xl text-[#f5f0e8] mb-6">Ready to walk in your identity?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/get-involved" className="px-8 py-3 bg-[#d4af37] text-[#2e3328] font-lato text-sm tracking-widest uppercase rounded-full hover:bg-[#b8960c] transition-colors">
            Get Involved
          </Link>
          <Link href={"/#"} className="px-8 py-3 border border-[#f5f0e8] text-[#f5f0e8] font-lato text-sm tracking-widest uppercase rounded-full hover:bg-[#f5f0e8] hover:text-[#2e3328] transition-colors">
            Partner With Us
          </Link>
        </div>
      </section>
    </>
  );
}
