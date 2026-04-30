'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Camera, Mail, ArrowRight, Menu, X, Instagram, ChevronRight, PenTool } from 'lucide-react';

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
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);

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
                Not Made for Everyone.<br/>Made for You.
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
                <a href="#" className="group flex items-center gap-3 text-primary font-sans text-xs tracking-widest uppercase border-b border-primary pb-2 hover:text-secondary hover:border-secondary transition-all">
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
                <div key={idx} className={`group ${item.offset ? 'md:mt-32' : ''}`}>
                  <FadeIn delay={idx * 0.1}>
                    <div className="relative overflow-hidden mb-8 aspect-[3/4]">
                      <img 
                        alt={item.title} 
                        className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110"
                        src={item.img}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-md px-4 py-2">
                        <span className="text-[10px] font-sans tracking-widest uppercase text-primary font-bold">Only One Piece</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-serif text-xl text-primary font-bold tracking-tight">{item.title}</h3>
                      <button 
                        className="inline-block pt-4 text-[10px] font-sans tracking-widest uppercase border-b border-outline-variant hover:border-primary transition-all hover:cursor-pointer"
                        onClick={() => window.location.href = item.link}
                      >
                        View Piece
                      </button>
                    </div>
                  </FadeIn>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[800px]">
              {/* Large Card */}
              <div className="relative group overflow-hidden cursor-pointer h-full">
                <ParallaxSection offset={40} className="h-full">
                  <FadeIn direction="right" className="h-full">
                    <img 
                      src="/assets/Twilight Grace Abaya/long.png" 
                      alt="Sovereign Look 1" 
                      className="w-full h-[110%] object-cover transition-transform duration-1000 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                    <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 translate-y-[20px] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out bg-gradient-to-t from-primary/80 to-transparent">
                      <h3 className="font-serif text-3xl md:text-4xl text-white font-bold mb-2">The Ethereal Sovereign</h3>
                      <p className="text-white/80 font-sans text-xs tracking-[0.3em] uppercase">One Piece Exclusively</p>
                    </div>
                  </FadeIn>
                </ParallaxSection>
              </div>

              {/* Stacked Cards */}
              <div className="grid grid-rows-2 gap-8 h-full">
                <div className="relative group overflow-hidden cursor-pointer h-full">
                  <FadeIn direction="left" delay={0.2} className="h-full">
                    <img 
                      src="https://lh3.googleusercontent.com/aida/ADBb0ujWmsIppX-p1Mj3a4Zeiizoctdl2F-yZwoXVK8LLbbkWmhL6ZOKHwnk6PUGVZOXU2SixN9orJH1nMg9SEYx8iYyRjR8jhwaW_q-3YYMfXvZha4LUJlu-L3Atj_UZhKfnZQnvQT7uxdRgxsjdrudusmKQaBP8NwbZ_8c8WR0brUbubHJgQPTmUPZsTDrXpj1A4-567-1i31oSFsR1gXcBj02t0Y26mXOrLcJUTifJbk2tRZrkd-59hgtIQ" 
                      alt="Sovereign Look 2" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                    <div className="absolute inset-x-0 bottom-0 p-8 translate-y-[20px] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out bg-gradient-to-t from-primary/80 to-transparent">
                      <h3 className="font-serif text-2xl md:text-3xl text-white font-bold">Desert Mirage Silk</h3>
                    </div>
                  </FadeIn>
                </div>
                <div className="relative group overflow-hidden cursor-pointer h-full">
                  <FadeIn direction="left" delay={0.3} className="h-full">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhganZTwYj91PqFHKYAeQQBfTOyXZ7PWlUMT9NpmFN8rgmkGqunFIG7EPhP1T9ef1stmI4rW0cbcnSoXJqlYGodf7TFiTthEvM_0pQ7DezhzxSgCQuUS2oLYGfDzsyz3UTws5gczDq8mylAL32i4TR3UFlym3oUXGQUfNdly90OvueNXlbHujmA-dRoX0AuiJK_QGQGJEmdWv3zRBPe1J0qZZBtAcH9F1RKQCf4RQ-MOVObDS0YvxUVDjV1-sZSIMIhL1DOBhjfn0" 
                      alt="Sovereign Look 3" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                    <div className="absolute inset-x-0 bottom-0 p-8 translate-y-[20px] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out bg-gradient-to-t from-primary/80 to-transparent">
                      <h3 className="font-serif text-2xl md:text-3xl text-white font-bold">Onyx Dynasty Wrap</h3>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Atelier in Motion */}
        <section className="py-32 md:py-48 bg-surface overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-20 text-center">
            <FadeIn>
              <span className="font-sans text-xs tracking-[0.4em] uppercase text-secondary mb-6 block">Visual Poetry</span>
              <h2 className="font-serif text-5xl md:text-6xl text-primary font-bold">Atelier in Motion</h2>
              <p className="mt-8 text-on-surface-variant text-lg font-light max-w-2xl mx-auto italic">Capturing the delicate dialogue between hand-stitched gold and flowing silk.</p>
            </FadeIn>
          </div>
          
          <div className="flex overflow-x-auto gap-8 px-6 md:px-12 pb-12 hide-scrollbar snap-x touch-pan-x cursor-grab active:cursor-grabbing">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="min-w-[300px] md:min-w-[450px] aspect-[9/16] bg-surface-container-high relative group overflow-hidden border border-outline-variant/10 shadow-2xl snap-center transition-all duration-700 hover:scale-[1.02]"
              >
                <img 
                  src={`https://picsum.photos/seed/abaya${i}/1080/1920`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  alt={`Motion Frame ${i}`} 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 border-[20px] md:border-[30px] border-transparent group-hover:border-surface/10 transition-all duration-700"></div>
                <div className="absolute bottom-10 left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                  <span className="text-white font-sans text-[10px] tracking-widest uppercase bg-primary/40 backdrop-blur-md px-6 py-3">View Perspective 0{i}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Designer Profile */}
        <section className="bg-surface-container-low py-32 md:py-48 px-6 md:px-12" id="story">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 md:gap-32 items-center">
            <div className="w-full lg:w-5/12 relative order-2 lg:order-1">
              <FadeIn direction="right">
                <div className="absolute -top-12 -left-12 w-48 h-48 border border-secondary/20 hidden lg:block"></div>
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img 
                    alt="Rukhsana Shaik Portrait" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-bZMaXtGgz8U-BwpVvug3ok8_AGTl23YRvJgfqt8a8YHfJdezGo70ohrCDICGXpoIPiNf-EzpULSYm2M5pd-b0ouuFtKCg2vnPO3E142ZaM3CSYR0Zaqtsj_jyeBn8-WrEbUgUqfloopNDs89ouaMkTEFXRu_rPMo146IfIQKLqSP6W1iqljgdg44czAUSAMcYJ9ZdW1zbU5mI_11IF-YAeJdUIhl-sS3KtAgtcYWM96iQVMiMh6Ipw3Y_nBHuvI4SGYF-AsgviQ"
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
        </section>

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
              <p className="max-w-xl text-on-surface-variant text-lg md:text-xl font-light mb-16 leading-relaxed">
                If our current collection has already found its owners, Rukhsana Shaik offers private commissions. We will design a piece exclusively for your silhouette and spirit.
              </p>
              <div className="flex flex-col md:flex-row gap-8 w-full md:w-auto">
                <button className="bg-primary text-white px-12 md:px-16 py-6 text-xs tracking-[0.3em] uppercase font-bold hover:bg-primary-container transition-all hover:scale-[1.05]">
                  Request a Custom Piece
                </button>
                <button className="border border-primary text-primary px-12 md:px-16 py-6 text-xs tracking-[0.3em] uppercase font-bold hover:bg-primary hover:text-white transition-all hover:scale-[1.05]">
                  Consultation
                </button>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-outline-variant/10 bg-surface-container-low px-6 md:px-12 py-20 md:py-32 flex flex-col items-center gap-16">
        <div className="text-4xl md:text-5xl font-serif font-bold tracking-[0.1em] text-primary">REVIVE WARDROBE</div>
        
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
          {['Collection', 'Story', 'Legal', 'Archive'].map((item) => (
            <a key={item} href="#" className="font-sans text-[10px] tracking-[0.3em] uppercase text-outline hover:text-secondary transition-all">
              {item}
            </a>
          ))}
        </div>

        <div className="flex gap-10">
          <a href="#" className="text-secondary hover:opacity-70 transition-opacity"><Instagram size={24} strokeWidth={1} /></a>
          <a href="#" className="text-secondary hover:opacity-70 transition-opacity"><Camera size={24} strokeWidth={1} /></a>
          <a href="#" className="text-secondary hover:opacity-70 transition-opacity"><Mail size={24} strokeWidth={1} /></a>
        </div>

        <div className="font-sans text-[10px] tracking-[0.3em] uppercase text-outline/50 border-t border-outline-variant/10 pt-16 w-full text-center">
          © {new Date().getFullYear()} THE EDITORIAL GALLERY. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}
