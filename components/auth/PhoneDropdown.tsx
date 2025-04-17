import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CountryFlag from "react-native-country-flag";
import { responsiveFont } from "@/utils/scaling";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../ThemedText";

// Install required packages:
// expo install react-native-flagkit @expo/vector-icons

interface Country {
  code: string;
  name: string;
  isoCode: string;
}

const COUNTRIES: Country[] = [
  { code: "+1", name: "United States", isoCode: "US" },
  { code: "+44", name: "United Kingdom", isoCode: "GB" },
  { code: "+91", name: "India", isoCode: "IN" },
  { code: "+33", name: "France", isoCode: "FR" },
  { code: "+49", name: "Germany", isoCode: "DE" },
  { code: "+81", name: "Japan", isoCode: "JP" },
  { code: "+86", name: "China", isoCode: "CN" },
  { code: "+52", name: "Mexico", isoCode: "MX" },
  { code: "+55", name: "Brazil", isoCode: "BR" },
  { code: "+7", name: "Russia", isoCode: "RU" },
  // Add more countries as needed...
];
interface PhoneDropdownProps {
  onSelect?: (code: string) => void;
}

const PhoneDropdown = ({ onSelect }: PhoneDropdownProps) => {
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor(
    { light: "#c5c5c5", dark: "#454545" },
    "tint"
  );

  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelect = (item: Country) => {
    setSelectedCountry(item);
    setModalVisible(false);
    setSearchQuery("");
    onSelect?.(item.code); // ← send selected code to parent
  };

  const renderItem = ({ item }: { item: Country }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => handleSelect(item)}
    >
      <CountryFlag isoCode={item.isoCode} size={24} />
      <Text style={styles.countryCode}>{item.code}</Text>
      <Text style={styles.countryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const filteredCountries = COUNTRIES.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.includes(searchQuery)
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.dropdownButton, { borderColor: borderColor }]}
        onPress={() => setModalVisible(true)}
      >
        <CountryFlag isoCode={selectedCountry.isoCode} size={24} />
        <ThemedText style={styles.selectedCode}>
          {selectedCountry.code}
        </ThemedText>
        <MaterialIcons name="arrow-drop-down" size={20} color={textColor} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search country..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus={true}
              />
              <FlatList
                data={filteredCountries}
                renderItem={renderItem}
                keyExtractor={(item) => item.isoCode}
                keyboardShouldPersistTaps="handled"
              />
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRightWidth: 1,
    borderColor: "#e0e0e0",
    gap: 8,
  },
  selectedCode: {
    fontSize: responsiveFont(16),
    paddingRight: 3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff77",
  },
  modalContent: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 8,
    maxHeight: "60%",
  },
  searchInput: {
    padding: 15,
    fontSize: responsiveFont(16),
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    gap: 15,
  },
  countryCode: {
    width: 60,
    fontSize: responsiveFont(16),
  },
  countryName: {
    flex: 1,
    fontSize: responsiveFont(16),
    color: "#666",
  },
});

export default PhoneDropdown;
