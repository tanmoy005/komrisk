// import { useEffect, useState } from 'react'
// import { Alert, FlatList, StyleSheet, View } from 'react-native';
// import GetActivityStatusDataList from '@/src/server/api-functions/get-activity-status-datalist-details';
// import { ActivityStatusDataList, ActivityStatusDataListPayLoad, ChartListDataItem } from '@/src/types';
// import { useLocalSearchParams } from 'expo-router';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/src/store/rootReducer';
// import moment from 'moment';
// import ChartListItem from '@/src/components/ChartListItem';
// import { styles } from '@/src/style';

// const GetActivityStatusDataListDetailsInfo = () => {
//   {
//     const [activityStatusChartDataList, setActivityStatusChartDataList] = useState<ActivityStatusDataList>({
//       sEcho: null,
//       aaData: null,
//       iTotalRecords: null,
//       iTotalDisplayRecords: null,
//     });
//     const useCredential = useSelector((state: RootState) => state.authUserCred.payload);

//     const [DataList, setDataList] = useState<ChartListDataItem[]>([{}]);
//     const { statusType } = useLocalSearchParams();
//     const filterStatus = typeof statusType === 'string' ? statusType : statusType[0];
//     const currentDate: string = moment().format('DD/MM/YYYY');
//     const startDate: string = moment().subtract(1, 'months').format('DD/MM/YYYY');
//     const handleGetActivityStatusDataList = async () => {
//       //console.log("handleGetActivityStatusDataList");

//       const payLoad: ActivityStatusDataListPayLoad = {
//         ...useCredential,
//         start: startDate,
//         viewAs: "COMPANY HEAD",
//         end: currentDate,
//         status: filterStatus
//       }
//       // console.log("handleGetActivityStatusDataList", payLoad);
//       const { data, error, status } = await GetActivityStatusDataList(payLoad);
//       if (status === 200) {
//         const { aaData } = data;
//         setActivityStatusChartDataList(data);
//         if (aaData.length > 0) {
//           setDataList(aaData);
//         }
//       } else {
//         Alert.alert("error4444", error.message);
//       }
//       // setDataList([{}]);
//     }
//     useEffect(() => {
//       handleGetActivityStatusDataList();
//     }, []);


//     return (
//       <View style={styles.chartContainer}>
//         <FlatList
//           data={DataList}
//           renderItem={({ item }) => <ChartListItem data={item} />}
//           contentContainerStyle={{ gap: 10, padding: 10 }}
//         />
//       </View>
//     )
//   }
// }


// export default GetActivityStatusDataListDetailsInfo;


// ============================= Updated on 09-04-2024 ================================== //

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

    //console.log("***************1")

    // Get the payload from the navigation params
    const { payload, statusType } = useLocalSearchParams();
    const filterStatus = typeof statusType === 'string' ? statusType : statusType[0];
    //console.log("filterStatus",filterStatus)
    //const payLoad: ActivityStatusDataListPayLoad = params;

    const getpayload = typeof payload === 'string' ? payload : payload[0];

    console.log("payload got",getpayload)


    let parsedPayload;
    try {
      parsedPayload = JSON.parse(getpayload);
    } catch (error) {
      console.error('Error parsing payload:', error);
      // Handle the error, e.g., set parsedPayload to an empty object or a default value
      parsedPayload = {};
    }

    // Log the payload to see if it's received properly
    //console.log('Received payload:', payLoad);
    // const { statusType } = useLocalSearchParams();
    // const filterStatus = typeof statusType === 'string' ? statusType : statusType[0];
    // const currentDate: string = moment().format('DD/MM/YYYY');
    // const startDate: string = moment().subtract(1, 'months').format('DD/MM/YYYY');

    const payLoad: ActivityStatusDataListPayLoad = {
      ...parsedPayload,
      status: filterStatus
    };

    console.log("Payload for list", payLoad);


    const handleGetActivityStatusDataList = async () => {
      //console.log("handleGetActivityStatusDataList");


      
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
