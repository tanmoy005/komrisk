import { SafeAreaView, View } from "react-native";

import ComplianceStatusInfo from "@/src/components/reports/GetComplianceStatusInfo";
import { styles } from "@/src/style";
import HeadImageSection from "@/src/components/headSection/HeadImageSection";
import Filter from "@/src/components/filter/Filter";
import { useState } from "react";
// const Product = products[3];

const ComplianceStatus = () => {
  const [filterType, setFilterType] = useState<string>('PIE');

  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <HeadImageSection />
      <Filter
        currentChart={filterType}
        setCurrentChart={setFilterType}
      />
      <View style={styles.dashboardChartContainer}>
        <ComplianceStatusInfo
          currentChart={filterType}
        />
      </View>
    </SafeAreaView>
  );
};

export default ComplianceStatus;