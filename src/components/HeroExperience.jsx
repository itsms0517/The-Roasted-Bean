import React, { useState, useEffect, useRef } from 'react';
import CoffeeTransformation from '../scenes/CoffeeTransformation';
import { Play, RotateCcw, ChevronDown, Sparkles } from 'lucide-react';

export default function HeroExperience({ onExploreMenu, onOurStory, onExploreCoffee, onExploreFood }) {
  // Transformation progress from 0 (Bean) to 1 (Cup & Steam)
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const animIntervalRef = useRef(null);

  // Automatic opening animation on load
  useEffect(() => {
    // Start after small initial delay so the roasted bean is first admired
    const startTimeout = setTimeout(() => {
      let currentProgress = 0;
      const duration = 2800; // 2.8s smooth cinematic transition
      const interval = 16; // ~60fps
      const step = 1 / (duration / interval);

      animIntervalRef.current = setInterval(() => {
        currentProgress += step;
        if (currentProgress >= 1) {
          currentProgress = 1;
          clearInterval(animIntervalRef.current);
          setIsPlaying(false);
        }
        setProgress(currentProgress);
      }, interval);
    }, 1200);

    return () => {
      clearTimeout(startTimeout);
      if (animIntervalRef.current) clearInterval(animIntervalRef.current);
    };
  }, []);

  const handleReplay = () => {
    if (animIntervalRef.current) clearInterval(animIntervalRef.current);
    setProgress(0);
    setIsPlaying(true);
    setHasInteracted(true);

    let p = 0;
    const duration = 2400;
    const interval = 16;
    const step = 1 / (duration / interval);

    animIntervalRef.current = setInterval(() => {
      p += step;
      if (p >= 1) {
        p = 1;
        clearInterval(animIntervalRef.current);
        setIsPlaying(false);
      }
      setProgress(p);
    }, interval);
  };

  const handleSliderChange = (e) => {
    if (animIntervalRef.current) clearInterval(animIntervalRef.current);
    setIsPlaying(false);
    setHasInteracted(true);
    setProgress(parseFloat(e.target.value));
  };

  // Typography & content opacity based on transformation progress
  // Behind the cup, typography gradually blooms into view between p=0.45 and p=1.0
  const titleOpacity = Math.max(0, Math.min(1, (progress - 0.4) / 0.5));
  const controlsOpacity = Math.max(0, Math.min(1, (progress - 0.6) / 0.4));

  return (
    <section 
      id="hero"
      className="hero-experience"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#17110E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background Cinematic Radial Lighting */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(48, 32, 24, 0.75) 0%, rgba(23, 17, 14, 0.95) 60%, #100b09 100%)',
          zIndex: 0,
          pointerEvents: 'none'
        }} 
      />

      {/* Atmospheric Vignette */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          boxShadow: 'inset 0 0 160px rgba(0,0,0,0.92)',
          zIndex: 1,
          pointerEvents: 'none'
        }} 
      />

      {/* OVERSIZED HERO TYPOGRAPHY (Layered behind the 3D cup) */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${0.92 + progress * 0.08})`,
          zIndex: 1,
          textAlign: 'center',
          width: '100%',
          maxWidth: '1200px',
          padding: '0 1rem',
          opacity: titleOpacity,
          transition: 'opacity 0.3s ease-out, transform 0.4s ease-out',
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        <div 
          className="label-eyebrow"
          style={{ 
            marginBottom: '1.25rem',
            opacity: Math.max(0, (progress - 0.6) / 0.4),
            transform: `translateY(${(1 - progress) * 20}px)`,
            transition: 'transform 0.4s ease'
          }}
        >
          EST. FOR THE LOVE OF COFFEE
        </div>

        <h1 
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.2rem, 9.5vw, 9.5rem)',
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: '0.04em',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(217, 181, 138, 0.35)',
            textShadow: '0 0 50px rgba(217, 181, 138, 0.15)',
            background: 'linear-gradient(180deg, #F3EBDD 0%, rgba(243, 235, 221, 0.45) 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            margin: '0 auto',
          }}
        >
          THE ROASTED
          <br />
          <span style={{ color: '#D9B58A', WebkitTextStroke: 'none' }}>BEAN.</span>
        </h1>
      </div>

      {/* 3D WEBGL INTERACTIVE CANVAS */}
      <CoffeeTransformation progress={progress} />

      {/* BOTTOM HERO CONTENT (Foreground in front of 3D Canvas) */}
      <div 
        style={{
          position: 'absolute',
          bottom: '3rem',
          left: 0,
          right: 0,
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 1.5rem',
          opacity: controlsOpacity,
          transform: `translateY(${(1 - controlsOpacity) * 25}px)`,
          transition: 'opacity 0.5s ease, transform 0.5s ease',
          pointerEvents: progress > 0.4 ? 'auto' : 'none'
        }}
      >
        <p 
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.15rem, 2.2vw, 1.65rem)',
            fontStyle: 'italic',
            color: 'var(--color-cream)',
            maxWidth: '560px',
            marginBottom: '2rem',
            textShadow: '0 2px 15px rgba(0,0,0,0.8)'
          }}
        >
          Good coffee. Great food. Better moments.
        </p>

        {/* Primary & Secondary Call to Actions */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.25rem',
            justifyContent: 'center',
            marginBottom: '2.5rem'
          }}
        >
          <button 
            onClick={onExploreMenu}
            className="btn-primary"
            style={{ minWidth: '200px' }}
          >
            <span>EXPLORE OUR MENU</span>
          </button>
          <button 
            onClick={onOurStory}
            className="btn-secondary"
            style={{ minWidth: '180px' }}
          >
            <span>OUR STORY</span>
          </button>
        </div>

        {/* SIGNATURE TRANSFORMATION CONTROLS (Brand Delight) */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            background: 'rgba(23, 17, 14, 0.75)',
            border: '1px solid var(--border-subtle)',
            padding: '0.45rem 1rem',
            borderRadius: 'var(--radius-pill)',
            backdropFilter: 'blur(10px)',
            maxWidth: '90%',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}
        >
          <button
            onClick={handleReplay}
            title="Replay Bean-to-Cup Transformation"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-copper)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              fontFamily: 'var(--font-display)',
              padding: '0.2rem 0.5rem',
              transition: 'color 0.2s ease'
            }}
          >
            <RotateCcw size={14} className={isPlaying ? 'animate-spin' : ''} />
            <span>{isPlaying ? 'TRANSFORMING...' : 'REPLAY'}</span>
          </button>

          <div style={{ height: '14px', width: '1px', background: 'var(--border-subtle)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--color-cream-muted)', letterSpacing: '0.05em' }}>
              ROAST BEAN
            </span>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={progress}
              onChange={handleSliderChange}
              aria-label="3D Coffee Morph Scrub"
              style={{
                width: '100px',
                accentColor: 'var(--color-caramel)',
                cursor: 'pointer'
              }}
            />
            <span style={{ fontSize: '0.68rem', color: 'var(--color-copper)', letterSpacing: '0.05em' }}>
              STEAM CUP
            </span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a 
          href="#split-experience"
          aria-label="Scroll down to split experience"
          style={{
            marginTop: '1.25rem',
            color: 'var(--color-copper)',
            opacity: 0.65,
            transition: 'opacity 0.2s ease, transform 0.2s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: '0.68rem',
            letterSpacing: '0.15em'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.65'; }}
        >
          <ChevronDown size={20} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
