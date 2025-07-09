import { StyleSheet, Text, View, Image, FlatList, Dimensions } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from "expo-status-bar";
import { RouteParamList } from "../routes";

type Props = NativeStackScreenProps<RouteParamList, 'Feed'>;

type Post = {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  image: string;
};

const DATA: Post[] = [
  {
    id: "1",
    user: {
      name: "Alice Dupont",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    image: "https://picsum.photos/id/1011/400/300",
  },
  {
    id: "2",
    user: {
      name: "Bob Martin",
      avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    },
    image: "https://picsum.photos/id/1015/400/300",
  },
  {
    id: "3",
    user: {
      name: "Clara Morel",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    image: "https://picsum.photos/id/1016/400/300",
  },
];

const { width } = Dimensions.get("window");
const IMAGE_WIDTH = width * 0.9;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.75;

export default function FeedScreen({ navigation }: Props) {
  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.image }} style={styles.postImage} />

      <View style={styles.userInfo}>
        <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
        <Text style={styles.userName}>{item.user.name}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 20 }}
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
  },
  postContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  postImage: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 15,
  },
  userInfo: {
    position: "absolute",
    top: 10,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
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
    marginLeft: 8,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
});
