import { create } from "zustand";

interface AppStore {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
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
}));
