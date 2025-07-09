import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { RouteParamList } from './routes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoriteScreen from './screens/FavoriteScreen';
import FeedScreen from './screens/FeedScreen';
import ConversationsScreen from './screens/ConversationScreen';
import ProfileScreen from './screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

const Tab = createBottomTabNavigator<RouteParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

    if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontFamily: 'Poppins_700Bold',
            fontSize: 10,
          },
          headerTitleStyle: {
            fontFamily: 'Poppins_700Bold',
            fontSize: 18,
          },
        }}
      >
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Conversations" component={ConversationsScreen} />
        <Tab.Screen name="Favorites" component={FavoriteScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
