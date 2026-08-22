# Vyxel Landing Page

A responsive SaaS CRM landing page for Vyxel, built with React and Next.js. The site uses an orange-and-white visual system with dark contrast sections, responsive layouts, interactive navigation, a product demo modal, FAQ accordion, pricing cards, and scroll-based reveal animations.

## Features

- Responsive desktop and mobile layouts
- Orange-white CRM-focused visual design
- Mobile navigation menu
- Product demo modal
- FAQ accordion interactions
- Pricing and call-to-action sections
- Accessible buttons, links, focus states, and reduced-motion support
- Tailwind CSS styling with reusable utility components

## Tech Requirements

- Node.js 18.18 or newer
- npm 9+ or pnpm 8+
- Next.js 16
- React 19

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

   Or with pnpm:

   ```bash
   pnpm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` — Start the development server

## Project Structure

- `app/page.jsx` — Main landing page
- `app/layout.jsx` — Root layout and metadata
- `app/globals.css` — Global styles and design tokens
- `components/` — Reusable UI components
- `lib/` — Shared utilities
- `public/` — Static assets

The project is written in JSX for the React frontend and uses Next.js App Router conventions.

## License

Private project. All rights reserved.