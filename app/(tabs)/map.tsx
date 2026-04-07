import { useEvents } from "@/hooks/useEvents";
import { useCityStore } from "@/store/cityStore";
import { useRouter } from "expo-router";
import { MapPin } from "lucide-react-native";
import { ActivityIndicator, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default function MapScreen() {
  const router = useRouter();
  const { selectedCity } = useCityStore();
  const { events, loading } = useEvents(selectedCity);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 45.815,
          longitude: 15.982,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {events.map((event) => (
          <Marker
            key={event.id}
            coordinate={{
              latitude: event.location.lat,
              longitude: event.location.lng,
            }}
            title={event.title}
            description={event.location.address}
            onCalloutPress={() => router.push(`/event/${event.id}` as any)}
          />
        ))}
      </MapView>

      {/* Grad selector na vrhu */}
      <View className="absolute top-12 left-4 right-4">
        <View className="bg-white rounded-2xl px-4 py-6 flex-row items-center gap-2">
          <MapPin size={16} color="#f97316" />
          <Text className="font-bold text-gray-900">{selectedCity}</Text>
        </View>
      </View>
    </View>
  );
}
