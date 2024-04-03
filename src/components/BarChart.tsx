import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { Card, Text } from 'react-native-elements';
import { ReportChartData } from '../types';
import { BarChart } from 'react-native-chart-kit';
import { ChartData } from 'react-native-chart-kit/dist/HelperTypes';


type ChartItemProps = {
  ReportData: ReportChartData[];
  Title: string | null;
  SubTitle: string | null;
  yAxisName: string | null;
  xAxisName: string | null;
};


const data: ChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      colors: [
        (opacity = 1) => 'rgba(255, 99, 132, 0.6)', // You can set your custom colors here
        (opacity = 1) => 'rgba(54, 162, 235, 0.6)',
        (opacity = 1) => 'rgba(255, 206, 86, 0.6)',
        (opacity = 1) => 'rgba(75, 192, 192, 0.6)',
        (opacity = 1) => 'rgba(153, 102, 255, 0.6)',
        (opacity = 1) => 'rgba(255, 159, 64, 0.6)',],
    },
  ],
};
const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};
const BarChartData = ({ ReportData, Title, SubTitle, yAxisName, xAxisName }: ChartItemProps) => {


  useEffect(() => {
    const ChartDataBar = ReportData && ReportData.map((data: ReportChartData) => {
      const color = data.color ? "#" + data.color : "#000";

      return {
        labels: data.label,
        datasets: data.value,
        color: color,
        legendFontColor: color, // or another property you want to use
        legendFontSize: 10, // or another value you want to set
      };
    });
    //console.log("ChartData", Title, SubTitle, yAxisName, xAxisName);
    // setChartData(ChartDataPie);
  }, [ReportData]);
  return (
    // <Link href="/chartDataList" asChild>
    //   <Pressable >
    <Card containerStyle={styles.cardContainer}>
      <Text>Bar Chart</Text>
      <BarChart
        data={data}
        width={350}
        height={200}
        yAxisSuffix={yAxisName || ""}
        yAxisLabel={xAxisName || ""}
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        withCustomBarColorFromData={true}
      />
      <Text style={styles.title}>{Title}</Text>
      <Text style={styles.title}>{SubTitle}</Text>
    </Card>
    //   </Pressable>
    // </Link >
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
    marginBottom: 5
  },
  subtitleContainer: {
    flexDirection: 'row',
    gap: 5
  }
});


export default BarChartData;