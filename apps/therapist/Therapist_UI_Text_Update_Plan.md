# Therapist_UI_Text_Update_Plan.md
## Movement With Physios — Expo SDK 54
## Minimal UI Text & Font Update Plan

> **For GitHub Copilot:** Read this entire file before touching any code.
> This is a TEXT AND FONT UPDATE ONLY. Do not change layouts, colors, spacing,
> navigation, or any file not listed in Section 8. Follow every phase in order.

---

## WHO YOU ARE

You are making the smallest possible targeted changes to three screens.
The app is working. Navigation is working. Layout is working.
You are ONLY updating text strings, loading one font, and adding one new screen.
Treat every existing line of code as untouchable unless this document
explicitly tells you to change it.

---

## ABSOLUTE RULES

- Do NOT change Expo SDK version. Must stay SDK 54.
- Do NOT install any new package UNLESS this document explicitly names one.
- Do NOT change navigation files beyond the one line addition listed below.
- Do NOT change layouts, colors, spacing, padding, or border styles.
- Do NOT refactor any component.
- Do NOT touch any file not listed in Section 8.
- ONLY change what is explicitly listed in this document, nothing more.

---

## 1. DESIGN SCREENSHOT ANALYSIS

Three screens were identified in the Figma screenshot:

---

### Screen 1 — Splash Screen
- Logo image centered — unchanged, stays as-is
- NEW text below logo: **"Doctor's App"**
- Font: **Instrument Serif, italic**
- Size: small, 16px, gray, centered
- Placement: directly below the logo image

---

### Screen 2 — Login / Signup (Welcome Screen)
Changes from previous implementation:

| Element | Old Text | New Text |
|---|---|---|
| Subtitle | "Professional physiotherapy guidance, powered by AI..." | "Scale Your Practice Without Compromising Care. Extend Your Clinic Beyond Walls" |
| Feature 1 description | "Designed for Indian healthcare needs" | "Your Digital Physiotherapy Assistant." |
| Feature 2 title | "Therapist Supervised" | "Scale Fast beyond your Clinic" |
| Feature 2 description | "Licensed professionals monitor your progress" | "Monitor More Patients. Maintain Clinical Control." |
| Feature 3 description | "Only you can access your medical information" | "Only you can access patient's medical information" |
| Primary button | "Start My Recovery" | "Activate My Clinic" |

Unchanged: "Welcome !!" heading, "Made for India" title, "Secure & Encrypted" title, "Login" button text, all styles.

---

### Screen 3 — Therapist Portal (NEW SCREEN)
This screen does not exist yet. It must be created as a new file.

Elements from Figma:
- Teal rounded square icon with white ECG/pulse icon inside
- Heading: **"Therapist Portal"** — Instrument Serif font, teal color
- Subheading: "Sign in to manage your clients" — gray, small
- Email Address label + input, placeholder: `doctor@reviveai.com`
- Password label + input with eye toggle, placeholder: `••••••••`
- "Forgot Password?" — right-aligned, teal, tappable
- "Sign In" — filled teal pill button, full width

---

### Font Identified from Screenshot
**Instrument Serif** — confirmed from the font panel screenshot
- Used on Splash: italic for "Doctor's App"
- Used on Therapist Portal: regular for "Therapist Portal" heading

---

## 2. FONT SETUP

### Step 2.1 — Install (ONE allowed package)
```bash
npx expo install @expo-google-fonts/instrument-serif expo-font
```

### Step 2.2 — Load in App.js
This is the ONLY change to App.js. Keep the AppNavigator render exactly as-is.

```jsx
// App.js — full replacement
import React, { useCallback } from 'react';
import { View } from 'react-native';
import {
  useFonts,
  InstrumentSerif_400Regular,
  InstrumentSerif_400Regular_Italic,
} from '@expo-google-fonts/instrument-serif';
import * as SplashScreenExpo from 'expo-splash-screen';
import AppNavigator from './src/navigation/AppNavigator';

SplashScreenExpo.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    InstrumentSerif_400Regular,
    InstrumentSerif_400Regular_Italic,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreenExpo.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AppNavigator />
    </View>
  );
}
```

> If expo-splash-screen conflicts with existing usage, remove the
> preventAutoHideAsync() and hideAsync() lines. Keep the useFonts block.

### Step 2.3 — Add font family constants
Open `src/constants/fonts.js`. ADD these lines at the bottom. Do not replace existing content.

```js
// ADD at the bottom of the existing fonts.js file
export const fontFamilies = {
  instrumentSerif: 'InstrumentSerif_400Regular',
  instrumentSerifItalic: 'InstrumentSerif_400Regular_Italic',
};
```

---

## 3. SPLASH SCREEN UPDATE

### File: `src/screens/splash/SplashScreen.jsx`
### Change type: ADD two things only — one Text element, one style

**Step 1 — Add import for fontFamilies at top of file**
Find the existing imports. Add:
```jsx
import { fontFamilies } from '../../constants/fonts';
```

**Step 2 — Add "Doctor's App" text**
Find the logo `<Image>` element. It looks like this:
```jsx
<Image
  source={require('../../../assets/images/logo.png')}
  style={styles.logo}
  resizeMode="contain"
/>
```

Directly AFTER the closing `/>` of the Image, add:
```jsx
{/* Figma: "Doctor's App" — Instrument Serif italic, below logo */}
<Text style={styles.doctorsAppText}>Doctor's App</Text>
```

Make sure `Text` is imported from react-native at the top (it likely already is).

**Step 3 — Add style**
In the StyleSheet, add:
```js
doctorsAppText: {
  fontFamily: fontFamilies.instrumentSerifItalic,
  fontSize: 16,
  color: '#4A5568',    // textMedium gray — matches Figma italic gray style
  textAlign: 'center',
  marginTop: 10,
  letterSpacing: 0.3,
},
```

**Nothing else in SplashScreen.jsx changes.**

---

## 4. LOGIN SCREEN UPDATE

### File: `src/screens/auth/LoginScreen.jsx`
### Change type: Update 5 text strings and 1 button label — nothing else

**Change 1 — Subtitle text**

Find:
```jsx
"Professional physiotherapy guidance,{'\n'}
powered by AI, in the comfort of your home"
```
Replace with:
```jsx
{"Scale Your Practice Without Compromising\nCare. Extend Your Clinic Beyond Walls"}
```

---

**Change 2 — FEATURES array**

Find the entire FEATURES constant and replace its contents only:
```js
const FEATURES = [
  {
    id: '1',
    icon: '📍',
    title: 'Made for India',
    description: 'Your Digital Physiotherapy Assistant.',
  },
  {
    id: '2',
    icon: '🧑‍⚕️',
    title: 'Scale Fast beyond your Clinic',
    description: 'Monitor More Patients. Maintain Clinical Control.',
  },
  {
    id: '3',
    icon: '🛡️',
    title: 'Secure & Encrypted',
    description: "Only you can access patient's medical information",
  },
];
```

---

**Change 3 — Primary button label**

Find:
```jsx
"Start My Recovery"
```
Replace with:
```jsx
"Activate My Clinic"
```

---

**Change 4 — "Login" button navigation target**

Find the Login outline button's onPress. Change it to navigate to TherapistPortal:
```jsx
onPress={() => navigation.navigate('TherapistPortal')}
```

**All styles, imports, layouts, and other logic in LoginScreen.jsx: UNCHANGED.**

---

## 5. THERAPIST PORTAL SCREEN — NEW FILE

### File: `src/screens/auth/TherapistPortalScreen.jsx`
### Change type: CREATE new file

```jsx
// src/screens/auth/TherapistPortalScreen.jsx
// ─────────────────────────────────────────────────────────────────────────────
// FIGMA REFERENCE: iPhone 17-1 — Therapist Portal Screen
// This is a NEW screen — does not replace or modify LoginScreen
// Backend developer: only replace the handleSignIn mock function below
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { fonts, fontFamilies } from '../../constants/fonts';

const TherapistPortalScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // ── MOCK — Backend developer: replace this block only ────────────────────
  const handleSignIn = () => {
    console.log('[MOCK] Sign In — Email:', email);
    // TODO: import AuthService and call AuthService.login(email, password)
    // TODO: on success → navigate to Dashboard
    // TODO: on failure → show error message
  };
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          {/* ── App Icon ─────────────────────────────────────────────── */}
          {/* Figma: teal rounded square with white pulse/ECG icon        */}
          <View style={styles.iconBox}>
            <Ionicons name="pulse" size={34} color={colors.white} />
          </View>

          {/* ── Heading ─────────────────────────────────────────────── */}
          {/* Figma: Instrument Serif font, teal color                   */}
          <Text style={styles.heading}>Therapist Portal</Text>
          <Text style={styles.subheading}>Sign in to manage your clients</Text>

          {/* ── Form Card ────────────────────────────────────────────── */}
          <View style={styles.card}>

            {/* Email Address */}
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="doctor@reviveai.com"
                placeholderTextColor={colors.textLight}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password */}
            <Text style={[styles.label, styles.labelGap]}>Password</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor={colors.textLight}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(prev => !prev)}
                style={styles.eyeBtn}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={colors.textLight}
                />
              </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              style={styles.forgotRow}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

          </View>

          {/* ── Sign In Button ────────────────────────────────────────── */}
          <TouchableOpacity
            style={styles.signInBtn}
            activeOpacity={0.85}
            onPress={handleSignIn}
          >
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 52,
    paddingBottom: 40,
    alignItems: 'center',
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  heading: {
    fontFamily: fontFamilies.instrumentSerif,   // Figma: Instrument Serif
    fontSize: 26,
    color: colors.primary,                       // Figma: teal heading
    textAlign: 'center',
    marginBottom: 6,
  },
  subheading: {
    fontSize: fonts.sm,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 32,
  },
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: fonts.sm,
    fontWeight: fonts.semibold,
    color: colors.textDark,
    marginBottom: 6,
  },
  labelGap: { marginTop: 16 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: fonts.md,
    color: colors.textDark,
  },
  eyeBtn: { padding: 4 },
  forgotRow: {
    alignSelf: 'flex-end',
    marginTop: 12,
  },
  forgotText: {
    fontSize: fonts.sm,
    color: colors.primary,
    fontWeight: fonts.semibold,
  },
  signInBtn: {
    width: '100%',
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontSize: fonts.md,
    fontWeight: fonts.bold,
    color: colors.white,
    letterSpacing: 0.3,
  },
});

export default TherapistPortalScreen;
```

---

## 6. NAVIGATION UPDATE

### File: `src/navigation/AuthNavigator.jsx`
### Change: ADD 1 import line + 1 Stack.Screen line only

**Add import** (with existing imports at top):
```jsx
import TherapistPortalScreen from '../screens/auth/TherapistPortalScreen';
```

**Add screen** (inside `<Stack.Navigator>`, after existing screens):
```jsx
<Stack.Screen name="TherapistPortal" component={TherapistPortalScreen} />
```

**Nothing else in AuthNavigator.jsx changes.**

---

## 7. IMPLEMENTATION ORDER — FOLLOW EXACTLY

```
1. Run:  npx expo install @expo-google-fonts/instrument-serif expo-font
2. Edit: App.js — add useFonts loader (keep AppNavigator render)
3. Edit: src/constants/fonts.js — add fontFamilies object at the bottom
4. Edit: src/screens/splash/SplashScreen.jsx — add "Doctor's App" text + style
5. Edit: src/screens/auth/LoginScreen.jsx — update 5 strings + 1 button
6. Create: src/screens/auth/TherapistPortalScreen.jsx — full new file
7. Edit: src/navigation/AuthNavigator.jsx — add 1 import + 1 screen
8. Run app and verify all three screens match this document
```

---

## 8. FILE MODIFICATION SUMMARY

### ✅ CREATE (new files)
```
src/screens/auth/TherapistPortalScreen.jsx
```

### ✏️ MODIFY (targeted changes only)
```
App.js                                         → ADD font loading
src/constants/fonts.js                         → ADD fontFamilies object
src/screens/splash/SplashScreen.jsx            → ADD "Doctor's App" text
src/screens/auth/LoginScreen.jsx               → CHANGE 5 strings + 1 nav target
src/navigation/AuthNavigator.jsx               → ADD 1 import + 1 screen
```

### 🚫 DO NOT TOUCH
```
src/navigation/AppNavigator.jsx
src/screens/auth/ForgotPasswordScreen.jsx
src/screens/auth/RegisterScreen.jsx
src/hooks/useLoginForm.js
src/services/auth/AuthService.js
src/services/auth/tokenStorage.js
src/utils/validators.js
src/constants/colors.js
src/components/InputField.jsx
src/components/AppButton.jsx
assets/images/logo.png
```

---

## 9. PRE-IMPLEMENTATION CHECKLIST

- [ ] `package.json` shows `"expo": "~54.0.0"` — confirm before anything
- [ ] `src/constants/colors.js` has: `primary`, `textLight`, `textDark`, `textMedium`, `white`, `inputBorder`, `background`
- [ ] `src/constants/fonts.js` exists
- [ ] `src/screens/splash/SplashScreen.jsx` exists
- [ ] `src/screens/auth/LoginScreen.jsx` exists
- [ ] `src/navigation/AuthNavigator.jsx` exists
- [ ] No file named `TherapistPortalScreen.jsx` already exists

---

## 10. POST-IMPLEMENTATION CHECKLIST

- [ ] Splash shows logo image as before — unchanged
- [ ] "Doctor's App" appears below logo in italic serif font
- [ ] "Doctor's App" is NOT using a system font — Instrument Serif loaded correctly
- [ ] Login subtitle reads "Scale Your Practice Without Compromising Care..."
- [ ] Feature 2 title reads "Scale Fast beyond your Clinic"
- [ ] Primary button reads "Activate My Clinic"
- [ ] "Login" button navigates to TherapistPortalScreen
- [ ] Therapist Portal shows teal icon with pulse icon inside
- [ ] "Therapist Portal" heading uses Instrument Serif, teal color
- [ ] Email placeholder shows "doctor@reviveai.com"
- [ ] Eye icon toggles password visibility correctly
- [ ] "Forgot Password?" is right-aligned
- [ ] "Sign In" button is filled teal pill, full width
- [ ] No layout shifts on any screen
- [ ] No console errors
- [ ] Expo SDK still 54 in package.json

---

## 11. TROUBLESHOOTING

**Font shows as system default:**
```
Verify: useFonts() is called before AppNavigator renders in App.js
Verify: fontFamily string exactly matches 'InstrumentSerif_400Regular_Italic'
Check:  console.log(fontsLoaded) — must be true before screens render
```

**"Doctor's App" not visible on splash:**
```
Check: Text element is inside the Animated.View logoWrapper
Check: fontFamilies import exists at top of SplashScreen.jsx
```

**TherapistPortal screen not found:**
```
Check: Screen name in Stack.Screen is exactly 'TherapistPortal' (case-sensitive)
Check: LoginScreen "Login" button uses navigation.navigate('TherapistPortal')
```

**Ionicons not found:**
```
Check: @expo/vector-icons is already in package.json (it ships with Expo SDK 54)
Do NOT install it separately
```
