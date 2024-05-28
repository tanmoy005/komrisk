// import React, { useEffect, useState } from 'react'
// import NotificationDetails from '@/src/components/NotificationDetails';
// import HeadImageSection from '@/src/components/headSection/HeadImageSection';
// import Seperator24 from '@/src/components/seperators/Seperator24';
// import BtnFilterHeader from '@/src/components/tabs/BtnFilterHeader';
// import { styles } from '@/src/style';
// import { View, Text, SafeAreaView } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '@/src/store';
// import { storeNotificationSeen } from '@/src/store/slices/notification-seen-slice';
// import { notificationSeen } from '@/src/types';
// import { hasValue } from '@/src/utils';

// const userNotificationObject = (userId: string | null, notificationIdList: string[]): notificationSeen => {
//     return {
//         userId,
//         notificationIdList
//     }
// }

// const ShowTaskDetails = () => {
//     const data = useLocalSearchParams();
//     console.log("data ***",data);
    
//     const { type, id, } = data;
//     //const paramType = typeof type === 'string' ? type : type[0];
//     const paramType = typeof type === 'string' ? type : (Array.isArray(type) ? type[0] : '');
//     //const paramId = typeof id === 'string' ? id : id[0];
//     const paramId = typeof id === 'string' ? id : (Array.isArray(id) ? id[0] : '');
//     // const paramTaskId = typeof taskId === 'string' ? taskId : taskId[0];
//     // const [taskType, setTaskType] = useState<string>(paramType);
//     // const [complianceId, setComplianceId] = useState<string>('');

//     const notificationSeenList: notificationSeen[] | undefined = useSelector((state: RootState) => state.notificationSeen.payload);
//     const userDetails = useSelector((state: RootState) => state.authUserDetails.payload).userDetails;
//     const { username: loggedInUserId } = userDetails;

//     const dispatch = useDispatch();
//     useEffect(() => {

//         let updatedNotificationUserList: notificationSeen[] = [];
//         if (notificationSeenList && notificationSeenList.length > 0) {
//             // const existingUserHistory = notificationSeenList.filter(({ userId }) => userId === userDetails.userId)

//             let isExistingUser: boolean = false;
//             for (let index = 0; index < notificationSeenList.length; index++) {
//                 const element = notificationSeenList[index];
//                 updatedNotificationUserList[index] = element;
//                 if (element.userId && element.userId.toString() === loggedInUserId) {
//                     // olderUserNotificationIndex = index;
//                     if (!element.notificationIdList.includes(paramId)) {
//                         updatedNotificationUserList[index] = {
//                             userId: element.userId,
//                             notificationIdList: [...element.notificationIdList, paramId]
//                         };
//                         updatedNotificationUserList[index] =
//                             userNotificationObject(
//                                 element.userId,
//                                 [...element.notificationIdList, paramId]);
//                     }
//                     isExistingUser = true;
//                 }
//             }
//             if (!isExistingUser) {
//                 updatedNotificationUserList = [...updatedNotificationUserList,
//                 userNotificationObject(
//                     loggedInUserId,
//                     [paramId]
//                 )
//                 ]
//             }
//             dispatch(storeNotificationSeen([...updatedNotificationUserList]));
//             // storeNotificationSeen()
//         } else {
//             // dispatch(storeNotificationSeen([readNotification]));
//             dispatch(storeNotificationSeen([userNotificationObject(loggedInUserId, [paramId])]));
//         }

//     }, [])

//     const handleSeeAll = () => {

//     }
//     const handleClosed = () => {
//         console.log();

//     }
//     return (
//         <SafeAreaView style={styles.dashboardContainer}>
//             <HeadImageSection />
//             <BtnFilterHeader
//                 firstBtnName='See All'
//                 fistBtnOnpress={handleSeeAll}
//                 //secondBtnName='Closed'
//                 secondBtnOnpress={handleClosed}
//             />
//             <Seperator24 />
//             <NotificationDetails />
//         </SafeAreaView>
//     )
// }

// export default ShowTaskDetails


// ========================== Updated on 28-05-2024 ================================= //

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
import { NotificationItemDetailsResponse } from '@/src/types';

const userNotificationObject = (userId: string | null, notificationIdList: string[]): notificationSeen => {
    return {
        userId,
        notificationIdList
    }
}

const ShowTaskDetails = () => {
    const data = useLocalSearchParams();
    console.log("data ***",data);
    
    const { type, id,complianceId,complianceTitle,lawNames,newValue,updatedOn  } = data;
    const paramType = typeof type === 'string' ? type : (Array.isArray(type) ? type[0] : '');    
    const paramId = typeof id === 'string' ? id : (Array.isArray(id) ? id[0] : '');
    const compliance_id = typeof complianceId === 'string' ? complianceId : (Array.isArray(complianceId) ? complianceId[0] : '');
    const compliance_title = typeof complianceTitle === 'string' ? complianceTitle : (Array.isArray(complianceTitle) ? complianceTitle[0] : '');
    const name_of_law = typeof lawNames === 'string' ? lawNames : (Array.isArray(lawNames) ? lawNames[0] : '');
    const description = typeof newValue === 'string' ? newValue : (Array.isArray(newValue) ? newValue[0] : '');
    const notification_date = typeof updatedOn === 'string' ? updatedOn : (Array.isArray(updatedOn) ? updatedOn[0] : '');
    //console.log("Compliance id got",compliance_id);

    //const [selectedComplianceId] = useState<string>(paramId??"");
    


    const notificationSeenList: notificationSeen[] | undefined = useSelector((state: RootState) => state.notificationSeen.payload);
    const userDetails = useSelector((state: RootState) => state.authUserDetails.payload).userDetails;
    const { username: loggedInUserId } = userDetails;
    
    const [notificationDetails, setNotificationDetails] = useState<NotificationItemDetailsResponse>({

        compliance_title: null,
        compliance_id: null,
        description: null,
        name_of_law: null,
        paramId: null,
        notification_date: null
    });

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

    const setTaskDetails = (compliance_id: string) => {
        //const taskDetails = GetPendingTaskDetails(selectedTaskId);
        //const { title, description, nameOfLaw, complianceId, activities } = taskDetails;
        // const { title, description, nameOfLaw, complianceId, activities } = taskDetails;
        setNotificationDetails({

            compliance_title: compliance_title ,           
            description: description,
            compliance_id:  compliance_id ,
            name_of_law: name_of_law ,
            paramId: paramId ,
            notification_date: notification_date
        })

    }

    useEffect(() => {
        setTaskDetails(compliance_id);
    }, [compliance_id]);

    console.log("Notification",notificationDetails);
    

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
            <NotificationDetails notificationDetails ={notificationDetails} />
        </SafeAreaView>
    )
}

export default ShowTaskDetails