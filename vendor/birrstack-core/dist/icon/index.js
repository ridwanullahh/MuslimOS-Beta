/**
 * BirrStack Icon System — stroke-based SVG icon registry.
 *
 * BismiLLAH Ar-Rahman Ar-Raheem.
 *
 * A lightweight, dependency-free icon set inspired by lucide/feather.
 * `icon(name)` returns an SVG string suitable for `birr:bind:innerHTML`.
 *
 * All icons share a 24x24 viewBox, stroke = "currentColor", and use
 * fill = "none" with round caps/joins — so they inherit text color and
 * size via CSS (font-size / width / height).
 *
 * Usage in a .birr template:
 *   <span birr:bind:innerHTML="icon('book-open')"></span>
 *
 * Usage in TypeScript/JS:
 *   import { icon } from 'birrstack-core';
 *   el.innerHTML = icon('moon', { size: 20 });
 */
const ICONS = {
    // Ibadah
    'book-open': '<path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>',
    'book': '<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>',
    'scroll': '<path d="M8 21h12a2 2 0 002-2v-2H10v2a2 2 0 11-4 0V5a2 2 0 10-4 0v3h4"/><path d="M19 17V5a2 2 0 00-2-2H4"/>',
    'clock': '<path d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"/>',
    'compass': '<path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 16l-4-4h8l-4 4z"/><circle cx="12" cy="12" r="3"/>',
    'circle': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/>',
    'heart': '<path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>',
    'sparkles': '<path d="M12 3l1.9 4.6L18.5 9.5 13.9 11.4 12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3z"/><path d="M19 14l.7 1.8L21.5 16.5l-1.8.7L19 19l-.7-1.8L16.5 16.5l1.8-.7L19 14z"/>',
    'coins': '<circle cx="8" cy="8" r="5"/><path d="M18.09 10.37A6 6 0 1110.34 18M7 6h1v4M16.71 13.88l.7.71-2.82 2.82"/>',
    'moon': '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>',
    'sun': '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>',
    // Knowledge
    'calendar': '<path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>',
    'zap': '<path d="M13 10V3L4 14h7v7l9-11h-7z"/>',
    'library': '<path d="M16 6l4 14M12 6v14M8 8v12M4 4v16"/>',
    // Tools
    'calculator': '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="16" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="16" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="16" y2="18"/>',
    'sticky-note': '<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>',
    'bell': '<path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>',
    'timer': '<path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>',
    'cloud-sun': '<path d="M12 2v2M4.93 4.93l1.41 1.41M20 12h-2M17.66 6.34l1.41-1.41M22 22H2M8 18a4 4 0 000-8 5 5 0 019.6-1.5 4 4 0 011.4 7.5"/>',
    'music': '<path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"/>',
    'flashlight': '<path d="M18 6c0 2-2 3-2 3l-2-3V2h4v4zM6 8l4 4v8a2 2 0 002 2h0a2 2 0 002-2v-8l4-4M6 8h12"/>',
    // Lifestyle
    'map-pin': '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
    'utensils': '<path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 002-2V2M5 2v20M14 2v20M14 11h.01M18 2c-1.5 2-2 5-2 7s.5 3 2 3"/>',
    'settings': '<path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/>',
    // Social
    'users': '<path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>',
    'star': '<path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>',
    // UI chrome
    'search': '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>',
    'chevron-left': '<path d="M15 19l-7-7 7-7"/>',
    'chevron-right': '<path d="M9 5l7 7-7 7"/>',
    'chevron-down': '<path d="M6 9l6 6 6-6"/>',
    'chevron-up': '<path d="M18 15l-6-6-6 6"/>',
    'arrow-left': '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    'x': '<path d="M6 18L18 6M6 6l12 12"/>',
    'plus': '<path d="M12 5v14M5 12h14"/>',
    'minus': '<path d="M5 12h14"/>',
    'check': '<path d="M20 6L9 17l-5-5"/>',
    'play': '<path d="M5 3l14 9-14 9V3z"/>',
    'pause': '<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>',
    'skip-back': '<path d="M19 5v14l-9-7 9-7zM5 5h2v14H5V5z"/>',
    'skip-forward': '<path d="M5 5l9 7-9 7V5zm12 0h2v14h-2V5z"/>',
    'trash': '<path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"/>',
    'refresh': '<path d="M21 2v6h-6M3 12a9 9 0 0115-6.7L21 8M3 22v-6h6M21 12a9 9 0 01-15 6.7L3 16"/>',
    'navigation': '<path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.553 2.776A1 1 0 0022 18.882V8.118a1 1 0 00-1.447-.894L15 10m0 7V7m0 0L9 4"/>',
    'menu': '<path d="M3 12h18M3 6h18M3 18h18"/>',
    'home': '<path d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h12a1 1 0 001-1V10"/>',
    'wifi': '<path d="M5 12.55a11 11 0 0114 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"/>',
    'battery': '<rect x="2" y="7" width="18" height="10" rx="2"/><line x1="22" y1="11" x2="22" y2="13"/><line x1="6" y1="11" x2="6" y2="13"/>',
    'signal': '<path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8"/>',
    'map': '<path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.553 2.776A1 1 0 0022 18.882V8.118a1 1 0 00-1.447-.894L15 10m0 7V7m0 0L9 4"/>',
    'bookmark': '<path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"/>',
    'volume': '<path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07M19.07 4.93a10 10 0 010 14.14"/>',
    'eye': '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    'info': '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    'droplet': '<path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0L12 2.69z"/>',
    'wind': '<path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"/>',
    'trending-up': '<path d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6"/>',
    'award': '<circle cx="12" cy="8" r="6"/><path d="M8.21 13.89L7 22l5-3 5 3-1.21-8.12"/>',
    'globe': '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>',
    'lock': '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>',
};
/**
 * Render an icon by name as an SVG string.
 *
 * @param name  Icon name (kebab-case), e.g. 'book-open'.
 * @param opts  Optional size (px) and stroke width.
 * @returns     SVG markup string (empty span if name is unknown).
 */
export function icon(name, opts = {}) {
    const path = ICONS[name];
    if (!path) {
        return `<span aria-hidden="true"></span>`;
    }
    const size = opts.size ?? 24;
    const stroke = opts.strokeWidth ?? 2;
    const cls = opts.class ? ` class="${opts.class}"` : '';
    const fill = opts.fill ?? 'none';
    return `<svg${cls} xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
}
/**
 * List all available icon names.
 */
export function listIcons() {
    return Object.keys(ICONS);
}
/** Check whether an icon name exists in the registry. */
export function hasIcon(name) {
    return Object.prototype.hasOwnProperty.call(ICONS, name);
}
//# sourceMappingURL=index.js.map
