import { useMemo } from "react";
import { StyleSheet } from "react-native";
import {
  interpolate,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  DEFAULT_TRACK_HEIGHT,
  DEFAULT_TRACK_BORDER_RADIUS,
  THEME_COLORS,
} from "./constants";

/**
 * Hook to calculate theme colors with memoization
 */
export function useThemeColors(
  theme: "light" | "dark",
  customColors: {
    trackColor?: string;
    activeTrackColor?: string;
    thumbColor?: string;
    thumbBorderColor?: string;
    thumbFocusRingColor?: string;
  }
) {
  return useMemo(() => {
    const themeColors = THEME_COLORS[theme];
    return {
      trackColor: customColors.trackColor ?? themeColors.trackColor,
      activeTrackColor:
        customColors.activeTrackColor ?? themeColors.activeTrackColor,
      thumbColor: customColors.thumbColor ?? themeColors.thumbColor,
      thumbBorderColor:
        customColors.thumbBorderColor ?? themeColors.thumbBorderColor,
      thumbFocusRingColor:
        customColors.thumbFocusRingColor ?? themeColors.thumbFocusRingColor,
    };
  }, [theme, customColors]);
}

/**
 * Worklet function to clamp position within bounds
 */
export function clampPosition(
  position: number,
  min: number,
  max: number
): number {
  "worklet";
  return Math.max(min, Math.min(max, position));
}

/**
 * Worklet function to calculate stepped value
 */
export function calculateSteppedValue(
  value: number,
  step: number,
  min: number,
  max: number
): number {
  "worklet";
  const steppedValue = step > 0 ? Math.round(value / step) * step : value;
  return Math.max(min, Math.min(max, steppedValue));
}

/**
 * Worklet function to convert position to value
 */
export function positionToValue(
  position: number,
  trackWidth: number,
  min: number,
  max: number,
  step: number
): number {
  "worklet";
  const clampedPosition = clampPosition(position, 0, trackWidth);
  const rawValue = interpolate(clampedPosition, [0, trackWidth], [min, max]);
  return calculateSteppedValue(rawValue, step, min, max);
}

/**
 * Hook for common slider styles with memoization
 */
export function useSliderStyles(
  thumbSize: number,
  thumbFocusRingSize: number,
  thumbBorderWidth: number,
  colors: ReturnType<typeof useThemeColors>
) {
  return useMemo(
    () => ({
      track: [
        sharedStyles.track,
        {
          backgroundColor: colors.trackColor,
          height: DEFAULT_TRACK_HEIGHT,
        },
      ],
      activeTrack: [
        sharedStyles.activeTrack,
        {
          backgroundColor: colors.activeTrackColor,
          height: DEFAULT_TRACK_HEIGHT,
        },
      ],
      thumb: [
        sharedStyles.thumb,
        {
          backgroundColor: colors.thumbColor,
          borderColor: colors.thumbBorderColor,
          borderWidth: thumbBorderWidth,
          width: thumbSize,
          height: thumbSize,
          borderRadius: thumbSize / 2,
        },
      ],
      focusRing: [
        sharedStyles.focusRing,
        {
          width: thumbFocusRingSize,
          height: thumbFocusRingSize,
          borderRadius: thumbFocusRingSize / 2,
          backgroundColor: colors.thumbFocusRingColor,
        },
      ],
    }),
    [thumbSize, thumbFocusRingSize, thumbBorderWidth, colors]
  );
}

/**
 * Hook for creating focus ring animated style
 */
export function useFocusRingAnimation(
  position: Readonly<{ value: number }>,
  isActive: Readonly<{ value: number }>,
  thumbSize: number,
  thumbFocusRingSize: number
) {
  return useAnimatedStyle(() => ({
    opacity: isActive.value,
    transform: [
      {
        translateX: position.value - (thumbFocusRingSize - thumbSize) / 2,
      },
    ],
  }));
}

/**
 * Hook for creating thumb animated style
 */
export function useThumbAnimation(position: Readonly<{ value: number }>) {
  return useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));
}

/**
 * Shared styles between components
 */
export const sharedStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  track: {
    position: "absolute",
    borderRadius: DEFAULT_TRACK_BORDER_RADIUS,
  },
  activeTrack: {
    position: "absolute",
    borderRadius: DEFAULT_TRACK_BORDER_RADIUS,
  },
  focusRing: {
    position: "absolute",
  },
  thumb: {
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
}); 