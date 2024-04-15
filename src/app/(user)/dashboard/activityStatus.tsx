import { FlatList, Image, SafeAreaView, StyleSheet, View } from "react-native";
import ActivityStatusInfo from "@/src/components/reports/GetActivityStatusInfo";
import { styles } from "@/src/style";
import HeadImageSection from "@/src/components/headSection/HeadImageSection";
import Filter from "@/src/components/filter/Filter";
import { useState } from "react";
import { ActivityStatusDataPayLoad } from "@/src/types";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/rootReducer";
import moment from "moment";
// const Product = products[3];

const ActivityStatus = () => {
  const [filterType, setFilterType] = useState<string>('PIE');
  const [filterPayload, setFilterPayload] = useState<ActivityStatusDataPayLoad>({});

  const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
  const currentDate: string = moment().format('DD/MM/YYYY');
  const startDate: string = moment().subtract(1, 'months').format('DD/MM/YYYY');

  const payLoad: ActivityStatusDataPayLoad = {
    ...useCredential,
    start: startDate,
    viewAs: "COMPANY HEAD",
    end: currentDate
  }
  setFilterPayload(payLoad);

  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <HeadImageSection />
      <Filter
        currentChart={filterType}
        setCurrentChart={setFilterType}
        reportType="COMPLIANCE"
        setFilterPayload={setFilterPayload}
      />
      <View style={styles.dashboardChartContainer}>
        <ActivityStatusInfo
          currentChart={filterType}
          filterPayload={filterPayload}
        />
      </View>
    </SafeAreaView>
  );
};

export default ActivityStatus;