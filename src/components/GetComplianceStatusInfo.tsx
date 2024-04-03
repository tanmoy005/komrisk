import React, { useEffect, useState } from 'react'
import { ComplianceStatusDataPayLoad, ReportChartData, ComplianceStatusData } from '../types';
import GetComplianceStatusData from '../server/api-functions/get-compliance-status-data';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import DropDown from './Dropdown';
import PieChartData from './PieChart';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import DonatChartData from './DonatChart';
import BarChartData from './BarChart';
import { Link } from 'expo-router';

const ComplianceStatusInfo = () => {
  {
    const [activityStatusChartData, setActivityStatusChartData] = useState<ComplianceStatusData>({
      title: null,
      subTitle: null,
      xAxisName: null,
      yAxisName: null,
      chartData: null
    });
    const [filteredChartData, setFilteredChartData] = useState<ReportChartData[]>([]);
    const [currentChart, setCurrentChart] = useState<string>('PIE');
    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const chartItems = [
      { label: 'PIE', value: 'PIE' },
      { label: 'BAR', value: 'BAR' },
      { label: 'DONUT', value: 'DONUT' },
    ];

    const handleGetComplianceStatusData = async () => {

      const payLoad: ComplianceStatusDataPayLoad = {
        ...useCredential,
        start: "01/01/2021",
        viewAs: "COMPANY HEAD",
        end: "31/12/2023"
      }

      const { data, error, status } = await GetComplianceStatusData(payLoad);
      if (status === 200) {
        const { chartData, title, subTitle, yAxisName, xAxisName } = data;
        setActivityStatusChartData(data);

        const filteredchartData: ReportChartData[] = chartData && chartData.filter((x: ReportChartData) => x.label !== "NULL" || x.color !== null);
        setFilteredChartData(filteredchartData);
      } else {
        Alert.alert("error", error.message);
      }

    }
    useEffect(() => {
      handleGetComplianceStatusData();
    }, []);


    return (
      <View style={styles.chartContainer}>
        <Link href="/(ChartReport)/GetComplianceStatusDataListDetailsInfo" asChild>
          <Pressable>
            {
              currentChart === 'PIE' &&
              <PieChartData
                ReportData={filteredChartData}
                Title={activityStatusChartData.title}
                SubTitle={activityStatusChartData.subTitle}
              />
            }
            {
              currentChart === 'BAR' &&
              <BarChartData
                ReportData={filteredChartData}
                Title={activityStatusChartData.title}
                SubTitle={activityStatusChartData.subTitle}
                yAxisName={activityStatusChartData.yAxisName}
                xAxisName={activityStatusChartData.xAxisName}
              />
            }
            {/* {
              currentChart === 'DONUT' &&
              <DonatChartData
                ChartData={chartData}
                Title={activityStatusChartData.title}
                SubTitle={activityStatusChartData.subTitle}
              />
            } */}
          </Pressable>
        </Link>
        {/* <PieChartData ChartData={chartData} Title={activityStatusChartData.title} SubTitle={activityStatusChartData.subTitle} /> */}
        <View style={styles.chartSelctorContainer}>
          <Text>Chart Type</Text>
          <DropDown
            selectedValue={currentChart}
            dropdownItems={chartItems}
            setSelectedValue={setCurrentChart}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  chartSelctorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '75%'

  },
  chartContainer: {
    width: '100%',
    alignItems: 'center'
  },

});
export default ComplianceStatusInfo;
