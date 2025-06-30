# @touchtech/react-native-range-slider

A high-performance, customizable range slider component for React Native with smooth animations (probably) and gesture support.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎯 **Single Value & Range Selection** - Two components for different use cases
- 🚀 **High Performance** - No promises right now 🤞.
- 👆 **Gesture Support** - Pan and tap gestures with react-native-gesture-handler
- 🎨 **Fully Customizable** - Colors, sizes, themes, and styling options
- 🌓 **Theme Support** - Built-in light and dark themes
- 📐 **Step Values** - Support for discrete value selection
- ♿ **Accessible** - Screen reader support and focus indicators
- 📱 **Cross Platform** - Works on iOS, Android, and Web
- 🪶 **Lightweight** - Minimal bundle size
- 🔧 **TypeScript** - Full type safety with comprehensive prop types

## 📦 Installation

```bash
npm install @touchtech/react-native-range-slider
```

```bash
yarn add @touchtech/react-native-range-slider
```

```bash
bun add @touchtech/react-native-range-slider
```

### Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install react-native-reanimated react-native-gesture-handler
```

Follow the installation guides for:
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation)

## 🚀 Quick Start

### Single Value Slider

```tsx
import React, { useState } from 'react';
import { Slider } from '@touchtech/react-native-range-slider';

export default function App() {
  const [value, setValue] = useState(50);

  return (
    <Slider
      min={0}
      max={100}
      initialValue={value}
      onValueChange={setValue}
      width={300}
      theme="light"
    />
  );
}
```

### Range Slider

```tsx
import React, { useState } from 'react';
import { RangeSlider } from '@touchtech/react-native-range-slider';

export default function App() {
  const [range, setRange] = useState<[number, number]>([20, 80]);

  return (
    <RangeSlider
      min={0}
      max={100}
      initialMin={range[0]}
      initialMax={range[1]}
      onRangeChange={(min, max) => setRange([min, max])}
      width={300}
      theme="dark"
    />
  );
}
```

## 📖 Examples

### Custom Styling

```tsx
<Slider
  min={0}
  max={100}
  initialValue={25}
  onValueChange={setValue}
  width={280}
  height={50}
  thumbSize={24}
  thumbColor="#FF6B6B"
  activeTrackColor="#FF6B6B"
  trackColor="#F0F0F0"
  thumbBorderColor="#E55555"
  thumbFocusRingColor="#FFD6D6"
/>
```

### Step Values

```tsx
<Slider
  min={0}
  max={100}
  step={10}
  initialValue={50}
  onValueChange={setValue}
  width={300}
/>
```

### Price Range Filter

```tsx
<RangeSlider
  min={0}
  max={1000}
  step={50}
  initialMin={100}
  initialMax={500}
  onRangeChange={(min, max) => 
    console.log(`Price range: $${min} - $${max}`)
  }
  width={300}
  activeTrackColor="#27AE60"
  thumbColor="#229954"
/>
```

### Precision Values

```tsx
<Slider
  min={0}
  max={5}
  step={0.1}
  initialValue={2.5}
  onValueChange={setValue}
  width={280}
/>
```

## 📚 API Reference

### Slider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `initialValue` | `number` | `0` | Initial slider value |
| `step` | `number` | `1` | Step value for discrete movement |
| `theme` | `'light' \| 'dark'` | `'light'` | Built-in theme |
| `width` | `number` | `300` | Slider width in pixels |
| `height` | `number` | `40` | Slider height in pixels |
| `trackColor` | `string` | `undefined` | Track background color |
| `activeTrackColor` | `string` | `undefined` | Active track color |
| `thumbColor` | `string` | `undefined` | Thumb color |
| `thumbBorderColor` | `string` | `undefined` | Thumb border color |
| `thumbFocusRingColor` | `string` | `undefined` | Focus ring color |
| `thumbBorderWidth` | `number` | `2` | Thumb border width |
| `thumbSize` | `number` | `20` | Thumb size in pixels |
| `thumbFocusRingSize` | `number` | `28` | Focus ring size in pixels |
| `tapToMove` | `boolean` | `true` | Enable tap to move |
| `onValueChange` | `(value: number) => void` | `undefined` | Value change callback |
| `style` | `ViewStyle` | `undefined` | Container styles |

### RangeSlider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `initialMin` | `number` | `0` | Initial minimum value |
| `initialMax` | `number` | `100` | Initial maximum value |
| `step` | `number` | `1` | Step value for discrete movement |
| `theme` | `'light' \| 'dark'` | `'light'` | Built-in theme |
| `width` | `number` | `300` | Slider width in pixels |
| `height` | `number` | `40` | Slider height in pixels |
| `trackColor` | `string` | `undefined` | Track background color |
| `activeTrackColor` | `string` | `undefined` | Active track color |
| `thumbColor` | `string` | `undefined` | Thumb color |
| `thumbBorderColor` | `string` | `undefined` | Thumb border color |
| `thumbFocusRingColor` | `string` | `undefined` | Focus ring color |
| `thumbBorderWidth` | `number` | `2` | Thumb border width |
| `thumbSize` | `number` | `20` | Thumb size in pixels |
| `thumbFocusRingSize` | `number` | `28` | Focus ring size in pixels |
| `tapToMove` | `boolean` | `true` | Enable tap to move |
| `onRangeChange` | `(min: number, max: number) => void` | `undefined` | Range change callback |
| `style` | `ViewStyle` | `undefined` | Container styles |

## 🎨 Theming

### Built-in Themes

```tsx
// Light theme (default)
<Slider theme="light" />

// Dark theme
<Slider theme="dark" />
```

### Theme Colors

| Theme | Track | Active Track | Thumb | Thumb Border | Focus Ring |
|-------|-------|--------------|-------|--------------|------------|
| Light | `#F5F5F5` | `#171717` | `#FFFFFF` | `#171717` | `#D0D0D0` |
| Dark | `#262626` | `#E5E5E5` | `#0A0A0A` | `#E5E5E5` | `#3F3F3F` |

### Custom Colors

Any theme color can be overridden:

```tsx
<Slider
  theme="dark"
  thumbColor="#FF6B6B"
  activeTrackColor="#FF6B6B"
  thumbFocusRingColor="#FFD6D6"
/>
```

## ⚡ Performance

No promises right now 🤞.

## 🤝 Contributing

We welcome contributions!

### Development Setup

1. Clone the repository
2. Install dependencies: `bun install`
3. Run the demo: `cd apps/demo && bun start`

### Running Tests

```bash
bun test
```

## 📄 License

MIT © [TouchTech Club](LICENSE)

## 🔗 Links

- [GitHub Repository](https://github.com/touchtechclub/react-native-range-slider)
- [Issue Tracker](https://github.com/touchtechclub/react-native-range-slider/issues)
- [NPM Package](https://www.npmjs.com/package/@touchtech/react-native-range-slider)

---

Made with ❤️ by [TouchTech Club](https://github.com/touchtechclub)
