/**
 * Islamic Events — significant dates in the Hijri calendar.
 * BismiLLAH Ar-Rahman Ar-Raheem.
 *
 * Note: Hijri dates shift ~11 days earlier each Gregorian year.
 * The `hijriDay`/`hijriMonth` are the canonical Hijri-calendar anchors.
 */
export interface IslamicEvent {
  id: string;
  hijriDay: number;        // 1-30
  hijriMonth: number;      // 1-12 (Muharram=1 ... Dhul-Hijjah=12)
  name: string;
  arabicName: string;
  description: string;
  category: 'observance' | 'fasting' | 'eid' | 'historical';
}

export const HIJRI_MONTHS = [
  'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani',
  'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
  'Ramadan', 'Shawwal', 'Dhu al-Qa\'dah', 'Dhu al-Hijjah',
];

export const HIJRI_MONTHS_AR = [
  'مُحَرَّم', 'صَفَر', 'رَبِيعُ الأَوَّل', 'رَبِيعُ الثَّانِي',
  'جُمَادَى الأُولَى', 'جُمَادَى الثَّانِيَة', 'رَجَب', 'شَعْبَان',
  'رَمَضَان', 'شَوَّال', 'ذُو الْقَعْدَة', 'ذُو الْحِجَّة',
];

export const ISLAMIC_EVENTS: IslamicEvent[] = [
  { id: 'new-year', hijriDay: 1, hijriMonth: 1, name: 'Islamic New Year', arabicName: 'رأس السنة الهجرية',
    description: 'Beginning of the Hijri year, commemorating the migration (Hijrah) of the Prophet Muhammad ﷺ from Makkah to Madinah in 622 CE.',
    category: 'historical' },
  { id: 'ashura', hijriDay: 10, hijriMonth: 1, name: 'Day of Ashura', arabicName: 'يوم عاشوراء',
    description: 'A recommended day of fasting. commemorates Allah saving Musa (AS) and the Children of Israel from Pharaoh. The Prophet ﷺ fasted it and encouraged fasting on the 9th and 10th of Muharram.',
    category: 'fasting' },
  { id: 'mawlid', hijriDay: 12, hijriMonth: 3, name: 'Mawlid an-Nabi', arabicName: 'المولد النبوي',
    description: 'Traditional observance of the birth of the Prophet Muhammad ﷺ in the Year of the Elephant (570 CE).',
    category: 'observance' },
  { id: 'isra-miraj', hijriDay: 27, hijriMonth: 7, name: 'Isra and Mi\'raj', arabicName: 'الإسراء والمعراج',
    description: 'Commemorates the Prophet\'s ﷺ night journey from Makkah to Jerusalem (Isra) and his ascension to the heavens (Mi\'raj), during which the five daily prayers were prescribed.',
    category: 'historical' },
  { id: 'mid-shaban', hijriDay: 15, hijriMonth: 8, name: 'Laylat al-Bara\'ah', arabicName: 'ليلة البراءة',
    description: 'The 15th of Sha\'ban, a night of forgiveness when Allah\'s mercy is sought. Many scholars recommend voluntary worship on this night.',
    category: 'observance' },
  { id: 'ramadan-start', hijriDay: 1, hijriMonth: 9, name: 'First Day of Ramadan', arabicName: 'أول رمضان',
    description: 'The beginning of the holy month of Ramadan — the month in which the Quran was revealed. Fasting is obligatory upon all able adult Muslims.',
    category: 'fasting' },
  { id: 'laylatul-qadr', hijriDay: 27, hijriMonth: 9, name: 'Laylat al-Qadr', arabicName: 'ليلة القدر',
    description: 'The Night of Decree — better than a thousand months. The night the Quran was first revealed. To be sought during the last ten nights of Ramadan, particularly the odd nights.',
    category: 'observance' },
  { id: 'eid-fitr', hijriDay: 1, hijriMonth: 10, name: 'Eid al-Fitr', arabicName: 'عيد الفطر',
    description: 'The Festival of Breaking the Fast, marking the end of Ramadan. Includes the Eid prayer, zakat al-fitr, and celebration.',
    category: 'eid' },
  { id: 'arafah', hijriDay: 9, hijriMonth: 12, name: 'Day of Arafah', arabicName: 'يوم عرفة',
    description: 'The most important day of Hajj. For non-pilgrims, fasting this day expiates the sins of the previous year and the coming year.',
    category: 'fasting' },
  { id: 'eid-adha', hijriDay: 10, hijriMonth: 12, name: 'Eid al-Adha', arabicName: 'عيد الأضحى',
    description: 'The Festival of Sacrifice, commemorating Prophet Ibrahim\'s (AS) willingness to sacrifice his son Ismail (AS). Includes the Eid prayer and udhiyah (sacrifice).',
    category: 'eid' },
  { id: 'hajj-days', hijriDay: 8, hijriMonth: 12, name: 'First of the Ten Days of Dhul-Hijjah', arabicName: 'أيام الحج',
    description: 'The first of the ten blessed days of Dhul-Hijjah — the most beloved days to Allah. Good deeds are especially beloved in these days.',
    category: 'observance' },
];

/** Format a Hijri month+day using the Intl API for a given year. */
export function formatHijriDate(year: number, month: number, day: number): string {
  try {
    // Use a known reference: Islamic calendar
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric', month: 'long', year: 'numeric', calendar: 'islamic',
    }).format(new Date(Date.UTC(year, month - 1, day)));
  } catch {
    return `${day} ${HIJRI_MONTHS[month - 1]} ${year} AH`;
  }
}
