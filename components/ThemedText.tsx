import { Text, type TextProps, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { responsiveFont } from "@/utils/scaling";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "text-sub"
    | "text-base"
    | "text-xl"
    | "text-3xl"
    | "text-4xl"
    | "link";
  font?: "font-sans" | "font-semibold" | "font-bold";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "text-base",
  font = "font-sans",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    type === "text-sub" ? "tint" : "text"
  );

  return (
    <Text
      style={[
        { color },
        styles[type as keyof typeof styles],
        styles[font as keyof typeof styles],
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  "text-sub": {},
  "text-base": {
    fontSize: responsiveFont(18),
    lineHeight: 24,
  },
  "text-xl": {
    fontSize: responsiveFont(22),
    fontWeight: "bold",
  },
  "text-3xl": {
    fontSize: responsiveFont(24),
    fontWeight: "600",
    lineHeight: 30,
  },
  "text-4xl": {
    fontSize: responsiveFont(32),
    fontWeight: "bold",
    lineHeight: 38,
    marginBottom: 20,
  },
  "font-sans": {
    fontFamily: "Inter_400Regular",
  },
  "font-semibold": {
    fontFamily: "Inter_600SemiBold",
  },
  "font-bold": {
    fontFamily: "Inter_700Bold",
  },
});
