import { FontAwesome6 } from "@expo/vector-icons";
import { useFormik } from "formik";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  ZoomIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import * as Yup from "yup";
import InputField from "../atoms/InputField";
// Import your custom component

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
      "Must contain uppercase, lowercase, number and special character"
    ),
});

export default function LoginForm() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const logoScale = useSharedValue(1);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      logoScale.value = withSpring(1.2, {}, () => {
        logoScale.value = withSpring(1);
      });
      console.log("Login Data:", values);
    },
  });

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(logoScale.value) }],
  }));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-950"
    >
      <View className="flex-1 px-8 justify-center">
        {/* --- BRANDING --- */}
        <View className="items-center mb-10">
          <Animated.View
            entering={ZoomIn.duration(800).delay(200)}
            style={animatedLogoStyle}
            className="w-20 h-20 bg-blue-600 rounded-[24px] items-center justify-center shadow-2xl shadow-blue-500/50"
          >
            <Text className="text-white text-3xl font-black italic">PJ</Text>
          </Animated.View>
          <Animated.View entering={FadeInUp.delay(400)}>
            <Text className="text-white text-3xl font-black mt-6 tracking-tight">
              Login
            </Text>
          </Animated.View>
        </View>

        {/* --- FORM FIELDS --- */}
        <Animated.View entering={FadeInDown.delay(600)}>
          {/* Email Custom Input */}
          <InputField
            icon="envelope"
            placeholder="Email"
            fieldName="email"
            formik={formik}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password Custom Input */}
          <InputField
            icon="lock"
            placeholder="Password"
            fieldName="password"
            formik={formik}
            secureTextEntry={!isPasswordVisible}
            rightElement={
              <TouchableOpacity
                onPress={() => setPasswordVisible(!isPasswordVisible)}
              >
                <FontAwesome6
                  name={isPasswordVisible ? "eye" : "eye-slash"}
                  size={14}
                  color="#4b5563"
                />
              </TouchableOpacity>
            }
          />

          {/* Submit Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => formik.handleSubmit()}
            disabled={formik.isSubmitting}
            // p-3 matches the py-3 in your InputField for perfect symmetry
            className="bg-blue-600 p-3 rounded-2xl mt-4 items-center shadow-lg shadow-blue-500/20"
          >
            {formik.isSubmitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-black text-base">Login</Text>
            )}
          </TouchableOpacity>
        </Animated.View>

        {/* --- FOOTER --- */}
        <Animated.View
          entering={FadeInDown.delay(800)}
          className="mt-10 items-center"
        >
          <TouchableOpacity>
            <Text className="text-neutral-500">
              New here?{" "}
              <Text className="text-blue-500 font-bold">Create Account</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}
