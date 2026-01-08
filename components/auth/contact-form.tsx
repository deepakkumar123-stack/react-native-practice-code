import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as z from "zod";

// 1. Define the validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject is too short"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Infer the TypeScript type from the schema
type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API Call
    console.log("Form Submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("Message Sent!");
    reset();
  };

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-3xl font-bold text-slate-900 mb-2">Contact Us</Text>
      <Text className="text-slate-500 mb-8">We did love to hear from you.</Text>

      {/* Name Field */}
      <View className="mb-5">
        <Text className="text-slate-700 font-medium mb-2">Full Name</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`border rounded-xl p-4 bg-slate-50 ${
                errors.name ? "border-red-500" : "border-slate-200"
              }`}
              placeholder="John Doe"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.name && (
          <Text className="text-red-500 text-sm mt-1">
            {errors.name.message}
          </Text>
        )}
      </View>

      {/* Email Field */}
      <View className="mb-5">
        <Text className="text-slate-700 font-medium mb-2">Email Address</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`border rounded-xl p-4 bg-slate-50 ${
                errors.email ? "border-red-500" : "border-slate-200"
              }`}
              placeholder="john@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && (
          <Text className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </Text>
        )}
      </View>

      {/* Message Field */}
      <View className="mb-8">
        <Text className="text-slate-700 font-medium mb-2">Message</Text>
        <Controller
          control={control}
          name="message"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`border rounded-xl p-4 bg-slate-50 h-32 ${
                errors.message ? "border-red-500" : "border-slate-200"
              }`}
              placeholder="How can we help?"
              multiline
              textAlignVertical="top"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.message && (
          <Text className="text-red-500 text-sm mt-1">
            {errors.message.message}
          </Text>
        )}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className={`rounded-xl p-4 items-center ${
          isSubmitting ? "bg-slate-400" : "bg-blue-600"
        }`}
      >
        <Text className="text-white font-bold text-lg">
          {isSubmitting ? "Sending..." : "Send Message"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
