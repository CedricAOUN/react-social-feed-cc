import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { RouteParamList } from "./routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatScreen from "./screens/ChatScreen";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import AddPostScreen from "./screens/AddPostScreen";
import TabNavigator from "./components/TabNavigator";

const Stack = createNativeStackNavigator<RouteParamList>();


function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });
  if (!fontsLoaded) {
    return null; // or a loading indicator
  }
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
        />
        <Stack.Screen
          name="AddPost"
          component={AddPostScreen}
          options={{ 
            headerShown: true,
            title: "Add Post",
            headerTitleStyle: {
              fontFamily: 'Poppins_700Bold',
              fontSize: 18,
            }
          }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
