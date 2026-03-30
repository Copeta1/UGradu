import { useAuth } from "@/hooks/useAuth";
import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert("Greška", "Molim unesite sve podatke.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Greška", "Lozinka mora imati najmanje 6 znakova.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Greška", "Lozinke se ne podudaraju.");
      return;
    }

    try {
      setLoading(true);
      await register(email, password, firstName, lastName);
    } catch (error: any) {
      Alert.alert("Greška", "Registracija nije uspjela. Pokušajte ponovo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/Pozadina-login.jpg")}
      className="flex-1"
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        className="flex-1 px-6"
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-5xl font-bold text-orange-200 mb-2">UGradu</Text>
        <Text className="text-gray-800 mb-8">
          Kreiraj račun i počni istraživati
        </Text>

        <TextInput
          className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-900 text-base"
          placeholder="Ime"
          placeholderTextColor="#9ca3af"
          value={firstName}
          onChangeText={setFirstName}
        />

        <TextInput
          className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-900 text-base"
          placeholder="Prezime"
          placeholderTextColor="#9ca3af"
          value={lastName}
          onChangeText={setLastName}
        />

        <TextInput
          className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-900 text-base"
          placeholder="Email"
          placeholderTextColor="#9ca3af"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-900 text-base"
          placeholder="Lozinka"
          placeholderTextColor="#9ca3af"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          className="bg-white border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-900 text-base"
          placeholder="Potvrdi lozinku"
          placeholderTextColor="#9ca3af"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          className="bg-orange-500 rounded-xl py-4 items-center"
          disabled={loading}
          onPress={handleRegister}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-base">
              Registriraj se
            </Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6 mb-6">
          <Text className="text-gray-800">Već imaš račun? </Text>
          <Link href="/(auth)/login">
            <Text className="text-orange-500 font-bold">Prijavi se</Text>
          </Link>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
