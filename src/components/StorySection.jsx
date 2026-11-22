import React from 'react';
import { HeartHandshake, Coffee, Sparkles } from 'lucide-react';

export default function StorySection() {
  return (
    <section 
      id="our-story"
      style={{
        padding: '8rem 0',
        backgroundColor: '#120d0a',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4.5rem',
            alignItems: 'center'
          }}
        >
          {/* Editorial Brand Narrative */}
          <div>
            <span className="label-eyebrow">OUR PHILOSOPHY</span>

            <h2 
              style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
                lineHeight: 1.1,
                fontWeight: 800,
                marginTop: '1rem',
                letterSpacing: '0.04em',
                color: 'var(--color-cream)'
              }}
            >
              NOT JUST A CAFÉ.
              <br />
              <span style={{ color: 'var(--color-copper)' }}>A PLACE TO PAUSE.</span>
            </h2>

            <p 
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontStyle: 'italic',
                color: 'var(--color-cream)',
                marginTop: '1.5rem',
                lineHeight: 1.6
              }}
            >
              In a world that rushes endlessly, we built The Roasted Bean as a sanctuary for the senses.
            </p>

            <div 
              style={{
                marginTop: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.98rem',
                color: 'var(--color-cream-muted)',
                lineHeight: 1.7
              }}
            >
              <p>
                From the moment you step through our doors, the ambient hum of espresso extraction and the fragrance of roasted beans create an unhurried haven. Every batch of coffee is dialed in daily by baristas who treat water temperature, grind geometry, and steam texture with quiet reverence.
              </p>
              <p>
                Our kitchen shares the same discipline. We ferment sourdough over 72 hours, source honest cheeses, and bake fresh daily so that every dish—from morning sandwiches to evening wood-fired pizzas—feels thoughtful, comforting, and deeply satisfying.
              </p>
            </div>

            {/* Pillar highlights */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
                marginTop: '2.5rem',
                paddingTop: '2rem',
                borderTop: '1px solid var(--border-subtle)'
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--color-copper)', marginBottom: '0.35rem' }}>
                  THE BEAN
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-cream-muted)' }}>
                  Ethically selected single-origins and handcrafted house roast blends.
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--color-copper)', marginBottom: '0.35rem' }}>
                  THE TABLE
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-cream-muted)' }}>
                  A warm gathering room where conversation and slow nourishment reign.
                </div>
              </div>
            </div>
          </div>

          {/* Large Café Interior Photograph */}
          <div style={{ position: 'relative' }}>
            <div 
              className="luxury-card"
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(0,0,0,0.85)',
                border: '1px solid var(--border-medium)',
                position: 'relative',
                maxHeight: '600px'
              }}
            >
              <img 
                src="/assets/images/cafe-interior.jpg" 
                alt="The Roasted Bean Café Interior Ambience"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'brightness(0.9) contrast(1.05)',
                  transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              />

              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 65%, rgba(18, 13, 10, 0.95) 100%)',
                  pointerEvents: 'none'
                }}
              />

              {/* Bottom Quote Badge */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: '1.75rem',
                  left: '1.75rem',
                  right: '1.75rem',
                  backgroundColor: 'rgba(23, 17, 14, 0.85)',
                  border: '1px solid var(--border-subtle)',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--color-cream)' }}>
                  "Take your time. We roasted this moment just for you."
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
