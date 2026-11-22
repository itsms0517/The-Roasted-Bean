import React, { useState, useEffect } from 'react';
import { Coffee, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'Coffee', target: 'coffee-section' },
    { label: 'Food', target: 'food-section' },
    { label: 'Our Story', target: 'our-story' },
    { label: 'Visit', target: 'visit-us' }
  ];

  const handleLinkClick = (target) => {
    setMobileMenuOpen(false);
    onNavigate(target);
  };

  return (
    <>
      <nav 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundColor: scrolled ? 'rgba(23, 17, 14, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
          padding: scrolled ? '1rem 0' : '1.75rem 0',
          boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.6)' : 'none'
        }}
      >
        <div 
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Brand Logo */}
          <a 
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleLinkClick('hero'); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textDecoration: 'none',
              color: 'var(--color-cream)'
            }}
          >
            <div 
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(166, 108, 67, 0.2)',
                border: '1px solid var(--border-medium)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Coffee size={18} color="var(--color-copper)" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span 
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.05rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: 'var(--color-cream)',
                  lineHeight: 1
                }}
              >
                THE ROASTED BEAN
              </span>
              <span 
                style={{
                  fontSize: '0.62rem',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '0.22em',
                  color: 'var(--color-copper)',
                  marginTop: '0.2rem'
                }}
              >
                SPECIALTY ROASTER
              </span>
            </div>
          </a>

          {/* Desktop Center Links */}
          <div 
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '2.5rem'
            }}
            className="desktop-nav-links"
          >
            {navLinks.map((link) => (
              <a
                key={link.target}
                href={`#${link.target}`}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.target); }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-cream)',
                  opacity: 0.85,
                  textDecoration: 'none',
                  position: 'relative',
                  padding: '0.4rem 0',
                  transition: 'opacity 0.2s ease, color 0.2s ease'
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.color = 'var(--color-copper)';
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.opacity = '0.85';
                  e.currentTarget.style.color = 'var(--color-cream)';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right CTA & Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              onClick={() => handleLinkClick('coffee-section')}
              className="btn-primary btn-pill"
              style={{
                display: 'none',
              }}
              id="nav-explore-btn"
            >
              <span>EXPLORE MENU</span>
              <ArrowUpRight size={14} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              style={{
                background: 'rgba(23, 17, 14, 0.75)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--color-cream)',
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              className="mobile-hamburger-btn"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Responsive CSS helper */}
      <style>{`
        @media (min-width: 860px) {
          .desktop-nav-links {
            display: flex !important;
          }
          #nav-explore-btn {
            display: inline-flex !important;
          }
          .mobile-hamburger-btn {
            display: none !important;
          }
        }
      `}</style>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 85,
            backgroundColor: 'rgba(14, 10, 8, 0.96)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            {navLinks.map((link) => (
              <a
                key={link.target}
                href={`#${link.target}`}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.target); }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-cream)',
                  textDecoration: 'none'
                }}
              >
                {link.label}
              </a>
            ))}

            <button 
              onClick={() => handleLinkClick('coffee-section')}
              className="btn-primary"
              style={{ marginTop: '1.5rem', width: '220px' }}
            >
              <span>EXPLORE MENU</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
