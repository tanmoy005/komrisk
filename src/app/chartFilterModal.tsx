import React, { useState } from 'react'
import { View } from '../components/Themed'
import { Text } from 'react-native';
import { screenWidth, styles } from '../style';
import { Divider } from 'react-native-elements';
import CardContainer from '../components/cards/CardContainer';
import CardTextContainer from '../components/cards/CardTextContainer';
import Button from '../components/Button';
import DropDown from '../components/Dropdown';
import CustomDatePicker from '../components/CustomDatePicker';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { availableViews, chartFilterProps, ComplianceView, Country, DefaultDropDownItem, DropDownItem } from '../types';
import { DateFormatDDMMYYYY, StringToDate } from '../utils';


const ChartFilter = ({ chartFilterPayload, setChartFilterPayload, reportType, setFilterModalVisible, setModalVisible }: chartFilterProps) => {

    let filterCountrylist: DropDownItem[] = [DefaultDropDownItem];
    let filterViewedAslist: DropDownItem[] = [DefaultDropDownItem];
    // export default function ModalScreen({filterType : string}) {
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedViewAs, setSelectedViewAs] = useState<string>(chartFilterPayload.viewAs);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    // const [startDate, setStartDate] = useState<Date>(StringToDate(chartFilterPayload.start));
    //  const [endDate, setEndDate] = useState<Date>(StringToDate("16/04/2024"));

    //const [startDate, setStartDate] = useState<string>(moment().subtract(1, 'months').format('DD/MM/YYYY'));
    //const [endDate, setEndDate] = useState<string>(moment().subtract(1, 'months').format('DD/MM/YYYY'));

    const useAccessDetails = useSelector((state: RootState) => state.authUserAccess.payload);
    const useAvailableViews = useSelector((state: RootState) => state.incidentAvailableViews.payload);
    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);

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

    if (reportType === "COMPLIANCE") {
        const filteredViewedAsData: ComplianceView[] | null = complianceViewAs && complianceViewAs.filter((x: ComplianceView) => x.key !== null || x.value !== null);

        filterViewedAslist = filteredViewedAsData && filteredViewedAsData.length > 0 ? filteredViewedAsData?.map((subList: ComplianceView) => {
            return { value: subList.value, label: subList.key };
        }) : [DefaultDropDownItem];
    }
    if (reportType === "INCIDENT") {
        const filteredViewedAsDataIncident: availableViews[] | null = useAvailableViews && useAvailableViews.filter((x: availableViews) => x.key !== null || x.value !== null);

        filterViewedAslist = filteredViewedAsDataIncident && filteredViewedAsDataIncident.length > 0 ? filteredViewedAsDataIncident?.map((subList: availableViews) => {
            return { value: subList?.value ?? "", label: subList?.key ?? "" };
        }) : [DefaultDropDownItem];
    }

    const handleApplyFilters = () => {


        chartFilterPayload.viewAs = selectedViewAs;
        chartFilterPayload.start = DateFormatDDMMYYYY(startDate && startDate.toString()) ?? "";
        chartFilterPayload.end = DateFormatDDMMYYYY(endDate.toString()) ?? "";
        setChartFilterPayload({ ...chartFilterPayload });
        console.log("1", chartFilterPayload);
        setFilterModalVisible(false)
    }

    const [firstFieldBottom, setFirstFieldBottom] = useState<number>(0);
    const [secondFieldBottom, setSecondFieldBottom] = useState('');
    const [diverHeight, setDiverHeight] = useState<number>(0);

    const handlefirstFieldLayout = (event: any) => {
        const { height, y } = event.nativeEvent.layout;
        setFirstFieldBottom(height + y);
        // console.log('height', height);
    }
    const divider1Layout = (event: any) => {

        const { height: divider1, y } = event.nativeEvent.layout;
        setDiverHeight(divider1);
    }
    const handlesecondFieldLayout = (event: any) => {
        const { height, y } = event.nativeEvent.layout;
    }

    return (
        <View style={{ ...styles.dashboardContainer, width: (screenWidth * 0.75) }}>


            <View style={styles.chartContainer}>

                <View style={{ ...styles.taskCard, borderWidth: 0, justifyContent: 'space-between', width: (screenWidth * 0.85), height: '100%', position: 'relative' }}>
                    <CardContainer styles={{ position: 'relative', width: '100%' }}>
                        <CardTextContainer styles={{ position: 'relative', width: '100%' }}>
                            <View onLayout={handlefirstFieldLayout} style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', position: 'absolute', top: 11, zIndex: 4, right: 0 }}>
                                <Text style={styles.chartFilterFieldLabelContainer}>Country </Text>
                                <DropDown
                                    dropdownItems={filterCountrylist}
                                    selectedValue={selectedCountry}
                                    setSelectedValue={setSelectedCountry}
                                    minWidth={150}
                                />
                            </View>
                            <Divider onLayout={divider1Layout} style={{ ...styles.divider1, position: 'absolute', top: firstFieldBottom + 22, width: (screenWidth * 0.80) }} />
                            <View onLayout={handlesecondFieldLayout} style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', position: 'absolute', top: (firstFieldBottom + diverHeight + 22 * 2), zIndex: 9, right: 0 }}>
                                <Text style={styles.chartFilterFieldLabelContainer}>View as </Text>
                                <DropDown
                                    dropdownItems={filterViewedAslist}
                                    selectedValue={selectedViewAs}
                                    setSelectedValue={setSelectedViewAs}
                                    minWidth={150}
                                />
                            </View>
                            <Divider style={{ ...styles.divider1, position: 'absolute', top: ((firstFieldBottom * 2) + diverHeight + 22 * 3), width: (screenWidth * 0.80) }} />
                            <View onLayout={handlesecondFieldLayout} style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', position: 'absolute', top: (firstFieldBottom + diverHeight) * 2 + 22 * 4, zIndex: 1, right: 0 }}>
                                <Text style={styles.chartFilterFieldLabelContainer}>Start Date </Text>
                                <CustomDatePicker
                                    setDate={setStartDate}
                                    date={startDate}
                                />
                            </View>
                            <Divider style={{ ...styles.divider1, position: 'absolute', top: (firstFieldBottom * 3 + diverHeight + 22 * 4), width: (screenWidth * 0.80) }} />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', position: 'absolute', top: firstFieldBottom * 3 + diverHeight * 2 + 22 * 5, zIndex: 1, right: 0 }}>
                                <Text style={styles.chartFilterFieldLabelContainer}>End Date </Text>
                                <CustomDatePicker
                                    setDate={setEndDate}
                                    date={endDate}
                                />
                            </View>
                        </CardTextContainer>
                    </CardContainer>
                    <View>
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


