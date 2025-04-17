import { LocationData } from "@/features/location/location";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
type MapProp = {
  isMovable?: boolean | undefined;
  setScroll?: ((enabled: boolean) => void) | undefined;
  location?: LocationData;
  isLoading?: boolean;
};
export default function Map({
  isMovable = true,
  setScroll = (enabled: boolean) => {},
  location = {
    coords: {
      latitude: 0,
      longitude: 0,
    },
    locationName: "",
    details: {},
    updatedAt: "",
  }, // Receive location via props
  isLoading = false,
}: // Receive loading state via props
MapProp) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    if (location?.coords) {
      const { latitude, longitude } = location.coords;
      const restaurants: {
        id: number;
        lat: number;
        lng: number;
        title: string;
      }[] = [
        // {
        //   id: 1,
        //   lat: latitude + 0.001,
        //   lng: longitude + 0.001,
        //   title: "Good Restaurant",
        // },
        // {
        //   id: 2,
        //   lat: latitude - 0.002,
        //   lng: longitude + 0.003,
        //   title: "Another Place",
        // },
      ];

      // Build HTML with Leaflet map
      const leafletCss = "https://unpkg.com/leaflet@1.9.3/dist/leaflet.css";
      const leafletJs = "https://unpkg.com/leaflet@1.9.3/dist/leaflet.js";

      const markersJs = restaurants
        .map(
          (r) =>
            `L.marker([${r.lat}, ${r.lng}]).addTo(map).bindPopup('${r.title}');`
        )
        .join("\n");

      const htmlContent = `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="${leafletCss}" />
    <style> #map { height: 100%; width: 100%; margin:0; padding:0; } body, html { height:100%; margin:0; padding:0; } </style>
  </head>
  <body>
    <div id="map"></div>
    <script src="${leafletJs}"></script>
    <script>
      const map = L.map('map', { 
        zoomControl: false, 
        dragging: ${isMovable} 
      }).setView([${latitude}, ${longitude}], 15);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: ''
      }).addTo(map);

      // Center position marker
      L.circleMarker([${latitude}, ${longitude}], { radius: 8, color: 'blue' })
        .addTo(map)
        .bindPopup('Center Position');

      // Restaurant markers
      ${markersJs}
    </script>
  </body>
</html>`;

      setHtml(htmlContent);
    }
  }, [location, isMovable]); // Update dependencies

  if (isLoading || !html) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View
      style={styles.container}
      onTouchStart={() => isMovable && setScroll(false)}
      onTouchEnd={() => isMovable && setScroll(true)}
    >
      <WebView
        originWhitelist={["*"]}
        source={{ html }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
}

// Keep the same styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    backgroundColor: "#f0f0f0",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  webview: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
});
