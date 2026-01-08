import { MaterialIcons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import { getDistance } from "geolib";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const OFFICE_LOCATION = { latitude: 23.18204, longitude: 72.62836 };
const MAX_DISTANCE = 50;

interface AttendanceLog {
  id: string;
  time: string;
  type: "ENTRY" | "EXIT";
  imageUri: string;
  distance: number;
}

export default function SecureAttendance() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [location, setLocation] = useState<any>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [isWithinRange, setIsWithinRange] = useState(false);
  const [logs, setLogs] = useState<AttendanceLog[]>([]);
  const [loading, setLoading] = useState(false);

  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    (async () => {
      await requestCameraPermission();
      checkLocation();
    })();
  }, []);

  const checkLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    const pos = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    const dist = getDistance(
      { latitude: pos.coords.latitude, longitude: pos.coords.longitude },
      OFFICE_LOCATION
    );
    setDistance(dist);
    setIsWithinRange(dist <= MAX_DISTANCE);
    setLocation(pos);
  };

  const handleCaptureAndPunch = async () => {
    if (!isWithinRange) {
      Alert.alert("Denied", "You must be within 50m of the office.");
      return;
    }

    if (cameraRef.current) {
      setLoading(true);
      try {
        // Take photo - No gallery option provided
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.5,
        });

        const newLog: AttendanceLog = {
          id: Date.now().toString(),
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "ENTRY",
          imageUri: photo!.uri,
          distance: distance || 0,
        };

        setLogs([newLog, ...logs]);
        Alert.alert("Verified", "Selfie captured and attendance marked!");
      } catch (e) {
        Alert.alert("Error", "Failed to capture photo.");
      } finally {
        setLoading(false);
      }
    }
  };

  if (!cameraPermission?.granted) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Requesting Camera Access...</Text>{" "}
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50 p-6 pt-14">
      {/* 1. Camera Viewport (Selfie Only) */}
      <View className="w-full aspect-square rounded-[40px] overflow-hidden border-4 border-white shadow-xl bg-black mb-6">
        {isWithinRange ? (
          <CameraView
            ref={cameraRef}
            facing="front"
            style={StyleSheet.absoluteFill}
          />
        ) : (
          <View className="flex-1 items-center justify-center p-10">
            <MaterialIcons name="location-off" size={60} color="#ef4444" />
            <Text className="text-white text-center mt-4 font-bold">
              Camera Locked. Move closer to the office to enable.
            </Text>
          </View>
        )}

        {/* Overlay Badge */}
        <View className="absolute top-5 left-5 bg-black/50 px-3 py-1 rounded-full">
          <Text className="text-white text-[10px] font-bold">
            LIVE LOCATION: {distance}m
          </Text>
        </View>
      </View>

      {/* 2. Action Button */}
      <TouchableOpacity
        onPress={handleCaptureAndPunch}
        disabled={!isWithinRange || loading}
        className={`w-full py-5 rounded-2xl items-center flex-row justify-center space-x-2 ${
          isWithinRange ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <>
            <MaterialIcons name="photo-camera" size={24} color="white" />
            <Text className="text-white font-black text-lg ml-2">
              VERIFY & PUNCH IN
            </Text>
          </>
        )}
      </TouchableOpacity>

      {/* 3. Verified Logs with Thumbnails */}
      <View className="flex-1 mt-8">
        <Text className="text-xl font-black text-slate-900 mb-4">
          Verified Attendance
        </Text>
        <FlatList
          data={logs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-white p-3 rounded-3xl mb-3 flex-row items-center border border-slate-100 shadow-sm">
              <Image
                source={{ uri: item.imageUri }}
                className="w-16 h-16 rounded-2xl mr-4"
              />
              <View className="flex-1">
                <Text className="font-bold text-slate-900">
                  Present (Selfie Verified)
                </Text>
                <Text className="text-[10px] text-slate-400 font-bold uppercase">
                  {item.time} • {item.distance}m from center
                </Text>
              </View>
              <MaterialIcons name="verified" size={24} color="#16a34a" />
            </View>
          )}
        />
      </View>
    </View>
  );
}
