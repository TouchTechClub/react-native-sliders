import React, { useState } from "react";
import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Slider, RangeSlider } from "@touchtech/react-native-range-slider";

export default function Home() {
  const colorScheme = useColorScheme();
  const [basicValue, setBasicValue] = useState(25);
  const [stepValue, setStepValue] = useState(50);
  const [customValue, setCustomValue] = useState(0);
  const [precisionValue, setPrecisionValue] = useState(0.5);
  const [rangeValue, setRangeValue] = useState<[number, number]>([20, 80]);
  const [stepRangeValue, setStepRangeValue] = useState<[number, number]>([
    10, 90,
  ]);
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 200]);

  const textColor = colorScheme === "dark" ? "white" : "black";
  const backgroundColor = colorScheme === "dark" ? "#000" : "#fff";

  return (
    <ScrollView
      style={[styles.container, { backgroundColor }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.title, { color: textColor }]}>
        React Native Slider Demo
      </Text>
      <Text style={[styles.subtitle, { color: textColor }]}>
        Single Value & Range Sliders
      </Text>

      {/* Single Value Sliders */}
      <View style={styles.categorySection}>
        <Text style={[styles.categoryTitle, { color: textColor }]}>
          📊 Single Value Sliders
        </Text>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Basic Slider
          </Text>
          <Text style={[styles.value, { color: textColor }]}>
            Value: {basicValue.toFixed(0)}
          </Text>
          <Slider
            min={0}
            max={100}
            initialValue={25}
            onValueChange={setBasicValue}
            style={styles.slider}
            theme="dark"
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Step Slider (step: 10)
          </Text>
          <Text style={[styles.value, { color: textColor }]}>
            Value: {stepValue.toFixed(0)}
          </Text>
          <Slider
            min={0}
            max={100}
            initialValue={50}
            step={10}
            onValueChange={setStepValue}
            activeTrackColor="#FF6B6B"
            thumbColor="#FF6B6B"
            style={styles.slider}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Custom Range (-50 to 50)
          </Text>
          <Text style={[styles.value, { color: textColor }]}>
            Value: {customValue.toFixed(0)}
          </Text>
          <Slider
            min={-50}
            max={50}
            initialValue={0}
            onValueChange={setCustomValue}
            activeTrackColor="#4ECDC4"
            thumbColor="#4ECDC4"
            trackColor="#E0E0E0"
            style={styles.slider}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Precision Slider (0.1 steps)
          </Text>
          <Text style={[styles.value, { color: textColor }]}>
            Value: {precisionValue.toFixed(1)}
          </Text>
          <Slider
            min={0}
            max={5}
            initialValue={0.5}
            step={0.1}
            onValueChange={setPrecisionValue}
            activeTrackColor="#8E44AD"
            thumbColor="#9B59B6"
            width={280}
            thumbSize={26}
            style={styles.slider}
          />
        </View>
      </View>

      {/* Range Sliders */}
      <View style={styles.categorySection}>
        <Text style={[styles.categoryTitle, { color: textColor }]}>
          📏 Range Sliders
        </Text>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Basic Range Slider
          </Text>
          <Text style={[styles.value, { color: textColor }]}>
            Range: {rangeValue[0].toFixed(0)} - {rangeValue[1].toFixed(0)}
          </Text>
          <RangeSlider
            min={0}
            max={100}
            initialMin={20}
            initialMax={80}
            onRangeChange={(min, max) => setRangeValue([min, max])}
            activeTrackColor="#E74C3C"
            thumbColor="#C0392B"
            style={styles.slider}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Range with Steps (step: 5)
          </Text>
          <Text style={[styles.value, { color: textColor }]}>
            Range: {stepRangeValue[0].toFixed(0)} -{" "}
            {stepRangeValue[1].toFixed(0)}
          </Text>
          <RangeSlider
            min={0}
            max={100}
            step={5}
            initialMin={10}
            initialMax={90}
            onRangeChange={(min, max) => setStepRangeValue([min, max])}
            activeTrackColor="#F39C12"
            thumbColor="#E67E22"
            width={280}
            thumbSize={28}
            style={styles.slider}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Price Range Filter
          </Text>
          <Text style={[styles.value, { color: textColor }]}>
            ${priceRange[0].toFixed(0)} - ${priceRange[1].toFixed(0)}
          </Text>
          <RangeSlider
            min={0}
            max={500}
            step={10}
            initialMin={50}
            initialMax={200}
            onRangeChange={(min, max) => setPriceRange([min, max])}
            activeTrackColor="#27AE60"
            thumbColor="#229954"
            trackColor="#BDC3C7"
            width={300}
            thumbSize={24}
            style={styles.slider}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: textColor }]}>
          🎯 Built with React Native Reanimated & Gesture Handler
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 30,
    textAlign: "center",
  },
  categorySection: {
    width: "100%",
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 30,
    alignItems: "center",
    width: "100%",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
    fontFamily: "monospace",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 8,
    overflow: "hidden",
  },
  slider: {
    marginVertical: 10,
  },
  footer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
    width: "100%",
  },
  footerText: {
    fontSize: 14,
    textAlign: "center",
    opacity: 0.6,
  },
});
