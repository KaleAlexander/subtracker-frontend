import { ComponentType, forwardRef, Ref, useImperativeHandle, useRef } from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { InputOutline } from "react-native-input-outline"
import { isRTL, translate } from "@/i18n"
import { Text, TextProps } from "./Text"
import { useAppTheme } from "@/utils/useAppTheme"

export interface TextFieldAccessoryProps {
  style: StyleProp<ViewStyle | TextStyle>
  status: TextFieldProps["status"]
  multiline: boolean
  editable: boolean
}

export interface TextFieldProps {
  /**
   * A style modifier for different input states.
   */
  status?: "error" | "disabled"
  /**
   * The label text to display if not using `labelTx`.
   */
  label?: string
  /**
   * Label text which is looked up via i18n.
   */
  labelTx?: TextProps["tx"]
  /**
   * Optional label options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  labelTxOptions?: TextProps["txOptions"]
  /**
   * The helper text to display if not using `helperTx`.
   */
  helper?: string
  /**
   * Helper text which is looked up via i18n.
   */
  helperTx?: TextProps["tx"]
  /**
   * Optional helper options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  helperTxOptions?: TextProps["txOptions"]
  /**
   * The placeholder text to display if not using `placeholderTx`.
   */
  placeholder?: string
  /**
   * Placeholder text which is looked up via i18n.
   */
  placeholderTx?: TextProps["tx"]
  /**
   * Optional placeholder options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  placeholderTxOptions?: TextProps["txOptions"]
  /**
   * Optional input style override.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Style overrides for the container
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * An optional component to render on the right side of the input.
   */
  RightAccessory?: ComponentType<TextFieldAccessoryProps>
  /**
   * An optional component to render on the left side of the input.
   */
  LeftAccessory?: ComponentType<TextFieldAccessoryProps>
  /**
   * Whether the input is editable
   */
  editable?: boolean
  /**
   * Whether the input is multiline
   */
  multiline?: boolean
  /**
   * The value of the input
   */
  value?: string
  /**
   * Callback on input change
   */
  onChangeText?: (text: string) => void
  /**
   * Keyboard type for the input
   */
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad"
    | "url"
  /**
   * Whether to secure text entry (for passwords)
   */
  secureTextEntry?: boolean
  /**
   * Auto capitalize behavior
   */
  autoCapitalize?: "none" | "sentences" | "words" | "characters"
  /**
   * Auto correct behavior
   */
  autoCorrect?: boolean
  /**
   * Text content type (iOS only)
   */
  textContentType?: string
  /**
   * Return key type
   */
  returnKeyType?: "done" | "go" | "next" | "search" | "send"
  /**
   * Max length of input
   */
  maxLength?: number
  /**
   * Callback when text input is focused
   */
  onFocus?: () => void
  /**
   * Callback when text input is blurred
   */
  onBlur?: () => void
  /**
   * Callback when return key is pressed
   */
  onSubmitEditing?: () => void
  /**
   * Input height
   */
  height?: number
}

/**
 * A component that allows for the entering and editing of text using InputOutline from react-native-input-outline.
 */
export const TextField = forwardRef(function TextField(
  props: TextFieldProps,
  ref: Ref<InputOutline>,
) {
  const {
    labelTx,
    label,
    labelTxOptions,
    placeholderTx,
    placeholder,
    placeholderTxOptions,
    helper,
    helperTx,
    helperTxOptions,
    status,
    RightAccessory,
    LeftAccessory,
    style,
    containerStyle,
    editable = true,
    height = 32, // Default taller height
    ...textInputProps
  } = props

  const inputRef = useRef<InputOutline>(null)
  const { theme } = useAppTheme()
  const { colors } = theme

  const disabled = !editable || status === "disabled"
  const errorMessage =
    status === "error" ? (helperTx ? translate(helperTx, helperTxOptions) : helper) : undefined

  // Handle i18n translations
  const labelText = labelTx ? translate(labelTx, labelTxOptions) : label
  const placeholderText = placeholderTx
    ? translate(placeholderTx, placeholderTxOptions)
    : placeholder

  useImperativeHandle(ref, () => inputRef.current)

  return (
    <View style={[defaultContainerStyle, containerStyle]}>
      <InputOutline
        ref={inputRef}
        label={labelText}
        placeholder={placeholderText}
        error={errorMessage}
        disabled={disabled}
        activeColor={colors.palette.primary300}
        inactiveColor={colors.palette.primary700}
        textColor={colors.palette.primary200}
        fontColor={colors.text}
        fontSize={16}
        height={height}
        containerStyle={[defaultInputStyle, style]}
        backgroundColor={colors.palette.neutral100}
        leadingIcon={
          LeftAccessory
            ? () => (
                <LeftAccessory
                  style={{}}
                  status={status}
                  editable={!disabled}
                  multiline={textInputProps.multiline ?? false}
                />
              )
            : undefined
        }
        trailingIcon={
          RightAccessory
            ? () => (
                <RightAccessory
                  style={{}}
                  status={status}
                  editable={!disabled}
                  multiline={textInputProps.multiline ?? false}
                />
              )
            : undefined
        }
        {...textInputProps}
      />

      {helper && !errorMessage && (
        <Text
          text={helper}
          style={{
            fontSize: 12,
            color: colors.textDim,
            marginTop: 4,
            marginLeft: 8,
          }}
        />
      )}
    </View>
  )
})

// Default styles to make the TextField take up full width
const defaultContainerStyle: ViewStyle = {
  width: "100%",
}

const defaultInputStyle: ViewStyle = {
  width: "100%",
}

export default TextField
