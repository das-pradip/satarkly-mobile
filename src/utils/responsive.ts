export const MOBILE_BREAKPOINT = 480;
export const TABLET_BREAKPOINT = 768;
export const CONTENT_MAX_WIDTH = 760;

export function isSmallScreen(width: number): boolean {
  return width < MOBILE_BREAKPOINT;
}

export function isTabletOrLarger(width: number): boolean {
  return width >= TABLET_BREAKPOINT;
}

export function getScreenPadding(width: number): number {
  if (width < 360) return 12;
  if (width < MOBILE_BREAKPOINT) return 14;
  return 18;
}
