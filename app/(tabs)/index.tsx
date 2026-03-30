import { useAuth } from "@/hooks/useAuth";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const { logout } = useAuth();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-orange-500 mb-6">UGradu</Text>
      <TouchableOpacity
        className="bg-orange-500 rounded-xl px-6 py-3"
        onPress={logout}
      >
        <Text className="text-white font-bold">Odjavi se</Text>
      </TouchableOpacity>
    </View>
  );
}
