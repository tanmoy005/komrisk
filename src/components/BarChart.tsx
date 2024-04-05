import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ReportChartData } from '../types';
import { BarChart } from 'react-native-chart-kit';
import { ChartData } from 'react-native-chart-kit/dist/HelperTypes';
import CardSkelton from './skelton/CardSkelton';
import { screenWidth } from '../style';


export type ChartItemProps = {
  ReportData: ReportChartData[];
  yAxisName: string | null;
  xAxisName: string | null;
};

const chartConfig = {
  backgroundGradientFrom: '#F5F5F5',
  backgroundGradientTo: '#F5F5F5',
  fillShadowGradientOpacity: 1,
  decimalPlaces: 0,
  color: (opacity = 255) => `rgba(10, 10, 10, ${opacity})`,
};

const BarChartData = ({ ReportData, yAxisName, xAxisName }: ChartItemProps) => {
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
      colors.push((opacity = 255) => `#${item.color ?? '000'}`);
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
    // console.log("chartDataFormatted", chartDataFormatted);
    // console.log("dataValue", dataValue);
    // console.log("colors", colors);
  }, [ReportData]);

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      {
        barChartData.labels.length > 0 ?
          <BarChart
            data={barChartData}
            width={screenWidth * .78}
            height={screenWidth * .42}
            yAxisLabel={""}
            xAxisLabel={""}
            yAxisSuffix={""}
            chartConfig={chartConfig}
            withCustomBarColorFromData={true}
            withHorizontalLabels={false}
            fromZero={true}
            showBarTops={false}
            showValuesOnTopOfBars={true}
            withVerticalLabels={false}
          />
          :
          <CardSkelton />
      }
    </View>
  );
};


export default BarChartData;