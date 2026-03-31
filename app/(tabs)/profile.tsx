import { useAuth } from "@/hooks/useAuth";
import { Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const { logout } = useAuth();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold mb-6">Profile</Text>
      <TouchableOpacity
        className="bg-orange-500 rounded-xl px-6 py-3"
        onPress={logout}
      >
        <Text className="text-white font-bold">Odjavi se</Text>
      </TouchableOpacity>
    </View>
  );
}
