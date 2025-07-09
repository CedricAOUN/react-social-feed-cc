import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { RouteParamList } from './routes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoriteScreen from './screens/FavoriteScreen';
import FeedScreen from './screens/FeedScreen';
import ConversationsScreen from './screens/ConversationScreen';
import ProfileScreen from './screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator<RouteParamList>();

const CustomButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    style={styles.customButton}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Ionicons style={styles.buttonIcon} name="add-circle-outline" size={24} color="white" />
  </TouchableOpacity>
);

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleCustomButtonPress = () => {
    Alert.alert('Custom Button', 'You pressed the custom button!');
    // Add your custom logic here - could open a modal, create new post, etc.
  };

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
          tabBarStyle: { 
            height: 110,
          }
        }}
      >
        <Tab.Screen 
          name="Feed" 
          component={FeedScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen 
          name="Conversations" 
          component={ConversationsScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubble-outline" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen 
          name="Add" 
          component={View}
          options={{
            tabBarButton: () => (
              <CustomButton onPress={handleCustomButtonPress} />
            ),
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoriteScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart-outline" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" color={color} size={size} />
            )
          }}
        />
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
  customButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#404040',
    marginHorizontal: 5,
    marginBottom: 100,
    borderRadius: 15,
    height: 60,
    width: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    transform: [{ rotateZ: '45deg' }],
  },
  buttonIcon: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    transform: [{ rotateZ: '-45deg' }],
  },
});
