import GetCompliancesItemDetails from '@/src/server/api-functions/TaskDetails/get_compliances_item_details';
import { RootState } from '@/src/store';
import { CompliancesItemDetails, CompliancesItemDetailsPayLoad, CompliancesItemDetailsResponse } from '@/src/types';
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import TaskItemDetails from '../../task/TaskItemDetails';
import CardSkelton from '../../skelton/CardSkelton';
import CustomeCard from '../../cards/CustomeCard';
interface ComplianceDetailsProps {
    complianceId: string
}
const GetComplianceDetails = ({ complianceId }: ComplianceDetailsProps) => {
    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const [compliancesItemData, setCompliancesItemData] = useState<CompliancesItemDetailsResponse>(CompliancesItemDetails);

    const handleGetCompliancesDetailsData = async () => {

        const payLoad: CompliancesItemDetailsPayLoad = {
            ...useCredential,
            complianceId: complianceId,
        }

        const { data, error, status } = await GetCompliancesItemDetails(payLoad);
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
            {
                compliancesItemData?.title === null ? <CardSkelton /> :
                    <TaskItemDetails compliancesItemData={compliancesItemData} itemType='' />
            }
        </CustomeCard>
    )
}

export default GetComplianceDetails