import NoDataAvailableCard from '@/src/components/NoDataAvailableCard'
import NotificationCard from '@/src/components/cards/NotificationCard'
import GetComplianceAlertsListDetails from '@/src/server/api-functions/Alerts/get-compliance-alerts-list'
import { RootState } from '@/src/store'
import { ComplianceStatusDataList, NotificationDataPayLoad, NotificationListDataItem } from '@/src/types'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, RefreshControl, View } from 'react-native'
import { useSelector } from 'react-redux'

const NotificationList = () => {
    const [refreshing, setRefreshing] = useState(true);

    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const useId = useSelector((state: RootState) => state.authUserDetails.payload.userDetails.userId);
    //console.log("useId",useId);
    
    const [complianceAlertDataList, setComplianceAlertDataList] = useState<ComplianceStatusDataList>({
        sEcho: null,
        aaData: null,
        iTotalRecords: null,
        iTotalDisplayRecords: null,
    });
    const [DataList, setDataList] = useState<NotificationListDataItem[]>([]);

    const handleGetComplianceAlertsList = async () => {
        if (!useId) {
            Alert.alert("Error", "User ID is missing");
            setRefreshing(false);
            return;
        }

        const payLoad: NotificationDataPayLoad = {
            ...useCredential,
            user: {
                id: useId.toString()
            }
        }
        const { data, error, status } = await GetComplianceAlertsListDetails(payLoad);

        console.log("data",data);
        
        if (status === 200) {
            const { aaData } = data;         
            setComplianceAlertDataList(data);
            if (aaData.length > 0) {
                setDataList(aaData);
            }
            setRefreshing(false);
        } else {
            Alert.alert("error", error.message);
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

    return (
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
            {
                DataList.length == 0 && refreshing == false ?
                    <NoDataAvailableCard /> :

                    <FlatList showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }

                        data={DataList}
                        renderItem={({ item }) => <NotificationCard data={item} />}
                        contentContainerStyle={{ gap: 10, padding: 10 }}
                    />
            }
        </View>
    )
}


export default NotificationList;