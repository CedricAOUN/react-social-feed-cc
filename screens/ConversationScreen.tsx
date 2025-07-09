import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from "expo-status-bar";
import { RouteParamList } from "../routes";

type Props = NativeStackScreenProps<RouteParamList, 'Conversations'>;

export default function ConversationsScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>Conversations Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});