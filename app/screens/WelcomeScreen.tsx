import { FC, useState, useRef, useEffect } from "react"
import {
  Image,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
  Animated,
  Dimensions,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
} from "react-native"
import { Text, Screen } from "@/components"
import { AppStackScreenProps } from "../navigators"
import { $styles, type ThemedStyle } from "@/theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { useAppTheme } from "@/utils/useAppTheme"

// App assets
const bjjLogo = require("../../assets/images/logo.png")
const jjStance = require("../../assets/images/jjStance.png") // BJJ stance image
const welcomeScreen = require("../../assets/images/welcomeScreen.png") // Circle background

const { width, height } = Dimensions.get("window")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = ({ navigation }) => {
  const { themed, theme } = useAppTheme()
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  // Create animated values for the compass movement
  const [animatedX] = useState(new Animated.Value(0))
  const [animatedY] = useState(new Animated.Value(0))

  // Pan responder for touch interaction
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        // Use the gesture movement to animate compass
        const { dx, dy } = gestureState
        // Normalize movement to a reasonable range
        const x = Math.min(Math.max(dx / 20, -15), 15)
        const y = Math.min(Math.max(dy / 20, -15), 15)

        // Update animated values based on touch movement
        Animated.parallel([
          Animated.spring(animatedX, {
            toValue: x,
            useNativeDriver: true,
            tension: 40,
            friction: 8,
          }),
          Animated.spring(animatedY, {
            toValue: y,
            useNativeDriver: true,
            tension: 40,
            friction: 8,
          }),
        ]).start()
      },
      onPanResponderRelease: () => {
        // Return to center when touch is released
        Animated.parallel([
          Animated.spring(animatedX, {
            toValue: 0,
            useNativeDriver: true,
            tension: 40,
            friction: 8,
          }),
          Animated.spring(animatedY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 40,
            friction: 8,
          }),
        ]).start()
      },
    }),
  ).current

  // Subtle auto-animation when not being touched
  useEffect(() => {
    const interval = setInterval(() => {
      const randomX = (Math.random() * 2 - 1) * 3 // Random value between -3 and 3
      const randomY = (Math.random() * 2 - 1) * 3 // Random value between -3 and 3

      Animated.parallel([
        Animated.spring(animatedX, {
          toValue: randomX,
          useNativeDriver: true,
          tension: 20,
          friction: 8,
        }),
        Animated.spring(animatedY, {
          toValue: randomY,
          useNativeDriver: true,
          tension: 20,
          friction: 8,
        }),
      ]).start()
    }, 3000) // Move every 3 seconds

    return () => clearInterval(interval)
  }, [])

  // Circle background transform (slight movement for parallax)
  const circleTransform = [
    {
      translateX: animatedX.interpolate({
        inputRange: [-10, 10],
        outputRange: [-5, 5],
      }),
    },
    {
      translateY: animatedY.interpolate({
        inputRange: [-10, 10],
        outputRange: [-5, 5],
      }),
    },
  ]

  // Stance image transform (compass-like behavior)
  // Rotates counter to movement to maintain orientation
  const stanceTransform = [
    {
      rotate: animatedX.interpolate({
        inputRange: [-10, 10],
        outputRange: ["10deg", "-10deg"], // Counter-rotate to maintain orientation
      }),
    },
    {
      scale: animatedY.interpolate({
        inputRange: [-10, 10],
        outputRange: [0.95, 1.05],
      }),
    },
  ]

  // Background slight parallax effect
  const backgroundTransform = [
    {
      translateX: animatedX.interpolate({
        inputRange: [-10, 10],
        outputRange: [-5, 5],
      }),
    },
    {
      translateY: animatedY.interpolate({
        inputRange: [-10, 10],
        outputRange: [-5, 5],
      }),
    },
  ]

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      {/* Main container with pan responder for interaction */}
      <View style={styles.mainContainer} {...panResponder.panHandlers}>
        {/* Subtle moving background */}
        <Animated.View style={[styles.backgroundContainer, { transform: backgroundTransform }]}>
          <View
            style={[
              styles.backgroundGradient,
              {
                backgroundColor: theme.isDark
                  ? theme.colors.background
                  : theme.colors.palette.neutral200,
              },
            ]}
          />
        </Animated.View>

        {/* App logo */}

        <Text
          testID="welcome-heading"
          style={themed($welcomeHeading)}
          text="SUBTRACKER"
          preset="heading"
        />

        <Text
          style={themed($welcomeSubheading)}
          text="Your BJJ Submission Journey"
          preset="subheading"
        />

        {/* Circle with stance image inside */}
        <View style={styles.circleContainer}>
          {/* Circle background from welcomeScreen.png */}
          <Animated.Image
            source={welcomeScreen}
            style={[styles.circleImage, { transform: circleTransform }]}
            resizeMode="contain"
          />

          {/* JJ Stance image with compass-like behavior */}
          <Animated.Image
            source={jjStance}
            style={[styles.stanceImage, { transform: stanceTransform }]}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Bottom container with login button */}
      <View style={themed([$bottomContainer, $bottomContainerInsets])}>
        <Text text="Welcome to your submission tracking journey" style={themed($welcomeText)} />

        <TouchableOpacity style={themed($loginButton)} onPress={() => navigation.navigate("Login")}>
          <Text text="LOGIN / SIGNUP" style={themed($buttonText)} />
        </TouchableOpacity>

        <Text text="Tilt or drag to interact with the compass" style={styles.tiltHint} />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  backgroundContainer: {
    height: height,
    position: "absolute",
    width: width + 10,
    zIndex: 1,
  },
  backgroundGradient: {
    height: "100%",
    opacity: 0.7,
    width: "100%",
  },
  circleContainer: {
    alignItems: "center",
    height: 240,
    justifyContent: "center",
    marginTop: 20,
    position: "relative",
    width: 240,
    zIndex: 10,
  },
  circleImage: {
    height: "100%",
    position: "absolute",
    width: "100%",
    zIndex: 10,
  },
  mainContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
  },
  stanceImage: {
    height: "80%",
    width: "80%",
    zIndex: 15,
  },
  tiltHint: {
    fontSize: 12,
    marginTop: 10,
    opacity: 0.7,
    textAlign: "center",
  },
})

const $bottomContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "35%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.md,
  alignItems: "center",
  justifyContent: "space-around",
})

const $bjjLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 70,
  width: "70%",
  marginBottom: spacing.md,
  zIndex: 15,
})

const $welcomeHeading: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
  marginBottom: spacing.xs,
  textAlign: "center",
  fontSize: 36,
  fontWeight: "bold",
  color: colors.text,
  zIndex: 15,
})

const $welcomeSubheading: ThemedStyle<TextStyle> = ({ colors }) => ({
  textAlign: "center",
  color: colors.text,
  opacity: 0.8,
  zIndex: 15,
})

const $welcomeText: ThemedStyle<TextStyle> = ({ colors }) => ({
  textAlign: "center",
  color: colors.text,
  marginBottom: 20,
})

const $loginButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.primary500,
  paddingVertical: 12,
  paddingHorizontal: 40,
  borderRadius: 8,
  alignItems: "center",
  width: "80%",
})

const $buttonText: ThemedStyle<TextStyle> = () => ({
  color: "white",
  fontWeight: "bold",
  fontSize: 16,
})
