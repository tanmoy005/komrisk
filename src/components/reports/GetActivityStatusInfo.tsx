import React, { useEffect, useState } from 'react'
import { ActivityStatusData, ActivityStatusDataPayLoad, ChartProp, ReportChartData } from '../../types';
import GetActivityStatusData from '../../server/api-functions/get-activity-status-data';
import { Alert, Pressable } from 'react-native';
import { View } from 'react-native';
import PieChartData from '../charts/PieChart';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { router } from 'expo-router';
import BarChartData from '../charts/BarChart';
import DonatChartData from '../charts/DonatChart';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from '../../style';
import { Card, Text } from 'react-native-elements';
import CardSkelton from '../skelton/CardSkelton';
import moment from 'moment';
import calculatePercentage from '../../utils/associate/get-percentage';

const ActivityStatusInfo = ({ currentChart }: ChartProp) => {
  {
    const [activityStatusChartData, setActivityStatusChartData] = useState<ActivityStatusData>({
      title: null,
      subTitle: null,
      xAxisName: null,
      yAxisName: null,
      chartData: null
    });
    const [filteredChartData, setFilteredChartData] = useState<ReportChartData[]>([]);
    const [totalValue, setTotalValue] = useState<number>(0);

    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const currentDate: string = moment().format('DD/MM/YYYY');
    const startDate: string = moment().subtract(1, 'months').format('DD/MM/YYYY');

    console.log("*********2")

    const payLoad: ActivityStatusDataPayLoad = {
      ...useCredential,
      start: startDate,
      viewAs: "COMPANY HEAD",
      end: currentDate
    }

    console.log("payload up*****", payLoad)


    const navigateToChartList = (statusType: string, payLoad: ActivityStatusDataPayLoad) => {
      const payloadString = JSON.stringify(payLoad); // Stringify the payload here
      router.push({ pathname: `/chartReport/GetActivityStatusDataListDetailsInfo`, params: { statusType, payload: payloadString } });
    }




    // const navigateToChartList = (statusType: string, payLoad: ActivityStatusDataPayLoad) => {
    //   router.push({ pathname: `/chartReport/GetActivityStatusDataListDetailsInfo`, params: { statusType, payLoad } });
    // }
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
        const sum: number = filteredchartData.map((x: ReportChartData) => x.value).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setTotalValue(sum);
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
                      onPress={() => navigateToChartList(label?.link?.type ?? "", payLoad)}
                    >
                      <FontAwesome
                        name="circle"
                        size={25}
                        color={`#${label.color ?? '000'}`}
                        style={{ marginRight: 15, opacity: 1 }}
                      />
                      <Text style={{ color: `#${label.color ?? '000'}` }}>{`${label.label ?? ''}  ${calculatePercentage(label.value, totalValue)}%`}</Text>
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

      </View>
    )
  }
}

export default ActivityStatusInfo;
