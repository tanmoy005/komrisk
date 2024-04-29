import React, { useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native';
import { View } from 'react-native';
import { IncidentChartListDataItem, IncidentComparisonDataList, IncidentComparisonDataListPayLoad, defaultIncidentChartData } from '@/src/types';
import { useLocalSearchParams } from 'expo-router';
import GetIncidentComparisonDataList from '@/src/server/api-functions/TaskList_(DataList)/get-incident-comparison-datalist-details';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import moment from 'moment';
import { styles } from '@/src/style';
import HeadImageSection from '@/src/components/headSection/HeadImageSection';
import IncidentTaskDetails from '@/src/components/task/IncidentTaskDetails';



const GetIncidentComparisonDataListDetailsInfo = () => {
  {
    const [incidentComparisonChartDataList, setIncidentComparisonChartDataList] = useState<IncidentComparisonDataList>({
      sEcho: null,
      aaData: null,
      iTotalRecords: null,
      iTotalDisplayRecords: null,
    });
    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);

    const [DataList, setDataList] = useState<IncidentChartListDataItem[]>([defaultIncidentChartData]);
    const currentDate: string = moment().format('DD/MM/YYYY');
    const startDate: string = moment().subtract(1, 'months').format('DD/MM/YYYY');

    // Get the payload from the navigation params
    const { payload, statusType } = useLocalSearchParams();
    const filterStatus = typeof statusType === 'string' ? statusType : statusType[0];

    const getpayload = typeof payload === 'string' ? payload : payload[0];

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
        }
      } else {
        Alert.alert("error4444", error.message);
      }
      // setDataList([{}]);
    }
    useEffect(() => {
      handleGetIncidentComparisonDataList();
    }, []);


    return (
      <View style={styles.chartContainer}>
        <HeadImageSection />
        <FlatList
          data={DataList}
          renderItem={({ item }) => <IncidentTaskDetails data={item} />}
          contentContainerStyle={{ gap: 10, padding: 10 }}
        />
      </View>
    )
  }
}


export default GetIncidentComparisonDataListDetailsInfo;
