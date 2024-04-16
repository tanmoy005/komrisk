import { FlatList, Image, SafeAreaView, StyleSheet, View } from "react-native";

import ImpactAnalysisInfo from "@/src/components/reports/GetImpactAnalysisInfo";
import { styles } from "@/src/style";
import Filter from "@/src/components/filter/Filter";
import { useState } from "react";
import HeadImageSection from "@/src/components/headSection/HeadImageSection";
import moment from "moment";
import { ChartFilterDataPayLoad } from "@/src/types";
// const Product = products[3];

const ImpactAnalysis = () => {
  const currentDate: string = moment().format('DD/MM/YYYY');
  const startDate: string = moment().subtract(1, 'months').format('DD/MM/YYYY');
  const [filterType, setFilterType] = useState<string>('PIE');
  const [chartFilterPayload, setChartFilterPayload] = useState<ChartFilterDataPayLoad>({
    start: startDate,
    viewAs: "COMPANY HEAD",
    end: currentDate

  });

  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <HeadImageSection />
      <Filter
        currentChart={filterType}
        setCurrentChart={setFilterType}
        reportType="COMPLIANCE"
        setChartFilterPayload={setChartFilterPayload}
        chartFilterPayload={chartFilterPayload}
      />
      <View style={styles.dashboardChartContainer}>
        <ImpactAnalysisInfo
          currentChart={filterType}
          chartFilterPayload={chartFilterPayload}

        />
      </View>
    </SafeAreaView>
  );
};


export default ImpactAnalysis;