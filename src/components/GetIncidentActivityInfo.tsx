// import React, { useEffect, useState } from 'react'
// import { IncidentActivityDataPayLoad, ReportChartData, IncidentActivityData } from '../types';
// import GetIncidentActivityData from '../server/api-functions/get-incident-activity-data';
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

// const IncidentActivityInfo = () => {
//   {
//     const [incidentActivityChartData, setIncidentActivityChartData] = useState<IncidentActivityData>({
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
//       console.log("statusType old",statusType)
//       router.push({ pathname: `/chartReport/GetIncidentActivityDataListDetailsInfo`, params: { statusType } }); // Remove the braces in para
//     }
//     const handleGetIncidentActivityData = async () => {

//       const payLoad: IncidentActivityDataPayLoad = {
//         ...useCredential,
//         start: startDate,
//         viewAs: "COMPANY HEAD",
//         end: currentDate
//       }

//       const { data, error, status } = await GetIncidentActivityData(payLoad);
//       if (status === 200) {
//         const { chartData, title, subTitle, yAxisName, xAxisName } = data;
//         setIncidentActivityChartData(data);

//         const filteredchartData: ReportChartData[] = chartData && chartData.filter((x: ReportChartData) => x.label !== "NULL" || x.color !== null);
//         setFilteredChartData(filteredchartData);

//       } else {
//         Alert.alert("error", error.message);
//       }

//     }
//     useEffect(() => {
//         handleGetIncidentActivityData();
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
//                   yAxisName={incidentActivityChartData.yAxisName}
//                   xAxisName={incidentActivityChartData.xAxisName}
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
//                   <Text style={styles.title}>{incidentActivityChartData.title}</Text>
//                   <Text style={styles.title}>{incidentActivityChartData.subTitle}</Text>
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


// export default IncidentActivityInfo;



// ==================== Updated on 09-04-2024 ================================= //

import React, { useEffect, useState } from 'react'
import { IncidentActivityDataPayLoad, ReportChartData, IncidentActivityData } from '../types';
import GetIncidentActivityData from '../server/api-functions/get-incident-activity-data';
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

const IncidentActivityInfo = () => {
  {
    const [incidentActivityChartData, setIncidentActivityChartData] = useState<IncidentActivityData>({
      title: null,
      subTitle: null,
      xAxisName: null,
      yAxisName: null,
      chartData: null
    });
    const [filteredChartData, setFilteredChartData] = useState<ReportChartData[]>([]);
    const [currentChart, setCurrentChart] = useState<string>('PIE');
    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const currentDate: string = moment().format('DD/MM/YYYY');
    const startDate: string = moment().subtract(1, 'months').format('DD/MM/YYYY');


    const payLoad: IncidentActivityDataPayLoad = {
      ...useCredential,
      start: startDate,
      viewAs: "COMPANY HEAD",
      end: currentDate
    }

    const chartItems = [
      { label: 'PIE', value: 'PIE' },
      { label: 'BAR', value: 'BAR' },
      { label: 'DONUT', value: 'DONUT' },
    ];


    const navigateToChartList = (statusType: string, payLoad: string) => {
      const payloadString = JSON.stringify(payLoad); // Stringify the payload here
      router.push({ pathname: `/chartReport/GetIncidentActivityDataListDetailsInfo`, params: { statusType, payload: payloadString } });
    }
    const handleGetIncidentActivityData = async () => {



      const { data, error, status } = await GetIncidentActivityData(payLoad);
      if (status === 200) {
        const { chartData, title, subTitle, yAxisName, xAxisName } = data;
        setIncidentActivityChartData(data);

        const filteredchartData: ReportChartData[] = chartData && chartData.filter((x: ReportChartData) => x.label !== "NULL" || x.color !== null);
        setFilteredChartData(filteredchartData);

      } else {
        Alert.alert("error", error.message);
      }

    }
    useEffect(() => {
      handleGetIncidentActivityData();
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
                  yAxisName={incidentActivityChartData.yAxisName}
                  xAxisName={incidentActivityChartData.xAxisName}
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
                      onPress={() => navigateToChartList(data?.status ?? "", payLoad)}>
                      <FontAwesome
                        name="circle"
                        size={25}
                        color={`#${data.color ?? '000'}`}
                        style={{ marginRight: 15, opacity: 1 }}
                      />
                      <Text style={{ color: `#${data.color ?? '000'}` }}>{data.label ?? ''}</Text>
                    </Pressable>
                  )
                })}
                <View style={{ alignItems: 'flex-start' }}>
                  <Text style={styles.title}>{incidentActivityChartData.title}</Text>
                  <Text style={styles.title}>{incidentActivityChartData.subTitle}</Text>
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
                  <Text style={styles.title}>{incidentActivityChartData.title}</Text>
                  <Text style={styles.title}>{incidentActivityChartData.subTitle}</Text>
                </View>
              </View> */}

            </Card>
            : <CardSkelton />
        }
        <View style={styles.chartSelctorContainer}>
          <Text>Chart Type</Text>
          <DropDown
            selectedValue={currentChart}
            dropdownItems={chartItems}
            setSelectedValue={setCurrentChart}
          />
        </View>
      </View>
    )
  }
}


export default IncidentActivityInfo;
