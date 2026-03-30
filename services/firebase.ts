import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeJetoH3IhQj_VJH7YfP1HwxGtwpJxBYE",
  authDomain: "ugradu-47633.firebaseapp.com",
  projectId: "ugradu-47633",
  storageBucket: "ugradu-47633.firebasestorage.app",
  messagingSenderId: "368765201386",
  appId: "1:368765201386:web:2267049663401d54566093",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth: ReturnType<typeof initializeAuth>;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} catch {
  const { getAuth } = require("firebase/auth");
  auth = getAuth(app);
}

export { auth };
export const db = getFirestore(app);
