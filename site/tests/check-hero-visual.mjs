import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(import.meta.dirname, '..');
const svg = await readFile(path.join(root, 'assets/hero-ai-control-neon.svg'), 'utf8');
const errors = [];

for (const token of [
  'width="690"',
  'height="520"',
  'viewBox="0 0 690 520"',
  'preserveAspectRatio="xMidYMid meet"',
  'shape-rendering="geometricPrecision"',
  '#0B132B',
  '#2563EB',
  '#06B6D4',
  '#7C3AED',
  '#F97316'
]) {
  if (!svg.includes(token)) errors.push(`Hero SVG missing required token: ${token}`);
}

for (const forbidden of ['feGaussianBlur', 'feDropShadow', '<filter', 'stdDeviation=']) {
  if (svg.includes(forbidden)) errors.push(`Hero SVG contains a resolution-softening construct: ${forbidden}`);
}

const visibleBounds = [...svg.matchAll(/(?:cx|x|x1|x2)="(-?\d+(?:\.\d+)?)"/g)].map(match => Number(match[1]));
if (visibleBounds.length && Math.max(...visibleBounds) < 590) errors.push('Hero SVG does not use enough of the horizontal canvas.');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Hero artwork passed brand palette, exact-dimension and no-blur checks.');
