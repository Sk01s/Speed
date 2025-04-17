import React, { useState } from "react";
import { Modal, StyleSheet, View, FlatList, Pressable } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { responsiveFont, scaleWidth, scaleHeight } from "@/utils/scaling";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LocationData } from "@/features/location/location";
import { ThemedButton } from "../ThemedButton";
import LocationModal from "./LocationModel";
import { formatLocationDetails } from "@/utils";

type LocationsModalProps = {
  visible: boolean;
  locations: LocationData[];
  selectedLocation: LocationData | null;
  onSelectLocation: (location: LocationData) => void;
  onAddLocation: (location: LocationData) => void;
  onUpdateLocation: (location: LocationData) => void;
  onDeleteLocation: (updatedAt: string) => void;
  onClose: () => void;
};

const LocationsModal = ({
  visible,
  locations,
  selectedLocation,
  onSelectLocation,
  onAddLocation,
  onUpdateLocation,
  onDeleteLocation,

  onClose,
}: LocationsModalProps) => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationToEdit, setLocationToEdit] = useState<LocationData | null>(
    null
  );
  const containerColor = useThemeColor({}, "background");
  const buttonBg = useThemeColor({}, "buttonBackground");
  const buttonText = useThemeColor({}, "buttonText");
  const closeBg = useThemeColor(
    { dark: "rgb(240, 82, 82)", light: "rgb(248, 70, 70)" },
    "error"
  );
  const selectBg = useThemeColor(
    { light: "rgba(190, 190, 190, 0.23)", dark: "rgba(17, 17, 17, 0.47)" },
    "background"
  );

  const handleSaveLocation = (savedLocation: LocationData) => {
    if (locationToEdit) {
      onUpdateLocation(savedLocation);
    } else {
      onAddLocation(savedLocation);
    }
    setLocationToEdit(null);
  };
  const handleDelete = (updatedAt: string) => {
    onDeleteLocation(updatedAt);
  };
  return (
    <>
      <Modal visible={visible} transparent animationType="slide">
        <ThemedView style={styles.modalOverlay}>
          <ThemedView
            style={[styles.modalContainer, { backgroundColor: containerColor }]}
          >
            <ThemedText style={styles.modalTitle}>Select Location</ThemedText>

            <FlatList
              data={locations}
              keyExtractor={(item) => item.updatedAt}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.locationItem,
                    item.updatedAt === selectedLocation?.updatedAt && {
                      ...styles.selectedItem,
                      backgroundColor: selectBg,
                    },
                  ]}
                >
                  <Pressable
                    style={styles.locationPressable}
                    onPress={() => {
                      onSelectLocation(item);
                      onClose();
                    }}
                  >
                    <MaterialIcons
                      name={
                        item.updatedAt === selectedLocation?.updatedAt
                          ? "location-on"
                          : "location-off"
                      }
                      size={20}
                      color="#007AFF"
                    />
                    <View style={styles.locationTextContainer}>
                      <ThemedText style={styles.locationItemText}>
                        {item.locationName || "Unnamed Location"}
                      </ThemedText>
                      <ThemedText style={styles.locationItemSubtext}>
                        {formatLocationDetails(item.details)}
                      </ThemedText>
                    </View>
                  </Pressable>
                  <View style={styles.actionsContainer}>
                    <Pressable
                      onPress={() => {
                        setLocationToEdit(item);
                        setShowLocationModal(true);
                      }}
                      style={styles.editButton}
                    >
                      <Ionicons name="pencil" size={18} color="#007AFF" />
                    </Pressable>
                    <Pressable
                      onPress={() => handleDelete(item.updatedAt)}
                      style={styles.deleteButton}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={18}
                        color="#ee3B30"
                      />
                    </Pressable>
                  </View>
                </View>
              )}
            />

            <View style={styles.buttonGroup}>
              <ThemedButton
                title="Close"
                onPress={onClose}
                textStyle={[styles.buttonText, { color: buttonText }]}
                containerStyle={[
                  styles.button,
                  {
                    backgroundColor: closeBg,
                  },
                ]}
              />
              <ThemedButton
                title="Add Location"
                textStyle={[styles.buttonText, { color: buttonText }]}
                containerStyle={[styles.button, { backgroundColor: buttonBg }]}
                onPress={() => setShowLocationModal(true)}
                leftIcon={
                  <Ionicons
                    name="add-circle-outline"
                    size={24}
                    color={buttonText}
                  />
                }
              />
            </View>
          </ThemedView>
        </ThemedView>
      </Modal>

      <LocationModal
        visible={showLocationModal}
        onClose={() => {
          setShowLocationModal(false);
          setLocationToEdit(null);
        }}
        onSave={handleSaveLocation}
        location={locationToEdit || undefined}
      />
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.33)",
    justifyContent: "center",
    alignItems: "center",
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
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(8),
  },
  selectedItem: {
    borderRadius: 8,
  },
  locationPressable: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  locationTextContainer: {
    marginLeft: scaleWidth(10),
    flex: 1,
  },
  locationItemText: {
    fontSize: responsiveFont(16),
    fontWeight: "500",
  },
  locationItemSubtext: {
    fontSize: responsiveFont(14),
    color: "#666",
    marginTop: 2,
  },
  editButton: {
    padding: scaleWidth(8),
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleHeight(16),
    gap: scaleWidth(10),
  },
  button: {
    borderRadius: 8,
    paddingVertical: scaleHeight(8),
  },
  buttonText: {
    fontSize: responsiveFont(14),
    fontWeight: "500",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    padding: scaleWidth(8),
    marginLeft: scaleWidth(4),
  },
});

export default LocationsModal;
