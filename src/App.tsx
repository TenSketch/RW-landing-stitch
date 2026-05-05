'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Facebook, Phone, ArrowRight, Menu, X, Instagram, ChevronRight, PenTool, Play, Pause } from 'lucide-react';

const FadeIn = ({ children, delay = 0, direction = 'up', className = "" }: { children: React.ReactNode, delay?: number, direction?: 'up' | 'down' | 'left' | 'right', className?: string }) => {
  const getInitial = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 40 };
      case 'down': return { opacity: 0, y: -40 };
      case 'left': return { opacity: 0, x: 40 };
      case 'right': return { opacity: 0, x: -40 };
      default: return { opacity: 0, y: 40 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ParallaxSection = ({ children, offset = 50, className = "" }: { children: React.ReactNode, offset?: number, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
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

  // Stop video when Atelier section goes out of view
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
          {/* Logo Attached */}
          <div className="h-12 md:h-16 flex items-center">
            <img
              src="/assets/revive logo.png"
              alt="Revive Wardrobe Logo"
              className="h-full w-auto object-contain"
              onError={(e) => {
                // Fallback if the URL isn't working or provided yet
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<div class="text-2xl font-serif font-bold tracking-tighter text-primary">REVIVE</div>';
              }}
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-12">
          <a href="#collection" className="font-serif tracking-widest uppercase text-[11px] hover:text-secondary transition-colors duration-500">Collection</a>
          <a href="#story" className="font-serif tracking-widest uppercase text-[11px] hover:text-secondary transition-colors duration-500">Revive Story</a>
          <a href="#bespoke" className="font-serif tracking-widest uppercase text-[11px] hover:text-secondary transition-colors duration-500">Bespoke</a>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-primary p-2"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-surface border-b border-outline-variant/10 md:hidden flex flex-col p-8 gap-6 z-40"
            >
              <a href="#collection" onClick={() => setIsMenuOpen(false)} className="font-serif tracking-widest uppercase text-xs">Collection</a>
              <a href="#story" onClick={() => setIsMenuOpen(false)} className="font-serif tracking-widest uppercase text-xs">Revive Story</a>
              <a href="#bespoke" onClick={() => setIsMenuOpen(false)} className="font-serif tracking-widest uppercase text-xs">Bespoke</a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Cinematic Hero */}
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
                Not Made for Everyone.<br />Made for You.
              </h1>
              <p className="font-sans text-[10px] md:text-xs text-white/80 tracking-[0.4em] uppercase">
                A single design. A single owner.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* The Statement */}
        <section className="py-32 md:py-48 px-6 md:px-12 bg-surface text-center overflow-hidden">
          <ParallaxSection offset={80}>
            <div className="max-w-4xl mx-auto">
              <FadeIn>
                <span className="text-secondary font-sans text-xs tracking-[0.4em] uppercase mb-8 block">Exclusivity Defined</span>
                <h2 className="font-serif text-4xl md:text-7xl text-primary mb-12 italic leading-[1.1]">
                  Every design exists only once.
                </h2>
                <p className="font-sans text-on-surface-variant text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
                  In a world of mass production, we offer the antidote. Each piece in our curation is a singular masterpiece, handcrafted to be owned by one individual globally. Once acquired, the design is retired forever.
                </p>
              </FadeIn>
            </div>
          </ParallaxSection>
        </section>

        {/* Featured Collection */}
        <section className="py-32 md:py-48 bg-surface-container-low" id="collection">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
              <FadeIn direction="right">
                <span className="font-sans text-xs tracking-[0.4em] uppercase text-secondary block mb-4">New Release</span>
                <h2 className="font-serif text-5xl md:text-6xl text-primary font-bold">The Curated Vault</h2>
              </FadeIn>
              <FadeIn direction="left">
                <a href="https://revivewardrobe.com/shop/category/graceful-abayas" className="group flex items-center gap-3 text-primary font-sans text-xs tracking-widest uppercase border-b border-primary pb-2 hover:text-secondary hover:border-secondary transition-all">
                  Archive Access <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
              {[{
                title: "Aurora Blossom Abaya",
                img: "assets/Aurora Blossom Abaya/close.png",
                offset: false,
                link: "https://revivewardrobe.com/product/aurora-blossom-abaya"
              },
              {
                title: "Twilight Grace Abaya",
                img: "/assets/Twilight Grace Abaya/Closeup.png",
                offset: true,
                link: "https://revivewardrobe.com/product/twilight-grace-abaya"
              },
              {
                title: "Midnight Elegance Abaya",
                img: "/assets/Midnight Elegance Abaya/close.png",
                offset: true,
                link: "https://revivewardrobe.com/product/midnight-elegance-abaya"
              },
              {
                title: "Regal Rhythm Abaya",
                img: "/assets/Regal Rhythm Abaya/closeup.png",
                offset: false,
                link: "https://revivewardrobe.com/product/regal-rhythm-abaya"
              }].map((item, idx) => (
                <div key={idx} className={`flex flex-col gap-6 ${(idx === 1 || idx === 3) ? 'mt-50' : ''}`}>
                  <div className="group relative overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-auto display-block group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-primary font-serif text-2xl md:text-3xl font-bold tracking-tighter">{item.title}</h3>
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

        {/* Bento Grid: Sovereign Collection */}
        <section className="py-32 md:py-48 bg-surface">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="text-center mb-24">
              <FadeIn>
                <span className="font-sans text-xs tracking-[0.4em] uppercase text-secondary mb-4 block">Limited Sovereignty</span>
                <h2 className="font-serif text-5xl md:text-7xl text-primary font-bold tracking-tighter">The Sovereign Collection</h2>
              </FadeIn>
            </div>

            {/* Mobile: auto-scrolling carousel */}
            <div className="sovereign-mobile-carousel md:hidden">
              <div className="sovereign-scroll-track">
                {[
                  { title: "Aurora Blossom Abaya", img: "/assets/Aurora Blossom Abaya/long.jpeg" },
                  { title: "Twilight Grace Abaya", img: "/assets/Twilight Grace Abaya/Closeup.png" },
                  { title: "Midnight Elegance Abaya", img: "/assets/Midnight Elegance Abaya/close.png" },
                  { title: "Regal Rhythm Abaya", img: "/assets/Regal Rhythm Abaya/closeup.png" },
                  { title: "Lunar Glow Abaya", img: "/assets/close.png" },
                  { title: "Eternal Noir Abaya", img: "/assets/Eternal Noir Abaya/long.jpg" },
                  /* Duplicate for seamless loop */
                  { title: "Aurora Blossom Abaya", img: "/assets/Aurora Blossom Abaya/long.jpeg" },
                  { title: "Twilight Grace Abaya", img: "/assets/Twilight Grace Abaya/Closeup.png" },
                  { title: "Midnight Elegance Abaya", img: "/assets/Midnight Elegance Abaya/close.png" },
                  { title: "Regal Rhythm Abaya", img: "/assets/Regal Rhythm Abaya/closeup.png" },
                  { title: "Lunar Glow Abaya", img: "/assets/close.png" },
                  { title: "Eternal Noir Abaya", img: "/assets/Eternal Noir Abaya/long.jpg" },
                ].map((item, idx) => (
                  <div key={idx} className="sovereign-scroll-item">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="sovereign-scroll-img"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Tablet & Desktop: masonry grid */}
            <div className="masonry-grid hidden md:block" style={{ columnCount: 3, columnGap: '1rem' }}>
              {[{
                title: "Aurora Blossom Abaya",
                img: "/assets/Aurora Blossom Abaya/long.jpeg",
              },
              {
                title: "Twilight Grace Abaya",
                img: "/assets/Twilight Grace Abaya/Closeup.png",
              },
              {
                title: "Midnight Elegance Abaya",
                img: "/assets/Midnight Elegance Abaya/close.png",
              },
              {
                title: "Regal Rhythm Abaya",
                img: "/assets/Regal Rhythm Abaya/closeup.png",
              },
              {
                title: "Lunar Glow Abaya",
                img: "/assets/close.png",
              },
              {
                title: "Eternal Noir Abaya",
                img: "/assets/Eternal Noir Abaya/long.jpg",
              }].map((item, idx) => (
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

        {/* Atelier in Motion */}
        <section ref={atelierSectionRef} className="py-16 md:py-24 bg-surface overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-20 text-center">
            <FadeIn>
              <span className="font-sans text-xs tracking-[0.4em] uppercase text-secondary mb-6 block">Visual Poetry</span>
              <h2 className="font-serif text-5xl md:text-6xl text-primary font-bold">Atelier in Motion</h2>
              <p className="mt-8 text-on-surface-variant text-lg font-light max-w-2xl mx-auto italic">Capturing the delicate dialogue between hand-stitched gold and flowing silk.</p>
            </FadeIn>
          </div>

          <div className="flex gap-4 px-6 md:px-10 pb-8 overflow-x-auto hide-scrollbar snap-x snap-mandatory touch-pan-x cursor-grab active:cursor-grabbing">
            {[
              { video: '/videos/5th video.mp4', label: '01' },
              { video: '/videos/6th video.mp4', label: '02' },
              { video: '/videos/7th video.mp4', label: '03' },
              { video: '/videos/8th video.mp4', label: '04' },
              { video: '/videos/9th video.mp4', label: '05' },
              { video: '/videos/10th video.mp4', label: '06' },
              { video: '/videos/12th video.mp4', label: '07' },
              { video: '/videos/5th video.mp4', label: '08' }
            ].map((item, index) => (
              <div
                key={index}
                className="flex-none h-[45vh] md:h-[80vh] aspect-[9/16] bg-surface-container-high relative group overflow-hidden border border-outline-variant/10 shadow-2xl snap-center transition-all duration-700 hover:scale-[1.02]"
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

        {/* Designer Profile 
        <section className="bg-surface-container-low py-32 md:py-48 px-6 md:px-12" id="story">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 md:gap-32 items-center">
            <div className="w-full lg:w-5/12 relative order-2 lg:order-1">
              <FadeIn direction="right">
                <div className="absolute -top-12 -left-12 w-48 h-48 border border-secondary/20 hidden lg:block"></div>
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    alt="Rukhsana Shaik Portrait"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    src="/assets/R-icon-f.png"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-secondary p-8 z-20 hidden lg:flex items-center justify-center text-white">
                  <PenTool size={32} strokeWidth={1} />
                </div>
              </FadeIn>
            </div>

            <div className="w-full lg:w-7/12 space-y-10 order-1 lg:order-2 text-center lg:text-left">
              <FadeIn direction="left">
                <span className="font-sans text-xs tracking-[0.4em] uppercase text-outline block mb-6">The Creative Mind</span>
                <h2 className="font-serif text-5xl md:text-7xl text-primary leading-[1.1] font-bold tracking-tight">Designed by Dubai’s Celebrity Fashion Designer Rukhsana Shaik</h2>
                <div className="h-1 w-20 bg-secondary/30 my-10 hidden lg:block" />
                <p className="text-on-surface-variant text-xl md:text-2xl leading-relaxed font-light italic mb-8">
                  "Luxury isn't about excess; it's about uniqueness. When I create a piece for Revive Wardrobe, I am creating a story that will only ever be told once, by one woman."
                </p>
                <p className="text-on-surface text-lg font-light leading-relaxed max-w-2xl">
                  With over two decades of defining high-fashion in the Emirates, Rukhsana Shaik brings an unparalleled eye for detail and cultural fusion. Her designs are collected, not just bought.
                </p>
                <div className="pt-12">
                  <a href="#" className="inline-flex items-center gap-6 group">
                    <span className="font-sans text-sm tracking-[0.2em] uppercase border-b border-primary pb-2 group-hover:text-secondary group-hover:border-secondary transition-all">Our Full Story</span>
                    <ArrowRight className="text-primary group-hover:translate-x-3 transition-transform" />
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </section> *}

        {/* Scrolling Marquee */}
        <section className="py-24 bg-primary overflow-hidden border-y border-white/10">
          <div className="flex whitespace-nowrap scrolling-text">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-20 px-10">
                <span className="font-serif text-6xl md:text-8xl text-outline-variant/20 uppercase italic font-black">Every design exists only once</span>
                <span className="w-12 h-12 rounded-full border border-secondary flex items-center justify-center text-secondary">✦</span>
                <span className="font-serif text-6xl md:text-8xl text-outline-variant/20 uppercase italic font-black">Your wardrobe is your gallery</span>
                <span className="w-12 h-12 rounded-full border border-secondary flex items-center justify-center text-secondary">✦</span>
              </div>
            ))}
          </div>
        </section>

        {/* Bespoke Legacy */}
        <section className="relative py-40 md:py-60 overflow-hidden bg-surface-container" id="bespoke">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-surface-container-low opacity-20 -skew-x-12 transform translate-x-1/2"></div>
          <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
            <FadeIn>
              <h2 className="font-serif text-5xl md:text-8xl text-primary mb-10 font-bold tracking-tighter">A Bespoke Legacy</h2>
              <p className="max-w-xl mx-auto text-on-surface-variant text-lg md:text-xl font-light mb-16 leading-relaxed">
                If our current collection has already found its owners, Rukhsana Shaik offers private commissions. We will design a piece exclusively for your silhouette and spirit.
              </p>
              <div className="flex flex-col md:flex-row gap-8 w-full md:w-auto justify-center">
                <button className="bg-primary text-white px-12 md:px-16 py-6 text-xs tracking-[0.3em] uppercase font-bold hover:bg-primary-container transition-all hover:scale-[1.05]">
                  Grab your unique piece
                </button>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-outline-variant/10 bg-surface-container-low px-6 md:px-12 pt-20 md:pt-32 pb-8 flex flex-col items-center gap-16">
        <div className="text-4xl md:text-5xl font-serif font-bold tracking-[0.1em] text-primary">REVIVE WARDROBE</div>


        <div className="flex gap-10">
          <a href="https://www.instagram.com/premium.abayas.uae?igsh=MW9wcm42d3BtaWQwZg%3D%3D" className="hover:opacity-70 transition-opacity" style={{ color: '#610000' }}><Instagram size={32} strokeWidth={2} /></a>
          <a href="https://www.facebook.com/revivewardrobe/" className="hover:opacity-70 transition-opacity" style={{ color: '#610000' }}><Facebook size={32} strokeWidth={2} /></a>
          <a href="tel:+971582447684" className="hover:opacity-70 transition-opacity" style={{ color: '#610000' }}><Phone size={32} strokeWidth={2} /></a>
        </div>

        <div className="font-sans text-[10px] tracking-[0.3em] uppercase text-outline/50 border-t border-outline-variant/10 pt-16 w-full text-center">
          © {new Date().getFullYear()} REVIVE WARDROBE. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}
