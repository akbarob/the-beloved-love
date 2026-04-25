import Link from 'next/link';

export const metadata = {
  title: 'Get Involved | The Beloved Love initiative',
};

const ways = [
  {
    icon: '🙏',
    title: 'Pray With Us',
    description: 'Join our prayer community and intercede for the hearts and lives we serve.',
  },
  {
    icon: '🤝',
    title: 'Volunteer',
    description: 'Give your time and talents to support our programs, events, and outreach efforts.',
  },
  {
    icon: '📣',
    title: 'Spread the Word',
    description: 'Share our mission with your community and help us reach more lives.',
  },
  {
    icon: '💛',
    title: 'Partner With Us',
    description: 'Become a financial partner and help sustain the work of healing and restoration.',
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-bg pt-36 pb-20 px-6 text-center">
        <p className="font-lato text-xs tracking-[0.3em] uppercase text-[#b8960c] mb-3">Join the Movement</p>
        <h1 className="font-cormorant italic text-5xl md:text-6xl text-[#2e3328] mb-4">Get Involved</h1>
        <div className="section-divider mb-6" />
        <p className="font-lato text-base text-[#4a5240] max-w-xl mx-auto leading-relaxed">
          There are many ways to be part of this movement. Find the one that resonates with your heart.
        </p>
      </section>

      {/* Ways to get involved */}
      <section className="bg-[#f5f0e8] py-20 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
          {ways.map((w) => (
            <div key={w.title} className="bg-white rounded-xl p-8 shadow-sm border border-[#e8e2d8] text-center hover:shadow-md transition-shadow">
              <span className="text-4xl block mb-4">{w.icon}</span>
              <h3 className="font-playfair text-xl text-[#2e3328] mb-3">{w.title}</h3>
              <p className="font-lato text-sm text-[#6a6a5a] leading-relaxed">{w.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Volunteer Form */}
      {/* <section className="py-20 px-6" style={{ background: 'linear-gradient(to bottom, #dde0d6, #c8cfc0)' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="font-playfair text-3xl text-[#2e3328] text-center mb-3">Sign Up to Volunteer</h2>
          <div className="section-divider mb-10" />
          <form className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="First Name"
                className="px-4 py-3 rounded-lg border border-[#c8c4b8] bg-[#faf8f4] font-lato text-sm focus:outline-none focus:border-[#4a5240]"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="px-4 py-3 rounded-lg border border-[#c8c4b8] bg-[#faf8f4] font-lato text-sm focus:outline-none focus:border-[#4a5240]"
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="px-4 py-3 rounded-lg border border-[#c8c4b8] bg-[#faf8f4] font-lato text-sm focus:outline-none focus:border-[#4a5240]"
            />
            <select className="px-4 py-3 rounded-lg border border-[#c8c4b8] bg-[#faf8f4] font-lato text-sm text-[#6a6a5a] focus:outline-none focus:border-[#4a5240]">
              <option value="">How would you like to serve?</option>
              <option>Prayer Team</option>
              <option>Event Support</option>
              <option>Outreach</option>
              <option>Administrative</option>
              <option>Other</option>
            </select>
            <textarea
              rows={4}
              placeholder="Tell us a little about yourself..."
              className="px-4 py-3 rounded-lg border border-[#c8c4b8] bg-[#faf8f4] font-lato text-sm focus:outline-none focus:border-[#4a5240] resize-none"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-[#2e3328] text-[#f5f0e8] font-lato text-sm tracking-widest uppercase rounded-full hover:bg-[#4a5240] transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </section> */}

      {/* Donate CTA */}
      {/* <section className="bg-[#2e3328] py-16 px-6 text-center">
        <h2 className="font-cormorant italic text-4xl text-[#f5f0e8] mb-4">Want to give financially?</h2>
        <p className="font-lato text-sm text-[#c8c4b8] mb-8">Your generosity fuels transformation.</p>
        <Link href={"/#"} className="px-8 py-3 bg-[#d4af37] text-[#2e3328] font-lato text-sm tracking-widest uppercase rounded-full hover:bg-[#b8960c] transition-colors">
          Donate Now
        </Link>
      </section> */}
    </>
  );
}
