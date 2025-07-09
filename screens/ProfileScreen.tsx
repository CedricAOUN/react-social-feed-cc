import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { RouteParamList } from "../routes";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

type Props = NativeStackScreenProps<RouteParamList, "Profile">;

export default function ProfileScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<'images' | 'favorites'>('images');

  return (
    <View style={styles.container}>
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
        <TouchableOpacity onPress={() => setActiveTab('images')}>
          <Ionicons
            name="images-outline"
            size={28}
            color={activeTab === 'images' ? '#000' : '#888'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('favorites')}>
          <Ionicons
            name="heart-outline"
            size={28}
            color={activeTab === 'favorites' ? '#000' : '#888'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.contentPreview}>
        <Text style={styles.previewText}>
          {activeTab === 'images' ? 'Galerie d’images' : 'Favoris'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 60,
  },
  avatarWrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#404040",
    borderRadius: 15,
    height: 60,
    width: 60,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    transform: [{ rotateZ: "45deg" }],
    overflow: 'hidden',
  },
  avatarImage: {
    height: 60,
    width: 60,
    transform: [{ rotateZ: "-45deg" }],
  },
  name: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    marginTop: 10,
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
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },
  previewText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#555",
  },
});
