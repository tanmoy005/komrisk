import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { ReportChartData } from '../../types';
import { scaleCardSize, screenWidth } from '../../style';
import CardSkelton from '../skelton/CardSkelton';

export type dChartItemProps = {
  ReportData: ReportChartData[];
};


const DonatChartData = ({ ReportData }: dChartItemProps) => {
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
            widthAndHeight={scaleCardSize(180)}
            sliceColor={colors}
            coverRadius={0.45}
            coverFill={'#FFF'}
          />
          :
          <CardSkelton />
      }
    </View>
  );
};

export default DonatChartData;
