// src/screens/auth/MobileVerificationScreen.jsx
// ─────────────────────────────────────────────────────────────────────────────
// FIGMA REFERENCE: Mobile Verification Screen — "Join us!"
// Three states: phoneEntry → otpSent → verifying
// Backend developer: replace sendOTP() and verifyOTP() mock functions only
// Do NOT modify navigation targets without updating AuthNavigator
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useRef, useEffect } from 'react';
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
  Animated,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { fonts, fontFamilies } from '../../constants/fonts';

// ── Import mock API functions ─────────────────────────────────────────────────
// Backend developer: these live in src/services/auth/mockAuthService.js
// Replace mock bodies there — do NOT change these import names
import { sendOTP, verifyOTP } from '../../services/auth/mockAuthService';

const MobileVerificationScreen = ({ navigation }) => {

  // ── Screen state machine ──────────────────────────────────────────────────
  const [screenState, setScreenState] = useState('phoneEntry');
  // Values: 'phoneEntry' | 'otpSent' | 'verifying'

  // ── Form state ────────────────────────────────────────────────────────────
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // ── Animation value for OTP section fade-in ───────────────────────────────
  const otpFadeAnim = useRef(new Animated.Value(0)).current;

  // ── Resend countdown timer ────────────────────────────────────────────────
  useEffect(() => {
    let interval;
    if (screenState === 'otpSent') {
      setResendTimer(30);
      setCanResend(false);
      interval = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [screenState]);

  // ── Fade in OTP section when state changes ────────────────────────────────
  useEffect(() => {
    if (screenState === 'otpSent') {
      otpFadeAnim.setValue(0);
      Animated.timing(otpFadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [screenState]);

  // ─────────────────────────────────────────────────────────────────────────
  // MOCK HANDLERS
  // Backend developer: do NOT edit here.
  // Edit src/services/auth/OtpService.js instead.
  // ─────────────────────────────────────────────────────────────────────────

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }
    setErrorMessage('');
    try {
      const result = await sendOTP(phoneNumber);
      if (result.success) {
        setScreenState('otpSent');
      } else {
        setErrorMessage(result.error || 'Failed to send OTP. Try again.');
      }
    } catch (e) {
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length < 4) {
      setErrorMessage('Please enter the OTP');
      return;
    }
    setErrorMessage('');
    setScreenState('verifying');
    try {
      const result = await verifyOTP(phoneNumber, otp);
      if (result.success) {
        navigation.navigate('RegistrationNextStep');
      } else {
        setScreenState('otpSent');
        setErrorMessage(result.message || 'Incorrect OTP. Please try again.');
      }
    } catch (e) {
      setScreenState('otpSent');
      setErrorMessage('Verification failed. Please try again.');
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    setOtp('');
    setErrorMessage('');
    setScreenState('phoneEntry');
    setTimeout(() => handleSendOTP(), 100);
  };

  const handleEditNumber = () => {
    setOtp('');
    setErrorMessage('');
    setScreenState('phoneEntry');
  };

  // ── Masked phone display ──────────────────────────────────────────────────
  const maskedPhone = phoneNumber.length >= 10
    ? phoneNumber.slice(0, 2) + 'XXXXXX' + phoneNumber.slice(-2)
    : phoneNumber;

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

          {/* ── Top Bar ─────────────────────────────────────────────── */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={22} color={colors.textDark} />
            </TouchableOpacity>
            <View style={styles.brandRow}>
              <View style={styles.brandIcon}>
                <Ionicons name="pulse" size={16} color={colors.white} />
              </View>
              <Text style={styles.brandText}>Join us !</Text>
            </View>
          </View>

          {/* ── Phone Icon ──────────────────────────────────────────── */}
          {/* Figma: teal rounded square with phone icon inside          */}
          <View style={styles.phoneIconBox}>
            <Ionicons name="call" size={28} color={colors.white} />
          </View>

          {/* ── Heading ─────────────────────────────────────────────── */}
          {/* Figma: Instrument Serif, large, dark                       */}
          <Text style={styles.heading}>Verify Your Mobile</Text>

          {/* ── Subtitle ────────────────────────────────────────────── */}
          <Text style={styles.subtitle}>
            {screenState === 'phoneEntry'
              ? "We'll send you a verification code to\nconfirm your identity"
              : `OTP sent to +91 ${maskedPhone}`}
          </Text>

          {/* ── Form Card ────────────────────────────────────────────── */}
          <View style={styles.card}>

            {/* STATE 1 — Phone Entry */}
            {screenState === 'phoneEntry' && (
              <>
                <Text style={styles.label}>Mobile Number</Text>
                <View style={styles.phoneRow}>
                  <View style={styles.countryCode}>
                    <Text style={styles.countryCodeText}>+91</Text>
                  </View>
                  <TextInput
                    style={styles.phoneInput}
                    value={phoneNumber}
                    onChangeText={val => {
                      setPhoneNumber(val.replace(/[^0-9]/g, ''));
                      setErrorMessage('');
                    }}
                    placeholder="98765 43210"
                    placeholderTextColor={colors.textLight}
                    keyboardType="phone-pad"
                    maxLength={10}
                  />
                </View>

                {errorMessage ? (
                  <Text style={styles.errorText}>{errorMessage}</Text>
                ) : null}

                <TouchableOpacity
                  style={[
                    styles.primaryBtn,
                    phoneNumber.length < 10 && styles.primaryBtnDisabled
                  ]}
                  onPress={handleSendOTP}
                  disabled={phoneNumber.length < 10}
                  activeOpacity={0.85}
                >
                  <Text style={styles.primaryBtnText}>Send OTP</Text>
                </TouchableOpacity>
              </>
            )}

            {/* STATE 2 & 3 — OTP Entry */}
            {(screenState === 'otpSent' || screenState === 'verifying') && (
              <Animated.View style={{ opacity: otpFadeAnim }}>

                {/* Edit number link */}
                <TouchableOpacity onPress={handleEditNumber} style={styles.editRow}>
                  <Ionicons name="pencil-outline" size={13} color={colors.primary} />
                  <Text style={styles.editText}> Edit Number</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Enter OTP</Text>
                <TextInput
                  style={styles.otpInput}
                  value={otp}
                  onChangeText={val => {
                    setOtp(val.replace(/[^0-9]/g, ''));
                    setErrorMessage('');
                  }}
                  placeholder="• • • • • •"
                  placeholderTextColor={colors.textLight}
                  keyboardType="number-pad"
                  maxLength={6}
                  textAlign="center"
                  editable={screenState !== 'verifying'}
                />

                {errorMessage ? (
                  <View style={styles.errorBanner}>
                    <Ionicons name="alert-circle-outline" size={15} color="#C53030" />
                    <Text style={styles.errorBannerText}>{errorMessage}</Text>
                  </View>
                ) : null}

                <TouchableOpacity
                  style={[
                    styles.primaryBtn,
                    (otp.length < 4 || screenState === 'verifying') && styles.primaryBtnDisabled
                  ]}
                  onPress={handleVerifyOTP}
                  disabled={otp.length < 4 || screenState === 'verifying'}
                  activeOpacity={0.85}
                >
                  {screenState === 'verifying' ? (
                    <ActivityIndicator color={colors.white} size="small" />
                  ) : (
                    <Text style={styles.primaryBtnText}>Verify OTP</Text>
                  )}
                </TouchableOpacity>

                {/* Resend countdown */}
                <TouchableOpacity
                  onPress={handleResendOTP}
                  disabled={!canResend}
                  style={styles.resendRow}
                >
                  <Text style={[styles.resendText, canResend && styles.resendActive]}>
                    {canResend ? 'Resend OTP' : `Resend in ${resendTimer}s`}
                  </Text>
                </TouchableOpacity>

              </Animated.View>
            )}

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: colors.background },
  flex:         { flex: 1 },
  scroll:       { flexGrow: 1, paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 },

  // Top bar
  topBar:       { flexDirection: 'row', alignItems: 'center', marginBottom: 32 },
  backBtn:      { padding: 4, marginRight: 12 },
  brandRow:     { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandIcon:    {
    width: 30, height: 30, borderRadius: 8,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  brandText:    {
    fontFamily: fontFamilies.instrumentSerif,
    fontSize: fonts.lg,
    color: colors.textDark,
  },

  // Phone icon box — matches Figma teal rounded square
  phoneIconBox: {
    width: 56, height: 56, borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },

  // Heading
  heading:      {
    fontFamily: fontFamilies.instrumentSerif,
    fontSize: fonts.xxl,
    fontWeight: fonts.bold,
    color: colors.textDark,
    marginBottom: 8,
  },

  // Subtitle
  subtitle:     {
    fontSize: fonts.sm,
    color: colors.textLight,
    lineHeight: 20,
    marginBottom: 28,
  },

  // Card
  card:         {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  label:        {
    fontSize: fonts.sm,
    fontWeight: fonts.semibold,
    color: colors.textDark,
    marginBottom: 8,
  },

  // Phone row — matches Figma: country code box + input side by side
  phoneRow:     {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  countryCode:  {
    paddingHorizontal: 14, paddingVertical: 14,
    backgroundColor: '#F1F5F9',
    borderRightWidth: 1,
    borderRightColor: colors.cardBorder,
  },
  countryCodeText: {
    fontSize: fonts.md,
    fontWeight: fonts.semibold,
    color: colors.textDark,
  },
  phoneInput:   {
    flex: 1, paddingHorizontal: 14,
    fontSize: fonts.md,
    color: colors.textDark,
    height: 48,
  },

  // OTP input
  otpInput:     {
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 10,
    height: 52,
    fontSize: fonts.xl,
    fontWeight: fonts.bold,
    color: colors.textDark,
    letterSpacing: 8,
    marginBottom: 16,
    paddingHorizontal: 14,
  },

  // Edit number row
  editRow:      {
    flexDirection: 'row', alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  editText:     {
    fontSize: fonts.xs,
    color: colors.primary,
    fontWeight: fonts.semibold,
  },

  // Primary button
  primaryBtn:   {
    width: '100%', height: 50,
    backgroundColor: colors.primary,
    borderRadius: 30,
    justifyContent: 'center', alignItems: 'center',
    marginTop: 4,
  },
  primaryBtnDisabled: { opacity: 0.5 },
  primaryBtnText: {
    color: colors.white,
    fontSize: fonts.md,
    fontWeight: fonts.bold,
    letterSpacing: 0.3,
  },

  // Error + resend
  errorText:    {
    color: colors.error,
    fontSize: fonts.xs,
    marginBottom: 10,
    marginTop: -8,
  },
  resendRow:    { alignItems: 'center', marginTop: 14 },
  resendText:   { fontSize: fonts.sm, color: colors.textLight },
  resendActive: { color: colors.primary, fontWeight: fonts.semibold },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FED7D7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    gap: 8,
  },
  errorBannerText: {
    fontSize: 13,
    color: '#C53030',
    flex: 1,
    lineHeight: 18,
  },
});

export default MobileVerificationScreen;
