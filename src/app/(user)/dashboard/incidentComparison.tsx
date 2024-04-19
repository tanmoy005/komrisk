import { FlatList, Image, SafeAreaView, StyleSheet, View } from "react-native";

import IncidentComparisonInfo from "@/src/components/reports/GetIncidentComparisonInfo";
import { styles } from "@/src/style";
import HeadImageSection from "@/src/components/headSection/HeadImageSection";
import Filter from "@/src/components/filter/Filter";
import { useState } from "react";
import moment from "moment";
import { ChartFilterDataPayLoad } from "@/src/types";
// const Product = products[3];

const IncidentComparison = () => {
  const currentDate: string = moment().format('DD/MM/YYYY');
  const startDate: string = moment().subtract(1, 'months').format('DD/MM/YYYY');
  const [currentChart, setCurrentChart] = useState<string>('PIE');
  const [filterType, setFilterType] = useState<string>('Chart Data');
  const [chartFilterPayload, setChartFilterPayload] = useState<ChartFilterDataPayLoad>({
    start: startDate,
    viewAs: "COMPANY HEAD",
    end: currentDate

  });
  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <HeadImageSection />
      <Filter
        currentChart={currentChart}
        setCurrentChart={setCurrentChart}
        filterType={filterType}
        setFilterType={setFilterType}
        reportType="INCIDENT"
        selectedTab = "incident_comparison"
        setChartFilterPayload={setChartFilterPayload}
        chartFilterPayload={chartFilterPayload}
      />
      <View style={styles.dashboardChartContainer}>
        <IncidentComparisonInfo
          currentChart={currentChart}
          chartFilterPayload={chartFilterPayload}
        />
      </View>
    </SafeAreaView>
  );
};

export default IncidentComparison;