# Splash Screen Implementation Guide
## Movement With Physios — Expo SDK 54

> **For GitHub Copilot:** Read this entire file before writing a single line of code.
> Follow every phase in order. Do not skip steps. Do not modify anything not listed here.

---

## WHO YOU ARE

You are a senior React Native + Expo engineer making a **safe, minimal, targeted change**
to an existing working app. Your only job is to add a splash screen before the Login Screen.
The app currently opens directly to the Login Screen. You are adding one screen before it.

---

## ABSOLUTE RULES — READ BEFORE ANYTHING

- Do NOT change Expo SDK version. It must stay at SDK 54.
- Do NOT modify any existing component, screen, hook, or utility file.
- Do NOT change the theme, colors, or styling system.
- Do NOT install any animation library. Use React Native's built-in `Animated` API only.
- Do NOT refactor working code. If it works, leave it alone.
- Do NOT delete any file.
- Do NOT break existing navigation.
- ONLY create new files and make the ONE targeted edit to navigation described below.

---

## PHASE 1 — ANALYZE THE PROJECT FIRST

Before writing any code, read these files in order:

```
1. App.js                              ← entry point
2. src/navigation/AppNavigator.jsx     ← root navigator
3. src/navigation/AuthNavigator.jsx    ← auth stack
4. src/screens/auth/LoginScreen.jsx    ← current first screen
5. src/constants/colors.js             ← color palette (read only, do not change)
6. package.json                        ← verify expo version is ~54.0.0
```

After reading, confirm these things internally:
- What is the root navigator? (NavigationContainer location)
- What screen loads first? (Should be LoginScreen via AuthNavigator)
- What colors exist? (You will reuse primary and background for splash)
- Is `expo-splash-screen` already installed? (Check package.json)
- Is any animation library already present? (If yes, note it but still use Animated API)

Only proceed to Phase 2 after reading all 6 files.

---

## PHASE 2 — PRE-IMPLEMENTATION SAFETY CHECKLIST

Verify every item before writing any code. If any item fails, stop and report it.

- [ ] `package.json` shows `"expo": "~54.0.0"`
- [ ] `App.js` renders `<AppNavigator />` or `<NavigationContainer>`
- [ ] `AuthNavigator.jsx` exists and has Login as the first screen
- [ ] `src/constants/colors.js` exists and has a `primary` color defined
- [ ] No file named `SplashScreen.jsx` already exists in `src/screens/`
- [ ] No existing import of `SplashScreen` anywhere in the project

---

## PHASE 3 — WHAT YOU WILL CREATE (New Files Only)

```
src/
└── screens/
    └── splash/
        └── SplashScreen.jsx     ← CREATE THIS (new file, new folder)
```

That is the only new file. One file. One new folder.

---

## PHASE 4 — WHAT YOU WILL EDIT (One Change Only)

```
src/navigation/AppNavigator.jsx   ← ADD Splash as the initial route only
```

You will add SplashScreen as the first screen in the navigator.
You will not change anything else in this file.
You will not touch AuthNavigator.jsx.
You will not touch App.js.

---

## PHASE 5 — BUILD THE SPLASH SCREEN

Create `src/screens/splash/SplashScreen.jsx` with exactly this implementation:

### Animation Behavior
- App opens → SplashScreen appears immediately
- Logo fades in + scales up slightly (0.85 → 1.0 scale, 0 → 1 opacity)
- App name text fades in 300ms after logo
- Tagline fades in 300ms after app name
- Loading spinner appears at bottom
- After 2800ms total → fade entire screen out → navigate to Login
- Total visible time: ~2.5 seconds

### Implementation

```jsx
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
    backgroundColor: colors.background,     // reuses existing color — do not hardcode
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
    backgroundColor: colors.primary,        // reuses existing color — do not hardcode
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
    color: colors.text,                     // reuses existing color — do not hardcode
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  tagline: {
    fontSize: 14,
    color: colors.subtext,                  // reuses existing color — do not hardcode
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  spinnerWrapper: {
    position: 'absolute',
    bottom: 80,
  },
});

export default SplashScreen;
```

---

## PHASE 6 — EDIT AppNavigator.jsx (Targeted Change Only)

Open `src/navigation/AppNavigator.jsx`.

Find the import section at the top. Add this import line after the existing screen imports:
```jsx
import SplashScreen from '../screens/splash/SplashScreen';
```

Find the `<Stack.Navigator>` block. It currently looks like this:
```jsx
<Stack.Navigator screenOptions={{ headerShown: false }}>
  <Stack.Screen name="Login" component={LoginScreen} />
  ...
```

Change it to add Splash as the first screen:
```jsx
<Stack.Navigator screenOptions={{ headerShown: false }}>
  <Stack.Screen name="Splash" component={SplashScreen} />
  <Stack.Screen name="Login" component={LoginScreen} />
  ...
```

> **IMPORTANT:** Only add the one Splash line. Do not reorder, remove, or rename
> any other screen. Do not change `screenOptions`. Do not change anything else.

If `AppNavigator.jsx` wraps `AuthNavigator` instead of listing screens directly,
then open `AuthNavigator.jsx` instead and apply the same targeted change there.
Add Splash as the first screen in whichever navigator currently shows Login first.

---

## PHASE 7 — NAVIGATION FLOW VERIFICATION

After the edit, the navigation flow must be:

```
App launches
     ↓
AppNavigator (or AuthNavigator)
     ↓
SplashScreen  ← initial route (new)
     ↓  (after 2.8 seconds, navigation.replace)
LoginScreen   ← unchanged, still works as before
     ↓
ForgotPasswordScreen / RegisterScreen  ← unchanged
```

`navigation.replace('Login')` is used instead of `navigation.navigate('Login')`
so the user cannot press back to return to the splash screen.

---

## PHASE 8 — POST-IMPLEMENTATION CHECKLIST

Verify every item after completing the implementation:

- [ ] `SplashScreen.jsx` exists at `src/screens/splash/SplashScreen.jsx`
- [ ] No existing file was modified except the one targeted navigator file
- [ ] Only one new import line was added to the navigator
- [ ] Only one new `<Stack.Screen>` line was added to the navigator
- [ ] `expo` version in `package.json` still shows `~54.0.0`
- [ ] No new packages were installed
- [ ] App launches and SplashScreen appears first
- [ ] Logo animates in with fade + scale
- [ ] App name and tagline fade in after logo
- [ ] Loading spinner is visible at the bottom
- [ ] App automatically navigates to LoginScreen after ~2.8 seconds
- [ ] LoginScreen works exactly as before
- [ ] ForgotPassword and Register navigation still works
- [ ] No console errors or warnings related to navigation
- [ ] Back button on LoginScreen does NOT go back to SplashScreen

---

## PHASE 9 — IF SOMETHING GOES WRONG

### Problem: `navigation.replace is not a function`
**Fix:** Change to `navigation.reset({ index: 0, routes: [{ name: 'Login' }] })`

### Problem: Colors not found (`colors.text` or `colors.subtext` undefined)
**Fix:** Open `src/constants/colors.js` and check the exact property names.
Update the style references in SplashScreen.jsx to match. Do not add new colors.

### Problem: Splash screen shows but Login screen doesn't appear
**Fix:** Confirm `navigation.replace('Login')` matches the exact screen name
registered in the navigator (`name="Login"`). Names are case-sensitive.

### Problem: App opens to Login directly, Splash never shows
**Fix:** Confirm Splash is the FIRST `<Stack.Screen>` in the navigator, above Login.

### Problem: Animation is jerky or laggy
**Fix:** Confirm all `Animated.timing` and `Animated.spring` calls use
`useNativeDriver: true`. This is already set in the code above.

---

## SUMMARY — TOTAL CHANGES

| Action | File | Type |
|---|---|---|
| CREATE | `src/screens/splash/SplashScreen.jsx` | New file |
| CREATE | `src/screens/splash/` | New folder |
| ADD 1 import line | `src/navigation/AppNavigator.jsx` (or AuthNavigator) | Targeted edit |
| ADD 1 screen line | `src/navigation/AppNavigator.jsx` (or AuthNavigator) | Targeted edit |

**Everything else in the project remains completely untouched.**
