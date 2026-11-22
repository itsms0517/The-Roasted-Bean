import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';

export default function SignatureSection({ onExploreCoffee, onExploreFood }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="signature-showcase"
      style={{
        position: 'relative',
        padding: '9rem 0',
        backgroundColor: '#17110E',
        overflow: 'hidden',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)'
      }}
    >
      {/* Dynamic Background Parallax Glow */}
      <div 
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(217, 181, 138, 0.08) 0%, rgba(166, 108, 67, 0.04) 40%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Cinematic Oversized Headline */}
        <div style={{ textAlign: 'center', marginBottom: '5.5rem' }}>
          <span className="label-eyebrow">THE SIGNATURE PAIRING</span>

          <h2 
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 5.2rem)',
              lineHeight: 1.05,
              fontWeight: 800,
              marginTop: '1.25rem',
              letterSpacing: '0.04em',
              color: 'var(--color-cream)'
            }}
          >
            A LITTLE BIT OF COMFORT.
            <br />
            <span style={{ color: 'var(--color-copper)' }}>A LOT OF FLAVOUR.</span>
          </h2>

          <p 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
              fontStyle: 'italic',
              color: 'var(--color-cream-muted)',
              maxWidth: '680px',
              margin: '1.5rem auto 0',
              lineHeight: 1.6
            }}
          >
            An intimate collision of hot velvety brew and savory culinary craftsmanship. Designed for slow sips, rich conversations, and lingering afternoons.
          </p>
        </div>

        {/* Coffee Cup on One Side & Signature Food on the Other */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center'
          }}
        >
          {/* LEFT: Ceramic Coffee Experience */}
          <div 
            className="luxury-card"
            style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              backgroundColor: '#1b1410',
              boxShadow: '0 30px 70px rgba(0,0,0,0.85)',
              border: '1px solid var(--border-medium)',
              position: 'relative',
              transform: `translateY(${Math.sin(scrollY * 0.002) * 8}px)`,
              transition: 'transform 0.2s ease-out'
            }}
          >
            <div style={{ position: 'relative', height: '440px', overflow: 'hidden' }}>
              <img 
                src="/assets/images/ceramic-cup.jpg" 
                alt="Signature Dark Ceramic Cup"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.8s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              />

              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(23, 17, 14, 0.95) 100%)'
                }}
              />

              <div 
                style={{
                  position: 'absolute',
                  bottom: '2rem',
                  left: '2rem',
                  right: '2rem'
                }}
              >
                <span className="label-eyebrow" style={{ fontSize: '0.68rem', marginBottom: '0.5rem' }}>
                  THE VESSEL & ROAST
                </span>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#fff' }}>
                  Matte Ceramic Espresso
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-cream-muted)', marginBottom: '1.25rem' }}>
                  Double shot extracted at 200°F into heavy textured earthenware that holds aroma and heat down to the final drop.
                </p>
                <button 
                  onClick={onExploreCoffee}
                  className="btn-primary btn-pill"
                >
                  <span>SEE COFFEE MENU</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Signature Food Pairing */}
          <div 
            className="luxury-card"
            style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              backgroundColor: '#1b1410',
              boxShadow: '0 30px 70px rgba(0,0,0,0.85)',
              border: '1px solid var(--border-medium)',
              position: 'relative',
              transform: `translateY(${Math.cos(scrollY * 0.002) * 8}px)`,
              transition: 'transform 0.2s ease-out'
            }}
          >
            <div style={{ position: 'relative', height: '440px', overflow: 'hidden' }}>
              <img 
                src="/assets/images/pizza-artisan.jpg" 
                alt="Signature Wood-Fired Pizza"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.8s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              />

              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(23, 17, 14, 0.95) 100%)'
                }}
              />

              <div 
                style={{
                  position: 'absolute',
                  bottom: '2rem',
                  left: '2rem',
                  right: '2rem'
                }}
              >
                <span className="label-eyebrow" style={{ fontSize: '0.68rem', marginBottom: '0.5rem' }}>
                  THE OVEN CRUST
                </span>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#fff' }}>
                  Blistered Pepperoni Honey
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-cream-muted)', marginBottom: '1.25rem' }}>
                  Crispy curled artisan pepperoni cups, hot chili honey drizzle, and bubbling fior di latte on wild sourdough.
                </p>
                <button 
                  onClick={onExploreFood}
                  className="btn-primary btn-pill"
                >
                  <span>SEE FOOD MENU</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
