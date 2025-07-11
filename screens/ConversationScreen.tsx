import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableHighlight } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from "expo-status-bar";
import { RouteParamList } from "../routes";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Conversation } from "../types";
import { fetchConversations, updateConversation } from "../mockDb/api";

type Props = NativeStackScreenProps<RouteParamList, 'Conversations'>;

export default function ConversationsScreen({ navigation }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    // Simulate fetching conversations from an API or database
    fetchConversations().then((data) => {
      setConversations(data);
    });
  }, []);


  const handleOpenChat = (conversation: Conversation) => {
    handleMessagesRead(conversation.id);
    navigation.navigate('Chat', { conversation });
  };

  const handleMessagesRead = (conversationId: string) => {
    const conversationToUpdate = conversations.find(c => c.id === conversationId);
    const updatedConversation = {
      ...conversationToUpdate,
      read: true,
    };

    updateConversation(conversationId, updatedConversation)
      .then(() => {
        fetchConversations().then((data) => {
          setConversations(data);
        });
      })
      .catch(error => {
        console.error('Error updating conversation:', error);
      });
  }

  const filteredConversations = conversations?.filter(conversation => 
    conversation?.name?.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

  const renderConversationItem = ({ item, index }: { item: Conversation, index: number }) => (
    <TouchableHighlight 
      onPress={() => handleOpenChat(item)}
      underlayColor="transparent"
    >
      <View key={index} style={styles.chatButton}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
        />
        <View>
          <Text style={{ fontFamily: 'Poppins_500Medium', fontSize: 16, fontWeight: 700 }}>{item.name}</Text>
          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 12 }}>{item.messages[item.messages.length - 1].msg}</Text>
        </View>
        {item.read === false && <Text style={styles.unreadText}>Unread Messages</Text>}
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.searchContainer}>
        <Ionicons style={{ margin: 10 }} name="search-outline" size={24} color="black" />
        <TextInput placeholder="Search contacts..." style={styles.searchInput} value={searchQuery} onChangeText={setSearchQuery} />
      </View>
      <FlatList
        data={filteredConversations}
        renderItem={renderConversationItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#cce8ed',
    height: '100%',
    padding: 20,
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
  },
  searchContainer: {
    backgroundColor: '#e1f8fc',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 10,
  },
  searchInput: {
    backgroundColor: '#e1f8fc',
    marginRight: 20,
  },
  chatButton: {
    backgroundColor: '#e1f8fc',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  image: {
    width: 50, 
    height: 50, 
    borderRadius: 25,
    borderColor: '#000',
    borderWidth: 1,
  },
  unreadText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: 'white',
    backgroundColor: '#3264a8',
    borderRadius: 5,
    position: 'absolute',
    paddingHorizontal: 10,
    top: -5,
    right: 5,
  },
});
