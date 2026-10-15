# Homepage motion, free guides and the buying case — 15 October 2026

The user requested scroll-triggered section entrances inspired by synergytech.co.il, a separate navigation destination for free guides, a compact homepage invitation, and six reasons to choose SundAI. The existing SundAI brand and sundaibot.com domain are preserved.

## Content and navigation

- All 186 generated pages expose Free guides in desktop, mobile and footer navigation, localized for EN/DA/SV. A named secondary navigation class replaces the old positional hide rule so the new guide link stays visible at intermediate desktop widths.
- Each homepage replaces the three brochure cards and mixed guide-path buttons with one invitation: “Kick-ass know-how. Yours for free.” and a link to the existing /free-guides/ hub. The Danish and Swedish invitations use natural localized copy.
- The three guide hubs now explain who each PDF is for, what the reader can do next, and the email delivery process. All nine existing localized PDF capture pages and downloads are preserved. Follow-up email remains optional.
- “Why choose SundAI” sits after the six services and before the client testimonials. The six points cover cross-disciplinary experience, scope/budget/deadline discipline, documented quality reviews, senior oversight, project value and demonstrated qualifications. The team mix and training statements were supplied by the site owner. Copy does not invent certifications, a zero-risk promise, or guaranteed project success.

## Motion

The independent scroll-reveal script adds progressive section/card entrances using IntersectionObserver and the Web Animations API. Native scrolling is unchanged. Below-fold elements animate once when they enter the viewport: 28 px / 680 ms on desktop and 14 px / 460 ms on narrow screens, with a short capped stagger. Already-visible content stays still.

HTML stays readable without JavaScript or motion API support. Reduced-motion preference skips animations and cancels active motion when changed. Keyboard focus, printing and background tabs cannot leave content faded. Forms and carousel controls are excluded. No animation library, tracking, continuous scroll handler, heavy image or video was added.

## Validation

All 60 required local CI commands passed, including 105 Node tests, 186-page checks, multilingual commercial routes, discovery metadata and security/performance budgets. Seven new tests cover the homepage-to-guide journey, navigation across all pages, every localized PDF destination, scroll entry and repeat behavior, mobile motion parameters, reduced motion, keyboard access and fallbacks.

Mobile layout is checked in source and behavior tests; this is not physical-device visual verification. Live desktop browser verification follows deployment.
