import ComplianceChartDataList from '@/assets/data/chartdataList'
import Button from '@/src/components/Button'
import CardContainer3 from '@/src/components/cards/CardContainer3'
import HeadImageSection from '@/src/components/headSection/HeadImageSection'
import Seperator48 from '@/src/components/seperators/Seperator48'
import BtnFilterHeader from '@/src/components/tabs/BtnFilterHeader'
import PendingTaskOverView from '@/src/components/task/pendingTask/PendingTaskOverView'
import { RootState } from '@/src/store'
import { screenHeight, styles } from '@/src/style'
import { LastActivityComment, PendingTaskItemDetailsResponse } from '@/src/types'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useSelector } from 'react-redux'
import ProofSection from '../../../components/task/pendingTask/ProofSection'

const PendingTaskOverViewPage = () => {
    const data = useLocalSearchParams();

    const { type, id } = data;
    const paramType = typeof type === 'string' ? type : type[0];
    const taskId = typeof id === 'string' ? id : id[0];
    const [selectedTaskId] = useState<string>(taskId);
    const [complianceId, setComplianceId] = useState<string>('');
    const [activeTab, setActiveTab] = useState('Overview'); // Track active tab state
    const [pendingTaskDetails, setPendingTaskDetails] = useState<PendingTaskItemDetailsResponse>({
        title: null,
        complianceId: null,
        description: null,
        lawName: null,
        lastActivity: {
            type: null,
            updateOn: null,
            updatedBy: null
        }
    });
    const [expandedTitle, setExpandedTitle] = useState(false)

    const pendingTaskList = ComplianceChartDataList;


    const GetPendingTaskDetails = (taskId: string) => { // Change this to async function for api call
        const selectedTask = pendingTaskList.aaData.filter(({ taskId }) => taskId.toString() === selectedTaskId)[0];
        return selectedTask
    }
    const setTaskDetails = (selectedTaskId: string) => {
        const taskDetails = GetPendingTaskDetails(selectedTaskId);
        console.log('taskDetailssdfasdas', taskDetails);

        const { title, description, nameOfLaw, complianceId, activities } = taskDetails;
        setPendingTaskDetails({
            title: title,
            description: description,
            complianceId: complianceId.toString(),
            lawName: nameOfLaw,
            lastActivity: activities[activities.length - 1]
        })

    }


    useEffect(() => {
        setTaskDetails(selectedTaskId);

        console.log('Comments from Redux:', comments);
        const filteredComments = comments.filter(comment => comment[0].taskID?.toString() === selectedTaskId);
        console.log("filteredComments", filteredComments);

        if (filteredComments.length != 0) {

            setCommentText(filteredComments[0][0].commentText);
        }
        console.log('selectedTaskId', selectedTaskId);

    }, [selectedTaskId]);
    const handlePressOnOverview = () => {
        setActiveTab('Overview'); // Set active tab to 'Overview'
    }

    const handlePressOnProofs = () => {
        setActiveTab('Proofs'); // Set active tab to 'Proofs'
    }

    const lastActivitycomments: LastActivityComment[] = [
        {
            comment: ' sdlkfj lksasdlkj lksd sadf ',
            updatedOn: '10/02/2222'
        },
        {
            comment: ' sdlkfj lksasdlkj lksd sadf ',
            updatedOn: '10/02/2222'
        },
        {
            comment: ' sdlkfj lksasdlkj lksd sadf ',
            updatedOn: '10/02/2222'
        },
    ]
    const [commentText, setCommentText] = useState<string>("");
    const [taskid, setTaskId] = useState(303)
    const comments = useSelector((state: RootState) => state.comments.commentsList);


    return (

        <ScrollView>
            <CardContainer3 styles={{
                backgroundColor: '#FFFFFF',
                minHeight: screenHeight,
                justifyContent: 'space-between'
            }}>

                <View>

                    <HeadImageSection />
                    <BtnFilterHeader
                        firstBtnName='Overview'
                        fistBtnOnpress={handlePressOnOverview}
                        secondBtnName='Proofs'
                        secondBtnOnpress={handlePressOnProofs}
                    />
                    <Seperator48 />
                    {activeTab === 'Overview' && (
                        <PendingTaskOverView
                            pendingTaskDetails={pendingTaskDetails}
                            lastActivitycomments={lastActivitycomments}
                            commentText={commentText}
                            setCommentText={setCommentText}
                        />
                    )}
                    {activeTab === 'Proofs' && (
                        <ProofSection />

                    )}
                </View>
                {/* <Seperator14 /> */}
                <View style={styles.pendingTaskOverViewSubmit}>
                    <Button
                        btnColor={'#A097DC'}
                        text='Reassign'
                        leftIcon='account-multiple-plus'
                        // type='md-default'
                        type='md-outline'
                    // onPress={handleSubmitSignIn}
                    />
                    <Button
                        btnColor={'#A097DC'}
                        text='Save'
                        leftIcon='content-save'
                        type='md-default'
                    // onPress={handleSubmitSignIn}
                    />
                    <Button
                        btnColor={'#42C997'}
                        text='Complete'
                        leftIcon='checkbox-marked-circle-plus-outline'
                        type='md-default'
                    // onPress={handleSubmitSignIn}
                    />
                </View>


            </CardContainer3>
        </ScrollView>

    )
}

export default PendingTaskOverViewPage