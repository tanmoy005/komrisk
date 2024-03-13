import { StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { Link } from 'expo-router';
import { Card, Text } from 'react-native-elements';
import { ChartType } from '../types';


type ChartItemProps = {
  ChartData: ChartType[];
  Title: string | null;
  SubTitle: string | null;
};


const PieChartData = ({ ChartData, Title, SubTitle }: ChartItemProps) => {

  return (
    <Link href="/chartDataList" asChild>
      <Pressable >
        <Card containerStyle={styles.cardContainer}>
          <PieChart
            data={ChartData}
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
            hasLegend= {true}
          />
          <Text style={styles.title}>{Title}</Text>
          <Text style={styles.title}>{SubTitle}</Text>
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
    gap: 5,
  },

});


export default PieChartData;