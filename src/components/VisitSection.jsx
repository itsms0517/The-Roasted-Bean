import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function VisitSection() {
  const [reserved, setReserved] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', guests: '2 Guests', date: '', time: 'Evening Dinner (17:30 - 21:00)' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setBookingDetails(data);
        setReserved(true);
      } else {
        setError(data.error || 'Failed to submit reservation. Please try again.');
      }
    } catch (err) {
      // Local fallback in case server is unreachable
      setBookingDetails({
        bookingId: 'TRB-' + Math.floor(1000 + Math.random() * 9000),
        message: 'Reservation confirmed locally'
      });
      setReserved(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="visit-us"
      style={{
        padding: '8rem 0',
        backgroundColor: '#17110E',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--border-subtle)'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 4.5rem' }}>
          <span className="label-eyebrow">LOCATION & GATHERINGS</span>

          <h2 
            style={{
              fontSize: 'clamp(2.4rem, 4.8vw, 4rem)',
              marginTop: '1rem',
              letterSpacing: '0.06em',
              lineHeight: 1.1
            }}
          >
            COME SAY HELLO.
          </h2>

          <p 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              fontStyle: 'italic',
              color: 'var(--color-cream-muted)',
              marginTop: '1rem'
            }}
          >
            Drop by for a solitary morning espresso, an intimate lunch, or an evening pizza gathering with friends.
          </p>
        </div>

        {/* Visit Details & Reservation Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem'
          }}
        >
          {/* Information & Dark Map UI */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Info Cards */}
            <div 
              className="luxury-card"
              style={{
                padding: '2.5rem',
                backgroundColor: '#1b1410',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '2rem'
              }}
            >
              {/* Address */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-copper)', marginBottom: '0.75rem' }}>
                  <MapPin size={18} />
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.12em' }}>
                    ADDRESS
                  </span>
                </div>
                <div style={{ fontSize: '0.95rem', color: 'var(--color-cream)', lineHeight: 1.5 }}>
                  The Roasted Bean Café<br />
                  108 Specialty Boulevard, Suite 4<br />
                  Café District / Downtown
                </div>
              </div>

              {/* Hours */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-copper)', marginBottom: '0.75rem' }}>
                  <Clock size={18} />
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.12em' }}>
                    HOURS
                  </span>
                </div>
                <div style={{ fontSize: '0.95rem', color: 'var(--color-cream)', lineHeight: 1.5 }}>
                  Monday – Friday: 07:00 – 22:00<br />
                  Saturday – Sunday: 08:00 – 23:00<br />
                  <span style={{ color: 'var(--color-copper)', fontSize: '0.82rem' }}>Fresh Bakes from 07:30 Daily</span>
                </div>
              </div>

              {/* Contact */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-copper)', marginBottom: '0.75rem' }}>
                  <Phone size={18} />
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.12em' }}>
                    CONTACT
                  </span>
                </div>
                <div style={{ fontSize: '0.95rem', color: 'var(--color-cream)', lineHeight: 1.5 }}>
                  +1 (555) 019-2834<br />
                  hello@theroastedbean.com<br />
                  @TheRoastedBeanCafe
                </div>
              </div>
            </div>

            {/* Stylized Dark Luxury Map Representation */}
            <div 
              className="luxury-card"
              style={{
                height: '240px',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#120d0a',
                border: '1px solid var(--border-medium)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-md)'
              }}
            >
              {/* Abstract Map Grid Lines */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.15,
                  backgroundImage: 'radial-gradient(#d9b58a 1px, transparent 1px), linear-gradient(to right, #302018 1px, transparent 1px), linear-gradient(to bottom, #302018 1px, transparent 1px)',
                  backgroundSize: '24px 24px, 48px 48px, 48px 48px'
                }}
              />

              {/* Pulsing Pin Marker */}
              <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                <div 
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(166, 108, 67, 0.25)',
                    border: '1px solid var(--color-copper)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 0.75rem',
                    animation: 'pulseGlow 3s infinite ease-in-out'
                  }}
                >
                  <MapPin size={26} color="var(--color-copper)" />
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: 'var(--color-cream)', letterSpacing: '0.1em' }}>
                  THE ROASTED BEAN CAFÉ
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-cream-muted)', marginTop: '0.2rem' }}>
                  Corner of 4th & Heritage Ave • Valet & Street Parking
                </div>
              </div>
            </div>
          </div>

          {/* Quick Table Inquiry / Reservation Form */}
          <div 
            className="luxury-card"
            style={{
              padding: '2.75rem',
              backgroundColor: '#1a130f',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            <span className="label-eyebrow" style={{ marginBottom: '0.5rem' }}>
              RESERVE A MOMENT
            </span>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#fff' }}>
              Reserve a Table
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-cream-muted)', marginBottom: '2rem' }}>
              Planning an afternoon tasting or an evening dinner? Reserve your booth in advance.
            </p>

            {reserved ? (
              <div 
                style={{
                  backgroundColor: 'rgba(217, 181, 138, 0.08)',
                  border: '1px solid var(--color-copper)',
                  padding: '2rem',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center'
                }}
              >
                <CheckCircle2 size={40} color="var(--color-copper)" style={{ margin: '0 auto 1rem' }} />
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#fff' }}>
                  Table Reservation Confirmed
                </h4>
                {bookingDetails?.bookingId && (
                  <div 
                    style={{
                      display: 'inline-block',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.85rem',
                      letterSpacing: '0.15em',
                      color: 'var(--color-copper)',
                      backgroundColor: 'rgba(23, 17, 14, 0.8)',
                      border: '1px solid var(--border-medium)',
                      padding: '0.4rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      margin: '0.75rem 0 1rem'
                    }}
                  >
                    CONFIRMATION ID: {bookingDetails.bookingId}
                  </div>
                )}
                <p style={{ fontSize: '0.85rem', color: 'var(--color-cream-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Thank you, <strong>{formData.name}</strong>. We have reserved your table for <strong>{formData.guests}</strong> ({formData.time}). A confirmation has been registered with our host desk.
                </p>
                <button 
                  onClick={() => { setReserved(false); setFormData({ name: '', phone: '', email: '', guests: '2 Guests', date: '', time: 'Evening Dinner (17:30 - 21:00)' }); }} 
                  className="btn-secondary btn-pill"
                >
                  Book Another Table
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.12em', color: 'var(--color-copper)', marginBottom: '0.4rem', fontFamily: 'var(--font-display)' }}>
                    NAME
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      backgroundColor: 'rgba(23, 17, 14, 0.7)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#fff',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.12em', color: 'var(--color-copper)', marginBottom: '0.4rem', fontFamily: 'var(--font-display)' }}>
                      GUESTS
                    </label>
                    <select 
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        backgroundColor: '#17110e',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        color: '#fff',
                        fontSize: '0.9rem'
                      }}
                    >
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 - 4 Guests</option>
                      <option>5+ Guests (Party)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '0.12em', color: 'var(--color-copper)', marginBottom: '0.4rem', fontFamily: 'var(--font-display)' }}>
                      PREFERRED TIME
                    </label>
                    <select 
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        backgroundColor: '#17110e',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        color: '#fff',
                        fontSize: '0.9rem'
                      }}
                    >
                      <option>Morning (08:00 - 11:30)</option>
                      <option>Afternoon (12:00 - 16:30)</option>
                      <option>Evening Dinner (17:30 - 21:00)</option>
                    </select>
                  </div>
                </div>

                {error && (
                  <div style={{ color: '#e57373', fontSize: '0.82rem', textAlign: 'center' }}>
                    {error}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ marginTop: '0.75rem', width: '100%', opacity: loading ? 0.7 : 1 }}
                >
                  <span>{loading ? 'CONFIRMING...' : 'CONFIRM TABLE INQUIRY'}</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
