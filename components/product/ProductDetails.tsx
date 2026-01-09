import { PRODUCTS } from "@/constants/mockData";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInDown,
} from "react-native-reanimated";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [isFavorite, setIsFavorite] = useState(false);

  // Find product by ID from mock data
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text>Product not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-blue-500 mt-4">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* 1. IMAGE HEADER SECTION */}
        <Animated.View entering={FadeIn.duration(500)} className="relative">
          <Image
            source={{ uri: product.image }}
            style={{ width: width, height: width * 1.1 }}
            resizeMode="cover"
          />

          {/* Header Actions */}
          <View className="absolute top-12 left-6 right-6 flex-row justify-between">
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-white/90 w-10 h-10 rounded-full items-center justify-center shadow-sm"
            >
              <MaterialIcons name="arrow-back" size={24} color="#1e293b" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsFavorite(!isFavorite)}
              className="bg-white/90 w-10 h-10 rounded-full items-center justify-center shadow-sm"
            >
              <FontAwesome6
                name="heart"
                solid={isFavorite}
                size={18}
                color={isFavorite ? "#ef4444" : "#1e293b"}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* 2. PRODUCT INFO SECTION */}
        <View className="px-6 py-8 bg-white -mt-10 rounded-t-[40px] shadow-2xl">
          <Animated.View entering={FadeInDown.delay(200).springify()}>
            <Text className="text-blue-600 font-bold uppercase tracking-widest text-xs">
              {product.brand}
            </Text>
            <Text className="text-3xl font-black text-slate-900 mt-2">
              {product.name}
            </Text>

            {/* Rating Mockup */}
            <View className="flex-row items-center mt-3">
              <View className="flex-row mr-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <MaterialIcons
                    key={s}
                    name="star"
                    size={16}
                    color="#fbbf24"
                  />
                ))}
              </View>
              <Text className="text-slate-400 text-xs font-bold">
                (120 Reviews)
              </Text>
            </View>
          </Animated.View>

          {/* 3. PRICE SECTION */}
          <Animated.View
            entering={FadeInDown.delay(400).springify()}
            className="mt-8 flex-row items-center justify-between"
          >
            <View>
              <Text className="text-slate-400 text-sm line-through font-medium">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </Text>
              <Text className="text-4xl font-black text-slate-900">
                ₹{product.price.toLocaleString("en-IN")}
              </Text>
            </View>

            {discount > 0 && (
              <View className="bg-green-100 px-4 py-2 rounded-2xl">
                <Text className="text-green-700 font-black text-sm">
                  {discount}% OFF
                </Text>
              </View>
            )}
          </Animated.View>

          {/* 4. DESCRIPTION */}
          <Animated.View
            entering={FadeInDown.delay(600).springify()}
            className="mt-8"
          >
            <Text className="text-slate-900 font-bold text-lg">
              Product Description
            </Text>
            <Text className="text-slate-500 leading-6 mt-2">
              Experience the pinnacle of technology with the {product.name}.
              Featuring industry-leading performance, a stunning display, and an
              elegant design crafted from premium materials. Perfect for
              professionals and enthusiasts alike.
            </Text>
          </Animated.View>

          {/* Spacer for bottom bar */}
          <View className="h-32" />
        </View>
      </ScrollView>

      {/* 5. FLOATING BOTTOM BAR */}
      <Animated.View
        entering={SlideInDown.delay(800)}
        className="absolute bottom-0 w-full bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-6 pb-10 flex-row items-center space-x-4"
      >
        <TouchableOpacity className="w-16 h-16 bg-slate-100 rounded-2xl items-center justify-center border border-slate-200">
          <FontAwesome6 name="bag-shopping" size={20} color="#1e293b" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 bg-slate-900 h-16 rounded-2xl items-center justify-center shadow-xl shadow-slate-400">
          <Text className="text-white font-black text-lg">Add to Cart</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
