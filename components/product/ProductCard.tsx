import { PRODUCTS } from "@/constants/mockData";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function ResponsiveProductGrid() {
  const { width } = useWindowDimensions();

  // 📐 RESPONSIVE CONFIGURATION
  const CARD_GAP = 16;
  // logic: < 350px (Very small phones) = 1 col | 350-768px = 2 cols | > 768px (Tablets) = 3 cols
  const numColumns = width >= 768 ? 3 : width < 350 ? 1 : 2;

  // Calculate dynamic width
  const cardWidth = (width - CARD_GAP * (numColumns + 1)) / numColumns;

  const ProductCard = ({ item, index }: { item: any; index: number }) => {
    const scale = useSharedValue(1);
    const discount = Math.round(
      ((item.originalPrice - item.price) / item.originalPrice) * 100
    );

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: withSpring(scale.value) }],
    }));

    return (
      <Animated.View
        layout={LinearTransition}
        entering={FadeInDown.delay(index * 100).springify()}
        style={[{ width: cardWidth }, animatedStyle]}
      >
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/product/[id]",
              params: { id: item.id },
            })
          }
          onPressIn={() => (scale.value = 0.98)}
          onPressOut={() => (scale.value = 1)}
          className="mb-4 overflow-hidden rounded-[28px] bg-white border border-slate-100 shadow-sm"
        >
          {/* 1. IMAGE SECTION (Fixed Aspect Ratio) */}
          <View className="relative bg-[#F8FAFC]">
            <Image
              source={{ uri: item.image }}
              className="w-full aspect-[4/5]" // Slightly taller than square looks more premium
              resizeMode="contain"
            />

            {/* Discount Badge */}
            {discount > 0 && (
              <View className="absolute top-3 left-3 bg-red-500 px-2.5 py-1 rounded-full shadow-sm">
                <Text className="text-[10px] font-black text-white">
                  -{discount}%
                </Text>
              </View>
            )}

            {/* Favorite Button */}
            <TouchableOpacity
              activeOpacity={0.7}
              className="absolute top-3 right-3 bg-white/90 w-8 h-8 rounded-full items-center justify-center shadow-sm"
            >
              <FontAwesome6 name="heart" size={12} color="#64748b" />
            </TouchableOpacity>
          </View>

          {/* 2. INFO SECTION */}
          <View
            className="p-4 flex-col justify-between"
            style={{ height: 140 }}
          >
            <View>
              <Text className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                {item.brand}
              </Text>
              <Text
                className="text-sm font-bold text-slate-800 mt-1"
                numberOfLines={2}
              >
                {item.name}
              </Text>
            </View>

            {/* 3. PRICE & ACTIONS SECTION */}
            <View className="flex-row items-center justify-between mt-auto">
              <View>
                <Text className="text-[10px] text-slate-400 line-through font-medium">
                  ₹{item.originalPrice.toLocaleString("en-IN")}
                </Text>
                <Text className="text-lg font-black text-slate-900 leading-none">
                  ₹{item.price.toLocaleString("en-IN")}
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                className="bg-slate-900 w-10 h-10 rounded-2xl items-center justify-center shadow-md active:bg-blue-600"
              >
                <FontAwesome6 name="plus" size={14} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <View className="flex-1 bg-slate-50">
      <FlatList
        data={PRODUCTS}
        key={numColumns}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? { gap: CARD_GAP } : undefined}
        contentContainerStyle={{ padding: CARD_GAP, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ProductCard item={item} index={index} />
        )}
        ListHeaderComponent={() => (
          <View className="mb-6 px-1 mt-4">
            <Text className="text-3xl font-black text-slate-900 tracking-tighter">
              New Arrivals
            </Text>
            <Text className="text-slate-500 text-sm font-medium">
              Curated tech for your lifestyle
            </Text>
          </View>
        )}
      />
    </View>
  );
}
