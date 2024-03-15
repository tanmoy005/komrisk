import React, { useEffect, useState } from 'react'
import { ComplianceStatusDataPayLoad, ChartData, ChartType, ComplianceStatusData } from '../types';
import GetComplianceStatusData from '../server/api-functions/get-compliance-status-data';
import { Alert, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import DropDown from './Dropdown';
import PieChartData from './PieChart';

const ComplianceStatusInfo = () => {
  {
    const [activityStatusChartData, setActivityStatusChartData] = useState<ComplianceStatusData>({
      title: null,
      subTitle: null,
      xAxisName: null,
      yAxisName: null,
      chartData: null
    });
    const [chartData, setChartData] = useState<ChartType[]>([]);

    const handleGetComplianceStatusData = async () => {

      const payLoad: ComplianceStatusDataPayLoad = {
        username: "anirban@elogixmail.com",
        password: "An1rban@2023",
        start: "01/01/2021",
        viewAs: "COMPANY HEAD",
        end: "31/12/2023"
      }

      const { data, error, status } = await GetComplianceStatusData(payLoad);
      if (status === 200) {
        const { chartData, title, subTitle, yAxisName, xAxisName } = data;
        setActivityStatusChartData(data);

        const filteredchartData: ChartData[] = chartData && chartData.filter((x: ChartData) => x.label !== "NULL" || x.color !== null);

        const mappedChartData: ChartType[] = filteredchartData && filteredchartData.map((data: ChartData) => {
          const color = data.color ? "#" + data.color : "#000";
          return {
            name: data.label,
            population: data.value,
            color: color,
            legendFontColor: color, // or another property you want to use
            legendFontSize: 10, // or another value you want to set
          };
        });
        console.log('filteredchartData', mappedChartData);
        setChartData(mappedChartData);
      } else {
        Alert.alert("error", error.message);
      }

    }
    useEffect(() => {
      handleGetComplianceStatusData();
    }, []);


    return (
      <View style={styles.chartContainer}>
        <PieChartData ChartData={chartData} Title={activityStatusChartData.title} SubTitle={activityStatusChartData.subTitle} />
        <View style={styles.chartSelctorContainer}>
          <Text>Chart Type</Text>
          <DropDown />
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
