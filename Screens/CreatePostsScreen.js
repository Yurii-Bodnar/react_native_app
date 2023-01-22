import react, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Camera } from "expo-camera";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { db, storage } from "../fireBase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useSelector } from "react-redux";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [title, setTitle] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const { user } = useSelector((state) => state.auth);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    let location = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    let address = await Location.reverseGeocodeAsync(location.coords);
    console.log(address);
    setAddress(address[0].city + ", " + address[0].country);
  };

  useEffect(() => {
    (async () => {
      await requestPermission();
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
    })();
  }, []);
  // console.log(location);
  const metadata = {
    contentType: "image/jpeg",
  };

  const uploadPhoto = async () => {
    const photoRef = ref(storage, "photos/" + Date.now().toString() + ".jpg");
    const response = await fetch(photo);
    const file = await response.blob();
    //const uniq = Date.now().toString();
    //const data = await storage.re;
    console.log("file", file);
    const uploadTask = await uploadBytes(photoRef, file, metadata);
    const url = await getDownloadURL(uploadTask.ref);

    return url;
  };

  const sendPhoto = async () => {
    try {
      const url = await uploadPhoto();
      console.log("Photo available at", url);
      const post = {
        photo: url,
        title: title,
        location,
        address,
        userId: user.userId,
        login: user.login,
        commentsCount: 0,
        likes: 0,
      };
      console.log("post", db);
      const docRef = await addDoc(collection(db, "posts"), post);
      console.log("Document written with ID: ", docRef.id);

      navigation.navigate("Default");
    } catch (error) {
      console.log(error.message);
    }
  };
  // address, location, title
  return (
    <View style={styles.container}>
      <View style={styles.cameraWrap}>
        <Camera style={styles.camera} ref={setCamera}>
          {photo && (
            <View style={styles.photoContainer}>
              <Image style={styles.takePhoto} source={{ uri: photo }} />
            </View>
          )}

          <TouchableOpacity onPress={takePhoto}>
            <View style={styles.snapContainer}>
              <Feather name="camera" size={24} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </Camera>
      </View>
      <View style={styles.titleWrap}>
        <TextInput
          style={styles.title}
          placeholder="Title"
          placeholderTextColor="#BDBDBD"
          // keyboardType="visible-password"
          value={title}
          onChangeText={(value) => setTitle(value)}
        />
      </View>
      <View style={styles.locationWrap}>
        <View style={styles.locationImg}>
          <SimpleLineIcons size={16} name="location-pin" color="#BDBDBD" />
        </View>
        <TextInput
          style={styles.location}
          placeholder="     Location"
          placeholderTextColor="#BDBDBD"
          // keyboardType="visible-password"
          value={address}
          onChangeText={() => {}}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={sendPhoto}
          style={photo ? styles.sendBtn : styles.sendBtnDisabled}
          disabled={!photo}
        >
          <Text style={photo ? styles.btnText : styles.btnTextDisabled}>
            Create post
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#BDBDBD",
  },
  cameraWrap: {
    overflow: "hidden",
    height: "40%",
    marginHorizontal: 16,
    marginTop: 32,
    borderRadius: 8,
  },
  camera: { height: "100%", justifyContent: "center", alignItems: "center" },
  snapContainer: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  photoContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
  takePhoto: { height: 200, width: 200 },
  titleWrap: { marginTop: 33, height: 50 },
  title: {
    fontFamily: "Roboto-regular",
    fontSize: 16,
    marginHorizontal: 16,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  locationImg: {
    position: "absolute",
    top: 14,
    left: 15,
    // width: 16,
    // height: 18,
  },
  locationWrap: {
    height: 50,
    marginTop: 17,
  },
  location: {
    fontFamily: "Roboto-regular",
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingVertical: 15,
    marginHorizontal: 16,
  },
  sendBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    height: 50,
    marginTop: 32,
    marginHorizontal: 16,
  },
  sendBtnDisabled: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    height: 50,
    marginTop: 32,
    marginHorizontal: 16,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto-regular",
  },
  btnTextDisabled: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto-regular",
  },
});
export default CreatePostsScreen;
