import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator }
  from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
