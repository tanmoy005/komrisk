import { RefreshControl, SafeAreaView, ScrollView, View } from "react-native";

import IncidentActivityInfo from "@/src/components/reports/GetIncidentActivityInfo";
import { styles } from "@/src/style";
import React, { useState } from "react";
import HeadImageSection from "@/src/components/headSection/HeadImageSection";
import Filter from "@/src/components/filter/Filter";
import moment from "moment";
import { ChartDataFilterDataPayLoad, ChartFilterDataPayLoad, ChartUserFilterDataPayLoad } from "@/src/types";

const IncidentActivity = () => {
  const [refreshing, setRefreshing] = useState(true);
  const currentDate: string = moment().format('DD/MM/YYYY');
  const startDate: string = moment().startOf('month').format('DD/MM/YYYY');
  const [currentChart, setCurrentChart] = useState<string>('PIE');
  const [filterType, setFilterType] = useState<string>('Chart Data');
  const [chartFilterPayload, setChartFilterPayload] = useState<ChartFilterDataPayLoad>({
    start: startDate,
    end: currentDate
    // viewAs: "COMPANY HEAD",

  });
  const [chartUserFilterPayload, setChartUserFilterPayload] = useState<ChartUserFilterDataPayLoad>({});
  const [chartDataFilterPayload, setChartDataFilterPayload] = useState<ChartDataFilterDataPayLoad>({});

  const onRefresh = React.useCallback(() => {
    const defaultFilterPayload: ChartFilterDataPayLoad = {
      start: startDate,
      end: currentDate,
    }
    setChartFilterPayload(defaultFilterPayload)
    setChartUserFilterPayload({})
    setChartDataFilterPayload({})
    setRefreshing(true);
  }, []);

  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <HeadImageSection />
      <View>
        <Filter
          currentChart={currentChart}
          setCurrentChart={setCurrentChart}
          filterType={filterType}
          setFilterType={setFilterType}
          reportType="INCIDENT"
          selectedTab="incident_activity"
          setChartFilterPayload={setChartFilterPayload}
          chartFilterPayload={chartFilterPayload}
          chartUserFilterPayload={chartUserFilterPayload}
          setChartUserFilterPayload={setChartUserFilterPayload}
          chartDataFilterPayload={chartDataFilterPayload}
          setChartDataFilterPayload={setChartDataFilterPayload}
        />
        <ScrollView
          contentContainerStyle={styles.dashboardChartContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <IncidentActivityInfo
            currentChart={currentChart}
            chartFilterPayload={chartFilterPayload}
            chartUserFilterPayload={chartUserFilterPayload}
            chartDataFilterPayload={chartDataFilterPayload}
            setRefreshing={setRefreshing}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};


export default IncidentActivity;