import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity } from "react-native";
import { RouteParamList } from "./routes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoriteScreen from "./screens/FavoriteScreen";
import FeedScreen from "./screens/FeedScreen";
import ConversationsScreen from "./screens/ConversationScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ChatScreen from "./screens/ChatScreen";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Post } from "./types";

const Tab = createBottomTabNavigator<RouteParamList>();
const Stack = createNativeStackNavigator<RouteParamList>();

const CustomButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    style={styles.customButton}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Ionicons
      style={styles.buttonIcon}
      name="add-circle-outline"
      size={24}
      color="white"
    />
  </TouchableOpacity>
);

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const [favorites, setFavorites] = useState<Post[]>([]);

  const toggleFavorite = (post: Post) => {
    setFavorites((prev) =>
      prev.some((p) => p.id === post.id)
        ? prev.filter((p) => p.id !== post.id)
        : [...prev, post]
    );
  };

  if (!fontsLoaded) {
    return null;
  }

  function TabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontFamily: "Poppins_700Bold",
            fontSize: 10,
          },
          headerTitleStyle: {
            fontFamily: "Poppins_700Bold",
            fontSize: 18,
          },
          tabBarStyle: {
            height: 110,
          },
        }}
      >
        <Tab.Screen
          name="Feed"
          children={() => (
            <FeedScreen favorites={favorites} toggleFavorite={toggleFavorite} />
          )}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Conversations"
          component={ConversationsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubble-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          options={{
            tabBarButton: () => (
              <CustomButton onPress={() => alert("Bouton central appuyé")} />
            ),
          }}
        >
          {() => null}
        </Tab.Screen>
        <Tab.Screen
          name="Favorites"
          children={() => <FavoriteScreen favorites={favorites} />}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="person-circle-outline"
                color={color}
                size={size}
              />
            ),
          }}
          children={({ navigation, route }) => (
            <ProfileScreen
              navigation={navigation}
              route={route}
              favorites={favorites}
            />
          )}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  customButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#404040",
    marginHorizontal: 5,
    marginBottom: 100,
    borderRadius: 15,
    height: 60,
    width: 60,
    position: "absolute",
    top: -30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    transform: [{ rotateZ: "45deg" }],
  },
  buttonIcon: {
    color: "white",
    fontSize: 32,
    transform: [{ rotateZ: "-45deg" }],
  },
});
