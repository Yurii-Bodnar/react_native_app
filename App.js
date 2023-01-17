import { NavigationContainer, useRoute } from "@react-navigation/native";
import react from "react";
import React, { useState } from "react";

import useCachedResources from "./hooks/useCachedResources";
import Routes from "./Routes/Routes.js";

export default function App() {
  const [isAuth, setIsAuth] = useState(true);
  const routing = Routes(isAuth);
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return <NavigationContainer>{routing}</NavigationContainer>;
  }
}
