// import React, { useEffect, useState } from 'react'
// import { ComplianceStatusDataPayLoad, ReportChartData, ComplianceStatusData } from '../types';
// import GetComplianceStatusData from '../server/api-functions/get-compliance-status-data';
// import { Alert, Pressable } from 'react-native';
// import { View } from 'react-native';
// import DropDown from './Dropdown';
// import PieChartData from './PieChart';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/rootReducer';
// import DonatChartData from './DonatChart';
// import BarChartData from './BarChart';
// import { router } from 'expo-router';
// import { Card, Text } from 'react-native-elements';
// import { styles } from '../style';
// import { FontAwesome } from '@expo/vector-icons';
// import CardSkelton from './skelton/CardSkelton';
// import moment from 'moment';

// const ComplianceStatusInfo = () => {
//   {
//     const [activityStatusChartData, setActivityStatusChartData] = useState<ComplianceStatusData>({
//       title: null,
//       subTitle: null,
//       xAxisName: null,
//       yAxisName: null,
//       chartData: null
//     });
//     const [filteredChartData, setFilteredChartData] = useState<ReportChartData[]>([]);
//     const [currentChart, setCurrentChart] = useState<string>('PIE');
//     const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
//     const currentDate: string = moment().format('DD/MM/YYYY');
//     const startDate: string = moment().subtract(1, 'months').format('DD/MM/YYYY');

//     const chartItems = [
//       { label: 'PIE', value: 'PIE' },
//       { label: 'BAR', value: 'BAR' },
//       { label: 'DONUT', value: 'DONUT' },
//     ];
//     const navigateToChartList = (statusType: string) => {
//       router.push({ pathname: `/chartReport/GetComplianceStatusDataListDetailsInfo`, params: { statusType } }); // Remove the braces in para
//     }
//     const handleGetComplianceStatusData = async () => {

//       const payLoad: ComplianceStatusDataPayLoad = {
//         ...useCredential,
//         start: startDate,
//         viewAs: "COMPANY HEAD",
//         end: currentDate
//       }

//       const { data, error, status } = await GetComplianceStatusData(payLoad);
//       if (status === 200) {
//         const { chartData, title, subTitle, yAxisName, xAxisName } = data;
//         setActivityStatusChartData(data);

//         const filteredchartData: ReportChartData[] = chartData && chartData.filter((x: ReportChartData) => x.label !== "NULL" || x.color !== null);
//         setFilteredChartData(filteredchartData);

//       } else {
//         Alert.alert("error", error.message);
//       }

//     }
//     useEffect(() => {
//       handleGetComplianceStatusData();
//     }, []);

//     return (
//       <View style={styles.chartContainer}>
//         {
//           filteredChartData.length > 0 ?
//             <Card containerStyle={styles.cardContainer}>
//               {
//                 currentChart === 'PIE' &&
//                 <PieChartData ReportData={filteredChartData} />
//               }
//               {
//                 currentChart === 'BAR' &&
//                 <BarChartData
//                   ReportData={filteredChartData}
//                   yAxisName={activityStatusChartData.yAxisName}
//                   xAxisName={activityStatusChartData.xAxisName}
//                 />
//               }
//               {
//                 currentChart === 'DONUT' &&
//                 <DonatChartData ReportData={filteredChartData} />
//               }

//               <View>
//                 {filteredChartData && filteredChartData.map((label: ReportChartData, index) => {
//                   return (
//                     <Pressable key={index} style={{ flexDirection: 'row', alignItems: 'center' }}
//                       onPress={() => navigateToChartList(label?.link?.type ?? "")}
//                     >
//                       <FontAwesome
//                         name="circle"
//                         size={25}
//                         color={`#${label.color ?? '000'}`}
//                         style={{ marginRight: 15, opacity: 1 }}
//                       />
//                       <Text style={{ color: `#${label.color ?? '000'}` }}>{label.label ?? ''}</Text>
//                     </Pressable>
//                   )
//                 })}
//                 <View style={{ alignItems: 'flex-start' }}>
//                   <Text style={styles.title}>{activityStatusChartData.title}</Text>
//                   <Text style={styles.title}>{activityStatusChartData.subTitle}</Text>
//                 </View>
//               </View>

//             </Card>
//             : <CardSkelton />
//         }
//         <View style={styles.chartSelctorContainer}>
//           <Text>Chart Type</Text>
//           <DropDown
//             selectedValue={currentChart}
//             dropdownItems={chartItems}
//             setSelectedValue={setCurrentChart}
//           />
//         </View>
//       </View>
//     )
//   }
// }


// export default ComplianceStatusInfo;


// ========================== Updated on 09-04-2024 ==================================== //

import React, { useEffect, useState } from 'react'
import { ComplianceStatusDataPayLoad, ReportChartData, ComplianceStatusData, ChartProp } from '../types';
import GetComplianceStatusData from '../server/api-functions/get-compliance-status-data';
import { Alert, Pressable } from 'react-native';
import { View } from 'react-native';
import DropDown from './Dropdown';
import PieChartData from './PieChart';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import DonatChartData from './DonatChart';
import BarChartData from './BarChart';
import { router } from 'expo-router';
import { Card, Text } from 'react-native-elements';
import { styles } from '../style';
import { FontAwesome } from '@expo/vector-icons';
import CardSkelton from './skelton/CardSkelton';
import moment from 'moment';
import calculatePercentage from '../utils/associate/get-percentage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const ComplianceStatusInfo = ({currentChart}:ChartProp) => {
  const [activityStatusChartData, setActivityStatusChartData] = useState<ComplianceStatusData>({
    title: null,
    subTitle: null,
    xAxisName: null,
    yAxisName: null,
    chartData: null
  });
  const [filteredChartData, setFilteredChartData] = useState<ReportChartData[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);
  // const [currentChart, setCurrentChart] = useState<string>('PIE');
  const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
  const currentDate: string = moment().format('DD/MM/YYYY');
  const startDate: string = moment().subtract(1, 'months').format('DD/MM/YYYY');

  const payLoad: ComplianceStatusDataPayLoad = {
    ...useCredential,
    start: startDate,
    viewAs: "COMPANY HEAD",
    end: currentDate
  }

 
  // const chartItems = [
  //   { label: 'PIE', value: 'PIE' , icon: () => <Icon name="chart-pie" size={20} color="rgba(120, 106, 205, 1)" />  },
  //   { label: 'BAR', value: 'BAR' , icon: () => <Icon name="chart-bar" size={20} color="rgba(120, 106, 205, 1)" />},
  //   { label: 'DONUT', value: 'DONUT', icon: () => <Icon name="chart-donut" size={20} color="rgba(120, 106, 205, 1)" /> },
  // ];


  const navigateToChartList = (statusType: string, payLoad: ComplianceStatusDataPayLoad) => {
    const payloadString = JSON.stringify(payLoad); // Stringify the payload here
    router.push({ pathname: `/chartReport/GetComplianceStatusDataListDetailsInfo`, params: { statusType, payload: payloadString } });
  }
  

  const handleGetComplianceStatusData = async () => {
    const { data, error, status } = await GetComplianceStatusData(payLoad);
    if (status === 200) {
      const { chartData, title, subTitle, yAxisName, xAxisName } = data;
      setActivityStatusChartData(data);

      const filteredchartData: ReportChartData[] = chartData && chartData.filter((x: ReportChartData) => x.label !== "NULL" || x.color !== null);
      setFilteredChartData(filteredchartData);
      const sum: number = filteredchartData.map((x: ReportChartData) => x.value).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      setTotalValue(sum);

    } else {
      Alert.alert("error", error.message);
    }
  }

  useEffect(() => {
    handleGetComplianceStatusData();
  }, []);

  return (
    <View style={styles.chartContainer}>
      {
        filteredChartData.length > 0 ?
          <Card containerStyle={styles.cardContainer}>
            {
              currentChart === 'PIE' &&
              <PieChartData ReportData={filteredChartData} />
            }
            {
              currentChart === 'BAR' &&
              <BarChartData
                ReportData={filteredChartData}
                yAxisName={activityStatusChartData.yAxisName}
                xAxisName={activityStatusChartData.xAxisName}
              />
            }
            {
              currentChart === 'DONUT' &&
              <DonatChartData ReportData={filteredChartData} />
            }

            <View>
              {filteredChartData && filteredChartData.map((label: ReportChartData, index) => {
                return (
                  <Pressable key={index} style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => navigateToChartList(label?.link?.type ?? "", payLoad)}
                  >
                    <FontAwesome
                      name="circle"
                      size={25}
                      color={`#${label.color ?? '000'}`}
                      style={{ marginRight: 15, opacity: 1 }}
                    />
                                         <Text style={{ color: `#${label.color ?? '000'}` }}>{`${label.label ?? ''}  ${calculatePercentage(label.value, totalValue)}%`}</Text>

                  </Pressable>
                )
              })}
              <View style={{ alignItems: 'flex-start' }}>
                <Text style={styles.title}>{activityStatusChartData.title}</Text>
                <Text style={styles.title}>{activityStatusChartData.subTitle}</Text>
              </View>
            </View>

          </Card>
          : <CardSkelton />
      }
      {/* <View style={styles.chartSelctorContainer}>
        <DropDown
          selectedValue={currentChart}
          dropdownItems={chartItems}
          setSelectedValue={setCurrentChart}
        />
      </View> */}
    </View>
  )
}

export default ComplianceStatusInfo;

