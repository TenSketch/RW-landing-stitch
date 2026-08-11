'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import products from './data/products.json';
import content from './data/content.json';
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
  Volume2,
  VolumeX,
  Maximize2,
  Check,
  RotateCcw,
  Lock,
  ShieldCheck,
  ChevronLeft,
  Truck,
  CreditCard,
  RotateCw,
  Gift,
  Plus,
  Minus,
  Info,
  Calendar,
  Percent,
  Heart,
  ShoppingCart,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';

const iconMap: { [key: string]: any } = {
  Truck,
  CreditCard,
  RotateCw,
  Lock,
  Gift,
  PenTool,
  ShieldCheck,
  Diamond,
  Sparkles
};

const heroSlides = [
  { type: 'video', src: '/videos/5th video.mp4', name: 'Garden Glow Embellished Jalabiya' },
  { type: 'image', src: '/assets/Aurora Blossom Abaya/long.jpeg', name: 'Aurora Blossom Abaya' },
  { type: 'video', src: '/videos/6th video.mp4', name: 'Noor Al Layl Abaya' },
  { type: 'image', src: '/assets/Noir Veil Elegance Abaya/long.png', name: 'Noir Veil Elegance Abaya' },
  { type: 'video', src: '/videos/7th video.mp4', name: 'Layali Tassel Grace Abaya' },
  { type: 'image', src: '/assets/Royal Noor Embellished Abaya/long.png', name: 'Royal Noor Embellished Abaya' }
];

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



const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 14, seconds: 23 });

  useEffect(() => {
    const target = new Date();
    target.setHours(target.getHours() + 8);
    target.setMinutes(target.getMinutes() + 14);
    target.setSeconds(target.getSeconds() + 23);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target.getTime() - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="flex gap-2 font-mono text-base md:text-lg font-bold text-gold">
      <div className="bg-primary/20 border border-gold/35 px-2.5 py-1 min-w-[36px] text-center rounded-sm">
        {formatNumber(timeLeft.hours)}
      </div>
      <span className="self-center text-primary">:</span>
      <div className="bg-primary/20 border border-gold/35 px-2.5 py-1 min-w-[36px] text-center rounded-sm">
        {formatNumber(timeLeft.minutes)}
      </div>
      <span className="self-center text-primary">:</span>
      <div className="bg-primary/20 border border-gold/35 px-2.5 py-1 min-w-[36px] text-center rounded-sm">
        {formatNumber(timeLeft.seconds)}
      </div>
    </div>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('.cursor-pointer') ||
        target.classList.contains('cursor-pointer');
      setIsHovered(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
    return null;
  }

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-gold pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovered ? 1.5 : 1})`,
          backgroundColor: isHovered ? 'rgba(201, 169, 110, 0.15)' : 'transparent',
        }}
      />
      <div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-gold pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      />
    </>
  );
};

const ConciergeWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-6 z-[90] flex flex-col items-end gap-3 font-sans" style={{ bottom: '5rem' }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="bg-surface border border-gold/20 shadow-2xl p-6 w-72 flex flex-col gap-4 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] relative">
                <Sparkles size={18} className="text-gold" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-surface" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Luxury Concierge</h4>
                <p className="text-[10px] text-outline">Tailoring & Styling Advice</p>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant font-light leading-relaxed">
              Hello. I am here to assist you with bespoke sizing, fabric choice, or reserving a piece. Feel free to connect directly with me.
            </p>
            <a
              href="https://wa.me/971582447684?text=Hi%20Revive%20Wardrobe,%20I%20would%20like%20to%20consult%20regarding%20modest%20fashion%20styling."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba56] text-white py-2.5 px-4 text-[10px] tracking-widest uppercase font-bold text-center flex items-center justify-center gap-2 transition-colors rounded-sm"
            >
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="currentColor"
                className="text-white"
              >
                <path d="M12.031 2a9.967 9.967 0 0 0-9.97 9.97c0 1.83.498 3.554 1.353 5.05L2 22l5.12-1.339a9.907 9.907 0 0 0 4.908 1.309c5.498 0 9.97-4.473 9.97-9.97S17.528 2 12.031 2zm0 18.294a8.276 8.276 0 0 1-4.218-1.157l-.301-.18-3.136.82.834-3.056-.197-.314a8.273 8.273 0 0 1-1.272-4.437c0-4.577 3.725-8.301 8.306-8.301 4.578 0 8.303 3.724 8.303 8.302 0 4.578-3.725 8.303-8.303 8.303z"/>
                <path d="M16.924 14.153c-.27-.136-1.593-.787-1.84-.877-.247-.09-.427-.136-.607.136-.18.27-.697.877-.854 1.057-.157.18-.314.202-.584.067-.27-.136-1.14-.42-2.172-1.341-.803-.715-1.345-1.6-1.502-1.87-.157-.27-.017-.417.118-.552.122-.122.27-.314.405-.472.136-.157.18-.27.27-.45.09-.18.045-.337-.022-.472-.067-.136-.607-1.462-.832-2.004-.22-.529-.44-.457-.607-.466-.157-.008-.337-.008-.517-.008a.99.99 0 0 0-.72.337c-.247.27-.944.922-.944 2.249s.966 2.61 1.1 2.79c.136.18 1.9 2.901 4.6 4.069.642.278 1.144.444 1.534.569.646.205 1.233.176 1.697.107.518-.078 1.593-.652 1.819-1.282.225-.63.225-1.17.157-1.282-.068-.112-.247-.202-.518-.338z"/>
              </svg> Start Consultation
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] text-white hover:bg-[#20ba56] rounded-full flex items-center justify-center shadow-2xl border border-white/10 hover:scale-105 transition-all group relative cursor-pointer"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gold rounded-full border-2 border-surface animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gold rounded-full border-2 border-surface" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <svg
                viewBox="0 0 24 24"
                width="26"
                height="26"
                fill="currentColor"
                className="text-white"
              >
                <path d="M12.031 2a9.967 9.967 0 0 0-9.97 9.97c0 1.83.498 3.554 1.353 5.05L2 22l5.12-1.339a9.907 9.907 0 0 0 4.908 1.309c5.498 0 9.97-4.473 9.97-9.97S17.528 2 12.031 2zm0 18.294a8.276 8.276 0 0 1-4.218-1.157l-.301-.18-3.136.82.834-3.056-.197-.314a8.273 8.273 0 0 1-1.272-4.437c0-4.577 3.725-8.301 8.306-8.301 4.578 0 8.303 3.724 8.303 8.302 0 4.578-3.725 8.303-8.303 8.303z"/>
                <path d="M16.924 14.153c-.27-.136-1.593-.787-1.84-.877-.247-.09-.427-.136-.607.136-.18.27-.697.877-.854 1.057-.157.18-.314.202-.584.067-.27-.136-1.14-.42-2.172-1.341-.803-.715-1.345-1.6-1.502-1.87-.157-.27-.017-.417.118-.552.122-.122.27-.314.405-.472.136-.157.18-.27.27-.45.09-.18.045-.337-.022-.472-.067-.136-.607-1.462-.832-2.004-.22-.529-.44-.457-.607-.466-.157-.008-.337-.008-.517-.008a.99.99 0 0 0-.72.337c-.247.27-.944.922-.944 2.249s.966 2.61 1.1 2.79c.136.18 1.9 2.901 4.6 4.069.642.278 1.144.444 1.534.569.646.205 1.233.176 1.697.107.518-.078 1.593-.652 1.819-1.282.225-.63.225-1.17.157-1.282-.068-.112-.247-.202-.518-.338z"/>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

const CertificateCard = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [sheen, setSheen] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    const rX = (mouseY / (height / 2)) * -15; 
    const rY = (mouseX / (width / 2)) * 15;
    
    const sheenX = ((e.clientX - rect.left) / width) * 100;
    const sheenY = ((e.clientY - rect.top) / height) * 100;

    setRotate({ x: rX, y: rY });
    setSheen({ x: sheenX, y: sheenY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div 
      className="perspective-[1000px] w-full max-w-lg mx-auto cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        animate={{ rotateX: rotate.x, rotateY: rotate.y }}
        transition={{ type: "spring", damping: 20, stiffness: 150 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative bg-[#161616] border-2 border-gold/45 p-8 md:p-12 shadow-2xl flex flex-col justify-between aspect-[1.618/1] overflow-hidden group"
      >
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 250px at ${sheen.x}% ${sheen.y}%, rgba(201, 169, 110, 0.25), transparent 70%)`
          }}
        />

        <div className="absolute inset-2 border border-gold/15 pointer-events-none" />

        <div className="flex justify-between items-start z-10" style={{ transform: 'translateZ(30px)' }}>
          <div>
            <span className="font-serif tracking-[0.2em] text-xs text-gold font-bold">CERTIFICATE OF ORIGIN</span>
            <div className="text-[9px] font-sans tracking-widest text-white/50 mt-1 uppercase">Revive Wardrobe Haute Couture</div>
          </div>
          <div className="w-10 h-10 border border-gold/30 rounded-full flex items-center justify-center">
            <Diamond size={16} className="text-gold animate-pulse" />
          </div>
        </div>

        <div className="space-y-4 my-6 z-10" style={{ transform: 'translateZ(45px)' }}>
          <div className="font-serif text-white text-lg md:text-xl font-medium tracking-wide">
            Registered Serial: <span className="font-sans text-gold">RW-408-01-V</span>
          </div>
          <p className="text-[10px] md:text-xs text-white/70 font-sans tracking-wider leading-relaxed">
            This certifies that this abaya is a genuine 1-of-1 custom design curated from premium Dubai silks, styled by Rukhsana Shaik, and handcrafted with hand-guided gold zari details.
          </p>
        </div>

        <div className="flex justify-between items-end z-10 border-t border-white/10 pt-4" style={{ transform: 'translateZ(30px)' }}>
          <div className="text-[9px] font-sans text-white/40 uppercase tracking-widest">
            AUTHENTICITY ASSURED
          </div>
          <div className="font-serif italic text-gold text-xs tracking-wider">
            Rukhsana Shaik
          </div>
        </div>
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
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);
  const atelierSectionRef = useRef<HTMLDivElement>(null);
  
  const [selectedProductState, setSelectedProductState] = useState<any>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);

  const setSelectedProduct = (product: any) => {
    setSelectedProductState(product);
    if (product) {
      setRecentlyViewed((prev) => {
        const filtered = prev.filter((p) => p.id !== product.id);
        const updated = [product, ...filtered].slice(0, 4);
        if (typeof window !== 'undefined') {
          localStorage.setItem('recentlyViewed', JSON.stringify(updated.map((p) => p.id)));
        }
        return updated;
      });
    }
  };

  const selectedProduct = selectedProductState;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loaded = localStorage.getItem('recentlyViewed');
      if (loaded) {
        try {
          const ids = JSON.parse(loaded) as string[];
          const items = ids
            .map((id) => products.find((p) => p.id === id))
            .filter(Boolean);
          setRecentlyViewed(items);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const [activeImageKey, setActiveImageKey] = useState<'long' | 'close'>('long');
  const [fullscreenVideo, setFullscreenVideo] = useState<string | null>(null);
  const [hoveredVideoIndex, setHoveredVideoIndex] = useState<number | null>(null);
  
  // Questionnaire State
  const [atelierStep, setAtelierStep] = useState<number>(1);
  const [atelierOccasion, setAtelierOccasion] = useState<string>('');
  const [atelierFabric, setAtelierFabric] = useState<string>('');
  const [atelierPalette, setAtelierPalette] = useState<string>('');
  const [atelierSize, setAtelierSize] = useState<string>('');
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [recommendedProduct, setRecommendedProduct] = useState<any>(null);
  const [wantsMonogram, setWantsMonogram] = useState<boolean>(false);
  const [monogramText, setMonogramText] = useState<string>('');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [isExitIntentOpen, setIsExitIntentOpen] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleAtelierSubmit = () => {
    setIsFormSubmitting(true);
    setTimeout(() => {
      let recommended = products[2]; // Default: Regal Rhythm
      if (atelierOccasion === 'daily') {
        recommended = products[1]; // Noir Veil Elegance
      } else if (atelierOccasion === 'festive' && atelierFabric === 'silk-satin') {
        recommended = products[3]; // Royal Noor
      } else if (atelierFabric === 'nida') {
        recommended = products[0]; // Aurora Blossom
      } else if (atelierPalette === 'sand') {
        recommended = products[4]; // Twilight Grace
      } else if (atelierOccasion === 'bridal') {
        recommended = products[3]; // Royal Noor
      }
      setRecommendedProduct(recommended);
      setIsFormSubmitting(false);
      setAtelierStep(5);
    }, 1500);
  };

  const resetAtelier = () => {
    setAtelierStep(1);
    setAtelierOccasion('');
    setAtelierFabric('');
    setAtelierPalette('');
    setAtelierSize('');
    setRecommendedProduct(null);
  };

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
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 50) {
        const hasSeenCoupon = sessionStorage.getItem('hasSeenExitCoupon');
        if (!hasSeenCoupon) {
          setIsExitIntentOpen(true);
          sessionStorage.setItem('hasSeenExitCoupon', 'true');
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Premium slide & skew reveal headers
      const headings = document.querySelectorAll('.gsap-reveal-header');
      headings.forEach((heading) => {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 60, skewY: 3 },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 1.4,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Premium staggered grids
      const grids = document.querySelectorAll('.gsap-reveal-grid');
      grids.forEach((grid) => {
        const items = grid.querySelectorAll('.gsap-reveal-grid-item');
        if (items.length > 0) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              stagger: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: grid,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }
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
      <nav className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl border-b border-outline-variant/10 transition-all duration-300">
        {/* Top Announcement Bar */}
        <div className="w-full bg-primary text-white py-2 px-4 text-center text-[8px] md:text-[9px] font-sans tracking-[0.2em] uppercase font-bold border-b border-gold/15 flex items-center justify-center gap-2">
          <Sparkles size={10} className="text-gold animate-pulse" />
          <span>{content.announcement}</span>
          <Sparkles size={10} className="text-gold animate-pulse" />
        </div>
        
        <div className="flex items-center justify-between px-6 md:px-12 py-2.5 md:py-3.5">
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
        </div>
      </nav>

      <main>
        {/* Section 1 — Hero */}
        <section className="relative min-h-screen md:h-[115vh] w-full flex items-end justify-center overflow-hidden pt-24 md:pt-32 bg-[#111111]">
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
            className="absolute inset-0 z-0 h-full bg-[#111111]"
          >
            {heroSlides.map((slide, idx) => {
              const isActive = idx === currentHeroSlide;
              return (
                <div
                  key={idx}
                  className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
                  style={{
                    opacity: isActive ? 1 : 0,
                    zIndex: isActive ? 1 : 0
                  }}
                >
                  {slide.type === 'video' ? (
                    <video
                      src={slide.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover filter brightness-[0.7]"
                    />
                  ) : (
                    <img
                      src={slide.src}
                      alt="Luxury Abaya Design"
                      className="w-full h-full object-cover filter brightness-[0.7]"
                    />
                  )}
                </div>
              );
            })}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-black/15 z-10"></div>
          </motion.div>

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center pb-4 pt-20">
            <div className="flex flex-col items-center">
              {/* Dynamic text line aligned with current background slide */}
              <div className="relative h-16 w-full mb-6 overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentHeroSlide}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.6 }}
                    className="font-serif text-base md:text-2xl text-white tracking-[0.25em] uppercase font-light text-center select-none"
                  >
                    {heroSlides[currentHeroSlide].type === 'video' && (
                      <Play size={12} fill="currentColor" className="inline-block mr-3 -mt-1 text-gold animate-pulse" />
                    )}
                    {heroSlides[currentHeroSlide].name}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Single Shop CTA Button (Small size) */}
              <a
                href="#collection"
                className="bg-gold hover:bg-gold-dark text-primary-light font-bold text-[10px] tracking-[0.2em] uppercase px-6 py-3 transition-all duration-300 shadow-lg hover:scale-[1.02] cursor-pointer inline-flex items-center justify-center rounded-sm"
              >
                Shop Collection
              </a>
            </div>
          </div>
        </section>

        {/* Trust Strip */}
        <section className="bg-surface-container py-8 border-b border-outline-variant/10 text-primary">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {content.trustStrip.map((item, idx) => {
              const IconComponent = iconMap[item.icon];
              return (
                <div key={idx} className={`flex flex-col items-center gap-2 ${idx === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
                  {IconComponent && <IconComponent size={20} className="text-gold" />}
                  <span className="font-sans text-[10px] md:text-xs tracking-wider uppercase font-bold text-primary-light">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Social Proof Strip */}
        <section className="bg-gold/10 py-6 border-b border-gold/15">
          <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="flex gap-1 mb-1 text-gold">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-gold text-gold" />)}
              </div>
              <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-secondary">
                Loved by 1,500+ Women
              </span>
            </div>
            <div className="h-px w-12 bg-gold/30 sm:h-8 sm:w-px" />
            <div>
              <span className="font-serif text-2xl font-bold text-primary font-mono block">4.9 / 5</span>
              <span className="font-sans text-[9px] tracking-widest uppercase text-outline/80">Average Customer Rating</span>
            </div>
            <div className="h-px w-12 bg-gold/30 sm:h-8 sm:w-px" />
            <div>
              <span className="font-serif text-2xl font-bold text-primary font-mono block">500+</span>
              <span className="font-sans text-[9px] tracking-widest uppercase text-outline/80">Premium Orders Delivered</span>
            </div>
          </div>
        </section>

        {/* Campaign Countdown & Luxury Urgency Banner */}
        <section className="bg-surface py-12 border-b border-outline-variant/10 text-center px-6">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
            <div className="space-y-2">
              <span className="font-sans text-[10px] md:text-xs tracking-[0.25em] uppercase text-gold font-bold block">
                Limited Production Drops
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-primary font-bold">
                Once Sold Out, It May Never Return.
              </h3>
              <p className="font-sans text-xs md:text-sm text-on-surface-variant font-light max-w-xl mx-auto leading-relaxed">
                Every design in our catalog is handcrafted in small batches. We prioritize pristine detailing and exclusivity over mass production.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-surface-container-low px-8 py-4 border border-outline-variant/20 rounded-sm">
              <span className="font-sans text-[10px] tracking-widest uppercase font-bold text-primary">
                Summer Collection Launch Ends In:
              </span>
              <CountdownTimer />
            </div>
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

        {/* Atelier Booking Status Scarcity Banner */}
        <section className="bg-primary/5 py-8 border-y border-gold/15">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 font-sans">
            <div className="flex items-center gap-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
              </span>
              <div>
                <span className="font-bold text-xs uppercase tracking-widest text-primary block">
                  Active Bespoke Slots: Drop VI
                </span>
                <span className="text-[11px] text-outline/90 font-light mt-0.5 block">
                  Each custom abaya order includes a complimentary designer signature packaging set.
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-6 w-full md:w-auto max-w-md flex-1 md:flex-none">
              <div className="flex-1 md:w-48 bg-surface-container border border-outline-variant/25 h-2.5 rounded-full overflow-hidden relative">
                <div className="bg-gold h-full w-[80%] rounded-full" />
              </div>
              <div className="text-right shrink-0">
                <span className="font-bold text-xs text-primary font-mono block">4 / 5 Slots Reserved</span>
                <span className="text-[10px] text-secondary uppercase tracking-widest block mt-0.5">Only 1 slot left this week</span>
              </div>
            </div>
            
            <a
              href="#bespoke"
              className="bg-primary hover:bg-gold text-white font-bold text-[10px] tracking-widest uppercase px-6 py-3 transition-colors shadow-sm shrink-0 cursor-pointer"
            >
              Secure Styling Slot
            </a>
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
                <h2 className="font-serif text-5xl md:text-6xl text-primary font-bold gsap-reveal-header">
                  The Curated Vault
                </h2>
              </FadeIn>
              <FadeIn direction="left" className="flex items-center gap-6 flex-wrap mt-4 md:mt-0">
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="group flex items-center gap-2 text-gold font-sans text-xs tracking-widest uppercase border-b border-gold pb-2 hover:text-primary hover:border-primary transition-all cursor-pointer font-bold"
                >
                  <HelpCircle size={14} /> Size Guide
                </button>
                <a
                  href="https://revivewardrobe.com/shop/category/abaya"
                  className="group flex items-center gap-3 text-primary font-sans text-xs tracking-widest uppercase border-b border-primary pb-2 hover:text-secondary hover:border-secondary transition-all"
                >
                  Archive Access{' '}
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20 gsap-reveal-grid">
              {products.slice(0, 4).map((item, idx) => (
                <div key={idx} className={`flex flex-col gap-6 gsap-reveal-grid-item ${(idx === 1 || idx === 3) ? 'md:mt-24' : ''}`}>
                  <div 
                    onClick={() => {
                      setSelectedProduct(item);
                      setActiveImageKey('long');
                    }}
                    className="group relative overflow-hidden aspect-[3/4] bg-surface-container-high cursor-pointer shadow-md"
                  >
                    <div className="absolute top-4 left-4 z-10 bg-primary/95 text-gold text-[8px] font-sans tracking-[0.25em] uppercase font-bold px-3 py-1.5 border border-gold/25 shadow-md flex items-center gap-1.5 backdrop-blur-sm">
                      <Sparkles size={8} className="animate-pulse" />
                      {item.availability.includes('1') || item.availability.includes('Only 1') ? 'Only 1 Available' : 'Limited Release'}
                    </div>
                    <img
                      src={item.longImg}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[0.22,1,0.36,1] group-hover:scale-105"
                    />
                    <img
                      src={item.closeImg}
                      alt={`${item.title} texture`}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-[1200ms] ease-[0.22,1,0.36,1] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-gold font-bold mb-1">
                        Luxury Modesty
                      </span>
                      <span className="font-serif text-lg text-white font-semibold mb-4">
                        {item.price}
                      </span>
                      <button className="w-full py-3 bg-white text-primary font-sans text-[10px] tracking-widest uppercase hover:bg-gold hover:text-white transition-colors duration-300 font-bold shadow-lg">
                        Quick View
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-sans text-[8px] tracking-[0.2em] uppercase font-bold px-2 py-0.5 border bg-primary text-gold border-gold/25 rounded-sm">
                        {item.badge}
                      </span>
                      <span className="font-sans text-[8px] tracking-wide text-rose-700 bg-rose-50 px-2 py-0.5 border border-rose-200 font-semibold rounded-sm">
                        {item.availability}
                      </span>
                    </div>

                    <h3 className="text-primary font-serif text-lg md:text-xl font-bold tracking-tight">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-baseline gap-2 font-sans mt-0.5">
                      <span className="text-sm md:text-base font-bold text-primary">{item.price}</span>
                      <span className="text-xs text-outline line-through">{item.mrp}</span>
                      <span className="text-xs text-rose-600 font-bold">{item.discount}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-outline-variant/10">
                      <button
                        onClick={() => {
                          setSelectedProduct(item);
                          setActiveImageKey('long');
                        }}
                        className="text-primary font-sans text-[9px] tracking-widest uppercase underline underline-offset-4 hover:text-gold transition-colors inline-block w-fit cursor-pointer font-bold"
                      >
                        View Piece
                      </button>
                      <button
                        onClick={() => setSelectedProduct(item)}
                        className="text-[9px] font-sans tracking-widest uppercase font-semibold text-secondary hover:text-gold transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <ShoppingCart size={10} /> Quick Reserve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shop By Collection Category Cards Section */}
        <section className="py-24 bg-surface border-t border-outline-variant/10">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <span className="font-sans text-xs tracking-[0.4em] uppercase text-secondary mb-4 block">
                Curated Categorization
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold gsap-reveal-header">
                Shop By Collection
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 gsap-reveal-grid">
              {[
                { title: 'Jalabiyas', img: '/assets/Regal Rhythm Abaya/long.png', link: '#sovereign-collection' },
                { title: 'Abayas', img: '/assets/hero.jpg', link: '#collection' },
                { title: 'Prayer Wear', img: '/assets/Aurora Blossom Abaya/long.jpeg', link: '#collection' },
                { title: 'New Arrivals', img: '/assets/Twilight Grace Abaya/long.png', link: '#sovereign-collection' },
                { title: 'Limited Edition', img: '/assets/Noir Veil Elegance Abaya/long.png', link: '#collection' },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  className={`group relative aspect-[4/5] bg-surface-container overflow-hidden border border-outline-variant/10 shadow-lg cursor-pointer gsap-reveal-grid-item ${idx === 4 ? 'col-span-2 lg:col-span-1' : ''}`}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[0.22,1,0.36,1] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <h3 className="font-serif text-lg md:text-xl text-white font-bold tracking-tight mb-2">
                      {item.title}
                    </h3>
                    <span className="text-[9px] font-sans tracking-widest uppercase text-gold font-bold flex items-center gap-1 group-hover:underline">
                      Explore Collection <ChevronRight size={10} />
                    </span>
                  </div>
                </a>
              ))}
            </div>
            
            {/* CTA for this section */}
            <div className="flex justify-center mt-12">
              <a
                href="#collection"
                className="bg-primary hover:bg-gold text-white font-bold text-xs tracking-widest uppercase px-10 py-4 transition-all duration-300 shadow-md cursor-pointer hover:scale-[1.02]"
              >
                View Complete Archive
              </a>
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

          <div className="flex gap-8 px-6 md:px-12 pb-12 overflow-x-auto snap-x touch-pan-x cursor-grab active:cursor-grabbing hide-scrollbar">
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
                className="min-w-[300px] md:min-w-[450px] aspect-[9/16] bg-surface-container-high relative group overflow-hidden border border-outline-variant/10 shadow-2xl snap-center transition-all duration-700 hover:scale-[1.02] cursor-pointer"
                onMouseEnter={() => setHoveredVideoIndex(index)}
                onMouseLeave={() => setHoveredVideoIndex(null)}
                onClick={() => setFullscreenVideo(item.video)}
              >
                <video
                  ref={(video) => {
                    if (video) {
                      video.muted = true;
                      video.loop = true;
                      video.playsInline = true;
                      if (hoveredVideoIndex === index) {
                        video.play().catch(() => {});
                      } else {
                        video.pause();
                        video.currentTime = 0;
                      }
                    }
                  }}
                  src={item.video}
                  className="w-full h-full object-cover pointer-events-none"
                />
                {/* Play Button Overlay (Visible by default, fades on hover when video plays) */}
                <div className="absolute inset-0 flex items-center justify-center z-20 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none">
                  <div className="bg-black/45 backdrop-blur-md p-4 rounded-full border border-white/20 text-white shadow-2xl flex items-center justify-center transform scale-100 group-hover:scale-95 transition-transform duration-500">
                    <Play size={18} fill="currentColor" className="ml-0.5" />
                  </div>
                </div>
                <div className="absolute inset-0 border-[20px] md:border-[30px] border-transparent group-hover:border-surface/10 transition-all duration-700"></div>
                <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50 via-transparent to-black/35">
                  <div className="flex justify-between items-center text-white">
                    <span className="font-sans text-xs tracking-widest font-semibold">{item.label}</span>
                    <Maximize2 size={16} />
                  </div>
                  <div className="flex items-center justify-center flex-1">
                    <div className="bg-white/90 hover:bg-gold p-4 rounded-full text-primary hover:text-white transition-all transform scale-90 group-hover:scale-100 duration-300 shadow-xl">
                      <Play size={20} fill="currentColor" />
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/90 font-medium">
                      Atelier In Motion
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Revive Wardrobe Section */}
        <section className="py-24 bg-surface-container-low border-y border-outline-variant/10">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <span className="font-sans text-xs tracking-[0.4em] uppercase text-secondary mb-4 block">
                The Brand Promise
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold gsap-reveal-header">
                Why Revive Wardrobe?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gsap-reveal-grid">
              {content.brandPromises.map((item, idx) => {
                const IconComponent = iconMap[item.icon];
                return (
                  <div key={idx} className="bg-surface p-8 border border-outline-variant/10 hover:border-gold/30 transition-all duration-300 group rounded-sm shadow-sm flex flex-col justify-between gsap-reveal-grid-item">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-colors duration-500 rounded-full">
                        {IconComponent && <IconComponent size={20} />}
                      </div>
                      <h3 className="font-serif text-xl text-primary font-bold">{item.title}</h3>
                    <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Feel The Fabric (Craftsmanship) Section */}
        <section className="py-24 bg-surface">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group overflow-hidden aspect-[4/5] bg-surface-container shadow-2xl">
              <img
                src="/assets/Aurora Blossom Abaya/close.png"
                alt="Macro close-up texture detailing of premium modest fabrics"
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/35 flex flex-col justify-end p-8">
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold font-bold mb-2">Tactile Luxury</span>
                <h3 className="font-serif text-2xl text-white font-bold mb-4">Macro Fabric Zoom</h3>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <span className="font-sans text-xs tracking-[0.4em] uppercase text-gold block">
                  Artisanal Sourcing
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold gsap-reveal-header">
                  Feel The Fabric
                </h2>
                <p className="text-on-surface-variant font-sans text-sm font-light leading-relaxed">
                  Modest silhouettes require fabrics that drape cleanly without clinging, remain breathable under heat, and resist wrinkles throughout the day.
                </p>
              </div>

              <div className="space-y-6 gsap-reveal-grid">
                {content.fabricShowcase.map((item, idx) => (
                  <div key={idx} className="border-l-2 border-gold/30 pl-6 space-y-2 gsap-reveal-grid-item">
                    <div className="flex justify-between items-baseline flex-wrap gap-2">
                      <h4 className="font-serif text-lg text-primary font-bold">{item.title}</h4>
                      <div className="flex gap-1.5">
                        {item.traits.map((trait, tIdx) => (
                          <span key={tIdx} className="text-[8px] font-sans uppercase font-bold tracking-widest bg-gold/10 text-gold px-2 py-0.5 rounded-sm border border-gold/15">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-outline/90 font-sans font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <a
                  href="#collection"
                  className="bg-primary hover:bg-gold text-white font-bold text-xs tracking-widest uppercase px-8 py-4 transition-colors inline-block cursor-pointer"
                >
                  Browse Fabric Styles
                </a>
              </div>
            </div>
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
                <h2 className="font-serif text-5xl md:text-7xl text-primary font-bold tracking-tighter gsap-reveal-header">
                  The Sovereign Collection
                </h2>
              </FadeIn>
            </div>

            <div className="masonry-grid gsap-reveal-grid" style={{ columnCount: 3, columnGap: '1rem' }}>
              {[
                { product: products[0], img: '/assets/Aurora Blossom Abaya/long.jpeg' },
                { product: products[4], img: '/assets/Twilight Grace Abaya/Closeup.png' },
                { product: products[5], img: '/assets/Midnight Elegance Abaya/close.png' },
                { product: products[2], img: '/assets/Regal Rhythm Abaya/closeup.png' },
                { product: products[6], img: '/assets/close.png' },
                { product: products[7], img: '/assets/Eternal Noir Abaya/long.jpg' },
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  style={{ breakInside: 'avoid', marginBottom: '1rem' }}
                  onClick={() => {
                    setSelectedProduct(item.product);
                    setActiveImageKey(item.img.includes('close') || item.img.includes('Closeup') ? 'close' : 'long');
                  }}
                  className="relative group overflow-hidden cursor-pointer shadow-lg border border-outline-variant/5 bg-surface-container gsap-reveal-grid-item"
                >
                  <img
                    src={item.img}
                    alt={item.product.title}
                    className="w-full h-auto block transition-transform duration-[1200ms] ease-[0.22,1,0.36,1] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <span className="font-sans text-[8px] tracking-[0.4em] uppercase text-gold font-bold mb-1">
                      {item.product.fabric}
                    </span>
                    <h3 className="font-serif text-lg text-white font-medium mb-1">
                      {item.product.title}
                    </h3>
                    <div className="flex items-baseline gap-2 font-sans text-xs text-white mt-1">
                      <span className="font-bold">{item.product.price}</span>
                      <span className="text-white/60 line-through text-[10px]">{item.product.mrp}</span>
                      <span className="text-gold font-bold text-[10px]">{item.product.discount}</span>
                    </div>
                    <div className="flex justify-between items-center text-white/80 text-[10px] font-sans tracking-wider mt-2 border-t border-white/10 pt-2">
                      <span className="text-rose-400 font-semibold text-[9px]">{item.product.availability}</span>
                      <span className="underline underline-offset-2 hover:text-gold uppercase tracking-widest text-[9px] font-bold">
                        Inquire Piece
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5.5 — Exclusivity & Ownership */}
        <section className="py-24 md:py-32 bg-surface-container-low border-y border-outline-variant/10">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right" className="space-y-8">
              <span className="font-sans text-xs tracking-[0.4em] uppercase text-gold block">
                Haute Couture Exclusivity
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold leading-tight">
                The Signature of 
                <br />
                Authenticity & 1-of-1 Origin
              </h2>
              <p className="text-on-surface-variant text-base md:text-lg leading-relaxed font-light">
                Every creation in the Revive Wardrobe archive is structured as a collectible work of art. 
                When you obtain a piece, it is accompanied by a registered, physical, gold-foiled <strong>Certificate of Authenticity</strong> signed directly by Rukhsana Shaik.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold mt-1">
                    <ShieldCheck size={14} />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs uppercase tracking-widest font-bold text-primary">Registered Serial Trace</h4>
                    <p className="text-xs text-outline/80 mt-1">Each abaya bears a unique identification serial registered in our private collector ledger.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold mt-1">
                    <Lock size={14} />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs uppercase tracking-widest font-bold text-primary">Guaranteed 1-of-1 or Limited Batch</h4>
                    <p className="text-xs text-outline/80 mt-1">We guarantee that the exact pattern configuration and hand-beading details are never replicated.</p>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn direction="left">
              <CertificateCard />
            </FadeIn>
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

        {/* Section 9 — Virtual Atelier & Bespoke Styling Concierge */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-primary border-t border-outline-variant/10 text-white" id="bespoke">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 -skew-x-12 transform translate-x-1/4 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-px bg-gold/20 pointer-events-none"></div>
          
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 animate-fade-in" id="virtual-atelier">
            
            <div className="space-y-8 text-left">
              <FadeIn direction="right">
                <span className="font-sans text-xs tracking-[0.4em] uppercase text-gold block mb-3">
                  Tailored To Your Essence
                </span>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight leading-[1.1]">
                  Discover Your 
                  <br />
                  Signature Style
                </h2>
                <p className="text-white/70 text-base md:text-lg font-light leading-relaxed max-w-xl">
                  We believe modest high-fashion is an expression of individual grace. For our custom clients, Rukhsana Shaik offers a private digital atelier service. Tell us your style criteria, and let us design a piece tailored to your exact height and aesthetic blueprint.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="https://revivewardrobe.com/shop/category/abaya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-gold text-primary hover:bg-gold-dark hover:text-white px-8 py-4 text-xs tracking-[0.3em] uppercase font-bold transition-all duration-300 shadow-lg cursor-pointer"
                  >
                    Shop Ready Pieces <ArrowRight size={14} className="ml-2" />
                  </a>
                  <a
                    href="tel:+971582447684"
                    className="inline-flex items-center justify-center border border-white/30 text-white px-8 py-4 text-xs tracking-[0.3em] uppercase font-medium hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    Call Atelier
                  </a>
                </div>
              </FadeIn>
            </div>

            <div className="w-full">
              <FadeIn direction="left">
                <div className="bg-surface text-on-surface p-8 md:p-10 border border-gold/20 shadow-2xl relative">
                  
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/40 pointer-events-none" />
                  
                  <div className="flex justify-between items-center mb-8 border-b border-outline-variant/10 pb-4">
                    <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold font-bold">
                      Atelier Wizard
                    </span>
                    <span className="font-sans text-xs text-outline/80">
                      {atelierStep <= 4 ? `Step ${atelierStep} of 4` : 'Recommended Style'}
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    {atelierStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h3 className="font-serif text-xl md:text-2xl text-primary font-medium">
                          What is the occasion or style intent?
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            { id: 'daily', label: 'Daily Refinement', desc: 'Sleek, lightweight designs for graceful everyday presence.' },
                            { id: 'festive', label: 'Festive & Eid Elegance', desc: 'Embellished, striking styles for celebrations.' },
                            { id: 'editorial', label: 'High-Fashion Editorial', desc: 'Dramatic drapes and unique textures for events.' },
                            { id: 'bridal', label: 'Bespoke Royal Bridal', desc: 'Premium custom embroidery on bespoke fabrics.' },
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => {
                                setAtelierOccasion(opt.id);
                                setAtelierStep(2);
                              }}
                              className={`p-4 border text-left transition-all duration-300 cursor-pointer flex flex-col gap-1 ${
                                atelierOccasion === opt.id
                                  ? 'border-gold bg-gold/5 text-primary font-bold'
                                  : 'border-outline-variant/20 hover:border-gold/50 hover:bg-surface-container'
                              }`}
                            >
                              <span className="font-sans text-xs font-bold uppercase tracking-wider">{opt.label}</span>
                              <span className="text-[11px] text-outline/80 font-light">{opt.desc}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {atelierStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h3 className="font-serif text-xl md:text-2xl text-primary font-medium">
                          Select your preferred luxury fabric:
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            { id: 'nida', label: 'Korean Nida Silk', desc: 'Ultra-fluid drape, soft subtle sheen, perfect for summer.' },
                            { id: 'crepe', label: 'Saudi Crepe', desc: 'Structured, deep matte black, durable premium weave.' },
                            { id: 'velvet', label: 'Imperial Plush Velvet', desc: 'Luxurious heavy drape, ornate trim borders, ideal for winter.' },
                            { id: 'silk-satin', label: 'Silk-Satin Blend', desc: 'High-sheen elegance, rich embellishments, majestic feel.' },
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => {
                                setAtelierFabric(opt.id);
                                setAtelierStep(3);
                              }}
                              className={`p-4 border text-left transition-all duration-300 cursor-pointer flex flex-col gap-1 ${
                                atelierFabric === opt.id
                                  ? 'border-gold bg-gold/5 text-primary font-bold'
                                  : 'border-outline-variant/20 hover:border-gold/50 hover:bg-surface-container'
                              }`}
                            >
                              <span className="font-sans text-xs font-bold uppercase tracking-wider">{opt.label}</span>
                              <span className="text-[11px] text-outline/80 font-light">{opt.desc}</span>
                            </button>
                          ))}
                        </div>
                        <div className="flex gap-4 pt-4 border-t border-outline-variant/10">
                          <button
                            onClick={() => setAtelierStep(1)}
                            className="flex items-center gap-1 text-[10px] tracking-widest uppercase text-outline hover:text-primary transition-colors cursor-pointer"
                          >
                            <ChevronLeft size={14} /> Back
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {atelierStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h3 className="font-serif text-xl md:text-2xl text-primary font-medium">
                          Choose your signature color palette:
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { id: 'gold-black', label: 'Royal Black & Gold', colorBg: 'bg-black border-gold/40' },
                            { id: 'aurora', label: 'Pastel Aurora', colorBg: 'bg-gradient-to-tr from-pink-100 to-indigo-100' },
                            { id: 'plum-emerald', label: 'Jewel Tones', colorBg: 'bg-gradient-to-tr from-purple-950 to-emerald-950' },
                            { id: 'sand', label: 'Desert Sands', colorBg: 'bg-gradient-to-tr from-amber-50 to-amber-100' },
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => {
                                setAtelierPalette(opt.id);
                                setAtelierStep(4);
                              }}
                              className={`p-4 border text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-between gap-3 ${
                                atelierPalette === opt.id
                                  ? 'border-gold bg-gold/5 text-primary font-bold'
                                  : 'border-outline-variant/20 hover:border-gold/50 hover:bg-surface-container'
                              }`}
                            >
                              <div className={`w-10 h-10 rounded-full border shadow-inner ${opt.colorBg}`} />
                              <span className="font-sans text-[10px] font-bold uppercase tracking-wider">{opt.label}</span>
                            </button>
                          ))}
                        </div>
                        <div className="flex gap-4 pt-4 border-t border-outline-variant/10">
                          <button
                            onClick={() => setAtelierStep(2)}
                            className="flex items-center gap-1 text-[10px] tracking-widest uppercase text-outline hover:text-primary transition-colors cursor-pointer"
                          >
                            <ChevronLeft size={14} /> Back
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {atelierStep === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h3 className="font-serif text-xl md:text-2xl text-primary font-medium">
                          Select standard height length or custom fit:
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { id: '52', label: 'Size 52 (5\'1" - 5\'2")' },
                            { id: '54', label: 'Size 54 (5\'3" - 5\'4")' },
                            { id: '56', label: 'Size 56 (5\'5" - 5\'6")' },
                            { id: '58', label: 'Size 58 (5\'7" - 5\'8")' },
                            { id: 'custom', label: 'Custom Tailoring' },
                          ].map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => setAtelierSize(opt.id)}
                              className={`p-3.5 border text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-1 ${
                                atelierSize === opt.id
                                  ? 'border-gold bg-gold/5 text-primary font-bold'
                                  : 'border-outline-variant/20 hover:border-gold/50 hover:bg-surface-container'
                              }`}
                            >
                              <span className="font-sans text-[11px] uppercase tracking-wider">{opt.label}</span>
                            </button>
                          ))}
                        </div>
                        
                        <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-center">
                          <button
                            onClick={() => setAtelierStep(3)}
                            className="flex items-center gap-1 text-[10px] tracking-widest uppercase text-outline hover:text-primary transition-colors cursor-pointer"
                          >
                            <ChevronLeft size={14} /> Back
                          </button>
                          
                          <button
                            onClick={handleAtelierSubmit}
                            disabled={!atelierSize}
                            className={`px-8 py-3 bg-primary text-white font-sans text-[10px] tracking-widest uppercase font-bold transition-all ${
                              atelierSize 
                                ? 'hover:bg-gold hover:shadow-lg cursor-pointer animate-pulse' 
                                : 'opacity-50 cursor-not-allowed'
                            }`}
                          >
                            Get Match
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {atelierStep === 5 && (
                      <motion.div
                        key="step5"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="space-y-6"
                      >
                        {isFormSubmitting ? (
                          <div className="flex flex-col items-center justify-center py-12 gap-4">
                            <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                            <p className="font-serif italic text-sm text-outline animate-pulse">
                              Consulting designer Rukhsana...
                            </p>
                          </div>
                        ) : recommendedProduct ? (
                          <div className="space-y-6">
                            <div className="bg-surface-container p-4 border border-outline-variant/10 flex gap-4 items-center">
                              <img
                                src={recommendedProduct.closeImg}
                                alt={recommendedProduct.title}
                                className="w-20 aspect-[3/4] object-cover border border-gold/20"
                              />
                              <div className="space-y-1">
                                <span className="font-sans text-[9px] tracking-widest uppercase text-gold font-bold">
                                  98% Match recommendation
                                </span>
                                <h4 className="font-serif text-lg text-primary font-bold">{recommendedProduct.title}</h4>
                                <p className="text-[11px] text-on-surface-variant font-light line-clamp-2 leading-relaxed">
                                  {recommendedProduct.desc}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <p className="text-xs text-on-surface-variant font-light leading-relaxed">
                                Send this styling card directly to Rukhsana Shaik to arrange your bespoke fittings or order this exact piece in size <strong>{atelierSize.toUpperCase()}</strong>.
                              </p>
                              
                              <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                  href={`https://wa.me/971582447684?text=Hi%20Revive%20Wardrobe,%20I%20completed%20the%20Virtual%20Atelier%20Styling%20Guide.%20Here%20are%20my%20preferences:%20Occasion:%20${encodeURIComponent(atelierOccasion)},%20Fabric:%20${encodeURIComponent(atelierFabric)},%20Palette:%20${encodeURIComponent(atelierPalette)},%20Size/Height:%20${encodeURIComponent(atelierSize)}.%20I%20got%20matched%20with%20the%20${encodeURIComponent(recommendedProduct.title)}.`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 bg-primary text-white hover:bg-gold transition-colors py-3.5 text-center font-sans text-[10px] tracking-widest uppercase font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                                >
                                  <MessageCircle size={14} fill="white" className="text-primary" /> Send to Designer
                                </a>
                                
                                <button
                                  onClick={resetAtelier}
                                  className="border border-outline/35 text-primary hover:bg-surface-container py-3 px-4 font-sans text-[10px] tracking-widest uppercase transition-colors cursor-pointer"
                                >
                                  Restart Guide
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            </div>
            
          </div>
        </section>

        {/* Full-width Cinematic Loop Video Section */}
        <section className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden flex items-center justify-center bg-black">
          <video
            src="/videos/12th video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-65 z-0 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/50 z-10" />
          
          <div className="relative z-20 text-center px-6 max-w-3xl">
            <FadeIn>
              <span className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-gold font-bold mb-3 block">
                The Art of Modest Couture
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-white font-bold leading-tight mb-6">
                Tailored For Grace.
                <br />
                Flowing With Motion.
              </h2>
              <a
                href="#collection"
                className="bg-gold hover:bg-white text-primary hover:text-primary-light font-sans text-[10px] tracking-widest uppercase font-bold px-8 py-4 transition-colors inline-block shadow-lg"
              >
                Experience The Drops
              </a>
            </FadeIn>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-surface border-t border-outline-variant/10">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="font-sans text-xs tracking-[0.4em] uppercase text-secondary mb-4 block">
                Acquisition Assistance
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-primary font-bold gsap-reveal-header">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4 font-sans gsap-reveal-grid">
              {content.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="border-b border-outline-variant/15 pb-4 gsap-reveal-grid-item">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex justify-between items-center py-4 text-left font-serif text-base md:text-lg text-primary font-bold hover:text-gold transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={16}
                        className={`text-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed font-light pb-4 pl-1">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Recently Viewed Products */}
        {recentlyViewed.length > 0 && (
          <section className="py-16 bg-surface-container-low border-t border-outline-variant/10">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-outline/80 block mb-6 font-bold">
                Continue Shopping / Recently Viewed
              </span>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {recentlyViewed.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedProduct(item)}
                    className="flex gap-4 items-center bg-surface border border-outline-variant/10 p-3 hover:border-gold/30 transition-all cursor-pointer rounded-sm"
                  >
                    <img
                      src={item.closeImg}
                      alt={item.title}
                      className="w-14 aspect-[3/4] object-cover border border-gold/15"
                    />
                    <div className="space-y-1">
                      <h4 className="font-serif text-xs md:text-sm text-primary font-bold line-clamp-1">{item.title}</h4>
                      <span className="font-sans text-[10px] text-secondary font-semibold block">{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* As Seen On / Featured In Strip */}
        <section className="py-12 bg-surface-container border-t border-outline-variant/10 text-primary">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
            <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-outline/60 font-bold block">
              Featured In & Editorial Collaborations
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-55 hover:opacity-75 transition-opacity duration-300">
              {['Vogue Modest', 'Harper’s Bazaar Arabia', 'Dubai Fashion Week', 'Grazia Middle East'].map((brand, idx) => (
                <span
                  key={idx}
                  className="font-serif text-base md:text-lg font-bold tracking-widest uppercase italic text-primary-light"
                >
                  {brand}
                </span>
              ))}
            </div>
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

        <div className="text-gray-400 text-sm mt-2">Designed with <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" className="svg-inline--fa fa-heart text-red-500 inline-block w-4 h-4 mx-1 align-text-bottom" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path></svg> by <a href="https://tensketch.com" className="hover:text-gold transition-colors">TenSketch</a></div>
      </footer>

      {/* Premium Luxury Features */}
      <CustomCursor />
      <ConciergeWidget />

      {/* Product Quick-View Modal */}
      {selectedProduct && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-8"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative bg-surface w-full max-w-5xl rounded-none overflow-hidden shadow-2xl border border-gold/10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-primary hover:bg-gold transition-colors text-white rounded-full cursor-pointer animate-fade-in"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 relative bg-surface-container h-[40vh] md:h-auto overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageKey}
                    src={activeImageKey === 'long' ? selectedProduct.longImg : selectedProduct.closeImg}
                    alt={selectedProduct.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover animate-fade-in"
                  />
                </AnimatePresence>

                <div className="absolute bottom-6 left-6 flex gap-3 z-10">
                  <button
                    onClick={() => setActiveImageKey('long')}
                    className={`px-4 py-2 text-[10px] tracking-widest uppercase transition-all duration-300 font-sans cursor-pointer ${
                      activeImageKey === 'long'
                        ? 'bg-primary text-white font-semibold'
                        : 'bg-white/80 text-primary hover:bg-white'
                    }`}
                  >
                    Full Silhouette
                  </button>
                  <button
                    onClick={() => setActiveImageKey('close')}
                    className={`px-4 py-2 text-[10px] tracking-widest uppercase transition-all duration-300 font-sans cursor-pointer ${
                      activeImageKey === 'close'
                        ? 'bg-primary text-white font-semibold'
                        : 'bg-white/80 text-primary hover:bg-white'
                    }`}
                  >
                    Fabric Detail
                  </button>
                </div>
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between overflow-y-auto h-[50vh] md:h-auto">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold">
                      Collection Drop VI
                    </span>
                    <span className="font-sans text-[9px] tracking-wider uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 border border-emerald-200 font-semibold rounded-sm">
                      {selectedProduct.availability}
                    </span>
                  </div>
                  
                  <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold mb-4 tracking-tight leading-tight">
                    {selectedProduct.title}
                  </h2>
                  
                  <div className="text-2xl font-serif text-secondary mb-6 font-semibold border-b border-outline-variant/10 pb-4">
                    {selectedProduct.price}
                  </div>

                  <div className="space-y-6 mb-8 text-on-surface-variant text-sm font-light leading-relaxed">
                    <p>{selectedProduct.desc}</p>
                    
                    <div>
                      <h4 className="font-sans text-xs tracking-wider uppercase text-primary font-bold mb-2">Fabric Details</h4>
                      <p className="italic text-xs">{selectedProduct.fabric}</p>
                    </div>

                    <div>
                      <h4 className="font-sans text-xs tracking-wider uppercase text-primary font-bold mb-3">Available Sizing</h4>
                      <div className="flex gap-2 flex-wrap">
                        {selectedProduct.sizes.map((size: string) => (
                          <span
                            key={size}
                            className="w-10 h-10 border border-outline/35 flex items-center justify-center text-xs font-semibold hover:border-gold hover:text-gold transition-colors"
                          >
                            {size}
                          </span>
                        ))}
                        <button
                          onClick={() => {
                            setSelectedProduct(null);
                            const bespokeSection = document.getElementById('virtual-atelier');
                            if (bespokeSection) {
                              bespokeSection.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="px-4 border border-gold border-dashed text-gold text-[10px] tracking-widest uppercase hover:bg-gold/5 transition-colors font-medium cursor-pointer"
                        >
                          Custom Size Fit
                        </button>
                      </div>
                      <p className="text-[11px] text-outline/80 mt-2 font-sans mb-4">
                        Sizes reflect lengths in inches from shoulder to hem. Fit is tailored for a modest silhouette.
                      </p>
                    </div>

                    {/* Monogramming Option */}
                    <div className="bg-surface-container-low p-4 border border-gold/15 rounded-sm">
                      <label className="flex items-center gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={wantsMonogram}
                          onChange={(e) => setWantsMonogram(e.target.checked)}
                          className="accent-primary w-4 h-4 cursor-pointer"
                        />
                        <span className="font-sans text-xs uppercase tracking-wider text-primary font-bold">
                          Add Custom Gold Zari Monogramming
                        </span>
                      </label>
                      <p className="text-[10px] text-outline/80 mt-1 font-sans pl-7">
                        Complimentary for Drop VI. Initials will be hand-stitched in gold zari thread on the inner cuff.
                      </p>
                      
                      <AnimatePresence>
                        {wantsMonogram && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 pl-7"
                          >
                            <input
                              type="text"
                              maxLength={3}
                              placeholder="Initials (e.g. A.S)"
                              value={monogramText}
                              onChange={(e) => setMonogramText(e.target.value.toUpperCase())}
                              className="bg-surface border border-outline/30 px-3 py-2 text-xs uppercase font-bold tracking-widest text-primary w-32 focus:border-gold focus:outline-none"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-outline-variant/10">
                  <a
                    href={`https://wa.me/971582447684?text=Hi%20Revive%20Wardrobe,%20I%20would%20like%20to%20reserve%20the%20${encodeURIComponent(selectedProduct.title)}%20(${selectedProduct.price}).${wantsMonogram && monogramText ? `%20Please%20include%20a%20custom%20monogram%20"${encodeURIComponent(monogramText)}".` : ''}%20Please%20let%20me%20know%20how%20to%20proceed.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-primary hover:bg-primary-light text-white py-4 px-6 flex items-center justify-center gap-3 text-xs tracking-[0.25em] uppercase font-bold transition-all duration-300 hover:shadow-lg cursor-pointer animate-fade-in"
                  >
                    <MessageCircle size={16} fill="white" className="text-primary" /> Reserve via WhatsApp
                  </a>
                  
                  <a
                    href={selectedProduct.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full border border-primary text-primary hover:bg-primary hover:text-white py-3.5 px-6 flex items-center justify-center gap-2 text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300 cursor-pointer"
                  >
                    View on Website <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Fullscreen Video Cinema Lightbox */}
      {fullscreenVideo && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={() => setFullscreenVideo(null)}
          >
            <button
              onClick={() => setFullscreenVideo(null)}
              className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-gold transition-colors text-white rounded-full cursor-pointer"
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative aspect-[9/16] w-full max-w-[450px] bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={fullscreenVideo}
                className="w-full h-full object-contain"
                controls
                autoPlay
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Size Guide Modal */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setIsSizeGuideOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-surface w-full max-w-2xl p-6 md:p-10 border border-gold/15 shadow-2xl relative font-sans text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="absolute top-4 right-4 p-2 bg-primary hover:bg-gold transition-colors text-white rounded-full cursor-pointer animate-fade-in"
              >
                <X size={16} />
              </button>

              <h3 className="font-serif text-2xl md:text-3xl text-primary font-bold mb-2">Find Your Perfect Fit</h3>
              <p className="text-xs text-on-surface-variant font-light mb-6">
                Abaya length is chosen based on your full height. Select your size so the hem rests perfectly at your ankles.
              </p>

              <div className="overflow-x-auto border border-outline-variant/10 rounded-sm mb-6">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container border-b border-outline-variant/10 text-primary uppercase tracking-wider font-bold">
                      <th className="p-3">Your Height (Ft/In)</th>
                      <th className="p-3">Abaya Size (Length)</th>
                      <th className="p-3">Fitting Hem Style</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10 font-medium text-on-surface-variant">
                    <tr>
                      <td className="p-3">5'0" - 5'2" (152 - 158 cm)</td>
                      <td className="p-3 font-bold text-primary">Size 52</td>
                      <td className="p-3">Fits ankle-length</td>
                    </tr>
                    <tr>
                      <td className="p-3">5'3" - 5'4" (160 - 163 cm)</td>
                      <td className="p-3 font-bold text-primary">Size 54</td>
                      <td className="p-3">Fits ankle-length</td>
                    </tr>
                    <tr>
                      <td className="p-3">5'5" - 5'6" (165 - 168 cm)</td>
                      <td className="p-3 font-bold text-primary">Size 56</td>
                      <td className="p-3">Fits ankle-length</td>
                    </tr>
                    <tr>
                      <td className="p-3">5'7" - 5'9" (170 - 175 cm)</td>
                      <td className="p-3 font-bold text-primary">Size 58</td>
                      <td className="p-3">Fits ankle-length</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-primary/5 p-4 border border-gold/15 mb-6 text-xs text-outline/90 font-light flex items-start gap-2.5">
                <Info size={16} className="text-gold shrink-0 mt-0.5" />
                <span>
                  <strong>Need custom adjustments?</strong> If your measurements fall outside these ranges (e.g. custom bust or sleeve width changes), our sizing is customizable. Complete the Atelier styling questionnaire at the bottom of the page or message our concierge directly.
                </span>
              </div>

              <button
                onClick={() => {
                  setIsSizeGuideOpen(false);
                  const bespoke = document.getElementById('bespoke');
                  if (bespoke) bespoke.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-primary hover:bg-gold text-white font-bold text-xs tracking-widest uppercase py-3.5 transition-colors cursor-pointer"
              >
                Proceed To Custom Fit Wizard
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit Intent Coupon Modal */}
      <AnimatePresence>
        {isExitIntentOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setIsExitIntentOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-surface w-full max-w-md p-8 border-2 border-gold/30 shadow-2xl relative font-sans text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsExitIntentOpen(false)}
                className="absolute top-4 right-4 p-2 bg-primary hover:bg-gold transition-colors text-white rounded-full cursor-pointer animate-fade-in"
              >
                <X size={14} />
              </button>

              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gold animate-bounce">
                <Percent size={20} />
              </div>

              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold font-bold block mb-2">
                Exclusive Invitation
              </span>
              <h3 className="font-serif text-3xl text-primary font-bold mb-3">Wait! Don’t Leave Empty Handed</h3>
              <p className="text-xs text-on-surface-variant font-light mb-6 leading-relaxed">
                Join the Revive Wardrobe Collector Registry today. Enjoy <strong>AED 150 OFF</strong> on your first order of designer modest wear.
              </p>

              <div className="space-y-3">
                <a
                  href="https://wa.me/971582447684?text=Hi%20Revive%20Wardrobe,%20I'd%20like%20to%20join%20the%20VIP%20Registry%20and%20claim%20my%20AED%20150%20welcome%20coupon."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    alert('VIP Coupon Code: REVIVE150 has been copied! Opening WhatsApp concierge...');
                    setIsExitIntentOpen(false);
                  }}
                  className="w-full bg-[#25D366] hover:bg-[#20ba56] text-white font-bold text-xs tracking-widest uppercase py-3.5 transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2 rounded-sm font-sans"
                >
                  <Phone size={14} fill="white" className="text-white" /> Claim AED 150 via WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Review Badge (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40 bg-surface/90 backdrop-blur-md px-4 py-3 border border-gold/20 shadow-xl hidden md:flex items-center gap-3 font-sans rounded-sm animate-fade-in hover:border-gold transition-colors duration-300">
        <div className="flex flex-col">
          <div className="flex gap-0.5 text-gold mb-0.5">
            {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-gold text-gold" />)}
          </div>
          <span className="text-[10px] font-bold text-primary tracking-wider uppercase">Loved by 1,500+ Women</span>
          <span className="text-[8px] text-outline">Verified Buyers Review: 4.9 Rating</span>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-50 bg-surface/95 backdrop-blur-md border-t border-gold/15 p-3 pb-5 flex md:hidden items-center justify-between shadow-2xl animate-fade-in">
        <div className="flex flex-col text-left font-sans pl-2">
          <span className="text-[8px] tracking-[0.2em] uppercase text-gold font-bold">Launch Pricing Drop VI</span>
          <span className="text-[10px] text-outline font-light line-through">AED 350</span>
          <span className="text-xs font-bold text-primary font-mono -mt-0.5">From AED 225</span>
        </div>
        <a
          href="https://revivewardrobe.com"
          className="bg-primary hover:bg-gold text-white font-bold text-[10px] tracking-widest uppercase px-4 py-2.5 transition-colors shrink-0 shadow-md cursor-pointer rounded-sm"
        >
          ✨ Access Atelier
        </a>
      </div>
    </div>
  );
}
