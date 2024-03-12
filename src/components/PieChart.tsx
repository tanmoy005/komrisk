import { View, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import ComplianceChartData from '@/assets/data/chartdata';
import { PieChart } from 'react-native-chart-kit';
import { Link, useSegments } from 'expo-router';
import { Card, Text } from 'react-native-elements';
interface ChartData {
  label: string;
  color: string | null;
  value: number;
  link: {
    dataFilter: any; // You may want to replace 'any' with a more specific type
    type: string;
    userFilter: any; // You may want to replace 'any' with a more specific type
  };
}
interface ChartType {
  name: string;
  population: number | null;
  color: string | null;
  legendFontColor: string | null;
  legendFontSize: number | null;
}


const PieChartData = () => {

  const { chartData, title, subTitle, yAxisName, xAxisName } = ComplianceChartData;
  const filteredchartData: ChartData[] = chartData.filter(x => x.label !== "NULL" || x.color !== null);
  console.log('filteredchartData', filteredchartData);
  const mappedChartData: ChartType[] = filteredchartData.map((data: ChartData) => {
    // if (data.label != null && data) {
    return {
      name: data.label,
      population: data.value,
      color: data.color,
      legendFontColor: data.color, // or another property you want to use
      legendFontSize: 12, // or another value you want to set
    };
    // }
  });


  return (
    <Link href="/dashboard/chartDataList" asChild>
      <Pressable style={styles.container}>
        <Card containerStyle={styles.cardContainer}>
          <PieChart
            data={mappedChartData}
            width={300}
            height={200}
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
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.title}>{subTitle}</Text>
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
    width: '80%', // Adjust the width as needed
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