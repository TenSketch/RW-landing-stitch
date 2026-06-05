'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Facebook,
  Phone,
  ArrowRight,
  Menu,
  X,
  Instagram,
  ChevronRight,
  PenTool,
  Play,
  Pause,
  Diamond,
  Sparkles,
  MapPin,
  Star,
  Mail,
  MessageCircle,
} from 'lucide-react';

const FadeIn = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}) => {
  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 40 };
      case 'down':
        return { opacity: 0, y: -40 };
      case 'left':
        return { opacity: 0, x: 40 };
      case 'right':
        return { opacity: 0, x: -40 };
      default:
        return { opacity: 0, y: 40 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ParallaxSection = ({
  children,
  offset = 50,
  className = '',
}: {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
};

const testimonials = [
  {
    name: 'Aisha M.',
    text: 'Beautiful craftsmanship and premium quality. The abaya exceeded my expectations in every way.',
    rating: 5,
  },
  {
    name: 'Fatima K.',
    text: 'Exactly what I expected from a luxury collection. The fabric is divine and the fit is perfect.',
    rating: 5,
  },
  {
    name: 'Noor A.',
    text: 'Elegant, comfortable, and unique. I receive compliments every time I wear it.',
    rating: 5,
  },
  {
    name: 'Layla H.',
    text: 'A truly exceptional piece. You can feel the quality the moment you put it on.',
    rating: 5,
  },
];

const instagramPosts = [
  '/assets/Aurora Blossom Abaya/close.png',
  '/assets/Noir Veil Elegance Abaya/close.png',
  '/assets/Regal Rhythm Abaya/closeup.png',
  '/assets/Royal Noor Embellished Abaya/close.png',
  '/assets/Aurora Blossom Abaya/long.jpeg',
  '/assets/Midnight Elegance Abaya/close.png',
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [heroScale, setHeroScale] = useState(1);
  const [heroY, setHeroY] = useState(0);
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);
  const atelierSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / (window.innerHeight * 0.2), 1);
      setHeroOpacity(1 - progress);
      setHeroScale(1 + progress * 0.1);
      setHeroY(progress * 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && playingVideoIndex !== null) {
          setPlayingVideoIndex(null);
        }
      },
      { threshold: 0 }
    );

    if (atelierSectionRef.current) {
      observer.observe(atelierSectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [playingVideoIndex]);

  return (
    <div className="bg-surface text-on-surface selection:bg-secondary/30">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 flex items-center px-6 md:px-12 py-3 md:py-4 justify-between transition-all duration-300">
        <div className="flex items-center">
          <div className="h-12 md:h-16 flex items-center">
            <img
              src="/assets/revive logo.png"
              alt="Revive Wardrobe Logo"
              className="h-full w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML =
                  '<div class="text-2xl font-serif font-bold tracking-tighter text-primary">REVIVE</div>';
              }}
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-12">
          <a
            href="#collection"
            className="font-serif tracking-widest uppercase text-[11px] hover:text-secondary transition-colors duration-500"
          >
            Collection
          </a>
          <a
            href="#story"
            className="font-serif tracking-widest uppercase text-[11px] hover:text-secondary transition-colors duration-500"
          >
            Revive Story
          </a>
          <a
            href="#bespoke"
            className="font-serif tracking-widest uppercase text-[11px] hover:text-secondary transition-colors duration-500"
          >
            Bespoke
          </a>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-primary p-2">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-surface border-b border-outline-variant/10 md:hidden flex flex-col p-8 gap-6 z-40"
            >
              <a
                href="#collection"
                onClick={() => setIsMenuOpen(false)}
                className="font-serif tracking-widest uppercase text-xs"
              >
                Collection
              </a>
              <a
                href="#story"
                onClick={() => setIsMenuOpen(false)}
                className="font-serif tracking-widest uppercase text-xs"
              >
                Revive Story
              </a>
              <a
                href="#bespoke"
                onClick={() => setIsMenuOpen(false)}
                className="font-serif tracking-widest uppercase text-xs"
              >
                Bespoke
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Section 1 — Hero */}
        <section className="relative h-[120vh] w-full flex items-end justify-center overflow-hidden">
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
            className="absolute inset-0 z-0 h-full"
          >
            <img
              alt="Cinematic high-fashion editorial of a woman in a luxurious red and gold abaya"
              className="w-full h-[120%] object-cover"
              src="/assets/hero.jpg"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
          </motion.div>

          <div className="relative z-10 text-center px-6 pb-40 max-w-5xl">
            <FadeIn>
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight tracking-tight">
                Not Made for Everyone.
                <br />
                Made for You.
              </h1>
              <p className="font-sans text-[10px] md:text-xs text-white/80 tracking-[0.4em] uppercase">
                A single design. A single owner.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Section 2 — Brand Value Proposition */}
        <section className="py-16 md:py-24 px-6 md:px-12 bg-surface">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: Diamond,
                title: 'Limited Edition Collections',
                desc: 'Every piece is carefully selected in limited quantities.',
              },
              {
                icon: Sparkles,
                title: 'Premium Fabrics',
                desc: 'Elegant materials chosen for comfort and sophistication.',
              },
              {
                icon: MapPin,
                title: 'Curated From Dubai',
                desc: 'Inspired by contemporary modest fashion trends.',
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center group">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-500">
                    <item.icon size={22} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-primary mb-3">{item.title}</h3>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed max-w-xs mx-auto">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Section 3 — The Curated Vault */}
        <section className="py-32 md:py-48 bg-surface-container-low" id="collection">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
              <FadeIn direction="right">
                <span className="font-sans text-xs tracking-[0.4em] uppercase text-secondary block mb-4">
                  New Release
                </span>
                <h2 className="font-serif text-5xl md:text-6xl text-primary font-bold">
                  The Curated Vault
                </h2>
              </FadeIn>
              <FadeIn direction="left">
                <a
                  href="https://revivewardrobe.com/shop/category/abaya"
                  className="group flex items-center gap-3 text-primary font-sans text-xs tracking-widest uppercase border-b border-primary pb-2 hover:text-secondary hover:border-secondary transition-all"
                >
                  Archive Access{' '}
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
              {[
                {
                  title: 'Aurora Blossom Abaya',
                  img: 'assets/Aurora Blossom Abaya/close.png',
                  offset: false,
                  link: 'https://revivewardrobe.com/product/aurora-blossom-abaya-l',
                },
                {
                  title: 'Noir Veil Elegance Abaya',
                  img: '/assets/Noir Veil Elegance Abaya/close.png',
                  offset: true,
                  link: 'https://revivewardrobe.com/product/noir-veil-elegance-abaya-l',
                },
                {
                  title: 'Regal Rhythm Abaya',
                  img: '/assets/Regal Rhythm Abaya/closeup.png',
                  offset: false,
                  link: 'https://revivewardrobe.com/product/regal-rhythm-abaya-l',
                },
                {
                  title: 'Royal Noor Embellished Abaya',
                  img: '/assets/Royal Noor Embellished Abaya/close.png',
                  offset: true,
                  link: 'https://revivewardrobe.com/product/royal-noor-embellished-abaya-l',
                },
              ].map((item, idx) => (
                <div key={idx} className={`flex flex-col gap-6 ${(idx === 1 || idx === 3) ? 'mt-70' : ''}`}>
                  <div className="group relative overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-auto display-block group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-primary font-serif text-2xl md:text-3xl font-bold tracking-tighter">
                      {item.title}
                    </h3>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-sans text-xs tracking-widest uppercase underline underline-offset-2 hover:text-secondary transition-all inline-block w-fit"
                    >
                      View Piece
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4 — Fashion In Motion */}
        <section ref={atelierSectionRef} className="py-32 md:py-48 bg-surface overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-20 text-center">
            <FadeIn>
              <span className="font-sans text-xs tracking-[0.4em] uppercase text-secondary mb-6 block">
                Visual Poetry
              </span>
              <h2 className="font-serif text-5xl md:text-6xl text-primary font-bold">
                Atelier in Motion
              </h2>
              <p className="mt-8 text-on-surface-variant text-lg font-light max-w-2xl mx-auto italic">
                Capturing the delicate dialogue between hand-stitched gold and flowing silk.
              </p>
            </FadeIn>
          </div>

          <div className="flex gap-8 px-6 md:px-12 pb-12 overflow-x-auto snap-x touch-pan-x cursor-grab active:cursor-grabbing scrollbar-hide">
            {[
              { video: '/videos/5th video.mp4', label: '01' },
              { video: '/videos/6th video.mp4', label: '02' },
              { video: '/videos/7th video.mp4', label: '03' },
              { video: '/videos/8th video.mp4', label: '04' },
              { video: '/videos/9th video.mp4', label: '05' },
              { video: '/videos/10th video.mp4', label: '06' },
              { video: '/videos/12th video.mp4', label: '07' },
              { video: '/videos/5th video.mp4', label: '08' },
            ].map((item, index) => (
              <div
                key={index}
                className="min-w-[300px] md:min-w-[450px] aspect-[9/16] bg-surface-container-high relative group overflow-hidden border border-outline-variant/10 shadow-2xl snap-center transition-all duration-700 hover:scale-[1.02]"
              >
                <video
                  ref={(video) => {
                    if (video && playingVideoIndex === index) {
                      video.play();
                    } else if (video) {
                      video.pause();
                    }
                  }}
                  src={item.video}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-[20px] md:border-[30px] border-transparent group-hover:border-surface/10 transition-all duration-700"></div>
                <button
                  onClick={() => {
                    setPlayingVideoIndex(playingVideoIndex === index ? null : index);
                  }}
                  className="absolute inset-0 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/20"
                >
                  <div className="bg-primary/80 p-4 rounded-full hover:bg-primary/100 transition-all">
                    {playingVideoIndex === index ? (
                      <Pause size={32} className="text-white" fill="white" />
                    ) : (
                      <Play size={32} className="text-white" fill="white" />
                    )}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5 — The Sovereign Collection */}
        <section className="py-32 md:py-48 bg-surface" id="sovereign-collection">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="text-center mb-24">
              <FadeIn>
                <span className="font-sans text-xs tracking-[0.4em] uppercase text-secondary mb-4 block">
                  Limited Sovereignty
                </span>
                <h2 className="font-serif text-5xl md:text-7xl text-primary font-bold tracking-tighter">
                  The Sovereign Collection
                </h2>
              </FadeIn>
            </div>

            <div className="masonry-grid" style={{ columnCount: 3, columnGap: '1rem' }}>
              {[
                {
                  title: 'Aurora Blossom Abaya',
                  img: '/assets/Aurora Blossom Abaya/long.jpeg',
                },
                {
                  title: 'Twilight Grace Abaya',
                  img: '/assets/Twilight Grace Abaya/Closeup.png',
                },
                {
                  title: 'Midnight Elegance Abaya',
                  img: '/assets/Midnight Elegance Abaya/close.png',
                },
                {
                  title: 'Regal Rhythm Abaya',
                  img: '/assets/Regal Rhythm Abaya/closeup.png',
                },
                {
                  title: 'Lunar Glow Abaya',
                  img: '/assets/close.png',
                },
                {
                  title: 'Eternal Noir Abaya',
                  img: '/assets/Eternal Noir Abaya/long.jpg',
                },
              ].map((item, idx) => (
                <div key={idx} style={{ breakInside: 'avoid', marginBottom: '1rem' }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6 — Founder Story */}
        <section className="py-20 md:py-32 px-6 md:px-12 bg-surface" id="story">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 md:gap-20 items-center">
            <div className="w-full lg:w-5/12">
              <FadeIn direction="right">
                <div className="relative overflow-hidden aspect-[3/4]">
                  <div className="absolute inset-0 border border-gold/20 z-10 pointer-events-none"></div>
                  <img
                    alt="Rukhsana Shaik — Founder of Revive Wardrobe"
                    className="w-full h-full object-cover"
                    src="/assets/R-icon-f.png"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </FadeIn>
            </div>

            <div className="w-full lg:w-7/12 space-y-8 text-center lg:text-left">
              <FadeIn direction="left">
                <span className="font-sans text-xs tracking-[0.4em] uppercase text-gold block mb-3">
                  The Vision Behind Revive Wardrobe
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-primary leading-[1.15] font-bold tracking-tight">
                  The Vision Behind
                  <br />
                  Revive Wardrobe
                </h2>
                <div className="h-px w-16 bg-gold/40 my-8 hidden lg:block" />
                <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed font-light">
                  Revive Wardrobe was born from Rukhsana Shaik&apos;s passion for modest fashion,
                  timeless elegance, and thoughtfully curated collections. Every abaya and jalabiya is
                  carefully selected to reflect sophistication, comfort, and individuality, bringing
                  together pieces that help women express confidence through graceful style.
                </p>
                <div className="pt-8">
                  <a href="https://revivewardrobe.com/about" className="inline-flex items-center gap-4 group">
                    <span className="font-sans text-xs tracking-[0.25em] uppercase border-b border-gold pb-1.5 text-gold group-hover:text-gold-dark group-hover:border-gold-dark transition-all">
                      Read Our Story
                    </span>
                    <ArrowRight size={14} className="text-gold group-hover:translate-x-2 transition-transform" />
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Section 7 — Testimonials */}
        <section className="py-20 md:py-32 bg-surface-container-low">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <FadeIn>
                <span className="font-sans text-xs tracking-[0.4em] uppercase text-gold mb-3 block">
                  Testimonials
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold">
                  Loved By Women Who Value Elegance
                </h2>
              </FadeIn>
            </div>

            <div className="hidden md:grid md:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((item, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <div className="bg-surface p-8 border border-gold-light/20 h-full flex flex-col">
                    <div className="flex gap-1 mb-5">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} size={14} className="fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="font-serif text-base text-on-surface italic leading-relaxed flex-1 mb-6">
                      &ldquo;{item.text}&rdquo;
                    </p>
                    <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold font-medium">
                      {item.name}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar -mx-6 px-6 pb-4">
              {testimonials.map((item, idx) => (
                <div key={idx} className="min-w-[290px] snap-start bg-surface p-6 border border-gold-light/20">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} size={12} className="fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="font-serif text-sm text-on-surface italic leading-relaxed mb-5">
                    &ldquo;{item.text}&rdquo;
                  </p>
                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold font-medium">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 8 — Instagram Gallery */}
        <section className="py-20 md:py-32 bg-surface">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
              <FadeIn direction="right">
                <span className="font-sans text-xs tracking-[0.4em] uppercase text-gold block mb-3">
                  Social
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold">
                  Styled By Our Community
                </h2>
              </FadeIn>
              <FadeIn direction="left">
                <a
                  href="https://www.instagram.com/premium.abayas.uae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 text-xs tracking-[0.25em] uppercase font-medium hover:bg-primary-light transition-all duration-500"
                >
                  <Instagram size={16} /> Follow Us
                </a>
              </FadeIn>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
              {instagramPosts.map((img, idx) => (
                <a
                  key={idx}
                  href="https://www.instagram.com/premium.abayas.uae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-square overflow-hidden group relative"
                >
                  <img
                    src={img}
                    alt="Instagram post"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                    <Instagram
                      size={20}
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Section 9 — Final CTA */}
        <section className="relative py-32 md:py-48 overflow-hidden bg-primary" id="bespoke">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 -skew-x-12 transform translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-px bg-gold/20"></div>
          <div className="max-w-3xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
            <FadeIn>
              <h2 className="font-serif text-4xl md:text-6xl text-white mb-8 font-bold tracking-tight">
                Discover Your Signature Style
              </h2>
              <p className="max-w-lg mx-auto text-white/70 text-base md:text-lg font-light mb-12 leading-relaxed">
                Explore exclusive abayas and jalabiyas designed for women who appreciate timeless elegance and refined craftsmanship.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://revivewardrobe.com/shop/category/abaya"
                  className="inline-flex items-center justify-center bg-gold text-primary-light px-12 py-4.5 text-xs tracking-[0.3em] uppercase font-semibold hover:bg-gold-dark hover:text-white transition-all duration-500"
                >
                  Shop Collection <ArrowRight size={14} className="ml-2" />
                </a>
                <a
                  href="tel:+971582447684"
                  className="inline-flex items-center justify-center border border-white/30 text-white px-12 py-4.5 text-xs tracking-[0.3em] uppercase font-medium hover:bg-white/10 transition-all duration-500"
                >
                  Contact Us
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-outline-variant/10 bg-surface-container-low px-6 md:px-12 pt-20 md:pt-32 pb-8 flex flex-col items-center gap-16">
        <div className="text-4xl md:text-5xl font-serif font-bold tracking-[0.1em] text-primary">
          REVIVE WARDROBE
        </div>

        <div className="flex gap-10">
          <a
            href="https://www.instagram.com/premium.abayas.uae?igsh=MW9wcm42d3BtaWQwZg%3D%3D"
            className="hover:opacity-70 transition-opacity"
            style={{ color: '#610000' }}
          >
            <Instagram size={32} strokeWidth={2} />
          </a>
          <a
            href="https://www.facebook.com/revivewardrobe/"
            className="hover:opacity-70 transition-opacity"
            style={{ color: '#610000' }}
          >
            <Facebook size={32} strokeWidth={2} />
          </a>
          <a href="tel:+971582447684" className="hover:opacity-70 transition-opacity" style={{ color: '#610000' }}>
            <Phone size={32} strokeWidth={2} />
          </a>
        </div>

        <div className="font-sans text-[10px] tracking-[0.3em] uppercase text-outline/50 border-t border-outline-variant/10 pt-16 w-full text-center">
          © {new Date().getFullYear()} REVIVE WARDROBE. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}
