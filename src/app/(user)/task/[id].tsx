import ComplianceChartDataList from '@/assets/data/chartdataList'
import ChevronsAccordian from '@/src/components/accordians/ChevronsAccordian'
import ChevronsAccordian2 from '@/src/components/accordians/ChevronsAccordian2'
import CardContainer from '@/src/components/cards/CardContainer'
import CardContainer2 from '@/src/components/cards/CardContainer2'
import CardContainer3 from '@/src/components/cards/CardContainer3'
import TaskCard from '@/src/components/cards/TaskCard'
import HeadImageSection from '@/src/components/headSection/HeadImageSection'
import { SmallHeading } from '@/src/components/headings/SmallHeading'
import Seperator14 from '@/src/components/seperators/Seperator14'
import Seperator48 from '@/src/components/seperators/Seperator48'
import BtnFilterHeader from '@/src/components/tabs/BtnFilterHeader'
import PendingTaskAccordianBody from '@/src/components/task/PendingTaskAccordianBody'
import { screenHeight } from '@/src/style'
import { PendingTaskItemDetailsResponse } from '@/src/types'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'

const PendingTaskOverViewPage = () => {
    const data = useLocalSearchParams();

    const { type, id } = data;
    const paramType = typeof type === 'string' ? type : type[0];
    const taskId = typeof id === 'string' ? id : id[0];
    const [selectedTaskId] = useState<string>(taskId);
    const [complianceId, setComplianceId] = useState<string>('');
    const [pendingTaskDetails, setPendingTaskDetails] = useState<PendingTaskItemDetailsResponse>({
        title: null,
        complianceId: null,
        description: null,
        lawName: null
    });
    const [expandedTitle, setExpandedTitle] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const pendingTaskList = ComplianceChartDataList;


    const GetPendingTaskDetails = (taskId: string) => { // Change this to async function for api call
        const selectedTask = pendingTaskList.aaData.filter(({ taskId }) => taskId.toString() === selectedTaskId)[0];
        return selectedTask
    }
    const setTaskDetails = (selectedTaskId: string) => {
        const taskDetails = GetPendingTaskDetails(selectedTaskId);
        console.log('taskDetailssdfasdas', taskDetails);

        const { title, description, nameOfLaw, complianceId } = taskDetails;
        setPendingTaskDetails({
            title: title,
            description: description,
            complianceId: complianceId.toString(),
            lawName: nameOfLaw
        })

    }

    useEffect(() => {
        setTaskDetails(selectedTaskId);
    }, [selectedTaskId]);
    const handlePressOnOverview = () => {

    }
    const handlePressOnProofs = () => {

    }
    // {
    //     title: string | null;
    //     complianceId: string | null;
    //     section: string | null;
    //     description: string | null;
    //     lawName: string | null;
    //   }
    return (
        <CardContainer3 styles={{
            backgroundColor: '#FFFFFF',
            minHeight: screenHeight
        }}>
            <HeadImageSection />
            <BtnFilterHeader
                firstBtnName='Overview'
                fistBtnOnpress={handlePressOnOverview}
                secondBtnName='Proofs'
                secondBtnOnpress={handlePressOnProofs}
            />
            <Seperator48 />
            <CardContainer>
                <SmallHeading>Task Details</SmallHeading>
                <ChevronsAccordian2
                    title={pendingTaskDetails.title}
                    descriptions={pendingTaskDetails.description}
                >
                    <PendingTaskAccordianBody
                        pendingTaskDetails={pendingTaskDetails}
                    />
                </ChevronsAccordian2>
            </CardContainer>
            {/* <ChevronsAccordian2></ChevronsAccordian2> */}
            {/* <ChevronsAccordian
                title={pendingTaskDetails.title}
                descriptions={pendingTaskDetails.description}
                expanded = {expandedTitle}
                setExpanded={setExpandedTitle}

            >
                <PendingTaskAccordianBody
                    pendingTaskDetails={pendingTaskDetails}
                />
            </ChevronsAccordian> */}
            <Seperator14 />
            {/* <ChevronsAccordian
                title={pendingTaskDetails.title}
                descriptions={pendingTaskDetails.description}
                expanded = {expanded}
                setExpanded={setExpanded}

            >
                <PendingTaskAccordianBody
                    pendingTaskDetails={pendingTaskDetails}
                />
            </ChevronsAccordian> */}
            {/* <ChevronsAccordian
                title='Title'
                descriptions={pendingTaskDetails.description}
            >
                <PendingTaskAccordianBody
                    pendingTaskDetails={pendingTaskDetails}
                />
            </ChevronsAccordian> */}

            {/* <ChevronsAccordian
                title='Title'
                descriptions='fsdj ksdfkl sdjf asjf lks afkla fj'
            >
                <PendingTaskAccordianBody
                    pendingTaskDetails={pendingTaskDetails}
                />
            </ChevronsAccordian> */}
        </CardContainer3>
    )
}

export default PendingTaskOverViewPage