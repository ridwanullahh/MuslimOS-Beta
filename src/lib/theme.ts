import { signal } from 'birrstack-core';

export type Theme = 'light' | 'dark';
const themeSignal = signal<Theme>('light');

export function getThemeSignal() { return themeSignal; }
export function getTheme(): Theme { return themeSignal.value; }
export function setTheme(theme: Theme): void {
  themeSignal.value = theme;
  if (typeof document !== 'undefined') document.documentElement.setAttribute('data-theme', theme);
  if (typeof localStorage !== 'undefined') localStorage.setItem('mos-theme', theme);
}
export function toggleTheme(): void { setTheme(themeSignal.value === 'light' ? 'dark' : 'light'); }
export function initTheme(): void {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('mos-theme') as Theme | null;
    if (saved) { setTheme(saved); return; }
  }
  setTheme('light');
}
