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

// 1. Hardcore Validation Schema
const SignUpSchema = Yup.object().shape({
  fullName: Yup.string().min(2, "Too Short!").required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
      "Need: 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Char"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export default function SignUpForm() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      console.log("Creating Account:", values);
      // Logic for API call to src/services/auth.ts
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-950"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View className="px-8 py-10">
          {/* --- BRANDING --- */}
          <View className="items-center mb-10">
            <Animated.View
              entering={ZoomIn.duration(800)}
              className="w-16 h-16 bg-blue-600 rounded-2xl items-center justify-center"
            >
              <Text className="text-white text-2xl font-black italic">PJ</Text>
            </Animated.View>
            <Animated.View entering={FadeInUp.delay(200)}>
              <Text className="text-white text-3xl font-black mt-4 tracking-tight">
                Create Account
              </Text>
              <Text className="text-neutral-500 text-center mt-1">
                Join the premium community
              </Text>
            </Animated.View>
          </View>

          {/* --- FORM FIELDS --- */}
          <Animated.View entering={FadeInDown.delay(400)}>
            {/* Full Name */}
            <InputField
              icon="user"
              placeholder="Full Name"
              formik={formik}
              fieldName="fullName"
            />

            {/* Email */}
            <InputField
              icon="envelope"
              placeholder="Email Address"
              formik={formik}
              fieldName="email"
              keyboardType="email-address"
            />

            {/* Password */}
            <InputField
              icon="lock"
              placeholder="Password"
              formik={formik}
              fieldName="password"
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

            {/* Confirm Password */}
            <InputField
              icon="shield-halved"
              placeholder="Confirm Password"
              formik={formik}
              fieldName="confirmPassword"
              secureTextEntry={!isPasswordVisible}
            />

            {/* Submit Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => formik.handleSubmit()}
              disabled={formik.isSubmitting}
              className="bg-blue-600 p-3 rounded-2xl mt-6 items-center shadow-lg shadow-blue-500/20"
            >
              {formik.isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-black text-base">Sign Up</Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
