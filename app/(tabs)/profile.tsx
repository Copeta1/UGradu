import { useAuth } from "@/hooks/useAuth";
import { LogOut, Mail, User } from "lucide-react-native";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const { userData, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Odjava", "Jesi li siguran da se želiš odjaviti?", [
      { text: "Odustani", style: "cancel" },
      { text: "Odjavi se", style: "destructive", onPress: logout },
    ]);
  };

  return (
    <View className="flex-1  bg-white px-4 pt-16">
      <View className="items-center mb-8">
        <View className="w-24 h-24 bg-orange-100 rounded-full items-center justify-center mb-4">
          <User size={40} color="#f97316" />
        </View>
        <Text className="text-2xl font-bold text-gray-900">
          {userData?.firstName} {userData?.lastName}
        </Text>
        <Text className="text-gray-500 mt-1">{userData?.email}</Text>
      </View>

      <View className="bg-gray-50 rounded-2xl p-4 mb-4">
        <View className="flex-row items-center gap-3 py-3 border-b border-gray-100">
          <User size={18} color="#f97316" />
          <View>
            <Text className="text-xs text-gray-500">Ime i prezime</Text>
            <Text className="text-gray-900 font-medium">
              {userData?.firstName} {userData?.lastName}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center gap-3 py-3">
          <Mail size={18} color="#f97316" />
          <View>
            <Text className="text-xs text-gray-500">Email</Text>
            <Text className="text-gray-900 font-medium">{userData?.email}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        className="flex-row items-center justify-center gap-2 bg-red-50 border border-red-100 rounded-2xl py-4"
      >
        <LogOut size={18} color="#ef4444" />
        <Text className="text-red-500 font-bold">Odjavi se</Text>
      </TouchableOpacity>
    </View>
  );
}
