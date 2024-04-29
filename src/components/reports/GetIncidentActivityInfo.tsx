import React, { useEffect, useState } from 'react'
import { IncidentActivityDataPayLoad, ReportChartData, IncidentActivityData, ChartProp } from '../../types';
import GetIncidentActivityData from '../../server/api-functions/Chart/get-incident-activity-data';
import { Alert, Pressable } from 'react-native';
import { View } from 'react-native';
import PieChartData from '../charts/PieChart';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import DonatChartData from '../charts/DonatChart';
import BarChartData from '../charts/BarChart';
import { router } from 'expo-router';
import { Card, Text } from 'react-native-elements';
import { styles } from '../../style';
import { FontAwesome } from '@expo/vector-icons';
import CardSkelton from '../skelton/CardSkelton';
import calculatePercentage from '../../utils/associate/get-percentage';

const IncidentActivityInfo = ({ currentChart, chartFilterPayload, chartUserFilterPayload , setRefreshing}: ChartProp) => {
  {
    const [incidentActivityChartData, setIncidentActivityChartData] = useState<IncidentActivityData>({
      title: null,
      subTitle: null,
      xAxisName: null,
      yAxisName: null,
      chartData: null
    });
    const [filteredChartData, setFilteredChartData] = useState<ReportChartData[]>([]);
    const [totalValue, setTotalValue] = useState<number>(0);
    const [noDataAvailable, setNoDataAvailable] = useState<boolean>(false);
    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const [payLoad, setPayLoad] = useState<IncidentActivityDataPayLoad>({
      ...useCredential,
      ...chartFilterPayload,

    });


    const navigateToChartList = (statusType: string, payLoad: IncidentActivityDataPayLoad) => {
      const payloadString = JSON.stringify(payLoad); // Stringify the payload here
      router.push({ pathname: `/chartReport/GetIncidentActivityDataListDetailsInfo`, params: { statusType, payload: payloadString } });
    }
    const handleGetIncidentActivityData = async (payLoad: IncidentActivityDataPayLoad) => {



      const { data, error, status } = await GetIncidentActivityData(payLoad);
      if (status === 200) {
        const { chartData, title, subTitle, yAxisName, xAxisName } = data;
        setIncidentActivityChartData(data);

        const filteredchartData: ReportChartData[] = chartData && chartData.filter((x: ReportChartData) => x.label !== "NULL" || x.color !== null);
        setFilteredChartData(filteredchartData);
        setRefreshing(false);
        if (filteredchartData.length <= 0) {
          setNoDataAvailable(true);
        }
        const sum: number = filteredchartData.map((x: ReportChartData) => x.value).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setTotalValue(sum);
      } else {
        Alert.alert("error", error.message);
      }

    }

    useEffect(() => {
      const updatedPayLoad = {
        ...useCredential,
        ...chartFilterPayload,
        ...chartUserFilterPayload,

      }
      setPayLoad(updatedPayLoad)
      handleGetIncidentActivityData(updatedPayLoad);
    }, [chartFilterPayload, chartUserFilterPayload]);

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
                  yAxisName={incidentActivityChartData.yAxisName}
                  xAxisName={incidentActivityChartData.xAxisName}
                />
              }
              {
                currentChart === 'DONUT' &&
                <DonatChartData ReportData={filteredChartData} />
              }




              <View>
                {filteredChartData && filteredChartData.map((data: ReportChartData, index) => {
                  return (
                    <Pressable key={index} style={{ flexDirection: 'row', alignItems: 'center' }}
                      onPress={() => navigateToChartList(data?.status ?? "", payLoad)}>
                      <FontAwesome
                        name="circle"
                        size={25}
                        color={`#${data.color ?? '000'}`}
                        style={{ marginRight: 15, opacity: 1 }}
                      />
                      <Text style={{ color: `#${data.color ?? '000'}`, ...styles.chartLabel }}>{`${data.label ?? ''}  ${calculatePercentage(data.value, totalValue)}%`}</Text>

                    </Pressable>
                  )
                })}
                <View style={{ alignItems: 'flex-start' }}>
                  <Text style={styles.title}>{incidentActivityChartData.title}</Text>
                  <Text style={styles.title}>{incidentActivityChartData.subTitle}</Text>
                </View>
              </View>
            </Card>
            : (noDataAvailable) ?
              <Card containerStyle={styles.cardContainer}>
                <View>
                  <Text style={styles.title1}>{"No Data Available"}</Text>
                </View>
              </Card>
              : <CardSkelton />
        }
      </View>
    )
  }
}


export default IncidentActivityInfo;
