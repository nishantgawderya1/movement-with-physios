import { View, Text, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView }
  from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";
 
export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.PRIMARY}
      />
      <View style={styles.content}>
        <Text style={styles.title}>
          Movement with Physios
        </Text>
        <Text style={styles.subtitle}>
          Therapist App – Installed
        </Text>
      </View>
    </SafeAreaView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.WHITE,
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
  },
});
