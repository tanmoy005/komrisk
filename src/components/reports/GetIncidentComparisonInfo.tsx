
import BarChartData from '@/src/components/charts/BarChart';
import DonatChartData from '@/src/components/charts/DonatChart';
import PieChartData from '@/src/components/charts/PieChart';
import CardSkelton from '@/src/components/skelton/CardSkelton';
import GetIncidentComparisonData from '@/src/server/api-functions/Chart/get-incident-comparison-data';
import { RootState } from '@/src/store';
import { styles } from '@/src/style';
import { ChartProp, IncidentComparisonData, IncidentComparisonDataPayLoad, ReportChartData } from '@/src/types';
import calculatePercentage from '@/src/utils/associate/get-percentage';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';


const IncidentComparisonInfo = ({ currentChart, chartFilterPayload, chartUserFilterPayload, setRefreshing }: ChartProp) => {
  {
    const [incidentComparisonChartData, setIncidentComparisonChartData] = useState<IncidentComparisonData>({
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
    const [payLoad, setPayLoad] = useState<IncidentComparisonDataPayLoad>({
      ...useCredential,
      ...chartFilterPayload,

    });

    const navigateToChartList = (statusType: string, payLoad: IncidentComparisonDataPayLoad) => {
      const payloadString = JSON.stringify(payLoad); // Stringify the payload here
      router.push({ pathname: `/chartReport/GetIncidentComparisonDataListDetailsInfo`, params: { statusType, payload: payloadString } });
    }
    const handleGetIncidentComparisonData = async (payLoad: IncidentComparisonDataPayLoad) => {



      const { data, error, status } = await GetIncidentComparisonData(payLoad);
      if (status === 200) {
        const { chartData, title, subTitle, yAxisName, xAxisName } = data;
        setIncidentComparisonChartData(data);

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
      handleGetIncidentComparisonData(updatedPayLoad);
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
                  yAxisName={incidentComparisonChartData.yAxisName}
                  xAxisName={incidentComparisonChartData.xAxisName}
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
                      onPress={() => navigateToChartList(data?.comparison ?? "", payLoad)}>
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
                  <Text style={styles.title}>{incidentComparisonChartData.title}</Text>
                  <Text style={styles.title}>{incidentComparisonChartData.subTitle}</Text>
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


export default IncidentComparisonInfo;
