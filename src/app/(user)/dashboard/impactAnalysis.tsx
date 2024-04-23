import { FlatList, Image, SafeAreaView, StyleSheet, View } from "react-native";

import ImpactAnalysisInfo from "@/src/components/reports/GetImpactAnalysisInfo";
import { styles } from "@/src/style";
import Filter from "@/src/components/filter/Filter";
import { useState } from "react";
import HeadImageSection from "@/src/components/headSection/HeadImageSection";
import moment from "moment";
import { ChartDataFilterDataPayLoad, ChartFilterDataPayLoad, ChartUserFilterDataPayLoad } from "@/src/types";
// const Product = products[3];

const ImpactAnalysis = () => {
  const currentDate: string = moment().format('DD/MM/YYYY');
  const startDate: string = moment().subtract(1, 'months').format('DD/MM/YYYY');
  const [currentChart, setCurrentChart] = useState<string>('PIE');
  const [filterType, setFilterType] = useState<string>('Chart Data');
  const [chartFilterPayload, setChartFilterPayload] = useState<ChartFilterDataPayLoad>({
    start: startDate,
    end: currentDate,
    // viewAs: "COMPANY HEAD",

  });
  const [chartUserFilterPayload, setChartUserFilterPayload] = useState<ChartUserFilterDataPayLoad>({});
  const [chartDataFilterPayload, setChartDataFilterPayload] = useState<ChartDataFilterDataPayLoad>({});

  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <HeadImageSection />
      <Filter
        currentChart={currentChart}
        setCurrentChart={setCurrentChart}
        filterType={filterType}
        setFilterType={setFilterType}
        reportType="COMPLIANCE"
        selectedTab="impact_analysis"
        chartFilterPayload={chartFilterPayload}
        setChartFilterPayload={setChartFilterPayload}
        chartUserFilterPayload={chartUserFilterPayload}
        setChartUserFilterPayload={setChartUserFilterPayload}
        chartDataFilterPayload={chartDataFilterPayload}
        setChartDataFilterPayload={setChartDataFilterPayload}
      />
      <View style={styles.dashboardChartContainer}>
        <ImpactAnalysisInfo
          currentChart={currentChart}
          chartFilterPayload={chartFilterPayload}
          chartUserFilterPayload={chartUserFilterPayload}
          chartDataFilterPayload={chartDataFilterPayload}

        />
      </View>
    </SafeAreaView>
  );
};


export default ImpactAnalysis;