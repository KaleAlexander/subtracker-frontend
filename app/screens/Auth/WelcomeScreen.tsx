import { FC, useState, useRef, useEffect } from "react"
import {
  TextStyle,
  View,
  ViewStyle,
  Animated,
  Dimensions,
  StyleSheet,
  PanResponder,
} from "react-native"
import { Text, Screen, Button } from "@/components"
import { AppStackScreenProps, navigate } from "../../navigators"
import { $styles, type ThemedStyle } from "@/theme"
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle"
import { useAppTheme } from "@/utils/useAppTheme"

const jjStance = require("../../../assets/images/jjStance.png") // BJJ stance image
const welcomeScreen = require("../../../assets/images/welcomeScreen.png") // Circle background

const { width, height } = Dimensions.get("window")

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = () => {
  const { themed, theme } = useAppTheme()
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  const navigateLogin = () => {
    navigate("Login")
  }

  const [animatedX] = useState(new Animated.Value(0))
  const [animatedY] = useState(new Animated.Value(0))

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const { dx, dy } = gestureState
        const x = Math.min(Math.max(dx / 20, -15), 15)
        const y = Math.min(Math.max(dy / 20, -15), 15)

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

  useEffect(() => {
    const interval = setInterval(() => {
      const randomX = (Math.random() * 2 - 1) * 3
      const randomY = (Math.random() * 2 - 1) * 3

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
    }, 3000)

    return () => clearInterval(interval)
  }, [])

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

  const stanceTransform = [
    {
      rotate: animatedX.interpolate({
        inputRange: [-10, 10],
        outputRange: ["10deg", "-10deg"],
      }),
    },
    {
      scale: animatedY.interpolate({
        inputRange: [-10, 10],
        outputRange: [0.95, 1.05],
      }),
    },
  ]

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
      <View style={styles.mainContainer} {...panResponder.panHandlers}>
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
        <Button
          onPress={navigateLogin}
          type="secondary"
          reversed={true}
          tx="welcomeScreen:loginSignup"
          fixedWidth={true}
        />

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

  circleContainer: {
    alignItems: "center",
    height: 340,
    justifyContent: "center",
    marginTop: 20,
    position: "relative",
    width: 540,
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
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.md,
  alignItems: "center",
  justifyContent: "space-around",
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
