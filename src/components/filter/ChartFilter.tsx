import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { ChartFilterProps, ComplianceView, DropDownItem, availableViews } from '@/src/types';
import { scaleCardSize } from '@/src/style';
import { DateFormatDDMMYYYY, StringToDateDDMMYYYY, hasValue } from '@/src/utils';
import { View } from 'react-native';
import CustomDatePicker from '../CustomDatePicker';
import Button from '../Button';
import CustomeDropDown from '../CustomeDropDown';
import { RootState } from '@/src/store';

const ChartFilter = ({
    chartFilterPayload,
    setChartFilterPayload,
    reportType,
    setModalVisible
}: ChartFilterProps) => {



    const countryDropdownLabel: DropDownItem = {
        lable: 'Country',
        value: '',
        image: {
            uri: ''
        }
    }
  
    const viewAsDropdownLabel: DropDownItem = {
        lable: 'View As',
        value: '',
        image: {
            uri: ''
        }
    }

    let filterCountrylist: DropDownItem[] = [countryDropdownLabel];
    let filterViewedAslist: DropDownItem[] = [viewAsDropdownLabel];

    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedViewAs, setSelectedViewAs] = useState<string>(chartFilterPayload?.viewAs ?? "");
    const [startDate, setStartDate] = useState<Date>(StringToDateDDMMYYYY(chartFilterPayload.start.trim()));
    const [displayStartDate, setDisplayStartDate] = useState<string | null | undefined>('Start Date');
    const [displayEndDate, setDisplayEndDate] = useState<string | null | undefined>('End Date');
    const [endDate, setEndDate] = useState<Date>(StringToDateDDMMYYYY(chartFilterPayload.end.trim()));

    const useAccessDetails = useSelector((state: RootState) => state.authUserAccess.payload);
    const useAvailableViews = useSelector((state: RootState) => state.incidentAvailableViews.payload);

    const { countryEnabled, countryList, complianceViewAs } = useAccessDetails;
    
    if (countryEnabled) {
        const filteredCountryData: [number, string][] | null = countryList && countryList.filter((x: [number, string]) => x[0] !== null || x[1] !== null);

        if (filteredCountryData && filteredCountryData.length > 0) {
            filteredCountryData.forEach((subList: [number, string]) => {
                filterCountrylist = [...filterCountrylist, {
                    value: subList[0].toString(),
                    lable: subList[1],
                    image: {
                        uri: ''
                    }
                }];
            });
        }
    }

    if (reportType === "COMPLIANCE") {
        const filteredViewedAsData: ComplianceView[] | null = complianceViewAs && complianceViewAs.filter((x: ComplianceView) => x.key !== null || x.value !== null);
        if (filteredViewedAsData && filteredViewedAsData.length > 0) {
            filteredViewedAsData.forEach(({ value, key }: ComplianceView) => {
                filterViewedAslist = [...filterViewedAslist, {
                    value: value,
                    lable: key,
                    image: {
                        uri: ''
                    }
                }];
            });
        }
    }
    if (reportType === "INCIDENT") {
        const filteredViewedAsDataIncident: availableViews[] | null = useAvailableViews && useAvailableViews.filter((x: availableViews) => x.key !== null || x.value !== null);
        if (filteredViewedAsDataIncident && filteredViewedAsDataIncident.length > 0) {
            filteredViewedAsDataIncident.forEach((subList: availableViews) => {
                filterViewedAslist = [...filterViewedAslist, { value: subList?.value ?? "", lable: subList?.key ?? "" }];
            });
        }
    }

    const handleApplyFilters = () => {
        if (!hasValue(startDate)) {
            return;
        }
        if (!hasValue(endDate)) {
            return;
        }

        if (hasValue(selectedViewAs)) {

            chartFilterPayload.viewAs = selectedViewAs;
        }
        if (hasValue(selectedCountry)) {

            const { lable: _selectedCountry } = filterCountrylist.filter(({ value }) => value === selectedCountry)[0];
            chartFilterPayload.country = _selectedCountry ?? "India";
        }


        chartFilterPayload.start = DateFormatDDMMYYYY(startDate && startDate.toString()) ?? "";
        chartFilterPayload.end = DateFormatDDMMYYYY(endDate.toString()) ?? "";
        const { lable: _selectedCountry } = filterCountrylist.filter(({ value }) => value === selectedCountry)[0];
        chartFilterPayload.country = selectedCountry;
        setChartFilterPayload({ ...chartFilterPayload });
        setModalVisible(false);
    }
    console.log('startDate', startDate);

    console.log('startDate3423', DateFormatDDMMYYYY(startDate && startDate.toString()));
    const handleStartDateConfirmation = (date: Date) => {
        setDisplayStartDate(DateFormatDDMMYYYY(date && date.toString()));
    }
    const handleEndDateConfirmation = (date: Date) => {
        setDisplayEndDate(DateFormatDDMMYYYY(date && date.toString()));
    }

    return (
        <View style={{ marginTop: 48, rowGap: 20, zIndex: 2110, position: 'absolute', left: scaleCardSize(8), justifyContent: 'space-between', height: '100%' }}>

            <View style={{ zIndex: 2118, marginTop: 64 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', }}>
                    <CustomDatePicker
                        setDate={setStartDate}
                        date={startDate}
                        label={displayStartDate}
                        _handleConfirm={handleStartDateConfirmation}
                    />
                    <CustomDatePicker
                        setDate={setEndDate}
                        date={endDate}
                        label={displayEndDate}
                        _handleConfirm={handleEndDateConfirmation}
                    />
                </View>
                <View style={{ marginTop: 38, zIndex: 2120 }}>
                    <CustomeDropDown
                        dropdownItems={filterCountrylist}
                        selectedValue={selectedCountry}
                        setSelectedValue={setSelectedCountry}
                        minWidth={160}
                    />
                </View>
                <View style={{ marginTop: 38, zIndex: 2119 }}>
                    <CustomeDropDown
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


