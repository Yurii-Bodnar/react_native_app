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
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const initialState = {
  email: null,
  password: null,
};

const LoginScreen = ({ navigation, isAuth }) => {
  const [login, setLogin] = useState(initialState);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);
  const [isHidden, setIsHidden] = useState(true);
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isPasswordActive, setIsPasswordActive] = useState(false);
  console.log(navigation);

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
    setLogin(initialState);
    console.log(login);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <ImageBackground
          style={styles.bg}
          source={require("../assets/images/photo-bg.png")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                width: dimensions,
              }}
            >
              <View style={styles.textWrapper}>
                <Text style={styles.text}>Login</Text>
              </View>
              <View style={{ marginBottom: 10 }}>
                <TextInput
                  value={login.email}
                  onChangeText={(value) => {
                    setLogin((prevState) => ({
                      ...prevState,
                      email: value,
                    }));
                  }}
                  onFocus={() => {
                    setIsEmailActive(true);
                  }}
                  onBlur={() => setIsEmailActive(false)}
                  style={{
                    ...styles.input,
                    borderColor: isEmailActive ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder={"Email"}
                  placeholderTextColor="#BDBDBD"
                />
              </View>
              <View
                style={{
                  marginBottom: 43,
                }}
              >
                <TextInput
                  value={login.password}
                  onChangeText={(value) => {
                    setLogin((prevState) => ({
                      ...prevState,
                      password: value,
                    }));
                  }}
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

              <TouchableOpacity
                onPress={onSubmit}
                activeOpacity={0.7}
                style={styles.signUpBtn}
              >
                <Text style={styles.textBtn}>Sign in</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.linkRegisterBtn}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={styles.textRegister}>
                  {" "}
                  Don't have an account? Register
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    justifyContent: "flex-end",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  form: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },
  textWrapper: {
    alignItems: "center",
    marginBottom: 32,
  },
  text: {
    paddingTop: 32,
    fontFamily: "Roboto-medium",
    fontWeight: "500",
    fontSize: 30,
    color: "#212121",
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
    fontWeight: "400",
    fontSize: 16,
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
    fontFamily: "Roboto-regular",
    fontWeight: "400",
    fontSize: 16,
    color: "#FFFFFF",
  },
  linkRegisterBtn: {
    alignItems: "center",
  },
  textRegister: {
    fontFamily: "Roboto-regular",
    fontWeight: "400",
    fontSize: 16,
    color: "#1B4371",
    paddingBottom: 144,
  },
});

export default LoginScreen;
