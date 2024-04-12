import { FlatList, Image, SafeAreaView, StyleSheet, View } from "react-native";

import ImpactAnalysisInfo from "@/src/components/reports/GetImpactAnalysisInfo";
import { styles } from "@/src/style";
import Filter from "@/src/components/filter/Filter";
import { useState } from "react";
import HeadImageSection from "@/src/components/headSection/HeadImageSection";
// const Product = products[3];

const ImpactAnalysis = () => {
  const [filterType, setFilterType] = useState<string>('PIE');
  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <HeadImageSection />
      <Filter
        currentChart={filterType}
        setCurrentChart={setFilterType}
      />
      <View style={styles.dashboardChartContainer}>
        <ImpactAnalysisInfo
          currentChart={filterType}
        />
      </View>
    </SafeAreaView>
  );
};


export default ImpactAnalysis;