// Default slider constants
export const DEFAULT_MIN = 0;
export const DEFAULT_MAX = 100;
export const DEFAULT_STEP = 1;
export const DEFAULT_WIDTH = 300;
export const DEFAULT_HEIGHT = 40;
export const DEFAULT_THUMB_SIZE = 20;
export const DEFAULT_THUMB_BORDER_WIDTH = 2;
export const DEFAULT_THUMB_FOCUS_RING_SIZE = 28;

export const DEFAULT_THEME = "light" as const;
export const THEME_COLORS = {
  light: {
    trackColor: "#F5F5F5",
    activeTrackColor: "#171717",
    thumbColor: "#FFFFFF",
    thumbBorderColor: "#171717",
    thumbFocusRingColor: "#D0D0D0",
  },
  dark: {
    trackColor: "#262626",
    activeTrackColor: "#E5E5E5",
    thumbColor: "#0A0A0A",
    thumbBorderColor: "#E5E5E5",
    thumbFocusRingColor: "#3F3F3F",
  },
};

// Track styling
export const DEFAULT_TRACK_HEIGHT = 4;
export const DEFAULT_TRACK_BORDER_RADIUS = 2;
