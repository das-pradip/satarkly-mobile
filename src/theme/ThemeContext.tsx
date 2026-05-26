import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { getThemeColors, ThemeColors, ThemeMode } from './theme';

interface ThemeContextValue {
  mode: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>('dark');

  const colors = useMemo(() => getThemeColors(mode), [mode]);

  function toggleTheme() {
    setMode((currentMode) => (currentMode === 'dark' ? 'light' : 'dark'));
  }

  const value = useMemo(
    () => ({
      mode,
      colors,
      toggleTheme,
    }),
    [colors, mode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useAppTheme must be used inside ThemeProvider');
  }

  return context;
}
