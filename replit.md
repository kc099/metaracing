# MetaRacing Website

A stunning, interactive landing website for MetaRacing — a Racing Simulator gaming zone and FPV-based RC arena gaming business.

## Overview

Single-page marketing website with a dark, neon-lit racing theme. Features smooth animations, interactive sections, and a booking form.

## Key Features

- **Hero Section**: Full-screen with animated speed lines, stats counter
- **Experiences Section**: Tabbed view for Racing Simulator and FPV RC Arena
- **Why Us Section**: Feature highlights
- **Pricing Section**: 4 plans with Sim/FPV toggle
- **Leaderboard Section**: Interactive tabbed leaderboard (Sim vs FPV)
- **Gallery Section**: Image grid
- **Testimonials Section**: Customer reviews
- **Booking Section**: Full form with API integration
- **Footer**: Links, social icons, track ticker marquee

## Tech Stack

- **Frontend**: React + TypeScript + Vite + TailwindCSS + Framer Motion
- **UI**: Shadcn/ui components
- **Backend**: Express.js
- **Storage**: In-memory (MemStorage)
- **Fonts**: Oxanium (racing display), Inter (body)

## Theme

Dark racing theme:
- Background: Near-black with slight blue tint (`220 20% 4%`)
- Primary: Electric red-orange (`14 100% 52%`)
- Accent: Neon cyan (`191 100% 45%`)
- Font: Oxanium for racing/display, Inter for body text

## Structure

- `client/src/pages/home.tsx` - Main landing page
- `client/src/components/Navbar.tsx` - Fixed navigation
- `client/src/components/HeroSection.tsx` - Full-screen hero
- `client/src/components/ExperiencesSection.tsx` - Sim + FPV tabs
- `client/src/components/PricingSection.tsx` - Pricing packages
- `client/src/components/LeaderboardSection.tsx` - Interactive leaderboard
- `client/src/components/BookingSection.tsx` - Contact/booking form
- `client/src/components/Footer.tsx` - Footer with marquee
- `server/routes.ts` - POST/GET /api/bookings
- `server/storage.ts` - MemStorage with bookings
- `shared/schema.ts` - User + Booking schemas

## Images (in client/public/images/)

- `hero-bg.png` - Hero background
- `racing-sim.png` - Simulator cockpit
- `fpv-arena.png` - FPV drone arena
- `steering-wheel.png` - Racing wheel close-up
