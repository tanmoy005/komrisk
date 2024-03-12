import React, { useState } from 'react';
import { View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
// import { ChartData, ChartType } from "@/src/types";

interface ChartData {
  label: string;
  color: string | null;
  value: number;
  link: {
    dataFilter: any; // You may want to replace 'any' with a more specific type
    type: string;
    userFilter: any; // You may want to replace 'any' with a more specific type
  };
}
interface ChartType {
  name: string;
  population: string | null;
  color: string | null;
  legendFontColor: string | null;
  legendFontSize: string | null;
}

const PieChartData: React.FC = () => {

  // const { chartData ,title,subTitle,yAxisName,xAxisName} = ChartData;
  let data: Array<ChartType> = [];
  // const [chartdatalist, setChartdatalist] = useState<ChartType>();
  // const chartdatalist : ChartType[] ;
  // { name: 'Red', population: 25, color: '#FF5733', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  // { name: 'Green', population: 75, color: '#33FF57', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  // ];
  // const mappedChartData: ChartType[] = chartData.map((data: ChartData) => {
  //   return {
  //     name: data.label,
  //     population: data.value.toString(),
  //     color: data.color,
  //     legendFontColor: data.color, // or another property you want to use
  //     legendFontSize: "12px", // or another value you want to set
  //   };
  // });

  // data: [] = chartData.map((data: ChartData) => {
  //   return {
  //     name: data.label,
  //     population: data.value,
  //     color: data.color,
  //     legendFontColor: data.color,
  //     legendFontSize: 15
  //   }
  // });
  // <button key={index}>{myButton}</button>);



  return (
    <View>
      {/* <PieChart
        data={mappedChartData}
        width={300}
        height={200}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor={title}
        backgroundColor="transparent"
        paddingLeft="15"
      /> */}
    </View>
  );
};

export default PieChartData;