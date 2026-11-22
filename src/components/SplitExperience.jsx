import React, { useState } from 'react';
import { ArrowUpRight, Coffee, UtensilsCrossed } from 'lucide-react';

export default function SplitExperience({ onSelectCoffee, onSelectFood }) {
  const [activeSide, setActiveSide] = useState(null); // 'coffee', 'food', or null

  return (
    <section 
      id="split-experience"
      className="split-experience-section"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#17110E',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '5rem 0',
      }}
    >
      {/* Background Central Ambient Glow */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(166, 108, 67, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Section Header */}
      <div 
        className="container"
        style={{
          textAlign: 'center',
          marginBottom: '3rem',
          position: 'relative',
          zIndex: 2
        }}
      >
        <span className="label-eyebrow">THE TWO WORLDS OF FLAVOUR</span>
        <h2 
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: 'var(--color-cream)',
            marginTop: '0.75rem',
            letterSpacing: '0.08em'
          }}
        >
          TWO PASSIONS. ONE ROOF.
        </h2>
        <p 
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.2rem',
            fontStyle: 'italic',
            color: 'var(--color-cream-muted)',
            maxWidth: '600px',
            margin: '0.75rem auto 0'
          }}
        >
          Whether you crave the artisanal warmth of a morning pour or the savory comfort of wood-fired craft.
        </p>
      </div>

      {/* Split Interactive Container */}
      <div 
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          minHeight: '620px'
        }}
      >
        {/* LEFT PANEL: COFFEE */}
        <div 
          className="split-panel luxury-card"
          onMouseEnter={() => setActiveSide('coffee')}
          onMouseLeave={() => setActiveSide(null)}
          onClick={onSelectCoffee}
          style={{
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            border: activeSide === 'coffee' ? '1px solid var(--color-copper)' : '1px solid var(--border-subtle)',
            boxShadow: activeSide === 'coffee' 
              ? '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(217, 181, 138, 0.25)' 
              : '0 15px 40px rgba(0,0,0,0.5)',
            transform: activeSide === 'coffee' ? 'translateY(-8px) scale(1.015)' : 'translateY(0) scale(1)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 'clamp(2rem, 4vw, 3.5rem)',
            minHeight: '520px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background Image with Cinematic Grading */}
          <div 
            className="panel-bg"
            style={{
              backgroundImage: 'url(/assets/images/espresso-splash.jpg)',
              transform: activeSide === 'coffee' ? 'scale(1.08)' : 'scale(1)',
              filter: activeSide === 'coffee' ? 'brightness(0.9) contrast(1.1)' : 'brightness(0.75) contrast(1.05)',
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease',
            }}
          />

          {/* Vignette Overlay */}
          <div 
            className="panel-overlay"
            style={{
              background: 'linear-gradient(180deg, rgba(23, 17, 14, 0.2) 0%, rgba(23, 17, 14, 0.75) 50%, rgba(15, 11, 9, 0.96) 100%)'
            }}
          />

          {/* Badge */}
          <div 
            style={{
              position: 'absolute',
              top: '2rem',
              left: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'rgba(23, 17, 14, 0.75)',
              border: '1px solid var(--border-subtle)',
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-pill)',
              backdropFilter: 'blur(8px)',
              zIndex: 3
            }}
          >
            <Coffee size={15} color="var(--color-copper)" />
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', fontFamily: 'var(--font-display)', color: 'var(--color-copper)' }}>
              SPECIALTY ROAST
            </span>
          </div>

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 3 }}>
            <h3 
              style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                fontWeight: 800,
                color: 'var(--color-cream)',
                letterSpacing: '0.05em',
                marginBottom: '0.75rem',
                lineHeight: 1.05
              }}
            >
              COFFEE
            </h3>
            
            <p 
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
                color: 'var(--color-cream)',
                opacity: 0.9,
                fontStyle: 'italic',
                marginBottom: '2rem',
                maxWidth: '420px',
                lineHeight: 1.45
              }}
            >
              Your daily ritual, roasted to perfection. Single-origin beans, velvety microfoam and rich espresso extraction.
            </p>

            <button 
              className="btn-primary"
              style={{
                background: 'linear-gradient(135deg, var(--color-caramel) 0%, #7d431f 100%)',
                width: 'fit-content'
              }}
            >
              <span>EXPLORE COFFEE</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: FOOD */}
        <div 
          className="split-panel luxury-card"
          onMouseEnter={() => setActiveSide('food')}
          onMouseLeave={() => setActiveSide(null)}
          onClick={onSelectFood}
          style={{
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            border: activeSide === 'food' ? '1px solid var(--color-copper)' : '1px solid var(--border-subtle)',
            boxShadow: activeSide === 'food' 
              ? '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(217, 181, 138, 0.25)' 
              : '0 15px 40px rgba(0,0,0,0.5)',
            transform: activeSide === 'food' ? 'translateY(-8px) scale(1.015)' : 'translateY(0) scale(1)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 'clamp(2rem, 4vw, 3.5rem)',
            minHeight: '520px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background Image with Cinematic Grading */}
          <div 
            className="panel-bg"
            style={{
              backgroundImage: 'url(/assets/images/pizza-artisan.jpg)',
              transform: activeSide === 'food' ? 'scale(1.08)' : 'scale(1)',
              filter: activeSide === 'food' ? 'brightness(0.9) contrast(1.1)' : 'brightness(0.75) contrast(1.05)',
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease',
            }}
          />

          {/* Vignette Overlay */}
          <div 
            className="panel-overlay"
            style={{
              background: 'linear-gradient(180deg, rgba(23, 17, 14, 0.2) 0%, rgba(23, 17, 14, 0.75) 50%, rgba(15, 11, 9, 0.96) 100%)'
            }}
          />

          {/* Badge */}
          <div 
            style={{
              position: 'absolute',
              top: '2rem',
              left: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'rgba(23, 17, 14, 0.75)',
              border: '1px solid var(--border-subtle)',
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-pill)',
              backdropFilter: 'blur(8px)',
              zIndex: 3
            }}
          >
            <UtensilsCrossed size={15} color="var(--color-copper)" />
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', fontFamily: 'var(--font-display)', color: 'var(--color-copper)' }}>
              KITCHEN & BAKERY
            </span>
          </div>

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 3 }}>
            <h3 
              style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                fontWeight: 800,
                color: 'var(--color-cream)',
                letterSpacing: '0.05em',
                marginBottom: '0.75rem',
                lineHeight: 1.05
              }}
            >
              FOOD
            </h3>
            
            <p 
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
                color: 'var(--color-cream)',
                opacity: 0.9,
                fontStyle: 'italic',
                marginBottom: '2rem',
                maxWidth: '420px',
                lineHeight: 1.45
              }}
            >
              Made to satisfy every craving. Wood-fired sourdough pizzas, artisanal brioche smash burgers and crisp gourmet sides.
            </p>

            <button 
              className="btn-primary"
              style={{
                background: 'linear-gradient(135deg, var(--color-caramel) 0%, #7d431f 100%)',
                width: 'fit-content'
              }}
            >
              <span>EXPLORE FOOD</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
