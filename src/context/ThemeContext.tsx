import React, { createContext, useContext, useState, useEffect } from 'react';
import { ColorTheme } from '../types';
import { COLOR_THEMES } from '../data/pfpData';

interface CustomColors {
  primary: string;
  accent: string;
  bgBase: string;
}

interface ThemeContextType {
  activeThemeId: string;
  setActiveThemeId: (id: string) => void;
  themes: ColorTheme[];
  customColors: CustomColors;
  setCustomColors: (colors: CustomColors) => void;
  applyCustomColors: (primary: string, accent: string, bg: string) => void;
  isCustomActive: boolean;
  setIsCustomActive: (active: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeThemeId, setActiveThemeId] = useState<string>('navy');
  const [isCustomActive, setIsCustomActive] = useState<boolean>(false);
  const [customColors, setCustomColors] = useState<CustomColors>({
    primary: '#0C1E36',
    accent: '#C59B27',
    bgBase: '#FAF9F6'
  });

  useEffect(() => {
    const root = document.documentElement;

    if (isCustomActive) {
      root.removeAttribute('data-theme');
      root.style.setProperty('--color-primary', customColors.primary);
      root.style.setProperty('--color-primary-dark', adjustBrightness(customColors.primary, -25));
      root.style.setProperty('--color-primary-light', adjustBrightness(customColors.primary, 25));
      root.style.setProperty('--color-primary-subtle', adjustBrightness(customColors.primary, 85));

      root.style.setProperty('--color-accent', customColors.accent);
      root.style.setProperty('--color-accent-dark', adjustBrightness(customColors.accent, -20));
      root.style.setProperty('--color-accent-light', adjustBrightness(customColors.accent, 30));
      root.style.setProperty('--color-accent-hover', adjustBrightness(customColors.accent, 15));

      root.style.setProperty('--color-bg-base', customColors.bgBase);
      root.style.setProperty('--color-bg-soft', adjustBrightness(customColors.bgBase, -5));
      root.style.setProperty('--color-bg-card', '#FFFFFF');
      root.style.setProperty('--color-border', adjustBrightness(customColors.bgBase, -15));
    } else {
      // Clear manual styles so data-theme or root variables apply
      root.style.removeProperty('--color-primary');
      root.style.removeProperty('--color-primary-dark');
      root.style.removeProperty('--color-primary-light');
      root.style.removeProperty('--color-primary-subtle');
      root.style.removeProperty('--color-accent');
      root.style.removeProperty('--color-accent-dark');
      root.style.removeProperty('--color-accent-light');
      root.style.removeProperty('--color-accent-hover');
      root.style.removeProperty('--color-bg-base');
      root.style.removeProperty('--color-bg-soft');
      root.style.removeProperty('--color-bg-card');
      root.style.removeProperty('--color-border');

      if (activeThemeId === 'navy') {
        root.removeAttribute('data-theme');
      } else {
        root.setAttribute('data-theme', activeThemeId);
      }
    }
  }, [activeThemeId, isCustomActive, customColors]);

  const applyCustomColors = (primary: string, accent: string, bg: string) => {
    setCustomColors({ primary, accent, bgBase: bg });
    setIsCustomActive(true);
  };

  return (
    <ThemeContext.Provider
      value={{
        activeThemeId,
        setActiveThemeId: (id: string) => {
          setIsCustomActive(false);
          setActiveThemeId(id);
        },
        themes: COLOR_THEMES,
        customColors,
        setCustomColors,
        applyCustomColors,
        isCustomActive,
        setIsCustomActive
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Simple brightness adjustment helper for hex colors
function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  if (isNaN(num)) return hex;
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 0 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}
