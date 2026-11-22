import React, { useState } from 'react';
import { ArrowUp, Instagram, Facebook, Twitter, Coffee, Check } from 'lucide-react';

export default function Footer({ onNavClick }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subMessage, setSubMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      setSubMessage(data.message || 'Subscribed successfully!');
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      setSubMessage('Welcome to The Roasted Bean Reserve.');
      setSubscribed(true);
      setEmail('');
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      style={{
        backgroundColor: '#0e0a08',
        borderTop: '1px solid var(--border-subtle)',
        padding: '6rem 0 3rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        {/* Top Section: Brand Statement & Newsletter */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3.5rem',
            marginBottom: '5rem',
            paddingBottom: '4rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <Coffee size={20} color="var(--color-copper)" />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', letterSpacing: '0.15em', color: 'var(--color-cream)' }}>
                THE ROASTED BEAN
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontStyle: 'italic', color: 'var(--color-cream-muted)', maxWidth: '380px', lineHeight: 1.6 }}>
              "Good coffee. Great food. Better moments."
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-cream-muted)', marginTop: '0.75rem', opacity: 0.7 }}>
              Dark cinematic café experience dedicated to the craft of slow-roasted beans and artisanal cuisine.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', letterSpacing: '0.18em', color: 'var(--color-copper)', marginBottom: '1.25rem' }}>
                EXPERIENCE
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li>
                  <a 
                    href="#hero" 
                    onClick={(e) => { e.preventDefault(); onNavClick('hero'); }}
                    style={{ color: 'var(--color-cream-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-copper)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-cream-muted)'; }}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="#coffee-section" 
                    onClick={(e) => { e.preventDefault(); onNavClick('coffee-section'); }}
                    style={{ color: 'var(--color-cream-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-copper)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-cream-muted)'; }}
                  >
                    Coffee
                  </a>
                </li>
                <li>
                  <a 
                    href="#food-section" 
                    onClick={(e) => { e.preventDefault(); onNavClick('food-section'); }}
                    style={{ color: 'var(--color-cream-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-copper)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-cream-muted)'; }}
                  >
                    Food
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', letterSpacing: '0.18em', color: 'var(--color-copper)', marginBottom: '1.25rem' }}>
                DISCOVER
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li>
                  <a 
                    href="#our-story" 
                    onClick={(e) => { e.preventDefault(); onNavClick('our-story'); }}
                    style={{ color: 'var(--color-cream-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-copper)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-cream-muted)'; }}
                  >
                    Our Story
                  </a>
                </li>
                <li>
                  <a 
                    href="#visit-us" 
                    onClick={(e) => { e.preventDefault(); onNavClick('visit-us'); }}
                    style={{ color: 'var(--color-cream-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-copper)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-cream-muted)'; }}
                  >
                    Contact & Visit
                  </a>
                </li>
                <li>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ color: 'var(--color-cream-muted)', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-copper)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-cream-muted)'; }}
                  >
                    <Instagram size={14} />
                    <span>Instagram</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Luxury Newsletter */}
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', letterSpacing: '0.18em', color: 'var(--color-copper)', marginBottom: '1.25rem' }}>
              ROAST LETTERS
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-cream-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
              Receive invitations to private cupping sessions, seasonal harvest releases, and chef pairing evenings.
            </p>
            {subscribed ? (
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--color-copper)',
                  fontSize: '0.85rem',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(217, 181, 138, 0.08)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <Check size={16} />
                <span>{subMessage}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  style={{
                    flexGrow: 1,
                    padding: '0.75rem 1rem',
                    backgroundColor: 'rgba(23, 17, 14, 0.9)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#fff',
                    fontSize: '0.85rem'
                  }}
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="btn-primary" 
                  style={{ padding: '0.75rem 1.25rem', fontSize: '0.72rem', opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'JOINING...' : 'JOIN'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* MONUMENTAL WORDMARK */}
        <div style={{ textAlign: 'center', margin: '2rem 0 3.5rem', overflow: 'hidden' }}>
          <div 
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 8.5vw, 7.8rem)',
              fontWeight: 900,
              letterSpacing: '0.08em',
              lineHeight: 0.9,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(217, 181, 138, 0.15)',
              opacity: 0.5,
              userSelect: 'none'
            }}
          >
            THE ROASTED BEAN
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            fontSize: '0.8rem',
            color: 'var(--color-cream-muted)',
            opacity: 0.8
          }}
        >
          <div>
            © {new Date().getFullYear()} The Roasted Bean. All rights reserved. Crafted with slow passion.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span>Dark Cinematic Luxury</span>
            <button
              onClick={scrollToTop}
              title="Return to Top"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(23, 17, 14, 0.8)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--color-cream)',
                padding: '0.5rem 0.9rem',
                borderRadius: 'var(--radius-pill)',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-copper)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
            >
              <span>TOP</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
