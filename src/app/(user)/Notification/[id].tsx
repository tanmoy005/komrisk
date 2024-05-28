import React, { useEffect, useState } from 'react'
import NotificationDetails from '@/src/components/NotificationDetails';
import HeadImageSection from '@/src/components/headSection/HeadImageSection';
import Seperator24 from '@/src/components/seperators/Seperator24';
import BtnFilterHeader from '@/src/components/tabs/BtnFilterHeader';
import { styles } from '@/src/style';
import { View, Text, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import { storeNotificationSeen } from '@/src/store/slices/notification-seen-slice';
import { notificationSeen } from '@/src/types';
import { hasValue } from '@/src/utils';

const userNotificationObject = (userId: string | null, notificationIdList: string[]): notificationSeen => {
    return {
        userId,
        notificationIdList
    }
}

const ShowTaskDetails = () => {
    const data = useLocalSearchParams();
    const { type, id } = data;
    //const paramType = typeof type === 'string' ? type : type[0];
    const paramType = typeof type === 'string' ? type : (Array.isArray(type) ? type[0] : '');
    //const paramId = typeof id === 'string' ? id : id[0];
    const paramId = typeof id === 'string' ? id : (Array.isArray(id) ? id[0] : '');
    // const paramTaskId = typeof taskId === 'string' ? taskId : taskId[0];
    // const [taskType, setTaskType] = useState<string>(paramType);
    // const [complianceId, setComplianceId] = useState<string>('');

    const notificationSeenList: notificationSeen[] | undefined = useSelector((state: RootState) => state.notificationSeen.payload);
    const userDetails = useSelector((state: RootState) => state.authUserDetails.payload).userDetails;
    const { username: loggedInUserId } = userDetails;

    const dispatch = useDispatch();
    useEffect(() => {

        let updatedNotificationUserList: notificationSeen[] = [];
        if (notificationSeenList && notificationSeenList.length > 0) {
            // const existingUserHistory = notificationSeenList.filter(({ userId }) => userId === userDetails.userId)

            let isExistingUser: boolean = false;
            for (let index = 0; index < notificationSeenList.length; index++) {
                const element = notificationSeenList[index];
                updatedNotificationUserList[index] = element;
                if (element.userId && element.userId.toString() === loggedInUserId) {
                    // olderUserNotificationIndex = index;
                    if (!element.notificationIdList.includes(paramId)) {
                        updatedNotificationUserList[index] = {
                            userId: element.userId,
                            notificationIdList: [...element.notificationIdList, paramId]
                        };
                        updatedNotificationUserList[index] =
                            userNotificationObject(
                                element.userId,
                                [...element.notificationIdList, paramId]);
                    }
                    isExistingUser = true;
                }
            }
            if (!isExistingUser) {
                updatedNotificationUserList = [...updatedNotificationUserList,
                userNotificationObject(
                    loggedInUserId,
                    [paramId]
                )
                ]
            }
            dispatch(storeNotificationSeen([...updatedNotificationUserList]));
            // storeNotificationSeen()
        } else {
            // dispatch(storeNotificationSeen([readNotification]));
            dispatch(storeNotificationSeen([userNotificationObject(loggedInUserId, [paramId])]));
        }

    }, [])

    const handleSeeAll = () => {

    }
    const handleClosed = () => {
        console.log();

    }
    return (
        <SafeAreaView style={styles.dashboardContainer}>
            <HeadImageSection />
            <BtnFilterHeader
                firstBtnName='See All'
                fistBtnOnpress={handleSeeAll}
                //secondBtnName='Closed'
                secondBtnOnpress={handleClosed}
            />
            <Seperator24 />
            <NotificationDetails />
        </SafeAreaView>
    )
}

export default ShowTaskDetails