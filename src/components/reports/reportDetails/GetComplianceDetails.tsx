import GetCompliancesItemDetails from '@/src/server/api-functions/TaskDetails/get_compliances_item_details';
import { RootState } from '@/src/store';
import { CompliancesItemDetails, CompliancesItemDetailsPayLoad, CompliancesItemDetailsResponse } from '@/src/types';
import React, { useEffect, useState } from 'react'
import { Alert,ActivityIndicator  } from 'react-native';
import { useSelector } from 'react-redux';
import TaskItemDetails from '../../task/TaskItemDetails';
import CardSkelton from '../../skelton/CardSkelton';
import CustomeCard from '../../cards/CustomeCard';
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
        <CustomeCard>
            {loading ? (
                <ActivityIndicator size="large" color="#A097DC" />
            ) : (
                compliancesItemData?.title === null ? <CardSkelton /> :
                    <TaskItemDetails compliancesItemData={compliancesItemData} itemType='' />
            )}
        </CustomeCard>
    )
}

export default GetComplianceDetails