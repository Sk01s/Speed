// hooks/useOfflineTileManager.ts
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

// Configuration constants
const OFFLINE_TILE_DIR_NAME = "osm_tiles";
const OFFLINE_TILE_PATH = `${FileSystem.cacheDirectory}${OFFLINE_TILE_DIR_NAME}`;
const MIN_ZOOM = 13;
const MAX_ZOOM = 16;
const TILE_RADIUS = 2;
const TILE_URL_TEMPLATE = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

type CachingProgress = {
  total: number;
  done: number;
};

export type MapRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
};

export const useOfflineTileManager = (
  lat?: number,
  lon?: number,
  region?: MapRegion
) => {
  const [cachingProgress, setCachingProgress] = useState<CachingProgress>({
    total: 0,
    done: 0,
  });
  const [isCaching, setIsCaching] = useState(false);
  const isCachingRef = useRef(false);

  // Helper function to convert lat/lon to tile coordinates
  const latLonToTile = useCallback((lat: number, lon: number, zoom: number) => {
    const radLat = (lat * Math.PI) / 180;
    const n = Math.pow(2, zoom);
    return {
      x: Math.floor(((lon + 180) / 360) * n),
      y: Math.floor(
        (1 - Math.log(Math.tan(radLat) + 1 / Math.cos(radLat)) / Math.PI / 2) *
          n
      ),
    };
  }, []);

  // Generate tile coordinates for current location/region center
  const getTilesForLocation = useCallback(
    (lat: number, lon: number, zoom: number) => {
      const { x: centerX, y: centerY } = latLonToTile(lat, lon, zoom);
      const tileCoords = [];

      for (let dx = -TILE_RADIUS; dx <= TILE_RADIUS; dx++) {
        for (let dy = -TILE_RADIUS; dy <= TILE_RADIUS; dy++) {
          tileCoords.push({ z: zoom, x: centerX + dx, y: centerY + dy });
        }
      }
      return tileCoords;
    },
    [latLonToTile]
  );

  // Platform-specific path template
  const localPathTemplate = useMemo(
    () =>
      Platform.OS === "ios"
        ? `${OFFLINE_TILE_PATH.replace("file://", "")}/{z}/{x}/{y}.png`
        : `${OFFLINE_TILE_PATH}/{z}/{x}/{y}.png`,
    []
  );

  // Ensure cache directory exists
  const ensureTileCacheDir = useCallback(async () => {
    try {
      const dirInfo = await FileSystem.getInfoAsync(OFFLINE_TILE_PATH);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(OFFLINE_TILE_PATH, {
          intermediates: true,
        });
      }
    } catch (error) {
      console.error("Error ensuring cache directory:", error);
    }
  }, []);

  // Main caching function
  const cacheTiles = useCallback(
    async (centerLat: number, centerLon: number) => {
      if (isCachingRef.current || !centerLat || !centerLon) return;

      isCachingRef.current = true;
      setIsCaching(true);
      setCachingProgress({ total: 0, done: 0 });

      await ensureTileCacheDir();

      // Generate tiles for all zoom levels
      const tilesToCache = [];
      for (let zoom = MIN_ZOOM; zoom <= MAX_ZOOM; zoom++) {
        tilesToCache.push(...getTilesForLocation(centerLat, centerLon, zoom));
      }

      const totalTiles = tilesToCache.length;
      setCachingProgress({ total: totalTiles, done: 0 });

      try {
        await Promise.allSettled(
          tilesToCache.map(async ({ z, x, y }, index) => {
            const subdomain = ["a", "b", "c"][index % 3];
            const url = TILE_URL_TEMPLATE.replace("{z}", String(z))
              .replace("{x}", String(x))
              .replace("{y}", String(y))
              .replace("https://", `https://${subdomain}.`);

            const dirPath = `${OFFLINE_TILE_PATH}/${z}/${x}`;
            const path = `${dirPath}/${y}.png`;

            const fileInfo = await FileSystem.getInfoAsync(path);
            if (!fileInfo.exists) {
              await FileSystem.makeDirectoryAsync(dirPath, {
                intermediates: true,
              });
              await FileSystem.downloadAsync(url, path);
            }

            setCachingProgress((prev) => ({ ...prev, done: prev.done + 1 }));
          })
        );
      } finally {
        setIsCaching(false);
        isCachingRef.current = false;
      }
    },
    [getTilesForLocation, ensureTileCacheDir]
  );

  // Automatically trigger caching when location or region changes
  useEffect(() => {
    // Prefer center from region if available, else use lat & lon parameters.
    const centerLat = region?.latitude ?? lat;
    const centerLon = region?.longitude ?? lon;
    if (centerLat && centerLon) {
      cacheTiles(centerLat, centerLon);
    }
  }, [lat, lon, region, cacheTiles]);

  return {
    localPathTemplate,
    isCaching,
    cachingProgress,
    cacheTiles,
  };
};
