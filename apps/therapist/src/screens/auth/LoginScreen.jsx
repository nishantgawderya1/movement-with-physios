import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import InputField from '../../components/InputField';
import AppButton from '../../components/AppButton';
import useLoginForm from '../../hooks/useLoginForm';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';
import { strings } from '../../constants/strings';

// Main login screen — composes all components together
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
                <Feather
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
