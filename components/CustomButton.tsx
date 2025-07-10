import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RouteParamList } from "../routes";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomButton = ({ navPath }: { navPath: keyof RouteParamList }) => {
  const navigation = useNavigation<NavigationProp<RouteParamList>>();
  
  const handlePress = () => {
    (navigation as any).getParent()?.navigate(navPath);
  };

  return (
    <TouchableOpacity style={styles.customButton} onPress={handlePress} activeOpacity={0.7}>
      <Ionicons style={styles.buttonIcon} name="add-circle-outline" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  customButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#404040',
    marginHorizontal: 5,
    marginBottom: 100,
    borderRadius: 15,
    height: 60,
    width: 60,
    position: 'absolute',
    top: -30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    transform: [{ rotateZ: '45deg' }],
  },
  buttonIcon: {
    color: 'white',
    fontSize: 32,
    transform: [{ rotateZ: '-45deg' }],
  },
});
