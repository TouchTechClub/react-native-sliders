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
  sharedStyles,
  clampPosition,
  calculateSteppedValue,
} from "./lib/utils";

/**
 * Props for the RangeSlider component
 */
export interface RangeSliderProps {
  /** Minimum value of the range. Default: 0 */
  min?: number;
  /** Maximum value of the range. Default: 100 */
  max?: number;
  /** Initial minimum value of the range. Default: 0 */
  initialMin?: number;
  /** Initial maximum value of the range. Default: 100 */
  initialMax?: number;
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
  /** Color of the active track (selected range). Overrides theme. */
  activeTrackColor?: string;
  /** Color of both thumbs/handles. Overrides theme. */
  thumbColor?: string;
  /** Color of the thumb/handle border. Overrides theme. */
  thumbBorderColor?: string;
  /** Color of the thumb/handle focus ring. Overrides theme. */
  thumbFocusRingColor?: string;
  /** Width of the thumb/handle border in pixels. Default: 2 */
  thumbBorderWidth?: number;
  /** Size of both thumbs/handles in pixels. Default: 20 */
  thumbSize?: number;
  /** Size of the thumb focus ring in pixels. Default: 28 */
  thumbFocusRingSize?: number;
  /** Enable or disable tap to move behavior. Default: true */
  tapToMove?: boolean;
  /** Callback function called when the range values change */
  onRangeChange?: (min: number, max: number) => void;
  /** Additional styles to apply to the container */
  style?: ViewStyle;
}

/**
 * A customizable range slider component for React Native
 *
 * @description
 * This component allows users to select a range of values within a specified
 * minimum and maximum. It's built with `react-native-gesture-handler` and
 * `react-native-reanimated` for a smooth, native-like experience, supporting
 * both pan and tap gestures. The slider is themeable with light/dark modes
 * and provides a focus ring on the thumbs for better user interaction.
 *
 * @example
 * ```tsx
 * import { RangeSlider } from 'react-native-range-slider';
 *
 * function MyComponent() {
 *   const [range, setRange] = useState({ min: 20, max: 80 });
 *
 *   return (
 *     <RangeSlider
 *       min={0}
 *       max={100}
 *       initialMin={range.min}
 *       initialMax={range.max}
 *       onRangeChange={(min, max) => setRange({ min, max })}
 *       step={10}
 *       width={300}
 *       theme="dark"
 *     />
 *   );
 * }
 * ```
 *
 * @param props - The props for the RangeSlider component
 * @returns A React Native range slider component
 */
export default function RangeSlider({
  min = DEFAULT_MIN,
  max = DEFAULT_MAX,
  initialMin = DEFAULT_MIN,
  initialMax = DEFAULT_MAX,
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
  onRangeChange,
  style,
}: RangeSliderProps) {
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

  const leftPosition = useSharedValue(
    interpolate(initialMin, [min, max], [0, trackWidth], "clamp")
  );

  const rightPosition = useSharedValue(
    interpolate(initialMax, [min, max], [0, trackWidth], "clamp")
  );

  const updateRangeValues = useCallback(() => {
    "worklet";
    const leftValue = interpolate(
      leftPosition.value,
      [0, trackWidth],
      [min, max],
      "clamp"
    );
    const rightValue = interpolate(
      rightPosition.value,
      [0, trackWidth],
      [min, max],
      "clamp"
    );

    // Apply step to both values
    const finalLeftValue = calculateSteppedValue(leftValue, step, min, max);
    const finalRightValue = calculateSteppedValue(rightValue, step, min, max);

    if (onRangeChange) {
      runOnJS(onRangeChange)(finalLeftValue, finalRightValue);
    }
  }, [trackWidth, min, max, step, onRangeChange, leftPosition, rightPosition]);

  const startLeftPosition = useSharedValue(0);
  const startRightPosition = useSharedValue(0);
  const isLeftThumbActive = useSharedValue(0);
  const isRightThumbActive = useSharedValue(0);

  const leftPanGesture = useMemo(
    () =>
      Gesture.Pan()
        .onStart(() => {
          startLeftPosition.value = leftPosition.value;
          isLeftThumbActive.value = withTiming(1);
        })
        .onUpdate((event) => {
          const newPosition = startLeftPosition.value + event.translationX;
          leftPosition.value = Math.min(
            newPosition,
            rightPosition.value - thumbSize
          );
          runOnJS(updateRangeValues)();
        })
        .onFinalize(() => {
          isLeftThumbActive.value = withTiming(0);
        }),
    [thumbSize, updateRangeValues]
  );

  const rightPanGesture = useMemo(
    () =>
      Gesture.Pan()
        .onStart(() => {
          startRightPosition.value = rightPosition.value;
          isRightThumbActive.value = withTiming(1);
        })
        .onUpdate((event) => {
          const newPosition = startRightPosition.value + event.translationX;
          rightPosition.value = Math.max(
            newPosition,
            leftPosition.value + thumbSize
          );
          updateRangeValues();
        })
        .onFinalize(() => {
          isRightThumbActive.value = withTiming(0);
        }),
    [thumbSize, updateRangeValues]
  );

  const tapGesture = useMemo(
    () =>
      Gesture.Tap()
        .enabled(tapToMove)
        .onStart((event) => {
          const tapX = event.x - thumbSize / 2;
          const clampedPosition = clampPosition(tapX, 0, trackWidth);

          const distToLeft = Math.abs(clampedPosition - leftPosition.value);
          const distToRight = Math.abs(clampedPosition - rightPosition.value);

          if (distToLeft < distToRight) {
            leftPosition.value = withTiming(clampedPosition, { duration: 100 });
          } else {
            rightPosition.value = withTiming(clampedPosition, {
              duration: 100,
            });
          }
          updateRangeValues();
        }),
    [tapToMove, thumbSize, trackWidth, updateRangeValues]
  );

  const leftThumbAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: leftPosition.value }],
    zIndex: isLeftThumbActive.value ? 1 : 0,
  }));

  const rightThumbAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: rightPosition.value }],
    zIndex: isRightThumbActive.value ? 1 : 0,
  }));

  const leftFocusRingAnimatedStyle = useFocusRingAnimation(
    leftPosition,
    isLeftThumbActive,
    thumbSize,
    thumbFocusRingSize
  );

  const rightFocusRingAnimatedStyle = useFocusRingAnimation(
    rightPosition,
    isRightThumbActive,
    thumbSize,
    thumbFocusRingSize
  );

  const activeTrackAnimatedStyle = useAnimatedStyle(() => ({
    left: leftPosition.value + thumbSize / 2,
    width: rightPosition.value - leftPosition.value,
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
        <Animated.View style={[styles.activeTrack, activeTrackAnimatedStyle]} />

        {/* Left Focus Ring */}
        <Animated.View style={[styles.focusRing, leftFocusRingAnimatedStyle]} />

        {/* Right Focus Ring */}
        <Animated.View
          style={[styles.focusRing, rightFocusRingAnimatedStyle]}
        />

        {/* Left Thumb */}
        <GestureDetector gesture={leftPanGesture}>
          <Animated.View
            style={[
              styles.thumb,
              {
                zIndex: 2,
              },
              leftThumbAnimatedStyle,
            ]}
          />
        </GestureDetector>

        {/* Right Thumb */}
        <GestureDetector gesture={rightPanGesture}>
          <Animated.View
            style={[
              styles.thumb,
              {
                zIndex: 2,
              },
              rightThumbAnimatedStyle,
            ]}
          />
        </GestureDetector>
      </View>
    </GestureDetector>
  );
}
