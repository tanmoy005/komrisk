// import React, { useEffect, useState } from 'react'
// import { ImpactAnalysisDataPayLoad, ReportChartData, ImpactAnalysisData } from '../types';
// import GetImpactAnalysisData from '../server/api-functions/get-impact-analysis-data';
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

// const ImpactAnalysisInfo = () => {
//   {
//     const [impactAnalysisChartData, setImpactAnalysisChartData] = useState<ImpactAnalysisData>({
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
//       router.push({ pathname: `/chartReport/GetImpactAnalysisDataListDetailsInfo`, params: { statusType } }); // Remove the braces in para
//     }
//     const handleGetImpactAnalysisData = async () => {

//       const payLoad: ImpactAnalysisDataPayLoad = {
//         ...useCredential,
//         start: startDate,
//         viewAs: "COMPANY HEAD",
//         end: currentDate
//       }

//       const { data, error, status } = await GetImpactAnalysisData(payLoad);
//       if (status === 200) {
//         const { chartData, title, subTitle, yAxisName, xAxisName } = data;
//         setImpactAnalysisChartData(data);

//         const filteredchartData: ReportChartData[] = chartData && chartData.filter((x: ReportChartData) => x.label !== "NULL" || x.color !== null);
//         setFilteredChartData(filteredchartData);

//       } else {
//         Alert.alert("error", error.message);
//       }

//     }
//     useEffect(() => {
//         handleGetImpactAnalysisData();
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
//                   yAxisName={impactAnalysisChartData.yAxisName}
//                   xAxisName={impactAnalysisChartData.xAxisName}
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
//                   <Text style={styles.title}>{impactAnalysisChartData.title}</Text>
//                   <Text style={styles.title}>{impactAnalysisChartData.subTitle}</Text>
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


// export default ImpactAnalysisInfo;



// ================================== Updated on 09-04-2024 ================================== //

import React, { useEffect, useState } from 'react'
import { ImpactAnalysisDataPayLoad, ReportChartData, ImpactAnalysisData, ChartProp } from '../types';
import GetImpactAnalysisData from '../server/api-functions/get-impact-analysis-data';
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

const ImpactAnalysisInfo = ({currentChart}: ChartProp) => {
  {
    const [impactAnalysisChartData, setImpactAnalysisChartData] = useState<ImpactAnalysisData>({
      title: null,
      subTitle: null,
      xAxisName: null,
      yAxisName: null,
      chartData: null
    });
    const [totalValue, setTotalValue] = useState<number>(0);
    const [filteredChartData, setFilteredChartData] = useState<ReportChartData[]>([]);
    // const [currentChart, setCurrentChart] = useState<string>('PIE');
    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const currentDate: string = moment().format('DD/MM/YYYY');
    const startDate: string = moment().subtract(1, 'months').format('DD/MM/YYYY');

    const payLoad: ImpactAnalysisDataPayLoad = {
      ...useCredential,
      start: startDate,
      viewAs: "COMPANY HEAD",
      end: currentDate
    }

   
    const chartItems = [
      { label: 'PIE', value: 'PIE' , icon: () => <Icon name="chart-pie" size={20} color="#900" />  },
      { label: 'BAR', value: 'BAR' , icon: () => <Icon name="chart-bar" size={20} color="#900" />},
      { label: 'DONUT', value: 'DONUT', icon: () => <Icon name="chart-donut" size={20} color="#900" /> },
    ];


    const navigateToChartList = (statusType: string, payLoad: ImpactAnalysisDataPayLoad) => {
      const payloadString = JSON.stringify(payLoad); // Stringify the payload here
      router.push({ pathname: `/chartReport/GetImpactAnalysisDataListDetailsInfo`, params: { statusType, payload: payloadString } });
    }

    const handleGetImpactAnalysisData = async () => {



      const { data, error, status } = await GetImpactAnalysisData(payLoad);
      if (status === 200) {
        const { chartData, title, subTitle, yAxisName, xAxisName } = data;
        setImpactAnalysisChartData(data);

        const filteredchartData: ReportChartData[] = chartData && chartData.filter((x: ReportChartData) => x.label !== "NULL" || x.color !== null);
        setFilteredChartData(filteredchartData);
        const sum: number = filteredchartData.map((x: ReportChartData) => x.value).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setTotalValue(sum);
      } else {
        Alert.alert("error", error.message);
      }

    }
    useEffect(() => {
      handleGetImpactAnalysisData();
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
                  yAxisName={impactAnalysisChartData.yAxisName}
                  xAxisName={impactAnalysisChartData.xAxisName}
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
                  <Text style={styles.title}>{impactAnalysisChartData.title}</Text>
                  <Text style={styles.title}>{impactAnalysisChartData.subTitle}</Text>
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
}


export default ImpactAnalysisInfo;
