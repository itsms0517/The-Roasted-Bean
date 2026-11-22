import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Curated background floating beans with multiplane depth of field
const BG_BEANS = [
  // Deep Background Layer (defocused, slow parallax drift)
  { id: 'bg-1', left: '10%', top: '14%', size: 75, rotate: 28, blur: 7, opacity: 0.35, depth: 0.25, highlight: false },
  { id: 'bg-2', left: '88%', top: '16%', size: 90, rotate: -42, blur: 8, opacity: 0.3, depth: 0.22, highlight: false },
  { id: 'bg-3', left: '12%', top: '70%', size: 70, rotate: 65, blur: 6, opacity: 0.32, depth: 0.28, highlight: false },
  { id: 'bg-4', left: '86%', top: '68%', size: 80, rotate: -18, blur: 7, opacity: 0.28, depth: 0.24, highlight: false },

  // Midground Layer (moderate focus, warm caramel rim highlight)
  { id: 'bg-5', left: '5%', top: '40%', size: 125, rotate: -25, blur: 2.5, opacity: 0.65, depth: 0.55, highlight: true },
  { id: 'bg-6', left: '91%', top: '42%', size: 135, rotate: 38, blur: 2.5, opacity: 0.7, depth: 0.58, highlight: true },
  { id: 'bg-7', left: '24%', top: '12%', size: 105, rotate: -12, blur: 3.5, opacity: 0.55, depth: 0.45, highlight: false },
  { id: 'bg-8', left: '76%', top: '32%', size: 115, rotate: 80, blur: 3.5, opacity: 0.6, depth: 0.48, highlight: true },

  // Foreground Bokeh Layer (near camera, soft lens blur, larger motion)
  { id: 'bg-9', left: '-2%', top: '76%', size: 180, rotate: 18, blur: 5, opacity: 0.48, depth: 0.85, highlight: false },
  { id: 'bg-10', left: '94%', top: '8%', size: 170, rotate: -55, blur: 4, opacity: 0.52, depth: 0.9, highlight: true },
  { id: 'bg-11', left: '48%', top: '82%', size: 140, rotate: 42, blur: 5, opacity: 0.45, depth: 0.8, highlight: false },
];

// Physical roasted coffee crunch crumbs & shards that scatter outward when it snaps
const CRUNCH_SHARDS = [
  { id: 1, startY: 20, targetX: -75, targetY: -50, size: 5.5, rot: 340, color: '#2a150b' },
  { id: 2, startY: 24, targetX: 85, targetY: -40, size: 4.0, rot: -280, color: '#1c0e08' },
  { id: 3, startY: 30, targetX: -105, targetY: -25, size: 6.0, rot: 420, color: '#3d2012' },
  { id: 4, startY: 34, targetX: 95, targetY: -20, size: 4.5, rot: -360, color: '#6b3d1f' },
  { id: 5, startY: 40, targetX: -125, targetY: 10, size: 7.0, rot: 510, color: '#2a150b' },
  { id: 6, startY: 44, targetX: 115, targetY: 5, size: 5.0, rot: -440, color: '#A66C43' },
  { id: 7, startY: 50, targetX: -110, targetY: 35, size: 6.5, rot: 390, color: '#1c0e08' },
  { id: 8, startY: 54, targetX: 125, targetY: 25, size: 4.0, rot: -480, color: '#3d2012' },
  { id: 9, startY: 60, targetX: -90, targetY: 55, size: 5.0, rot: 320, color: '#6b3d1f' },
  { id: 10, startY: 66, targetX: 100, targetY: 60, size: 6.0, rot: -310, color: '#2a150b' },
  { id: 11, startY: 72, targetX: -80, targetY: 80, size: 4.5, rot: 290, color: '#1c0e08' },
  { id: 12, startY: 78, targetX: 75, targetY: 75, size: 5.5, rot: -260, color: '#3d2012' },
  { id: 13, startY: 84, targetX: -65, targetY: 95, size: 3.5, rot: 220, color: '#A66C43' },
  { id: 14, startY: 88, targetX: 60, targetY: 100, size: 4.0, rot: -240, color: '#2a150b' },
  // Micro-granules
  { id: 15, startY: 28, targetX: -55, targetY: -60, size: 2.5, rot: 180, color: '#874d25' },
  { id: 16, startY: 38, targetX: 65, targetY: -45, size: 2.0, rot: -190, color: '#874d25' },
  { id: 17, startY: 48, targetX: -70, targetY: 5, size: 3.0, rot: 250, color: '#A66C43' },
  { id: 18, startY: 58, targetX: 75, targetY: 15, size: 2.5, rot: -230, color: '#874d25' },
  { id: 19, startY: 68, targetX: -60, targetY: 65, size: 2.8, rot: 210, color: '#A66C43' },
  { id: 20, startY: 78, targetX: 55, targetY: 85, size: 2.2, rot: -170, color: '#874d25' }
];

export default function HeroScrollExperience({ onExploreMenu, onOurStory }) {
  const pinWrapperRef = useRef(null);
  const stageRef = useRef(null);
  const centralBeanWrapRef = useRef(null);
  const leftHalfRef = useRef(null);
  const rightHalfRef = useRef(null);
  const titleWrapperRef = useRef(null);
  const eyebrowRef = useRef(null);
  const subContentRef = useRef(null);
  const promptRef = useRef(null);
  const bgBeansRef = useRef([]);
  const canvasRef = useRef(null);
  const shardsRef = useRef([]);
  const stressCrackRef = useRef(null);

  // Background floating ambient particles canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 2.2 + 0.8,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -0.25 - Math.random() * 0.45,
      alpha: Math.random() * 0.55 + 0.2,
      color: Math.random() > 0.4 ? '#D9B58A' : '#A66C43'
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // GSAP ScrollTrigger Pinned Timeline
  useEffect(() => {
    const pinWrapper = pinWrapperRef.current;
    const stage = stageRef.current;
    const centralWrap = centralBeanWrapRef.current;
    const leftHalf = leftHalfRef.current;
    const rightHalf = rightHalfRef.current;
    const titleWrapper = titleWrapperRef.current;
    const eyebrow = eyebrowRef.current;
    const subContent = subContentRef.current;
    const prompt = promptRef.current;
    const stressCrack = stressCrackRef.current;

    if (!pinWrapper || !stage) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(leftHalf, { x: '-34vw', rotateZ: -5 });
      gsap.set(rightHalf, { x: '34vw', rotateZ: 5 });
      gsap.set(titleWrapper, { opacity: 1, scale: 1 });
      gsap.set(eyebrow, { opacity: 1 });
      gsap.set(subContent, { opacity: 1, y: 0 });
      gsap.set(prompt, { opacity: 0 });
      return;
    }

    // Determine responsive split distance
    const isMobile = window.innerWidth < 768;
    const splitX = isMobile ? 38 : 34; // in vw units

    // Initial state:
    // IMPORTANT: Explicitly preserve xPercent: -50 and yPercent: -50 so the bean is centered on the H1!
    gsap.set(centralWrap, { xPercent: -50, yPercent: -50, scale: 1, x: 0, y: 0 });
    gsap.set(leftHalf, { x: 0, y: 0, rotateZ: 0 });
    gsap.set(rightHalf, { x: 0, y: 0, rotateZ: 0 });
    gsap.set(stressCrack, { opacity: 0, scale: 0.98 });
    gsap.set(titleWrapper, { opacity: 0, scale: 0.92, filter: 'blur(8px)' });
    gsap.set(eyebrow, { opacity: 0 });
    gsap.set(subContent, { opacity: 0, y: 20 });
    gsap.set(prompt, { opacity: 1 });

    // Initial shard states (tucked inside the center fissure)
    shardsRef.current.forEach(el => {
      if (el) gsap.set(el, { x: 0, y: 0, scale: 0, opacity: 0 });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinWrapper,
        start: 'top top',
        end: '+=240%', // Smooth 2.4 viewport heights of scrubbed control
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // 1. Initial Scroll Phase (0% - 20%): Slow cinematic camera push-in on central bean
    tl.to(centralWrap, {
      scale: 1.1,
      xPercent: -50,
      yPercent: -50,
      duration: 0.22,
      ease: 'power1.out',
    }, 0);

    // Fade out scroll prompt helper early
    tl.to(prompt, {
      opacity: 0,
      y: 20,
      duration: 0.12,
      ease: 'power2.out'
    }, 0.05);

    // Background beans multiplane parallax outwards
    bgBeansRef.current.forEach((el, idx) => {
      if (el) {
        const depth = BG_BEANS[idx]?.depth || 0.5;
        tl.to(el, {
          y: depth * -120,
          scale: 1 + depth * 0.15,
          duration: 1,
          ease: 'none'
        }, 0);
      }
    });

    // 2. CRUNCH TENSION PHASE (18% - 28%):
    // Physical micro-tremor right before the snap while maintaining exact centering!
    tl.to(centralWrap, {
      x: -1.5,
      y: 0.8,
      xPercent: -50,
      yPercent: -50,
      duration: 0.03,
      repeat: 3,
      yoyo: true,
      ease: 'rough({template: none, strength: 2, points: 10, randomize: true})'
    }, 0.18);

    // Subtle dark jagged stress fissure appears inside the crease (NO glowing line!)
    tl.to(stressCrack, {
      opacity: 0.75,
      scale: 1.0,
      duration: 0.08,
      ease: 'power2.in'
    }, 0.20);

    // 3. THE CRUNCH SNAP & SHARD ERUPTION (28% - 45%):
    // The brittle roasted bean SNAPS! Flying coffee crumbs & shards erupt outward!
    shardsRef.current.forEach((el, idx) => {
      if (el) {
        const shard = CRUNCH_SHARDS[idx];
        tl.fromTo(el, 
          { x: 0, y: 0, scale: 0.4, opacity: 1 },
          {
            x: shard.targetX,
            y: shard.targetY,
            rotate: shard.rot,
            scale: 0.85,
            opacity: 0,
            duration: 0.45,
            ease: 'power2.out'
          },
          0.28
        );
      }
    });

    // Hide stress fissure as bean parts
    tl.to(stressCrack, {
      opacity: 0,
      duration: 0.08,
      ease: 'power2.out'
    }, 0.30);

    // 4. Bean Halves Separate (28% - 85%):
    // The two halves slide apart horizontally, framing the EXACT centerline of the title
    tl.to(leftHalf, {
      x: `-${splitX}vw`,
      rotateZ: -5,
      duration: 0.55,
      ease: 'power2.inOut',
    }, 0.28);

    tl.to(rightHalf, {
      x: `${splitX}vw`,
      rotateZ: 5,
      duration: 0.55,
      ease: 'power2.inOut',
    }, 0.28);

    // 5. SIMULTANEOUS Typography Reveal (30% - 85%):
    // The title emerges in the EXACT vertical center between the parting halves
    tl.to(titleWrapper, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.5,
      ease: 'power2.out',
    }, 0.30);

    tl.to(eyebrow, {
      opacity: 1,
      duration: 0.35,
      ease: 'power2.out'
    }, 0.35);

    // Subtitle & Buttons reveal slightly after title locks into place
    tl.to(subContent, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out'
    }, 0.45);

    // Subtle scale refinement at final resting state
    tl.to(centralWrap, {
      scale: 1.05,
      xPercent: -50,
      yPercent: -50,
      duration: 0.2,
      ease: 'power1.out'
    }, 0.8);

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === pinWrapper) t.kill();
      });
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={pinWrapperRef}
      className="hero-scroll-pin-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#17110E',
        overflow: 'hidden'
      }}
    >
      {/* Pinned Stage (100vh full-screen pinned canvas) */}
      <div 
        ref={stageRef}
        className="hero-pinned-stage"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#17110E',
          overflow: 'hidden',
          padding: '70px 1.5rem 30px', // Clear navbar and balance breathing space
          boxSizing: 'border-box'
        }}
      >
        {/* Background Deep Espresso & Caramel Vignette Lighting */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 42%, #302018 0%, #1c130e 50%, #100b09 100%)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        {/* Ambient Floating Dust & Roast Particles */}
        <canvas 
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 2
          }}
        />

        {/* FLOATING BACKGROUND BEANS LAYER (Isolated Transparent Beans with Depth of Field) */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 3
          }}
        >
          {BG_BEANS.map((b, idx) => (
            <div
              key={b.id}
              ref={el => bgBeansRef.current[idx] = el}
              style={{
                position: 'absolute',
                left: b.left,
                top: b.top,
                width: `${b.size}px`,
                height: `${b.size * 1.2}px`,
                transform: `rotate(${b.rotate}deg)`,
                opacity: b.opacity,
                filter: `blur(${b.blur}px) ${b.highlight ? 'drop-shadow(0 0 25px rgba(217, 181, 138, 0.45))' : ''}`,
                transition: 'filter 0.4s ease',
              }}
            >
              <img 
                src="/assets/images/bean-isolated.png" 
                alt="Floating coffee bean"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  filter: b.highlight ? 'brightness(1.15) contrast(1.1)' : 'brightness(0.7) contrast(0.95)'
                }}
              />
            </div>
          ))}
        </div>

        {/* UNIFIED HERO COMPOSITION (ELEVATED INTO TOP SECTION WITH GENEROUS BREATHING SPACE) */}
        <div 
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            transform: 'translateY(-28px)' // Lifts composition gracefully into the upper visual golden ratio
          }}
        >
          {/* Top Label Eyebrow */}
          <div 
            ref={eyebrowRef}
            className="label-eyebrow"
            style={{ 
              marginBottom: '1rem',
              color: 'var(--color-copper)',
              fontSize: 'clamp(0.7rem, 1.1vw, 0.85rem)',
              letterSpacing: '0.3em'
            }}
          >
            EST. FOR THE LOVE OF COFFEE
          </div>

          {/* FOCAL TITLE & BEAN FRAME: Centered with Mathematical Exactness! */}
          <div 
            style={{
              position: 'relative',
              width: '100%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 'clamp(280px, 38vh, 440px)'
            }}
          >
            {/* BRAND TITLE */}
            <div 
              ref={titleWrapperRef}
              style={{
                position: 'relative',
                zIndex: 5,
                width: '100%',
                userSelect: 'none',
                pointerEvents: 'auto'
              }}
            >
              <h1 
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.8rem, 7.2vw, 6.4rem)',
                  fontWeight: 800,
                  lineHeight: 0.95,
                  letterSpacing: '0.04em',
                  color: 'var(--color-cream)',
                  textShadow: '0 0 60px rgba(217, 181, 138, 0.2), 0 10px 40px rgba(0, 0, 0, 0.9)',
                  margin: 0,
                  textTransform: 'uppercase'
                }}
              >
                THE ROASTED
                <br />
                <span style={{ 
                  color: 'var(--color-copper)',
                  background: 'linear-gradient(135deg, #F3EBDD 0%, #D9B58A 50%, #A66C43 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  BEAN.
                </span>
              </h1>
            </div>

            {/* CENTRAL OVERSIZED ROASTED BEAN CONTAINER (Anchored DIRECTLY to the Title Center!) */}
            <div 
              ref={centralBeanWrapRef}
              className="central-bean-master"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'clamp(320px, 42vw, 490px)',
                aspectRatio: '410 / 491',
                zIndex: 10,
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Brittle Stress Fractures (Fine organic micro-cracks before break) */}
              <svg 
                ref={stressCrackRef}
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  zIndex: 14,
                  opacity: 0
                }}
              >
                <path 
                  d="M 48 10 L 47 22 L 49 26 L 46 34 L 48 44 L 45 52 L 47 62 L 44 72 L 46 82 L 45 92"
                  fill="none"
                  stroke="#0f0704"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path 
                  d="M 47 22 L 44 24 M 46 34 L 49 37 M 48 44 L 51 46 M 45 52 L 42 55 M 47 62 L 50 64"
                  fill="none"
                  stroke="#2c1409"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
              </svg>

              {/* CRUNCH SHARDS & ROASTED COFFEE CRUMBS (Fly outward when the bean breaks) */}
              {CRUNCH_SHARDS.map((shard, idx) => (
                <div
                  key={shard.id}
                  ref={el => shardsRef.current[idx] = el}
                  style={{
                    position: 'absolute',
                    top: `${shard.startY}%`,
                    left: '48%',
                    width: `${shard.size}px`,
                    height: `${shard.size * 0.8}px`,
                    backgroundColor: shard.color,
                    borderRadius: idx % 2 === 0 ? '1px' : '50%',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.85)',
                    pointerEvents: 'none',
                    zIndex: 16,
                    transformOrigin: 'center center'
                  }}
                />
              ))}

              {/* LEFT BEAN HALF (Jagged organic broken crunch edge) */}
              <div 
                ref={leftHalfRef}
                className="bean-half bean-half-left"
                style={{
                  position: 'absolute',
                  inset: 0,
                  filter: 'drop-shadow(4px 0 14px rgba(10, 7, 5, 0.9)) drop-shadow(0 20px 45px rgba(0,0,0,0.85))',
                  willChange: 'transform'
                }}
              >
                <img 
                  src="/assets/images/bean-half-left.png" 
                  alt="The Roasted Bean Left Half"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              </div>

              {/* RIGHT BEAN HALF (Jagged organic broken crunch edge) */}
              <div 
                ref={rightHalfRef}
                className="bean-half bean-half-right"
                style={{
                  position: 'absolute',
                  inset: 0,
                  filter: 'drop-shadow(-4px 0 14px rgba(10, 7, 5, 0.9)) drop-shadow(0 20px 45px rgba(0,0,0,0.85))',
                  willChange: 'transform'
                }}
              >
                <img 
                  src="/assets/images/bean-half-right.png" 
                  alt="The Roasted Bean Right Half"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              </div>
            </div>
          </div>

          {/* LOWER SUPPORTING CONTENT (Tagline & Actions with Generous Breathing Space) */}
          <div 
            ref={subContentRef}
            style={{
              marginTop: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <p 
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.1rem, 1.8vw, 1.45rem)',
                fontStyle: 'italic',
                color: 'var(--color-cream)',
                opacity: 0.9,
                maxWidth: '540px',
                margin: '0 auto 1.5rem',
                lineHeight: 1.4,
                textShadow: '0 4px 20px rgba(0,0,0,0.85)'
              }}
            >
              Good coffee. Great food. Better moments.
            </p>

            <div 
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.25rem',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <button 
                onClick={onExploreMenu}
                className="btn-primary"
                style={{ minWidth: '190px' }}
              >
                <span>EXPLORE OUR MENU</span>
                <ArrowUpRight size={16} />
              </button>
              <button 
                onClick={onOurStory}
                className="btn-secondary"
                style={{ minWidth: '170px' }}
              >
                <span>OUR STORY</span>
              </button>
            </div>
          </div>
        </div>

        {/* SCROLL HELPER PROMPT (Visible on page load, fades away on initial scroll) */}
        <div 
          ref={promptRef}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            zIndex: 20,
            pointerEvents: 'none',
            color: 'var(--color-copper)',
            fontFamily: 'var(--font-display)',
            fontSize: '0.72rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase'
          }}
        >
          <span style={{ opacity: 0.85 }}>SCROLL TO ROAST & REVEAL</span>
          <div 
            style={{
              width: '1px',
              height: '32px',
              background: 'linear-gradient(180deg, var(--color-copper) 0%, transparent 100%)',
              animation: 'pulseGlow 2s infinite ease-in-out'
            }}
          />
          <ChevronDown size={16} className="animate-bounce" style={{ opacity: 0.7 }} />
        </div>
      </div>
    </div>
  );
}
