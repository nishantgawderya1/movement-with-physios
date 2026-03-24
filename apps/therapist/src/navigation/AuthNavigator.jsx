import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/splash/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import TherapistPortalScreen from '../screens/auth/TherapistPortalScreen';
import ClerkAuthScreen from '../screens/auth/ClerkAuthScreen';
import RegistrationNextStep from '../screens/auth/RegistrationNextStep';
import PersonalInfoScreen from '../screens/auth/PersonalInfoScreen';
import OnboardingNext from '../screens/auth/OnboardingNext';
import ProfessionalCredentialsScreen from '../screens/auth/ProfessionalCredentialsScreen';
import GovernmentIDVerificationScreen from '../screens/auth/GovernmentIDVerificationScreen';
import ProfilePhotoScreen from '../screens/auth/ProfilePhotoScreen';
import ScheduleVerificationCallScreen from '../screens/auth/ScheduleVerificationCallScreen';
import BookingConfirmedScreen from '../screens/auth/BookingConfirmedScreen';
import PendingVerificationDashboard from '../screens/dashboard/PendingVerificationDashboard';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import AllClientsScreen from '../screens/dashboard/AllClientsScreen';
import ExerciseLibraryScreen from '../screens/exercises/ExerciseLibraryScreen';
import MessagesScreen from '../screens/messages/MessagesScreen';

// Smooth fade transition for navigating between dashboard-level screens
const fadeTransition = {
  cardStyleInterpolator: ({ current }) => ({
    cardStyle: { opacity: current.progress },
  }),
  transitionSpec: {
    open:  { animation: 'timing', config: { duration: 220 } },
    close: { animation: 'timing', config: { duration: 180 } },
  },
};

// Auth flow navigator — handles Login, ForgotPassword, Register screens
const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="BookingConfirmed" component={BookingConfirmedScreen} />
    <Stack.Screen name="ScheduleVerificationCall" component={ScheduleVerificationCallScreen} />
    <Stack.Screen name="ProfilePhoto" component={ProfilePhotoScreen} />
    <Stack.Screen name="ProfessionalCredentials" component={ProfessionalCredentialsScreen} />
    <Stack.Screen name="GovernmentIDVerification" component={GovernmentIDVerificationScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="TherapistPortal" component={TherapistPortalScreen} />
    {/* BACKEND ENGINEER: Replace ClerkAuthScreen with Clerk OTP screen when ready */}
    <Stack.Screen name="ClerkAuth" component={ClerkAuthScreen} />
    <Stack.Screen name="RegistrationNextStep" component={RegistrationNextStep} />
    <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
    <Stack.Screen name="OnboardingNext" component={OnboardingNext} />
    <Stack.Screen name="PendingVerificationDashboard" component={PendingVerificationDashboard} />
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    <Stack.Screen name="AllClients" component={AllClientsScreen} options={fadeTransition} />
    <Stack.Screen name="ExerciseLibrary" component={ExerciseLibraryScreen} options={fadeTransition} />
    <Stack.Screen name="Messages" component={MessagesScreen} options={fadeTransition} />
  </Stack.Navigator>
);

export default AuthNavigator;