import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Card, Text } from 'react-native-elements';
import { ReportChartData, PieChartType, LegendItem } from '../types';
import CardSkelton from './skelton/CardSkelton';
import PieChart from 'react-native-pie-chart';
import { FontAwesome } from '@expo/vector-icons';


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
    <Card containerStyle={styles.cardContainer}>
      {
        dataValue.length > 0 ?
          <View>
            <PieChart
              series={dataValue}
              widthAndHeight={250}
              sliceColor={colors}
              // coverRadius={0.45}
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


export default PieChartData;