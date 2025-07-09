import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { RouteParamList } from './routes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoriteScreen from './screens/FavoriteScreen';
import FeedScreen from './screens/FeedScreen';
import ConversationsScreen from './screens/ConversationScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChatScreen from './screens/ChatScreen';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const Tab = createBottomTabNavigator<RouteParamList>();
const Stack = createNativeStackNavigator<RouteParamList>();

const CustomButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity style={styles.customButton} onPress={onPress} activeOpacity={0.7}>
    <Ionicons style={styles.buttonIcon} name="add-circle-outline" size={24} color="white" />
  </TouchableOpacity>
);

function TabNavigator() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCustomButtonPress = () => {
    setModalVisible(true);
  };

  return (
    <>
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
          },
        }}
      >
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
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
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Bouton personnalisé</Text>
            <Text style={styles.modalText}>Tu as appuyé sur le bouton central !</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen 
          name="Chat" 
          component={ChatScreen} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  customButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#404040',
    marginHorizontal: 5,
    marginBottom: 100,
    borderRadius: 15,
    height: 60,
    width: 60,
    position: 'absolute',
    top: -30,
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
    fontSize: 32,
    transform: [{ rotateZ: '-45deg' }],
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
    marginBottom: 10,
  },
  modalText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#404040',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    color: 'white',
  },
});
