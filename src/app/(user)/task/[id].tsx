import ComplianceChartDataList from '@/assets/data/chartdataList'
import Button from '@/src/components/Button'
import CardContainer3 from '@/src/components/cards/CardContainer3'
import HeadImageSection from '@/src/components/headSection/HeadImageSection'
import Seperator48 from '@/src/components/seperators/Seperator48'
import BtnFilterHeader from '@/src/components/tabs/BtnFilterHeader'
import PendingTaskOverView from '@/src/components/task/pendingTask/PendingTaskOverView'
import ProofSection from '@/src/components/task/pendingTask/ProofSection'
import { RootState } from '@/src/store'
import { screenHeight, styles } from '@/src/style'
import { LastActivityComment, PendingTaskItemDetailsResponse } from '@/src/types'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, View } from 'react-native'
import { useSelector } from 'react-redux'

const PendingTaskOverViewPage = () => {
    const data = useLocalSearchParams();
    const { id } = data;
    const compliance_id = typeof data.compliance_id === 'string' ? data.compliance_id : null;
    const task_id = typeof data.task_id === 'string' ? data.task_id : null;    
    const task_desc= typeof data.task_desc === 'string' ? data.task_desc : null; 
    const name_of_law= typeof data.name_of_law === 'string' ? data.name_of_law : null;
    const task_name= typeof data.task_name === 'string' ? data.task_name : null;
    const map_id= typeof data.map_id === 'string' ? data.map_id : null;

    // const taskId = typeof id === 'string' ? id : id[0];
    const [selectedTaskId] = useState<string>(task_id??"");
    const [activeTab, setActiveTab] = useState('Overview'); // Track active tab state
    const [pendingTaskDetails, setPendingTaskDetails] = useState<PendingTaskItemDetailsResponse>({
        // title: null,
        // complianceId: null,
        // description: null,
        // lawName: null,
        // lastActivity: {
        //     type: null,
        //     updateOn: null,
        //     updatedBy: null
        // }
          
        compliance_id: null ,
        task_desc: null,
        name_of_law: null,
        map_id: null,
        task_name:null,
        task_id: null
    });


    const pendingTaskList = ComplianceChartDataList;


    const GetPendingTaskDetails = (taskId: string) => { // Change this to async function for api call
        const selectedTask = pendingTaskList.aaData.filter(({ taskId }) => taskId.toString() === selectedTaskId)[0];
        return selectedTask
    }
    const setTaskDetails = (selectedTaskId: string) => {
        const taskDetails = GetPendingTaskDetails(selectedTaskId);
        // const { title, description, nameOfLaw, complianceId, activities } = taskDetails;
        setPendingTaskDetails({
            // title: title,
            // description: description,
            // complianceId: complianceId.toString(),
            // lawName: nameOfLaw,
            // lastActivity: activities[activities.length - 1]
            task_id: task_id ,           
            task_desc: task_desc,
            compliance_id:  compliance_id ,
            name_of_law: name_of_law ,
            task_name: task_name ,
            map_id: map_id ,
        })

    }


    useEffect(() => {
        setTaskDetails(selectedTaskId);
        const filteredComments = comments.filter(comment => comment[0].taskID?.toString() === selectedTaskId);
        if (filteredComments.length != 0) {

            setCommentText(filteredComments[0][0].commentText);
        }
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

    const comments = useSelector((state: RootState) => state.comments.commentsList);
    const [shortDescription, setShortDescription] = useState<string>("");


    return (

        <CardContainer3 styles={{
            backgroundColor: '#FFFFFF',
            flex: 1,
        }}>

            {activeTab === 'Overview' && (
                <KeyboardAvoidingView behavior="padding">
                    <ScrollView>
                        <HeadImageSection />
                        <BtnFilterHeader
                            firstBtnName='Overview'
                            fistBtnOnpress={handlePressOnOverview}
                            secondBtnName='Proofs'
                            secondBtnOnpress={handlePressOnProofs}
                        />
                        <Seperator48 />
                        <PendingTaskOverView
                            pendingTaskDetails={pendingTaskDetails}
                           // lastActivitycomments={lastActivitycomments}
                            commentText={commentText}
                            setCommentText={setCommentText}
                            setShortDescription={setShortDescription}
                            shortDescription={shortDescription}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
            )}
            {activeTab === 'Proofs' && (
                <View>
                    <HeadImageSection />
                    <BtnFilterHeader
                        firstBtnName='Overview'
                        fistBtnOnpress={handlePressOnOverview}
                        secondBtnName='Proofs'
                        secondBtnOnpress={handlePressOnProofs}
                    />
                    <Seperator48 />
                    <ProofSection />

                </View>
            )}
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
        /* </ScrollView> */

    )
}

export default PendingTaskOverViewPage