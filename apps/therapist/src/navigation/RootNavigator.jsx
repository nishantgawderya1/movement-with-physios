import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator }
  from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import { ROUTES } from "../constants/routes";
 
const Stack = createNativeStackNavigator();
 
export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={ROUTES.SPLASH}
          component={SplashScreen}
        />
        <Stack.Screen
          name={ROUTES.LOGIN}
          component={LoginScreen}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
