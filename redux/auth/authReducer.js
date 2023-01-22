import { createSlice } from "@reduxjs/toolkit";
import { authLogin, authRegister, logOut } from "./authOperations";

const initialStateUser = {
  user: { login: null, email: null, userId: null, photoURL: null },
  error: null,
  isLoggedIn: false,
  isLoading: false,
  route: false,
};

const pendingHandler = (state, action) => {
  state.isLoading = true;
  state.error = null;
};

const rejectedHandler = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialStateUser,

  reducers: {
    updateUserData(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
    updateLoginState(state, action) {
      state.isLoggedIn = action.payload;
    },
    updateRoute(state, action) {
      state.route = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authRegister.pending, pendingHandler);
    builder.addCase(authRegister.rejected, rejectedHandler);
    builder.addCase(authRegister.fulfilled, (state, action) => {
      const { email, login, photoURL, userId } = action.payload;
      state.user = { email, login, userId, photoURL };
      state.error = null;
      state.isLoading = false;
      state.isLoggedIn = true;
    });
    builder.addCase(authLogin.pending, pendingHandler);
    builder.addCase(authLogin.rejected, rejectedHandler);
    builder.addCase(authLogin.fulfilled, (state, action) => {
      const { email, login, photoURL, userId } = action.payload;
      state.user = {
        email,
        login,
        photoURL,
        userId,
      };
      state.isLoading = false;
      state.error = null;
      state.isLoggedIn = true;
    });
    builder.addCase(logOut.pending, (state, action) => {
      state.error = false;
    });
    builder.addCase(logOut.rejected, rejectedHandler),
      builder.addCase(logOut.fulfilled, (state, action) => {
        state.user = { ...initialStateUser };
      });
  },
});
export const authReducer = authSlice.reducer;
export const { updateUserData, updateLoginState, updateRoute } =
  authSlice.actions;
