import React, { useEffect, useState } from 'react'
import { Alert, FlatList, StyleSheet } from 'react-native';
import { View } from 'react-native';
import {  ChartListDataItem, ImpactAnalysisDataList, ImpactAnalysisDataListPayLoad } from '@/src/types';
import ChartListItem from '@/src/components/ChartListItem';
import { useLocalSearchParams } from 'expo-router';
import GetImpactAnalysisDataList from '@/src/server/api-functions/get-impact-analysis-datalist-details';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/rootReducer';
import moment from 'moment';
import { styles } from '@/src/style';



const GetImpactAnalysisDataListDetailsInfo = () => {
  {
    const [impactAnalysisChartDataList, setImpactAnalysisChartDataList] = useState<ImpactAnalysisDataList>({
      sEcho: null,
      aaData: null,
      iTotalRecords: null,
      iTotalDisplayRecords: null,
    });
    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);

    const [DataList, setDataList] = useState<ChartListDataItem[]>([{}]);
    const currentDate: string = moment().format('DD/MM/YYYY');
    const startDate: string = moment().subtract(1, 'months').format('DD/MM/YYYY');

    const { statusType } = useLocalSearchParams();
    const filterStatus = typeof statusType === 'string' ? statusType : statusType[0];
    // console.log("handleGetActivityStatusDataList", statusType);
    const handleGetImpactAnalysisDataList = async () => {
      //console.log("handleGetActivityStatusDataList");

      const payLoad: ImpactAnalysisDataListPayLoad = {
        ...useCredential,
        start: startDate,
        viewAs: "COMPANY HEAD",
        end: currentDate,
        status: filterStatus
      }
      //  console.log("payLoad", payLoad);
      const { data, error, status } = await GetImpactAnalysisDataList(payLoad);
      if (status === 200) {
        const { aaData } = data;
        setImpactAnalysisChartDataList(data);
        if (aaData.length > 0) {
          setDataList(aaData);
        }
      } else {
        Alert.alert("error4444", error.message);
      }
      // setDataList([{}]);
    }
    useEffect(() => {
        handleGetImpactAnalysisDataList();
    }, []);


    return (
      <View style={styles.chartContainer}>
        <FlatList
          data={DataList}
          renderItem={({ item }) => <ChartListItem data={item} />}
          contentContainerStyle={{ gap: 10, padding: 10 }}
        />
      </View>
    )
  }
}


export default GetImpactAnalysisDataListDetailsInfo;