/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#6B6B6B";
const tintColorDark = "#aBaBaB";

export const Colors = {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#B5B5B5",
    tabIconSelected: "#000",
    inputBackground: "#EEEEEE",
    placeholder: "#888888",
    buttonBackground: "#000000",
    buttonText: "#FFFFFF",
    error: "#9C2B2E",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    inputBackground: "#333333",
    placeholder: "#CCCCCC",
    buttonBackground: "#FFFFFF",
    buttonText: "#000000",
    error: "#9C2B2E",
  },
};
