import { View, Text, Platform, FlatList } from 'react-native'
import React, { useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useCartContext } from '@/src/provider/CartProvider';
import ComplianceChartDataList from '@/assets/data/chartdataList';
import ChartListItem from '@/src/components/ChartListItem';

const ChartDataList = () => {
    const { items, total } = useCartContext();
    const { aaData } = ComplianceChartDataList;

    //console.log("aaData", aaData);
    

    return (
        <FlatList
            data={aaData}
            // data={[]}
            renderItem={({ item }) => <ChartListItem data={item} />}
            // renderItem={({ item = null }) =>  //console.log("item4444", item)}
            contentContainerStyle={{ gap: 10, padding: 10 }}
        />
    )
}

export default ChartDataList