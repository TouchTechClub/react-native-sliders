import React, { useCallback, useMemo } from "react";
import { View, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  interpolate,
  withTiming,
} from "react-native-reanimated";
import {
  DEFAULT_MIN,
  DEFAULT_MAX,
  DEFAULT_STEP,
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  DEFAULT_THUMB_SIZE,
  DEFAULT_THUMB_BORDER_WIDTH,
  DEFAULT_THUMB_FOCUS_RING_SIZE,
  DEFAULT_THEME,
} from "./lib/constants";
import {
  useThemeColors,
  useSliderStyles,
  useFocusRingAnimation,
  useThumbAnimation,
  sharedStyles,
  positionToValue,
  clampPosition,
} from "./lib/utils";

/**
 * Props for the Slider component
 */
export interface SliderProps {
  /** Minimum value of the slider. Default: 0 */
  min?: number;
  /** Maximum value of the slider. Default: 100 */
  max?: number;
  /** Initial value of the slider. Default: 0 */
  initialValue?: number;
  /** Step value for discrete slider movement. Default: 1 */
  step?: number;
  /** Theme for the slider, 'light' or 'dark'. Default: 'light' */
  theme?: "light" | "dark";
  /** Width of the slider component in pixels. Default: 300 */
  width?: number;
  /** Height of the slider component in pixels. Default: 40 */
  height?: number;
  /** Background color of the inactive track. Overrides theme. */
  trackColor?: string;
  /** Color of the active track (filled portion). Overrides theme. */
  activeTrackColor?: string;
  /** Color of the thumb/handle. Overrides theme. */
  thumbColor?: string;
  /** Color of the thumb/handle border. Overrides theme. */
  thumbBorderColor?: string;
  /** Color of the thumb/handle focus ring. Overrides theme. */
  thumbFocusRingColor?: string;
  /** Width of the thumb/handle border in pixels. Default: 2 */
  thumbBorderWidth?: number;
  /** Size of the thumb/handle in pixels. Default: 20 */
  thumbSize?: number;
  /** Size of the thumb focus ring in pixels. Default: 28 */
  thumbFocusRingSize?: number;
  /** Enable or disable tap to move behavior. Default: true */
  tapToMove?: boolean;
  /** Callback function called when the slider value changes */
  onValueChange?: (value: number) => void;
  /** Additional styles to apply to the container */
  style?: ViewStyle;
}

/**
 * A customizable single-value slider component for React Native
 *
 * @description
 * This component provides a smooth, animated slider that allows users to select
 * a single value from a specified range. It supports gesture-based interaction (pan and tap),
 * customizable styling with light/dark themes, and step-based value selection.
 * A focus ring provides visual feedback when panning the thumb.
 *
 * @example
 * ```tsx
 * import { Slider } from 'react-native-range-slider';
 *
 * function MyComponent() {
 *   const [value, setValue] = useState(50);
 *
 *   return (
 *     <Slider
 *       min={0}
 *       max={100}
 *       initialValue={value}
 *       step={5}
 *       onValueChange={setValue}
 *       width={250}
 *       theme="dark"
 *     />
 *   );
 * }
 * ```
 *
 * @param props - The props for the Slider component
 * @returns A React Native slider component
 */
export default function Slider({
  min = DEFAULT_MIN,
  max = DEFAULT_MAX,
  initialValue = DEFAULT_MIN,
  step = DEFAULT_STEP,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  theme = DEFAULT_THEME,
  trackColor,
  activeTrackColor,
  thumbColor,
  thumbBorderColor,
  thumbFocusRingColor,
  thumbBorderWidth = DEFAULT_THUMB_BORDER_WIDTH,
  thumbSize = DEFAULT_THUMB_SIZE,
  thumbFocusRingSize = DEFAULT_THUMB_FOCUS_RING_SIZE,
  tapToMove = true,
  onValueChange,
  style,
}: SliderProps) {
  const trackWidth = useMemo(() => width - thumbSize, [width, thumbSize]);

  const colors = useThemeColors(theme, {
    trackColor,
    activeTrackColor,
    thumbColor,
    thumbBorderColor,
    thumbFocusRingColor,
  });

  const styles = useSliderStyles(
    thumbSize,
    thumbFocusRingSize,
    thumbBorderWidth,
    colors
  );

  const position = useSharedValue(
    interpolate(initialValue, [min, max], [0, trackWidth], "clamp")
  );

  const updateValue = useCallback(
    (newPosition: number) => {
      "worklet";
      const finalValue = positionToValue(
        newPosition,
        trackWidth,
        min,
        max,
        step
      );

      if (onValueChange) {
        runOnJS(onValueChange)(finalValue);
      }
    },
    [trackWidth, min, max, step, onValueChange]
  );

  const startPosition = useSharedValue(0);
  const isThumbActive = useSharedValue(0);

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .onStart(() => {
          startPosition.value = position.value;
          isThumbActive.value = withTiming(1);
        })
        .onUpdate((event) => {
          const newPosition = startPosition.value + event.translationX;
          const clampedPosition = clampPosition(newPosition, 0, trackWidth);
          position.value = clampedPosition;
          updateValue(clampedPosition);
        })
        .onFinalize(() => {
          isThumbActive.value = withTiming(0);
        }),
    [trackWidth, updateValue]
  );

  const tapGesture = useMemo(
    () =>
      Gesture.Tap()
        .enabled(tapToMove)
        .onStart((event) => {
          const newPosition = event.x - thumbSize / 2;
          const clampedPosition = clampPosition(newPosition, 0, trackWidth);
          position.value = withTiming(clampedPosition, { duration: 100 });
          updateValue(clampedPosition);
        }),
    [tapToMove, thumbSize, trackWidth, updateValue]
  );

  const thumbAnimatedStyle = useThumbAnimation(position);
  const focusRingAnimatedStyle = useFocusRingAnimation(
    position,
    isThumbActive,
    thumbSize,
    thumbFocusRingSize
  );

  const activeTrackAnimatedStyle = useAnimatedStyle(() => ({
    width: position.value + thumbSize / 2,
  }));

  return (
    <GestureDetector gesture={tapGesture}>
      <View style={[sharedStyles.container, { width, height }, style]}>
        {/* Track background */}
        <View
          style={[
            styles.track,
            {
              width: trackWidth,
              marginHorizontal: thumbSize / 2,
            },
          ]}
        />

        {/* Active track */}
        <Animated.View
          style={[
            styles.activeTrack,
            {
              marginLeft: thumbSize / 2,
            },
            activeTrackAnimatedStyle,
          ]}
        />

        {/* Focus Ring */}
        <Animated.View style={[styles.focusRing, focusRingAnimatedStyle]} />

        {/* Thumb */}
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.thumb, thumbAnimatedStyle]} />
        </GestureDetector>
      </View>
    </GestureDetector>
  );
}
