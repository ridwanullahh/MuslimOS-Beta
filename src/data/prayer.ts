/**
 * Prayer times calculation — BismiLLAH Ar-Rahman Ar-Raheem.
 *
 * Implements the standard astronomical algorithm for prayer times based on
 * the sun's position (declination, equation of time, hour angles). Supports
 * the major calculation methods (MWL, ISNA, Egypt, Makkah, Karachi, Tehran).
 * Coordinates are obtained via navigator.geolocation when available, with a
 * sensible fallback (Makkah) when permission is denied or unavailable.
 */

export interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  method: string;
  latitude: number;
  longitude: number;
  timezone: number;
}

export type CalculationMethod = 'MWL' | 'ISNA' | 'Egypt' | 'Makkah' | 'Karachi' | 'Tehran';

interface MethodParams {
  fajr: number;       // twilight angle
  isha: number;       // twilight angle (or minutes after maghrib if ishaMinutes > 0)
  ishaMinutes?: number; // fixed minutes after maghrib (Makkah uses 90)
  asrFactor: number;  // 1 = Shafi, 2 = Hanafi
  name: string;
}

const METHODS: Record<CalculationMethod, MethodParams> = {
  MWL:      { fajr: 18,    isha: 17,    asrFactor: 1, name: 'Muslim World League' },
  ISNA:     { fajr: 15,    isha: 15,    asrFactor: 1, name: 'ISNA (North America)' },
  Egypt:    { fajr: 19.5,  isha: 17.5,  asrFactor: 1, name: 'Egyptian General Authority' },
  Makkah:   { fajr: 18.5,  isha: 0,     ishaMinutes: 90, asrFactor: 1, name: 'Umm al-Qura (Makkah)' },
  Karachi:  { fajr: 18,    isha: 18,    asrFactor: 1, name: 'Univ. of Karachi' },
  Tehran:   { fajr: 17.7,  isha: 14,    asrFactor: 2, name: 'Tehran' },
};

const DEFAULT_METHOD: CalculationMethod = 'MWL';

// Makkah coordinates as fallback
const MAKKAH_LAT = 21.4225;
const MAKKAH_LNG = 39.8262;
const MAKKAH_TZ = 3;  // UTC+3, Arabia Standard Time (no DST)

// Default times used only if calculation is impossible (e.g. extreme latitudes)
const DEFAULT_TIMES: PrayerTimes = {
  fajr: '05:12',
  sunrise: '06:32',
  dhuhr: '12:15',
  asr: '15:38',
  maghrib: '17:58',
  isha: '19:28',
  method: 'Muslim World League (fallback)',
  latitude: MAKKAH_LAT,
  longitude: MAKKAH_LNG,
  timezone: MAKKAH_TZ,
};

let cachedCoords: { lat: number; lng: number; tz: number } | null = null;
let geoPermissionRequested = false;

/**
 * Estimate a timezone offset (in hours from UTC) from a longitude.
 * Used when the browser's timezone doesn't match the geolocation (e.g.
 * geolocation denied and we fall back to Makkah, or the user is traveling).
 * Does not account for DST — prefer the browser's timezone when it matches
 * the user's actual location.
 */
function estimateTimezoneFromLongitude(lng: number): number {
  return Math.round(lng / 15);
}

/** Request geolocation and return coordinates. Caches the result. */
export function requestGeolocation(): Promise<{ lat: number; lng: number; tz: number }> {
  if (cachedCoords) return Promise.resolve(cachedCoords);
  // Browser timezone — accurate for the user's actual location (handles DST).
  const browserTz = -new Date().getTimezoneOffset() / 60;
  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    cachedCoords = { lat: MAKKAH_LAT, lng: MAKKAH_LNG, tz: MAKKAH_TZ };
    return Promise.resolve(cachedCoords);
  }
  geoPermissionRequested = true;
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        // Use the browser's timezone (handles DST correctly for the user's
        // actual location). Fall back to longitude-based estimate if the
        // browser timezone is clearly wrong (e.g. user set UTC manually).
        const estimatedTz = estimateTimezoneFromLongitude(lng);
        const tz = Math.abs(browserTz - estimatedTz) <= 1 ? browserTz : estimatedTz;
        cachedCoords = { lat, lng, tz };
        resolve(cachedCoords);
      },
      () => {
        // Permission denied or unavailable — fall back to Makkah with its
        // correct timezone (UTC+3), not the browser's timezone.
        cachedCoords = { lat: MAKKAH_LAT, lng: MAKKAH_LNG, tz: MAKKAH_TZ };
        resolve(cachedCoords);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 600000 }
    );
  });
}

/** Has the app already requested geolocation permission? */
export function hasRequestedGeoPermission(): boolean { return geoPermissionRequested; }

export async function getPrayerTimes(lat?: number, lng?: number, method: CalculationMethod = DEFAULT_METHOD): Promise<PrayerTimes> {
  let coords: { lat: number; lng: number; tz: number };
  if (lat !== undefined && lng !== undefined) {
    const tz = -new Date().getTimezoneOffset() / 60;
    coords = { lat, lng, tz };
  } else {
    coords = await requestGeolocation();
  }
  return calculatePrayerTimes(coords.lat, coords.lng, coords.tz, method);
}

/** Compute the Julian Day Number for a given UTC date. */
function julianDay(year: number, month: number, day: number): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

/** Sun position (declination and equation of time) for a given Julian Day. */
function sunPosition(jd: number): { declination: number; equationOfTime: number } {
  const D = jd - 2451545.0;  // days since 2000-01-01 12:00 UTC
  const g = fixAngle(357.529 + 0.98560028 * D);        // mean anomaly
  const q = fixAngle(280.459 + 0.98564736 * D);         // mean longitude
  const L = fixAngle(q + 1.915 * sin(g) + 0.020 * sin(2 * g)); // ecliptic longitude
  const e = 23.439 - 0.00000036 * D;                    // obliquity of ecliptic
  const RA = atan2(cos(e) * sin(L), cos(L)) / 15;       // right ascension (hours)
  const decl = asin(sin(e) * sin(L));                   // declination
  const EqT = q / 15 - fixHour(RA);                     // equation of time (hours)
  return { declination: decl, equationOfTime: EqT };
}

// Trigonometric helpers (degrees)
const DEG = Math.PI / 180;
function sin(d: number): number { return Math.sin(d * DEG); }
function cos(d: number): number { return Math.cos(d * DEG); }
function tan(d: number): number { return Math.tan(d * DEG); }
function asin(x: number): number { return Math.asin(x) / DEG; }
function atan2(y: number, x: number): number { return Math.atan2(y, x) / DEG; }
function fixAngle(a: number): number { return fix(a, 360); }
function fixHour(h: number): number { return fix(h, 24); }
function fix(a: number, b: number): number {
  a = a - b * Math.floor(a / b);
  return a < 0 ? a + b : a;
}

/** Compute the hour angle (in degrees) for a given sun altitude (degrees above horizon). */
function hourAngleForAltitude(altitude: number, lat: number, decl: number): number {
  // cos(H) = (sin(alt) - sin(lat)*sin(decl)) / (cos(lat)*cos(decl))
  const cosH = (sin(altitude) - sin(lat) * sin(decl)) / (cos(lat) * cos(decl));
  if (cosH > 1) return NaN;       // sun never reaches this altitude
  if (cosH < -1) return 180;       // sun always above this altitude
  return Math.acos(cosH) / DEG;
}

/** Compute the hour angle (in degrees) for a given depression angle (degrees below horizon). */
function hourAngle(depression: number, lat: number, decl: number): number {
  // For twilight: altitude = -depression, so sin(alt) = -sin(depression)
  return hourAngleForAltitude(-depression, lat, decl);
}

/** Asr hour angle. asrFactor=1 (Shafi) uses shadow = object length; =2 (Hanafi) uses 2x. */
function asrHourAngle(factor: number, lat: number, decl: number): number {
  // Noon altitude of the sun
  const noonAlt = 90 - Math.abs(lat - decl);
  // Asr begins when shadow length = factor * object height.
  // cot(asrAlt) = factor + cot(noonAlt) = factor + tan(|lat - decl|)
  // asrAlt = arccot(factor + tan(|lat - decl|)) = atan(1 / (factor + tan(|lat - decl|)))
  const asrAlt = Math.atan(1 / (factor + tan(Math.abs(lat - decl)))) / DEG;
  return hourAngleForAltitude(asrAlt, lat, decl);
}

function toTime(hour: number): string {
  hour = fixHour(hour);
  const h = Math.floor(hour);
  const m = Math.floor((hour - h) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function calculatePrayerTimes(lat: number, lng: number, tz: number, methodKey: CalculationMethod): PrayerTimes {
  const params = METHODS[methodKey];
  const now = new Date();
  const jd = julianDay(now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate()) - lng / (15 * 24);
  const { declination: decl, equationOfTime: eqt } = sunPosition(jd);

  // Dhuhr: solar noon + equation of time, adjusted to local timezone
  const dhuhr = 12 + tz - lng / 15 - eqt + 0.05 / 60; // +3 min convention
  // Sunrise: when sun is 0.833° below horizon (accounts for refraction + radius)
  const sunriseHA = hourAngle(0.833, lat, decl);
  const sunrise = dhuhr - sunriseHA / 15;
  const maghrib = dhuhr + sunriseHA / 15;  // sunset = sunrise mirrored
  // Fajr
  const fajrHA = hourAngle(params.fajr, lat, decl);
  const fajr = isNaN(fajrHA) ? DEFAULT_TIMES.fajr : dhuhr - fajrHA / 15;
  // Isha: either by angle or by fixed minutes after maghrib (Makkah uses 90 min)
  let isha: number;
  if (params.ishaMinutes && params.ishaMinutes > 0) {
    isha = maghrib + params.ishaMinutes / 60;
  } else {
    const ishaHA = hourAngle(params.isha, lat, decl);
    isha = isNaN(ishaHA) ? DEFAULT_TIMES.isha : dhuhr + ishaHA / 15;
  }
  // Asr
  const asrHA = asrHourAngle(params.asrFactor, lat, decl);
  const asr = isNaN(asrHA) ? DEFAULT_TIMES.asr : dhuhr + asrHA / 15;

  return {
    fajr: toTime(fajr),
    sunrise: toTime(sunrise),
    dhuhr: toTime(dhuhr),
    asr: toTime(asr),
    maghrib: toTime(maghrib),
    isha: toTime(isha),
    method: params.name,
    latitude: lat,
    longitude: lng,
    timezone: tz,
  };
}

/** Get the Hijri date formatted as "DD MonthName YYYY AH - DD Mon YYYY". */
export async function getHijriDate(): Promise<string> {
  try {
    const now = new Date();
    // Hijri parts via Intl (Umm al-Qura)
    const hParts = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
      day: 'numeric', month: 'long', year: 'numeric',
    }).formatToParts(now);
    const get = (t: string) => hParts.find(p => p.type === t)?.value ?? '';
    const hDay = get('day');
    const hMonth = get('month');
    const hYear = get('year');
    // Gregorian parts: day numeric, short month, year numeric
    const gParts = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
    }).formatToParts(now);
    const gGet = (t: string) => gParts.find(p => p.type === t)?.value ?? '';
    const gDay = gGet('day');
    const gMonth = gGet('month');
    const gYear = gGet('year');
    return `${hDay} ${hMonth} ${hYear} AH - ${gDay} ${gMonth} ${gYear}`;
  } catch {
    return new Date().toLocaleDateString();
  }
}

