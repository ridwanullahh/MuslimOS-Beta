/**
 * MuslimOS App Registry — defines all 25+ mini apps.
 * BismiLLAH Ar-Rahman Ar-Raheem.
 */

export interface AppDef {
  id: string;
  name: string;
  icon: string;       // SVG path data
  color: string;      // accent color
  category: 'ibadah' | 'knowledge' | 'tools' | 'lifestyle' | 'social';
}

export const APPS: AppDef[] = [
  // Ibadah (Worship)
  { id: 'quran', name: 'Quran', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: '#05B34D', category: 'ibadah' },
  { id: 'hadith', name: 'Hadith', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: '#F2B91C', category: 'ibadah' },
  { id: 'prayer', name: 'Prayer Times', icon: 'M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z', color: '#05B34D', category: 'ibadah' },
  { id: 'qibla', name: 'Qibla', icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 16l-4-4h8l-4 4z', color: '#F2B91C', category: 'ibadah' },
  { id: 'tasbih', name: 'Tasbih', icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a6 6 0 110 12 6 6 0 010-12z', color: '#05B34D', category: 'ibadah' },
  { id: 'dua', name: 'Duas', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', color: '#e74c3c', category: 'ibadah' },
  { id: 'names', name: '99 Names', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4', color: '#9b59b6', category: 'ibadah' },
  { id: 'zakat', name: 'Zakat', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: '#f39c12', category: 'ibadah' },

  // Knowledge
  { id: 'hijri', name: 'Hijri Calendar', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: '#3498db', category: 'knowledge' },
  { id: 'events', name: 'Islamic Events', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: '#e74c3c', category: 'knowledge' },
  { id: 'library', name: 'Library', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253', color: '#2c3e50', category: 'knowledge' },

  // Tools
  { id: 'compass', name: 'Compass', icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 16l-4-4h8l-4 4z', color: '#1abc9c', category: 'tools' },
  { id: 'calculator', name: 'Calculator', icon: 'M9 7h6m0 10v-3m-6 3H9a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2h-6z', color: '#34495e', category: 'tools' },
  { id: 'notes', name: 'Notes', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', color: '#f39c12', category: 'tools' },
  { id: 'reminders', name: 'Reminders', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', color: '#e74c3c', category: 'tools' },
  { id: 'timer', name: 'Timer', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: '#9b59b6', category: 'tools' },
  { id: 'flashlight', name: 'Flashlight', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: '#f1c40f', category: 'tools' },
  { id: 'weather', name: 'Weather', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z', color: '#3498db', category: 'tools' },
  { id: 'audio', name: 'Audio Player', icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z', color: '#1abc9c', category: 'tools' },

  // Lifestyle
  { id: 'mosque', name: 'Mosque Finder', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0h-2m-6 0V11', color: '#05B34D', category: 'lifestyle' },
  { id: 'halal', name: 'Halal Food', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', color: '#F2B91C', category: 'lifestyle' },
  { id: 'settings', name: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z', color: '#7f8c8d', category: 'lifestyle' },

  // Social
  { id: 'community', name: 'Community', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', color: '#3498db', category: 'social' },
  { id: 'favorites', name: 'Favorites', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', color: '#e74c3c', category: 'social' },
];

export const CATEGORIES = [
  { id: 'ibadah', name: 'Ibadah', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3' },
  { id: 'knowledge', name: 'Knowledge', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253' },
  { id: 'tools', name: 'Tools', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
  { id: 'lifestyle', name: 'Lifestyle', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9' },
  { id: 'social', name: 'Social', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857' },
] as const;
