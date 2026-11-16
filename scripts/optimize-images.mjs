import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';

const directory = 'src/assets/images';
await mkdir(`${directory}/optimized`, { recursive: true });
for (const file of (await readdir(directory)).filter(file => file.endsWith('.png'))) {
  for (const width of [640, 1280]) {
    await sharp(`${directory}/${file}`).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`${directory}/optimized/${file.replace('.png', '')}-${width}.webp`);
  }
}
const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#F8FAFC"/><rect width="24" height="630" fill="#2563eb"/><text x="90" y="230" font-family="Arial,sans-serif" font-size="64" font-weight="bold" fill="#14213D">Exoite IT Services</text><text x="90" y="310" font-family="Arial,sans-serif" font-size="36" fill="#2563eb">Empowering Digital Future</text><text x="90" y="420" font-family="Arial,sans-serif" font-size="28" fill="#64748B">Websites • Mobile Apps • Custom Software</text><text x="90" y="480" font-family="Arial,sans-serif" font-size="26" fill="#64748B">Kanpur, India • Serving clients worldwide</text></svg>`;
await writeFile('public/social-card.png', await sharp(Buffer.from(svg)).png().toBuffer());
