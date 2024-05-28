
import React, { useEffect, useState } from 'react'
import { ComplianceStatusDataPayLoad, ReportChartData, ComplianceStatusData, ChartProp } from '../../types';
import GetComplianceStatusData from '../../server/api-functions/Chart/get-compliance-status-data';
import { Alert, Pressable, Text } from 'react-native';
import { View } from 'react-native';
import PieChartData from '../charts/PieChart';
import { useSelector } from 'react-redux';
import DonatChartData from '../charts/DonatChart';
import BarChartData from '../charts/BarChart';
import { router } from 'expo-router';
import { Card } from 'react-native-elements';
import { styles } from '../../style';
import { FontAwesome } from '@expo/vector-icons';
import CardSkelton from '../skelton/CardSkelton';
import calculatePercentage from '../../utils/associate/get-percentage';
import { RootState } from '@/src/store';


const ComplianceStatusInfo = ({ currentChart, chartFilterPayload, chartUserFilterPayload, chartDataFilterPayload, setRefreshing }: ChartProp) => {
  const [activityStatusChartData, setActivityStatusChartData] = useState<ComplianceStatusData>({
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
  const [payLoad, setPayLoad] = useState<ComplianceStatusDataPayLoad>({
    ...useCredential,
    ...chartFilterPayload,

  });

  const navigateToChartList = (statusType: string, payLoad: ComplianceStatusDataPayLoad) => {
    const payloadString = JSON.stringify(payLoad); // Stringify the payload here
    router.push({ pathname: `/chartReport/GetComplianceStatusDataListDetailsInfo`, params: { statusType, payload: payloadString } });
  }


  const handleGetComplianceStatusData = async (payLoad: ComplianceStatusDataPayLoad) => {
    const { data, error, status } = await GetComplianceStatusData(payLoad);
    if (status === 200) {
      const { chartData, title, subTitle, yAxisName, xAxisName } = data;
      setActivityStatusChartData(data);
      setRefreshing(false);
      const filteredchartData: ReportChartData[] = chartData && chartData.filter((x: ReportChartData) => x.label !== "NULL" || x.color !== null);
      if (filteredchartData.length <= 0) {
        setNoDataAvailable(true);
      }
      setFilteredChartData(filteredchartData);
      const sum: number = filteredchartData.map((x: ReportChartData) => x.value).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      setTotalValue(sum);

    } else {
      // Alert.alert("error", error.message);
    }
  }

  useEffect(() => {
    const updatedPayLoad = {
      ...useCredential,
      ...chartFilterPayload,
      ...chartUserFilterPayload,
      ...chartDataFilterPayload

    }
    setPayLoad(updatedPayLoad)
    handleGetComplianceStatusData(updatedPayLoad);
  }, [chartFilterPayload, chartUserFilterPayload, chartDataFilterPayload]);

  useEffect(() => {
    handleGetComplianceStatusData(payLoad);
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
                    <Text style={{ color: `#${label.color ?? '000'}`, ...styles.chartLabel }}>{`${label.label ?? ''}  ${calculatePercentage(label.value, totalValue)}%`}</Text>

                  </Pressable>
                )
              })}
              <View style={{ alignItems: 'flex-start' }}>
                <Text style={styles.title}>{activityStatusChartData.title}</Text>
                <Text style={styles.title}>{activityStatusChartData.subTitle}</Text>
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

export default ComplianceStatusInfo;

