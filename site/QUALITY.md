# SundAI website quality baseline

The production website is maintained for English, Danish and Swedish with the following requirements:

- No horizontal page overflow from 320px mobile widths through wide desktop screens.
- Navigation remains operable by touch, keyboard and Escape.
- Long Danish and Swedish compound words wrap within their cards and columns.
- Technology and collaboration cards use consistent spacing and restrained Nordic styling.
- The European Union service mark uses a blue field with twelve evenly distributed yellow marks.
- Reduced-motion preferences disable non-essential movement.
- Legal, privacy, accessibility and contact content remain reachable in every language.

Run the automated checks before release:

```sh
node site/tests/check-site.mjs
node site/tests/check-responsive.mjs
node --check site/assets/site.js
```
