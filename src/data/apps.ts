/**
 * MuslimOS App Registry — defines all 25+ mini apps.
 * BismiLLAH Ar-Rahman Ar-Raheem.
 *
 * Each app declares an `icon` name (resolved at runtime via `icon()` from
 * birrstack-core — no inline SVG paths) and a `gradient` used for the
 * prograde launcher tile background.
 */

export interface AppDef {
  id: string;
  name: string;
  icon: string;          // icon name resolved via birrstack-core icon()
  gradient: string;      // CSS gradient for the launcher tile
  category: 'ibadah' | 'knowledge' | 'tools' | 'lifestyle' | 'social';
}

export const APPS: AppDef[] = [
  // Ibadah (Worship)
  { id: 'quran', name: 'Quran', icon: 'book-open', gradient: 'linear-gradient(135deg, #05B34D, #04a045)', category: 'ibadah' },
  { id: 'hadith', name: 'Hadith', icon: 'scroll', gradient: 'linear-gradient(135deg, #F2B91C, #d4a30e)', category: 'ibadah' },
  { id: 'prayer', name: 'Prayer Times', icon: 'clock', gradient: 'linear-gradient(135deg, #05B34D, #0d8a3a)', category: 'ibadah' },
  { id: 'qibla', name: 'Qibla', icon: 'compass', gradient: 'linear-gradient(135deg, #F2B91C, #c8930a)', category: 'ibadah' },
  { id: 'tasbih', name: 'Tasbih', icon: 'circle', gradient: 'linear-gradient(135deg, #05B34D, #06c45a)', category: 'ibadah' },
  { id: 'dua', name: 'Duas', icon: 'heart', gradient: 'linear-gradient(135deg, #e74c3c, #c0392b)', category: 'ibadah' },
  { id: 'names', name: '99 Names', icon: 'sparkles', gradient: 'linear-gradient(135deg, #9b59b6, #8e44ad)', category: 'ibadah' },
  { id: 'zakat', name: 'Zakat', icon: 'coins', gradient: 'linear-gradient(135deg, #F2B91C, #e67e22)', category: 'ibadah' },

  // Knowledge
  { id: 'hijri', name: 'Hijri Calendar', icon: 'calendar', gradient: 'linear-gradient(135deg, #3498db, #2980b9)', category: 'knowledge' },
  { id: 'events', name: 'Islamic Events', icon: 'zap', gradient: 'linear-gradient(135deg, #e74c3c, #f39c12)', category: 'knowledge' },
  { id: 'library', name: 'Library', icon: 'library', gradient: 'linear-gradient(135deg, #2c3e50, #34495e)', category: 'knowledge' },

  // Tools
  { id: 'compass', name: 'Compass', icon: 'compass', gradient: 'linear-gradient(135deg, #1abc9c, #16a085)', category: 'tools' },
  { id: 'calculator', name: 'Calculator', icon: 'calculator', gradient: 'linear-gradient(135deg, #34495e, #2c3e50)', category: 'tools' },
  { id: 'notes', name: 'Notes', icon: 'sticky-note', gradient: 'linear-gradient(135deg, #F2B91C, #f1c40f)', category: 'tools' },
  { id: 'reminders', name: 'Reminders', icon: 'bell', gradient: 'linear-gradient(135deg, #e74c3c, #d35400)', category: 'tools' },
  { id: 'timer', name: 'Timer', icon: 'timer', gradient: 'linear-gradient(135deg, #9b59b6, #7d3c98)', category: 'tools' },
  { id: 'flashlight', name: 'Flashlight', icon: 'zap', gradient: 'linear-gradient(135deg, #f1c40f, #F2B91C)', category: 'tools' },
  { id: 'weather', name: 'Weather', icon: 'cloud-sun', gradient: 'linear-gradient(135deg, #3498db, #5dade2)', category: 'tools' },
  { id: 'audio', name: 'Audio Player', icon: 'music', gradient: 'linear-gradient(135deg, #1abc9c, #0e8c75)', category: 'tools' },

  // Lifestyle
  { id: 'mosque', name: 'Mosque Finder', icon: 'map-pin', gradient: 'linear-gradient(135deg, #05B34D, #27ae60)', category: 'lifestyle' },
  { id: 'halal', name: 'Halal Food', icon: 'utensils', gradient: 'linear-gradient(135deg, #F2B91C, #e67e22)', category: 'lifestyle' },
  { id: 'settings', name: 'Settings', icon: 'settings', gradient: 'linear-gradient(135deg, #7f8c8d, #5a6c6a)', category: 'lifestyle' },

  // Social
  { id: 'community', name: 'Community', icon: 'users', gradient: 'linear-gradient(135deg, #3498db, #1abc9c)', category: 'social' },
  { id: 'favorites', name: 'Favorites', icon: 'star', gradient: 'linear-gradient(135deg, #e74c3c, #F2B91C)', category: 'social' },
];

export const CATEGORIES = [
  { id: 'ibadah', name: 'Ibadah', icon: 'heart' },
  { id: 'knowledge', name: 'Knowledge', icon: 'book-open' },
  { id: 'tools', name: 'Tools', icon: 'settings' },
  { id: 'lifestyle', name: 'Lifestyle', icon: 'map-pin' },
  { id: 'social', name: 'Social', icon: 'users' },
] as const;
