import CustomeCard from '@/src/components/cards/CustomeCard';
import CardSkelton from '@/src/components/skelton/CardSkelton';
import TaskItemDetails from '@/src/components/task/TaskItemDetails';
import GetCompliancesItemDetails from '@/src/server/api-functions/TaskDetails/get_compliances_item_details';
import { RootState } from '@/src/store';
import { CompliancesItemDetails, CompliancesItemDetailsPayLoad, CompliancesItemDetailsResponse } from '@/src/types';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useSelector } from 'react-redux';

interface ComplianceDetailsProps {
    complianceId: string | null
}
const GetComplianceDetails = ({ complianceId }: ComplianceDetailsProps) => {
    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const [compliancesItemData, setCompliancesItemData] = useState<CompliancesItemDetailsResponse>(CompliancesItemDetails);
    const [loading, setLoading] = useState<boolean>(true);


    const handleGetCompliancesDetailsData = async () => {

        setLoading(true);

        const payLoad: CompliancesItemDetailsPayLoad = {
            ...useCredential,
            complianceId: complianceId,
        }

        const { data, error, status } = await GetCompliancesItemDetails(payLoad);

        setLoading(false);
        if (status === 200) {
            setCompliancesItemData(data);
        } else {
            Alert.alert("error", error.message);
        }

    }
    useEffect(() => {
        handleGetCompliancesDetailsData();
    }, [complianceId]);


    return (
        <>
            {loading ? (
                <ActivityIndicator size="large" color="#A097DC" />
            ) : (
                <CustomeCard>
                    {
                        compliancesItemData?.title === null ? <CardSkelton /> :
                            <TaskItemDetails compliancesItemData={compliancesItemData} itemType='' />
                    }
                </CustomeCard>
            )}
        </>
    )
}

export default GetComplianceDetails