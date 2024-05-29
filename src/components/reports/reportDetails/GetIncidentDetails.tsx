import CustomeCard from '@/src/components/cards/CustomeCard';
import CardSkelton from '@/src/components/skelton/CardSkelton';
import IncidentTaskItemDetails from '@/src/components/task/IncidentTaskItemDetails';
import GetIncidentTaskDataDetails from '@/src/server/api-functions/MapDetails/get-incident-task-data-details';
import { RootState } from '@/src/store';
import { DefaultIncidentItemDetailsResponse, IncidentItemDetailsPayLoad, IncidentItemDetailsResponse } from '@/src/types';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';

interface IncidentDetailsProps {
    incidentId: string
    taskId: number
}

const GetIncidentDetails = ({ incidentId, taskId }: IncidentDetailsProps) => {
    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const [incidentItemData, setIncidentItemData] = useState<IncidentItemDetailsResponse>(DefaultIncidentItemDetailsResponse);
    const handleGetIncidentTaskDetailsData = async () => {

        const payLoad: IncidentItemDetailsPayLoad = {
            ...useCredential,
            incidentMapId: incidentId,
            taskId: taskId

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
        <CustomeCard>
            {
                incidentItemData?.mapId === null ? <CardSkelton /> :
                    <IncidentTaskItemDetails incidentItemData={incidentItemData} itemType='' />
            }
        </CustomeCard>
    )
}

export default GetIncidentDetails