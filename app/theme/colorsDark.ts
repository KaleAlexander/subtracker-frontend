const palette = {
  neutral900: "#FFFFFF",
  neutral800: "#F8F7FF", // Light purple-white
  neutral700: "#E2DFFF", // Light purple
  neutral600: "#C5BFFF", // Medium light purple
  neutral500: "#A297FF", // Medium purple
  neutral400: "#7161EF", // Medium dark purple
  neutral300: "#443AA6", // Dark purple
  neutral200: "#22184F", // Very dark purple
  neutral100: "#121212", // Near black

  primary600: "#D9FEFF", // Lightest cyan
  primary500: "#B0FDFF", // Light cyan
  primary400: "#78FBFF", // Medium light cyan
  primary300: "#01CDFE", // Medium cyan (from logo)
  primary200: "#00A4CF", // Medium dark cyan
  primary100: "#0080A0", // Dark cyan (added to match structure)

  secondary500: "#FFE0F5", // Lightest pink
  secondary400: "#FFC5EB", // Light pink
  secondary300: "#FF9DE0", // Medium light pink
  secondary200: "#FF71CE", // Medium pink (from logo)
  secondary100: "#E03AAD", // Medium dark pink
  secondary000: "#B01E88", // Dark pink

  accent500: "#E0FFF0", // Lightest mint
  accent400: "#BAFFD9", // Light mint
  accent300: "#7AFFBE", // Medium light mint
  accent200: "#05FFA1", // Medium mint (from logo)
  accent100: "#00DA85", // Medium dark mint

  angry100: "#FF3D71",
  angry500: "#FFE0E0",

  overlay20: "rgba(18, 18, 18, 0.2)",
  overlay50: "rgba(18, 18, 18, 0.5)",
} as const

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  text: palette.neutral800,
  textDim: palette.neutral600,
  background: palette.neutral200,
  border: palette.neutral400,
  tint: palette.primary500,
  tintInactive: palette.neutral300,
  separator: palette.neutral300,
  error: palette.angry500,
  errorBackground: palette.angry100,
} as const
