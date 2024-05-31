
// import GetDownloadProof from "@/src/server/api-functions/Tasks/download-proof";
// import GetProofDataList from "@/src/server/api-functions/Tasks/get-proof-data-list";
// import { screenHeight } from "@/src/style";
// import { DownloadProofPayload, Item, ProofListData, ProofListPayload, ProofsListDetailsProps } from "@/src/types";
// import * as FileSystem from 'expo-file-system';
// import * as IntentLauncherAndroid from 'expo-intent-launcher';
// import React, { memo, useEffect, useState } from "react";
// import { Alert, FlatList, Linking, Platform, Pressable, RefreshControl, StyleSheet, Text, TouchableOpacity } from "react-native";
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { View } from "@/src/components/Themed";
// import ChartItemSkelton from "../../skelton/ChartItemSkelton";





// const ProofsListDetails = memo(({ taskId, type }: ProofsListDetailsProps) => {
//     const [refreshing, setRefreshing] = useState(true);
//     const [proofDataList, setProofDataList] = useState<ProofListData[]>([]);

//     const handleGetproofListData = async (payLoad: ProofListPayload) => {
//         const { data, error, status } = await GetProofDataList(payLoad);
//         if (status === 200) {
//             const { aaData } = data
//             setProofDataList(aaData);
//             setRefreshing(false);

//         } else {
//             Alert.alert("error", error.message);
//         }

//     }

//     const onRefresh = React.useCallback(() => {
//         const defaultPayload: ProofListPayload = {
//             taskId: taskId,
//             objectType: type
//         }
//         handleGetproofListData(defaultPayload)
//         setRefreshing(true);
//     }, []);

//     useEffect(() => {
//         const updatedPayLoad: ProofListPayload = {
//             taskId: taskId,
//             objectType: type

//         }
//         updatedPayLoad
//         handleGetproofListData(updatedPayLoad);
//     }, [taskId, type]);


//     // const handleDownload = async (docId: number) => {
//     //     const downloadpayload: DownloadProofPayload = { docId: docId.toString() };
//     //     const response = await GetDownloadProof(downloadpayload);
    
//     //     if (response.status === 200) {
//     //         const arrayBufferString = response.data;
    
//     //         // Convert the array buffer string to ArrayBuffer
//     //         const binaryString = atob(arrayBufferString); // Decode base64 string
//     //         const len = binaryString.length;
//     //         const bytes = new Uint8Array(len);
    
//     //         for (let i = 0; i < len; i++) {
//     //             bytes[i] = binaryString.charCodeAt(i);
//     //         }
    
//     //         const arrayBuffer = bytes.buffer;
    
//     //         // Create a Blob from the ArrayBuffer
//     //         const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    
//     //         // Save the Blob to a file
//     //         const fileUri = FileSystem.documentDirectory + 'downloadedFile.pdf';
    
//     //         // Create a temporary URL for the Blob
//     //         const reader = new FileReader();
//     //         reader.onload = async () => {
//     //             const base64Data = reader.result.split(',')[1];
    
//     //             await FileSystem.writeAsStringAsync(fileUri, base64Data, {
//     //                 encoding: FileSystem.EncodingType.Base64,
//     //             });
    
//     //             // Open the file using Expo Sharing
//     //             await Sharing.shareAsync(fileUri);
//     //         };
    
//     //         reader.readAsDataURL(blob);
//     //     } else {
//     //         console.error('Failed to download file:', response.status);
//     //         Alert.alert('Error', 'Failed to download file');
//     //     }
//     // };






//     // ========================== Working ============================== //

//     const handleDownload = async (docId: number, docName: string, docExt: string) => {
//         if (docExt === "pdf" || docExt === "png" || docExt === "txt" || docExt === "doc" || docExt === "jpeg" || docExt === "jpg") {

//             const fileName = `${docName}.${docExt}`;
//             let filetype = '';
//             switch (docExt) {
//                 case 'jpeg':
//                     filetype = 'image/jpeg';
//                     break;
//                 case 'jpg':
//                     filetype = 'image/jpg';
//                     break;
//                 case 'png':
//                     filetype = 'image/png';
//                     break;
//                 case 'pdf':
//                     filetype = 'application/pdf';
//                     break;
//                 case 'txt':
//                     filetype = 'text/plain';
//                     break;
//                 case 'doc':
//                     filetype = 'application/msword';
//                     break;
//                 // Add other methods (PUT, DELETE, etc.) if needed
//             }

//             const downloadpayload: DownloadProofPayload = { docId: docId.toString() };
//             const response = await GetDownloadProof(downloadpayload);

//             if (response.status === 200) {
//                 const arrayBufferString: Blob = await response.data;
//                 var reader = new FileReader();
//                 reader.onloadend = async () => {
//                     if (typeof (reader.result) == 'string') {
//                         const fileUri = `${FileSystem.documentDirectory}/${fileName}`;
//                         await FileSystem.writeAsStringAsync(fileUri, reader.result.split(',')[1], { encoding: FileSystem.EncodingType.Base64 });
//                         FileSystem.getContentUriAsync(fileUri).then(path => {
//                             IntentLauncherAndroid.startActivityAsync('android.intent.action.VIEW', {
//                                 data: path,
//                                 flags: 1,
//                                 type: filetype
//                             });
//                         });
//                         // setTimeout(async () => {
//                         //     try {
//                         //       await FileSystem.deleteAsync(fileUri, { idempotent: true });
//                         //       console.log('File deleted successfully');
//                         //     } catch (deleteError) {
//                         //       console.error('Error deleting file:', deleteError);
//                         //     }
//                         //   }, 50); // Adjust delay as necessary
//                     }
//                 }
//                 reader.readAsDataURL(arrayBufferString);
//             } else {
//                 console.error('Failed to download file', response);
//                 Alert.alert('Error', 'Failed to download file');
//             }
//         } else {
//             Alert.alert('Error', 'File view not supported');
//         }
//     };


//     const renderItem = ({ item }: { item: Item }) => (
//         item?.docTitle == null ? <View style={styles.titleContainer}>
//             <ChartItemSkelton />
//         </View> :
//             <TouchableOpacity style={styles.titleContainer}  onPress={() => handleDownload(item.docId, item.docTitle, item.extension)}>
//                 <Text>{`${item.docTitle}`}</Text>
//                 {/* <TouchableOpacity> */}
//                     <Icon name="download" size={24} color="#000" />
//                 </TouchableOpacity>
//             // </Pressable>
//     );



//     return (
//         <View >
//             <FlatList showsVerticalScrollIndicator={false}
//                 refreshControl={
//                     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//                 }
//                 data={proofDataList}
//                 renderItem={renderItem}
//                 keyExtractor={(item, index) => index.toString()}
//                 style={{ height: screenHeight * 0.5 }}
//             />
//         </View>
//     );
// });

// const styles = StyleSheet.create({
//     titleContainer: {
//         paddingHorizontal: 50,

//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         width: '100%',
//         color: '#eee',
//         height: 70,
//         backgroundColor: '#A097DC29',
//         borderRadius: 5,
//         position: 'relative',
//         marginBottom: 10, // Add margin bottom for gap between containers
//     },
//     chartContainer: {

//         padding: 10
//     },


// });


// export default ProofsListDetails;


import GetDownloadProof from "@/src/server/api-functions/Tasks/download-proof";
import GetProofDataList from "@/src/server/api-functions/Tasks/get-proof-data-list";
import { screenHeight } from "@/src/style";
import { DownloadProofPayload, Item, ProofListData, ProofListPayload, ProofsListDetailsProps } from "@/src/types";
import * as FileSystem from 'expo-file-system';
import * as IntentLauncherAndroid from 'expo-intent-launcher';
import React, { memo, useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from "@/src/components/Themed";
import ChartItemSkelton from "../../skelton/ChartItemSkelton";

const ProofsListDetails = memo(({ taskId, type }: ProofsListDetailsProps) => {
    const [refreshing, setRefreshing] = useState(true);
    const [proofDataList, setProofDataList] = useState<ProofListData[]>([]);
    const [loading, setLoading] = useState(false); // Add this line to manage loading state

    const handleGetproofListData = async (payLoad: ProofListPayload) => {
        const { data, error, status } = await GetProofDataList(payLoad);
        if (status === 200) {
            const { aaData } = data;
            setProofDataList(aaData);
            setRefreshing(false);
        } else {
            Alert.alert("error", error.message);
        }
    };

    const onRefresh = React.useCallback(() => {
        const defaultPayload: ProofListPayload = {
            taskId: taskId,
            objectType: type
        };
        handleGetproofListData(defaultPayload);
        setRefreshing(true);
    }, [taskId, type]);

    useEffect(() => {
        const updatedPayLoad: ProofListPayload = {
            taskId: taskId,
            objectType: type
        };
        handleGetproofListData(updatedPayLoad);
    }, [taskId, type]);

    const handleDownload = async (docId: number, docName: string, docExt: string) => {
        if (docExt === "pdf" || docExt === "png" || docExt === "txt" || docExt === "doc" || docExt === "jpeg" || docExt === "jpg") {
            setLoading(true); // Start loading

            const fileName = `${docName}.${docExt}`;
            let filetype = '';
            switch (docExt) {
                case 'jpeg':
                    filetype = 'image/jpeg';
                    break;
                case 'jpg':
                    filetype = 'image/jpg';
                    break;
                case 'png':
                    filetype = 'image/png';
                    break;
                case 'pdf':
                    filetype = 'application/pdf';
                    break;
                case 'txt':
                    filetype = 'text/plain';
                    break;
                case 'doc':
                    filetype = 'application/msword';
                    break;
            }

            const downloadpayload: DownloadProofPayload = { docId: docId.toString() };
            const response = await GetDownloadProof(downloadpayload);

            if (response.status === 200) {
                const arrayBufferString: Blob = await response.data;
                var reader = new FileReader();
                reader.onloadend = async () => {
                    if (typeof reader.result === 'string') {
                        const fileUri = `${FileSystem.documentDirectory}/${fileName}`;
                        await FileSystem.writeAsStringAsync(fileUri, reader.result.split(',')[1], { encoding: FileSystem.EncodingType.Base64 });
                        FileSystem.getContentUriAsync(fileUri).then(path => {
                            IntentLauncherAndroid.startActivityAsync('android.intent.action.VIEW', {
                                data: path,
                                flags: 1,
                                type: filetype
                            });
                            setLoading(false); // Stop loading
                        });
                    }
                };
                reader.readAsDataURL(arrayBufferString);
            } else {
                console.error('Failed to download file', response);
                Alert.alert('Error', 'Failed to download file');
                setLoading(false); // Stop loading on error
            }
        } else {
            Alert.alert('Error', 'File view not supported');
        }
    };

    const renderItem = ({ item }: { item: Item }) => (
        item?.docTitle == null ? <View style={styles.titleContainer}>
            <ChartItemSkelton />
        </View> :
            <TouchableOpacity style={styles.titleContainer} onPress={() => handleDownload(item.docId, item.docTitle, item.extension)}>
                <Text>{`${item.docTitle}`}</Text>
                <Icon name="download" size={24} color="#000" />
            </TouchableOpacity>
    );

    return (
        <View>
            {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}
            <FlatList
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                data={proofDataList}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                style={{ height: screenHeight * 0.5 }}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    titleContainer: {
        paddingHorizontal: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        color: '#eee',
        height: 70,
        backgroundColor: '#A097DC29',
        borderRadius: 5,
        position: 'relative',
        marginBottom: 10,
    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -25,
        marginTop: -25,
    },
    chartContainer: {
        padding: 10,
    },
});

export default ProofsListDetails;
