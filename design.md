# Niranjan portfolio — proposed design system

**Status:** Shared foundations approved and implemented on 23 November 2026. Typography, color tokens, navigation, footer styling, and responsive rules now apply to the homepage and three case studies. Project cover art and case study content layout remain separate decisions.

## Direction

**Architectural editorial surrealism:** clear product storytelling framed by classical architecture, botanical illustration, restrained geometry, and real interface evidence. The portrait and original product screens carry the story. Decorative scenes support them without replacing them.

The system should feel like one portfolio from the homepage through all three case studies: dark olive and gold for identity, warm ivory for reading, and one quiet pastel accent per project.

## Current discrepancies to resolve

| Area | Current state | Proposed rule |
| --- | --- | --- |
| Navigation | Homepage and case studies use different header layouts and mobile menus. | One shared header, menu, and mobile drawer on every page. |
| Typography | Homepage uses Instrument Serif prominently; v4 case styles force DM Sans on most headings. | Instrument Serif for editorial display and section headings; DM Sans for body and functional UI. |
| Fonts | Homepage uses local font files; case studies request Google Fonts. | Serve the approved fonts locally with one loading strategy. |
| Surfaces | Homepage white, case studies warm ivory, and several competing greens. | One paper color, one white surface, one dark olive, and project tints. |
| Spacing and corners | Different containers, section gaps, card radii, and button shapes. | Shared layout widths, spacing scale, and component radii. |
| Footer | Content and markup now match, but the case studies need a separate footer stylesheet. | One reusable footer component and stylesheet. |
| Covers and motion | Desktop covers stack; case studies use different media framing. | One cover treatment and one motion policy; mobile covers remain fully readable. |

## Foundations

### Color

| Token | Value | Use |
| --- | --- | --- |
| `paper` | `#FAF9F5` | Main reading background |
| `surface` | `#FFFEFB` | Cards, captions, and panels |
| `olive` | `#19372B` | Hero, navigation, footer, dark chapters |
| `heading` | `#24342A` | Headings on light surfaces |
| `body` | `#536158` | Paragraphs on paper |
| `line` | `#D9DED5` | Quiet borders and dividers |
| `gold` | `#C4A46A` | Highlights, outlines, and dark-surface accents |
| `on-dark` | `#F9F6EC` | Text on olive |
| `process` | `#E5EDE4` | The Process tint; ink `#41634A` |
| `flowlog` | `#E6EFF7` | FlowLog tint; ink `#335D85` |
| `dezinersknot` | `#F3E6E0` | DezinersKnot tint; ink `#874D36` |

Gold is an accent, not paragraph text on ivory: `#C4A46A` on `#FAF9F5` is only about **2.25:1**. Gold on olive is about **5.46:1**. Use dark olive text on gold filled buttons. Check every text and background pair against [WCAG 2.2 contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): 4.5:1 for ordinary text and 3:1 for large text.

### Typography

Use only three roles. This follows [Apple's guidance on legibility and a clear hierarchy](https://developer.apple.com/design/human-interface-guidelines/typography), adapted to this portfolio rather than copying Apple's interface style.

| Role | Typeface | Desktop | Mobile | Line height |
| --- | --- | --- | --- | --- |
| Hero display | Instrument Serif regular | `clamp(64px, 6vw, 104px)` | `36px` maximum | `0.98–1.04` |
| Section heading | Instrument Serif regular | `clamp(44px, 4vw, 68px)` | `32–36px` | `1.02–1.08` |
| Case chapter heading | Instrument Serif regular | `40–52px` | `30–34px` | `1.08` |
| Card heading | Instrument Serif regular | `30–40px` | `26–30px` | `1.1` |
| Lead | DM Sans regular | `20–22px` | `18px` | `1.45` |
| Body | DM Sans regular | `17px` | `16px` | `1.6–1.7` |
| Small/supporting | DM Sans medium | `14px` | `14px` | `1.5` |
| Label | IBM Plex Mono medium | `11–12px` | `11–12px` | `1.4` |
| Button/navigation | DM Sans semibold | `14–16px` | `14–16px` | `1.2` |

Italic Instrument Serif may emphasize a short phrase within a heading. Avoid setting whole paragraphs in italic or uppercase. Labels can be uppercase with modest tracking. Keep reading text in a 65–75 character measure. Mobile headings cap at **36px**, including hero and footer, as previously requested.

### Layout and spacing

- Wide content: `1200px` maximum. Reading content: `720px` maximum. Keep case study images wider when the screen detail needs room.
- Page gutter: `48px` desktop, `28px` tablet, `20px` mobile.
- Spacing scale: `8, 12, 16, 24, 32, 48, 72, 96px`. Section spacing: `96px` desktop, `72px` tablet, `64px` mobile.
- Align section labels, headings, body text, and media to the same grid. Center only the sections designed as centered compositions, such as How I Work.
- Use `8px` for editorial panels and media, `10px` for covers, and pill buttons where the current identity calls for them. Avoid adding shadows to every card; use borders and tonal separation first.

## Components

**Header:** The homepage header becomes the shared pattern. Dark olive dusted glass while scrolling; gold monogram; consistent active-link state. On mobile, use the existing hamburger and opaque-enough black glass drawer so page text does not show through. Place the outlined gold “Let's talk” action inside the drawer.

**Buttons and links:** Primary button is gold with olive text. Secondary button is transparent with a gold outline on dark surfaces, or an olive outline on light surfaces. Text links use a short underline and arrow. Hover, focus, and pressed states must remain visible without relying on color alone.

**Project covers — decision pending:** Keep the current v4 covers during the shared-system pass. The artwork puts architectural scenery, flowers, badges, a mockup, a baked-in CTA, and multiple shadows in the same frame; these elements can compete with the HTML heading and link. Compare the new covers directly with the earlier contained cards after the system pass. Choose one direction before changing cover artwork. The earlier contained style would use:

1. One pastel surface for the whole card: sage for The Process, blue for FlowLog, terracotta for DezinersKnot.
2. HTML heading, one-sentence summary, and one case study link above or beside the media. No words, badges, or CTA baked into a background image.
3. One real product screen for The Process and DezinersKnot; the two real FlowLog screens as a deliberate pair. Keep their device frames fully inside the card at mobile widths.
4. At most one subtle card shadow (`0 12px 32px rgba(12,35,25,.08)`). Use a fine border for definition; remove separate mockup and decorative-element shadows.
5. Keep architectural and botanical detail as low-contrast edge decoration outside the reading and screenshot areas. Preserve the desktop stack animation; mobile cards flow normally so a cover is never hidden by the next.

The Process play control remains separate from the case study link. Never stretch or redraw a product UI screenshot. No cover redesign is included in the shared-system implementation.

**Case study pages:** Use the same opening structure, chapter labels, evidence captions, original-screen frame, and next-project navigation. Project colors appear in covers, chapter accents, and small diagrams; long reading sections stay ivory with dark text. Label conceptual illustrations clearly and distinguish them from authentic product screens.

**How I Work:** Center the heading and subheading. Keep three interactive cards with depth and restrained movement. Let the architectural background remain visible without reducing text contrast.

**About:** Keep the graphite portrait large inside its margins. Pair the personal story with generous white space and a readable text measure.

**Footer:** Use the same homepage footer content, typography, artwork, actions, and responsive behavior on all pages.

## Motion and responsive behavior

- Use motion to clarify relationships: cover stacking on desktop, small card depth on hover, and modest section entrances. Typical interface transitions: `180–300ms`.
- Avoid scroll effects that cover text or trap content. Respect `prefers-reduced-motion`; disable parallax, stacking scale, and decorative loops when requested.
- Test at `390px`, `768px`, `1024px`, and `1440px`, plus narrow devices and 200% text zoom. No horizontal overflow, clipped screenshots, hidden card links, or menu text showing through the drawer.
- Keep tap targets at least `44 × 44px` and show a visible keyboard focus indicator.

## Implementation and remaining decisions

1. Apply the approved shared fonts, colors, header, footer, and mobile type cap without replacing authentic case study assets or changing case study content.
2. Compare desktop and mobile screenshots across the homepage and three studies; fix shared-system regressions.
3. Choose between the current v4 covers and the earlier contained cards.
4. Review a separate case study layout proposal before changing the study narratives or chapter compositions.
