import { CITIES } from "@/constants/cities";
import { useCityStore } from "@/store/cityStore";
import { Check, X } from "lucide-react-native";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

interface Props {
  onClose: () => void;
  visible: boolean;
}

export default function CityPicker({ onClose, visible }: Props) {
  const { selectedCity, setSelectedCity } = useCityStore();

  const handleSelect = (city: string) => {
    setSelectedCity(city);
    onClose();
  };

  return (
    <Modal animationType="slide" visible={visible} transparent>
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl px-4 pt-4 pb-10">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-900">
              Odaberi grad
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#9ca3af" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={CITIES}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                className={`py-4 border-b border-gray-100 flex-row justify-between items-center`}
              >
                <Text
                  className={`text-base ${
                    selectedCity === item
                      ? "text-orange-500 font-bold"
                      : "text-gray-900"
                  }`}
                >
                  {item}
                </Text>
                {selectedCity === item && <Check size={18} color="#f97316" />}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}
