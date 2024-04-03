import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-native-chart-kit';
import { Card, Text } from 'react-native-elements';
import { ReportChartData, PieChartType } from '../types';
import CardSkelton from './skelton/CardSkelton';


type ChartItemProps = {
  ReportData: ReportChartData[];
  Title: string | null;
  SubTitle: string | null;
};


const PieChartData = ({ ReportData, Title, SubTitle }: ChartItemProps) => {

  const [chartData, setChartData] = useState<PieChartType[]>([]);

  useEffect(() => {
    const ChartDataPie = ReportData && ReportData.map((data: ReportChartData) => {
      const color = data.color ? "#" + data.color : "#000";
      return {
        name: data.label,
        population: data.value,
        color: color,
        legendFontColor: color, // or another property you want to use
        legendFontSize: 10, // or another value you want to set
      };
    });
    setChartData(ChartDataPie);
  }, [ReportData]);

  // setChartData(mappedChartData);
  return (
    <Card containerStyle={styles.cardContainer}>
      {
        chartData.length > 0 ?
          <View>
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
              hasLegend={true}
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


export default PieChartData;