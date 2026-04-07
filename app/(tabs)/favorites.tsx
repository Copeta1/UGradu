import { useAuth } from "@/hooks/useAuth";
import { useEvents } from "@/hooks/useEvents";
import { useCityStore } from "@/store/cityStore";
import { useRouter } from "expo-router";
import { Heart, MapPin } from "lucide-react-native";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FavoritesScreen() {
  const router = useRouter();
  const { removeFavorite } = useAuth();
  const { selectedCity, favorites } = useCityStore();
  const { events, loading } = useEvents(selectedCity);

  const favoriteEvents = events.filter((e) => favorites.includes(e.id));

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  if (favoriteEvents.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Heart size={48} color="#e5e7eb" />
        <Text className="text-gray-400 mt-4 text-base">
          Nemaš spremljenih evenata
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)" as any)}
          className="mt-4 bg-orange-500 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-bold">Istraži evente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 pt-16 pb-4">
        <Text className="text-2xl font-bold text-gray-900">Favoriti</Text>
        <Text className="text-gray-500 mt-1">
          {favoriteEvents.length} spremljenih evenata
        </Text>
      </View>

      <FlatList
        data={favoriteEvents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/event/${item.id}` as any)}
            className="flex-row bg-white border border-gray-100 rounded-2xl p-3 mb-3 items-center"
          >
            <View className="w-16 h-16 bg-orange-100 rounded-xl mr-3" />
            <View className="flex-1">
              <Text className="font-bold text-gray-900 text-sm">
                {item.title}
              </Text>
              <View className="flex-row items-center gap-1 mt-1">
                <MapPin size={12} color="#9ca3af" />
                <Text className="text-gray-500 text-xs">
                  {item.location.address}
                </Text>
              </View>
              <View className="flex-row justify-between items-center mt-2">
                <Text className="text-orange-500 font-bold text-sm">
                  {item.price}
                </Text>
                <TouchableOpacity onPress={() => removeFavorite(item.id)}>
                  <Heart size={18} color="#f97316" fill="#f97316" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
