import React, { useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native';
import { View } from 'react-native';
import {  ChartListDataItem, IncidentActivityDataList, IncidentActivityDataListPayLoad } from '@/src/types';
import ChartListItem from '@/src/components/ChartListItem';
import { useLocalSearchParams } from 'expo-router';
import GetIncidentActivityDataList from '@/src/server/api-functions/get-incident-activity-datalist-details';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/rootReducer';
import moment from 'moment';
import { styles } from '@/src/style';
import HeadImageSection from '@/src/components/headSection/HeadImageSection';



const GetIncidentActivityDataListDetailsInfo = () => {
  {
    const [incidentActivityChartDataList, setIncidentActivityChartDataList] = useState<IncidentActivityDataList>({
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
    const handleGetIncidentActivityDataList = async () => {

      const payLoad: IncidentActivityDataListPayLoad = {
        ...useCredential,
        start: startDate,
        viewAs: "COMPANY HEAD",
        end: currentDate,
        status: filterStatus
      }

      const { data, error, status } = await GetIncidentActivityDataList(payLoad);
      if (status === 200) {
        const { aaData } = data;
        setIncidentActivityChartDataList(data);
        if (aaData.length > 0) {
          setDataList(aaData);
        }
      } else {
        Alert.alert("error4444", error.message);
      }
    }
    useEffect(() => {
        handleGetIncidentActivityDataList();
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


export default GetIncidentActivityDataListDetailsInfo;
