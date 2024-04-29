
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { ChartListDataItem, ComplianceStatusDataList, ComplianceStatusDataListPayLoad } from '@/src/types';
import { useLocalSearchParams } from 'expo-router';
import GetComplianceStatusDataList from '@/src/server/api-functions/TaskList_(DataList)/get-compliance-status-datalist-details';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { styles } from '@/src/style';
import HeadImageSection from '@/src/components/headSection/HeadImageSection';
import ComplianceTaskDetails from '@/src/components/task/ComplianceTaskDetails';
import { RootState } from '@/src/store';



const GetComplianceStatusDataListDetailsInfo = () => {
  {
    const [complianceStatusChartDataList, setComplianceStatusChartDataList] = useState<ComplianceStatusDataList>({
      sEcho: null,
      aaData: null,
      iTotalRecords: null,
      iTotalDisplayRecords: null,
    });
    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const [refreshing, setRefreshing] = useState(true);
    const [DataList, setDataList] = useState<ChartListDataItem[]>([{}]);
    // const currentDate: string = moment().format('DD/MM/YYYY');
    // const startDate: string = moment().subtract(1, 'months').format('DD/MM/YYYY');


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

    

    const payLoad: ComplianceStatusDataListPayLoad = {
      ...parsedPayload,
      status: filterStatus
    };

    const handleGetActivityStatusDataList = async () => {

      const { data, error, status } = await GetComplianceStatusDataList(payLoad);
      if (status === 200) {
        const { aaData } = data;
        setComplianceStatusChartDataList(data);
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
      handleGetActivityStatusDataList();
    }, []);


    return (
      <View style={styles.chartContainer}>
        <HeadImageSection />
        <FlatList
          data={DataList}
          renderItem={({ item }) => <ComplianceTaskDetails data={item} />}
          contentContainerStyle={{ gap: 10, padding: 10 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleGetActivityStatusDataList} />
          }
        />
      </View>
    )
  }
}


export default GetComplianceStatusDataListDetailsInfo;
