import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { RouteParamList } from './routes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoriteScreen from './screens/FavoriteScreen';
import FeedScreen from './screens/FeedScreen';
import ConversationsScreen from './screens/ConversationScreen';
import ProfileScreen from './screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';


const Tab = createBottomTabNavigator<RouteParamList>();
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator>
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Conversations" component={ConversationsScreen} />
        <Tab.Screen name="Favorites" component={FavoriteScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // 
});
