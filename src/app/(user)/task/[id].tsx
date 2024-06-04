
import Button from '@/src/components/Button'
import CardContainer3 from '@/src/components/cards/CardContainer3'
import HeadImageSection from '@/src/components/headSection/HeadImageSection'
import Seperator48 from '@/src/components/seperators/Seperator48'
import BtnFilterHeader from '@/src/components/tabs/BtnFilterHeader'
import PendingTaskOverView from '@/src/components/task/pendingTask/PendingTaskOverView'
import ProofSection from '@/src/components/task/pendingTask/ProofSection'
import GetCompliancesItemDetails from '@/src/server/api-functions/TaskDetails/get_compliances_item_details'
import GetCompleteTaskData from '@/src/server/api-functions/Tasks/get-complete-task-message'
import GetRequestAssignData from '@/src/server/api-functions/Tasks/get-request-assign-message'
import SaveUploadProof from '@/src/server/api-functions/Tasks/save-upload-proof'
import { RootState } from '@/src/store'
import { styles } from '@/src/style'
import { CompleteTaskPayload, CompliancesItemDetailsPayLoad, PendingTaskItemDetailsResponse, RequestAssignPayload } from '@/src/types'
import { useNavigation } from '@react-navigation/native'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { useSelector } from 'react-redux'
import ReassignModal from '@/src/app/(user)/task/ReassignModal'
import { useDispatch } from 'react-redux';
import { removeComment } from '@/src/store/slices/task-comments-slice'
import { hasValue } from '@/src/utils'

const PendingTaskOverViewPage = () => {
    const data = useLocalSearchParams();
    const navigation = useNavigation();
    const [loading, setLoading] = useState<boolean>(true);
    const useCredential = useSelector((state: RootState) => state.authUserCred.payload);
    const task_type = typeof data.task_type === 'string' ? data.task_type : null;
    const compliance_id = typeof data.compliance_id === 'string' ? data.compliance_id : null;
    const task_id = typeof data.task_id === 'string' ? data.task_id : null;
    const map_id = typeof data.map_id === 'string' ? data.map_id : null;
    const [selectedImages, setSelectedImages] = useState<{ uri: string, fileName: string | null | undefined, type: string | null | undefined }[]>([]);
    const [selectedTaskId] = useState<string>(task_id ?? "");
    const [showModal, setShowModal] = useState(false);
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const dispatch = useDispatch();



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


    const [commentText, setCommentText] = useState<string | null>("");

    const comments = useSelector((state: RootState) => state.comments.commentsList);
    const taskid = pendingTaskDetails.task_id
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

    // const approvepayload: CompleteTaskPayload = {
    //     taskType: pendingTaskDetails.taskType,
    //     taskId: pendingTaskDetails.task_id,
    //     taskComments: commentText,
    //     taskAction: "approve",
    // };

    // const rejectpayload: CompleteTaskPayload = {
    //     taskType: pendingTaskDetails.taskType,
    //     taskId: pendingTaskDetails.task_id,
    //     taskComments: commentText,
    //     taskAction: "reject",
    // };


    const approvepayload: CompleteTaskPayload = {
        taskType: pendingTaskDetails.taskType,
        taskId: pendingTaskDetails.task_id,
        taskComments: " ",
        taskAction: "approve",
    };

    const rejectpayload: CompleteTaskPayload = {
        taskType: pendingTaskDetails.taskType,
        taskId: pendingTaskDetails.task_id,
        taskComments: " ",
        taskAction: "reject",
    };



    const saveUploadFile = async () => {
        if (selectedImages.length === 0) {
            // Handle case where no file is selected
            return false;
        }
        const file = selectedImages[0];
        const fileExtension = file.fileName?.split('.').pop() ?? 'pdf'; // Default to 'pdf' if extension cannot be determined
        const formData = new FormData();
        formData.append('file', {
            uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''), // Adjust uri for Android
            name: file.fileName ?? `filename.${fileExtension}`, // Use fileName from selectedImages or a default name
            type: file.type ?? `application/${fileExtension === 'pdf' ? 'pdf' : 'octet-stream'}`, // Use type from selectedImages or a default type
        } as any); // Use `as any` to bypass type checking

        formData.append('objectId', pendingTaskDetails.task_id ?? '');
        formData.append('objectType', 'COMPLIANCE_PROOF');
        formData.append('mapId', pendingTaskDetails.map_id ?? '');
        formData.append('fileName', file.fileName?.replace(/\.[^/.]+$/, '') ?? ''); // Remove extension
        formData.append('fileNameWithExt', file.fileName ?? '');
        formData.append('docTitle', file.fileName ?? '');
        formData.append('extension', fileExtension ?? '');
        try {
            const response = await SaveUploadProof(formData);

            if (response.status === 200) {
                // Handle successful upload
                return new Promise((resolve) => {
                    Alert.alert('Success', 'File uploaded successfully', [
                        { text: 'OK', onPress: () => resolve(true) }
                    ]);
                });
            } else {
                // Handle upload failure
                Alert.alert('Failed to upload file', response.error);
                return false;
            }
        } catch (error) {
            Alert.alert('Error uploading file:');
            return false;
        }
    };

    const handleSave = async () => {
        try {
            const { data, error, status } = await GetCompleteTaskData(savepayload);
            return { status, error };
        } catch (error) {
            return { status: 500, error: { message: 'An unexpected error occurred' } };
        }
    };

    const handleFinalSave = async () => {
        try {
            // Check if taskComments is an empty string
            if (!savepayload.taskComments || savepayload.taskComments.trim() === '') {
                // Navigate to the overview tab (replace 'OverviewTab' with the actual name of your overview tab)
                handlePressOnOverview();

                // Show an alert asking the user to provide comments
                Alert.alert("Missing Comments", "Please provide some comments and press Save.");
                return; // Exit the function early
            }

            // If there are selected images, first call saveUploadFile
            if (selectedImages.length > 0) {
                const uploadSuccess = await saveUploadFile();
                if (!uploadSuccess) return;
            }

            // Call handleSave in both cases
            const { status, error } = await handleSave();

            if (status === 200) {
                Alert.alert("Success", "Task details saved successfully", [
                    {
                        text: "OK",
                        onPress: () => {
                            // Handle matching and deletion here
                            const matchingCommentIndex = comments.findIndex(comment => comment[0].taskID === savepayload.taskId);
                            if (matchingCommentIndex === -1) {
                                dispatch(removeComment({ index: matchingCommentIndex }));
                            }

                            handlePressOnOverview();
                        }
                    }
                ]);
            }


            // if (status === 200) 
            // {
            //     Alert.alert("Success", "Task details saved successfully");

            //     handlePressOnOverview();
            // } 
            else {
                Alert.alert("Error", error?.message || "Failed to save task details");
            }
        } catch (error) {
            console.error('Error during handleFinalSave process:', error);
            Alert.alert("Error", "An unexpected error occurred");
        }
    };


    const handleRequestReassign = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false); // Assuming setShowModal is a function to control the modal visibility
    };

    const handleReasonApprove = () => {
        setShowApproveModal(true);
    };

    const handleReasonReject = () => {
        setShowRejectModal(true);
    };

    const handleCloseApproveModal = () => {
        setShowApproveModal(false);
    };

    const handleCloseRejectModal = () => {
        setShowRejectModal(false);
    };

    const handleModalApprove = async (reason: string) => {
        if (hasValue(reason)) {
            approvepayload.taskComments = reason;
            const { data, error, status } = await GetCompleteTaskData(approvepayload);
            if (status === 200) {
                Alert.alert("Success", "Task approved successfully", [
                    {
                        text: "OK",
                        onPress: () => router.push('/(user)/task/pendingTaskPage')
                    }
                ]);
            } else {
                Alert.alert("error", error.message);
            }
            setShowApproveModal(false);
        } else {
            Alert.alert("Missing Comments", "Please provide some comments and press Approve.");
        }
    };

    const handleModalReject = async (reason: string) => {
        if (hasValue(reason)) {
            rejectpayload.taskComments = reason;
            const { data, error, status } = await GetCompleteTaskData(rejectpayload);
            if (status === 200) {
                Alert.alert("Success", "Task rejected successfully", [
                    {
                        text: "OK",
                        onPress: () => router.push('/(user)/task/pendingTaskPage')
                    }
                ]);
            } else {
                Alert.alert("error", error.message);
            }
            setShowRejectModal(false);
        } else {
            Alert.alert("Missing Comments", "Please provide some comments and press Reject.");
        }
    };


    const handleReassignModalSave = async (reason: string) => {
        // Update reassignpayload with the reason
        if (hasValue(reason)) {
            reassignpayload.reason = reason;
            const { data, error, status } = await GetRequestAssignData(reassignpayload);
            if (status === 200) {
                Alert.alert("Success", "Request for task reassignment saved successfully", [
                    {
                        text: "OK",
                        onPress: () => router.push('/(user)/task/pendingTaskPage')
                    }
                ]);
            } else {
                Alert.alert("error", error.message);
            }

            setShowModal(false);
        } else {
            Alert.alert("Missing Comments", "Please provide some comments and press Reassign.");
        }
    };

    const handleComplete = async () => {
        if (!completepayload.taskComments || completepayload.taskComments.trim() === '') {
            handlePressOnOverview();
            Alert.alert("Missing Comments", "Please provide some comments and press Complete.");
            return; // Exit the function early
        } else {
            const { data, error, status } = await GetCompleteTaskData(completepayload);
            if (status === 200) {
                Alert.alert(data?.info ?? "Success", data?.message ?? "", [
                    {
                        text: "OK",
                        onPress: () => router.push('/(user)/task/pendingTaskPage')
                    }
                ]);
            } else {
                Alert.alert("Error", error.message);
            }
        }

    }

    const handleSelectedImagesChange = (images: any) => {
        setSelectedImages(images);
    };

    // For not giving any reason as taskcomments to approve

    // const handleApprove = async () => {
    //     const { data, error, status } = await GetCompleteTaskData(approvepayload);
    //     if (status === 200) {
    //         Alert.alert("Success", "Task approved successfully");
    //     } else {
    //         Alert.alert("error", error.message);
    //     }
    // }



    // const handleReject = async () => {
    //     const { data, error, status } = await GetCompleteTaskData(rejectpayload);
    //     if (status === 200) {
    //         Alert.alert("Success", "Task rejected");
    //     } else {
    //         Alert.alert("error", error.message);
    //     }
    // }

    return (

        <CardContainer3 styles={{
            backgroundColor: '#FFFFFF',
            flex: 1,
        }}>

            <HeadImageSection />
            <BtnFilterHeader
                firstBtnName='Overview'
                fistBtnOnpress={handlePressOnOverview}
                secondBtnName='Proofs'
                secondBtnOnpress={handlePressOnProofs}
            />
            <Seperator48 />

            {task_type === 'OwnerTask' && (
                <>
                    {activeTab === 'Overview' && (
                        <KeyboardAvoidingView behavior="padding">
                            <ScrollView>

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

                            <ProofSection onSelectedImagesChange={handleSelectedImagesChange} pendingTaskDetails={pendingTaskDetails} />

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
                            onPress={handleFinalSave}
                        />
                        <Button
                            btnColor={'#42C997'}
                            text='Complete'
                            leftIcon='checkbox-marked-circle-plus-outline'
                            type='md-default'
                            onPress={handleComplete}
                        />
                    </View>
                    <ReassignModal visible={showModal} onSave={handleReassignModalSave} onClose={handleCloseModal} buttonName={'Reassign'} />

                </>
            )}

            {task_type === 'APPROVAL' && (
                <>
                    {activeTab === 'Overview' && (
                        <KeyboardAvoidingView behavior="padding">
                            <ScrollView>

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

                            <ProofSection onSelectedImagesChange={handleSelectedImagesChange} pendingTaskDetails={pendingTaskDetails} />

                        </View>
                    )}
                    <View style={styles.pendingTaskOverViewSubmit}>
                        <Button
                            btnColor={'#A097DC'}
                            text='Approve'
                            leftIcon='account-multiple-plus'
                            type='md-outline'
                            onPress={handleReasonApprove}
                        />

                        <Button
                            btnColor={'#A097DC'}
                            text='Reject'
                            leftIcon='content-save'
                            //type='md-default'
                            type='md-outline'
                            onPress={handleReasonReject}
                        />

                    </View>

                    <ReassignModal visible={showApproveModal} onSave={handleModalApprove} onClose={handleCloseApproveModal} buttonName={'Approve'} />
                    <ReassignModal visible={showRejectModal} onSave={handleModalReject} onClose={handleCloseRejectModal} buttonName={'Reject'} />
                </>
            )}


        </CardContainer3>
        /* </ScrollView> */

    )
}

export default PendingTaskOverViewPage
