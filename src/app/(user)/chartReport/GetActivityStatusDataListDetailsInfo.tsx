import { useEffect, useState } from 'react'
import { Alert, FlatList, RefreshControl, View } from 'react-native';
import GetActivityStatusDataList from '@/src/server/api-functions/TaskList_(DataList)/get-activity-status-datalist-details';
import { ActivityStatusDataList, ActivityStatusDataListPayLoad, ChartListDataItem } from '@/src/types';
import { useLocalSearchParams } from 'expo-router';
import { styles } from '@/src/style';
import HeadImageSection from '@/src/components/headSection/HeadImageSection';
import ComplianceTaskDetails from '@/src/components/task/ComplianceTaskDetails';
import NoDataAvailableCard from '@/src/components/NoDataAvailableCard';

const GetActivityStatusDataListDetailsInfo = () => {
  {
    const [activityStatusChartDataList, setActivityStatusChartDataList] = useState<ActivityStatusDataList>({
      sEcho: null,
      aaData: null,
      iTotalRecords: null,
      iTotalDisplayRecords: null,
    });

    const [DataList, setDataList] = useState<ChartListDataItem[]>([]);
    const [refreshing, setRefreshing] = useState(true);

    // Get the payload from the navigation params
    const { payload, statusType } = useLocalSearchParams();
    const filterStatus = typeof statusType === 'string' ? statusType : statusType[0];

    const getpayload = typeof payload === 'string' ? payload : payload[0];

    let parsedPayload;
    try {
      parsedPayload = JSON.parse(getpayload);
    } catch (error) {
      console.error('Error parsing payload:', error);
      // Handle the error, e.g., set parsedPayload to an empty object or a default value
      parsedPayload = {};
    }

    const payLoad: ActivityStatusDataListPayLoad = {
      ...parsedPayload,
      status: filterStatus
    };

    const handleGetActivityStatusDataList = async () => {
      const { data, error, status } = await GetActivityStatusDataList(payLoad);
      if (status === 200) {
        const { aaData } = data;
        setActivityStatusChartDataList(data);
        if (aaData.length > 0) {
          setDataList(aaData);
        }
        setRefreshing(false);
      } else {
        Alert.alert("error", error.message);
      }
    }
    useEffect(() => {
      handleGetActivityStatusDataList();
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
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleGetActivityStatusDataList}
                />
              }
            />
        }
      </View>
    )
  }
}


export default GetActivityStatusDataListDetailsInfo;
