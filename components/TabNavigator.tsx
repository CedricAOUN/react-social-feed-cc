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
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

const Tab = createBottomTabNavigator<RouteParamList>();

function TabNavigator({ posts }: { posts: Post[] }) {
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
          <FeedScreen
            posts={posts}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
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
          tabBarButton: () => <CustomButton navPath="AddPost" />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        children={() => (
          <FavoriteScreen
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        )}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        children={({ navigation, route }) => (
          <ProfileScreen
            navigation={navigation}
            route={route}
            favorites={favorites}
            posts={posts}
            toggleFavorite={toggleFavorite}
          />
        )}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default TabNavigator;
