// components/home/CategoryCardContainer.tsx
import React, { useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  ViewStyle,
  LayoutChangeEvent,
} from "react-native";
import CategoryCard from "./CategoryCard";
import { scaleHeight, scaleWidth } from "@/utils/scaling";
import { Href } from "expo-router";

const TOTAL_COLUMNS = 4;

export interface CategoryItem {
  label: string;
  icon: any;
  promo?: boolean;
  columns?: number;
  path: Href; // Added path property
}

interface CategoryCardContainerProps {
  data: CategoryItem[];
  variant?: "grid" | "horizontal";
  style?: ViewStyle;
}

const groupIntoRows = (
  items: CategoryItem[],
  totalColumns: number
): CategoryItem[][] => {
  const rows: CategoryItem[][] = [];
  let currentRow: CategoryItem[] = [];
  let currentRowSpan = 0;

  for (const item of items) {
    const itemSpan = item.columns || 1;
    if (currentRowSpan + itemSpan > totalColumns) {
      rows.push(currentRow);
      currentRow = [item];
      currentRowSpan = itemSpan;
    } else {
      currentRow.push(item);
      currentRowSpan += itemSpan;
    }
  }

  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return rows;
};

const CategoryCardContainer = ({
  data,
  variant = "grid",
  style,
}: CategoryCardContainerProps) => {
  if (variant === "horizontal") {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.horizontalContainer, style]}
      >
        {data.map((item) => (
          <CategoryCard
            key={item.label}
            label={item.label}
            icon={item.icon}
            promo={item.promo}
            variant="horizontal"
            path={item.path} // Pass path prop
          />
        ))}
      </ScrollView>
    );
  }

  const [containerWidth, setContainerWidth] = useState(0);
  const handleLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };

  if (containerWidth === 0) {
    return <View onLayout={handleLayout} style={[styles.gridWrapper, style]} />;
  }

  const spacing = scaleWidth(12);
  const rows = groupIntoRows(data, TOTAL_COLUMNS);

  return (
    <View onLayout={handleLayout} style={[styles.gridWrapper, style]}>
      {rows.map((row, rowIndex) => {
        const totalColSpan = row.reduce(
          (sum, item) => sum + (item.columns || 1),
          0
        );
        const numberOfGaps = row.length - 1;
        const availableForItems = containerWidth - numberOfGaps * spacing;

        return (
          <View key={rowIndex} style={styles.row}>
            {row.map((item, itemIndex) => {
              const itemSpan = item.columns || 1;
              const isLastInRow = itemIndex === row.length - 1;
              const width = (itemSpan / totalColSpan) * availableForItems;

              return (
                <View
                  key={item.label}
                  style={[
                    styles.gridItem,
                    { width, marginRight: isLastInRow ? 0 : spacing },
                  ]}
                >
                  <CategoryCard
                    label={item.label}
                    icon={item.icon}
                    promo={item.promo}
                    variant="grid"
                    columns={itemSpan}
                    path={item.path}
                  />
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalContainer: {
    paddingBottom: scaleHeight(12),
  },
  gridWrapper: {
    // No padding to ensure accurate width measurement
  },
  row: {
    flexDirection: "row",
    marginBottom: scaleHeight(12),
  },
  gridItem: {
    // MarginBottom now handled by row's marginBottom
  },
});

export default CategoryCardContainer;
