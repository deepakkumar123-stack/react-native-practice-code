import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";
import { IconSymbol } from "../../components/ui/icon-symbol"; // Adjust path based on your project

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-slate-50">
      {/* Header / Avatar Section */}
      <View className="items-center justify-center bg-white p-8 border-b border-slate-100">
        <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-4">
          <IconSymbol size={48} name="person.fill" color="#2563eb" />
        </View>
        <Text className="text-2xl font-bold text-slate-900">John Doe</Text>
        <Text className="text-slate-500">john.doe@example.com</Text>

        <TouchableOpacity className="mt-4 bg-blue-600 px-6 py-2 rounded-full">
          <Text className="text-white font-semibold">Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View className="flex-row bg-white mt-2 p-4 justify-around border-y border-slate-100">
        <View className="items-center">
          <Text className="text-lg font-bold text-slate-900">12</Text>
          <Text className="text-xs text-slate-500 uppercase tracking-wider">
            Orders
          </Text>
        </View>
        <View className="items-center border-x border-slate-100 px-8">
          <Text className="text-lg font-bold text-slate-900">4</Text>
          <Text className="text-xs text-slate-500 uppercase tracking-wider">
            Wishlist
          </Text>
        </View>
        <View className="items-center">
          <Text className="text-lg font-bold text-slate-900">320</Text>
          <Text className="text-xs text-slate-500 uppercase tracking-wider">
            Points
          </Text>
        </View>
      </View>

      {/* Settings Menu */}
      <View className="mt-6 px-4">
        <Text className="text-slate-400 font-bold mb-3 ml-2 uppercase text-xs">
          Account Settings
        </Text>

        <View className="bg-white rounded-2xl overflow-hidden border border-slate-100">
          <ProfileMenuItem
            icon="cart.fill"
            title="My Orders"
            onPress={() => console.log("Orders")}
          />
          <ProfileMenuItem
            icon="heart.fill"
            title="Favorites"
            onPress={() => console.log("Favs")}
          />
          <ProfileMenuItem
            icon="login"
            title="Login"
            onPress={() => router.push("/auth/login")}
          />
          <ProfileMenuItem
            icon="sign"
            title="Sign Up"
            onPress={() => router.push("/auth/sign-up")}
          />
          <ProfileMenuItem
            icon="reset"
            title="Reset Password"
            onPress={() => router.push("/auth/reset-password")}
          />
          <ProfileMenuItem
            icon="forgot"
            title="Forgot Password"
            onPress={() => router.push("/auth/forgot-password")}
          />
          {/* Link to your Contact Form */}
          <ProfileMenuItem
            icon="envelope.fill"
            title="Contact Support"
            onPress={() => router.push("/contact-us/contact")}
          />
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity className="mt-10 mx-6 bg-red-50 p-4 rounded-xl items-center border border-red-100">
        <Text className="text-red-600 font-bold">Log Out</Text>
      </TouchableOpacity>

      <View className="h-20" />
    </ScrollView>
  );
}

// Reusable Menu Item Component
function ProfileMenuItem({
  icon,
  title,
  onPress,
}: {
  icon: string;
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center p-4 border-b border-slate-50 active:bg-slate-50"
    >
      <View className="w-8 h-8 bg-slate-100 rounded-lg items-center justify-center mr-4">
        <IconSymbol size={18} name={icon} color="#64748b" />
      </View>
      <Text className="flex-1 text-slate-700 font-medium">{title}</Text>
      <IconSymbol size={16} name="chevron.right" color="#cbd5e1" />
    </TouchableOpacity>
  );
}
