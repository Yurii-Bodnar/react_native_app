import { useEffect, useState } from "react";
import {
  TextInput,
  ImageBackground,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";

const initialState = {
  login: null,
  email: null,
  password: null,
};

const RegistrationScreen = ({ navigation }) => {
  const [register, setRegister] = useState(initialState);
  const [isHidden, setIsHidden] = useState(true);
  const [loginActive, setIsLoginActive] = useState(false);
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isPasswordActive, setIsPasswordActive] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);
  // const [isAuth, setIsAuth] = useState(false);
  // const screen = Dimensions.get("screen").scale;
  useEffect(() => {
    const onChangeWidth = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };
    const widthListener = Dimensions.addEventListener("change", onChangeWidth);
    return () => {
      widthListener.remove();
    };
  }, []);

  const onSubmit = () => {
    Keyboard.dismiss();
    setRegister(initialState);
    setIsAuth(true);
    navigation.navigate("Post");
    // console.log(register);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.bg}
          source={require("../assets/images/photo-bg.png")}
        >
          {/* <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          > */}
          <View style={styles.containerForm}>
            <View style={styles.form}>
              <View style={styles.avatarContainer}>
                <TouchableWithoutFeedback>
                  <Image
                    style={styles.addAvatar}
                    source={require("../assets/images/add.png")}
                  />
                </TouchableWithoutFeedback>
              </View>
              <Text style={styles.text}>Registration</Text>
              {/* <View style={{ marginBottom: isKeyboard ? 32 : 0 }}> */}
              <View style={{ marginBottom: 10 }}>
                <TextInput
                  value={register.login}
                  onChangeText={(value) =>
                    setRegister((prevState) => ({
                      ...prevState,
                      login: value,
                    }))
                  }
                  onFocus={() => {
                    setIsLoginActive(true);
                  }}
                  onBlur={() => setIsLoginActive(false)}
                  style={{
                    ...styles.input,
                    borderColor: loginActive ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder={"Login"}
                  placeholderTextColor="#BDBDBD"
                  //   onFocus={() => setIsKeyboard(true)}
                />
              </View>
              <View style={{ marginBottom: 10 }}>
                <TextInput
                  value={register.email}
                  onChangeText={(value) =>
                    setRegister((prevState) => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                  onFocus={() => {
                    setIsEmailActive(true);
                  }}
                  onBlur={() => {
                    setIsEmailActive(false);
                  }}
                  style={{
                    ...styles.input,
                    borderColor: isEmailActive ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder={"Email"}
                  placeholderTextColor="#BDBDBD"
                  //   onFocus={() => setIsKeyboard(true)}
                />
              </View>
              <View style={{ marginBottom: 43 }}>
                <TextInput
                  value={register.password}
                  onChangeText={(value) =>
                    setRegister((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                  onFocus={() => {
                    setIsPasswordActive(true);
                  }}
                  onBlur={() => setIsPasswordActive(false)}
                  style={{
                    ...styles.input,
                    borderColor: isPasswordActive ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder={"Password"}
                  placeholderTextColor="#BDBDBD"
                  secureTextEntry={isHidden}
                  //   onFocus={() => setIsKeyboard(true)}
                />
                {isHidden ? (
                  <TouchableOpacity
                    onPress={() => setIsHidden(false)}
                    style={styles.showPass}
                  >
                    <Text style={styles.showPassText}>Show</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setIsHidden(true)}
                    style={styles.showPass}
                  >
                    <Text style={styles.showPassText}>Hide</Text>
                  </TouchableOpacity>
                )}
              </View>
              {/* </View> */}

              <TouchableOpacity
                onPress={onSubmit}
                activeOpacity={0.7}
                style={styles.signUpBtn}
              >
                <Text style={styles.textBtn}>Sign in</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                activeOpacity={0.7}
                style={styles.linkLoginBtn}
              >
                <Text style={styles.textLoginBtn}>
                  {" "}
                  Already have an account? Log in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* </KeyboardAvoidingView> */}
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

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
  containerForm: {
    flex: 0.3,
    flexDirection: "row",
  },
  form: {
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
  addAvatar: {
    width: 25,
    height: 25,
    position: "absolute",
    bottom: 15,
    right: -12,
  },
  text: {
    width: "auto",
    textAlign: "center",
    paddingBottom: 33,
    paddingTop: 92,
    fontFamily: "Roboto-medium",
    fontWeight: "500",
    fontSize: 30,
    letterSpacing: 0.01,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    borderRadius: 8,
    marginHorizontal: 16,
    color: "#212121",
    padding: 16,

    fontFamily: "Roboto-regular",
    fontWeight: "400",
    fontSize: 16,
    backgroundColor: "#F6F6F6",
  },
  showPass: { position: "absolute", right: 33, bottom: 16 },
  showPassText: {
    fontFamily: "Roboto-regular",
    // fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    // line-height: 19px;
    color: "#1B4371",
  },
  signUpBtn: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    height: 51,
    justifyContent: "center",
    alignItems: "center",
  },
  textBtn: {
    textAlign: "center",
    fontFamily: "Roboto-regular",
    // fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    // lineHeight: 19 / 16,
    color: "#FFFFFF",
  },
  linkLoginBtn: {
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 16,
    marginBottom: 78,
  },
  textLoginBtn: {
    fontFamily: "Roboto-regular",
    // fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    color: "#1B4371",
    // paddingBottom: 144,
  },
});

export default RegistrationScreen;
