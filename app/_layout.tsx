import { useAuth } from "@/hooks/useAuth";
import { registerForPushNotifications } from "@/services/notificationsService";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import "../global.css";

export default function RootLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/(auth)" as any);
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [user, loading]);

  useEffect(() => {
    if (user) {
      registerForPushNotifications()
        .then((token) => {
          if (token) {
            console.log("Push token:", token);
          }
        })
        .catch(() => {
          console.log("Push notifikacije nisu dostupne u Expo Go.");
        });
    }
  }, [user]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return <Slot />;
}
