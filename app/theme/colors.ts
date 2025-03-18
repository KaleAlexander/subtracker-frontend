const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F8F7FF", // Light purple-white
  neutral300: "#E2DFFF", // Light purple
  neutral400: "#C5BFFF", // Medium light purple
  neutral500: "#A297FF", // Medium purple
  neutral600: "#7161EF", // Medium dark purple
  neutral700: "#443AA6", // Dark purple
  neutral800: "#22184F", // Very dark purple
  neutral900: "#121212", // Near black

  primary100: "#FFE0F5", // Lightest pink
  primary200: "#FFC5EB", // Light pink
  primary300: "#FF9DE0", // Medium light pink
  primary400: "#FF71CE", // Medium pink (from logo)
  primary500: "#E03AAD", // Medium dark pink
  primary600: "#B01E88", // Dark pink

  secondary100: "#D9FEFF", // Lightest cyan
  secondary200: "#B0FDFF", // Light cyan
  secondary300: "#78FBFF", // Medium light cyan
  secondary400: "#01CDFE", // Medium cyan (from logo)
  secondary500: "#00A4CF", // Medium dark cyan

  accent100: "#E0FFF0", // Lightest mint
  accent200: "#BAFFD9", // Light mint
  accent300: "#7AFFBE", // Medium light mint
  accent400: "#05FFA1", // Medium mint (from logo)
  accent500: "#00DA85", // Medium dark mint

  angry100: "#FFE0E0",
  angry500: "#FF3D71",

  overlay20: "rgba(18, 18, 18, 0.2)",
  overlay50: "rgba(18, 18, 18, 0.5)",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral200,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * The inactive tinting color.
   */
  tintInactive: palette.neutral300,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   */
  errorBackground: palette.angry100,
} as const
