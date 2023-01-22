import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import CommentsScreen from "./NestedRoutes/CommentsScreen";
import DefaultScreen from "./NestedRoutes/DefaultScreen";
import MapScreen from "./NestedRoutes/MapScreen";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/auth/authOperations";

const NestedRouts = createNativeStackNavigator();
const PostScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const handleLogOut = () => dispatch(logOut());
  // console.log(route.params);
  return (
    <NestedRouts.Navigator
      initialRouteName="Default"
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Roboto-medium",
          color: "#212121",
        },

        headerStyle: {
          backgroundColor: "#FFFFFF",
          borderBottomWidth: 1,
          borderBottomColor: "#E8E8E8",
        },
      }}
    >
      <NestedRouts.Screen
        name="Default"
        component={DefaultScreen}
        options={{
          title: "Posts",
          headerLeft: () => {},
          headerRight: () => (
            <TouchableOpacity onPress={handleLogOut}>
              <MaterialIcons
                name="logout"
                size={24}
                color={"#BDBDBD"}
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          ),
          headerRightContainerStyle: {
            paddingRight: 10,
          },
        }}
      />
      <NestedRouts.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Comments",
          headerLeft: ({ focused, size, color }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Default")}>
              <Feather name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: {
            paddingLeft: 16,
          },
        }}
      />
      <NestedRouts.Screen
        name="Map"
        component={MapScreen}
        options={{ title: "Map" }}
      />
    </NestedRouts.Navigator>
  );
};

export default PostScreen;
