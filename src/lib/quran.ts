/**
 * Quran metadata + chapter fetcher.
 * BismiLLAH Ar-Rahman Ar-Raheem.
 *
 * Uses local static files in /public/quran/ for bundled surahs,
 * with a graceful CDN fallback to alquran.cloud for the rest.
 */
export interface SurahMeta {
  number: number;
  name: string;                  // Arabic
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;        // 'Meccan' | 'Medinan'
  numberOfAyahs: number;
}

export interface Verse {
  numberInSurah: number;
  arabic: string;
  translation: string;
  transliteration: string;
}

export interface Surah extends SurahMeta {
  verses: Verse[];
}

const INDEX_URL = './quran/index.json';
const CHAPTER_URL = (n: number) => `./quran/chapters/${n}.json`;
const CDN_AR = (n: number) => `https://api.alquran.cloud/v1/surah/${n}/quran-uthmani`;
const CDN_EN = (n: number) => `https://api.alquran.cloud/v1/surah/${n}/en.sahih`;
const CDN_TR = (n: number) => `https://api.alquran.cloud/v1/surah/${n}/en.transliteration`;

let _indexCache: SurahMeta[] | null = null;

/** Fetch all 114 surah metadata (cached). */
export async function fetchSurahIndex(): Promise<SurahMeta[]> {
  if (_indexCache) return _indexCache;
  try {
    const res = await fetch(INDEX_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    _indexCache = data.surahs as SurahMeta[];
    return _indexCache;
  } catch (e) {
    console.error('Failed to load Quran index', e);
    return [];
  }
}

/** Fetch a single surah's full content (verses + translation). */
export async function fetchSurah(n: number): Promise<Surah | null> {
  // 1. Try local static file first (works offline for bundled surahs)
  try {
    const res = await fetch(CHAPTER_URL(n));
    if (res.ok) {
      const data = await res.json();
      if (data && data.verses && data.verses.length > 0) return data as Surah;
    }
  } catch { /* fall through to CDN */ }

  // 2. Fallback to alquran.cloud API (online only)
  try {
    const [arRes, enRes, trRes] = await Promise.all([
      fetch(CDN_AR(n)), fetch(CDN_EN(n)), fetch(CDN_TR(n)),
    ]);
    if (!arRes.ok) throw new Error('CDN AR failed');
    const ar = await arRes.json();
    const en = await enRes.json();
    let tr: any = null;
    if (trRes.ok) tr = await trRes.json();
    const meta = ar.data;
    const verses: Verse[] = meta.ayahs.map((a: any, i: number) => ({
      numberInSurah: a.numberInSurah,
      arabic: String(a.text || '').replace(/\n/g, '').trim(),
      translation: String(en.data.ayahs[i]?.text || '').replace(/\n/g, '').trim(),
      transliteration: String(tr?.data?.ayahs[i]?.text || '').replace(/\n/g, '').trim(),
    }));
    return {
      number: meta.number,
      name: meta.name,
      englishName: meta.englishName,
      englishNameTranslation: meta.englishNameTranslation,
      revelationType: meta.revelationType,
      numberOfAyahs: meta.numberOfAyahs,
      verses,
    };
  } catch (e) {
    console.error(`Failed to fetch surah ${n}`, e);
    return null;
  }
}

/** Get a Quran audio recitation URL (ayah by ayah). */
export function getAyahAudioUrl(ayahNumber: number): string {
  // Everyayah.com hosts MP3s for each ayah by number
  return `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayahNumber}.mp3`;
}

/** Get a full-surah audio URL. */
export function getSurahAudioUrl(surahNumber: number): string {
  return `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surahNumber}.mp3`;
}
