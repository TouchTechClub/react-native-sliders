# React Native Range Slider

A customizable range slider library for React Native with smooth animations (probably) and gesture support.

## 📦 Packages

This monorepo contains the following packages:

### [@touchtech/react-native-range-slider](./packages/range-slider)
A comprehensive slider library featuring both single value and range selection components.

**Features:**
- 🎯 **Single Value & Range Selection** - Two components for different use cases
- 🚀 **High Performance** - No promises right now 🤞
- 👆 **Gesture Support** - Pan and tap gestures with react-native-gesture-handler
- 🎨 **Fully Customizable** - Colors, sizes, themes, and styling options
- 🌓 **Theme Support** - Built-in light and dark themes
- 📐 **Step Values** - Support for discrete value selection
- ♿ **Accessible** - Screen reader support and focus indicators
- 📱 **Cross Platform** - Works on iOS, Android, and Web

## 🚀 Quick Start

### Installation

```bash
npm install @touchtech/react-native-range-slider
```

### Usage

```tsx
import React, { useState } from 'react';
import { Slider, RangeSlider } from '@touchtech/react-native-range-slider';

export default function App() {
  const [value, setValue] = useState(50);
  const [range, setRange] = useState<[number, number]>([20, 80]);

  return (
    <View>
      {/* Single Value Slider */}
      <Slider
        min={0}
        max={100}
        initialValue={value}
        onValueChange={setValue}
        theme="light"
      />

      {/* Range Slider */}
      <RangeSlider
        min={0}
        max={100}
        initialMin={range[0]}
        initialMax={range[1]}
        onRangeChange={(min, max) => setRange([min, max])}
        theme="dark"
      />
    </View>
  );
}
```

## 🎯 Demo App

Try the interactive demo to see all features in action:

```bash
# Clone the repository
git clone https://github.com/touchtechclub/react-native-range-slider.git
cd react-native-range-slider

# Install dependencies
bun install

# Run the demo app
cd apps/demo
bun start

# Or run on specific platforms
bun run ios     # iOS Simulator
bun run android # Android Emulator  
bun run web     # Web browser
```

## 🛠️ Development

This project uses a monorepo structure with the following apps and packages:

```
react-native-range-slider/
├── apps/
│   └── demo/                    # Demo app showcasing the sliders
└── packages/
    └── range-slider/            # Main slider package
        ├── src/
        │   ├── lib/
        │   │   ├── constants.ts # Shared constants and themes
        │   │   └── utils.ts     # Utility functions and hooks
        │   ├── slider.tsx       # Single value slider
        │   ├── range-slider.tsx # Range slider
        │   └── index.ts         # Public exports
        ├── README.md            # Package documentation
        ├── LICENSE              # MIT License
        └── package.json         # Package configuration
```

### Prerequisites

- **Node.js** (v18 or higher)
- **Bun** (recommended) or npm/yarn
- **React Native development environment** set up

### Development Setup

```bash
# Install dependencies for the entire monorepo
bun install

# Build the package
cd packages/range-slider
bun run build

# Watch mode for development
bun run dev

# Run the demo app to test changes
cd ../../apps/demo
bun start
```

### Package Scripts

```bash
# In packages/range-slider/
bun run build        # TypeScript compilation
bun run dev          # Watch mode for development
bun run clean        # Clean build artifacts
bun run pub:beta     # Publish beta version
bun run pub:next     # Publish next version
bun run pub:release  # Publish production version
```

## ⚡ Performance

No promises right now 🤞

## 🎨 Customization

### Built-in Themes

```tsx
// Light theme (default)
<Slider theme="light" />

// Dark theme
<Slider theme="dark" />
```

### Custom Colors

```tsx
<Slider
  theme="dark"
  thumbColor="#FF6B6B"
  activeTrackColor="#FF6B6B"
  trackColor="#F0F0F0"
  thumbBorderColor="#E55555"
  thumbFocusRingColor="#FFD6D6"
/>
```

### Step Values

```tsx
// Discrete steps
<Slider min={0} max={100} step={10} initialValue={50} />

// Precision values
<Slider min={0} max={5} step={0.1} initialValue={2.5} />
```

## 📚 Documentation

- [Package README](./packages/range-slider/README.md) - Complete API documentation
- [Demo App](./apps/demo) - Interactive examples and use cases

## 🤝 Contributing

We welcome contributions!

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test in the demo app
5. Submit a pull request

## 📄 License

MIT © [TouchTech Club](./packages/range-slider/LICENSE)

## 🔗 Links

- [GitHub Repository](https://github.com/touchtechclub/react-native-range-slider)
- [Issue Tracker](https://github.com/touchtechclub/react-native-range-slider/issues)
- [NPM Package](https://www.npmjs.com/package/@touchtech/react-native-range-slider)

---

Made with ❤️ by [TouchTech Club](https://github.com/touchtechclub)
