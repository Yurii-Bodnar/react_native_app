import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../fireBase/config";
import { updateLoginState, updateUserData } from "../redux/auth/authReducer";
import Routes from "../Routes/Routes";

const MyApp = () => {
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          updateUserData({
            login: user.displayName,
            email: user.email,
            userId: user.uid,
            // photoURL: user.photoURL,
          })
        );
        dispatch(updateLoginState(true));
      } else {
        dispatch(updateLoginState(false));
        // dispatch(updateLoginState(false));
      }
    });
  }, []);
  const routing = Routes(isAuth);
  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default MyApp;
