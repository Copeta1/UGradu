import { useAuth } from "@/hooks/useAuth";
import { db } from "@/services/firebase";
import { useCityStore } from "@/store/cityStore";
import { Event } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { ArrowLeft, Calendar, Heart, MapPin } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  const { addFavorite, removeFavorite, userData } = useAuth();
  const { favorites } = useCityStore();

  const isFavorite = favorites.includes(id as string);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const docRef = doc(db, "events", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEvent({ id: docSnap.id, ...docSnap.data() } as Event);
        }
      } catch (error) {
        console.error("Greška:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  if (!event) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">Event nije pronađen.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="h-64 bg-gray-900 justify-end">
        <View className="absolute top-12 left-4 right-4 flex-row justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-black/40 p-2 rounded-full"
          >
            <ArrowLeft size={22} color="white" />
          </TouchableOpacity>
          <View className="flex-row gap-2">
            {userData?.role === "organizer" && (
              <TouchableOpacity
                onPress={() => router.push(`/event/edit/${id}` as any)}
                className="bg-black/40 px-3 py-2 rounded-full"
              >
                <Text className="text-white font-bold text-sm">Uredi</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() =>
                isFavorite
                  ? removeFavorite(id as string)
                  : addFavorite(id as string)
              }
              className="bg-black/40 p-2 rounded-full"
            >
              <Heart
                size={22}
                color={isFavorite ? "#f97316" : "white"}
                fill={isFavorite ? "#f97316" : "transparent"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="p-4">
          <View className="bg-orange-500 self-start px-2 py-1 rounded mb-2">
            <Text className="text-white text-xs font-bold">
              {event.category.toUpperCase()}
            </Text>
          </View>
          <Text className="text-white text-2xl font-bold">{event.title}</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4 pt-4">
        <View className="flex-row items-center gap-2 mb-3">
          <MapPin size={16} color="#f97316" />
          <Text className="text-gray-600">{event.location.address}</Text>
        </View>

        <View className="flex-row items-center gap-2 mb-6">
          <Calendar size={16} color="#f97316" />
          <Text className="text-gray-600">
            {new Date(event.date.seconds * 1000).toLocaleDateString("hr-HR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>

        <Text className="text-base font-bold text-gray-900 mb-2">O eventu</Text>
        <Text className="text-gray-600 leading-6">{event.description}</Text>

        <View className="mt-6 bg-orange-50 rounded-2xl p-4 flex-row justify-between items-center mb-8">
          <Text className="text-gray-600">Cijena ulaznice</Text>
          <Text className="text-orange-500 font-bold text-lg">
            {event.price}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
