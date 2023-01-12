import RegistrationScreen from "./Screens/RegistrationScreen";
import useCachedResources from "./hoocks/useCachedResources";
import LoginScreen from "./Screens/LoginScreen";
export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return <RegistrationScreen />;
  }
}
