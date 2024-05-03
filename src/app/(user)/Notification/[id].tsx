import React, { useState } from 'react'
import NotificationDetails from '@/src/components/NotificationDetails';
import HeadImageSection from '@/src/components/headSection/HeadImageSection';
import Seperator24 from '@/src/components/seperators/Seperator24';
import BtnFilterHeader from '@/src/components/tabs/BtnFilterHeader';
import { styles } from '@/src/style';
import { View, Text, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const ShowTaskDetails = () => {
    const data = useLocalSearchParams();
    const { type, id } = data;
    const paramType = typeof type === 'string' ? type : type[0];
    const paramId = typeof id === 'string' ? id : id[0];
    // const paramTaskId = typeof taskId === 'string' ? taskId : taskId[0];
    // const [taskType, setTaskType] = useState<string>(paramType);
    // const [complianceId, setComplianceId] = useState<string>('');
    

    const handleSeeAll = () => {

    }
    const handleClosed = () => {

    }
    return (
        <SafeAreaView style={styles.dashboardContainer}>
            <HeadImageSection />
            <BtnFilterHeader
                firstBtnName='See All'
                fistBtnOnpress={handleSeeAll}
                secondBtnName='Closed'
                secondBtnOnpress={handleClosed}
            />
            <Seperator24 />
            <NotificationDetails />
        </SafeAreaView>
    )
}

export default ShowTaskDetails