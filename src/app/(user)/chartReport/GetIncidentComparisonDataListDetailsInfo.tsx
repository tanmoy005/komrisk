import React, { useEffect, useState } from 'react'
import { Alert, FlatList, RefreshControl } from 'react-native';
import { View } from 'react-native';
import { IncidentChartListDataItem, IncidentComparisonDataList, IncidentComparisonDataListPayLoad, defaultIncidentChartData } from '@/src/types';
import { useLocalSearchParams } from 'expo-router';
import GetIncidentComparisonDataList from '@/src/server/api-functions/TaskList_(DataList)/get-incident-comparison-datalist-details';
import { styles } from '@/src/style';
import HeadImageSection from '@/src/components/headSection/HeadImageSection';
import IncidentTaskDetails from '@/src/components/task/IncidentTaskDetails';
import NoDataAvailableCard from '@/src/components/NoDataAvailableCard';



const GetIncidentComparisonDataListDetailsInfo = () => {
  {
    const [incidentComparisonChartDataList, setIncidentComparisonChartDataList] = useState<IncidentComparisonDataList>({
      sEcho: null,
      aaData: null,
      iTotalRecords: null,
      iTotalDisplayRecords: null,
    });

    const [DataList, setDataList] = useState<IncidentChartListDataItem[]>([defaultIncidentChartData]);
    const [refreshing, setRefreshing] = useState(true);

    // Get the payload from the navigation params
    const { payload, statusType } = useLocalSearchParams();

    // const filterStatus = typeof statusType === 'string' ? statusType : statusType[0];

    // const getpayload = typeof payload === 'string' ? payload : payload[0];


    const filterStatus = typeof statusType === 'string' ? statusType : (Array.isArray(statusType) ? statusType[0] : '');
    
    const getpayload = typeof payload === 'string' ? payload : (Array.isArray(payload) ? payload[0] : '');

    let parsedPayload;
    try {
      parsedPayload = JSON.parse(getpayload);
    } catch (error) {
      console.error('Error parsing payload:', error);
      parsedPayload = {};
    }


    const payLoad: IncidentComparisonDataListPayLoad = {
      ...parsedPayload,
      comparison: filterStatus
    };
    const handleGetIncidentComparisonDataList = async () => {

      const { data, error, status } = await GetIncidentComparisonDataList(payLoad);
      if (status === 200) {
        const { aaData } = data;
        setIncidentComparisonChartDataList(data);
        if (aaData.length > 0) {
          setDataList(aaData);
          setRefreshing(false);
        }
      } else {
        Alert.alert("error", error.message);
      }
    }
    useEffect(() => {
      handleGetIncidentComparisonDataList();
    }, []);


    return (
      <View style={styles.getDetailsContainer}>
        <HeadImageSection />
        {
          DataList.length == 0 && refreshing == false ?
            <NoDataAvailableCard /> :
            <FlatList showsVerticalScrollIndicator={false}
              data={DataList}
              renderItem={({ item }) => <IncidentTaskDetails data={item} />}
              contentContainerStyle={{ gap: 10, padding: 10 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleGetIncidentComparisonDataList} />
              }
            />
        }
      </View>
    )
  }
}


export default GetIncidentComparisonDataListDetailsInfo;
