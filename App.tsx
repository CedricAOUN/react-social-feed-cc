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
import { useEffect, useMemo, useState } from "react";
import { Post } from "./types";
import { createPost, fetchPosts, updatePost } from "./mockDb/api";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const Stack = createNativeStackNavigator<RouteParamList>();

function App() {
  const [posts, setPosts] = useState<Post[]>([]); // Initialize posts state
  const [favorites, setFavorites] = useState<Post[]>([]); // Initialize favorites state

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
    // Simulate fetching posts from an API or database
    fetchPosts().then((data) => {
      setPosts(data);
    });
  }, []);

  useMemo(() => {
    setFavorites(posts.filter((p) => p.userHasLiked));
  }, [posts]);

  if (!fontsLoaded) {
    return null; // or a loading indicator
  }

  const handleAddPost = (post: Post) => {
    createPost(post).then(() => {
      fetchPosts().then((data) => {
        setPosts(data);
      });
    });
  };

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Tabs"
          children={() => <TabNavigator posts={posts} onPostUpdate={setPosts} favorites={favorites} />}
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
