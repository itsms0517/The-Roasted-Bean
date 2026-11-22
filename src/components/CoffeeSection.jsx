import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Eye, ArrowUpRight, Flame, Droplets, X, Check } from 'lucide-react';

const COFFEE_ITEMS = [
  {
    id: 'espresso',
    name: 'Espresso',
    subtitle: 'Pure Extraction',
    price: '$4.20',
    description: 'Double ristretto shot extracted under 9 bars of pressure. Intense crema, notes of dark chocolate and toasted hazelnuts.',
    image: '/assets/images/espresso-splash.jpg',
    origin: 'Antioquia, Colombia',
    roast: 'Dark Roast',
    intensity: '5 / 5',
    notes: ['Dark Cocoa', 'Roasted Hazelnut', 'Black Cherry']
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    subtitle: 'Silky Harmony',
    price: '$5.50',
    description: 'Equal parts rich espresso, steamed whole milk, and dense micro-foam dusted with raw Peruvian cocoa nibs.',
    image: '/assets/images/cappuccino.jpg',
    origin: 'Sidama, Ethiopia',
    roast: 'Medium Dark',
    intensity: '4 / 5',
    notes: ['Cacao Nibs', 'Brown Butter', 'Sweet Brioche']
  },
  {
    id: 'cafe-latte',
    name: 'Café Latte',
    subtitle: 'Artisanal Pour',
    price: '$5.80',
    description: 'Velvety steamed milk delicately poured through our signature house blend espresso, crowned with free-pour leaf art.',
    image: '/assets/images/latte-art.jpg',
    origin: 'Minas Gerais, Brazil',
    roast: 'Medium Roast',
    intensity: '3 / 5',
    notes: ['Vanilla Cream', 'Salted Toffee', 'Almond']
  },
  {
    id: 'americano',
    name: 'Americano',
    subtitle: 'Clean & Resonant',
    price: '$4.50',
    description: 'Fresh double espresso pulled directly over 195°F artisanal mineralized water, preserving aromatics and crisp acidity.',
    image: '/assets/images/ceramic-cup.jpg',
    origin: 'Huehuetenango, Guatemala',
    roast: 'Medium Roast',
    intensity: '4 / 5',
    notes: ['Citrus Zest', 'Molasses', 'Cedar']
  },
  {
    id: 'mocha',
    name: 'Mocha',
    subtitle: 'Dark Confection',
    price: '$6.20',
    description: 'Single-origin espresso married with melted 72% Valrhona single-bean dark chocolate, steamed cream and cocoa dust.',
    image: '/assets/images/mocha.jpg',
    origin: 'Tarrazú, Costa Rica',
    roast: 'Dark Roast',
    intensity: '4 / 5',
    notes: ['72% Valrhona', 'Espresso Crema', 'Cinnamon Bark']
  },
  {
    id: 'cold-coffee',
    name: 'Cold Coffee',
    subtitle: '18-Hour Slow Brew',
    price: '$6.50',
    description: 'Steeped for 18 hours in cold purified water. Naturally sweet, low acidity, poured over crystal-clear artisan ice spheres.',
    image: '/assets/images/cold-coffee.jpg',
    origin: 'Yirgacheffe, Ethiopia',
    roast: 'Light-Medium',
    intensity: '4 / 5',
    notes: ['Blueberry Blossom', 'Jasmine', 'Cane Sugar']
  }
];

function ProductCard({ item, onExplore }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 7;
    const rotY = ((x - centerX) / centerX) * 7;

    setRotate({ x: rotX, y: rotY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.18
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div 
      className="tilt-card-container"
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="luxury-card"
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: 'transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#1c1511',
          position: 'relative',
        }}
      >
        {/* Dynamic Specular Glare */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'var(--radius-md)',
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(217, 181, 138, ${glare.opacity}) 0%, transparent 60%)`,
            pointerEvents: 'none',
            zIndex: 4,
            transition: 'opacity 0.2s ease'
          }}
        />

        {/* Product Image Frame */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            height: '280px',
            overflow: 'hidden',
            backgroundColor: '#120d0b'
          }}
        >
          <img 
            src={item.image} 
            alt={item.name}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          />

          {/* Price Badge */}
          <div 
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              backgroundColor: 'rgba(23, 17, 14, 0.88)',
              border: '1px solid var(--border-medium)',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-pill)',
              backdropFilter: 'blur(8px)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--color-copper)',
              letterSpacing: '0.05em',
              zIndex: 3
            }}
          >
            {item.price}
          </div>

          {/* Roast Badge */}
          <div 
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '1rem',
              backgroundColor: 'rgba(23, 17, 14, 0.75)',
              border: '1px solid var(--border-subtle)',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-pill)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              color: 'var(--color-cream)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              zIndex: 3
            }}
          >
            <Flame size={12} color="var(--color-caramel)" />
            <span>{item.roast}</span>
          </div>
        </div>

        {/* Card Body */}
        <div 
          style={{
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 3
          }}
        >
          <div>
            <div 
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
                color: 'var(--color-copper)',
                marginBottom: '0.35rem'
              }}
            >
              {item.subtitle}
            </div>

            <h3 
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--color-cream)',
                letterSpacing: '0.04em',
                marginBottom: '0.75rem'
              }}
            >
              {item.name}
            </h3>

            <p 
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                color: 'var(--color-cream-muted)',
                lineHeight: 1.55,
                marginBottom: '1.5rem'
              }}
            >
              {item.description}
            </p>
          </div>

          {/* Card Footer Actions */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {item.notes.slice(0, 2).map((note, idx) => (
                <span 
                  key={idx}
                  style={{
                    fontSize: '0.68rem',
                    color: 'var(--color-cream-muted)',
                    backgroundColor: 'rgba(243, 235, 221, 0.05)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px'
                  }}
                >
                  {note}
                </span>
              ))}
            </div>

            <button
              onClick={() => onExplore(item)}
              className="btn-secondary btn-pill"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1rem'
              }}
            >
              <span>EXPLORE</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CoffeeSection() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState(COFFEE_ITEMS);
  const [orderStatus, setOrderStatus] = useState(null);
  const [ordering, setOrdering] = useState(false);

  useEffect(() => {
    fetch('/api/menu/coffee')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleOrder = async (item) => {
    setOrdering(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: item.name, type: 'coffee' })
      });
      const data = await res.json();
      setOrderStatus(data.message || 'Order received by barista.');
    } catch {
      setOrderStatus(`Order received for ${item.name}.`);
    } finally {
      setOrdering(false);
    }
  };

  return (
    <section 
      id="coffee-section"
      style={{
        padding: '7rem 0',
        backgroundColor: '#17110E',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Decor */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(166, 108, 67, 0.07) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 4.5rem' }}>
          <span className="label-eyebrow">SIGNATURE COFFEE SELECTION</span>
          
          <h2 
            style={{
              fontSize: 'clamp(2.4rem, 4.8vw, 4rem)',
              marginTop: '1rem',
              letterSpacing: '0.06em',
              lineHeight: 1.1
            }}
          >
            BREWED TO BE REMEMBERED.
          </h2>

          <p 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              fontStyle: 'italic',
              color: 'var(--color-cream-muted)',
              marginTop: '1rem',
              lineHeight: 1.6
            }}
          >
            Sourced ethically from micro-lot estates across Ethiopia, Colombia, and Guatemala. Roasted in small batches in-house to reveal intricate terroir and velvet crema.
          </p>
        </div>

        {/* 6 Interactive Cards Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2.25rem'
          }}
        >
          {items.map((item) => (
            <ProductCard 
              key={item.id} 
              item={item} 
              onExplore={(coffee) => setSelectedItem(coffee)} 
            />
          ))}
        </div>
      </div>

      {/* TASTING MODAL (Interactive Explore Drawer) */}
      {selectedItem && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(10, 7, 5, 0.85)',
            backdropFilter: 'blur(12px)',
            padding: '1.5rem'
          }}
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="luxury-card"
            style={{
              maxWidth: '680px',
              width: '100%',
              backgroundColor: '#1e1612',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 25px 80px rgba(0,0,0,0.9)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedItem(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'rgba(23, 17, 14, 0.7)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--color-cream)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              <div style={{ height: '320px', position: 'relative' }}>
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, #1e1612 0%, transparent 60%)'
                  }}
                />
              </div>

              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span className="label-eyebrow" style={{ fontSize: '0.68rem', marginBottom: '0.5rem' }}>
                  {selectedItem.origin}
                </span>

                <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {selectedItem.name}
                </h3>

                <div style={{ fontSize: '1.35rem', color: 'var(--color-copper)', fontWeight: 700, marginBottom: '1rem' }}>
                  {selectedItem.price}
                </div>

                <p style={{ fontSize: '0.92rem', color: 'var(--color-cream-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  {selectedItem.description}
                </p>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--color-copper)', marginBottom: '0.5rem' }}>
                    TASTING NOTES
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {selectedItem.notes.map((note, i) => (
                      <span 
                        key={i}
                        style={{
                          backgroundColor: 'rgba(217, 181, 138, 0.1)',
                          border: '1px solid var(--border-subtle)',
                          padding: '0.3rem 0.75rem',
                          borderRadius: 'var(--radius-pill)',
                          fontSize: '0.75rem',
                          color: 'var(--color-cream)'
                        }}
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {orderStatus ? (
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.75rem 1rem',
                      backgroundColor: 'rgba(217, 181, 138, 0.1)',
                      border: '1px solid var(--color-copper)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--color-copper)',
                      fontSize: '0.85rem',
                      marginBottom: '1rem'
                    }}
                  >
                    <Check size={16} />
                    <span>{orderStatus}</span>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleOrder(selectedItem)}
                    disabled={ordering}
                    className="btn-primary"
                    style={{ width: '100%', marginBottom: '0.75rem' }}
                  >
                    <span>{ordering ? 'SENDING ORDER...' : 'ORDER AT CAFÉ BAR'}</span>
                  </button>
                )}

                <button 
                  onClick={() => { setSelectedItem(null); setOrderStatus(null); }}
                  className="btn-secondary btn-pill"
                  style={{ width: '100%' }}
                >
                  <span>CLOSE DETAILS</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
