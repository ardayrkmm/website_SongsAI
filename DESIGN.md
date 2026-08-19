---
name: Sonora Intelligence
colors:
  surface: '#111318'
  surface-dim: '#111318'
  surface-bright: '#37393e'
  surface-container-lowest: '#0c0e12'
  surface-container-low: '#1a1c20'
  surface-container: '#1e2024'
  surface-container-high: '#282a2e'
  surface-container-highest: '#333539'
  on-surface: '#e2e2e8'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e2e2e8'
  inverse-on-surface: '#2f3035'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#00885d'
  on-tertiary-container: '#000703'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#111318'
  on-background: '#e2e2e8'
  surface-variant: '#333539'
typography:
  display-hero:
    fontFamily: Inter
    fontSize: 72px
    fontWeight: '800'
    lineHeight: 80px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 36px
  headline-sm:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-rg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-upper:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

The design system embodies a "Futuristic Intelligence" aesthetic—a blend of high-end data visualization and immersive audio-tech environments. It is designed for an audience of data scientists, music producers, and enterprise strategy teams who require high-density information without cognitive overload.

The style leverages **Modern Minimalism** mixed with **Glassmorphism**. It utilizes a "Dark-First" philosophy where the UI recedes into the background to let vibrant data visualizations and audio waveforms become the focal points. Visual depth is achieved through layered translucency and subtle glowing strokes rather than heavy shadows, mimicking a sophisticated digital cockpit or a high-end audio workstation.

## Colors

The palette is anchored in a deep charcoal-navy base to provide maximum contrast for neon-inflected accents. 

- **Primary (Electric Indigo):** Used for primary actions, active states, and core brand moments.
- **Secondary (Cyan):** Reserved for data visualization, secondary metrics, and interactive sub-elements.
- **Surface Strategy:** Surfaces follow a hierarchy of luminosity. The base background is the darkest, with each functional layer (cards, modals) becoming progressively lighter and more saturated with the border color to indicate elevation.
- **Functional Colors:** Applied sparingly to maintain the dark-mode immersion, primarily used in status indicators and semantic alerts.

## Typography

This design system uses **Inter** exclusively to maintain a systematic, utilitarian feel that scales across complex data dashboards. 

- **Display & Headlines:** Use tighter letter-spacing and heavier weights to create a commanding presence in hero sections and data overviews.
- **Body Text:** Standard weight for readability. Use `text_secondary` color for body text to reduce eye strain against the dark background.
- **Labels:** Uppercase labels with slight tracking (letter-spacing) are used for metadata, small captions, and table headers to provide a technical, "instrument-panel" aesthetic.

## Layout & Spacing

The layout utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 

- **Spacing Rhythm:** Based on a 4px baseline grid. Component internals use 8px (sm) or 16px (md) increments. 
- **Density:** The design system supports high-density information layouts. Use `lg` spacing for sections and `md` for grouping related elements.
- **Reflow:** On mobile, sidebars collapse into a bottom navigation bar or a hamburger menu. Dashboard widgets stack vertically, maintaining a 16px gutter between cards.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Subtle Glows**:

1.  **Level 0 (Base):** Deep Navy (`#0A0C10`). No shadow.
2.  **Level 1 (Cards/Panels):** Surface (`#111827`) with a 1px solid border (`#1F2937`).
3.  **Level 2 (Overlays/Modals):** Surface Elevated (`#1F2937`) with a 1px border and a highly diffused 20% opacity primary color shadow (e.g., `0 20px 40px -12px rgba(99, 102, 241, 0.2)`).
4.  **Glassmorphism:** For floating players or navigation bars, use a background blur of 12px and 80% opacity on the surface color to maintain legibility while preserving the sense of depth.

## Shapes

The shape language is sophisticated and modern, avoiding the "bubbly" feel of consumer social apps in favor of a precise, engineered look.

- **Standard Elements:** 8px (`rounded`) for small components like tags or inputs.
- **Containers:** 16px (`rounded-xl`) for cards, dashboard widgets, and main content areas.
- **Interactive:** Buttons use a consistent 8px radius to feel architectural and firm.

## Components

### Buttons
- **Primary:** Background `primary_color`, text `text_primary`. High-gloss finish with a subtle inner-glow on hover.
- **Secondary:** Border 1px `primary_color`, transparent background. 
- **Ghost:** No border or background. Use `text_secondary` and transition to `text_primary` on hover.

### Input Fields
- **Default:** Background `surface_elevated`, 1px border `border_subtle`.
- **Focus:** Border changes to `secondary_color` (Cyan) with a subtle outer glow of the same color (3px spread, 15% opacity).

### Cards
- **Structure:** 1px border `border_subtle`, rounded-xl corners. 
- **Header:** Use `label-upper` for category tags within cards to denote data types (e.g., "TEMPO", "GENRE").

### Data Visualizations
- **Radar Charts:** Use `primary_color` (Indigo) for the main data area with a 20% opacity fill and a 2px solid stroke. 
- **Progress Bars (Audio):** Background `surface_elevated`. The progress fill should be a linear gradient from `primary_color` to `secondary_color`.
- **Waveforms:** Render as vertical bars with varying heights, using `secondary_color` for the "played" portion and `text_muted` for the "unplayed" portion.

### Chips & Tags
- **Style:** Small, `body-sm` font, background `surface_elevated`, rounded-lg. Use a 4px colored dot to indicate status (Success/Warning/Error).