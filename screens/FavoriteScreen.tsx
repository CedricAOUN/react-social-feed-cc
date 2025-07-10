import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Post } from "../types";

const { width } = Dimensions.get("window");
const IMAGE_WIDTH = width * 0.9;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.75;

const timeSince = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days >= 1) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours >= 1) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes >= 1) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "just now";
};

type Props = {
  favorites: Post[];
  toggleFavorite: (post: Post) => void;
};

export default function FavoritesScreen({ favorites, toggleFavorite }: Props) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [stats, setStats] = useState<{
    likes: number;
    conversations: number;
    follows: number;
  } | null>(null);

  useEffect(() => {
    if (selectedPost) {
      setStats({
        likes: Math.floor(Math.random() * 100),
        conversations: Math.floor(Math.random() * 100),
        follows: Math.floor(Math.random() * 100),
      });
    } else {
      setStats(null);
    }
  }, [selectedPost]);

  const scale = useSharedValue(1);

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

  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.postContainer}>
      <TouchableOpacity onPress={() => setSelectedPost(item)}>
        <Image source={{ uri: item.image }} style={styles.favoriteImage} />
      </TouchableOpacity>

      <View style={styles.userInfo}>
        <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.timeAgo}>{timeSince(item.createdAt)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
      />

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
                        {stats ? stats.likes : "..."}
                      </Text>
                    </View>
                    <View style={styles.statColumn}>
                      <Text style={styles.statLabel}>Conversations</Text>
                      <Text style={styles.statValue}>
                        {stats ? stats.conversations : "..."}
                      </Text>
                    </View>
                    <View style={styles.statColumn}>
                      <Text style={styles.statLabel}>Follows</Text>
                      <Text style={styles.statValue}>
                        {stats ? stats.follows : "..."}
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
                          favorites.some((p) => p.id === selectedPost.id)
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
    alignItems: "center",
  },
  favoriteImage: {
    width: 300,
    height: 200,
    borderRadius: 15,
    marginVertical: 10,
  },
  postContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  userInfo: {
    position: "absolute",
    top: 15,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fff",
  },
  userName: {
    color: "#fff",
    fontFamily: "Poppins_700Bold",
  },
  timeAgo: {
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
  statLabel: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: "#404040",
    textAlign: "center",
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
    flexGrow: 1,
  },
  closeModal: {
    marginBottom: 10,
    padding: 10,
  },
  closeText: {
    fontFamily: "Poppins_700Bold",
    color: "#404040",
  },
});
