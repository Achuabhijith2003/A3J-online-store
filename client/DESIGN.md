---
name: High-Contrast Monochrome Design System
colors:
  surface: '#FAFAFA'
  surface-dim: '#ddd9d8'
  surface-bright: '#fdf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3f2'
  surface-container: '#f1edec'
  surface-container-high: '#ebe7e6'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#444748'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c9c6c5'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e3e2e2'
  on-secondary-container: '#646464'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1d1b1a'
  on-tertiary-container: '#868381'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c9c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e6e1df'
  tertiary-fixed-dim: '#cac6c3'
  on-tertiary-fixed: '#1d1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#FFFFFF'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
  border: '#E5E5E5'
  image-placeholder: '#F3F4F6'
  status-error: '#DC2626'
  status-success: '#059669'
  status-pending: '#FBBF24'
typography:
  h1:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.015em
  h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  price:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  label:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.02em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: '0'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  section-gap-lg: 6rem
  section-gap-md: 4rem
  gutter: 1rem
  stack-sm: 0.5rem
  stack-md: 1rem
---

# Frontend UI/UX Design System: Premium Minimalist ("High-Contrast Monochrome")

## 1. Design Philosophy
- **Theme:** High-Contrast Monochrome
- **Vibe:** Clean, modern, distraction-free.
- **Goal:** The UI serves as an invisible frame. Product images provide the color and visual interest.

## 2. Color Palette (Tailwind CSS)
- **Background (Base):** White (#FFFFFF / `bg-white`)
- **Surface (Cards/Modals):** Off-White (#FAFAFA / `bg-gray-50`)
- **Primary Text & Buttons:** Deep Black (#0A0A0A / `text-black`, `bg-black`)
- **Secondary Text:** Dark Gray (#737373 / `text-gray-500`)
- **Borders & Dividers:** Light Gray (#E5E5E5 / `border-gray-200`)

### Utility / Status Colors
- **Error / Out of Stock:** Muted Red (`text-red-600`)
- **Success / In Stock:** Muted Green (`text-emerald-600`)
- **Sale/Discount Badge:** Black background with white text, or a subtle gray pill.

## 3. Typography
- **Primary Font:** Inter, Geist, or system sans-serif (`font-sans`).
- **Headings (H1, H2):** Bold, tightly tracked (`font-bold tracking-tight text-black`).
- **Body Text:** Regular weight, highly readable (`font-normal text-gray-600 leading-relaxed`).
- **Prices:** Semi-bold or Monospace (`font-semibold text-black tracking-wide`).

## 4. Component Guidelines
### Buttons
- **Shape:** Sharp corners or very slight rounding (`rounded-sm`).
- **Primary Action:** Solid Black, White Text (`bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors`).
- **Secondary Action:** White Background, Black Border, Black Text (`bg-white text-black border border-black px-6 py-3 hover:bg-gray-50 transition-colors`).

### Product Cards
- **Container:** Invisible (no background, no shadow, `overflow-hidden group`).
- **Image:** Edge-to-edge, light gray background (#F3F4F6 / `bg-gray-100`). Hover effect: slight scale up (`transition duration-500 group-hover:scale-105`).
- **Text:** Title on one line, price immediately below.

### Form Inputs
- **Style:** Underline style (`border-b border-gray-300 focus:border-black focus:outline-none py-2 w-full transition-colors bg-transparent`) or Box style (`border border-gray-300 rounded-sm focus:ring-1 focus:ring-black`).

### Navigation Bar (Header)
- **Style:** Sticky, crisp white background, thin bottom border.
- **Logo:** Bold black text or simple monochrome SVG.
- **Icons:** Thin outline icons (Lucide/Phosphor style).

## 5. Layout & Spacing
- **Whitespace:** Generous margins between sections (`my-16` or `my-24`).
- **Grid:** Standard CSS Grid (1-2 cols mobile, 3 tablet, 4 desktop).
- **Max Width:** Constrained content (`max-w-7xl mx-auto px-4`).

## 6. Admin Dashboard Nuances
- **Sidebar:** Light gray background (`bg-gray-50`).
- **Density:** Compact tables and lists; reduced whitespace.
- **Data Highlights:** Subtle use of color (Green for "Paid", Yellow for "Pending").