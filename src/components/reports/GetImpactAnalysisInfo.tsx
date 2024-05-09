import React, { useEffect, useState } from 'react'
import { ImpactAnalysisDataPayLoad, ReportChartData, ImpactAnalysisData, ChartProp } from '../../types';
import GetImpactAnalysisData from '../../server/api-functions/Chart/get-impact-analysis-data';
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

const ImpactAnalysisInfo = ({ currentChart, chartFilterPayload, chartUserFilterPayload, chartDataFilterPayload , setRefreshing}: ChartProp) => {
  {
    const [impactAnalysisChartData, setImpactAnalysisChartData] = useState<ImpactAnalysisData>({
      title: null,
      subTitle: null,
      xAxisName: null,
      yAxisName: null,
      chartData: null
    });
    const [totalValue, setTotalValue] = useState<number>(0);
    const [noDataAvailable, setNoDataAvailable] = useState<boolean>(false);
    const [filteredChartData, setFilteredChartData] = useState<ReportChartData[]>([]);
    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const [payLoad, setPayLoad] = useState<ImpactAnalysisDataPayLoad>({
      ...useCredential,
      ...chartFilterPayload,

    });


    const navigateToChartList = (statusType: string, payLoad: ImpactAnalysisDataPayLoad) => {
      const payloadString = JSON.stringify(payLoad); // Stringify the payload here
      router.push({ pathname: `/chartReport/GetImpactAnalysisDataListDetailsInfo`, params: { statusType, payload: payloadString } });
    }

    const handleGetImpactAnalysisData = async (payLoad: ImpactAnalysisDataPayLoad) => {



      const { data, error, status } = await GetImpactAnalysisData(payLoad);
      if (status === 200) {
        const { chartData, title, subTitle, yAxisName, xAxisName } = data;
        setImpactAnalysisChartData(data);

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
        ...chartDataFilterPayload

      }
      setPayLoad(updatedPayLoad)
      handleGetImpactAnalysisData(updatedPayLoad);
    }, [chartFilterPayload, chartUserFilterPayload, chartDataFilterPayload]);

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
                  yAxisName={impactAnalysisChartData.yAxisName}
                  xAxisName={impactAnalysisChartData.xAxisName}
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
                  <Text style={styles.title}>{impactAnalysisChartData.title}</Text>
                  <Text style={styles.title}>{impactAnalysisChartData.subTitle}</Text>
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


export default ImpactAnalysisInfo;
