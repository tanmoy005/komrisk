import { useEffect, useState } from 'react'
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import GetActivityStatusDataList from '@/src/server/api-functions/get-activity-status-datalist-details';
import { ActivityStatusDataList, ActivityStatusDataListPayLoad, ChartListDataItem } from '@/src/types';
import { useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/rootReducer';
import moment from 'moment';
import ChartListItem from '@/src/components/ChartListItem';
import { styles } from '@/src/style';
import HeadImageSection from '@/src/components/headSection/HeadImageSection';

const GetActivityStatusDataListDetailsInfo = () => {
  {
    const [activityStatusChartDataList, setActivityStatusChartDataList] = useState<ActivityStatusDataList>({
      sEcho: null,
      aaData: null,
      iTotalRecords: null,
      iTotalDisplayRecords: null,
    });
    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);

    const [DataList, setDataList] = useState<ChartListDataItem[]>([{}]);
    const { statusType } = useLocalSearchParams();
    const filterStatus = typeof statusType === 'string' ? statusType : statusType[0];
    const currentDate: string = moment().format('DD/MM/YYYY');
    const startDate: string = moment().subtract(1, 'months').format('DD/MM/YYYY');
    const handleGetActivityStatusDataList = async () => {
      //console.log("handleGetActivityStatusDataList");

      const payLoad: ActivityStatusDataListPayLoad = {
        ...useCredential,
        start: startDate,
        viewAs: "COMPANY HEAD",
        end: currentDate,
        status: filterStatus
      }
      // console.log("handleGetActivityStatusDataList", payLoad);
      const { data, error, status } = await GetActivityStatusDataList(payLoad);
      if (status === 200) {
        const { aaData } = data;
        setActivityStatusChartDataList(data);
        if (aaData.length > 0) {
          setDataList(aaData);
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
          renderItem={({ item }) => <ChartListItem data={item} />}
          contentContainerStyle={{ gap: 10, padding: 10 }}
        />
      </View>
    )
  }
}


export default GetActivityStatusDataListDetailsInfo;
