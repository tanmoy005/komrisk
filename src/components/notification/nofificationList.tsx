import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { View } from '../Themed'
import { styles } from '@/src/style'
import { Alert, FlatList } from 'react-native'
import { RootState } from '@/src/store'
import NotificationCard from '../cards/NotificationCard'
import GetComplianceAlertsListDetails from '@/src/server/api-functions/get-compliance-alerts-list'
import { ComplianceStatusDataList, NotificationListDataItem, UserModel } from '@/src/types'

const NotificationList = () => {

    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const [complianceAlertDataList, setComplianceAlertDataList] = useState<ComplianceStatusDataList>({
        sEcho: null,
        aaData: null,
        iTotalRecords: null,
        iTotalDisplayRecords: null,
    });
    const [DataList, setDataList] = useState<NotificationListDataItem[]>([{}]);

    const handleGetComplianceAlertsList = async () => {
        const payLoad: UserModel = {
            ...useCredential
        }
        const { data, error, status } = await GetComplianceAlertsListDetails(payLoad);
        if (status === 200) {
            const { aaData } = data;
            setComplianceAlertDataList(data);
            if (aaData.length > 0) {
                setDataList(aaData);
                // setRefreshing(false);
            }
        } else {
            Alert.alert("error4444", error.message);
        }
        // setDataList([{}]);
    }
    useEffect(() => {
        handleGetComplianceAlertsList();
    }, []);


    return (
        
        <View style={styles.chartContainer}>
            {/* <HeadImageSection /> */}
            <FlatList
                data={DataList}
                renderItem={({ item }) => <NotificationCard data={item} />}
                contentContainerStyle={{ gap: 10, padding: 10 }}
            // refreshControl={
            //     <RefreshControl refreshing={refreshing} onRefresh={handleGetActivityStatusDataList} />
            // }
            />
        </View>
    )
}


export default NotificationList;