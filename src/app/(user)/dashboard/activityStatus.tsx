import { FlatList, Image, SafeAreaView, StyleSheet, View } from "react-native";
import ActivityStatusInfo from "@/src/components/GetActivityStatusInfo";
import { styles } from "@/src/style";
import HeadImageSection from "@/src/components/headSection/HeadImageSection";
import Filter from "@/src/components/filter/Filter";
import { useState } from "react";
// const Product = products[3];

const ActivityStatus = () => {
  const [filterType, setFilterType] = useState<string>('PIE');
  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <HeadImageSection />
      <Filter
        currentChart={filterType}
        setCurrentChart={setFilterType}
      />
      <View style={styles.dashboardChartContainer}>
        <ActivityStatusInfo
          currentChart={filterType}
        />
      </View>
    </SafeAreaView>
  );
};

export default ActivityStatus;