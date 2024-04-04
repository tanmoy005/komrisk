import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { LegendItem, ReportChartData } from '../types';
import { Card, Text } from 'react-native-elements';
import CardSkelton from './skelton/CardSkelton';
import { FontAwesome } from '@expo/vector-icons';

export type dChartItemProps = {
  ReportData: ReportChartData[];
  Title: string | null;
  SubTitle: string | null;
};


const DonatChartData = ({ ReportData, Title, SubTitle }: dChartItemProps) => {
  const [legends, setLegends] = useState<LegendItem[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [dataValue, setDataValue] = useState<number[]>([]);

  useEffect(() => {
    let legendData: LegendItem[] = [];
    let ChartColor: string[] = [];
    let ChartValue: number[] = [];

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
    <Card containerStyle={styles.cardContainer}>
      {
        dataValue.length > 0 ?
          <View>
            <PieChart
              series={dataValue}
              widthAndHeight={240}
              sliceColor={colors}
              coverRadius={0.45}
              coverFill={'#FFF'}
            />
            {legends && legends.map((label: LegendItem) => {
              return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome
                    name="circle"
                    size={25}
                    color={label.color ?? ""}
                    style={{ marginRight: 15, opacity: 1 }}
                  />
                  <Text style={{ color: label.color ?? '' }}>{label.level ?? ''}</Text>
                </View>
              )
            })}
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
    width: '100%', // Adjust the width as needed
    height: '84%',
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    // padding: 9,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitleContainer: {
    flexDirection: 'row',
    gap: 5
  }
});


export default DonatChartData;
