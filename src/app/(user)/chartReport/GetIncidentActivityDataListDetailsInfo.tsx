import NoDataAvailableCard from '@/src/components/NoDataAvailableCard';
import HeadImageSection from '@/src/components/headSection/HeadImageSection';
import IncidentTaskDetails from '@/src/components/task/IncidentTaskDetails';
import GetIncidentActivityDataList from '@/src/server/api-functions/TaskList_(DataList)/get-incident-activity-datalist-details';
import { styles } from '@/src/style';
import { IncidentActivityDataList, IncidentActivityDataListPayLoad, IncidentChartListDataItem, defaultIncidentChartData } from '@/src/types';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, RefreshControl, View } from 'react-native';



const GetIncidentActivityDataListDetailsInfo = () => {
  {
    const [incidentActivityChartDataList, setIncidentActivityChartDataList] = useState<IncidentActivityDataList>({
      sEcho: null,
      aaData: null,
      iTotalRecords: null,
      iTotalDisplayRecords: null,
    });

    const [refreshing, setRefreshing] = useState(true);
    const [DataList, setDataList] = useState<IncidentChartListDataItem[]>([defaultIncidentChartData]);
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
      // Handle the error, e.g., set parsedPayload to an empty object or a default value
      parsedPayload = {};
    }


    const payLoad: IncidentActivityDataListPayLoad = {
      ...parsedPayload,
      status: filterStatus
    };


    const handleGetIncidentActivityDataList = async () => {

      const { data, error, status } = await GetIncidentActivityDataList(payLoad);
      if (status === 200) {
        const { aaData } = data;
        setIncidentActivityChartDataList(data);
        if (aaData.length > 0) {
          setDataList(aaData);
          setRefreshing(false);
        }
      } else {
        Alert.alert("error", error.message);
      }
    }
    useEffect(() => {
      handleGetIncidentActivityDataList();
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
            <RefreshControl refreshing={refreshing} onRefresh={handleGetIncidentActivityDataList} />
          }
        />
          
        }
      </View>

    )
  }
}


export default GetIncidentActivityDataListDetailsInfo;
