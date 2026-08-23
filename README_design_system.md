# Arogya Design System

The global design system has been centralized into `src/styles.css` using Tailwind CSS v4 `@theme` integration. 

## Core Principles
- **Semantic Theming:** Colors are no longer hardcoded (e.g. `#050508`). They map to semantic design tokens (`--color-base`, `--color-surface`).
- **Dynamic Contexts:** The design scales instantly between the default Female (Aurora) and Male (Earthy/Fire) themes by toggling the `male-theme` class on the body.

## Available Tokens
- **Surfaces:** `bg-base`, `bg-surface`, `bg-surface-hover`
- **Text:** `text-text-main`, `text-text-muted`
- **Accents:** `text-accent`, `border-accent`, `bg-accent`
- **Buttons:** Use `.ds-btn-primary` or `.ds-btn-outline`.
- **Cards:** Use `.ds-card` or `.ds-card-interactive`.
- **Typography:** `ds-heading-1`, `ds-heading-2`, `ds-text-gradient`.
