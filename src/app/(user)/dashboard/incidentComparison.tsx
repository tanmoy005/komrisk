import { FlatList, Image, SafeAreaView, StyleSheet, View } from "react-native";

import IncidentComparisonInfo from "@/src/components/reports/GetIncidentComparisonInfo";
import { styles } from "@/src/style";
import HeadImageSection from "@/src/components/headSection/HeadImageSection";
import Filter from "@/src/components/filter/Filter";
import { useState } from "react";
// const Product = products[3];

const IncidentComparison = () => {
  const [filterType, setFilterType] = useState<string>('PIE');
  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <HeadImageSection />
      <Filter
        currentChart={filterType}
        setCurrentChart={setFilterType}
      />
      <View style={styles.dashboardChartContainer}>
        <IncidentComparisonInfo
          currentChart={filterType}
        />
      </View>
    </SafeAreaView>
  );
};

export default IncidentComparison;