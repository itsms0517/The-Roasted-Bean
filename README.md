# ☕ The Roasted Bean — Dark Cinematic Café Experience

A digital brand experience and modern full-stack web application for **The Roasted Bean**, a luxury café and roastery. Designed with Dark Cinematic Luxury aesthetics, high-end editorial typography, smooth physics-driven scrolling, and responsive full-stack functionality.

---

## 🎨 Visual Identity & Design System

- **Espresso Black**: `#17110E`
- **Deep Roasted Brown**: `#302018`
- **Caramel**: `#A66C43`
- **Warm Copper**: `#D9B58A`
- **Cream**: `#F3EBDD`

Typography:
- **Display**: Cinzel (classical monumental headings)
- **Serif**: Cormorant Garamond (refined editorial storytelling)
- **Sans**: Plus Jakarta Sans (clean modern legibility)

---

## ✨ Features

1. **Signature Hero Scroll Experience (GSAP + ScrollTrigger + Lenis)**
   - Pinned viewport scrub animation.
   - Realistic isolated roasted coffee bean with natural fissure contouring.
   - Stress fracture dynamics with flying crunch shards.
   - Symmetrical split framing the monumental brand reveal.
   - Multi-plane floating depth-of-field background beans with golden ambient dust particles.

2. **Signature Split-Screen Experience**
   - Dual-panel interactive showcase separating Specialty Coffee and Kitchen & Bakery.
   - Smooth mouse parallax and depth hover transitions.

3. **Signature Coffee Showcase**
   - Interactive 3D tilt cards with specular light glare.
   - Interactive cupping and roast detail modal.
   - Direct-to-bar order inquiry dispatch.

4. **The Culinary Kitchen & Bakery Collection**
   - Asymmetrical editorial 12-column layout.
   - Category filtering (All, Pizza, Burgers, Sandwiches, Sides, Desserts).
   - Wood-fired pizza and artisanal cuisine showcase.

5. **Our Story & Signature Pairing**
   - Brand narrative and café atmosphere.
   - Parallax pairing showcase.

6. **Visit Us & Table Reservations**
   - Interactive reservation desk with party size, preferred time slot, and guest details.
   - Connected directly to the backend with instantaneous confirmation IDs (`TRB-XXXX`).

7. **Express REST API Backend**
   - File-backed local JSON data persistence (`server/data/`).
   - Dynamic menu catalog (`/api/menu`, `/api/menu/coffee`, `/api/menu/food`).
   - Reservation management (`/api/reservations`).
   - Roast Letters newsletter subscriptions (`/api/newsletter`).
   - Real-time order inquiries (`/api/orders`).

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, GSAP 3 (ScrollTrigger), Lenis Smooth Scroll, Lucide Icons
- **Backend**: Node.js, Express, CORS
- **Styling**: Modern CSS variables, responsive typography clamps, glassmorphism-free luxury UI

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/itsms0517/The-Roasted-Bean.git
cd The-Roasted-Bean
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the application

Start the Express backend API (Port 5000):
```bash
npm run server
```

In a separate terminal, start the Vite frontend (Port 5173):
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser. All `/api/*` endpoints are automatically proxied to the Express backend.

---

## 📦 Production Build

```bash
npm run build
```
Creates an optimized, minified production bundle in `dist/`.

---

© The Roasted Bean. Crafted with slow passion.
