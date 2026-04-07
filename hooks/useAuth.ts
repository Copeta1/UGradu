import { auth, db } from "@/services/firebase";
import { useCityStore } from "@/store/cityStore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const {
    addFavorite: addFavoriteLocal,
    removeFavorite: removeFavoriteLocal,
    setFavorites,
  } = useCityStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const docSnap = await getDoc(doc(db, "users", firebaseUser.uid));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setFavorites(data.favorites ?? []);
        }
      } else {
        setUserData(null);
        setFavorites([]);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      firstName,
      lastName,
      email,
      role: "user",
      favorites: [],
      createdAt: new Date(),
    });
  };

  const logout = async () => {
    await signOut(auth);
  };

  const addFavorite = async (eventId: string) => {
    if (!auth.currentUser) return;
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      favorites: arrayUnion(eventId),
    });
    addFavoriteLocal(eventId);
  };

  const removeFavorite = async (eventId: string) => {
    if (!auth.currentUser) return;
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      favorites: arrayRemove(eventId),
    });
    removeFavoriteLocal(eventId);
  };

  return {
    login,
    register,
    logout,
    user,
    loading,
    userData,
    addFavorite,
    removeFavorite,
  };
}
