export type ThemeMode = 'dark' | 'light';

export interface ThemeColors {
  appBackground: string;
  cardBackground: string;
  cardSoftBackground: string;
  primaryText: string;
  secondaryText: string;
  mutedText: string;
  border: string;
  brand: string;
  brandSoft: string;
  buttonBackground: string;
  buttonText: string;
  danger: string;
  success: string;
  warning: string;
}

export const DARK_THEME: ThemeColors = {
  appBackground: '#0f172a',
  cardBackground: '#ffffff',
  cardSoftBackground: '#f8fafc',
  primaryText: '#0f172a',
  secondaryText: '#334155',
  mutedText: '#64748b',
  border: '#e2e8f0',
  brand: '#38bdf8',
  brandSoft: '#172033',
  buttonBackground: '#e2e8f0',
  buttonText: '#0f172a',
  danger: '#dc2626',
  success: '#16a34a',
  warning: '#f97316',
};

export const LIGHT_THEME: ThemeColors = {
  appBackground: '#eef6ff',
  cardBackground: '#ffffff',
  cardSoftBackground: '#f8fafc',
  primaryText: '#0f172a',
  secondaryText: '#334155',
  mutedText: '#64748b',
  border: '#dbeafe',
  brand: '#2563eb',
  brandSoft: '#dbeafe',
  buttonBackground: '#dbeafe',
  buttonText: '#1e3a8a',
  danger: '#dc2626',
  success: '#16a34a',
  warning: '#f97316',
};

export function getThemeColors(mode: ThemeMode): ThemeColors {
  return mode === 'dark' ? DARK_THEME : LIGHT_THEME;
}
