import React, { useState, useEffect } from 'react';
import { Utensils, Sparkles, Flame, ArrowUpRight, Check } from 'lucide-react';

const FOOD_ITEMS = [
  {
    id: 'pizza',
    category: 'Pizza',
    title: 'Artisanal Wood-Fired Pizza',
    subtitle: '72-Hour Fermented Sourdough',
    price: '$18.50',
    description: 'Slow-fermented sourdough crust blistered at 900°F in our stone oven. Layered with San Marzano tomato reduction, fresh fior di latte mozzarella, artisanal crisp pepperoni, and hot chili-infused honey.',
    image: '/assets/images/pizza-artisan.jpg',
    badge: 'Signature Specialty',
    aspect: 'wide' // 2 column wide card
  },
  {
    id: 'burger',
    category: 'Burgers',
    title: 'Truffle Brioche Smash Burger',
    subtitle: 'Double Angus Beef & Smoked Gouda',
    price: '$16.00',
    description: 'Two smashed prime Angus patties with crispy lacy edges, smoked gouda, balsamic caramelized onions, and house black truffle aioli on a toasted buttered brioche bun.',
    image: '/assets/images/burger.jpg',
    badge: 'House Favorite',
    aspect: 'standard'
  },
  {
    id: 'sandwich',
    category: 'Sandwiches',
    title: 'Prosciutto & Burrata Panini',
    subtitle: 'Grilled Artisan Ciabatta',
    price: '$14.50',
    description: 'Aged 18-month Prosciutto di Parma, creamy Pugliese burrata, wild baby arugula, and heirloom tomato pesto pressed hot between golden toasted sourdough ciabatta.',
    image: '/assets/images/sandwich.jpg',
    badge: 'Craft Deli',
    aspect: 'standard'
  },
  {
    id: 'garlic-bread',
    category: 'Sides',
    title: 'Roasted Garlic Herb Batard',
    subtitle: 'Whipped Confit Butter',
    price: '$9.50',
    description: 'Crusty rustic baguette infused with sweet roasted garlic cloves, parmigiano-reggiano, fresh Italian parsley, and sea salt flakes.',
    image: '/assets/images/garlic-bread.jpg',
    badge: 'Warm Shareable',
    aspect: 'standard'
  },
  {
    id: 'fries',
    category: 'Sides',
    title: 'Rosemary Truffle Pommes Frites',
    subtitle: 'Hand-Cut Double Fried',
    price: '$8.50',
    description: 'Hand-cut Idaho russet potatoes double fried to golden perfection, tossed with white truffle oil, grated pecorino, and garden rosemary.',
    image: '/assets/images/fries.jpg',
    badge: 'Crispy Side',
    aspect: 'standard'
  },
  {
    id: 'dessert',
    category: 'Desserts',
    title: 'Espresso Bean Tiramisu & Fondant',
    subtitle: 'Dark Roast Valrhona Confection',
    price: '$11.00',
    description: 'Savoiardi biscuits soaked in our house ristretto and aged rum, folded into silky mascarpone cream and finished with melted molten dark chocolate core.',
    image: '/assets/images/dessert.jpg',
    badge: 'Sweet Finish',
    aspect: 'wide'
  }
];

export default function FoodSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [items, setItems] = useState(FOOD_ITEMS);
  const [orderedItem, setOrderedItem] = useState(null);

  useEffect(() => {
    fetch('/api/menu/food')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleOrder = async (item) => {
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: item.title, type: 'food' })
      });
      setOrderedItem(item.id);
      setTimeout(() => setOrderedItem(null), 3000);
    } catch {
      setOrderedItem(item.id);
      setTimeout(() => setOrderedItem(null), 3000);
    }
  };

  const categories = ['All', 'Pizza', 'Burgers', 'Sandwiches', 'Sides', 'Desserts'];

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <section 
      id="food-section"
      style={{
        padding: '7rem 0',
        backgroundColor: '#120d0a',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Ambience */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: '-5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(166, 108, 67, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        {/* Editorial Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3.5rem' }}>
          <span className="label-eyebrow">THE CULINARY KITCHEN</span>
          
          <h2 
            style={{
              fontSize: 'clamp(2.4rem, 4.8vw, 4rem)',
              marginTop: '1rem',
              letterSpacing: '0.06em',
              lineHeight: 1.1
            }}
          >
            MORE THAN JUST COFFEE.
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
            Crafted with the same obsession as our roasts. From wood-fired sourdough pizzas with bubbling crusts to hand-ground smash burgers and decadent espresso-infused desserts.
          </p>

          {/* Category Filter Pills */}
          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.65rem',
              marginTop: '2.5rem'
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.55rem 1.4rem',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '0.12em',
                  borderRadius: 'var(--radius-pill)',
                  border: activeCategory === cat ? '1px solid var(--color-copper)' : '1px solid var(--border-subtle)',
                  backgroundColor: activeCategory === cat ? 'var(--color-caramel)' : 'rgba(23, 17, 14, 0.6)',
                  color: activeCategory === cat ? '#fff' : 'var(--color-cream-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(8px)'
                }}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Editorial Showcase Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2rem'
          }}
        >
          {filteredItems.map((item, index) => {
            // Asymmetrical column spanning:
            // If wide or first/last, span 12 on mobile/tablet or 7 / 5 on desktop
            const isWide = item.aspect === 'wide';
            const colSpan = isWide ? 'span 12' : 'span 6';

            return (
              <div 
                key={item.id}
                className="luxury-card"
                style={{
                  gridColumn: colSpan,
                  backgroundColor: '#1a130f',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: isWide ? 'row' : 'column',
                  flexWrap: 'wrap',
                  position: 'relative',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease'
                }}
              >
                {/* Image Section */}
                <div 
                  style={{
                    flex: isWide ? '1 1 50%' : '1 1 100%',
                    minHeight: isWide ? '360px' : '260px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <img 
                    src={item.image} 
                    alt={item.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />

                  {/* Dark gradient blend on edge */}
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: isWide 
                        ? 'linear-gradient(90deg, transparent 60%, rgba(26, 19, 15, 0.95) 100%)'
                        : 'linear-gradient(180deg, transparent 60%, rgba(26, 19, 15, 0.95) 100%)',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Badge */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '1.25rem',
                      left: '1.25rem',
                      backgroundColor: 'rgba(23, 17, 14, 0.85)',
                      border: '1px solid var(--border-medium)',
                      padding: '0.35rem 0.85rem',
                      borderRadius: 'var(--radius-pill)',
                      backdropFilter: 'blur(8px)',
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-display)',
                      letterSpacing: '0.1em',
                      color: 'var(--color-copper)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      zIndex: 3
                    }}
                  >
                    <Flame size={12} color="var(--color-caramel)" />
                    <span>{item.badge}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div 
                  style={{
                    flex: isWide ? '1 1 50%' : '1 1 100%',
                    padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    zIndex: 2
                  }}
                >
                  <div>
                    <div 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem'
                      }}
                    >
                      <span 
                        style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-display)',
                          letterSpacing: '0.15em',
                          color: 'var(--color-copper)'
                        }}
                      >
                        {item.subtitle}
                      </span>

                      <span 
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: 'var(--color-cream)',
                          fontFamily: 'var(--font-display)'
                        }}
                      >
                        {item.price}
                      </span>
                    </div>

                    <h3 
                      style={{
                        fontSize: isWide ? 'clamp(1.75rem, 2.5vw, 2.4rem)' : '1.5rem',
                        fontWeight: 700,
                        color: 'var(--color-cream)',
                        letterSpacing: '0.04em',
                        marginBottom: '1rem',
                        lineHeight: 1.15
                      }}
                    >
                      {item.title}
                    </h3>

                    <p 
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.95rem',
                        color: 'var(--color-cream-muted)',
                        lineHeight: 1.6,
                        marginBottom: '1.75rem'
                      }}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '1.25rem'
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-copper)', letterSpacing: '0.08em' }}>
                      FRESH DAILY PREP
                    </span>

                    <button 
                      onClick={() => handleOrder(item)}
                      className="btn-secondary btn-pill"
                      style={{
                        padding: '0.45rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        borderColor: orderedItem === item.id ? 'var(--color-copper)' : undefined,
                        color: orderedItem === item.id ? 'var(--color-copper)' : undefined
                      }}
                    >
                      {orderedItem === item.id ? (
                        <>
                          <Check size={14} />
                          <span>ORDER NOTED</span>
                        </>
                      ) : (
                        <>
                          <span>ORDER AT CAFÉ</span>
                          <ArrowUpRight size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
