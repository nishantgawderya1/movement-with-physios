# Figma_UI_Implementation_Guide.md
## Movement With Physios — Expo SDK 54
## Splash Screen + Login/Signup Screen

> **For GitHub Copilot:** Read this entire file before writing a single line of code.
> Follow every phase in order. Do not skip. Do not modify anything not listed here.
> All design values in this document are extracted directly from the Figma screenshots.

---

## WHO YOU ARE

You are a senior React Native + Expo engineer making safe, targeted UI updates
to an existing working app. The navigation, backend hooks, and app structure are
already built. You are ONLY updating the visual UI of two screens to match the Figma design.

---

## ABSOLUTE RULES — NEVER BREAK THESE

- Do NOT change Expo SDK version. Must stay at SDK 54.
- Do NOT install unnecessary packages.
- Do NOT refactor working components outside the two screens.
- Do NOT break navigation. `navigation.replace('Login')` stays intact.
- Do NOT change backend logic, hooks, or service files.
- Do NOT touch `src/hooks/`, `src/services/`, `src/navigation/`.
- ONLY update: `SplashScreen.jsx`, `LoginScreen.jsx`, `src/constants/colors.js`, and add logo asset.

---

## 1. DESIGN OVERVIEW

### What Was Designed in Figma

Two screens were provided:

**Screen 1 — Splash Screen**
- Pure white background
- Brand logo centered on screen (actual image asset, not text)
- Logo contains: "movement with" in light gray lowercase + "PHYS|OS" in dark teal bold uppercase
- A thin horizontal ECG/heartbeat line runs beneath the text with a heartbeat spike in the center
- No other elements — extremely minimal and clean

**Screen 2 — Login/Signup Screen (Welcome Screen)**
- Near-white background (#F7FAFC)
- Large bold heading: "Welcome !!"
- Subtitle paragraph in gray
- Three feature highlight rows (icon + title + description), each in a lightly bordered card
- Two CTA buttons at the bottom:
  - "Start My Recovery" → filled, dark teal, pill shape
  - "Login" → outlined, white background, dark teal border, pill shape

---

## 2. EXTRACTED DESIGN SYSTEM

### 2.1 Color Palette

```js
// src/constants/colors.js — REPLACE existing contents with this

export const colors = {
  // Brand
  primary: '#1A5C4A',          // Dark teal green — buttons, logo text, icons
  primaryLight: '#E8F5F0',     // Very light teal — card hover/bg tint
  
  // Backgrounds
  background: '#F7FAFC',       // Confirmed from Figma color panel — screen bg
  white: '#FFFFFF',            // Splash screen bg, card bg
  
  // Text
  textDark: '#1A202C',         // Headings — near black
  textMedium: '#4A5568',       // Body text — dark gray
  textLight: '#718096',        // Subtitles, descriptions — medium gray
  textLogoGray: '#9CA3AF',     // "movement with" text in logo — light gray
  
  // UI
  cardBorder: '#E2E8F0',       // Feature card borders — light gray
  inputBorder: '#CBD5E0',      // Input field borders
  inputBg: '#FFFFFF',          // Input backgrounds
  error: '#E53E3E',            // Error states
  
  // Buttons
  buttonPrimary: '#1A5C4A',    // "Start My Recovery" fill
  buttonPrimaryText: '#FFFFFF',
  buttonOutlineBorder: '#1A5C4A', // "Login" button border
  buttonOutlineText: '#1A5C4A',
};
```

### 2.2 Typography

```js
// src/constants/fonts.js — REPLACE or CREATE

export const fonts = {
  // Sizes
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 26,
  xxxl: 32,

  // Weights
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
};
```

### 2.3 Spacing System

```
Horizontal screen padding:  24px
Card padding:               16px horizontal, 14px vertical
Gap between feature cards:  12px
Gap between sections:       24px
Button height:              52px
Button border radius:       30px (full pill)
Card border radius:         12px
Logo container size:        centered, ~220px wide
```

### 2.4 UI Components Identified

| Component | Screen | Description |
|---|---|---|
| Logo Image | Splash | PNG asset, centered on white screen |
| Welcome Heading | Login | "Welcome !!" bold, xxl, dark |
| Subtitle Text | Login | 2-line gray paragraph, centered |
| Feature Card | Login | Row with icon + title + description, bordered |
| Primary Button | Login | Filled teal pill, "Start My Recovery" |
| Outline Button | Login | White bg teal border pill, "Login" |

---

## 3. LOGO ASSET SETUP

### Step 3.1 — Save the Logo

The logo is an image asset — not text or icons generated in code.
Save the provided logo PNG file as:

```
assets/images/logo.png
```

If an `images/` folder doesn't exist inside `assets/`, create it.

### Step 3.2 — Logo Description (for reference)
- Top line: "movement with" — lowercase, light gray, regular weight, small size
- Bottom line: "PHYS|OS" — all caps, dark teal (#1A5C4A), bold, large size
- The "|" between PHYS and OS is an ECG heartbeat graphic (part of the image)
- A thin horizontal line runs underneath with a heartbeat spike in the center
- White background, no shadow, no border

---

## 4. SPLASH SCREEN IMPLEMENTATION

### Target: `src/screens/splash/SplashScreen.jsx`
### Change type: FULL REPLACEMENT of existing file

**Design spec from Figma:**
- Background: pure white `#FFFFFF`
- Logo image: centered horizontally and vertically
- Logo width: 75% of screen width (responsive)
- No other text, no spinner visible upfront
- Subtle fade-in animation on logo
- Small activity indicator appears after logo fades in, at bottom
- Smooth fade-out before navigating to Login

```jsx
// src/screens/splash/SplashScreen.jsx
// ─────────────────────────────────────────────────────────────────────────────
// FIGMA REFERENCE: Screen 1 — Splash Screen
// Design: Pure white background, centered logo image, fade animation
// DO NOT add text — the logo image already contains all branding text
// DO NOT change navigation target — must stay navigation.replace('Login')
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../../constants/colors';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const logoOpacity   = useRef(new Animated.Value(0)).current;
  const logoScale     = useRef(new Animated.Value(0.92)).current;
  const spinnerOpacity = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Step 1: Logo fades in with gentle scale (healthcare-appropriate, not flashy)
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 8,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Step 2: Spinner fades in subtly after logo appears
      Animated.timing(spinnerOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    // Step 3: After 2800ms, fade out entire screen then navigate
    const timer = setTimeout(() => {
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace('Login'); // DO NOT change this
      });
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: screenOpacity }]}>
      
      {/* ── Brand Logo Image ─────────────────────────────────────────── */}
      {/* Uses actual logo PNG from assets — contains all branding text  */}
      <Animated.View
        style={[
          styles.logoWrapper,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      {/* ── Loading Indicator ─────────────────────────────────────────── */}
      <Animated.View style={[styles.spinnerWrapper, { opacity: spinnerOpacity }]}>
        <ActivityIndicator size="small" color={colors.primary} />
      </Animated.View>

    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,        // Figma: pure white splash bg
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    width: width * 0.75,                   // Figma: logo takes ~75% screen width
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.6,                      // Matches logo proportions from Figma
  },
  spinnerWrapper: {
    position: 'absolute',
    bottom: 72,
  },
});

export default SplashScreen;
```

---

## 5. LOGIN / SIGNUP SCREEN IMPLEMENTATION

### Target: `src/screens/auth/LoginScreen.jsx`
### Change type: FULL REPLACEMENT of existing file

**Design spec from Figma:**
- This screen is a Welcome/Onboarding screen first, then Login
- Background: `#F7FAFC`
- Heading: "Welcome !!" — large, bold, dark, centered
- Subtitle: 2-line description in gray, centered
- 3 feature cards: each with an icon, a bold title, and a description line
- CTA 1: "Start My Recovery" — filled dark teal pill button
- CTA 2: "Login" — outlined pill button (same width as CTA 1)

```jsx
// src/screens/auth/LoginScreen.jsx
// ─────────────────────────────────────────────────────────────────────────────
// FIGMA REFERENCE: Screen 2 — Login/Signup Screen
// Design: Welcome screen with feature highlights + two CTA buttons
// "Start My Recovery" navigates to Register (placeholder)
// "Login" navigates to the actual login form (placeholder — backend connects here)
// DO NOT modify navigation targets — backend developer will wire these up
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

const { width } = Dimensions.get('window');

// ── Feature card data ────────────────────────────────────────────────────────
// Matches the 3 rows shown in Figma exactly
const FEATURES = [
  {
    id: '1',
    icon: '📍',
    title: 'Made for India',
    description: 'Designed for Indian healthcare needs',
  },
  {
    id: '2',
    icon: '🧑‍⚕️',
    title: 'Therapist Supervised',
    description: 'Licensed professionals monitor your progress',
  },
  {
    id: '3',
    icon: '🛡️',
    title: 'Secure & Encrypted',
    description: 'Only you can access your medical information',
  },
];

// ── Feature Card Component ───────────────────────────────────────────────────
const FeatureCard = ({ icon, title, description }) => (
  <View style={styles.featureCard}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <View style={styles.featureText}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDesc}>{description}</Text>
    </View>
  </View>
);

// ── Main Screen ──────────────────────────────────────────────────────────────
const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >

        {/* ── Heading ──────────────────────────────────────────────── */}
        <Text style={styles.heading}>Welcome !!</Text>

        {/* ── Subtitle ─────────────────────────────────────────────── */}
        <Text style={styles.subtitle}>
          Professional physiotherapy guidance,{'\n'}
          powered by AI, in the comfort of your home
        </Text>

        {/* ── Feature Cards ────────────────────────────────────────── */}
        <View style={styles.featuresWrapper}>
          {FEATURES.map((f) => (
            <FeatureCard
              key={f.id}
              icon={f.icon}
              title={f.title}
              description={f.description}
            />
          ))}
        </View>

        {/* ── CTA Buttons ──────────────────────────────────────────── */}
        <View style={styles.buttonsWrapper}>

          {/* Primary: Start My Recovery */}
          <TouchableOpacity
            style={styles.buttonPrimary}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Register')} // placeholder — backend wires this
          >
            <Text style={styles.buttonPrimaryText}>Start My Recovery</Text>
          </TouchableOpacity>

          {/* Outline: Login */}
          <TouchableOpacity
            style={styles.buttonOutline}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('LoginForm')} // placeholder — backend wires this
          >
            <Text style={styles.buttonOutlineText}>Login</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,   // Figma: #F7FAFC
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,                 // Figma: 24px horizontal padding
    paddingTop: 48,
    paddingBottom: 40,
    alignItems: 'center',
  },

  // ── Heading ─────────────────────────────────────────────────────────────
  heading: {
    fontSize: fonts.xxxl,                  // Figma: large bold heading
    fontWeight: fonts.extrabold,
    color: colors.textDark,
    textAlign: 'center',
    marginBottom: 14,
  },

  // ── Subtitle ────────────────────────────────────────────────────────────
  subtitle: {
    fontSize: fonts.sm,
    fontWeight: fonts.regular,
    color: colors.textLight,              // Figma: gray subtitle
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },

  // ── Feature Cards ───────────────────────────────────────────────────────
  featuresWrapper: {
    width: '100%',
    gap: 12,                              // Figma: ~12px gap between cards
    marginBottom: 36,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.cardBorder,       // Figma: light gray border on cards
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
  },
  featureIcon: {
    fontSize: 22,
    width: 32,
    textAlign: 'center',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: fonts.md,
    fontWeight: fonts.semibold,
    color: colors.textDark,              // Figma: dark title in each card
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: fonts.sm,
    fontWeight: fonts.regular,
    color: colors.textLight,             // Figma: gray description
    lineHeight: 18,
  },

  // ── Buttons ─────────────────────────────────────────────────────────────
  buttonsWrapper: {
    width: '100%',
    gap: 12,
  },
  buttonPrimary: {
    width: '100%',
    height: 52,                          // Figma: pill button height
    backgroundColor: colors.buttonPrimary, // Figma: dark teal filled
    borderRadius: 30,                    // Figma: full pill shape
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPrimaryText: {
    fontSize: fonts.md,
    fontWeight: fonts.bold,
    color: colors.buttonPrimaryText,    // White text on filled button
    letterSpacing: 0.3,
  },
  buttonOutline: {
    width: '100%',
    height: 52,
    backgroundColor: colors.white,
    borderRadius: 30,                    // Figma: full pill shape
    borderWidth: 1.5,
    borderColor: colors.buttonOutlineBorder, // Figma: teal border
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOutlineText: {
    fontSize: fonts.md,
    fontWeight: fonts.semibold,
    color: colors.buttonOutlineText,    // Teal text on outline button
    letterSpacing: 0.3,
  },
});

export default LoginScreen;
```

---

## 6. FILES TO CREATE / MODIFY / LEAVE UNTOUCHED

### ✅ Files to CREATE (new)
```
assets/images/logo.png              ← Save the provided logo PNG here
src/constants/fonts.js              ← Create if it doesn't exist
```

### ✏️ Files to MODIFY (targeted changes only)
```
src/screens/splash/SplashScreen.jsx    ← Full replacement with Figma design
src/screens/auth/LoginScreen.jsx       ← Full replacement with Figma design
src/constants/colors.js                ← Replace with updated palette above
```

### 🚫 Files to LEAVE COMPLETELY UNTOUCHED
```
App.js
src/navigation/AppNavigator.jsx
src/navigation/AuthNavigator.jsx
src/screens/auth/ForgotPasswordScreen.jsx
src/screens/auth/RegisterScreen.jsx
src/hooks/useLoginForm.js
src/services/auth/AuthService.js
src/services/auth/tokenStorage.js
src/utils/validators.js
package.json
```

---

## 7. COMPLETE FILE STRUCTURE AFTER IMPLEMENTATION

```
MovementWithPhysios/
├── assets/
│   └── images/
│       └── logo.png                  ← NEW — brand logo image asset
├── src/
│   ├── components/                   ← UNTOUCHED
│   ├── constants/
│   │   ├── colors.js                 ← UPDATED — Figma color palette
│   │   ├── fonts.js                  ← UPDATED/CREATED — typography scale
│   │   └── strings.js                ← UNTOUCHED
│   ├── hooks/                        ← UNTOUCHED
│   ├── navigation/                   ← UNTOUCHED
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.jsx       ← UPDATED — Figma Welcome UI
│   │   │   ├── ForgotPasswordScreen  ← UNTOUCHED
│   │   │   └── RegisterScreen        ← UNTOUCHED
│   │   └── splash/
│   │       └── SplashScreen.jsx      ← UPDATED — Figma logo image UI
│   ├── services/                     ← UNTOUCHED
│   └── utils/                        ← UNTOUCHED
└── App.js                            ← UNTOUCHED
```

---

## 8. ANIMATION STRATEGY

### Splash Screen Animation (healthcare-appropriate, calm)

| Step | What happens | Duration |
|---|---|---|
| 0ms | Screen appears, logo invisible | — |
| 0–700ms | Logo fades in + gently scales from 0.92→1.0 | 700ms |
| 700–1000ms | Activity spinner fades in below | 300ms |
| 2800ms | Entire screen fades out | 400ms |
| 3200ms | `navigation.replace('Login')` fires | instant |

**Total user experience:** ~3 seconds, smooth and calm.

All animations use `useNativeDriver: true` for 60fps performance.
No external animation libraries required.

---

## 9. NAVIGATION FLOW

```
App Opens
    ↓
SplashScreen (white bg, logo image, fade animation)
    ↓  navigation.replace('Login')  [after 2.8s]
LoginScreen (Welcome UI with features + 2 buttons)
    ↓  "Start My Recovery"           ↓  "Login"
RegisterScreen (stub)           LoginForm (stub — backend wires actual login)
```

`navigation.replace` is used on splash so back button never returns to splash.

---

## 10. PRE-IMPLEMENTATION SAFETY CHECKLIST

Before writing any code, verify all of these:

- [ ] `package.json` shows `"expo": "~54.0.0"` — do not upgrade
- [ ] `assets/images/` folder exists or is created before referencing logo
- [ ] `logo.png` is physically placed in `assets/images/` before running app
- [ ] `src/constants/colors.js` exists and is writable
- [ ] No navigation file will be modified
- [ ] No hook or service file will be modified
- [ ] No new npm packages are installed

---

## 11. POST-IMPLEMENTATION VERIFICATION CHECKLIST

After completing all changes, verify each item:

- [ ] App launches and shows SplashScreen immediately
- [ ] Splash background is pure white (not gray or blue)
- [ ] Logo image loads and displays correctly from `assets/images/logo.png`
- [ ] Logo fade + scale animation plays smoothly
- [ ] Activity spinner appears after logo fades in
- [ ] After ~3 seconds, screen fades out and LoginScreen appears
- [ ] LoginScreen shows "Welcome !!" heading
- [ ] Subtitle text is gray and centered
- [ ] All 3 feature cards display with icon, title, and description
- [ ] Feature cards have light gray borders and white backgrounds
- [ ] "Start My Recovery" button is filled dark teal with white text
- [ ] "Login" button is outlined with teal border and teal text
- [ ] Both buttons are pill-shaped (fully rounded)
- [ ] Background of LoginScreen is #F7FAFC (very light blue-gray), not white
- [ ] No console errors or warnings
- [ ] Back button on LoginScreen does NOT go back to Splash
- [ ] ForgotPassword and Register screens still work (untouched)
- [ ] Expo SDK version is still 54 in package.json

---

## 12. TROUBLESHOOTING

### Logo image not showing
```
Check: assets/images/logo.png exists
Check: require('../../../assets/images/logo.png') path is correct relative to SplashScreen.jsx
Fix: Count the folder levels — SplashScreen.jsx is 3 levels deep from root
```

### Colors.textDark or colors.textLogoGray not found
```
Check: colors.js was fully replaced with the palette in Section 2.1
Fix: Copy the entire colors object from Section 2.1 above
```

### Gap property not working on React Native < 0.71
```
Fix: Replace gap: 12 with marginBottom: 12 on each feature card
Fix: Replace gap: 12 in buttonsWrapper with marginTop: 12 on second button
```

### White screen after splash
```
Check: navigation.replace('Login') matches the screen name in AuthNavigator exactly
Note: Screen names are case-sensitive
```
