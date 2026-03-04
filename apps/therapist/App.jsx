import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import RootNavigator from "./src/navigation/RootNavigator";
 
SplashScreen.preventAutoHideAsync();
 
export default function App() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);
 
  return <RootNavigator />;
}
