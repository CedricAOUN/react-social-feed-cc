import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, Modal } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { RouteParamList } from "../routes";
import { Ionicons } from "@expo/vector-icons";
import { Post } from "../types";
import React, { useState } from "react";
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from "react-native-reanimated";

const timeSince = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days >= 1) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours >= 1) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes >= 1) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "just now";
  }
};

type Props = NativeStackScreenProps<RouteParamList, "Profile"> & {
  favorites: Post[];
  posts: Post[];
  toggleFavorite: (post: Post) => void;
};

export default function ProfileScreen({
  navigation,
  favorites,
  posts,
  toggleFavorite,
}: Props) {
  const [activeTab, setActiveTab] = useState<"images" | "favorites">("images");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const scale = useSharedValue(1);

  const currentUserPosts = posts.filter((post) => post.user.name === "John Doe");

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleLike = () => {
    if (selectedPost) {
      toggleFavorite(selectedPost);
      scale.value = withSpring(1.3, { damping: 3 }, () => {
        scale.value = withSpring(1, { damping: 5 });
      });
    }
  };

const renderGalleryItem = ({ item }: { item: Post }) => (
  <TouchableOpacity onPress={() => setSelectedPost(item)} style={styles.postContainer}>
    <Image source={{ uri: item.image }} style={styles.favoriteImage} />
    <View style={styles.favoriteUserInfo}>
      <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
      <View style={{ marginLeft: 8 }}>
        <Text style={styles.favoriteUserName}>{item.user.name}</Text>
        <Text style={styles.favoriteTimeAgo}>{timeSince(item.createdAt)}</Text>
      </View>
    </View>
  </TouchableOpacity>
);


  const renderFavoriteItem = ({ item }: { item: Post }) => (
    <TouchableOpacity onPress={() => setSelectedPost(item)} style={styles.postContainer}>
      <Image source={{ uri: item.image }} style={styles.favoriteImage} />
      <View style={styles.favoriteUserInfo}>
        <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.favoriteUserName}>{item.user.name}</Text>
          <Text style={styles.favoriteTimeAgo}>{timeSince(item.createdAt)}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
      ) : favorites.length === 0 ? (
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
      )}

      {/* Modal */}
      <Modal visible={!!selectedPost} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedPost && (
              <>
                <Image
                  source={{ uri: selectedPost.image }}
                  style={styles.modalImage}
                />
                {selectedPost.title && (
                  <Text style={styles.modalTitle}>{selectedPost.title}</Text>
                )}
                <View style={styles.modalInfo}>
                  <View style={styles.statsRow}>
                    <View style={styles.statColumn}>
                      <Text style={styles.statLabel}>Likes</Text>
                      <Text style={styles.statValue}>
                        {Math.floor(Math.random() * 100)}
                      </Text>
                    </View>
                    <View style={styles.statColumn}>
                      <Text style={styles.statLabel}>Conversations</Text>
                      <Text style={styles.statValue}>
                        {Math.floor(Math.random() * 100)}
                      </Text>
                    </View>
                    <View style={styles.statColumn}>
                      <Text style={styles.statLabel}>Follows</Text>
                      <Text style={styles.statValue}>
                        {Math.floor(Math.random() * 100)}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={handleLike}
                    style={styles.likeButton}
                    activeOpacity={0.8}
                  >
                    <Animated.View style={animatedStyle}>
                      <Ionicons
                        name={
                          favorites.some((p) => p.id === selectedPost?.id)
                            ? "heart"
                            : "heart-outline"
                        }
                        size={32}
                        color="red"
                      />
                    </Animated.View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setSelectedPost(null)}
                    style={styles.closeModal}
                  >
                    <Text style={styles.closeText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  favoriteImage: {
    width: 300,
    height: 200,
    borderRadius: 15,
    marginVertical: 10,
  },
  favoriteUserInfo: {
    position: "absolute",
    top: 15,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  favoriteUserName: {
    color: "#fff",
    fontFamily: "Poppins_700Bold",
  },
  favoriteTimeAgo: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#eee",
    marginTop: 2,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    padding: 10,
  },
  modalInfo: {
    padding: 20,
    alignItems: "center",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 5,
  },
  statValue: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  likeButton: {
    marginTop: 15,
    marginBottom: 10,
  },
  statColumn: {
    alignItems: "center",
    minWidth: 90,
    maxWidth: 120,
    marginHorizontal: 5,
  },
  closeModal: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: "#404040",
    borderRadius: 25,
  },
  closeText: {
    fontFamily: "Poppins_700Bold",
    color: "#fff",
    fontSize: 16,
  },
});
