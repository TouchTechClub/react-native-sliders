import { View, Text, useColorScheme } from "react-native";

export default function Home() {
  const colorScheme = useColorScheme();
  return (
    <View>
      <Text style={{ color: colorScheme === "dark" ? "white" : "black" }}>
        Home
      </Text>
    </View>
  );
}
