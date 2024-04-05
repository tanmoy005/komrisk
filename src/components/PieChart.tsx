import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ReportChartData } from '../types';
import CardSkelton from './skelton/CardSkelton';
import PieChart from 'react-native-pie-chart';
import { screenWidth } from '../style';

type ChartItemProps = {
  ReportData: ReportChartData[];
};


const PieChartData = ({ ReportData }: ChartItemProps) => {
  const [colors, setColors] = useState<string[]>([]);
  const [dataValue, setDataValue] = useState<number[]>([]);

  useEffect(() => {
    let ChartColor: string[] = [];
    let ChartValue: number[] = [];

    ReportData.forEach(item => {
      ChartValue.push(item.value);
      ChartColor.push(`#${item.color ?? '000'}`);
    });
    setColors(ChartColor);
    setDataValue(ChartValue);
  }, [ReportData]);



  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      {
        dataValue.length > 0 ?
          <PieChart
            series={dataValue}
            widthAndHeight={screenWidth * .48}
            sliceColor={colors}
            coverFill={'#FFF'}
          />
          :
          <CardSkelton />
      }
    </View>
  );
};



export default PieChartData;