import React, { useEffect, useState } from 'react'
import { Alert, FlatList, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import GetActivityStatusDataList from '@/src/server/api-functions/get-activity-status-datalist-details';
import { ActivityStatusDataList, ActivityStatusDataListPayLoad, ChartListDataItem } from '@/src/types';
import ChartListItem from '../ChartListItem';


const GetActivityStatusDataListDetailsInfo = () => {
  {
    const [activityStatusChartDataList, setActivityStatusChartDataList] = useState<ActivityStatusDataList>({
      sEcho: null,
      aaData: null,
      iTotalRecords: null,
      iTotalDisplayRecords: null,
    });
    const [DataList, setDataList] = useState<ChartListDataItem[]>([]);

    const handleGetActivityStatusDataList = async () => {

      const payLoad: ActivityStatusDataListPayLoad = {
        username: "anirban@elogixmail.com",
        password: "An1rban@2023",
        start: "01/01/2021",
        viewAs: "COMPANY HEAD",
        end: "31/12/2023",
        status: "initiated"
      }

      const { data, error, status } = await GetActivityStatusDataList(payLoad);
      if (status === 200) {
        const { aaData } = data;
        setActivityStatusChartDataList(data);
        setDataList(aaData);
      } else {
        Alert.alert("error", error.message);
      }

    }
    useEffect(() => {
      handleGetActivityStatusDataList();
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

const styles = StyleSheet.create({

  chartSelctorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '75%'

  },
  chartContainer: {
    width: '100%',
    alignItems: 'center'
  },

});
export default GetActivityStatusDataListDetailsInfo;
