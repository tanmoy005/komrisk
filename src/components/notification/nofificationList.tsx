
import NoDataAvailableCard from '@/src/components/NoDataAvailableCard';
import NotificationCard from '@/src/components/cards/NotificationCard';
import GetComplianceAlertsListDetails from '@/src/server/api-functions/Alerts/get-compliance-alerts-list';
import { RootState } from '@/src/store';
import { ComplianceStatusDataList, NotificationDataPayLoad, NotificationListDataItem, notificationSeen } from '@/src/types';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, RefreshControl, View } from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from '@/src/style';

const NotificationList = () => {
    const [refreshing, setRefreshing] = useState(true);

    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const useId = useSelector((state: RootState) => state.authUserDetails.payload.userDetails.userId);

    const notificationSeenList: notificationSeen[] | undefined = useSelector((state: RootState) => state.notificationSeen.payload);
    const notificationIdLists = notificationSeenList?.map(item => item.notificationIdList) || [];
    const NotificationIds = notificationIdLists.flat().map(id => Number(id)); // Convert to number

    const [complianceAlertDataList, setComplianceAlertDataList] = useState<ComplianceStatusDataList>({
        sEcho: null,
        aaData: null,
        iTotalRecords: null,
        iTotalDisplayRecords: null,
    });

    const [DataList, setDataList] = useState<NotificationListDataItem[]>([]);
    const [FilteredDataList, setFilteredDataList] = useState<NotificationListDataItem[]>([]);

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
        };

        const { data, error, status } = await GetComplianceAlertsListDetails(payLoad);
        if (status === 200) {
            const { aaData } = data;
            setComplianceAlertDataList(data);

            if (aaData.length > 0) {
                setDataList(aaData);
                // Filter the aaData to match items with NotificationIds
                const matchedItems = aaData.filter((item: NotificationListDataItem) => NotificationIds.includes(item.id));
                // Filter out matchedItems from aaData
                const remainingItems = aaData.filter((item: NotificationListDataItem) => !NotificationIds.includes(item.id));
                // Sort matchedItems in ascending order
                const sortedMatchedItems = matchedItems.sort((a: NotificationListDataItem, b: NotificationListDataItem) => a.id - b.id);
                // Concatenate sortedMatchedItems to the end of remainingItems
                const updatedDataList = [...remainingItems, ...sortedMatchedItems];
                setFilteredDataList(updatedDataList);
            }
            setRefreshing(false);
        } else {
            Alert.alert("Error", error.message);
            setRefreshing(false);
        }
    };


    useEffect(() => {
        handleGetComplianceAlertsList();
    }, []);

    const onRefresh = React.useCallback(() => {
        handleGetComplianceAlertsList();
        setRefreshing(true);
    }, []);

    return (
        <View style={styles.notificationContainer}>
            {FilteredDataList.length === 0 && refreshing === false ? (
                <NoDataAvailableCard />
            ) : (

                <FlatList
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    data={FilteredDataList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        return <NotificationCard data={item} />;
                    }}
                    contentContainerStyle={{ gap: 10, padding: 10 }}
                />
            )}
        </View>
    );
};

export default NotificationList;
