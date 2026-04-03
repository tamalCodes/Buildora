# Featured Project Cards

## Purpose

This section presents curated launches in an editorial bento layout for the Explore and Discover surfaces. It is designed to work in both light and dark themes using the app's global CSS variables instead of hardcoded color values.

## Variants

- `FeaturedProjectHeroCard`
  - Primary card for the highest-priority launch.
  - Uses a larger media area and stronger headline scale.
  - Sits on the left side of the desktop bento layout.
  - Keeps the only editorial tag: `Featured pick`.
- `FeaturedProjectCompactCard`
  - Secondary card for supporting launches.
  - Uses a tighter square-ish media crop and a compact content stack.
  - Fills the right-side 2x2 grid on desktop.
  - Does not render editorial tags or technology tags.

## Layout Behavior

- Mobile: all cards stack in a single column.
- Small/medium screens: compact cards move into a 2-column grid below the hero card.
- Extra-large screens: the hero card occupies the left half and the compact cards render as a 2x2 bento grid on the right.
- Desktop proportion rule: the total height of the 2x2 compact grid should visually match the height of the single hero card.
- Desktop tuning rule: do not resize the hero card to force alignment. Compress the compact-card variant first.

## Theme Rules

- Use shared tokens from `apps/web/index.html` such as `--bg-surface`, `--bg-input`, `--border-default`, `--border-subtle`, `--glass-bg`, `--glass-border`, and `--overlay-bg`.
- Do not hardcode dark RGBA backgrounds for the main card surface.
- Overlay chips on top of imagery can use translucent black/white values, but the card shell and metadata surfaces should stay token-based.

## Interaction Rules

- Entire card is clickable.
- Hover should only introduce a light lift and slight image scale.
- Media must stay clipped inside the rounded shell. Always keep `overflow-hidden` on the media wrapper so hover scale does not break the radius.

## Content Rules

- One project should be explicitly treated as the hero item.
- Compact cards should keep summaries to 2 lines maximum.
- Only the hero card should show the editorial badge.
- Likes should appear only once, in the top-right corner, using a thumbs-up icon for visual clarity.
- Compact cards should not show technology tags.
- Do not repeat likes in the footer.
- Prefer real product screenshots or branded visual covers over generic stock imagery.

## Current Product Decisions

- Hero card stays on the left and remains visually dominant.
- Right side uses four compact cards in a 2x2 grid.
- Hero card can show stack tags.
- Compact cards show title, team, summary, likes badge, and CTA only.
