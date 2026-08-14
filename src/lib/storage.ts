/**
 * Persistent key-value storage helpers — localStorage-backed.
 * BismiLLAH Ar-Rahman Ar-Raheem.
 *
 * Lightweight wrapper used across MuslimOS apps for persistence
 * (tasbih counts, notes, reminders, favorites, community posts, settings).
 */
const PREFIX = 'mos:';

export function loadJSON<T>(key: string, fallback: T): T {
  if (typeof localStorage === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveJSON<T>(key: string, value: T): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* quota exceeded — silently ignore for resilience */
  }
}

export function removeKey(key: string): void {
  if (typeof localStorage === 'undefined') return;
  try { localStorage.removeItem(PREFIX + key); } catch { /* ignore */ }
}

export function listKeys(): string[] {
  if (typeof localStorage === 'undefined') return [];
  const out: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(PREFIX)) out.push(k.slice(PREFIX.length));
  }
  return out;
}

export function clearAll(): void {
  if (typeof localStorage === 'undefined') return;
  const keys = listKeys();
  for (const k of keys) removeKey(k);
}
