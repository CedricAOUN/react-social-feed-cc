import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RouteParamList } from "../routes";
import { useState } from "react";
import { Post } from "../types";
import FeedScreen from "../screens/FeedScreen";
import { Ionicons } from "@expo/vector-icons";
import ConversationsScreen from "../screens/ConversationScreen";
import AddPostScreen from "../screens/AddPostScreen";
import CustomButton from "./CustomButton";
import FavoriteScreen from "../screens/FavoriteScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator<RouteParamList>();

function TabNavigator() {
  const [favorites, setFavorites] = useState<Post[]>([]);

  const toggleFavorite = (post: Post) => {
    setFavorites((prev) =>
      prev.some((p) => p.id === post.id)
        ? prev.filter((p) => p.id !== post.id)
        : [...prev, post]
    );
  };

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
          name="AddPost"
          component={AddPostScreen}
          options={{
            tabBarButton: () => (
              <CustomButton navPath="AddPost" />
            ),
          }}
        />
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
export default TabNavigator;