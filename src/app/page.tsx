'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import FadeUp from '@/components/FadeUp';

function CrownIcon() {
  return (
    <svg width="36" height="26" viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-1">
      <path d="M2 22 L6 8 L12 16 L18 2 L24 16 L30 8 L34 22 Z" fill="#d4af37" stroke="#b8960c" strokeWidth="0.8" strokeLinejoin="round" />
      <rect x="2" y="22" width="32" height="3" rx="1.5" fill="#d4af37" stroke="#b8960c" strokeWidth="0.5" />
      <circle cx="18" cy="5" r="1.8" fill="#fff8e7" />
      <circle cx="6.5" cy="10" r="1.4" fill="#fff8e7" />
      <circle cx="29.5" cy="10" r="1.4" fill="#fff8e7" />
    </svg>
  );
}

const testimonials = [
  { quote: "I came into this community feeling emotionally lost and spiritually disconnected. Through the truth shared here, I began to find my way back to myself in God.", author: "Community Member" },
  { quote: "The conversations, devotionals, and encounters through TBLI reminded me that healing is possible and purpose still exists beyond pain.", author: "Participant" },
  { quote: "For the first time in a long while, I felt seen, heard, and understood.", author: "Listener, A Moment With Love" },
  { quote: "Through this initiative, I learned to walk boldly in my purpose and stop hiding behind my wounds.", author: "Community Member" },
  { quote: "The Bible Recitation Movement transformed how I connect with God's Word. I speak it now with conviction.", author: "Participant" },
  { quote: "TBLI gave me language for what I was going through and a community that truly understood.", author: "Listener, A Moment With Love" },
];

const focusAreas = [
  { icon: '✝', label: 'Identity & Spiritual Growth', desc: 'Through scriptural teachings, devotionals, prayer encounters, and truth-centered guidance, we help individuals rediscover their identity in Christ and build a spiritually grounded life.' },
  { icon: '🕊', label: 'Emotional Healing & Restoration', desc: 'We create thoughtful spaces for hearts to process pain, release unhealthy patterns, unlearn false narratives, and embrace a journey of healing that leads to lasting wholeness.' },
  { icon: '🌍', label: 'Community Impact & Outreach', desc: 'Through compassionate outreach, support initiatives, and meaningful interventions, we extend practical love and transformational presence to individuals and communities in need.' },
  { icon: '🎤', label: 'Voice & Purpose', desc: 'Through A Moment With Love, our signature podcast, we give voice to lived experiences, faith stories, and transformational testimonies — creating healing through honest dialogue.' },
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
  const slides: typeof testimonials[] = [];
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
        <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
          {slides.map((slide, slideIdx) => (
            <div key={slideIdx} className="w-full shrink-0 px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {slide.map((t, i) => (
                  <div key={i} className="bg-white/60 backdrop-blur-sm rounded-xl p-8 shadow-sm text-left">
                    <p className="font-cormorant text-5xl text-[#8a9a80] leading-none mb-3">&ldquo;</p>
                    <p className="font-cormorant italic text-lg text-[#3a3a3a] leading-relaxed mb-4">{t.quote}</p>
                    <p className="font-lato text-sm text-[#6a6a6a] tracking-wide">— {t.author}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-8">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-[#4a5240] w-8' : 'bg-[#4a5240]/30 w-2'}`} aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 overflow-hidden"
        style={{ background: `radial-gradient(ellipse at 75% 10%, rgba(255, 220, 100, 0.45) 0%, transparent 45%), radial-gradient(ellipse at 20% 60%, rgba(200, 210, 185, 0.3) 0%, transparent 50%), linear-gradient(175deg, #e8ebe0 0%, #d4d9c8 25%, #c2c9b4 50%, #b8c0a8 75%, #a8b298 100%)` }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-1/3 h-full opacity-40" style={{ background: 'linear-gradient(105deg, rgba(240,238,228,0.9) 0%, rgba(210,215,195,0.6) 40%, transparent 70%)', clipPath: 'polygon(0 0, 85% 0, 60% 100%, 0 100%)' }} />
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-35" style={{ background: 'linear-gradient(255deg, rgba(235,232,218,0.9) 0%, rgba(205,210,190,0.5) 40%, transparent 70%)', clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 40% 100%)' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-3/4 opacity-25" style={{ background: 'linear-gradient(180deg, rgba(255,252,240,0.8) 0%, rgba(220,225,205,0.4) 60%, transparent 100%)', clipPath: 'polygon(20% 0, 80% 0, 65% 100%, 35% 100%)' }} />
          <div className="absolute top-0 right-1/4 w-96 h-full opacity-30" style={{ background: 'linear-gradient(155deg, rgba(255, 230, 100, 0.8) 0%, rgba(255, 210, 60, 0.3) 30%, transparent 60%)', transform: 'rotate(-10deg) translateX(20%)' }} />
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(255,240,160,0.8) 0%, transparent 70%)' }} />
        </div>

        <div className="relative z-10 mb-6 flex flex-col items-center">
          <CrownIcon />
          <span className="font-playfair text-4xl font-bold tracking-widest text-[#2e3328]">TBL</span>
          <span className="font-lato text-[10px] tracking-[0.3em] uppercase text-[#4a5240] mt-1">The Beloved Love</span>
          <span className="font-lato text-[10px] tracking-[0.3em] uppercase text-[#4a5240]">Initiative</span>
        </div>

        <p className="relative z-10 font-lato text-xs tracking-[0.2em] uppercase text-[#6a7a60] mb-3">Discovering Purpose</p>

        <h1 className="relative z-10 font-cormorant italic text-4xl md:text-6xl text-[#2e3328] max-w-3xl leading-tight mb-6">
          Restoring Identity. Awakening Love. Transforming Lives.
        </h1>

        <div className="section-divider mb-6" />

        <p className="relative z-10 font-lato text-sm md:text-base text-[#4a5240] max-w-lg leading-relaxed mb-10">
          The Beloved Love Initiative is a transformative movement dedicated to healing hearts,
          restoring identity in Christ, and raising whole individuals through truth, shared stories,
          and purposeful encounters.
        </p>

        <div className="relative z-10 flex flex-col sm:flex-row gap-4">
          <Link href="/get-involved" className="px-8 py-3 bg-[#2e3328] text-[#f5f0e8] font-lato text-sm tracking-widest uppercase rounded-full hover:bg-[#4a5240] transition-colors">
            Join the Movement
          </Link>
          <Link href="/get-involved" className="px-8 py-3 border border-[#2e3328] text-[#2e3328] font-lato text-sm tracking-widest uppercase rounded-full hover:bg-[#2e3328] hover:text-[#f5f0e8] transition-colors">
            Partner With Us
          </Link>
        </div>
      </section>

      {/* ── ABOUT US ── */}
      <section className="bg-[#f5f0e8] py-20 px-6 text-center">
        <FadeUp>
          <p className="font-lato text-xs tracking-[0.3em] uppercase text-[#b8960c] mb-3">About Us</p>
          <div className="section-divider mb-8" />
          <p className="font-cormorant text-xl md:text-2xl text-[#2e3328] max-w-2xl mx-auto leading-relaxed mb-6">
            Helping individuals <em>rediscover who they are in God</em> and walk <em>boldly</em> into their purpose.
          </p>
          <p className="font-lato text-sm text-[#5a5a4a] max-w-3xl mx-auto leading-relaxed mb-10">
            In a world where many silently battle brokenness, confusion, emotional exhaustion, and misplaced or fractured
            self-worth, The Beloved Love Initiative exists as a vessel of healing, truth, and intentional becoming.
            We are committed to guiding individuals back to the awareness of their identity in God, helping hearts heal
            with honesty, and empowering lives to grow from a place of wholeness rather than wounds. Through devotionals,
            transformational conversations, outreach expressions, media platforms, and faith-centered initiatives, TBLI
            is raising a community that is rooted, restored, and purpose-driven.
          </p>
          <Link href="/about" className="inline-block px-8 py-3 bg-[#4a5240] text-[#f5f0e8] font-lato text-sm tracking-widest uppercase rounded-full hover:bg-[#2e3328] transition-colors">
            Learn More
          </Link>
        </FadeUp>
      </section>

      {/* ── OUR FOCUS AREAS ── */}
      <section className="py-20 px-6 text-center" style={{ background: 'linear-gradient(to bottom, #dde0d6, #c8cfc0)' }}>
        <FadeUp>
          <p className="font-lato text-xs tracking-[0.3em] uppercase text-[#2e3328] mb-3">Our Focus Areas</p>
          {/* <div className="section-divider mb-10" /> */}
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {focusAreas.map((item, i) => (
            <FadeUp key={item.label} delay={i * 120}>
              <div className="bg-[#f5f0e8]/80 backdrop-blur rounded-xl p-6 flex flex-col items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center h-full">
                <span className="text-3xl">{item.icon}</span>
                <p className="font-playfair text-base text-[#2e3328] font-semibold">{item.label}</p>
                <p className="font-lato text-xs text-[#5a5a4a] leading-relaxed">{item.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── FEATURED INITIATIVE ── */}
      <section className="py-20 px-6 text-center bg-[#f5f0e8]">
        <FadeUp>
          <p className="font-lato text-xs tracking-[0.3em] uppercase text-[#2e3328] mb-3">Featured Initiative</p>
          <div className="section-divider mb-10" />
        </FadeUp>
        <FadeUp delay={100}>
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg bg-[#2e3328] flex flex-col md:flex-row">
            <div className="flex-1 p-10 text-left flex flex-col justify-center">
              <h3 className="font-cormorant italic text-3xl text-[#f5f0e8] mb-4">Bible Recitation Movement</h3>
              <p className="font-cormorant text-lg text-[#c8c4b8] leading-relaxed mb-3">
                One of the flagship expressions of The Beloved Love Initiative — a bold call to restore reverence
                for the spoken Word of God through public scripture declaration, organized recitations, and
                transformational faith gatherings.
              </p>
              <p className="font-cormorant text-base text-[#a8a49a] leading-relaxed mb-6">
                This movement exists to reignite hunger for the Word, stir spiritual awakening, and create
                encounters where hearts are drawn back to truth through vocal scripture immersion.
              </p>
              <Link href="/programs" className="inline-block px-6 py-2 border border-[#d4af37] text-[#d4af37] font-lato text-xs tracking-widest uppercase rounded-full hover:bg-[#d4af37] hover:text-[#2e3328] transition-colors w-fit">
                Discover More
              </Link>
            </div>
            <div className="flex-1 min-h-48 bg-gradient-to-br from-[#4a5240] to-[#2e3328] flex items-center justify-center">
              <span className="font-cormorant italic text-8xl text-[#d4af37]/20">✝</span>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── FROM THE VISIONER ── */}
      <section className="py-20 px-6" style={{ background: 'linear-gradient(to bottom, #dde0d6, #c8cfc0)' }}>
        <FadeUp>
          <p className="font-lato text-xs tracking-[0.3em] uppercase text-[#2e3328] text-center mb-3">From the Visioner</p>
          <div className="section-divider mb-10" />
        </FadeUp>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-center">
          <FadeUp delay={100} className="shrink-0">
            <Image
              src="/assets/WhatsApp Image 2026-04-26 at 01.08.35.jpeg"
              alt="Habibat Salawudeen — Visioner, The Beloved Love Initiative"
              width={256}
              height={384}
              className="w-56 md:w-64 rounded-2xl shadow-lg object-cover object-top"
              priority
            />
          </FadeUp>
          <FadeUp delay={200} className="flex-1">
            <p className="font-cormorant text-xl md:text-2xl text-[#2e3328] leading-relaxed mb-4">
              The Beloved Love Initiative was born from a journey of love, surrender, healing, and
              rediscovering identity in God.
            </p>
            <p className="font-cormorant text-lg md:text-xl text-[#4a5240] leading-relaxed mb-4">
              There was a season where pouring deeply into others left me stretched, emptied, and searching
              for deeper clarity. Yet in that process, God began to reveal that true wholeness is not found
              in what we give away, but in what we receive from Him.
            </p>
            <p className="font-cormorant text-lg md:text-xl text-[#4a5240] leading-relaxed mb-8">
              TBLI is the fruit of that revelation — a call to restoration, truth, and becoming. It stands
              as an invitation to every heart seeking healing, identity, and divine alignment.
            </p>
            <p className="font-cormorant text-xl text-[#2e3328] font-semibold mb-1">Habibat Salawudeen</p>
            <p className="font-cormorant italic text-base text-[#b8960c] tracking-wide mb-8">Visioner, The Beloved Love Initiative</p>
            <Link href="/about" className="inline-block px-8 py-3 bg-[#2e3328] text-[#f5f0e8] font-lato text-sm tracking-widest uppercase rounded-full hover:bg-[#4a5240] transition-colors">
              Read Full Story
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── TESTIMONIES ── */}
      <section className="relative py-20 px-6 text-center overflow-hidden" style={{ background: 'linear-gradient(to bottom, rgba(200, 210, 190, 0.4), rgba(210, 220, 200, 0.5)), linear-gradient(135deg, #d8ddd0 0%, #c8cfc0 50%, #b8c0a8 100%)' }}>
        <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(ellipse at 50% 80%, rgba(255, 230, 180, 0.5) 0%, rgba(200, 210, 185, 0.3) 50%, transparent 100%)' }} />
        <div className="relative z-10">
          <FadeUp>
            <p className="font-lato text-xs tracking-[0.3em] uppercase text-[#4a5240] mb-10">Testimonies</p>
          </FadeUp>
          <TestimonialCarousel />

          <FadeUp delay={100}>
            <div className="mt-16 max-w-3xl mx-auto">
              <h2 className="font-playfair text-2xl md:text-4xl text-[#2e3328] mb-8 tracking-widest uppercase">
                You Are Not Lost. You Are Becoming.
              </h2>
              <div className="section-divider mb-10" />
              <p className="font-cormorant italic text-xl md:text-2xl text-[#4a5240] leading-relaxed mb-10">
                Wherever you may find yourself on the journey — healing, searching, rediscovering,
                rebuilding, or awakening — there is room for you here.
              </p>

              <div className="flex flex-col items-center gap-3 mb-12">
                {[
                  { prefix: 'This is a place of', word: 'truth.' },
                  { prefix: 'This is a place of', word: 'discovery.' },
                  { prefix: 'This is a place of', word: 'awakening.' },
                  { prefix: 'This is a place of', word: 'rebirth.' },
                  { prefix: 'This is a place of', word: 'becoming.' },
                  { prefix: 'This is a place of', word: 'belovedness.', italic: true },
                ].map((line, i) => (
                  <p key={i} className="font-lato text-sm md:text-base text-[#3a4a38] tracking-wide" style={{ opacity: 1 - i * 0.04 }}>
                    {line.prefix}{' '}
                    {line.italic
                      ? <em className="font-cormorant text-lg md:text-xl text-[#2e3328]">{line.word}</em>
                      : <strong className="font-playfair font-semibold text-[#2e3328]">{line.word}</strong>
                    }
                  </p>
                ))}
              </div>

              <div className="flex flex-col items-center gap-2 mb-10">
                <div className="flex items-center gap-4 w-full max-w-xs justify-center">
                  <div className="h-px flex-1 bg-[#4a5240]/30" />
                  <CrownIcon />
                  <div className="h-px flex-1 bg-[#4a5240]/30" />
                </div>
                <span className="font-cormorant italic text-[#4a5240] text-base tracking-widest">The Beloved Love Initiative</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-involved" className="px-8 py-3 bg-[#2e3328] text-[#f5f0e8] font-lato text-sm tracking-widest uppercase rounded-full hover:bg-[#4a5240] transition-colors shadow-sm">
                  Get Involved
                </Link>
                <Link href="/donate" className="px-8 py-3 border border-[#2e3328] text-[#2e3328] font-lato text-sm tracking-widest uppercase rounded-full hover:bg-[#2e3328] hover:text-[#f5f0e8] transition-colors">
                  Donate
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
