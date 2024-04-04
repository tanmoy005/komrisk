import { Pressable, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Card, Text } from 'react-native-elements';
import { ReportChartData, PieChartType, LegendItem } from '../types';
import CardSkelton from './skelton/CardSkelton';
import PieChart from 'react-native-pie-chart';
import { FontAwesome } from '@expo/vector-icons';
import { screenWidth, styles } from '../style';


type ChartItemProps = {
  ReportData: ReportChartData[];
  Title: string | null;
  SubTitle: string | null;
};


const PieChartData = ({ ReportData, Title, SubTitle }: ChartItemProps) => {

  const [legends, setLegends] = useState<LegendItem[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [dataValue, setDataValue] = useState<number[]>([]);

  useEffect(() => {
    let ChartColor: string[] = [];
    let ChartValue: number[] = [];
    let legendData: LegendItem[] = [];

    ReportData.forEach(item => {
      legendData = [...legendData, { level: item.label, color: `#${item.color ?? '000'}` }]
      ChartValue.push(item.value);
      ChartColor.push(`#${item.color ?? '000'}`);
    });

    setLegends(legendData);
    setColors(ChartColor);
    setDataValue(ChartValue);
  }, [ReportData]);


  return (
    <View >
      {
        dataValue.length > 0 ?
          <View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <PieChart
                series={dataValue}
                widthAndHeight={screenWidth * .5}
                sliceColor={colors}
                // coverRadius={0.45}
                coverFill={'#FFF'}
              />

            </View>
            <View>
              {legends && legends.map((label: LegendItem) => {
                return (
                  <Pressable style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FontAwesome
                      name="circle"
                      size={25}
                      color={label.color ?? ""}
                      style={{ marginRight: 15, opacity: 1 }}
                    />
                    <Text style={{ color: label.color ?? '' }}>{label.level ?? ''}</Text>
                  </Pressable>
                )
              })}
              <View style={{alignItems: 'flex-start'}}>
                <Text style={styles.title}>{Title}</Text>
                <Text style={styles.title}>{SubTitle}</Text>
              </View>
            </View>
          </View>
          :
          <CardSkelton />
      }
    </View>
  );
};



export default PieChartData;