import { collection, onSnapshot, query, where } from "firebase/firestore";
import react, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { db } from "../fireBase/config";
import { useDispatch, useSelector } from "react-redux";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const { userId, login, photoURL } = useSelector((state) => state.auth.user);

  const getUserPosts = async () => {
    const post = query(collection(db, "posts"), where("userId", "==", userId));
    onSnapshot(post, (data) =>
      setUserPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };
  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.bg}
        source={require("../assets/images/photo-bg.png")}
      >
        <View style={styles.containerProfile}>
          <View style={styles.contentWrap}>
            <View style={styles.avatarContainer}></View>
            <Text style={styles.text}>name</Text>
            <FlatList
              data={userPosts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={{
                    marginBottom: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      height: 250,
                      borderRadius: 8,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      source={{ uri: item.photo }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </View>
                  <View
                    style={{ marginTop: 8, width: "100%", marginBottom: 8 }}
                  >
                    <Text>{item.title}</Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      marginHorizontal: 16,
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 10,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                        onPress={() =>
                          navigation.navigate("Comments", { postId: item.id })
                        }
                      >
                        <Feather
                          name="message-circle"
                          size={24}
                          color={
                            +item.commentsCount > 0 ? "#FF6C00" : "#BDBDBD"
                          }
                        />
                        <Text>{item.commentsCount}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                        // onPress={() => {
                        //   addLike(item);
                        // }}
                      >
                        <Feather
                          name="thumbs-up"
                          size={24}
                          color={+item.likes > 0 ? "#FF6C00" : "#BDBDBD"}
                        />
                        <Text>{item.likes}</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                      onPress={() =>
                        navigation.navigate("Map", {
                          location: item.location,
                        })
                      }
                    >
                      <Feather name="map-pin" size={24} color="black" />
                      <Text>{item.address.split(", ")[1]}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  bg: {
    flex: 1,
    justifyContent: "center",
    // width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  containerProfile: {
    flex: 0.3,
    flexDirection: "row",
  },
  contentWrap: {
    position: "relative",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex: 1,
    backgroundColor: "#fff",
    height: 549,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    flex: 1,
    position: "absolute",
    top: -60,
    alignSelf: "center",
    // right: Dimensions.get("window").width / 2 - 60,
    marginHorizontal: "auto",
    borderRadius: 16,
  },
});
