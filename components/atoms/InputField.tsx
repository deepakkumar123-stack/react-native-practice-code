import { FontAwesome6 } from "@expo/vector-icons";
import { FormikProps } from "formik";
import React from "react";
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  icon: string;
  placeholder: string;
  fieldName: string;
  formik: FormikProps<any>;
  rightElement?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

const InputField: React.FC<InputFieldProps> = ({
  icon,
  placeholder,
  formik,
  fieldName,
  rightElement,
  containerStyle,
  ...props
}) => {
  const value = formik.values[fieldName];
  const error = formik.errors[fieldName];
  const isTouched = formik.touched[fieldName];
  const isError = Boolean(isTouched && error);

  return (
    <View className="mb-4" style={containerStyle}>
      <View
        // py-3 matches your button's p-3 height
        className={`bg-white/5 border rounded-2xl px-4 py-3 flex-row items-center ${
          isError ? "border-red-500" : "border-white/10"
        }`}
      >
        <View className="w-6 items-center justify-center">
          <FontAwesome6
            name={icon as any}
            size={16}
            color={isError ? "#ef4444" : "#4b5563"}
          />
        </View>

        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#4b5563"
          // text-base matches your button's text-base size
          className="flex-1 ml-3 text-white font-medium text-sm "
          onChangeText={formik.handleChange(fieldName)}
          onBlur={formik.handleBlur(fieldName)}
          value={value}
          selectionColor="#3b82f6"
          {...props}
        />

        {rightElement}
      </View>

      {isError && (
        <Text className="text-red-500 text-[10px] font-bold mt-1 ml-2 uppercase tracking-tighter">
          {error as string}
        </Text>
      )}
    </View>
  );
};

export default InputField;
