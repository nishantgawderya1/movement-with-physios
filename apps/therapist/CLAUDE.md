# Claude Code — Autonomous Build Plan
## Project: Movement With Physios — Therapist Login Screen

> Place this file in the ROOT of your React Native project.
> Claude Code reads this automatically on startup and will execute everything on its own.

---

## WHO YOU ARE

You are a senior React Native developer working on a healthcare app called
"Movement With Physios". Your job is to build the Therapist Login Screen —
frontend UI only. No backend, no real authentication, no API calls.

---

## YOUR MISSION

Build a complete, clean, scalable Therapist Login Screen for a React Native app.
Work through every step below in order. Do not skip steps. Do not ask for
confirmation between steps — complete the full build autonomously.

---

## STRICT RULES — READ BEFORE STARTING

- Frontend UI only. Use mock/placeholder functions where auth would go.
- No backend logic, no API calls, no database code.
- Use functional components with hooks only. No class components.
- All components must be reusable and cleanly separated.
- Every file must have comments explaining what it does.
- After creating each file, verify it has no syntax errors before moving on.
- If a library install fails, note it clearly and continue with the next step.

---

## PHASE 1 — INSTALL DEPENDENCIES

Run these commands one at a time. Wait for each to succeed before continuing.

```bash
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install react-native-vector-icons
```

After installing, verify `package.json` contains all three packages.

---

## PHASE 2 — CREATE FOLDER STRUCTURE

Create the following empty folders inside `/src`:

```
src/
├── assets/images/
├── components/
├── screens/auth/
├── navigation/
├── constants/
├── utils/
└── hooks/
```

Run `mkdir -p` commands to create all folders at once.

---

## PHASE 3 — CREATE CONSTANTS (Do in order)

### Step 3.1 — Create `src/constants/colors.js`

```js
// Brand color palette for Movement With Physios
export const colors = {
  primary: '#2A7D9C',
  primaryDark: '#1B5E75',
  background: '#F5F9FC',
  white: '#FFFFFF',
  text: '#1A1A2E',
  subtext: '#6B7280',
  inputBorder: '#D1D5DB',
  inputFocus: '#2A7D9C',
  error: '#EF4444',
  success: '#10B981',
  placeholder: '#9CA3AF',
};
```

### Step 3.2 — Create `src/constants/fonts.js`

```js
// Font size and weight scale
export const fonts = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 26,
  bold: '700',
  semibold: '600',
  regular: '400',
};
```

### Step 3.3 — Create `src/constants/strings.js`

```js
// All display text centralised here for easy editing / localisation
export const strings = {
  login: {
    title: 'Welcome Back',
    subtitle: 'Sign in to your therapist account',
    emailLabel: 'Email Address',
    emailPlaceholder: 'you@example.com',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter your password',
    loginButton: 'Sign In',
    forgotPassword: 'Forgot Password?',
    noAccount: "Don't have an account?",
    register: 'Register',
    logoInitials: 'MWP',
  },
};
```

---

## PHASE 4 — CREATE UTILITIES

### Step 4.1 — Create `src/utils/validators.js`

```js
// Frontend validation rules — no backend involved

export const validateEmail = (email) => {
  if (!email || email.trim() === '') return 'Email is required';
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return 'Enter a valid email address';
  return null; // null means valid
};

export const validatePassword = (password) => {
  if (!password || password.trim() === '') return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
};
```

---

## PHASE 5 — CREATE CUSTOM HOOK

### Step 5.1 — Create `src/hooks/useLoginForm.js`

This hook manages all form state and validation. The `handleLogin` function
is a MOCK — the backend developer will replace it with a real API call later.

```js
import { useState } from 'react';
import { validateEmail, validatePassword } from '../utils/validators';

const useLoginForm = (navigation) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: null, password: null });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    setErrors({ email: emailError, password: passwordError });
    return !emailError && !passwordError;
  };

  // ─────────────────────────────────────────────────────────
  // MOCK LOGIN — Backend developer: replace this block only.
  // Keep everything else in this file as-is.
  // ─────────────────────────────────────────────────────────
  const handleLogin = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('[MOCK] Login attempted with:', email);
      // TODO: Replace with → const res = await AuthService.login(email, password);
      // TODO: On success → navigation.navigate('Dashboard');
    }, 1500);
  };

  const clearError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  return {
    email,
    setEmail: (val) => { setEmail(val); clearError('email'); },
    password,
    setPassword: (val) => { setPassword(val); clearError('password'); },
    errors,
    showPassword,
    toggleShowPassword: () => setShowPassword((prev) => !prev),
    loading,
    handleLogin,
  };
};

export default useLoginForm;
```

---

## PHASE 6 — CREATE REUSABLE COMPONENTS

### Step 6.1 — Create `src/components/InputField.jsx`

Reusable text input with label, error display, and optional right-side icon.

```jsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';

/**
 * InputField — reusable form input
 * Props:
 *   label, value, onChangeText, placeholder,
 *   secureTextEntry, rightIcon, onRightIconPress,
 *   errorMessage, keyboardType
 */
const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  rightIcon,
  onRightIconPress,
  errorMessage,
  keyboardType = 'default',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.inputRow, errorMessage ? styles.inputError : styles.inputNormal]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.icon}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 18 },
  label: {
    fontSize: fonts.sm,
    fontWeight: fonts.semibold,
    color: colors.text,
    marginBottom: 7,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
  },
  inputNormal: { borderColor: colors.inputBorder },
  inputError: { borderColor: colors.error },
  input: {
    flex: 1,
    height: 52,
    fontSize: fonts.md,
    color: colors.text,
  },
  icon: { padding: 6 },
  errorText: {
    color: colors.error,
    fontSize: fonts.xs,
    marginTop: 5,
    marginLeft: 2,
  },
});

export default InputField;
```

### Step 6.2 — Create `src/components/AppButton.jsx`

Reusable button with loading spinner and two visual variants.

```jsx
import React from 'react';
import {
  TouchableOpacity, Text, ActivityIndicator, StyleSheet,
} from 'react-native';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fonts';

/**
 * AppButton — reusable CTA button
 * Props:
 *   title, onPress, loading (bool), variant ('primary' | 'outline')
 */
const AppButton = ({
  title,
  onPress,
  loading = false,
  variant = 'primary',
}) => (
  <TouchableOpacity
    style={[
      styles.base,
      variant === 'outline' ? styles.outline : styles.primary,
      loading && styles.disabled,
    ]}
    onPress={onPress}
    disabled={loading}
    activeOpacity={0.8}
  >
    {loading ? (
      <ActivityIndicator color={colors.white} size="small" />
    ) : (
      <Text style={[styles.label, variant === 'outline' && styles.outlineLabel]}>
        {title}
      </Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  base: {
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  primary: { backgroundColor: colors.primary },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  disabled: { opacity: 0.65 },
  label: {
    color: colors.white,
    fontSize: fonts.md,
    fontWeight: fonts.bold,
    letterSpacing: 0.4,
  },
  outlineLabel: { color: colors.primary },
});

export default AppButton;
```

---

## PHASE 7 — CREATE SCREENS

### Step 7.1 — Create `src/screens/auth/LoginScreen.jsx`

Main login screen. Composes all components together.

```jsx
import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView,
} from 'react-native';

import InputField from '../../components/InputField';
import AppButton from '../../components/AppButton';
import useLoginForm from '../../hooks/useLoginForm';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import { strings } from '../../constants/strings';

// Import icon — if react-native-vector-icons fails, replace with a Text fallback
let Icon;
try {
  Icon = require('react-native-vector-icons/Feather').default;
} catch {
  // Fallback if icons not linked yet
  Icon = ({ name }) => <Text style={{ fontSize: 16 }}>{name === 'eye' ? '👁' : '🚫'}</Text>;
}

const LoginScreen = ({ navigation }) => {
  const {
    email, setEmail,
    password, setPassword,
    errors,
    showPassword, toggleShowPassword,
    loading,
    handleLogin,
  } = useLoginForm(navigation);

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
          {/* ── Logo & Header ── */}
          <View style={styles.header}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>{strings.login.logoInitials}</Text>
            </View>
            <Text style={styles.title}>{strings.login.title}</Text>
            <Text style={styles.subtitle}>{strings.login.subtitle}</Text>
          </View>

          {/* ── Form Card ── */}
          <View style={styles.card}>
            <InputField
              label={strings.login.emailLabel}
              value={email}
              onChangeText={setEmail}
              placeholder={strings.login.emailPlaceholder}
              keyboardType="email-address"
              errorMessage={errors.email}
            />

            <InputField
              label={strings.login.passwordLabel}
              value={password}
              onChangeText={setPassword}
              placeholder={strings.login.passwordPlaceholder}
              secureTextEntry={!showPassword}
              errorMessage={errors.password}
              rightIcon={
                <Icon
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color={colors.subtext}
                />
              }
              onRightIconPress={toggleShowPassword}
            />

            {/* Forgot Password */}
            <TouchableOpacity
              style={styles.forgotRow}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotText}>{strings.login.forgotPassword}</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <AppButton
              title={strings.login.loginButton}
              onPress={handleLogin}
              loading={loading}
            />
          </View>

          {/* ── Register Link ── */}
          <View style={styles.registerRow}>
            <Text style={styles.registerPrompt}>{strings.login.noAccount} </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>{strings.login.register}</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, padding: 24, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 32 },
  logo: {
    width: 84, height: 84, borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 18,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  logoText: { color: colors.white, fontSize: fonts.xl, fontWeight: fonts.bold },
  title: { fontSize: fonts.xxl, fontWeight: fonts.bold, color: colors.text, marginBottom: 6 },
  subtitle: { fontSize: fonts.sm, color: colors.subtext, textAlign: 'center' },
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 24,
  },
  forgotRow: { alignSelf: 'flex-end', marginBottom: 12, marginTop: -6 },
  forgotText: { color: colors.primary, fontSize: fonts.sm, fontWeight: fonts.semibold },
  registerRow: { flexDirection: 'row', justifyContent: 'center', paddingBottom: 16 },
  registerPrompt: { color: colors.subtext, fontSize: fonts.sm },
  registerLink: { color: colors.primary, fontSize: fonts.sm, fontWeight: fonts.bold },
});

export default LoginScreen;
```

### Step 7.2 — Create `src/screens/auth/ForgotPasswordScreen.jsx`

Stub screen — UI placeholder only.

```jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';

const ForgotPasswordScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Forgot Password</Text>
    <Text style={styles.sub}>This screen will be implemented by the backend developer.</Text>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text style={styles.back}>← Back to Login</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#F5F9FC' },
  title: { fontSize: 22, fontWeight: '700', color: '#1A1A2E', marginBottom: 12 },
  sub: { color: '#6B7280', textAlign: 'center', marginBottom: 24 },
  back: { color: '#2A7D9C', fontWeight: '600', fontSize: 15 },
});

export default ForgotPasswordScreen;
```

### Step 7.3 — Create `src/screens/auth/RegisterScreen.jsx`

Stub screen — UI placeholder only.

```jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';

const RegisterScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Therapist Registration</Text>
    <Text style={styles.sub}>This screen will be built in the next sprint.</Text>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text style={styles.back}>← Back to Login</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#F5F9FC' },
  title: { fontSize: 22, fontWeight: '700', color: '#1A1A2E', marginBottom: 12 },
  sub: { color: '#6B7280', textAlign: 'center', marginBottom: 24 },
  back: { color: '#2A7D9C', fontWeight: '600', fontSize: 15 },
});

export default RegisterScreen;
```

---

## PHASE 8 — CREATE NAVIGATION

### Step 8.1 — Create `src/navigation/AuthNavigator.jsx`

```jsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
```

### Step 8.2 — Create `src/navigation/AppNavigator.jsx`

```jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
// TODO: import MainNavigator from './MainNavigator'; (add after backend is ready)

const AppNavigator = () => (
  <NavigationContainer>
    <AuthNavigator />
    {/* After backend auth is wired: swap AuthNavigator for MainNavigator based on auth state */}
  </NavigationContainer>
);

export default AppNavigator;
```

---

## PHASE 9 — WIRE INTO APP.JS

Open the root `App.js` (or `App.tsx`) and replace its entire contents with:

```jsx
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => <AppNavigator />;

export default App;
```

---

## PHASE 10 — VERIFY EVERYTHING

Run these checks in order:

1. Run `npx react-native start` — confirm Metro bundler starts with no errors.
2. Run on Android: `npx react-native run-android`
   OR on iOS: `npx react-native run-ios`
3. Confirm the Login Screen loads with:
   - Logo placeholder (MWP initials)
   - Email input field
   - Password input with eye toggle icon
   - Forgot Password link
   - Sign In button
   - Register link at the bottom
4. Test empty form submit → both error messages should appear.
5. Test invalid email → email error should appear.
6. Test valid inputs → loading spinner appears for 1.5s, then mock log in console.
7. Tap Forgot Password → stub screen opens.
8. Tap Register → stub screen opens.
9. Confirm back navigation works from both stub screens.

---

## PHASE 11 — FINAL REPORT

After completing all phases, output a summary in this format:

```
✅ COMPLETED PHASES:
- Phase 1: Dependencies installed
- Phase 2: Folder structure created
- Phase 3: Constants created (colors, fonts, strings)
- Phase 4: Validators created
- Phase 5: useLoginForm hook created
- Phase 6: InputField and AppButton components created
- Phase 7: LoginScreen + 2 stub screens created
- Phase 8: AuthNavigator + AppNavigator created
- Phase 9: App.js wired
- Phase 10: Verified on device/emulator

⚠️ ISSUES (if any):
- List any install failures, linking issues, or skipped steps

📌 NEXT STEPS FOR BACKEND DEVELOPER:
- Replace handleLogin mock in src/hooks/useLoginForm.js
- Add real navigation to Dashboard after successful login
- Wire up ForgotPasswordScreen and RegisterScreen
```

---

## HOW THE BACKEND DEVELOPER CONNECTS LATER

The only file they need to touch is `src/hooks/useLoginForm.js`.
Find the comment block that says `MOCK LOGIN` and replace just that block.
Zero changes needed to any UI component or screen.
