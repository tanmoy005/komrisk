import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Card, Text } from 'react-native-elements';
import {  ReportChartData } from '../types';
import { BarChart } from 'react-native-chart-kit';
import { ChartData } from 'react-native-chart-kit/dist/HelperTypes';
import CardSkelton from './skelton/CardSkelton';


export type ChartItemProps = {
  ReportData: ReportChartData[];
  Title: string | null;
  SubTitle: string | null;
  yAxisName: string | null;
  xAxisName: string | null;
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 1,
  color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

const BarChartData = ({ ReportData, Title, SubTitle, yAxisName, xAxisName }: ChartItemProps) => {
  let labels: string[] = [];
  let dataValue: number[] = [];
  let colors: ((opacity: number) => string)[] = [];

  const [barChartData, setBarChartData] = useState<ChartData>({
    labels: labels,
    datasets: [
      {
        data: dataValue,
        colors: colors,
      },
    ],
  });

  useEffect(() => {

    ReportData.forEach(item => {
      labels.push(item.label);
      dataValue.push(item.value);
      colors.push((opacity = 0) => `#${item.color ?? '000'}`);
    });

    const chartDataFormatted: ChartData = {
      labels: labels,
      datasets: [
        {
          data: dataValue,
          colors: colors,
        },
      ],
    };
    setBarChartData(chartDataFormatted);
    console.log("chartDataFormatted", chartDataFormatted);
    console.log("dataValue", dataValue);
    console.log("colors", colors);
  }, [ReportData]);

  return (
    <Card containerStyle={styles.cardContainer}>
      {
        barChartData.labels.length > 0 ?
          <View>
            <BarChart
              data={barChartData}
              width={350}
              height={250}
              yAxisLabel={yAxisName || ""}
              // xAxisLabel={xAxisName || ""}
              yAxisSuffix={''}
              chartConfig={chartConfig}
              verticalLabelRotation={30}
              withCustomBarColorFromData={true}
            />
            <Text style={styles.title}>{Title}</Text>
            <Text style={styles.title}>{SubTitle}</Text>
          </View>
          :
          <CardSkelton />
      }
    </Card>

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
    gap: 5
  }
});


export default BarChartData;