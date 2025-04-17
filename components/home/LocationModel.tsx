import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { responsiveFont, scaleWidth, scaleHeight } from "@/utils/scaling";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LocationData } from "@/features/location/location";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { ThemedButton } from "../ThemedButton";

type LocationModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (location: LocationData) => void;
  location?: LocationData;
};

const LocationModal = ({
  visible,
  onClose,
  onSave,
  location,
}: LocationModalProps) => {
  const [building, setBuilding] = useState(location?.details.building || "");
  const [street, setStreet] = useState(location?.details.road || "");
  const [city, setCity] = useState(location?.details.city || "");
  const [region, setRegion] = useState(location?.details.state || "");
  const textColor = useThemeColor({}, "text");
  const buttonBg = useThemeColor({}, "buttonBackground");
  const buttonText = useThemeColor({}, "buttonText");

  const handleSave = () => {
    const newLocation: LocationData = {
      coords: location?.coords || { latitude: 0, longitude: 0 },
      locationName: [building, street].filter(Boolean).join(", "),
      details: { building, road: street, city, state: region },
      updatedAt: location ? location.updatedAt : Date.now().toString(),
    };
    onSave(newLocation);
    onClose();
    if (!location) {
      setBuilding("");
      setStreet("");
      setCity("");
      setRegion("");
    }
  };

  useEffect(() => {
    // Reset form whenever the modal becomes visible
    if (visible) {
      if (location) {
        // Editing existing location
        setBuilding(location.details.building || "");
        setStreet(location.details.road || "");
        setCity(location.details.city || "");
        setRegion(location.details.state || "");
      } else {
        // New location
        setBuilding("");
        setStreet("");
        setCity("");
        setRegion("");
      }
    }
  }, [visible, location]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.modalOverlay}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
        >
          <ThemedView
            style={[
              styles.modalContainer,
              { backgroundColor: useThemeColor({}, "background") },
            ]}
          >
            <ThemedText style={styles.modalTitle}>
              {location ? "Edit Location" : "Add New Location"}
            </ThemedText>

            <TextInput
              style={[styles.input, { color: textColor }]}
              placeholder="Building/House Number"
              value={building}
              onChangeText={setBuilding}
              placeholderTextColor="#888"
            />

            <TextInput
              style={[styles.input, { color: textColor }]}
              placeholder="Street Name"
              value={street}
              onChangeText={setStreet}
              placeholderTextColor="#888"
            />

            <TextInput
              style={[styles.input, { color: textColor }]}
              placeholder="City"
              value={city}
              onChangeText={setCity}
              placeholderTextColor="#888"
            />

            <TextInput
              style={[styles.input, { color: textColor }]}
              placeholder="Region/State"
              value={region}
              onChangeText={setRegion}
              placeholderTextColor="#888"
            />

            <View style={styles.buttonRow}>
              <ThemedButton
                title="Cancel"
                onPress={onClose}
                containerStyle={[styles.button, { backgroundColor: buttonBg }]}
                textStyle={[styles.buttonText, { color: buttonText }]}
              />
              <ThemedButton
                title={location ? "Save Changes" : "Save Location"}
                onPress={handleSave}
                disabled={!city || !region}
                containerStyle={[
                  styles.button,
                  { backgroundColor: buttonText },
                  (!city || !region) && styles.disabledButton,
                ]}
                textStyle={[styles.buttonText, { color: buttonBg }]}
              />
            </View>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flexGrow: 1,
    backgroundColor: "rgba(0, 0, 0, 0.33)",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: scaleHeight(20),
  },
  modalContainer: {
    width: "85%",
    maxHeight: "80%",
    borderRadius: 12,
    padding: scaleWidth(16),
  },
  modalTitle: {
    fontSize: responsiveFont(18),
    fontWeight: "700",
    marginBottom: scaleHeight(16),
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: scaleWidth(12),
    marginBottom: scaleHeight(12),
    fontSize: responsiveFont(16),
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleHeight(16),
    gap: scaleWidth(8),
  },
  button: {
    borderRadius: 8,
    padding: scaleWidth(5),
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: responsiveFont(16),
  },
});

export default LocationModal;
