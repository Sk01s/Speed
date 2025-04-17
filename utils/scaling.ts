// utils/scaling.ts
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const scaleWidth = (size: number) => (width / 375) * size; // 375 = base iPhone width
export const scaleHeight = (size: number) => (height / 812) * size; // 812 = base iPhone height

export const moderateScale = (size: number, factor = 0.5) =>
  size + (scaleWidth(size) - size) * factor;

export const isWideScreen = width / height > 0.5;

export const responsiveFont = (size: number) => {
  if (isWideScreen) return moderateScale(size, 0.3);
  return scaleWidth(size);
};
