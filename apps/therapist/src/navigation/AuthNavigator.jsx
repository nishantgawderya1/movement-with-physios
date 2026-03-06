import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/splash/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import TherapistPortalScreen from '../screens/auth/TherapistPortalScreen';
import MobileVerificationScreen from '../screens/auth/MobileVerificationScreen';
import RegistrationNextStep from '../screens/auth/RegistrationNextStep';
import PersonalInfoScreen from '../screens/auth/PersonalInfoScreen';
import OnboardingNext from '../screens/auth/OnboardingNext';

// Auth flow navigator — handles Login, ForgotPassword, Register screens
const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="TherapistPortal" component={TherapistPortalScreen} />
    <Stack.Screen name="MobileVerification" component={MobileVerificationScreen} />
    <Stack.Screen name="RegistrationNextStep" component={RegistrationNextStep} />
    <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
    <Stack.Screen name="OnboardingNext" component={OnboardingNext} />
  </Stack.Navigator>
);

export default AuthNavigator;
