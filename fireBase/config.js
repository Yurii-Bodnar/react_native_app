import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// export const firebaseConfig = {
//   apiKey: "AIzaSyB09ulDOcKsuoCWxbquY7Um9XAkb1yR9XY",
//   authDomain: "rn-first-hw.firebaseapp.com",
//   projectId: "rn-first-hw",
//   storageBucket: "rn-first-hw.appspot.com",
//   messagingSenderId: "544860073556",
//   appId: "1:544860073556:web:2ed4ed4ba62d3e027547c1",
//   measurementId: "G-QZ98HJV48X",
// };

const firebaseConfig = {
  apiKey: "AIzaSyA0R4gpQQj2y3UWDoBBzlcZwqlIbrzz86g",
  authDomain: "react-native-project-b615b.firebaseapp.com",
  projectId: "react-native-project-b615b",
  storageBucket: "react-native-project-b615b.appspot.com",
  messagingSenderId: "684356984338",
  appId: "1:684356984338:web:7c6b98408e37e2c88e82cb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
