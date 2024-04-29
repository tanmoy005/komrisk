import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { styles } from '@/src/style'
import { Alert, FlatList, RefreshControl, View } from 'react-native'
import { RootState } from '@/src/store'
import NotificationCard from '../cards/NotificationCard'
import GetComplianceAlertsListDetails from '@/src/server/api-functions/Alerts/get-compliance-alerts-list'
import { ComplianceStatusDataList, NotificationListDataItem, UserModel } from '@/src/types'

const NotificationList = () => {
    const [refreshing, setRefreshing] = useState(true);

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

    const onRefresh = React.useCallback(() => {
        handleGetComplianceAlertsList();
        setRefreshing(true);
    }, []);

    console.log('DataList', DataList);

    return (
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
            {/* <View style={styles.chartContainer}> */}
            {/* <HeadImageSection /> */}
            <FlatList showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }

                data={DataList}
                renderItem={({ item }) => <NotificationCard data={item} />}
                contentContainerStyle={{ gap: 10, padding: 10 }}
            // refreshControl={
            //     <RefreshControl refreshing={refreshing} onRefresh={handleGetActivityStatusDataList} />
            // }
            />
            {/* </View> */}
        </View>
    )
}


export default NotificationList;