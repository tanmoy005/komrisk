import React, { useEffect, useState } from 'react'
import { Alert, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { ChartListDataItem, ImpactAnalysisDataList, ImpactAnalysisDataListPayLoad } from '@/src/types';
import ComplianceTaskDetails from '@/src/components/task/ComplianceTaskDetails';
import { useLocalSearchParams } from 'expo-router';
import GetImpactAnalysisDataList from '@/src/server/api-functions/TaskList_(DataList)/get-impact-analysis-datalist-details';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { styles } from '@/src/style';
import HeadImageSection from '@/src/components/headSection/HeadImageSection';
import { RootState } from '@/src/store';
import NoDataAvailableCard from '@/src/components/NoDataAvailableCard';



const GetImpactAnalysisDataListDetailsInfo = () => {
  {
    const [impactAnalysisChartDataList, setImpactAnalysisChartDataList] = useState<ImpactAnalysisDataList>({
      sEcho: null,
      aaData: null,
      iTotalRecords: null,
      iTotalDisplayRecords: null,
    });

    const [refreshing, setRefreshing] = useState(true);
    const [DataList, setDataList] = useState<ChartListDataItem[]>([]);



    // Get the payload from the navigation params
    const { payload, statusType } = useLocalSearchParams();
    const filterStatus = typeof statusType === 'string' ? statusType : statusType[0];
    const getpayload = typeof payload === 'string' ? payload : payload[0];


    let parsedPayload;
    try {
      parsedPayload = JSON.parse(getpayload);
    } catch (error) {
      // Handle the error, e.g., set parsedPayload to an empty object or a default value
      parsedPayload = {};
    }


    const payLoad: ImpactAnalysisDataListPayLoad = {
      ...parsedPayload,
      impact: filterStatus
    };

    const handleGetImpactAnalysisDataList = async () => {

      const { data, error, status } = await GetImpactAnalysisDataList(payLoad);
      if (status === 200) {
        const { aaData } = data;
        setImpactAnalysisChartDataList(data);
        if (aaData.length > 0) {
          setDataList(aaData);
          setRefreshing(false);
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
      <View style={styles.getDetailsContainer}>
        <HeadImageSection />
        {
          DataList.length == 0 && refreshing == false ?
            <NoDataAvailableCard /> :
            <FlatList showsVerticalScrollIndicator={false}
              data={DataList}
              renderItem={({ item }) => <ComplianceTaskDetails data={item} />}
              contentContainerStyle={{ gap: 10, padding: 10 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleGetImpactAnalysisDataList} />
              }
            />
        }
      </View>
    )
  }
}


export default GetImpactAnalysisDataListDetailsInfo;
