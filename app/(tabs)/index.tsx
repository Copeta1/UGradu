import CityPicker from "@/components/CityPicker";
import { CATEGORIES } from "@/constants/categories";
import { FAKE_EVENTS } from "@/constants/fakeEvents";
import { useAuth } from "@/hooks/useAuth";
import { useCityStore } from "@/store/cityStore";
import { useRouter } from "expo-router";
import { ChevronDown, Heart } from "lucide-react-native";
import { useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { userData } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("sve");
  const [cityPickerVisible, setCityPickerVisible] = useState(false);
  const { selectedCity, favorites, toggleFavorite } = useCityStore();
  const router = useRouter();

  const filteredEvents = FAKE_EVENTS.filter((event) => {
    const matchesCategory =
      selectedCategory === "sve" || event.category === selectedCategory;
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredEvent = FAKE_EVENTS.find((e) => e.isFeatured);

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 pt-12 pb-4">
        <View className="flex-row justify-between items-center mb-4 pt-6">
          <TouchableOpacity
            className="flex-row items-center gap-1"
            onPress={() => setCityPickerVisible(true)}
          >
            <Text className="text-lg font-bold text-gray-900">
              {selectedCity}
            </Text>
            <ChevronDown size={18} color="#f97316" />
          </TouchableOpacity>
          <Text>Dobro jutro, {userData?.firstName}!</Text>
        </View>

        <TextInput
          className="bg-gray-100 rounded-xl px-4 py-3 text-gray-900 text-base mb-4"
          placeholder="Pretraži evente..."
          placeholderTextColor="#9ca3af"
          value={search}
          onChangeText={setSearch}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setSelectedCategory(cat.id)}
              className={`mr-2 px-4 py-2 rounded-full ${
                selectedCategory === cat.id ? "bg-orange-500" : "bg-gray-100"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  selectedCategory === cat.id ? "text-white" : "text-gray-600"
                }`}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        ListHeaderComponent={
          <>
            {featuredEvent && (
              <View className="mb-4">
                <Text className="text-base font-bold text-gray-900 mb-2">
                  Istaknuto
                </Text>
                <View className="bg-gray-900 rounded-2xl p-4 h-40 justify-end">
                  <View className="bg-orange-500 self-start px-2 py-1 rounded mb-1">
                    <Text className="text-white text-xs font-bold">
                      VEČERAS
                    </Text>
                  </View>
                  <Text className="text-white font-bold text-lg">
                    {featuredEvent.title}
                  </Text>
                  <Text className="text-gray-400 text-sm">
                    {featuredEvent.location.address}
                  </Text>
                </View>
              </View>
            )}
            <Text className="text-base font-bold text-gray-900 mb-2">
              Svi eventi
            </Text>
          </>
        }
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
              <Text className="text-gray-500 text-xs mt-1">
                {item.location.address}
              </Text>
              <View className="flex-row justify-between items-center mt-2">
                <Text className="text-orange-500 font-bold text-sm">
                  {item.price}
                </Text>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                >
                  <Heart
                    size={18}
                    color={favorites.includes(item.id) ? "#f97316" : "#d1d5db"}
                    fill={
                      favorites.includes(item.id) ? "#f97316" : "transparent"
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <CityPicker
        visible={cityPickerVisible}
        onClose={() => setCityPickerVisible(false)}
      />
    </View>
  );
}
