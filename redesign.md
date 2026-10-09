---
name: sync-web-design
description: Design and build sleek dark-mode product websites, app landing pages, feature bento grids and AI/productivity marketing pages in the "Dark Glass Bento" style - a near-black background, softly lit charcoal cards with hairline borders, glowing orb icons (blue, red, green), a blue-to-green aurora with twinkling stars, gradient-fade headlines, pill chips and tags, and layered phone mockups. Use this skill whenever the user asks for a website, landing page, feature section, bento grid, app showcase or SaaS page, or wants a "dark glass", "dark bento", "glowing icons", "Apple-style dark UI", "premium dark landing page" look, even if they do not name the skill.
---

# Dark Glass Bento Web Design

A calm, premium dark UI style: almost-black canvas, quiet charcoal cards, and a few glowing colour moments (an orb icon, an aurora, a gradient word) that pull the eye. Everything is centred, spacious and softly lit. Paste `assets/tokens.css` into every build.

## 1. Colour system (use no other colours)

| Role | Name | Hex | Token |
|---|---|---|---|
| Page background | Near-black | #050506 | `--bg` |
| Card surface | Charcoal | #0E0F11 | `--card` |
| Raised surface / inputs | Graphite | #141518 | `--card2` |
| Hairline border | White at 8% | rgba(255,255,255,.08) | `--line` |
| Primary text | Off-white | #F4F5F7 | `--text` |
| Secondary text | Cool grey | #8B8D94 | `--muted` |
| Tertiary text | Dim grey | #5B5D63 | `--dim` |
| Accent: action, links, selection | Electric blue | #1D6BFF (light #4AA3FF) | `--blue`, `--blue2` |
| Accent: success, share | Green | #22C55E | `--green` |
| Accent: love, alert | Red | #E5262B | `--red` |
| Accent: warmth, inspiration | Amber | #F5B94A | `--amber` |
| Tag highlight | Soft yellow | #F0E34A | `--yellow` |

Rules:
- Background and cards stay in the near-black to charcoal range. Colour appears only in glowing icons, the aurora, gradient headline words, the selected chip, and primary buttons.
- One accent per card. Blue is the default; use red, green and amber to give each card its own personality.
- Cards are subtly lit: `linear-gradient(180deg, #121316, #0a0a0c)`. Add a faint radial blue glow at the top of the page only.
- Glows are the only shadows: soft coloured halos around orbs and the selected chip. No grey drop shadows on cards.
- Keep colour under about 15% of any screen.

## 2. Typography

- One family throughout: `Inter` (fallback `system-ui, -apple-system, "Segoe UI", sans-serif`).
- Hero H1: `clamp(2.4rem, 6vw, 4.6rem)`, weight 500, line-height 1.05, letter-spacing -0.03em.
- Section H2: `clamp(1.8rem, 3.4vw, 2.7rem)`, weight 500, letter-spacing -0.02em.
- Card titles: 1.5rem, weight 500, centred, two balanced lines.
- Card subtext: 0.9rem, weight 400, `--muted`. Body copy: 1.05rem, max-width 560px, `--muted`.
- **Gradient-fade headline**: the first half of a headline is coloured and fades to white mid-line, the rest is plain white. Blue: `linear-gradient(90deg, #3b8bff, #8fc2ff 38%, #f4f5f7 55%)`; amber: `linear-gradient(90deg, #f5a623, #f7cf7a 38%, #f4f5f7 55%)`. Apply with `background-clip: text; color: transparent`.
- Sentence case everywhere. No all-caps, no italics, no serif.

## 3. Layout: the bento grid

- Page: `max-width: 1200px`, 20px side padding, centred.
- Bento: CSS Grid, 3 columns on desktop, 2 on tablet, 1 on mobile, 18px gap. Typical pattern: row 1 = three cards, row 2 = one card plus one card spanning two columns.
- Card: `border: 1px solid var(--line); border-radius: 24px; min-height: 370px; padding: 28px`. Visual on the top 60%, title and subtext centred at the bottom.
- Below the grid, use large feature panels (28px radius, 600px tall) in pairs, each with a pill label, gradient headline, subtext, and two overlapping phone mockups bleeding off the bottom edge.
- Page flow: nav, centred hero, bento grid, feature panels, final call to action, footer. Generous vertical spacing (8-12vh between sections).

## 4. Components

- **Nav**: brand mark (gradient orb + name) left, muted links centre, small raised pill button right.
- **Label pill**: icon + word ("Personalized", "Inspiring") in a 1px bordered pill with a 3% white fill, 7px 16px padding.
- **Buttons**: pill shape, 44px min height, graphite gradient with inset top highlight and hairline border. Primary = blue gradient (`#3a82ff` to `#1d6bff`). Hover: lift 1px and brighten border.
- **Glowing orb icon**: 76px circle with a 6px near-black ring, white line icon (2px stroke, rounded caps), a radial colour fill, and two concentric translucent halos plus a soft outer glow. Blue = privacy/security, red = favourites, green = share/success. Surround with a faded grid of dim rounded-square tiles masked with a radial gradient.
- **Aurora card**: a vertical blue-to-green gradient (`#0b52ff` to `#1481ff` to `#2fcf6c`) fading to transparent, with 3px white sparkle dots that twinkle, and a dark pill button ("Get TL;DR") centred over it with a double border.
- **Chips**: 9px 18px pills, graphite fill, grey text; the selected chip is blue with a blue glow. Arrange in 3 offset rows and fade the edges with a horizontal mask.
- **Name tag**: small yellow rounded label with dark bold text, placed next to a cursor or avatar.
- **Phone mockup**: 30px top radius, hairline border, `#0c0d0f` fill, status bar (time left, icons right), large title, small blue/grey tab pills, list items with source label, two-line headline and gradient thumbnail. Overlap two phones: the back one at 55% opacity and slightly scaled, the front one with a left shadow. Let them bleed off the panel bottom.
- **Skeleton card**: grey bars on a dark card used as an abstract content preview behind an action orb.

## 5. Motion

- Cards lift 3px and brighten their border on hover (250ms ease).
- Sparkles twinkle (3s alternating opacity); orbs gently pulse their halo; selected chip glows.
- Optional: fade-up on scroll for cards (staggered 60ms), and a slow horizontal drift on the chip rows.
- Respect `prefers-reduced-motion` by disabling animations and transitions.

## 6. Accessibility

- Off-white on near-black passes AAA; `--muted` (#8B8D94) passes AA at 14px and above; use `--text` for anything smaller or essential.
- `--dim` is for decorative or non-essential labels only.
- Visible focus ring: 2px `--blue2` outline with 3px offset.
- Decorative visuals (orbs, aurora, tiles, phone mockups, chips) are `aria-hidden="true"`; real meaning lives in the card title and subtext.
- Tap targets 44px or larger; buttons are real `<a>` or `<button>` elements.

## 7. Build workflow

1. Include `assets/tokens.css`.
2. Plan the page: nav, hero, bento (give each card a single idea and its own accent), two feature panels, final CTA, footer.
3. Build semantic HTML with CSS Grid. Draw icons and orbs with inline SVG and CSS gradients; no images are required.
4. Use masks (`mask-image`) for the faded tile grid and chip rows.
5. Responsive: 3 columns, then 2 (wide card spans 2), then 1 under 600px; panels stack; phones shrink to 68% width.
6. Check against the checklist.

Output a single HTML file with inline CSS and SVG for simple sites; for React projects, expose the tokens as CSS variables.

## 8. Do and don't

Do: lots of dark negative space, one glowing focal element per card, centred text, thin borders, gradient-fade headline words, overlapping phone mockups, consistent 24px radii.
Don't: pure black cards on pure black (keep the charcoal lift), bright full-bleed colour sections, heavy shadows, more than one glowing accent per card, light-mode sections, serif or script fonts, busy photography.

## 9. Final checklist

- [ ] Background #050506 with faint blue glow at the top only
- [ ] Cards charcoal with 1px hairline borders and 24px radii
- [ ] Inter throughout, weight 500 for headings
- [ ] At least one gradient-fade headline
- [ ] Glowing orb icons with halos, one accent per card
- [ ] Bento grid reflows 3 / 2 / 1 columns
- [ ] Phone mockups overlap and bleed off the bottom
- [ ] Reduced-motion and focus styles in place
- [ ] Works at 375px, 768px and 1440px widths

## 10. Image-generation prompt (for assets)

"Premium dark-mode product website bento grid, near-black #050506 background, five rounded charcoal cards with hairline borders, centred white titles with grey subtext, a glowing blue padlock orb over a faded grid of app tiles, a blue-to-green aurora with twinkling stars and a dark 'Get TL;DR' pill, a glowing red heart orb, a green share button with a yellow name tag, a row of pill chips with one highlighted blue, below it two large panels with gradient-fade headlines in blue and amber and overlapping dark phone mockups showing a news feed, soft glows, minimal, elegant, UI design shot. Negative: light mode, photorealistic, heavy shadows, clutter, extra colours."