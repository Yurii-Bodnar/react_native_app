import { useState } from "react";

import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen";
import PostScreen from "../Screens/PostScreen";
import Home from "../Screens/Home";
import ProfileScreen from "../Screens/ProfileScreen";
import CreatePostsScreen from "../Screens/CreatePostsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const Routes = (isAuth) => {
  const AuthStack = createNativeStackNavigator();
  const mainTab = createBottomTabNavigator();

  return !isAuth ? (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
        isAuth={isAuth}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={RegistrationScreen}
      />
    </AuthStack.Navigator>
  ) : (
    <mainTab.Navigator
      // barStyle={{ backgroundColor: "tomato" }}
      activeColor="#FF6C00"
      screenOptions={{
        tabBarShowLabel: false,

        tabBarStyle: [
          {
            height: 83,
          },
          // null,
        ],
      }}
    >
      <mainTab.Screen
        options={{
          headerTitleAlign: "center",
          tabBarIcon: ({ focused, size, color }) => (
            <Feather
              name="grid"
              size={24}
              // color="#FFFFFF"
              color={color}
              style={{
                activeColor: "#FF6C00",
                // backgroundColor: "#FF6C00",
                padding: 16,
                borderRadius: 20,
              }}
            />
          ),
        }}
        name="Post"
        component={PostScreen}
      />
      <mainTab.Screen
        options={{
          headerTitleAlign: "center",
          headerRight: () => (
            <MaterialIcons
              name="logout"
              size={24}
              color={"#BDBDBD"}
              style={{ marginRight: 10 }}
            />
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <Feather
              name="plus"
              size={24}
              // color="#FFFFFF"
              color={color}
              style={
                {
                  // backgroundColor: "#FF6C00",
                  // padding: 16,
                  // borderRadius: 20,
                }
              }
            />
          ),
        }}
        name="CreatePost"
        component={CreatePostsScreen}
      />
      <mainTab.Screen
        options={{
          headerShown: false,

          tabBarIcon: ({ focused, size, color }) => (
            <Feather
              name="user"
              size={24}
              // color="#FFFFFF"
              color={color}
              style={
                {
                  // backgroundColor: "#FF6C00",
                  // width: 70,
                  // height: 40,
                  // display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center",
                  // textAlign: "center",
                  // paddingTop: 14,
                  // paddingBottom: 14,
                  // paddingHorizontal: 29,
                  // borderRadius: 20,
                  // marginTop: 9,
                  // marginBottom: 34,
                }
              }
            />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </mainTab.Navigator>
  );
};

export default Routes;
