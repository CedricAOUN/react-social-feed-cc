import { StatusBar } from "expo-status-bar";
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
import { useState } from "react";
import POSTS from "./mockDb/posts";
import { Post } from "./types";

const Stack = createNativeStackNavigator<RouteParamList>();

function App() {
  const [posts, setPosts] = useState(POSTS); // Initialize posts state
  const [favorites, setFavorites] = useState<Post[]>([]); // <-- Ajouté favorites state ici

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null; // or a loading indicator
  }

  const handleAddPost = (post: Post) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  };

  // toggleFavorite qui ajoute ou enlève un post des favoris
  const toggleFavorite = (post: Post) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((p) => p.id === post.id)) {
        // Retirer des favoris
        return prevFavorites.filter((p) => p.id !== post.id);
      } else {
        // Ajouter aux favoris
        return [...prevFavorites, post];
      }
    });
  };

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Tabs"
          children={() => <TabNavigator posts={posts} />}
        />
        <Stack.Screen
          name="AddPost"
          component={AddPostScreen}
          initialParams={{ onAddPost: handleAddPost }} // Default params
          options={{
            headerShown: true,
            title: "Add Post",
            headerTitleStyle: {
              fontFamily: "Poppins_700Bold",
              fontSize: 18,
            },
          }}
        />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
