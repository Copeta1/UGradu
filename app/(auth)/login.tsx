import { useAuth } from "@/hooks/useAuth";
import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Greška", "Molimo unesite email i lozinku.");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
    } catch (error) {
      Alert.alert("Greška", "Pogrešan email ili lozinka.");
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
      <View className="flex-1 justify-center px-6 ">
        <Text className="text-5xl font-bold text-orange-500 mb-2">UGradu</Text>
        <Text className="text-gray-800 mb-10">
          Prijavi se i otkri što se događa u tvom gradu
        </Text>

        <TextInput
          className="bg-white border border-white/20 rounded-xl px-4 py-3 mb-4 text-gray-900 text-base"
          placeholder="Email"
          placeholderTextColor="#9ca3af"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          className="bg-white border border-white/20 rounded-xl px-4 py-3 mb-6 text-gray-900 text-base"
          placeholder="Lozinka"
          placeholderTextColor="#9ca3af"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          className="bg-orange-500 rounded-xl py-4 items-center"
          disabled={loading}
          onPress={handleLogin}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-base">Prijavi se</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text>Nemaš račun? </Text>
          <Link href="/(auth)/register">
            <Text className="text-orange-500 font-bold">Registriraj se</Text>
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
}
