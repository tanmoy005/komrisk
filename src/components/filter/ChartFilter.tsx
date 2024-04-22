import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import MuiIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ChartFilterProps, ComplianceView, DropDownItem, availableViews } from '@/src/types';
import { scaleCardSize, size24 } from '@/src/style';
import { RootState } from '@/src/store/rootReducer';
import { DateFormatDDMMYYYY, hasValue } from '@/src/utils';
import { View } from 'react-native';
import CustomDatePicker from '../CustomDatePicker';
import DropDown from '../Dropdown';
import Button from '../Button';

const ChartFilter = ({
    chartFilterPayload,
    setChartFilterPayload,
    reportType,
    setModalVisible
}: ChartFilterProps) => {

    const countryDropdownLabel: DropDownItem = {
        label: 'Country', value: '', icon: () => <MuiIcon name="web" size={size24} color="rgba(160, 151, 220, 1)" />
    }
    const viewAsDropdownLabel: DropDownItem = {
        label: 'View As', value: '', icon: () => <MuiIcon name="earth" size={size24} color="rgba(160, 151, 220, 1)" />
    }

    let filterCountrylist: DropDownItem[] = [countryDropdownLabel];
    let filterViewedAslist: DropDownItem[] = [viewAsDropdownLabel];

    const [selectedCountry, setSelectedCountry] = useState<string>('');
    console.log('chartFilterPayload.viewAs', chartFilterPayload.viewAs);
    
    const [selectedViewAs, setSelectedViewAs] = useState<string>(chartFilterPayload.viewAs);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const useAccessDetails = useSelector((state: RootState) => state.authUserAccess.payload);
    const useAvailableViews = useSelector((state: RootState) => state.incidentAvailableViews.payload);

    const { countryEnabled, countryList, complianceViewAs } = useAccessDetails;
    if (countryEnabled) {
        const filteredCountryData: [number, string][] | null = countryList && countryList.filter((x: [number, string]) => x[0] !== null || x[1] !== null);
        filterCountrylist = filteredCountryData && filteredCountryData.length > 0 ? [...filterCountrylist, ...filteredCountryData?.map((subList: [number, string]) => {
            return { value: subList[0].toString(), label: subList[1] };
        })] : [...filterCountrylist];


        console.log("filterCountrylist", filterCountrylist)
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
        if (!hasValue(selectedViewAs)) {
            return;
        }
        if (!hasValue(startDate)) {
            return;
        }
        if (!hasValue(endDate)) {
            return;
        }
        if (!hasValue(selectedCountry)) {
            return;
        }
        chartFilterPayload.viewAs = selectedViewAs;
        chartFilterPayload.start = DateFormatDDMMYYYY(startDate && startDate.toString()) ?? "";
        chartFilterPayload.end = DateFormatDDMMYYYY(endDate.toString()) ?? "";
        const { label: _selectedCountry } = filterCountrylist.filter(({ value }) => value === selectedCountry)[0];
        chartFilterPayload.countryName = selectedCountry;
        console.log('chartFilterPayload', chartFilterPayload);
        
        setChartFilterPayload({ ...chartFilterPayload });
        setModalVisible(false);
    }



    return (
        <View style={{ marginTop: 48, rowGap: 20, zIndex: 2110, position: 'absolute', left: scaleCardSize(8), justifyContent: 'space-between', height: '100%' }}>

            <View style={{ zIndex: 2118, marginTop: 64 }}>
                <View  style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>
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
                <View style={{ marginTop: 38, zIndex: 2120 }}>
                    <DropDown
                        dropdownItems={filterCountrylist}
                        selectedValue={selectedCountry}
                        setSelectedValue={setSelectedCountry}
                        minWidth={160}
                    />
                </View>
                <View style={{ marginTop: 38, zIndex: 2119 }}>
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


