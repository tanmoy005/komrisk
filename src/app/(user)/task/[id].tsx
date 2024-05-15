
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
import { KeyboardAvoidingView, ScrollView, View, Alert,ActivityIndicator  } from 'react-native'
import { useSelector } from 'react-redux'
import GetCompliancesItemDetails from '@/src/server/api-functions/TaskDetails/get_compliances_item_details'
import { CompliancesItemDetailsPayLoad } from '@/src/types'
import { CompleteTaskPayload, RequestAssignPayload } from '@/src/types'
import GetCompleteTaskData from '@/src/server/api-functions/Tasks/get-complete-task-message'
import GetRequestAssignData from '@/src/server/api-functions/Tasks/get-request-assign-message'
import ReassignModal from './ReassignModal'
import { useNavigation } from '@react-navigation/native';
import PendingTaskPage from './pendingTaskPage'
import { Link, router } from "expo-router";

const PendingTaskOverViewPage = () => {
    const data = useLocalSearchParams();
    const navigation = useNavigation();
    const [loading, setLoading] = useState<boolean>(true);
    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    //console.log("data got", data);
    const task_type = typeof data.task_type === 'string' ? data.task_type : null;
    const compliance_id = typeof data.compliance_id === 'string' ? data.compliance_id : null;
    const task_id = typeof data.task_id === 'string' ? data.task_id : null;
    const map_id = typeof data.map_id === 'string' ? data.map_id : null;


    const [selectedTaskId] = useState<string>(task_id ?? "");
    const [showModal, setShowModal] = useState(false);

    const [activeTab, setActiveTab] = useState('Overview'); // Track active tab state
    const [pendingTaskDetails, setPendingTaskDetails] = useState<PendingTaskItemDetailsResponse>({

        taskType: null,
        compliance_id: null,
        task_desc: null,
        name_of_law: null,
        map_id: null,
        task_name: null,
        task_id: null
    });

    const payLoad: CompliancesItemDetailsPayLoad = {
        ...useCredential,
        complianceId: compliance_id,
    }


    const setTaskDetails = async (compliance_id: string | null) => {

        setLoading(true);

        const { data, error, status } = await GetCompliancesItemDetails(payLoad);

        //console.log("taskDetails", data);

        setLoading(false);

        if (status === 200) {
            setPendingTaskDetails({

                taskType: task_type,
                task_id: task_id,
                task_desc: data.description,
                compliance_id: compliance_id,
                name_of_law: data.lawName,
                task_name: data.title,
                map_id: map_id,
            })
        } else {
            Alert.alert("error", error.message);
        }

    }
    useEffect(() => {
        setTaskDetails(compliance_id);
    }, [compliance_id]);



    useEffect(() => {
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
    const [commentText, setCommentText] = useState<string | null>("");

    const comments = useSelector((state: RootState) => state.comments.commentsList);
    const [shortDescription, setShortDescription] = useState<string>("");

    const savepayload: CompleteTaskPayload = {
        taskType: pendingTaskDetails.taskType,
        taskId: pendingTaskDetails.task_id,
        taskComments: commentText,
        taskAction: "save",
    };

    const reassignpayload: RequestAssignPayload = {

        taskId: pendingTaskDetails.task_id,
        mapId: pendingTaskDetails.map_id,
        reason: " "

    };

    const completepayload: CompleteTaskPayload = {
        taskType: pendingTaskDetails.taskType,
        taskId: pendingTaskDetails.task_id,
        taskComments: commentText,
        taskAction: "complete",
    };

    const approvepayload: CompleteTaskPayload = {
        taskType: pendingTaskDetails.taskType,
        taskId: pendingTaskDetails.task_id,
        taskComments: commentText,
        taskAction: "approve",
    };

    const rejectpayload: CompleteTaskPayload = {
        taskType: pendingTaskDetails.taskType,
        taskId: pendingTaskDetails.task_id,
        taskComments: commentText,
        taskAction: "reject",
    };

    const handleSave = async () => {
        const { data, error, status } = await GetCompleteTaskData(savepayload);
        if (status === 200) {
            Alert.alert("Success", "Task details saved successfully");
        } else {
            Alert.alert("error", error.message);
        }
    }

    const handleRequestReassign = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false); // Assuming setShowModal is a function to control the modal visibility
    };

    const handleModalSave = async (reason:string) => {
        // Update reassignpayload with the reason
        reassignpayload.reason = reason;
        //console.log("reassignpayload",reassignpayload);
        
        const { data, error, status } = await GetRequestAssignData(reassignpayload);
            if (status === 200) {
                Alert.alert("Success", "Task reassigned successfully");
            } else {
                Alert.alert("error", error.message);
            }
        
        setShowModal(false);
       
    };

    const handleComplete = async () => {
        const { data, error, status } = await GetCompleteTaskData(completepayload);
        if (status === 200) {
            Alert.alert("Success", "Task details completed successfully", [
                {
                    text: "OK",
                    onPress: () => router.navigate('/(user)/task/pendingTaskPage')
                }
            ]);
        } else {
            Alert.alert("Error", error.message);
        }
    }
    


    const handleApprove = async () => {
        const { data, error, status } = await GetCompleteTaskData(approvepayload);
        if (status === 200) {
            Alert.alert("Success", "Task approved successfully");
        } else {
            Alert.alert("error", error.message);
        }
    }

    const handleReject = async () => {
        const { data, error, status } = await GetCompleteTaskData(rejectpayload);
        if (status === 200) {
            Alert.alert("Success", "Task rejected");
        } else {
            Alert.alert("error", error.message);
        }
    }



    return (

        <CardContainer3 styles={{
            backgroundColor: '#FFFFFF',
            flex: 1,
        }}>

            {task_type === 'OwnerTask' && (
                <>
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
                            type='md-outline'
                            onPress={handleRequestReassign}
                        />
                        <Button
                            btnColor={'#A097DC'}
                            text='Save'
                            leftIcon='content-save'
                            type='md-default'
                            onPress={handleSave}
                        />
                        <Button
                            btnColor={'#42C997'}
                            text='Complete'
                            leftIcon='checkbox-marked-circle-plus-outline'
                            type='md-default'
                            onPress={handleComplete}
                        />
                    </View>
                    <ReassignModal visible={showModal} onSave={handleModalSave} onClose={handleCloseModal} />

                </>
            )}

            {task_type === 'ReviewerTask' && (
                <>
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
                            text='Approve'
                            leftIcon='account-multiple-plus'
                            type='md-outline'
                            onPress={handleApprove}
                        />
                        <Button
                            btnColor={'#A097DC'}
                            text='Reject'
                            leftIcon='content-save'
                            //type='md-default'
                            type='md-outline'
                            onPress={handleReject}
                        />

                    </View>
                </>
            )}


        </CardContainer3>
        /* </ScrollView> */

    )
}

export default PendingTaskOverViewPage



