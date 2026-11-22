import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import HeroScrollExperience from './components/HeroScrollExperience';
import SplitExperience from './components/SplitExperience';
import CoffeeSection from './components/CoffeeSection';
import FoodSection from './components/FoodSection';
import SignatureSection from './components/SignatureSection';
import StorySection from './components/StorySection';
import VisitSection from './components/VisitSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef(null);
  const cursorRef = useRef(null);

  // Initialize Lenis smooth luxury scrolling and bind with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4
    });

    lenisRef.current = lenis;

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  // Desktop subtle cursor-responsive ambient glow
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const updatePosition = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      if (cursor) {
        cursor.style.transform = `translate3d(${currentX - 250}px, ${currentY - 250}px, 0)`;
      }
      rafId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTarget = (targetId) => {
    const el = document.getElementById(targetId);
    if (!el) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -30, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="the-roasted-bean-app">
      {/* Cinematic Film Texture Grain */}
      <div className="cinematic-grain" />

      {/* Responsive Cursor Torch Glow (Desktop only) */}
      <div ref={cursorRef} className="cursor-light" />

      {/* Navigation */}
      <Navbar onNavigate={scrollToTarget} />

      <main>
        {/* HERO SCROLL ANIMATION — FINAL DESIGN */}
        {/* Pinned GSAP ScrollTrigger: Bean Zoom -> Crack Ignition -> Split Halves -> Brand Reveal */}
        <HeroScrollExperience 
          onExploreMenu={() => scrollToTarget('coffee-section')}
          onOurStory={() => scrollToTarget('our-story')}
        />

        {/* Signature Split-Screen Brand Interaction */}
        <SplitExperience 
          onSelectCoffee={() => scrollToTarget('coffee-section')}
          onSelectFood={() => scrollToTarget('food-section')}
        />

        {/* Section A: Signature Coffee Selection */}
        <CoffeeSection />

        {/* Section B: The Food Collection (Editorial) */}
        <FoodSection />

        {/* Section C: Signature Product Pairing Showcase */}
        <SignatureSection 
          onExploreCoffee={() => scrollToTarget('coffee-section')}
          onExploreFood={() => scrollToTarget('food-section')}
        />

        {/* Section D: Our Story & Philosophy */}
        <StorySection />

        {/* Section E: Visit Us, Location & Table Reservation */}
        <VisitSection />
      </main>

      {/* Section F: Sophisticated Minimal Footer */}
      <Footer onNavClick={scrollToTarget} />
    </div>
  );
}
