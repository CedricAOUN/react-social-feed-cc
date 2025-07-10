import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { RouteParamList } from "../routes";
import { Ionicons } from "@expo/vector-icons";
import { Post } from "../types";
import React, { useState } from "react";

type Props = NativeStackScreenProps<RouteParamList, "Profile"> & {
  favorites: Post[];
  posts: Post[];
};

export default function ProfileScreen({ navigation, favorites, posts }: Props) {
  const [activeTab, setActiveTab] = useState<"images" | "favorites">("images");
  const currentUserPosts = posts.filter((post) => post.user.name === "John Doe");

  const renderFavoriteItem = ({ item }: { item: Post }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.userInfo}>
        <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
        <Text style={styles.userName}>{item.user.name}</Text>
      </View>
    </View>
  );

  const renderGalleryItem = ({ item }: { item: Post }) => (
    <View style={styles.postContainer}>
      <Text style={styles.userName}>{item.title}</Text>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.userInfo}>
        <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
        <Text style={styles.userName}>{item.user.name}</Text>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <StatusBar style="auto" />
      
      <View style={styles.avatarWrapper}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/54.jpg" }}
          style={styles.avatarImage}
        />
      </View>

      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.handle}>@johndoe</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>130</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>87</Text>
          <Text style={styles.statLabel}>Follows</Text>
        </View>
      </View>

      <View style={styles.toggleTabs}>
        <TouchableOpacity onPress={() => setActiveTab("images")}>
          <Ionicons
            name="images-outline"
            size={28}
            color={activeTab === "images" ? "#000" : "#888"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("favorites")}>
          <Ionicons
            name="heart-outline"
            size={28}
            color={activeTab === "favorites" ? "#000" : "#888"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyContent = () => (
    <View style={styles.emptyContent}>
      <Text style={styles.previewText}>
        {activeTab === "images" ? "No images yet" : "No favorites yet"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {activeTab === "images" ? (
        currentUserPosts.length > 0 ? (
          <FlatList
            data={currentUserPosts}
            keyExtractor={(item) => item.id}
            renderItem={renderGalleryItem}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <ScrollView>
            {renderHeader()}
            {renderEmptyContent()}
          </ScrollView>
        )
      ) : (
        favorites.length === 0 ? (
          <ScrollView>
            {renderHeader()}
            {renderEmptyContent()}
          </ScrollView>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id}
            renderItem={renderFavoriteItem}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  avatarWrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#404040",
    borderRadius: 15,
    height: 60,
    width: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    transform: [{ rotateZ: "45deg" }],
    overflow: "hidden",
  },
  avatarImage: {
    height: 60,
    width: 60,
    transform: [{ rotateZ: "-45deg" }],
  },
  name: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    paddingTop: 10,
  },
  handle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
  },
  statLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#666",
  },
  toggleTabs: {
    flexDirection: "row",
    gap: 30,
    marginBottom: 20,
  },
  contentPreview: {
    width: "90%",
    height: 300,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  emptyContent: {
    display: "flex",
    flexDirection: "column",
    height: 200,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  previewText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
  postContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  postImage: {
    width: 300,
    height: 225,
    borderRadius: 15,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fff",
  },
  userName: {
    color: "#000",
    fontFamily: "Poppins_700Bold",
    marginLeft: 8,
  },
});
