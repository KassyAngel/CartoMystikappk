# Design Guidelines for Oracle Mystique Voyance App

## Design Approach
**Reference-Based Approach**: Drawing inspiration from premium mystical/spiritual applications with modern UI patterns. The existing design demonstrates a sophisticated mystical aesthetic that should be preserved and enhanced.

## Core Design Elements

### A. Color Palette
**Dark Mode Primary** (maintaining existing mystical theme):
- Primary Background: 15 25% 8% (deep mystical purple-black)
- Secondary Background: 260 30% 12% (rich dark purple)
- Accent Purple: 280 70% 60% (vibrant mystical purple)
- Gold Accent: 45 90% 65% (mystical gold for highlights)
- Text Primary: 0 0% 95% (near white)
- Text Secondary: 260 20% 80% (soft purple-gray)

### B. Typography
- **Primary Font**: Elegant serif font (Playfair Display or Crimson Text)
- **Secondary Font**: Clean sans-serif (Inter or Source Sans Pro)
- **Mystical Headers**: Decorative serif for oracle titles and card names
- **Body Text**: 16px base size, increased line height for readability

### C. Layout System
**Tailwind Spacing Units**: Consistent use of 4, 8, 12, and 16 units
- `p-4, p-8` for component padding
- `m-4, m-8, m-12` for section spacing  
- `h-12, h-16` for interactive elements
- `gap-4, gap-8` for grid layouts

### D. Component Library

**Navigation**: Mystical top navigation with ethereal glow effects
**Cards**: Tarot-style cards with elegant borders and subtle shadows
**Buttons**: 
- Primary: Gradient purple-to-gold with soft glow
- Secondary: Outline style with mystical purple border
- On hero images: Blurred background with outline variant
**Forms**: Dark inputs with purple focus states and floating labels
**Modals**: Centered overlays with backdrop blur and mystical borders

### E. Visual Treatments

**Animations**: Minimal, purposeful animations
- Gentle fade-ins for content reveals
- Smooth card flip animations for tarot reveals
- Subtle floating animation for mystical elements
- NO excessive or distracting motion

**Backgrounds**: 
- Gradient overlays: Deep purple to black radial gradients
- Particle effects: Subtle animated stars/sparkles
- Texture: Soft noise overlay for depth

### F. Key Sections Structure

1. **Hero Landing**: Full viewport with mystical background, app title, and elegant CTA
2. **User Information**: Form collection (name, birthdate, gender) with mystical styling
3. **Oracle Selection**: Grid of oracle types with hover effects and mystical icons
4. **Card Interface**: Interactive tarot spread with flip animations
5. **Results Display**: Personalized interpretation with elegant typography

## Images
No large hero images required. The design relies on:
- **Background**: Mystical gradient with animated star particles
- **Card Assets**: Tarot card designs with ornate backs and mystical fronts
- **Icons**: Celestial and mystical symbols (stars, moons, crystals)
- **Decorative Elements**: Subtle ornamental borders and dividers

## Responsive Considerations
- Mobile-first approach with touch-optimized card interactions
- Stacked layouts on mobile, grid layouts on desktop
- Consistent mystical aesthetic across all breakpoints
- Optimized typography scaling for readability

The design should feel premium, mystical, and trustworthy while maintaining modern UX standards and accessibility.