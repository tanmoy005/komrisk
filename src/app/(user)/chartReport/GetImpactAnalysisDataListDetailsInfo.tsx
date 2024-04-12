// import React, { useEffect, useState } from 'react'
// import { Alert, FlatList, StyleSheet } from 'react-native';
// import { View } from 'react-native';
// import {  ChartListDataItem, ImpactAnalysisDataList, ImpactAnalysisDataListPayLoad } from '@/src/types';
// import ChartListItem from '@/src/components/ChartListItem';
// import { useLocalSearchParams } from 'expo-router';
// import GetImpactAnalysisDataList from '@/src/server/api-functions/get-impact-analysis-datalist-details';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/src/store/rootReducer';
// import moment from 'moment';
// import { styles } from '@/src/style';



// const GetImpactAnalysisDataListDetailsInfo = () => {
//   {
//     const [impactAnalysisChartDataList, setImpactAnalysisChartDataList] = useState<ImpactAnalysisDataList>({
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
//     const filterStatus = typeof statusType === 'string' ? statusType : statusType[0];
//     // console.log("handleGetActivityStatusDataList", statusType);
//     const handleGetImpactAnalysisDataList = async () => {
//       //console.log("handleGetActivityStatusDataList");

//       const payLoad: ImpactAnalysisDataListPayLoad = {
//         ...useCredential,
//         start: startDate,
//         viewAs: "COMPANY HEAD",
//         end: currentDate,
//         status: filterStatus
//       }
//       //  console.log("payLoad", payLoad);
//       const { data, error, status } = await GetImpactAnalysisDataList(payLoad);
//       if (status === 200) {
//         const { aaData } = data;
//         setImpactAnalysisChartDataList(data);
//         if (aaData.length > 0) {
//           setDataList(aaData);
//         }
//       } else {
//         Alert.alert("error4444", error.message);
//       }
//       // setDataList([{}]);
//     }
//     useEffect(() => {
//         handleGetImpactAnalysisDataList();
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


// export default GetImpactAnalysisDataListDetailsInfo;




// ============================ Updated on 09-04-2024 ================================= //

import React, { useEffect, useState } from 'react'
import { Alert, FlatList, StyleSheet } from 'react-native';
import { View } from 'react-native';
import { ChartListDataItem, ImpactAnalysisDataList, ImpactAnalysisDataListPayLoad } from '@/src/types';
import TaskListDetails from '@/src/components/task/TaskListDetails';
import { useLocalSearchParams } from 'expo-router';
import GetImpactAnalysisDataList from '@/src/server/api-functions/get-impact-analysis-datalist-details';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/rootReducer';
import moment from 'moment';
import { styles } from '@/src/style';
import HeadImageSection from '@/src/components/headSection/HeadImageSection';



const GetImpactAnalysisDataListDetailsInfo = () => {
  {
    const [impactAnalysisChartDataList, setImpactAnalysisChartDataList] = useState<ImpactAnalysisDataList>({
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


    const payLoad: ImpactAnalysisDataListPayLoad = {
      ...parsedPayload,
      impact: filterStatus
    };

    console.log("Payload for list", payLoad);


    const handleGetImpactAnalysisDataList = async () => {

      const { data, error, status } = await GetImpactAnalysisDataList(payLoad);
      if (status === 200) {
        const { aaData } = data;
        setImpactAnalysisChartDataList(data);
        if (aaData.length > 0) {
          setDataList(aaData);
        }
      } else {
        Alert.alert("error4444", error.message);
      }
      // setDataList([{}]);
    }
    useEffect(() => {
      handleGetImpactAnalysisDataList();
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


export default GetImpactAnalysisDataListDetailsInfo;
