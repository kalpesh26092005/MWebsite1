import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let data = JSON.parse(readFileSync(join(root, 'scripts', 'ig-urls.json'), 'utf8'));
if (typeof data === 'string') data = JSON.parse(data);

const jobs = [];

const productMap = {
  'Dd-td56jcg-': 'crochet-garland-bappa',
  'Dd8Ra26z-lx': 'handmade-garland-offering',
  'DdWFkwAzWEI': 'modak-nevri-festive',
  'Dc8Nko2sgRu': 'gift-for-bappa',
  'Dc57xHwTUs4': 'jaswand-mala',
  'DcxZeYlNapW': 'pipe-cleaner-flowers',
  'DcsIIxrTZM4': 'forever-fresh-bloom',
  'Dc0GMsYTzQx': 'garland-bookings',
  'DcVShbozAMu': 'twisted-sunflowers',
  'Db3SrhftR4f': 'jaswand-garland-collection',
  'DbXZQ7TE-bZ': 'crochet-rose-bouquet',
  DaT5_Gjslfo: 'wool-garland-bappa',
};
for (const [id, name] of Object.entries(productMap)) {
  if (data.firstMedia[id]) jobs.push({ url: data.firstMedia[id], out: `frontend/public/images/products/${name}.jpg` });
}

const carouselMap = {
  'DdlBl0Dk-H4': ['gallery/sept-carousel-1', 'gallery/sept-carousel-2'],
  DcaTanikyAG: ['gallery/aug-carousel-1', 'gallery/aug-carousel-2'],
  'DbXZQ7TE-bZ': [null, 'products/crochet-rose-bouquet-2'],
};
for (const [id, urls] of Object.entries(data.carousel || {})) {
  const names = carouselMap[id] || [];
  urls.forEach((u, i) => {
    if (names[i]) jobs.push({ url: u, out: `frontend/public/images/${names[i]}.jpg` });
  });
}

const galleryMap = {
  'DdT9efkzi7-': 'sunflower-charm',
  'Dc-fUq1TVYB': 'lace-brooch-rose',
  Dc8ezDSz2n5: 'handmade-necklace',
  Da1yfSHNxn2: 'lace-heart-gift',
  Dbue9fMoaii: 'lace-jewellery',
};
for (const [id, name] of Object.entries(galleryMap)) {
  if (data.firstMedia[id]) jobs.push({ url: data.firstMedia[id], out: `frontend/public/images/gallery/${name}.jpg` });
}

if (data.avatar) jobs.push({ url: data.avatar, out: 'frontend/public/images/profile.jpg' });

let ok = 0;
let fail = 0;
for (const job of jobs) {
  const dest = join(root, job.out);
  mkdirSync(dirname(dest), { recursive: true });
  try {
    const res = await fetch(job.url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 5000) throw new Error(`too small (${buf.length} bytes)`);
    writeFileSync(dest, buf);
    ok++;
    console.log(`OK   ${job.out} (${buf.length} bytes)`);
  } catch (e) {
    fail++;
    console.log(`FAIL ${job.out}: ${e.message}`);
  }
}
console.log(`\n${ok} downloaded, ${fail} failed`);
