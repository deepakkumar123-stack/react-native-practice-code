import { FontAwesome6 } from "@expo/vector-icons";
import { useFormik } from "formik";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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

// Import your custom compone
// 1. Define the Validation Schema (Matching your SignUp requirements)
const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("New password is required")
    .min(8, "Must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
      "Need: 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Char"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your new password"),
});

export default function ResetPasswordForm() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      console.log("Password Resetting...", values);
      // Simulate API call to update password
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-950"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-8 py-10">
          {/* --- BRANDING & HEADER --- */}
          <View className="items-center mb-10">
            <Animated.View
              entering={ZoomIn.duration(800)}
              className="w-16 h-16 bg-blue-600 rounded-2xl items-center justify-center shadow-xl shadow-blue-500/40"
            >
              <FontAwesome6 name="key" size={24} color="white" />
            </Animated.View>

            <Animated.View
              entering={FadeInUp.delay(200)}
              className="items-center"
            >
              <Text className="text-white text-3xl font-black mt-6 tracking-tight">
                Reset Password
              </Text>
              <Text className="text-neutral-500 text-center mt-2 px-4">
                Set a strong password to protect your premium account.
              </Text>
            </Animated.View>
          </View>

          {/* --- FORM FIELDS --- */}
          <Animated.View entering={FadeInDown.delay(400)}>
            {/* New Password */}
            <InputField
              icon="lock"
              placeholder="New Password"
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

            {/* Confirm New Password */}
            <InputField
              icon="shield-check"
              placeholder="Confirm New Password"
              fieldName="confirmPassword"
              formik={formik}
              secureTextEntry={!isPasswordVisible}
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
                  Update Password
                </Text>
              )}
            </TouchableOpacity>
          </Animated.View>

          {/* --- BACK TO LOGIN --- */}
          <Animated.View
            entering={FadeInDown.delay(600)}
            className="mt-8 items-center"
          >
            <TouchableOpacity className="flex-row items-center">
              <FontAwesome6
                name="arrow-left"
                size={12}
                color="#4b5563"
                className="mr-2"
              />
              <Text className="text-neutral-500 font-bold ml-2">
                Back to Login
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
