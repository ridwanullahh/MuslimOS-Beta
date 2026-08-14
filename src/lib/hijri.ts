/**
 * Hijri calendar helpers — built on the Intl API.
 * BismiLLAH Ar-Rahman Ar-Raheem.
 *
 * Intl with calendar:'islamic' (or 'islamic-umalqura') provides
 * tabular/Umm al-Qura Hijri dates in modern browsers and Node.
 */
export interface HijriDate {
  year: number;
  month: number;     // 1-12
  day: number;       // 1-30
  monthName: string;
}

export const HIJRI_MONTHS = [
  'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani',
  'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
  'Ramadan', 'Shawwal', 'Dhu al-Qa\'dah', 'Dhu al-Hijjah',
];

export const HIJRI_MONTHS_AR = [
  'مُحَرَّم', 'صَفَر', 'رَبِيعُ الأَوَّل', 'رَبِيعُ الآخِر',
  'جُمَادَى الأُولَى', 'جُمَادَى الآخِرَة', 'رَجَب', 'شَعْبَان',
  'رَمَضَان', 'شَوَّال', 'ذُو الْقَعْدَة', 'ذُو الْحِجَّة',
];

function parts(date: Date, calendar: 'islamic' | 'islamic-umalqura' = 'islamic-umalqura'): number[] {
  try {
    const fmt = new Intl.DateTimeFormat('en-US-u-ca-' + calendar, {
      year: 'numeric', month: 'numeric', day: 'numeric',
    });
    const parts = fmt.formatToParts(date);
    const get = (t: string) => Number(parts.find(p => p.type === t)?.value ?? 0);
    return [get('year'), get('month'), get('day')];
  } catch {
    return [0, 0, 0];
  }
}

export function toHijri(date: Date): HijriDate {
  const [y, m, d] = parts(date);
  return { year: y, month: m, day: d, monthName: HIJRI_MONTHS[m - 1] ?? '' };
}

export function formatHijriLong(date: Date): string {
  try {
    return new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
      day: 'numeric', month: 'long', year: 'numeric',
    }).format(date);
  } catch {
    const h = toHijri(date);
    return `${h.day} ${h.monthName} ${h.year} AH`;
  }
}

/** Number of days in a Hijri month (using a 30-day fallback when Intl month-length unavailable). */
export function daysInHijriMonth(year: number, month: number): number {
  // Try to detect by going to next month day 0 — but Intl can't do that directly.
  // Use the standard tabular length: odd months 30, even months 29, except Dhul-Hijjah which is 30 in leap years.
  // For display purposes, 30 is a safe upper bound; the grid will simply show 30 cells.
  void year;
  if (month === 12) return 30;
  return month % 2 === 1 ? 30 : 29;
}

/** Get the Hijri weekday (0=Sunday ... 6=Saturday) for a Hijri year/month/day. */
export function hijriWeekday(year: number, month: number, day: number): number {
  // Convert back to Gregorian to get the weekday
  try {
    // Use Intl to format a known date and reverse-map. Simpler: probe days of the month
    // until we find one matching the desired (year, month, day).
    const start = new Date(Date.UTC(year, 0, 1));
    const end = new Date(Date.UTC(year + 1, 0, 1));
    for (let t = start.getTime(); t < end.getTime(); t += 86400000) {
      const d = new Date(t);
      const h = toHijri(d);
      if (h.year === year && h.month === month && h.day === day) return d.getDay();
    }
  } catch { /* ignore */ }
  return 0;
}

/** Build a calendar grid (6 weeks * 7 days) of Gregorian+Hijri pairs for the given Gregorian month. */
export interface CalendarCell {
  gregorianDate: Date;
  hijri: HijriDate;
  inMonth: boolean;       // false for leading/trailing days
  isToday: boolean;
  weekday: number;        // 0-6
}

export function buildGregorianMonth(year: number, month: number): CalendarCell[] {
  // month is 0-based for Gregorian here (matches JS Date)
  const firstOfMonth = new Date(year, month, 1);
  const firstWeekday = firstOfMonth.getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const cells: CalendarCell[] = [];

  // Leading days from previous month
  for (let i = 0; i < firstWeekday; i++) {
    const d = new Date(year, month, 1 - (firstWeekday - i));
    cells.push({ gregorianDate: d, hijri: toHijri(d), inMonth: false, isToday: sameDay(d, today), weekday: d.getDay() });
  }
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    cells.push({ gregorianDate: d, hijri: toHijri(d), inMonth: true, isToday: sameDay(d, today), weekday: d.getDay() });
  }
  // Trailing days to fill 6 weeks (42 cells)
  let nextDay = 1;
  while (cells.length < 42) {
    const d = new Date(year, month + 1, nextDay++);
    cells.push({ gregorianDate: d, hijri: toHijri(d), inMonth: false, isToday: sameDay(d, today), weekday: d.getDay() });
  }
  return cells;
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const GREGORIAN_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
