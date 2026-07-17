/** Pixel row where MHG letterforms begin in public/mhg-logo.png (2000×1333). */
export const LOGO_IMAGE_HEIGHT_PX = 1333;
export const LOGO_MHG_TOP_Y = 211;

export function logoMhgTopPaddingPx(logoHeightPx: number): number {
  return LOGO_MHG_TOP_Y * (logoHeightPx / LOGO_IMAGE_HEIGHT_PX);
}
