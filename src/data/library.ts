/**
 * Library — curated Islamic literature catalog.
 * BismiLLAH Ar-Rahman Ar-Raheem.
 *
 * Real bibliographic data of foundational classical works.
 */
export interface Book {
  id: string;
  title: string;
  author: string;
  year: string;          // Hijri / Gregorian era
  category: 'quran' | 'hadith' | 'fiqh' | 'seerah' | 'aqeedah' | 'history' | 'spirituality';
  language: string;
  pages: number;
  description: string;
  rating: number;        // 0-5
}

export const LIBRARY_BOOKS: Book[] = [
  { id: 'sahih-bukhari', title: 'Sahih al-Bukhari', author: 'Imam Muhammad ibn Ismail al-Bukhari', year: '194-256 AH / 810-870 CE',
    category: 'hadith', language: 'Arabic', pages: 2350,
    description: 'The most authentic book after the Book of Allah. A collection of 7,563 hadiths (including repetitions) organized into 97 books covering all aspects of life.',
    rating: 5 },
  { id: 'sahih-muslim', title: 'Sahih Muslim', author: 'Imam Muslim ibn al-Hajjaj an-Naysaburi', year: '206-261 AH / 817-875 CE',
    category: 'hadith', language: 'Arabic', pages: 1800,
    description: 'The second most authentic hadith collection, comprising approximately 7,500 hadiths across 43 books. Renowned for its rigorous methodology in isnad verification.',
    rating: 5 },
  { id: 'riyad-salihin', title: 'Riyad as-Salihin', author: 'Imam Yahya ibn Sharaf an-Nawawi', year: '631-676 AH / 1233-1277 CE',
    category: 'hadith', language: 'Arabic', pages: 720,
    description: 'The Gardens of the Righteous — a popular compilation of approximately 1,896 hadiths organized into 372 chapters on ethics, worship, and daily life.',
    rating: 5 },
  { id: 'forty-nawawi', title: 'Al-Arba\'in an-Nawawiyyah', author: 'Imam Yahya ibn Sharaf an-Nawawi', year: '631-676 AH / 1233-1277 CE',
    category: 'hadith', language: 'Arabic', pages: 120,
    description: 'The Forty Hadith of Imam an-Nawawi — a foundational collection of 42 hadiths that comprise the core principles of Islam.',
    rating: 5 },
  { id: 'muwatta', title: 'Al-Muwatta', author: 'Imam Malik ibn Anas', year: '93-179 AH / 711-795 CE',
    category: 'hadith', language: 'Arabic', pages: 900,
    description: 'The earliest hadith compilation, organized by fiqh topics. Foundational text of the Maliki school, written in Madinah.',
    rating: 5 },
  { id: 'tafsir-ibn-kathir', title: 'Tafsir Ibn Kathir', author: 'Imam Ismail ibn Kathir', year: '701-774 AH / 1301-1373 CE',
    category: 'quran', language: 'Arabic', pages: 4500,
    description: 'The most renowned classical Quranic exegesis, explaining the Quran primarily through the Quran, Sunnah, and statements of the Companions.',
    rating: 5 },
  { id: 'sirat-ibn-hisham', title: 'As-Sirah an-Nabawiyyah', author: 'Abu Muhammad \'Abd al-Malik ibn Hisham', year: 'd. 218 AH / 833 CE',
    category: 'seerah', language: 'Arabic', pages: 1300,
    description: 'The earliest surviving biography of the Prophet Muhammad ﷺ, based on the earlier work of Ibn Ishaq. Foundational source for seerah studies.',
    rating: 5 },
  { id: 'ar-raqa-iq', title: 'Al-Risalah', author: 'Imam Muhammad ibn Idris ash-Shafi\'i', year: '150-204 AH / 767-820 CE',
    category: 'fiqh', language: 'Arabic', pages: 600,
    description: 'The foundational treatise on Islamic jurisprudence (usul al-fiqh), written by the founder of the Shafi\'i school.',
    rating: 5 },
  { id: 'ihya-ulum', title: 'Ihya \'Ulum ad-Din', author: 'Imam Abu Hamid al-Ghazali', year: '450-505 AH / 1058-1111 CE',
    category: 'spirituality', language: 'Arabic', pages: 2400,
    description: 'The Revival of the Religious Sciences — a monumental work synthesizing jurisprudence, theology, and spirituality across four volumes.',
    rating: 5 },
  { id: 'tabaqat-kubra', title: 'Al-Tabaqat al-Kubra', author: 'Ibn Sa\'d', year: '168-230 AH / 784-845 CE',
    category: 'history', language: 'Arabic', pages: 3200,
    description: 'The Great Book of Generations — a comprehensive biographical dictionary of the Companions, Followers, and early Islamic scholars.',
    rating: 4 },
  { id: 'kitab-tawhid', title: 'Kitab at-Tawhid', author: 'Imam Muhammad ibn \'Abd al-Wahhab', year: '1115-1206 AH / 1703-1792 CE',
    category: 'aqeedah', language: 'Arabic', pages: 350,
    description: 'The Book of Monotheism — a foundational text on Islamic theology, focusing on the oneness of Allah and refuting shirk in all its forms.',
    rating: 5 },
  { id: 'hisn-muslim', title: 'Hisn al-Muslim', author: 'Sa\'id ibn \'Ali ibn Wahf al-Qahtani', year: 'b. 1379 AH / 1959 CE',
    category: 'spirituality', language: 'Arabic', pages: 380,
    description: 'The Fortress of the Muslim — a popular pocket compilation of authentic supplications (duas) for all occasions of daily life.',
    rating: 5 },
];

export const LIBRARY_CATEGORIES = [
  { id: 'all',         name: 'All' },
  { id: 'quran',       name: 'Quran' },
  { id: 'hadith',      name: 'Hadith' },
  { id: 'fiqh',        name: 'Fiqh' },
  { id: 'seerah',      name: 'Seerah' },
  { id: 'aqeedah',     name: 'Aqeedah' },
  { id: 'history',     name: 'History' },
  { id: 'spirituality', name: 'Spirituality' },
];
