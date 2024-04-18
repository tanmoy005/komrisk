import CardContainer from '@/src/components/cards/CardContainer';
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native';
import GetComplianceDetails from '@/src/components/reports/reportDetails/GetComplianceDetails';
import GetIncidentDetails from '@/src/components/reports/reportDetails/GetIncidentDetails';

const ShowDetailsReport = () => {

    const { type, id, taskId } = useLocalSearchParams();
    console.log("typeString", type);
    console.log("typeString", id);

    // const({typeString})=item
    const paramType = typeof type === 'string' ? type : type[0];
    const paramId = typeof id === 'string' ? id : id[0];
    const paramTaskId = typeof taskId === 'string' ? taskId : taskId[0];
    const [taskType, setTaskType] = useState<string>(paramType);
    const [complianceId, setComplianceId] = useState<string>('');
    const [incidentId, setIncidentId] = useState<string>('');
    const [incedentTaskId, setIncedentTaskId] = useState<number>(0);

    useEffect(() => {
        if (taskType?.trim() == 'COMPLIANCE') {
            setComplianceId(paramId)
        }

        if (taskType == 'INCIDENT') {
            setIncidentId(paramId);
            setIncedentTaskId(parseFloat(paramTaskId));
        }
    }, [taskType]);




    return (
        <ScrollView>
            <CardContainer>
                <View>
                    {
                        taskType == 'COMPLIANCE' ?
                            <GetComplianceDetails complianceId={complianceId} />
                            : taskType === "INCIDENT" ?
                                <GetIncidentDetails taskId={incedentTaskId} incidentId={incidentId} /> : null
                    }

                </View>

            </CardContainer>
        </ScrollView>
    )
}

export default ShowDetailsReport