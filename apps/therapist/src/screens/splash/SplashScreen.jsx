// src/screens/splash/SplashScreen.jsx
// ─────────────────────────────────────────────────────────────────────────────
// SplashScreen — shown once on app launch before navigating to Login.
// Uses ONLY React Native's built-in Animated API. No external libraries.
// Do not modify the navigation call at the bottom — it must go to 'Login'.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { colors } from '../../constants/colors';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  // ── Animation values ──────────────────────────────────────────────────────
  const logoOpacity    = useRef(new Animated.Value(0)).current;
  const logoScale      = useRef(new Animated.Value(0.85)).current;
  const titleOpacity   = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const screenOpacity  = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // ── Step 1: Logo fades in + scales up ─────────────────────────────────
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 6,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start(() => {

      // ── Step 2: App name fades in ────────────────────────────────────────
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {

        // ── Step 3: Tagline fades in ───────────────────────────────────────
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      });
    });

    // ── Step 4: After 2800ms, fade out and navigate ────────────────────────
    const timer = setTimeout(() => {
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        // ── NAVIGATION — Do not change 'Login' target ──────────────────────
        navigation.replace('Login');
      });
    }, 2800);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>

      {/* ── Logo Circle ───────────────────────────────────────────────── */}
      <Animated.View
        style={[
          styles.logoWrapper,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        <View style={styles.logo}>
          <Text style={styles.logoInitials}>MWP</Text>
        </View>
      </Animated.View>

      {/* ── App Name ──────────────────────────────────────────────────── */}
      <Animated.Text style={[styles.appName, { opacity: titleOpacity }]}>
        Movement With Physios
      </Animated.Text>

      {/* ── Tagline ───────────────────────────────────────────────────── */}
      <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
        Your recovery, guided by experts
      </Animated.Text>

      {/* ── Loading Spinner ───────────────────────────────────────────── */}
      <View style={styles.spinnerWrapper}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>

    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoWrapper: {
    marginBottom: 28,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 26,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  logoInitials: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 1,
  },
  appName: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  tagline: {
    fontSize: 14,
    color: colors.subtext,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  spinnerWrapper: {
    position: 'absolute',
    bottom: 80,
  },
});

export default SplashScreen;
