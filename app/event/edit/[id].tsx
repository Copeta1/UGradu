import { CATEGORIES } from "@/constants/categories";
import { CITIES } from "@/constants/cities";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/services/firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { ChevronDown, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditEventScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { userData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("Zagreb");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("koncerti");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const docSnap = await getDoc(doc(db, "events", id as string));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setDescription(data.description);
          setCity(data.city);
          setAddress(data.location.address);
          setCategory(data.category);
          setPrice(data.price);
          const eventDate = new Date(data.date.seconds * 1000);
          setDate(eventDate);
          setTime(eventDate);
        }
      } catch (error) {
        Alert.alert("Greška", "Nije moguće učitati event.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (userData?.role !== "organizer") {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          Nemaš pristup
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-orange-500 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-bold">Nazad</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  const handleEdit = async () => {
    if (!title || !description || !address || !price) {
      Alert.alert("Greška", "Molimo ispunite sva polja.");
      return;
    }
    try {
      const eventDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),
      );

      await updateDoc(doc(db, "events", id as string), {
        title,
        description,
        city,
        location: {
          lat: 0,
          lng: 0,
          address,
        },
        category,
        price,
        date: Timestamp.fromDate(eventDate),
      });

      Alert.alert("Uspjeh!", "Event je uspješno ažuriran!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Greška", "Nije moguće ažurirati event.");
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="px-4 pt-14 pb-4 flex-row items-center justify-between border-b border-gray-100">
        <Text className="text-xl font-bold text-gray-900">Uredi event</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <X size={24} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 pt-4">
        <Text className="text-sm font-medium text-gray-700 mb-1">
          Naziv eventa
        </Text>
        <TextInput
          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-900"
          placeholder="npr. Techno Night"
          placeholderTextColor="#9ca3af"
          value={title}
          onChangeText={setTitle}
        />

        <Text className="text-sm font-medium text-gray-700 mb-1">Opis</Text>
        <TextInput
          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-900"
          placeholder="Opiši event..."
          placeholderTextColor="#9ca3af"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          style={{ height: 100, textAlignVertical: "top" }}
        />

        <Text className="text-sm font-medium text-gray-700 mb-1">
          Kategorija
        </Text>
        <TouchableOpacity
          onPress={() => setCategoryOpen(!categoryOpen)}
          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-1 flex-row justify-between items-center"
        >
          <Text className="text-gray-900">
            {CATEGORIES.find((c) => c.id === category)?.label}
          </Text>
          <ChevronDown size={18} color="#9ca3af" />
        </TouchableOpacity>
        {categoryOpen && (
          <View className="bg-white border border-gray-200 rounded-xl mb-4 overflow-hidden">
            {CATEGORIES.filter((c) => c.id !== "sve").map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => {
                  setCategory(cat.id);
                  setCategoryOpen(false);
                }}
                className={`px-4 py-3 border-b border-gray-50 ${
                  category === cat.id ? "bg-orange-50" : ""
                }`}
              >
                <Text
                  className={
                    category === cat.id
                      ? "text-orange-500 font-bold"
                      : "text-gray-900"
                  }
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text className="text-sm font-medium text-gray-700 mb-1">Grad</Text>
        <TouchableOpacity
          onPress={() => setCityOpen(!cityOpen)}
          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-1 flex-row justify-between items-center"
        >
          <Text className="text-gray-900">{city}</Text>
          <ChevronDown size={18} color="#9ca3af" />
        </TouchableOpacity>
        {cityOpen && (
          <View className="bg-white border border-gray-200 rounded-xl mb-4 overflow-hidden">
            {CITIES.map((c) => (
              <TouchableOpacity
                key={c}
                onPress={() => {
                  setCity(c);
                  setCityOpen(false);
                }}
                className={`px-4 py-3 border-b border-gray-50 ${city === c ? "bg-orange-50" : ""}`}
              >
                <Text
                  className={
                    city === c ? "text-orange-500 font-bold" : "text-gray-900"
                  }
                >
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text className="text-sm font-medium text-gray-700 mb-1">
          Adresa / Venue
        </Text>
        <TextInput
          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-900"
          placeholder="npr. Dom sportova, Zagreb"
          placeholderTextColor="#9ca3af"
          value={address}
          onChangeText={setAddress}
        />

        <Text className="text-sm font-medium text-gray-700 mb-1">Datum</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 flex-row justify-between items-center"
        >
          <Text className="text-gray-900">
            {date.toLocaleDateString("hr-HR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Text>
          <ChevronDown size={18} color="#9ca3af" />
        </TouchableOpacity>
        {showDatePicker && (
          <View>
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              minimumDate={new Date()}
              onChange={(event, selectedDate) => {
                if (selectedDate) setDate(selectedDate);
              }}
            />
            <TouchableOpacity
              onPress={() => setShowDatePicker(false)}
              className="bg-orange-500 rounded-xl py-3 items-center mb-4"
            >
              <Text className="text-white font-bold">Potvrdi datum</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text className="text-sm font-medium text-gray-700 mb-1">Vrijeme</Text>
        <TouchableOpacity
          onPress={() => setShowTimePicker(true)}
          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 flex-row justify-between items-center"
        >
          <Text className="text-gray-900">
            {time.toLocaleTimeString("hr-HR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
          <ChevronDown size={18} color="#9ca3af" />
        </TouchableOpacity>
        {showTimePicker && (
          <View>
            <DateTimePicker
              value={time}
              mode="time"
              display="spinner"
              onChange={(event, selectedTime) => {
                if (selectedTime) setTime(selectedTime);
              }}
            />
            <TouchableOpacity
              onPress={() => setShowTimePicker(false)}
              className="bg-orange-500 rounded-xl py-3 items-center mb-4"
            >
              <Text className="text-white font-bold">Potvrdi vrijeme</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text className="text-sm font-medium text-gray-700 mb-1">Cijena</Text>
        <TextInput
          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-8 text-gray-900"
          placeholder="npr. 10 € ili Besplatno"
          placeholderTextColor="#9ca3af"
          value={price}
          onChangeText={setPrice}
        />

        <TouchableOpacity
          onPress={handleEdit}
          className="bg-orange-500 rounded-xl py-4 items-center mb-8"
        >
          <Text className="text-white font-bold text-base">
            Spremi promjene
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
