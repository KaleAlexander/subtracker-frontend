import { FC } from "react"
import { View, Pressable, StyleSheet, ViewStyle, TextStyle, StyleProp } from "react-native"
import { Text, TextProps } from "./Text" // Your existing Text component
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"

export interface ButtonProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TextProps["tx"]
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: TextProps["text"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TextProps["txOptions"]
  /**
   * An optional style override for the button.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An optional style override for the button text.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * Called when the button is pressed.
   */
  onPress?: () => void
  /**
   * An optional icon component to render inside the button.
   */
  icon?: React.ReactNode
  /**
   * Whether the button is disabled.
   */
  disabled?: boolean
  /**
   * Button type - primary (cyan), secondary (pink), or accent (mint)
   */
  type?: "primary" | "secondary" | "accent"
  /**
   * Reverse the button colors (background/text)
   */
  reversed?: boolean
  /**
   * Use fixed width instead of full width
   */
  fixedWidth?: boolean
}

/**
 * A custom button component that has a stacked appearance.
 */
export const Button: FC<ButtonProps> = ({
  tx,
  text,
  txOptions,
  style,
  textStyle,
  onPress,
  icon,
  disabled = false,
  type = "primary",
  reversed = false,
  fixedWidth = false,
}) => {
  const { themed, theme } = useAppTheme()

  // Get the appropriate styles based on button type
  const getBottomLayerStyle = () => {
    if (type === "secondary") return themed($secondaryBottomLayer)
    if (type === "accent") return themed($accentBottomLayer)
    return themed($bottomLayer) // primary (default)
  }

  // Get the appropriate styles based on reversed state
  const getButtonLayerStyle = () => {
    if (reversed) {
      if (type === "secondary") return themed($secondaryReversedButtonLayer)
      if (type === "accent") return themed($accentReversedButtonLayer)
      return themed($reversedButtonLayer) // primary reversed
    }
    return themed($buttonLayer) // default (not reversed)
  }

  // Get the appropriate text style based on reversed state
  const getTextStyle = () => {
    if (reversed) {
      if (type === "secondary") return themed($secondaryReversedButtonText)
      if (type === "accent") return themed($accentReversedButtonText)
      return themed($reversedButtonText) // primary reversed
    }
    return themed($buttonText) // default (not reversed)
  }

  // Apply full width or fixed width
  const containerStyles = [
    themed($container),
    fixedWidth ? themed($fixedWidthContainer) : themed($fullWidthContainer),
    style
  ]

  return (
    <View style={containerStyles}>
      {/* Bottom layer (creates the stacked effect) */}
      <View style={getBottomLayerStyle()} />

      {/* Main button layer */}
      <Pressable
        style={({ pressed }) => [
          getButtonLayerStyle(),
          fixedWidth ? null : themed($fullWidthButtonLayer),
          pressed && themed($pressedButtonLayer),
          disabled && themed($disabledButtonLayer),
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <View style={styles.contentContainer}>
          <Text
            tx={tx}
            text={text}
            txOptions={txOptions}
            style={[getTextStyle(), textStyle, disabled && themed($disabledButtonText)]}
          />
          {icon && <View style={styles.iconContainer}>{icon}</View>}
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginLeft: 8,
  },
})

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  position: "relative",
  marginVertical: spacing.xs,
})

const $fullWidthContainer: ThemedStyle<ViewStyle> = () => ({
  width: "100%",
  alignSelf: "stretch",
})

const $fixedWidthContainer: ThemedStyle<ViewStyle> = () => ({
  alignSelf: "center",
})

const $fullWidthButtonLayer: ThemedStyle<ViewStyle> = () => ({
  width: "100%",
})

// Primary button styles (cyan)
const $bottomLayer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  bottom: -4,
  left: 3,
  right: -3,
  height: "100%",
  backgroundColor: colors.palette.primary200, // Cyan
  borderRadius: 8,
  zIndex: 1,
})

// Secondary button styles (pink)
const $secondaryBottomLayer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  bottom: -4,
  left: 3,
  right: -3,
  height: "100%",
  backgroundColor: colors.palette.secondary200, // Pink
  borderRadius: 8,
  zIndex: 1,
})

// Accent button styles (mint)
const $accentBottomLayer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  position: "absolute",
  bottom: -4,
  left: 3,
  right: -3,
  height: "100%",
  backgroundColor: colors.palette.accent200, // Mint
  borderRadius: 8,
  zIndex: 1,
})

// Default button layer
const $buttonLayer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  minHeight: 50,
  minWidth: 180,
  backgroundColor: colors.palette.neutral100, // White in light mode, black in dark mode
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.palette.neutral300,
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.md,
  zIndex: 2,
  justifyContent: "center",
  alignItems: "center",
})

// Reversed primary button (cyan background)
const $reversedButtonLayer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  minHeight: 50,
  minWidth: 180,
  backgroundColor: colors.palette.primary400, // Cyan background
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.palette.primary300,
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.md,
  zIndex: 2,
  justifyContent: "center",
  alignItems: "center",
})

// Reversed secondary button (pink background)
const $secondaryReversedButtonLayer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  minHeight: 50,
  minWidth: 180,
  backgroundColor: colors.palette.secondary400, // Pink background
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.palette.secondary300,
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.md,
  zIndex: 2,
  justifyContent: "center",
  alignItems: "center",
})

// Reversed accent button (mint background)
const $accentReversedButtonLayer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  minHeight: 50,
  minWidth: 180,
  backgroundColor: colors.palette.accent400, // Mint background
  borderRadius: 8,
  borderWidth: 1,
  borderColor: colors.palette.accent300,
  paddingVertical: spacing.xs,
  paddingHorizontal: spacing.md,
  zIndex: 2,
  justifyContent: "center",
  alignItems: "center",
})

const $pressedButtonLayer: ThemedStyle<ViewStyle> = () => ({
  transform: [{ translateY: 2 }], // Move slightly down when pressed
})

const $disabledButtonLayer: ThemedStyle<ViewStyle> = () => ({
  opacity: 0.6,
})

// Default text style
const $buttonText: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.text,
  fontSize: 16,
  fontFamily: typography.primary.medium,
  textAlign: "center",
})

// Reversed text style for primary button
const $reversedButtonText: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.palette.neutral100, // White text on dark background
  fontSize: 16,
  fontFamily: typography.primary.medium,
  textAlign: "center",
})

// Reversed text style for secondary button
const $secondaryReversedButtonText: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.palette.neutral100, // White text on dark background
  fontSize: 16,
  fontFamily: typography.primary.medium,
  textAlign: "center",
})

// Reversed text style for accent button
const $accentReversedButtonText: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.palette.neutral100, // White text on dark background
  fontSize: 16,
  fontFamily: typography.primary.medium,
  textAlign: "center",
})

const $disabledButtonText: ThemedStyle<TextStyle> = () => ({
  opacity: 0.6,
})