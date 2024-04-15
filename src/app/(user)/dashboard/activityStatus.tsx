import { FlatList, Image, SafeAreaView, StyleSheet, View } from "react-native";
import ActivityStatusInfo from "@/src/components/reports/GetActivityStatusInfo";
import { styles } from "@/src/style";
import HeadImageSection from "@/src/components/headSection/HeadImageSection";
import Filter from "@/src/components/filter/Filter";
import { useEffect, useState } from "react";
import { ActivityStatusDataPayLoad, ChartFilterDataPayLoad } from "@/src/types";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/rootReducer";
import moment from "moment";
// const Product = products[3];

const ActivityStatus = () => {


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
        <ActivityStatusInfo
          currentChart={filterType}
          chartFilterPayload={chartFilterPayload}
        />
      </View>
    </SafeAreaView>
  );
};

export default ActivityStatus;