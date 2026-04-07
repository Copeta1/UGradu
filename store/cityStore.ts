import * as Location from "expo-location";
import { create } from "zustand";

interface AppStore {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  detectCity: () => Promise<void>;
}

export const useCityStore = create<AppStore>((set) => ({
  selectedCity: "Zagreb",
  setSelectedCity: (city) => set({ selectedCity: city }),
  favorites: [],
  setFavorites: (favorites) => set({ favorites }),
  addFavorite: (id) =>
    set((state) => ({ favorites: [...state.favorites, id] })),
  removeFavorite: (id) =>
    set((state) => ({ favorites: state.favorites.filter((f) => f !== id) })),
  detectCity: async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Low,
      }).catch(() => null);

      if (!location) return;

      const geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (geocode.length > 0) {
        const city = geocode[0].city ?? geocode[0].region ?? "Zagreb";
        set({ selectedCity: city });
      }
    } catch (error) {}
  },
}));
