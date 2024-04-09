import React, { useEffect, useState } from 'react'
import { IncidentComparisonDataPayLoad, ReportChartData, IncidentComparisonData } from '../types';
import GetIncidentComparisonData from '../server/api-functions/get-incident-comparison-data';
import { Alert, Pressable } from 'react-native';
import { View } from 'react-native';
import DropDown from './Dropdown';
import PieChartData from './PieChart';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import DonatChartData from './DonatChart';
import BarChartData from './BarChart';
import { router } from 'expo-router';
import { Card, Text } from 'react-native-elements';
import { styles } from '../style';
import { FontAwesome } from '@expo/vector-icons';
import CardSkelton from './skelton/CardSkelton';
import moment from 'moment';

const IncidentComparisonInfo = () => {
  {
    const [incidentComparisonChartData, setIncidentComparisonChartData] = useState<IncidentComparisonData>({
      title: null,
      subTitle: null,
      xAxisName: null,
      yAxisName: null,
      chartData: null
    });
    const [filteredChartData, setFilteredChartData] = useState<ReportChartData[]>([]);
    const [currentChart, setCurrentChart] = useState<string>('PIE');
    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const currentDate: string = moment().format('DD/MM/YYYY');
    const startDate: string = moment().subtract(1, 'months').format('DD/MM/YYYY');

    const chartItems = [
      { label: 'PIE', value: 'PIE' },
      { label: 'BAR', value: 'BAR' },
      { label: 'DONUT', value: 'DONUT' },
    ];
    const navigateToChartList = (statusType: string) => {
      router.push({ pathname: `/chartReport/GetIncidentComparisonDataListDetailsInfo`, params: { statusType } }); // Remove the braces in para
    }
    const handleGetIncidentComparisonData = async () => {

      const payLoad: IncidentComparisonDataPayLoad = {
        ...useCredential,
        start: startDate,
        viewAs: "COMPANY HEAD",
        end: currentDate
      }

      const { data, error, status } = await GetIncidentComparisonData(payLoad);
      if (status === 200) {
        const { chartData, title, subTitle, yAxisName, xAxisName } = data;
        setIncidentComparisonChartData(data);

        const filteredchartData: ReportChartData[] = chartData && chartData.filter((x: ReportChartData) => x.label !== "NULL" || x.color !== null);
        setFilteredChartData(filteredchartData);

      } else {
        Alert.alert("error", error.message);
      }

    }
    useEffect(() => {
        handleGetIncidentComparisonData();
    }, []);

    return (
      <View style={styles.chartContainer}>
        {
          filteredChartData.length > 0 ?
            <Card containerStyle={styles.cardContainer}>
              {
                currentChart === 'PIE' &&
                <PieChartData ReportData={filteredChartData} />
              }
              {
                currentChart === 'BAR' &&
                <BarChartData
                  ReportData={filteredChartData}
                  yAxisName={incidentComparisonChartData.yAxisName}
                  xAxisName={incidentComparisonChartData.xAxisName}
                />
              }
              {
                currentChart === 'DONUT' &&
                <DonatChartData ReportData={filteredChartData} />
              }

              <View>
                {filteredChartData && filteredChartData.map((label: ReportChartData, index) => {
                  return (
                    <Pressable key={index} style={{ flexDirection: 'row', alignItems: 'center' }}
                      onPress={() => navigateToChartList(label?.link?.type ?? "")}
                    >
                      <FontAwesome
                        name="circle"
                        size={25}
                        color={`#${label.color ?? '000'}`}
                        style={{ marginRight: 15, opacity: 1 }}
                      />
                      <Text style={{ color: `#${label.color ?? '000'}` }}>{label.label ?? ''}</Text>
                    </Pressable>
                  )
                })}
                <View style={{ alignItems: 'flex-start' }}>
                  <Text style={styles.title}>{incidentComparisonChartData.title}</Text>
                  <Text style={styles.title}>{incidentComparisonChartData.subTitle}</Text>
                </View>
              </View>

            </Card>
            : <CardSkelton />
        }
        <View style={styles.chartSelctorContainer}>
          <Text>Chart Type</Text>
          <DropDown
            selectedValue={currentChart}
            dropdownItems={chartItems}
            setSelectedValue={setCurrentChart}
          />
        </View>
      </View>
    )
  }
}


export default IncidentComparisonInfo;