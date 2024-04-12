import { FlatList, Image, SafeAreaView, StyleSheet, View } from "react-native";

import IncidentActivityInfo from "@/src/components/reports/GetIncidentActivityInfo";
import { styles } from "@/src/style";
import { useState } from "react";
import HeadImageSection from "@/src/components/headSection/HeadImageSection";
import Filter from "@/src/components/filter/Filter";
// const Product = products[3];

const IncidentActivity = () => {
  const [filterType, setFilterType] = useState<string>('PIE');
  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <HeadImageSection />
      <Filter
        currentChart={filterType}
        setCurrentChart={setFilterType}
      />
      <View style={styles.dashboardChartContainer}>
        <IncidentActivityInfo
         currentChart={filterType}
        />
      </View>
    </SafeAreaView>
  );
};


export default IncidentActivity;