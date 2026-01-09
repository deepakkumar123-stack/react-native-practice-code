import { FontAwesome6 } from "@expo/vector-icons";
import { useFormik } from "formik";
import React from "react";
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
} from "react-native-reanimated";
import * as Yup from "yup";
import InputField from "../atoms/InputField";

// Import your custom component

// 1. Validation Schema
const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your registered email"),
});

export default function ForgotPasswordForm() {
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      console.log("Sending recovery link to:", values.email);
      // Logic for API call to send reset email
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-950"
    >
      <View className="flex-1 px-8 justify-center">
        {/* --- BRANDING & HEADER --- */}
        <View className="items-center mb-10">
          <Animated.View
            entering={ZoomIn.duration(800)}
            className="w-16 h-16 bg-blue-600 rounded-2xl items-center justify-center shadow-xl shadow-blue-500/40"
          >
            <FontAwesome6 name="envelope-open-text" size={24} color="white" />
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(200)}
            className="items-center mt-6"
          >
            <Text className="text-white text-3xl font-black tracking-tight text-center">
              Forgot Password?
            </Text>
            <Text className="text-neutral-500 text-center mt-3 px-2 leading-5">
              Enter your email address and we will send you a link to reset your
              password.
            </Text>
          </Animated.View>
        </View>

        {/* --- FORM FIELD --- */}
        <Animated.View entering={FadeInDown.delay(400)}>
          <InputField
            icon="envelope"
            placeholder="Email Address"
            fieldName="email"
            formik={formik}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Reset Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => formik.handleSubmit()}
            disabled={formik.isSubmitting}
            className="bg-blue-600 p-3 rounded-2xl mt-4 items-center shadow-lg shadow-blue-500/20"
          >
            {formik.isSubmitting ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-black text-base uppercase tracking-widest">
                Send Reset Link
              </Text>
            )}
          </TouchableOpacity>
        </Animated.View>

        {/* --- FOOTER --- */}
        <Animated.View
          entering={FadeInDown.delay(600)}
          className="mt-12 items-center"
        >
          <TouchableOpacity className="flex-row items-center">
            <FontAwesome6 name="chevron-left" size={10} color="#3b82f6" />
            <Text className="text-blue-500 font-bold ml-2">Back to Login</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}
