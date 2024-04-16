import React, { useState, useEffect } from 'react'
import { View } from '../components/Themed'
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { screenWidth, styles } from '../style';
import { Card, Divider } from 'react-native-elements';
import CardContainer3 from '../components/cards/CardContainer3';
import CardContainer from '../components/cards/CardContainer';
import CardTextContainer from '../components/cards/CardTextContainer';
import Button from '../components/Button';
import DropDown from '../components/Dropdown';
import CustomDatePicker from '../components/CustomDatePicker';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { chartFilterProps, ComplianceView, Country, DefaultDropDownItem, DropDownItem, UserModel } from '../types';
import { Alert, Pressable } from 'react-native';
import GetUserAccessDetails from '../server/api-functions/user-access-details';
import moment from 'moment';
// interface chartFilterProps {
//     setFilterPayload: React.Dispatch<React.SetStateAction<ActivityStatusDataPayLoad>>
//     reportType: string
// }


const ChartFilter = ({ chartFilterPayload, setChartFilterPayload, reportType, setFilterModalVisible,setModalVisible }: chartFilterProps) => {
    const [countryData, setCountryChartData] = useState<Country>({
        countryEnabled: null,
        countryList: null,

    });
    let filterCountrylist: DropDownItem[] = [DefaultDropDownItem];
    let filterViewedAslist: DropDownItem[] = [DefaultDropDownItem];
    // export default function ModalScreen({filterType : string}) {
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedViewAs, setSelectedViewAs] = useState<string>(chartFilterPayload.viewAs);
    const [startDate, setStartDate] = useState<Date>(new Date());
    //const [startDate, setStartDate] = useState<string>(moment().subtract(1, 'months').format('DD/MM/YYYY'));
    //const [endDate, setEndDate] = useState<string>(moment().subtract(1, 'months').format('DD/MM/YYYY'));
    
    const [endDate, setEndDate] = useState<Date>(new Date());
    const useAccessDetails = useSelector((state: RootState) => state.authUserAccess.payload);
    const useAvailableViews = useSelector((state: RootState) => state.incidentAvailableViews.payload);
    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    // const [getcountrylist, setGetCountryList] = useState<DropDownItem[]>([
    //     DefaultDropDownItem
    // ]);

    console.log("useAccessDetails", useAccessDetails);
    console.log("useAvailableViews", useAvailableViews);
    const { countryEnabled, countryList, complianceViewAs } = useAccessDetails;
    if (countryEnabled) {

        //     //const rearrangedCountryList = countryList.map(([value, label]) => ({ value, label }));
        const filteredCountryData: [number, string][] | null = countryList && countryList.filter((x: [number, string]) => x[0] !== null || x[1] !== null);

        filterCountrylist = filteredCountryData && filteredCountryData.length > 0 ? filteredCountryData?.map((subList: [number, string]) => {
            return { value: subList[0].toString(), label: subList[1] };
        }) : [DefaultDropDownItem];
        // setGetCountryList(filterCountrylist);
    }
    
    if (reportType = "COMPLIANCE") {
        const filteredViewedAsData: ComplianceView[] | null = complianceViewAs && complianceViewAs.filter((x: ComplianceView) => x.key !== null || x.value !== null);

        filterViewedAslist = filteredViewedAsData && filteredViewedAsData.length > 0 ? filteredViewedAsData?.map((subList: ComplianceView) => {
            return { value: subList.value, label: subList.key };
        }) : [DefaultDropDownItem];
    }

    const handleApplyFilters = () => {


        chartFilterPayload.viewAs = selectedViewAs;
        chartFilterPayload.start = startDate.toString();
        chartFilterPayload.end = endDate.toString();
        setChartFilterPayload(chartFilterPayload);
        console.log("1", chartFilterPayload);
        setFilterModalVisible(false)
    }

    // const handleGetCountryListData = async (userPayload:UserModel) => {


    //     const { data, error, status } = await GetUserAccessDetails(userPayload);
    //     if (status === 200) {
    //       const { countryEnabled, countryList } = data;
    //       setCountryChartData(data);
    //     } else {
    //       Alert.alert("error", error.message);
    //     }

    // }

    // console.log("countryData*****",countryData);

    // useEffect(() => {


    //     handleGetCountryListData(userPayload);
    //   }, [chartFilterPayload]);


    // const handleGetCountryListData = async (userPayload:UserModel) => {
    //     const { data, error, status } = await GetUserAccessDetails(userPayload);
    //     if (status === 200) {
    //         const { countryEnabled, countryList,complianceViewAs } = data;
    //         if (countryEnabled) {
    //             //const rearrangedCountryList = countryList.map(([value, label]) => ({ value, label }));
    //             let dictionaries = countryList.map(subList => {
    //                 return { value: subList[0], label: subList[1] };
    //             });

    //             console.log(dictionaries);
    //             let countrylist = [...dictionaries];
    //             setGetCountryList(countrylist)
    //             // console.log("rearrangedCountryList------------",rearrangedCountryList)
    //             // setCountryChartData({ ...data, countryList: rearrangedCountryList });
    //         } 



    //         else {
    //             setCountryChartData(data);
    //         }
    //     } else {
    //         Alert.alert("error", error.message);
    //     }
    // }

    // useEffect(() => {
    //     handleGetCountryListData(userPayload);
    // }, [chartFilterPayload]);


    // console.log("getcountrylist*********", getcountrylist)



    // const countryList = [
    //     { label: 'United Kingdom', value: 'United Kingdom', },
    //     { label: 'Antigua and Barbuda', value: 'Antigua and Barbuda', },
    //     { label: 'Saint Vincent and the Grenadines', value: 'Saint Vincent and the Grenadines', }
    // ];

    const viewAsList = [
        { label: 'United Kingdom', value: 'United Kingdom', },
        { label: 'Antigua and Barbuda', value: 'Antigua and Barbuda', },
        { label: 'Saint Vincent and the Grenadines', value: 'Saint Vincent and the Grenadines', }
    ];

    const [height, setHeight] = useState('');
    const handleLayout = (event: any) => {
        const { height } = event.nativeEvent.layout;
        setHeight(height);
        console.log('height', height);

    }

    return (
        <View style={{ ...styles.dashboardContainer, width: (screenWidth * 0.75) }}>


            <View style={styles.chartContainer}>

                <View style={{ ...styles.taskCard, justifyContent: 'space-between', width: '100%', height: '100%', position: 'relative' }}>
                    <CardContainer styles={{ position: 'relative', width: '100%' }}>
                        <CardTextContainer styles={{ position: 'relative', width: '100%' }}>
                            <View onLayout={handleLayout} style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', position: 'absolute', top: 11, zIndex: 2, right: 0 }}>
                                <Text style={{ textAlign: 'left' }}>Country </Text>
                                <DropDown
                                    dropdownItems={filterCountrylist}
                                    selectedValue={selectedCountry}
                                    setSelectedValue={setSelectedCountry}
                                    minWidth={150}
                                />
                            </View>
                            {/* <Divider style={{ ...styles.divider1, position:'absolute', top: height+ 22, width:'100%' }} /> */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', position: 'absolute', top: 71, zIndex: 1, right: 0 }}>
                                <Text style={{ textAlign: 'left' }}>View as </Text>
                                <DropDown
                                    dropdownItems={filterViewedAslist}
                                    selectedValue={selectedViewAs}
                                    setSelectedValue={setSelectedViewAs}
                                    minWidth={150}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', position: 'absolute', top: 141, zIndex: 1, right: 0 }}>
                                <Text style={{ textAlign: 'left' }}>Start Date </Text>
                                <CustomDatePicker
                                    setDate={setStartDate}
                                    date={startDate}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', position: 'absolute', top: 191, zIndex: 1, right: 0 }}>
                                <Text style={{ textAlign: 'left' }}>End Date </Text>
                                <CustomDatePicker
                                    setDate={setEndDate}
                                    date={endDate}
                                />
                            </View>
                        </CardTextContainer>
                    </CardContainer>
                    <View style={styles.submitBtnContainer}>
                        <Button
                            btnColor={'#A097DC'}
                            text='APPLY FILTERS'
                            style={{
                                paddingVertical: 20,
                                paddingHorizontal: 48,
                                fontWeight: '400',
                                fontSize: 16,
                                borderRadius: 5
                            }}
                            onPress={handleApplyFilters}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ChartFilter;


