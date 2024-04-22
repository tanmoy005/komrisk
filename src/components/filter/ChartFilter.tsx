import React, { useState } from 'react'


import { Divider } from 'react-native-elements';

import { useSelector } from 'react-redux';

import MuiIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ChartFilterProps, ComplianceView, DropDownItem, availableViews } from '@/src/types';
import { screenWidth, size24, styles } from '@/src/style';
import { RootState } from '@/src/store/rootReducer';
import { DateFormatDDMMYYYY } from '@/src/utils';
import { View } from 'react-native';
import CardContainer from '../cards/CardContainer';
import CardTextContainer from '../cards/CardTextContainer';
import FilterDropdown from './FilterDropdown';
import CustomDatePicker from '../CustomDatePicker';
import DropDown from '../Dropdown';
import Button from '../Button';

const ChartFilter = ({
    chartFilterPayload,
    setChartFilterPayload,
    reportType,
    setFilterModalVisible,
    setModalVisible,
    filterType,
    filterTypes,
    setFilterType,
    filterTypemModalIsOpen,
    setFilterTypeModalIsOpen

}: ChartFilterProps) => {

    const countryDropdownLabel: DropDownItem = {
        label: 'Country', value: '', icon: () => <MuiIcon name="web" size={size24} color="rgba(160, 151, 220, 1)" />
    }
    const viewAsDropdownLabel: DropDownItem = {
        label: 'View As', value: '', icon: () => <MuiIcon name="earth" size={size24} color="rgba(160, 151, 220, 1)" />
    }
    let filterCountrylist: DropDownItem[] = [countryDropdownLabel];
    let filterViewedAslist: DropDownItem[] = [viewAsDropdownLabel];
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
        filterCountrylist = filteredCountryData && filteredCountryData.length > 0 ? [...filterCountrylist, ...filteredCountryData?.map((subList: [number, string]) => {
            return { value: subList[0].toString(), label: subList[1] };
        })] : [...filterCountrylist];


        console.log("filterCountrylist", filterCountrylist)
        // setGetCountryList(filterCountrylist);
    }

    if (reportType === "COMPLIANCE") {
        const filteredViewedAsData: ComplianceView[] | null = complianceViewAs && complianceViewAs.filter((x: ComplianceView) => x.key !== null || x.value !== null);

        filterViewedAslist = filteredViewedAsData && filteredViewedAsData.length > 0 ? [...filterViewedAslist, ...filteredViewedAsData?.map((subList: ComplianceView) => {
            return { value: subList.value, label: subList.key };
        })] : [...filterViewedAslist];
    }
    if (reportType === "INCIDENT") {
        const filteredViewedAsDataIncident: availableViews[] | null = useAvailableViews && useAvailableViews.filter((x: availableViews) => x.key !== null || x.value !== null);

        filterViewedAslist = filteredViewedAsDataIncident && filteredViewedAsDataIncident.length > 0 ? filteredViewedAsDataIncident?.map((subList: availableViews) => {
            return { value: subList?.value ?? "", label: subList?.key ?? "" };
        }) : [countryDropdownLabel];
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
        <View style={{ marginTop: 48, rowGap: 20, zIndex: 2110, position: 'relative', justifyContent: 'space-between', backgroundColor: 'red', height: '100%'}}>

            <View style={{ zIndex: 2118, marginTop: 64 }}>
                <View onLayout={handlesecondFieldLayout} style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>
                    <CustomDatePicker
                        setDate={setStartDate}
                        date={startDate}
                        label={'Start Date'}
                    />
                    <CustomDatePicker
                        setDate={setEndDate}
                        date={endDate}
                        label={'End Date'}
                    />
                </View>
                <View style={{ marginTop: 38, zIndex: 2119 }}>
                    <DropDown
                        dropdownItems={filterCountrylist}
                        selectedValue={selectedCountry}
                        setSelectedValue={setSelectedCountry}
                        minWidth={160}
                    />
                </View>
                <View style={{ marginTop: 38 }}>
                    <DropDown
                        dropdownItems={filterViewedAslist}
                        selectedValue={selectedViewAs}
                        setSelectedValue={setSelectedViewAs}
                        minWidth={160}
                    />
                </View>
            </View>

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

    )
}

export default ChartFilter;


