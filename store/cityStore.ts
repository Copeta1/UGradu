import { create } from "zustand";

interface CityStore {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

export const useCityStore = create<CityStore>((set) => ({
  selectedCity: "Zagreb",
  setSelectedCity: (city) => set({ selectedCity: city }),
}));
