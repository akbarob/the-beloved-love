'use client';

import { useState } from 'react';

const amounts = [25, 50, 100, 250, 500];

export default function DonatePage() {
  const [selected, setSelected] = useState<number | null>(100);
  const [custom, setCustom] = useState('');
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');

  return (
    <>
      {/* Hero */}
      <section className="hero-bg pt-36 pb-20 px-6 text-center">
        <p className="font-lato text-xs tracking-[0.3em] uppercase text-[#b8960c] mb-3">Partner With Us</p>
        <h1 className="font-cormorant italic text-5xl md:text-6xl text-[#2e3328] mb-4">Donate</h1>
        <div className="section-divider mb-6" />
        <p className="font-lato text-base text-[#4a5240] max-w-xl mx-auto leading-relaxed">
          Your generosity helps us restore identity, awaken love, and transform lives.
          Every gift makes a difference.
        </p>
      </section>

      {/* Donation Form */}
      <section className="bg-[#f5f0e8] py-20 px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-10 border border-[#e8e2d8]">
          <h2 className="font-playfair text-2xl text-[#2e3328] text-center mb-8">Make a Gift</h2>

          {/* Frequency */}
          <div className="flex rounded-full border border-[#c8c4b8] overflow-hidden mb-8">
            {(['one-time', 'monthly'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFrequency(f)}
                className={`flex-1 py-3 font-lato text-sm tracking-widest uppercase transition-colors ${
                  frequency === f
                    ? 'bg-[#2e3328] text-[#f5f0e8]'
                    : 'text-[#4a5240] hover:bg-[#f5f0e8]'
                }`}
              >
                {f === 'one-time' ? 'One Time' : 'Monthly'}
              </button>
            ))}
          </div>

          {/* Amount buttons */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
            {amounts.map((a) => (
              <button
                key={a}
                onClick={() => { setSelected(a); setCustom(''); }}
                className={`py-3 rounded-lg font-lato text-sm font-bold border transition-colors ${
                  selected === a && !custom
                    ? 'bg-[#2e3328] text-[#f5f0e8] border-[#2e3328]'
                    : 'border-[#c8c4b8] text-[#4a5240] hover:border-[#4a5240]'
                }`}
              >
                ${a}
              </button>
            ))}
          </div>

          {/* Custom amount */}
          <div className="relative mb-8">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6a6a5a] font-lato">$</span>
            <input
              type="number"
              placeholder="Custom amount"
              value={custom}
              onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
              className="w-full pl-8 pr-4 py-3 rounded-lg border border-[#c8c4b8] bg-[#faf8f4] font-lato text-sm focus:outline-none focus:border-[#4a5240]"
            />
          </div>

          {/* Personal info */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="px-4 py-3 rounded-lg border border-[#c8c4b8] bg-[#faf8f4] font-lato text-sm focus:outline-none focus:border-[#4a5240]" />
              <input type="text" placeholder="Last Name" className="px-4 py-3 rounded-lg border border-[#c8c4b8] bg-[#faf8f4] font-lato text-sm focus:outline-none focus:border-[#4a5240]" />
            </div>
            <input type="email" placeholder="Email Address" className="px-4 py-3 rounded-lg border border-[#c8c4b8] bg-[#faf8f4] font-lato text-sm focus:outline-none focus:border-[#4a5240]" />
          </div>

          <button className="w-full py-4 bg-[#d4af37] text-[#2e3328] font-lato text-sm tracking-widest uppercase rounded-full hover:bg-[#b8960c] transition-colors font-bold">
            Give {custom ? `$${custom}` : selected ? `$${selected}` : ''} {frequency === 'monthly' ? '/ Month' : ''}
          </button>

          <p className="text-center font-lato text-xs text-[#9a9a8a] mt-4">
            Secure donation. The Beloved Love initiative is a registered nonprofit.
          </p>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 px-6 text-center" style={{ background: 'linear-gradient(to bottom, #dde0d6, #c8cfc0)' }}>
        <h2 className="font-playfair text-3xl text-[#2e3328] mb-3">Your Impact</h2>
        <div className="section-divider mb-10" />
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { amount: '$25', impact: 'Provides resources for one participant in our healing workshops.' },
            { amount: '$100', impact: 'Sponsors a community outreach event reaching 20+ individuals.' },
            { amount: '$250', impact: 'Funds a full Bible Recitation Movement session for a group.' },
          ].map((i) => (
            <div key={i.amount} className="bg-[#f5f0e8]/80 rounded-xl p-8 shadow-sm">
              <p className="font-playfair text-4xl text-[#d4af37] mb-3">{i.amount}</p>
              <p className="font-lato text-sm text-[#4a5240] leading-relaxed">{i.impact}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
