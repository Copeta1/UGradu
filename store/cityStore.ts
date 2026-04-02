import { create } from "zustand";

interface CityStore {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export const useCityStore = create<CityStore>((set) => ({
  selectedCity: "Zagreb",
  setSelectedCity: (city) => set({ selectedCity: city }),
  favorites: [],
  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id],
    })),
}));
