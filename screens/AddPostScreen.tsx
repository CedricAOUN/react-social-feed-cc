import { StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert, View, Image } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from "expo-status-bar";
import { RouteParamList } from "../routes";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Post } from "../types";

type Props = NativeStackScreenProps<RouteParamList, 'AddPost'>;

export default function AddPostScreen({ navigation, route }: Props) {
  const { onAddPost } = route.params;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [postTitle, setPostTitle] = useState('');

  const handleAddPost = () => {
    if (!postTitle.trim() || !selectedImage) {
      const missingField = !postTitle.trim() ? "Post Title" : "Image";
      Alert.alert("Missing Field", `${missingField} is required!`);
      return;
    }

    const post: Post = {
      id: Math.random().toString(36).substring(7), // Generate a random ID
      title: postTitle,
      image: selectedImage || '',
      user: { // Our mock current user
        name: 'John Doe',
        avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
      },
    };

    onAddPost(post);
    navigation.goBack();
  };

  const pickImage = async () => {
    // Request permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={100}>
      {/* Show selected image */}
      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          <TouchableOpacity 
            style={styles.removeImageButton} 
            onPress={() => setSelectedImage(null)}
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}

      {/* Image selection section */}
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>
          {selectedImage ? "Change Image" : "Add Image"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.title}>What's on your mind?</Text>
      <TextInput 
        placeholder="Post title..."
        value={postTitle}
        onChangeText={setPostTitle}
        style={styles.postTitleInput} 
        maxLength={50}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddPost} >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
  },
  postTitleInput: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontFamily: 'Poppins_400Regular',
  },
  addButton: {
    width: '90%',
    backgroundColor: '#404040',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontFamily: 'Poppins_700Bold',
  },
  imageButton: {
    width: '90%',
    backgroundColor: '#e1f8fc',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  imageButtonText: {
    color: '#404040',
    fontFamily: 'Poppins_400Regular',
  },
  imageContainer: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
  },
  removeImageButton: {
    backgroundColor: '#ff4d4d',
    position: 'absolute',
    right: 0,
    margin: 3,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  removeImageText: {
    color: '#fff',
    fontFamily: 'Poppins_700Bold',
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
});