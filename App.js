import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import { Provider } from "react-redux";
import MyApp from "./component/MyApp";

import useCachedResources from "./hooks/useCachedResources";
import { store } from "./redux/store";
import Routes from "./Routes/Routes.js";

export default function App() {
  // const [isAuth, setIsAuth] = useState(false);

  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <MyApp />
      </Provider>
    );
  }
}
