import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Post } from "./FeedScreen";

type Props = {
  favorites: Post[];
};

export default function FavoriteScreen({ favorites }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Image source={{ uri: item.image }} style={styles.favoriteImage} />
        )}
        contentContainerStyle={{ paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    marginTop: 20,
  },
  favoriteImage: {
    width: 300,
    height: 200,
    borderRadius: 15,
    marginVertical: 10,
  },
});
