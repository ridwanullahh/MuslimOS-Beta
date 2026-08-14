/**
 * Geolocation + Open-Meteo weather helpers.
 * BismiLLAH Ar-Rahman Ar-Raheem.
 *
 * Uses the free, keyless Open-Meteo API for current weather + forecast.
 */
export interface Coords { lat: number; lng: number; }

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  windspeed: number;
  weatherCode: number;
  isDay: boolean;
  humidity: number;
  precipitation: number;
  description: string;
  icon: string;          // SVG path-like identifier of weather glyph
}

export interface DailyForecast {
  date: string;          // ISO yyyy-mm-dd
  tempMax: number;
  tempMin: number;
  weatherCode: number;
  description: string;
}

export interface WeatherResult {
  coords: Coords;
  current: CurrentWeather;
  daily: DailyForecast[];
  timezone: string;
}

const WMO_DESCRIPTIONS: Record<number, { day: string; night: string }> = {
  0:  { day: 'Clear sky',                night: 'Clear sky' },
  1:  { day: 'Mainly clear',             night: 'Mainly clear' },
  2:  { day: 'Partly cloudy',            night: 'Partly cloudy' },
  3:  { day: 'Overcast',                 night: 'Overcast' },
  45: { day: 'Fog',                      night: 'Fog' },
  48: { day: 'Rime fog',                 night: 'Rime fog' },
  51: { day: 'Light drizzle',            night: 'Light drizzle' },
  53: { day: 'Moderate drizzle',         night: 'Moderate drizzle' },
  55: { day: 'Dense drizzle',            night: 'Dense drizzle' },
  61: { day: 'Light rain',               night: 'Light rain' },
  63: { day: 'Moderate rain',            night: 'Moderate rain' },
  65: { day: 'Heavy rain',               night: 'Heavy rain' },
  71: { day: 'Light snow',               night: 'Light snow' },
  73: { day: 'Moderate snow',            night: 'Moderate snow' },
  75: { day: 'Heavy snow',               night: 'Heavy snow' },
  80: { day: 'Rain showers',             night: 'Rain showers' },
  81: { day: 'Heavy showers',            night: 'Heavy showers' },
  82: { day: 'Violent showers',          night: 'Violent showers' },
  95: { day: 'Thunderstorm',             night: 'Thunderstorm' },
  96: { day: 'Thunderstorm + hail',      night: 'Thunderstorm + hail' },
  99: { day: 'Severe thunderstorm',      night: 'Severe thunderstorm' },
};

export function describeWeather(code: number, isDay: boolean): string {
  const entry = WMO_DESCRIPTIONS[code];
  if (!entry) return 'Unknown';
  return isDay ? entry.day : entry.night;
}

/** Get the user's coordinates. Falls back to Mecca if geolocation fails. */
export function getCoords(): Promise<Coords> {
  return new Promise((resolve) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      resolve({ lat: 21.4225, lng: 39.8262 });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => resolve({ lat: 21.4225, lng: 39.8262 }),
      { timeout: 5000, enableHighAccuracy: false },
    );
  });
}

/** Fetch current weather + 5-day forecast from Open-Meteo. */
export async function fetchWeather(coords: Coords): Promise<WeatherResult> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}` +
              `&current=temperature_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,relative_humidity_2m` +
              `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
              `&timezone=auto&forecast_days=5`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather API ${res.status}`);
  const j = await res.json();
  const cur = j.current;
  const current: CurrentWeather = {
    temperature: Math.round(cur.temperature_2m),
    apparentTemperature: Math.round(cur.apparent_temperature),
    windspeed: Math.round(cur.wind_speed_10m),
    weatherCode: cur.weather_code,
    isDay: cur.is_day === 1,
    humidity: cur.relative_humidity_2m,
    precipitation: cur.precipitation,
    description: describeWeather(cur.weather_code, cur.is_day === 1),
    icon: '',
  };
  const daily: DailyForecast[] = (j.daily.time as string[]).map((t, i) => ({
    date: t,
    tempMax: Math.round(j.daily.temperature_2m_max[i]),
    tempMin: Math.round(j.daily.temperature_2m_min[i]),
    weatherCode: j.daily.weather_code[i],
    description: describeWeather(j.daily.weather_code[i], true),
  }));
  return { coords, current, daily, timezone: j.timezone };
}
