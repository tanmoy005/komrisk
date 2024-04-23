import { SafeAreaView, View } from "react-native";

import ComplianceStatusInfo from "@/src/components/reports/GetComplianceStatusInfo";
import { styles } from "@/src/style";
import HeadImageSection from "@/src/components/headSection/HeadImageSection";
import Filter from "@/src/components/filter/Filter";
import { useState } from "react";
import moment from "moment";
import { ChartDataFilterDataPayLoad, ChartFilterDataPayLoad, ChartUserFilterDataPayLoad } from "@/src/types";
// const Product = products[3];

const ComplianceStatus = () => {
  const currentDate: string = moment().format('DD/MM/YYYY');
  const startDate: string = moment().subtract(1, 'months').format('DD/MM/YYYY');
  const [currentChart, setCurrentChart] = useState<string>('PIE');
  const [filterType, setFilterType] = useState<string>('Chart Data');
  const [chartFilterPayload, setChartFilterPayload] = useState<ChartFilterDataPayLoad>({
    start: startDate,
    end: currentDate,
    // viewAs: "COMPANY EXECUTIVE",

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
        selectedTab="compliance_status"
        reportType="COMPLIANCE"
        setChartFilterPayload={setChartFilterPayload}
        chartFilterPayload={chartFilterPayload}
        chartUserFilterPayload={chartUserFilterPayload}
        setChartUserFilterPayload={setChartUserFilterPayload} 
        chartDataFilterPayload={chartDataFilterPayload}
        setChartDataFilterPayload={setChartDataFilterPayload}
      />
      <View style={styles.dashboardChartContainer}>
        <ComplianceStatusInfo
          currentChart={currentChart}
          chartFilterPayload={chartFilterPayload}
          chartUserFilterPayload={chartUserFilterPayload}
          chartDataFilterPayload={chartDataFilterPayload}
        />
      </View>
    </SafeAreaView>
  );
};

export default ComplianceStatus;