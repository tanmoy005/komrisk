import { RefreshControl, SafeAreaView, ScrollView, View } from "react-native";
import ActivityStatusInfo from "@/src/components/reports/GetActivityStatusInfo";
import { styles } from "@/src/style";
import HeadImageSection from "@/src/components/headSection/HeadImageSection";
import Filter from "@/src/components/filter/Filter";
import React, { useState } from "react";
import { ChartDataFilterDataPayLoad, ChartFilterDataPayLoad, ChartUserFilterDataPayLoad } from "@/src/types";
import moment from "moment";
// const Product = products[3];

const ActivityStatus = () => {

  const [refreshing, setRefreshing] = useState(true);
  const currentDate: string = moment().format('DD/MM/YYYY');
  const startDate: string = moment().startOf('month').format('DD/MM/YYYY');
  const [currentChart, setCurrentChart] = useState<string>('PIE');
  const [filterType, setFilterType] = useState<string>('Chart Data');
  const [chartFilterPayload, setChartFilterPayload] = useState<ChartFilterDataPayLoad>({
    start: startDate,
    end: currentDate,
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
          reportType="COMPLIANCE"
          selectedTab="activity_status"
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
          <ActivityStatusInfo
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

export default ActivityStatus;