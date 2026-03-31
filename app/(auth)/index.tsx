import { Link } from "expo-router";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function GetStartedScreen() {
  return (
    <ImageBackground
      source={require("../../assets/Pozadina-login.jpg")}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1  px-6">
        <View className="flex-1 items-center justify-center">
          <Image
            source={require("../../assets/Logo.png")}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
        </View>

        <View className="pb-16">
          <Text className="text-5xl font-bold text-orange-500 mb-2">
            Otkrij što se događa
          </Text>
          <Text className="text-gray-800 mb-12">
            Koncerti, izložbe i još mnogo toga - sve na jednom mjestu
          </Text>

          <Link href="/(auth)/login" asChild>
            <TouchableOpacity className="bg-orange-500 rounded-xl py-4 items-center mb-4">
              <Text className="text-white font-bold text-base">Prijavi se</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/(auth)/register" asChild>
            <TouchableOpacity className="bg-white/20 border border-white/30 rounded-xl py-4 items-center">
              <Text className="text-white font-bold text-base">
                Registriraj se
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
}
