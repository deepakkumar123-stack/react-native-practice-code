import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInRight,
  ZoomIn,
} from "react-native-reanimated";

export default function ProductWelcomeScreen() {
  const user = {
    name: "Deepak Kumar",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400",
    balance: "₹4,250.00",
  };

  return (
    <View className="flex-1 bg-gray-950 items-center justify-center p-6">
      {/* 1. Animated User Avatar with Glow */}
      <Animated.View
        entering={ZoomIn.duration(800).delay(200)}
        className="mb-6 relative"
      >
        <View className="absolute -inset-1 bg-blue-600 rounded-full blur-xl opacity-50" />
        <Image
          source={{ uri: user.avatar }}
          className="w-32 h-32 rounded-full border-2 border-blue-500"
        />
        {/* VIP Badge */}
        <Animated.View
          entering={ZoomIn.delay(1000)}
          className="absolute bottom-0 right-0 bg-yellow-500 p-2 rounded-full border-2 border-gray-950"
        >
          <FontAwesome6 name="crown" size={12} color="black" />
        </Animated.View>
      </Animated.View>

      {/* 2. Personalized Greeting */}
      <Animated.View entering={FadeInDown.duration(800).delay(400)}>
        <Text className="text-blue-500 text-sm font-bold tracking-[4px] uppercase text-center mb-1">
          Premium Member
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(800).delay(600)}>
        <Text className="text-white text-5xl font-black text-center">
          Hello, {user.name.split(" ")[0]}!
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(800).delay(800)}>
        <Text className="text-neutral-500 text-base text-center mt-3 px-10">
          Ready to discover your next favorite product?
        </Text>
      </Animated.View>

      {/* 3. Wallet/Reward Card (Slide in from Right) */}
      <Animated.View
        entering={SlideInRight.springify().delay(1200)}
        className="mt-10 bg-white/5 border border-white/10 w-full rounded-[30px] p-5 flex-row items-center justify-between"
      >
        <View>
          <Text className="text-neutral-400 text-xs font-bold uppercase mb-1">
            Wallet Balance
          </Text>
          <Text className="text-white text-2xl font-black">{user.balance}</Text>
        </View>
        <TouchableOpacity className="bg-blue-600 px-5 py-3 rounded-2xl shadow-lg shadow-blue-500/40">
          <Text className="text-white font-bold">Shop Now</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* 4. Quick Stats Staggered Entry */}
      <View className="flex-row mt-6 space-x-4">
        {[
          { label: "Orders", val: "12", icon: "box" },
          { label: "Wishlist", val: "08", icon: "heart" },
        ].map((item, index) => (
          <Animated.View
            key={item.label}
            entering={FadeInUp.delay(1400 + index * 200)}
            className="flex-1 bg-white/5 border border-white/10 p-4 rounded-3xl items-center"
          >
            <FontAwesome6 name={item.icon} size={16} color="#3b82f6" />
            <Text className="text-white text-lg font-bold mt-1">
              {item.val}
            </Text>
            <Text className="text-neutral-500 text-[10px] uppercase font-bold">
              {item.label}
            </Text>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}
