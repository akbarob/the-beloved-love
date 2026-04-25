'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

function CrownIcon() {
  return (
    <svg width="36" height="26" viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-1">
      {/* Crown shape */}
      <path
        d="M2 22 L6 8 L12 16 L18 2 L24 16 L30 8 L34 22 Z"
        fill="#d4af37"
        stroke="#b8960c"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      {/* Base bar */}
      <rect x="2" y="22" width="32" height="3" rx="1.5" fill="#d4af37" stroke="#b8960c" strokeWidth="0.5" />
      {/* Crown jewels */}
      <circle cx="18" cy="5" r="1.8" fill="#fff8e7" />
      <circle cx="6.5" cy="10" r="1.4" fill="#fff8e7" />
      <circle cx="29.5" cy="10" r="1.4" fill="#fff8e7" />
    </svg>
  );
}

const testimonials = [
  {
    quote: "I found myself again and discovered my true identity in Christ.",
    author: "Habibat"
  },
  {
    quote: "This ministry changed my life and healed my heart.",
    author: "Salawudeen"
  },
  {
    quote: "Through this foundation, I learned to walk boldly in my purpose.",
    author: "Churchill"
  },
  {
    quote: "The Bible Recitation Movement transformed how I connect with God's Word.",
    author: "Love"
  },
  {
    quote: "I experienced true emotional healing and restoration here.",
    author: "Habibat"
  },
  {
    quote: "This community helped me rediscover who I am in God.",
    author: "Akbar"
  },
];

function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const itemsPerSlide = isMobile ? 1 : 2;
  const slides = [];
  
  for (let i = 0; i < testimonials.length; i += itemsPerSlide) {
    slides.push(testimonials.slice(i, i + itemsPerSlide));
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="max-w-5xl mx-auto mb-12 relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, slideIdx) => (
            <div key={slideIdx} className="w-full flex-shrink-0 px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {slide.map((t, i) => (
                  <div key={i} className="bg-white/60 backdrop-blur-sm rounded-xl p-8 shadow-sm">
                    <p className="font-cormorant text-5xl text-[#8a7a8a] leading-none mb-3">&ldquo;</p>
                    <p className="font-cormorant italic text-lg text-[#3a3a3a] leading-relaxed mb-4">
                      {t.quote}
                    </p>
                    <p className="font-lato text-sm text-[#6a6a6a] tracking-wide">— {t.author}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? 'bg-[#4a5240] w-8' : 'bg-[#4a5240]/30'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse at 75% 10%, rgba(255, 220, 100, 0.45) 0%, transparent 45%),
            radial-gradient(ellipse at 20% 60%, rgba(200, 210, 185, 0.3) 0%, transparent 50%),
            linear-gradient(175deg, #e8ebe0 0%, #d4d9c8 25%, #c2c9b4 50%, #b8c0a8 75%, #a8b298 100%)
          `,
        }}
      >
        {/* Draped fabric layers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Left drape */}
          <div className="absolute top-0 left-0 w-1/3 h-full opacity-40"
            style={{
              background: 'linear-gradient(105deg, rgba(240,238,228,0.9) 0%, rgba(210,215,195,0.6) 40%, transparent 70%)',
              clipPath: 'polygon(0 0, 85% 0, 60% 100%, 0 100%)',
            }} />
          {/* Right drape */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-35"
            style={{
              background: 'linear-gradient(255deg, rgba(235,232,218,0.9) 0%, rgba(205,210,190,0.5) 40%, transparent 70%)',
              clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 40% 100%)',
            }} />
          {/* Center fabric fold */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-3/4 opacity-25"
            style={{
              background: 'linear-gradient(180deg, rgba(255,252,240,0.8) 0%, rgba(220,225,205,0.4) 60%, transparent 100%)',
              clipPath: 'polygon(20% 0, 80% 0, 65% 100%, 35% 100%)',
            }} />
          {/* Golden light ray from top-right */}
          <div className="absolute top-0 right-1/4 w-96 h-full opacity-30"
            style={{
              background: 'linear-gradient(155deg, rgba(255, 230, 100, 0.8) 0%, rgba(255, 210, 60, 0.3) 30%, transparent 60%)',
              transform: 'rotate(-10deg) translateX(20%)',
            }} />
          {/* Soft glow center */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(255,240,160,0.8) 0%, transparent 70%)' }} />
        </div>
          {/* Logo mark */}
        <div className="relative z-10 mb-6 flex flex-col items-center">
          <CrownIcon />
          <span className="font-playfair text-4xl font-bold tracking-widest text-[#2e3328]">TBL</span>
          <span className="font-lato text-[10px] tracking-[0.3em] uppercase text-[#4a5240] mt-1">The Beloved Love</span>
          <span className="font-lato text-[10px] tracking-[0.3em] uppercase text-[#4a5240]">initiative</span>
        </div>

        <h1 className="relative z-10 font-cormorant italic text-4xl md:text-6xl text-[#2e3328] max-w-3xl leading-tight mb-6">
          Restoring Identity. Awakening Love. Transforming Lives.
        </h1>

        <div className="section-divider mb-6" />

        <p className="relative z-10 font-lato text-sm md:text-base text-[#4a5240] max-w-md leading-relaxed mb-10">
          The Beloved Love initiative is a movement dedicated to healing hearts,
          restoring identity in Christ, and raising whole individuals.
        </p>

        <div className="relative z-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/get-involved"
            className="px-8 py-3 bg-[#2e3328] text-[#f5f0e8] font-lato text-sm tracking-widest uppercase rounded-full hover:bg-[#4a5240] transition-colors"
          >
            Join the Movement
          </Link>
          <Link
          href={"/#"}
            // href={"/#"}
            className="px-8 py-3 border border-[#2e3328] text-[#2e3328] font-lato text-sm tracking-widest uppercase rounded-full hover:bg-[#2e3328] hover:text-[#f5f0e8] transition-colors"
          >
            Partner With Us
          </Link>
        </div>
      </section>

      {/* ABOUT US */}
      <section className="bg-[#f5f0e8] py-20 px-6 text-center">
        <p className="font-lato text-xs tracking-[0.3em] uppercase text-[#b8960c] mb-3">About Us</p>
        <div className="section-divider mb-6" />
        <p className="font-cormorant text-xl md:text-2xl text-[#2e3328] max-w-2xl mx-auto leading-relaxed mb-8">
          Helping individuals <em>rediscover who they are in God</em> and walk <em>boldly</em> into their purpose.
        </p>
        <Link
          href="/about"
          className="inline-block px-8 py-3 bg-[#4a5240] text-[#f5f0e8] font-lato text-sm tracking-widest uppercase rounded-full hover:bg-[#2e3328] transition-colors"
        >
          Learn More
        </Link>
      </section>

      {/* OUR FOCUS AREAS */}
      <section className="py-20 px-6 text-center" 
      style={{ background: 'linear-gradient(to bottom, #dde0d6, #c8cfc0)' }}
      >
        <p className="font-lato text-xs tracking-[0.3em] uppercase text-[#2e3328] mb-3">Our Focus Areas</p>
        {/* <div className="section-divider mb-10" /> */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { icon: '✝', label: 'Identity & Spiritual Growth' },
            { icon: '🕊', label: 'Emotional Healing & Restoration' },
            { icon: '🌍', label: 'Community Impact & Outreach' },
            { icon: '🎙', label: 'Voice & Purpose' },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-[#f5f0e8]/80 backdrop-blur rounded-lg p-6 flex flex-col items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-2xl">{item.icon}</span>
              <p className="font-lato text-sm text-[#2e3328] text-center leading-snug">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED INITIATIVE */}
      <section className="py-20 px-6 text-center bg-[#f5f0e8]">
        <p className="font-lato text-xs tracking-[0.3em] uppercase text-[#2e3328] mb-3">Featured Initiative</p>
        <div className="section-divider mb-10" />
        <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg bg-[#2e3328] flex flex-col md:flex-row">
          <div className="flex-1 p-10 text-left flex flex-col justify-center">
            <h3 className="font-cormorant italic text-3xl text-[#f5f0e8] mb-4">Bible Recitation Movement</h3>
            <p className="font-lato text-sm text-[#c8c4b8] leading-relaxed mb-6">
              Empowering hearts to speak God&apos;s Word with passion.
            </p>
            <Link
              href="/programs"
              className="inline-block px-6 py-2 border border-[#d4af37] text-[#d4af37] font-lato text-xs tracking-widest uppercase rounded-full hover:bg-[#d4af37] hover:text-[#2e3328] transition-colors w-fit"
            >
              Discover More
            </Link>
          </div>
          <div className="flex-1 min-h-48 bg-gradient-to-br from-[#4a5240] to-[#2e3328] flex items-center justify-center">
            <span className="font-cormorant italic text-6xl text-[#d4af37]/30">✝</span>
          </div>
        </div>
      </section>

      {/* FROM THE VISIONER */}
      <section className="py-20 px-6" style={{ background: 'linear-gradient(to bottom, #dde0d6, #c8cfc0)' }}>
        <p className="font-lato text-xs tracking-[0.3em] uppercase text-[#2e3328] text-center mb-3">From the Visioner</p>
        <div className="section-divider mb-10" />
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center">
          <div className="w-48 h-48 rounded-full bg-[#4a5240]/30 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-lg">
            <span className="font-cormorant italic text-5xl text-[#4a5240]/50">TBL</span>
          </div>
          <div className="flex-1">
            <p className="font-cormorant text-xl md:text-2xl text-[#2e3328] leading-relaxed mb-6">
              The Beloved Love initiative was born from a journey of deep love,
              healing, and rediscovering identity in God. This is more than an
              organization — this is a <strong>call to wholeness.</strong>
            </p>
            <Link
              href="/about"
              className="inline-block px-8 py-3 bg-[#2e3328] text-[#f5f0e8] font-lato text-sm tracking-widest uppercase rounded-full hover:bg-[#4a5240] transition-colors"
            >
              Read Full Story
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIES */}
      <section className="relative py-20 px-6 text-center overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, rgba(200, 210, 190, 0.4), rgba(210, 220, 200, 0.5)), linear-gradient(135deg, #d8ddd0 0%, #c8cfc0 50%, #b8c0a8 100%)',
        }}
      >
        {/* Soft sky overlay */}
        <div className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(ellipse at 50% 80%, rgba(255, 230, 180, 0.5) 0%, rgba(200, 210, 185, 0.3) 50%, transparent 100%)',
          }}
        />

        <div className="relative z-10">
          <p className="font-lato text-xs tracking-[0.3em] uppercase text-[#4a5240] mb-10">Testimonies</p>

          {/* Testimonial carousel */}
          <TestimonialCarousel />

          {/* CTA message */}
          <h2 className="font-lato text-2xl md:text-3xl tracking-wide text-[#3a3a3a] mb-8 font-light mt-12">
            You are not lost. You are <strong className="font-semibold">becoming.</strong>
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-involved"
              className="px-8 py-3 bg-[#2e3328] text-[#f5f0e8] font-lato text-sm tracking-widest uppercase rounded-full hover:bg-[#4a5240] transition-colors"
            >
              Get Involved
            </Link>
            <Link
              href="/donate"
              className="px-8 py-3 border border-[#2e3328] text-[#2e3328] font-lato text-sm tracking-widest uppercase rounded-full hover:bg-[#2e3328] hover:text-[#f5f0e8] transition-colors"
            >
              Donate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
