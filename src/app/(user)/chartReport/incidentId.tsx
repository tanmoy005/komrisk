import CardContainer from '@/src/components/cards/CardContainer';
import CustomeCard from '@/src/components/cards/CustomeCard';
import CardSkelton from '@/src/components/skelton/CardSkelton';
import { RootState } from '@/src/store/rootReducer';
import { DefaultIncidentItemDetailsResponse, IncidentItemDetailsPayLoad, IncidentItemDetailsResponse } from '@/src/types';
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import IncidentTaskItemDetails from '@/src/components/task/IncidentTaskItemDetails';
import GetIncidentTaskDataDetails from '@/src/server/api-functions/get-incident-task-data-details';

const ShowDetailsReport = () => {


    const { incidentId: idString } = useLocalSearchParams();
    console.log('====================================');
    console.log("incidentId",idString);
    console.log('====================================');
    const incidentId = typeof idString === 'string' ? idString : idString[0];
    const taskId = typeof idString === 'string' ? idString : idString[1];
    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const [incidentItemData, setIncidentItemData] = useState<IncidentItemDetailsResponse>(DefaultIncidentItemDetailsResponse);

    const handleGetIncidentTaskDetailsData = async () => {

        const payLoad: IncidentItemDetailsPayLoad = {
            ...useCredential,
            incidentMapId: incidentId,
            taskId: 0

        }

        const { data, error, status } = await GetIncidentTaskDataDetails(payLoad);
        if (status === 200) {
            setIncidentItemData(data);
        } else {
            Alert.alert("error", error.message);
        }

    }
    useEffect(() => {
        handleGetIncidentTaskDetailsData();
    }, [incidentId]);


    return (
        <ScrollView>
            <CardContainer>
                <CustomeCard>
                    {
                        incidentItemData?.mapId === null ? <CardSkelton /> :
                            <IncidentTaskItemDetails incidentItemData={incidentItemData} itemType='' />
                    }
                </CustomeCard>
            </CardContainer>
        </ScrollView>
    )
}

export default ShowDetailsReport