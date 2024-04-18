import CardContainer from '@/src/components/cards/CardContainer';
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native';
import GetComplianceDetails from '@/src/components/reports/reportDetails/GetComplianceDetails';
import GetIncidentDetails from '@/src/components/reports/reportDetails/GetIncidentDetails';

const ShowDetailsReport = () => {

    const { id: typeString } = useLocalSearchParams();
    const paramArray = typeof typeString === 'string' ? typeString.split(',') : typeString[0];
    const taskTypeData = paramArray && paramArray[0];

    const [taskType, setTaskType] = useState<string>(taskTypeData);
    const [complianceId, setComplianceId] = useState<string>('');
    const [incidentId, setIncidentId] = useState<string>('');
    const [taskId, setTaskId] = useState<number>(0);

    console.log('====================================');
    console.log("param", typeString);
    console.log('====================================');

    console.log('================================', paramArray);

    useEffect(() => {
        if (taskType === 'COMPLIANCE') {
            setComplianceId(paramArray[1])
            console.log("complianceId", complianceId);
        }
        if (taskType === 'INCIDENT') {
            setIncidentId(paramArray[1]);
            setTaskId(parseFloat(paramArray[2]));
        }
    }, [taskType]);




    return (
        <ScrollView>
            <CardContainer>
                <View>
                    {
                        taskTypeData == "COMPLIANCE" ?
                            <GetComplianceDetails complianceId={complianceId} />
                            : taskType == "INCIDENT" ?
                                <GetIncidentDetails taskId={taskId} incidentId={incidentId} /> : null
                    }

                </View>

            </CardContainer>
        </ScrollView>
    )
}

export default ShowDetailsReport