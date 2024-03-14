import { FlatList } from 'react-native'
import React from 'react'
import ComplianceChartDataList from '@/assets/data/chartdataList';
import ChartListItem from '@/src/components/ChartListItem';

const ChartDataList = () => {
    const { aaData } = ComplianceChartDataList;
    return (
        <FlatList
            data={aaData}
            renderItem={({ item }) => <ChartListItem data={item} />}
            contentContainerStyle={{ gap: 10, padding: 10 }}
        />
    )
}

export default ChartDataList