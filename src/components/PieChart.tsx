import { View, StyleSheet, Image, Pressable, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import ComplianceChartData from '@/assets/data/chartdata';
import { PieChart } from 'react-native-chart-kit';
import { Link, useSegments } from 'expo-router';
import { Card, Text } from 'react-native-elements';
import { ActivityStatusData, ActivityStatusDataPayLoad, ChartData, ChartType } from '../types';
import GetActivityStatusData from '../server/api-functions/get-activity-status-data';



const PieChartData = () => {

  const [activityStatusChartData, setActivityStatusChartData] = useState<ActivityStatusData>({
    title: null,
    subTitle: null,
    xAxisName: null,
    yAxisName: null,
    chartData: null
  });
  const [chartData, setChartData] = useState<ChartType[]>([]);

  const handleGetActivityStatusData = async () => {

    const payLoad: ActivityStatusDataPayLoad = {
      username: "anirban@elogixmail.com",
      password: "An1rban@2023",
      start: "01/01/2021",
      viewAs: "COMPANY HEAD",
      end: "31/12/2023"
    }

    const { data, error, status } = await GetActivityStatusData(payLoad);
    if (status === 200) {
      console.log('data', data);

      const { chartData, title, subTitle, yAxisName, xAxisName } = data;
      setActivityStatusChartData(data);
      const filteredchartData: ChartData[] = chartData && chartData.filter((x: ChartData) => x.label !== "NULL" || x.color !== null);

      const mappedChartData: ChartType[] = filteredchartData && filteredchartData.map((data: ChartData) => {
        // if (data.label != null && data) {
        const color = data.color ? "#" + data.color : "#000";
        return {
          name: data.label,
          population: data.value,
          color: color,
          legendFontColor: color, // or another property you want to use
          legendFontSize: 12, // or another value you want to set
        };

        // }
      });
      console.log('filteredchartData', mappedChartData);
      setChartData(mappedChartData);
    } else {
      Alert.alert("error", error.message);
    }

  }
  useEffect(() => {
    handleGetActivityStatusData();
  }, []);




  return (
    <Link href="/dashboard/chartDataList" asChild>
      <Pressable >
        <Card containerStyle={styles.cardContainer}>
          <PieChart
            data={chartData}
            width={350}
            height={250}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
          />
          <Text style={styles.title}>{activityStatusChartData.title}</Text>
          <Text style={styles.title}>{activityStatusChartData.subTitle}</Text>
        </Card>
      </Pressable>
    </Link >
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: '90%', // Adjust the width as needed
    height: '80%',
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#F5F5F5',
    borderRadius: 8
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: 'row',
    gap: 5,
  },

});


export default PieChartData;