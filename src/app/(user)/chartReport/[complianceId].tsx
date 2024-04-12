import TaskItemDetails from '@/src/components/task/TaskItemDetails';
import CardContainer from '@/src/components/cards/CardContainer';
import CardContainer2 from '@/src/components/cards/CardContainer2';
import CustomeCard from '@/src/components/cards/CustomeCard';
import CardSkelton from '@/src/components/skelton/CardSkelton';
import GetCompliancesItemDetails from '@/src/server/api-functions/get_compliances_item_details';
import { RootState } from '@/src/store/rootReducer';
import { styles } from '@/src/style';
import { ChartListDataItem, CompliancesItemDetails, CompliancesItemDetailsPayLoad, CompliancesItemDetailsResponse, defaultChartData } from '@/src/types';
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

const ShowDetailsReport = () => {


    const { complianceId: idString } = useLocalSearchParams();
    const complianceId = typeof idString === 'string' ? idString : idString[0];
    console.log('====================================complianceId');
    console.log(complianceId);
    console.log('====================================');

    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const [compliancesItemData, setCompliancesItemData] = useState<CompliancesItemDetailsResponse>(CompliancesItemDetails);

    const handleGetCompliancesDetailsData = async () => {

        const payLoad: CompliancesItemDetailsPayLoad = {
            ...useCredential,
            complianceId: complianceId,

        }

        const { data, error, status } = await GetCompliancesItemDetails(payLoad);
        if (status === 200) {
            // const { chartData } = data;
            console.log("Data", data);

            setCompliancesItemData(data);
        } else {
            Alert.alert("error", error.message);
        }

    }
    useEffect(() => {
        handleGetCompliancesDetailsData();
    }, [complianceId]);


    return (
        <ScrollView>
            <CardContainer>
                <CustomeCard>
                    {
                        compliancesItemData?.complianceId === null ? <CardSkelton /> :
                            <TaskItemDetails compliancesItemData={compliancesItemData} itemType='' />
                    }
                </CustomeCard>
            </CardContainer>
        </ScrollView>
    )
}

export default ShowDetailsReport