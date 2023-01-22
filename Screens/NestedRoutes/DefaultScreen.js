import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../fireBase/config";

const DefaultScreen = ({ navigation, route }) => {
  const [posts, setPost] = useState([]);

  const getAllPost = async () => {
    onSnapshot(collection(db, "posts"), (data) => {
      setPost(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };
  useEffect(() => {
    getAllPost();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={styles.imgWrap}>
            <Image source={{ uri: item.photo }} style={styles.img} />
            <View>
              <Text>{item.title}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Comments", { postId: item.id })
              }
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Text>0</Text>
                <Ionicons name="chatbubble-outline" size={18} color="#BDBDBD" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Map", { location: item.location })
              }
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  // justifyContent: "flex-end",

                  alignItems: "center",
                }}
              >
                <SimpleLineIcons
                  size={16}
                  name="location-pin"
                  color="#BDBDBD"
                />
                <Text>{item.address}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default DefaultScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#BDBDBD",
  },
  imgWrap: {
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  img: { width: 345, height: 240, borderRadius: 8 },
});
