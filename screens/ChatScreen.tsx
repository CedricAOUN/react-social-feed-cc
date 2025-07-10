import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Platform, Keyboard } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from "expo-status-bar";
import { RouteParamList } from "../routes";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

type Props = NativeStackScreenProps<RouteParamList, 'Chat'>;

export default function ChatScreen({ navigation, route }: Props) {
  const { conversation } = route.params;
  const insets = useSafeAreaInsets();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height + 10);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{conversation.name}</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Messages */}
      <ScrollView style={styles.messagesContainer}>
        {conversation.messages.map((message, index) => (
          <View key={index} style={[
            styles.messageContainer,
            message.sent ? styles.myMessage : styles.theirMessage
          ]}>
            <Text style={[
              styles.messageText,
              message.sent ? { color: 'white' } : { color: 'black' }
            ]}>{message.msg}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={[
        styles.inputContainer,
        { 
          paddingBottom: Math.max(insets.bottom, 10), // Some padding for android buttons
          marginBottom: keyboardHeight,
        }
      ]}>
        <TextInput 
          style={styles.textInput}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cce8ed',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#e1f8fc',
  },
  headerTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
  },
  messagesContainer: {
    flex: 1,
    padding: 20,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
    borderRadius: 10,
  },
  myMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#e1f8fc',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e1f8fc',
  },
  textInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontFamily: 'Poppins_400Regular',
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
