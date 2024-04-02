import React, { useEffect, useState } from 'react'
import { ActivityStatusData, ActivityStatusDataPayLoad, ChartData, ChartType } from '../types';
import GetActivityStatusData from '../server/api-functions/get-activity-status-data';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import DropDown from './Dropdown';
import PieChartData from './PieChart';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { Link } from 'expo-router';
import BarChartData from './BarChart';
import DonatChartData from './DonatChart';

const ActivityStatusInfo = () => {
  {
    const [activityStatusChartData, setActivityStatusChartData] = useState<ActivityStatusData>({
      title: null,
      subTitle: null,
      xAxisName: null,
      yAxisName: null,
      chartData: null
    });
    const [chartData, setChartData] = useState<ChartType[]>([]);
    const [currentChart, setCurrentChart] = useState<string>('PIE');
    console.log('currentChart', currentChart);

    const chartItems = [
      { label: 'PIE', value: 'PIE' },
      { label: 'BAR', value: 'BAR' },
      { label: 'DONUT', value: 'DONUT' },
    ];
    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);

    const handleGetActivityStatusData = async () => {

      const payLoad: ActivityStatusDataPayLoad = {
        ...useCredential,
        start: "01/01/2021",
        viewAs: "COMPANY HEAD",
        end: "31/12/2023"
      }
      console.log("payLoad", payLoad);

      const { data, error, status } = await GetActivityStatusData(payLoad);
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
      console.log('filteredchartData')
      handleGetActivityStatusData();
    }, []);


    return (
      <View style={styles.chartContainer}>
        <Link href="/(ChartReport)/GetActivityStatusDataListDetailsInfo" asChild>
          <Pressable>
            {/* {ChartComponent} */}
            {/* <ChartComponent ChartData={chartData} Title={activityStatusChartData.title} SubTitle={activityStatusChartData.subTitle}/> */}
            {/* {items.map((({ Component }) => {
              return (
                <Component ChartData={chartData} Title={activityStatusChartData.title} SubTitle={activityStatusChartData.subTitle} />
              )
            }))} */}
            {
              currentChart === 'PIE' &&
              <PieChartData
                ChartData={chartData}
                Title={activityStatusChartData.title}
                SubTitle={activityStatusChartData.subTitle}
              />
            }
            {
              currentChart === 'BAR' &&
              <BarChartData
                ChartData={chartData}
                Title={activityStatusChartData.title}
                SubTitle={activityStatusChartData.subTitle}
              />
            }
            {
              currentChart === 'DONUT' &&
              <DonatChartData
                ChartData={chartData}
                Title={activityStatusChartData.title}
                SubTitle={activityStatusChartData.subTitle}
              />
            }
          </Pressable>
        </Link>
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
export default ActivityStatusInfo;
