# GDK Frontend Design System

This folder is the source of truth for visual decisions in the frontend.

## Structure

- `styles/variables.css` defines runtime CSS variables and Tailwind v4 theme aliases.
- `tokens/` mirrors the same decisions in TypeScript for shared documentation and future tooling.
- `shadcn/` contains centralized class variants used by `src/components/ui`.
- `patterns/` contains reusable page-level recipes for marketing sections and forms.
- `docs/` explains typography, spacing, layout, color, accessibility, and component usage rules.

## Usage Rules

- Prefer semantic tokens such as `primary`, `secondary`, `muted`, `border`, `ds-text-body`, and `ds-border-subtle`.
- Use the typography utilities `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-h4`, `text-body-lg`, `text-body`, `text-body-sm`, `text-caption`, and `text-label` for new UI.
- Use `Button`, `Card`, `Input`, `Textarea`, and `Dialog` from `src/components/ui`; their visual defaults are backed by this design system.
- Use layout utilities such as `ds-container`, `ds-section`, `ds-section-sm`, `ds-section-lg`, `ds-eyebrow`, and `ds-card` for new sections when they match the existing product structure.
