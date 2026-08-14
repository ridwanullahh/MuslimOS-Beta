// BismiLLAH Ar-Rahman Ar-Raheem. Fetches Quran surah metadata + chapters from alquran.cloud.
import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const OUT_DIR = new URL('../public/quran/', import.meta.url).pathname;
const CHAP_DIR = new URL('../public/quran/chapters/', import.meta.url).pathname;
await mkdir(CHAP_DIR, { recursive: true });

// 1. Fetch all 114 surahs metadata
console.log('Fetching surah list...');
const listRes = await fetch('https://api.alquran.cloud/v1/surah');
const listJson = await listRes.json();
const surahs = listJson.data.map(s => ({
  number: s.number,
  name: s.name,
  englishName: s.englishName,
  englishNameTranslation: s.englishNameTranslation,
  revelationType: s.revelationType,
  numberOfAyahs: s.numberOfAyahs,
}));
await writeFile(OUT_DIR + 'index.json', JSON.stringify({ surahs }, null, 2));
console.log(`Saved ${surahs.length} surahs to index.json`);

// 2. Fetch full chapter content (Arabic + Sahih International translation + transliteration)
// We bundle Al-Fatiha + the last 20 surahs (commonly recited). The rest can be fetched from the CDN at runtime.
const bundled = [1, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 103, 100, 101, 102, 99, 97, 98, 94, 95, 96, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84];

for (const n of bundled) {
  const outFile = CHAP_DIR + `${n}.json`;
  if (existsSync(outFile)) { console.log(`Skip ${n} (exists)`); continue; }
  try {
    console.log(`Fetching surah ${n}...`);
    // Arabic (uthmani) edition
    const arRes = await fetch(`https://api.alquran.cloud/v1/surah/${n}/quran-uthmani`);
    const arJson = await arRes.json();
    // English (Sahih International)
    const enRes = await fetch(`https://api.alquran.cloud/v1/surah/${n}/en.sahih`);
    const enJson = await enRes.json();
    // Transliteration
    const trRes = await fetch(`https://api.alquran.cloud/v1/surah/${n}/en.transliteration`);
    const trJson = await trRes.json();

    const meta = arJson.data;
    const verses = meta.ayahs.map((a, i) => ({
      numberInSurah: a.numberInSurah,
      arabic: a.text.replace(/\n/g, '').trim(),
      translation: enJson.data.ayahs[i].text.replace(/\n/g, '').trim(),
      transliteration: trJson && trJson.data ? trJson.data.ayahs[i].text.replace(/\n/g, '').trim() : '',
    }));

    const chapter = {
      number: meta.number,
      name: meta.name,
      englishName: meta.englishName,
      englishNameTranslation: meta.englishNameTranslation,
      revelationType: meta.revelationType,
      numberOfAyahs: meta.numberOfAyahs,
      verses,
    };
    await writeFile(outFile, JSON.stringify(chapter, null, 2));
    console.log(`  Saved surah ${n} (${meta.englishName}, ${verses.length} verses)`);
    await new Promise(r => setTimeout(r, 200)); // be polite
  } catch (e) {
    console.error(`  Failed surah ${n}:`, e.message);
  }
}
console.log('Done.');
