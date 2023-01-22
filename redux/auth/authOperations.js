import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../../fireBase/config";

export const authRegister = createAsyncThunk(
  "auth/register",
  async (user, thunkApi) => {
    console.log("user:", user);
    const { login, email, password, image } = user;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // const url = await uploadPhoto(image);
      await updateProfile(auth.currentUser, {
        displayName: login,
        // photoURL: url,
      });
      // console.log("url:", url);
      return {
        // login: user.displayName,
        login,
        email: user.email,
        userId: user.uid,
        // photoURL: "",
      };
    } catch (error) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const authLogin = createAsyncThunk(
  "auth/login",
  async (user, thunkApi) => {
    const { login, email, password } = user;
    console.log(login, email, password);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(login);
      return {
        login: user.displayName,
        email: user.email,
        userId: user.uid,
        photoURL: user.photoURL,
      };
    } catch (error) {
      console.log(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const logOut = createAsyncThunk("auth/logOut", async (_, thunkApi) => {
  try {
    signOut(auth);
  } catch (error) {
    console.log(error.message);
    return thunkApi.rejectWithValue(error.message);
  }
});
