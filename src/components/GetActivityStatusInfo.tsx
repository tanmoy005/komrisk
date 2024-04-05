import React, { useEffect, useState } from 'react'
import { ActivityStatusData, ActivityStatusDataPayLoad, ReportChartData } from '../types';
import GetActivityStatusData from '../server/api-functions/get-activity-status-data';
import { Alert, Pressable } from 'react-native';
import { View } from 'react-native';
import DropDown from './Dropdown';
import PieChartData from './PieChart';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { router } from 'expo-router';
import BarChartData from './BarChart';
import DonatChartData from './DonatChart';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from '../style';
import { Card, Text } from 'react-native-elements';
import CardSkelton from './skelton/CardSkelton';
import moment from 'moment';

const ActivityStatusInfo = () => {
  {
    const [activityStatusChartData, setActivityStatusChartData] = useState<ActivityStatusData>({
      title: null,
      subTitle: null,
      xAxisName: null,
      yAxisName: null,
      chartData: null
    });
    const [filteredChartData, setFilteredChartData] = useState<ReportChartData[]>([]);
    const [currentChart, setCurrentChart] = useState<string>('PIE');

    const chartItems = [
      { label: 'PIE', value: 'PIE' },
      { label: 'BAR', value: 'BAR' },
      { label: 'DONUT', value: 'DONUT' },
    ];
    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const currentDate: string = moment().format('DD/MM/YYYY');
    const startDate: string = moment().subtract(1, 'months').format('DD/MM/YYYY');

    const payLoad: ActivityStatusDataPayLoad = {
      ...useCredential,
      start: startDate,
      viewAs: "COMPANY HEAD",
      end: currentDate
    }

    const navigateToChartList = (statusType: string) => {
      router.push({ pathname: `/chartReport/GetActivityStatusDataListDetailsInfo`, params: { statusType, } }); // Remove the braces in para
    }
    const handleGetActivityStatusData = async (payLoad: ActivityStatusDataPayLoad) => {

      // const payLoad: ActivityStatusDataPayLoad = {
      //   ...useCredential,
      //   start: startDate,
      //   viewAs: "COMPANY HEAD",
      //   end: currentDate
      // }
      // //console.log("payLoad", payLoad);

      const { data, error, status } = await GetActivityStatusData(payLoad);
      if (status === 200) {
        const { chartData, title, subTitle, yAxisName, xAxisName } = data;
        setActivityStatusChartData(data);

        const filteredchartData: ReportChartData[] = chartData && chartData.filter((x: ReportChartData) => x.label !== "NULL" || x.color !== null);
        setFilteredChartData(filteredchartData);
      } else {
        Alert.alert("error", error.message);
      }

    }
    useEffect(() => {
      // //console.log('filteredchartData')
      handleGetActivityStatusData(payLoad);
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
                  yAxisName={activityStatusChartData.yAxisName}
                  xAxisName={activityStatusChartData.xAxisName}
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
                  <Text style={styles.title}>{activityStatusChartData.title}</Text>
                  <Text style={styles.title}>{activityStatusChartData.subTitle}</Text>
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

export default ActivityStatusInfo;
