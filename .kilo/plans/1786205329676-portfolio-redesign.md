# Warm Minimalist Theme Implementation Plan

## Decision
Implement **Option 1: Warm Minimalist** theme.

## Color Palette
- Background: `#FAFAF9` (warm off-white)
- Surface: `#FFFFFF` (white cards)
- Text primary: `#1C1917` (warm black)
- Text secondary: `#57534E` (warm gray)
- Border: `#E7E5E4` (warm light gray)
- Accent primary: `#EA580C` (warm orange/amber)
- Accent hover: `#C2410C` (darker orange)

## Typography
- Font: Inter (already in Tailwind default)
- Heading sizes: larger, tighter tracking
- Body line height: relaxed for readability

## Visual Changes

### 1. Background & Base
- Update `layouts/default.vue` body background to `#FAFAF9`
- Add subtle warm gradient mesh or soft radial gradient behind hero section
- Keep clean, no heavy textures

### 2. Hero Section
- Soft gradient background: subtle warm glow behind profile photo
- Larger name heading, tighter spacing
- Amber CTA buttons instead of indigo

### 3. Cards & Sections
- White cards with soft shadows (`shadow-sm`, `shadow-md` on hover)
- Rounded corners (`rounded-lg` or `rounded-xl`)
- Section dividers: subtle gradient fade instead of hard borders
- Skills: light warm background badges

### 4. Experience Timeline
- Warm accent color for timeline dots (`#EA580C`)
- Softer border colors

### 5. Buttons & Links
- Primary CTA: amber/orange (`bg-orange-600`, hover `bg-orange-700`)
- Secondary: warm gray (`bg-gray-900`)
- Links: warm gray with amber hover

### 6. Header & Footer
- Minimal, clean
- Warm gray text, amber hover states
- Subtle bottom border on header

## Files to Modify
1. `tailwind.config.js` — add warm color palette
2. `pages/index.vue` — update all Tailwind classes to new palette
3. `layouts/default.vue` — update background color
4. `components/layout/Header.vue` — update colors
5. `components/layout/Footer.vue` — update colors

## Validation
- `npm run generate` succeeds
- Site loads fast, no layout shift
- Text remains readable on all sections
- Mobile responsive check
