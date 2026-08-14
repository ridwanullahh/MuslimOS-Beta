/**
 * Prayer times calculation — simplified.
 * BismiLLAH Ar-Rahman Ar-Raheem.
 *
 * Uses a simple calculation based on the user's latitude/longitude.
 * For production, this would use a proper prayer time library.
 */

export interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  method: string;
}

// Default to Mecca times as a fallback
const DEFAULT_TIMES: PrayerTimes = {
  fajr: '05:12',
  sunrise: '06:32',
  dhuhr: '12:15',
  asr: '15:38',
  maghrib: '17:58',
  isha: '19:28',
  method: 'Umm al-Qura',
};

export async function getPrayerTimes(lat?: number, lng?: number): Promise<PrayerTimes> {
  // If we have coordinates, calculate times
  if (lat !== undefined && lng !== undefined) {
    return calculatePrayerTimes(lat, lng);
  }

  // Try to get user location
  if (typeof navigator !== 'undefined' && navigator.geolocation) {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve(calculatePrayerTimes(pos.coords.latitude, pos.coords.longitude)),
        () => resolve(DEFAULT_TIMES),
        { timeout: 5000 }
      );
    });
  }

  return DEFAULT_TIMES;
}

function calculatePrayerTimes(lat: number, lng: number): PrayerTimes {
  // Simplified calculation — for production, use a proper algorithm
  // This uses a basic sun position approximation
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
  const decl = 23.45 * Math.sin((360 / 365) * (dayOfYear - 81) * Math.PI / 180);

  const latRad = lat * Math.PI / 180;
  const declRad = decl * Math.PI / 180;

  // Solar noon (12:00 + timezone adjustment based on longitude)
  const tzOffset = now.getTimezoneOffset() / 60;
  const solarNoon = 12 - (lng / 15) + tzOffset;

  // Fajr angle: 18 degrees, Isha angle: 17 degrees
  const fajrAngle = 18;
  const ishaAngle = 17;

  function hourAngle(angle: number): number {
    const cosH = -Math.tan(latRad) * Math.tan(declRad) + Math.cos(angle * Math.PI / 180);
    if (cosH > 1) return 0; // No rise/set
    if (cosH < -1) return 180;
    return Math.acos(cosH) * 180 / Math.PI;
  }

  const fajrHA = hourAngle(fajrAngle);
  const ishaHA = hourAngle(ishaAngle);

  // Sunrise/sunset
  const sunriseHA = hourAngle(0.833);
  const sunsetHA = sunriseHA;

  function toTime(hour: number): string {
    const h = Math.floor(hour);
    const m = Math.floor((hour - h) * 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  const sunrise = solarNoon - sunriseHA / 15;
  const sunset = solarNoon + sunsetHA / 15;
  const fajr = solarNoon - fajrHA / 15;
  const dhuhr = solarNoon + 0.05; // slight offset
  const maghrib = sunset;
  const isha = solarNoon + ishaHA / 15;
  // Asr: Shafi (factor 1) — Asr begins when shadow length = object length + noon shadow
  const asrAngle = 45; // simplified
  const asrHA = hourAngle(asrAngle);
  const asr = solarNoon + asrHA / 15;

  return {
    fajr: toTime(fajr),
    sunrise: toTime(sunrise),
    dhuhr: toTime(dhuhr),
    asr: toTime(asr),
    maghrib: toTime(maghrib),
    isha: toTime(isha),
    method: 'Calculated',
  };
}

/** Get Hijri date using the Intl API. */
export async function getHijriDate(): Promise<string> {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      calendar: 'islamic',
    });
    return formatter.format(new Date());
  } catch {
    return new Date().toLocaleDateString();
  }
}
