// import React, { useEffect, useState } from 'react'
// import { IncidentComparisonDataPayLoad, ReportChartData, IncidentComparisonData } from '../types';
// import GetIncidentComparisonData from '../server/api-functions/get-incident-comparison-data';
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

// const IncidentComparisonInfo = () => {
//   {
//     const [incidentComparisonChartData, setIncidentComparisonChartData] = useState<IncidentComparisonData>({
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
//       router.push({ pathname: `/chartReport/GetIncidentComparisonDataListDetailsInfo`, params: { statusType } }); // Remove the braces in para
//     }
//     const handleGetIncidentComparisonData = async () => {

//       const payLoad: IncidentComparisonDataPayLoad = {
//         ...useCredential,
//         start: startDate,
//         viewAs: "COMPANY HEAD",
//         end: currentDate
//       }

//       const { data, error, status } = await GetIncidentComparisonData(payLoad);
//       if (status === 200) {
//         const { chartData, title, subTitle, yAxisName, xAxisName } = data;
//         setIncidentComparisonChartData(data);

//         const filteredchartData: ReportChartData[] = chartData && chartData.filter((x: ReportChartData) => x.label !== "NULL" || x.color !== null);
//         setFilteredChartData(filteredchartData);

//       } else {
//         Alert.alert("error", error.message);
//       }

//     }
//     useEffect(() => {
//         handleGetIncidentComparisonData();
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
//                   yAxisName={incidentComparisonChartData.yAxisName}
//                   xAxisName={incidentComparisonChartData.xAxisName}
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
//                   <Text style={styles.title}>{incidentComparisonChartData.title}</Text>
//                   <Text style={styles.title}>{incidentComparisonChartData.subTitle}</Text>
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


// export default IncidentComparisonInfo;



// ========================== Updated on 09-04-2024 ============================ //

import React, { useEffect, useState } from 'react'
import { IncidentComparisonDataPayLoad, ReportChartData, IncidentComparisonData, ChartProp } from '../../types';
import GetIncidentComparisonData from '../../server/api-functions/get-incident-comparison-data';
import { Alert, Pressable } from 'react-native';
import { View } from 'react-native';
import DropDown from '../Dropdown';
import PieChartData from '../charts/PieChart';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import DonatChartData from '../charts/DonatChart';
import BarChartData from '../charts/BarChart';
import { router } from 'expo-router';
import { Card, Text } from 'react-native-elements';
import { styles } from '../../style';
import { FontAwesome } from '@expo/vector-icons';
import CardSkelton from '../skelton/CardSkelton';
import moment from 'moment';
import calculatePercentage from '../../utils/associate/get-percentage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const IncidentComparisonInfo = ({currentChart}: ChartProp) => {
  {
    const [incidentComparisonChartData, setIncidentComparisonChartData] = useState<IncidentComparisonData>({
      title: null,
      subTitle: null,
      xAxisName: null,
      yAxisName: null,
      chartData: null
    });
    const [filteredChartData, setFilteredChartData] = useState<ReportChartData[]>([]);
    const [totalValue, setTotalValue] = useState<number>(0);
    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const currentDate: string = moment().format('DD/MM/YYYY');
    const startDate: string = moment().subtract(1, 'months').format('DD/MM/YYYY');

    const payLoad: IncidentComparisonDataPayLoad = {
      ...useCredential,
      start: startDate,
      viewAs: "COMPANY HEAD",
      end: currentDate
    }

    // const chartItems = [
    //   { label: 'PIE', value: 'PIE' , icon: () => <Icon name="chart-pie" size={20} color="#900" />  },
    //   { label: 'BAR', value: 'BAR' , icon: () => <Icon name="chart-bar" size={20} color="#900" />},
    //   { label: 'DONUT', value: 'DONUT', icon: () => <Icon name="chart-donut" size={20} color="#900" /> },
    // ];
    // const navigateToChartList = (statusType: string) => {
    //   router.push({ pathname: `/chartReport/GetIncidentComparisonDataListDetailsInfo`, params: { statusType } }); // Remove the braces in para
    // }

    const navigateToChartList = (statusType: string, payLoad: IncidentComparisonDataPayLoad) => {
      const payloadString = JSON.stringify(payLoad); // Stringify the payload here
      router.push({ pathname: `/chartReport/GetIncidentComparisonDataListDetailsInfo`, params: { statusType, payload: payloadString } });
    }
    const handleGetIncidentComparisonData = async () => {



      const { data, error, status } = await GetIncidentComparisonData(payLoad);
      if (status === 200) {
        const { chartData, title, subTitle, yAxisName, xAxisName } = data;
        setIncidentComparisonChartData(data);

        const filteredchartData: ReportChartData[] = chartData && chartData.filter((x: ReportChartData) => x.label !== "NULL" || x.color !== null);
        setFilteredChartData(filteredchartData);
        const sum: number = filteredchartData.map((x: ReportChartData) => x.value).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setTotalValue(sum);
      } else {
        Alert.alert("error", error.message);
      }

    }
    useEffect(() => {
      handleGetIncidentComparisonData();
    }, []);
console.log('currentChart2333', currentChart);

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
                  yAxisName={incidentComparisonChartData.yAxisName}
                  xAxisName={incidentComparisonChartData.xAxisName}
                />
              }
              {
                currentChart === 'DONUT' &&
                <DonatChartData ReportData={filteredChartData} />
              }

              <View>
                {filteredChartData && filteredChartData.map((data: ReportChartData, index) => {
                  return (
                    <Pressable key={index} style={{ flexDirection: 'row', alignItems: 'center' }}
                      onPress={() => navigateToChartList(data?.comparison ?? "", payLoad)}>
                      <FontAwesome
                        name="circle"
                        size={25}
                        color={`#${data.color ?? '000'}`}
                        style={{ marginRight: 15, opacity: 1 }}
                      />
                      <Text style={{ color: `#${data.color ?? '000'}` }}>{`${data.label ?? ''}  ${calculatePercentage(data.value, totalValue)}%`}</Text>
                    </Pressable>
                  )
                })}
                <View style={{ alignItems: 'flex-start' }}>
                  <Text style={styles.title}>{incidentComparisonChartData.title}</Text>
                  <Text style={styles.title}>{incidentComparisonChartData.subTitle}</Text>
                </View>
              </View>

              {/* <View>
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
                      <Text style={{ color: `#${label.color ?? '000'}` }}>{label.label ?? ''}</Text>
                    </Pressable>
                  )
                })}
                <View style={{ alignItems: 'flex-start' }}>
                  <Text style={styles.title}>{incidentComparisonChartData.title}</Text>
                  <Text style={styles.title}>{incidentComparisonChartData.subTitle}</Text>
                </View>
              </View> */}

            </Card>
            : <CardSkelton />
        }
        {/* <View style={styles.chartSelctorContainer}>
          <Text>Chart Type</Text>
          <DropDown
            selectedValue={currentChart}
            dropdownItems={chartItems}
            setSelectedValue={setCurrentChart}
          />
        </View> */}
      </View>
    )
  }
}


export default IncidentComparisonInfo;
