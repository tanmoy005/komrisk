// import React, { useEffect, useState } from 'react'
// import { Alert, FlatList, StyleSheet } from 'react-native';
// import { View } from 'react-native';
// import {  ChartListDataItem, IncidentActivityDataList, IncidentActivityDataListPayLoad } from '@/src/types';
// import ChartListItem from '@/src/components/ChartListItem';
// import { useLocalSearchParams } from 'expo-router';
// import GetIncidentActivityDataList from '@/src/server/api-functions/get-incident-activity-datalist-details';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/src/store/rootReducer';
// import moment from 'moment';
// import { styles } from '@/src/style';



// const GetIncidentActivityDataListDetailsInfo = () => {
//   {
//     const [incidentActivityChartDataList, setIncidentActivityChartDataList] = useState<IncidentActivityDataList>({
//       sEcho: null,
//       aaData: null,
//       iTotalRecords: null,
//       iTotalDisplayRecords: null,
//     });
//     const useCredential = useSelector((state: RootState) => state.authUserCred.payload);

//     const [DataList, setDataList] = useState<ChartListDataItem[]>([{}]);
//     const currentDate: string = moment().format('DD/MM/YYYY');
//     const startDate: string = moment().subtract(1, 'months').format('DD/MM/YYYY');

//     const { statusType } = useLocalSearchParams();
//     console.log("statusType",statusType)
//     const filterStatus = typeof statusType === 'string' ? statusType : statusType[0];
//     console.log("handleGetActivityStatusDataList", filterStatus);
//     const handleGetIncidentActivityDataList = async () => {
//       //console.log("handleGetActivityStatusDataList");

//       const payLoad: IncidentActivityDataListPayLoad = {
//         ...useCredential,
//         start: startDate,
//         viewAs: "COMPANY HEAD",
//         end: currentDate,
//         status: filterStatus
//       }
//       //  console.log("payLoad", payLoad);
//       const { data, error, status } = await GetIncidentActivityDataList(payLoad);
//       if (status === 200) {
//         const { aaData } = data;
//         setIncidentActivityChartDataList(data);
//         if (aaData.length > 0) {
//           setDataList(aaData);
//         }
//       } else {
//         Alert.alert("error4444", error.message);
//       }
//       // setDataList([{}]);
//     }
//     useEffect(() => {
//         handleGetIncidentActivityDataList();
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


// export default GetIncidentActivityDataListDetailsInfo;



// ========================= Updated on 09-04-2024 =============================== //

import React, { useEffect, useState } from 'react'
import { Alert, FlatList } from 'react-native';
import { View } from 'react-native';
import {  ChartListDataItem, IncidentActivityDataList, IncidentActivityDataListPayLoad } from '@/src/types';
import TaskListDetails from '@/src/components/task/TaskListDetails';
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


    const payLoad: IncidentActivityDataListPayLoad = {
      ...parsedPayload,
      status: filterStatus
    };

    console.log("Payload for list", payLoad);


    const handleGetIncidentActivityDataList = async () => {

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
          renderItem={({ item }) => <TaskListDetails data={item} />}
          contentContainerStyle={{ gap: 10, padding: 10 }}
        />
      </View>
    )
  }
}


export default GetIncidentActivityDataListDetailsInfo;
