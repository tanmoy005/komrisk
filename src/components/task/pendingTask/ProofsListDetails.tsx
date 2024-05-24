
// import { ProofListData, ProofListPayload, Item, ProofsListDetailsProps } from "@/src/types";
// import { View } from "../../Themed";
// import GetProofDataList from "@/src/server/api-functions/Tasks/get-proof-data-list";
// import React, { useEffect, useState } from "react";
// import { Alert, RefreshControl, TouchableOpacity } from "react-native";
// import { Text } from 'react-native';
// import { FlatList, StyleSheet } from 'react-native';
// import { screenHeight } from "@/src/style";
// import { memo } from 'react';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import * as FileSystem from 'expo-file-system';
// import PDFReader from 'react-native-pdf';
// import GetDownloadProof from "@/src/server/api-functions/Tasks/download-proof";
// import { DownloadProofPayload } from "@/src/types";
// import RNFetchBlob from 'rn-fetch-blob';
// import Base64 from 'base64-js'
// import RNFS, { DownloadFileOptions } from 'react-native-fs';


// const ProofsListDetails = memo(({ taskId, type }: ProofsListDetailsProps) => {
//     const [refreshing, setRefreshing] = useState(true);
//     const [pdfUri, setPdfUri] = useState<string | null>(null);

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


//     const downloadFile = async (fileStream: string, outputPath: string): Promise<void> => {
//         const options: RNFS.DownloadFileOptions = {
//             fromUrl: fileStream,
//             toFile: outputPath,
//         };
    
//         const downloadResult = RNFS.downloadFile(options);
    
//         return new Promise<void>((resolve, reject) => {
//             downloadResult.promise.then((response) => {
//                 if (response.statusCode === 200) {
//                     resolve();
//                 } else {
//                     reject(new Error(`Failed to download file. Status code: ${response.statusCode}`));
//                 }
//             }).catch((error) => {
//                 reject(error);
//             });
//         });
//     };

//     const handleDownload = async (docId: number) => {
//         console.log("doc Id got", docId);
    
//         const downloadpayload: DownloadProofPayload = { docId: docId.toString() };
//         const { data, error, status } = await GetDownloadProof(downloadpayload);
    
//         if (error) {
//             console.error("Error downloading file:", error);
//             return;
//         }
    
//         const outputPath = `${RNFS.DocumentDirectoryPath}/file.pdf`;
    
//         try {
//             await downloadFile(data, outputPath);
//             console.log("File downloaded successfully");
//         } catch (error) {
//             console.error("Error downloading file:", error);
//         }
//     };

//     // const handleDownload = async (docId: number) => {
//     //     console.log("doc Id got", docId);
    
//     //     const downloadpayload: DownloadProofPayload = { docId: docId.toString() };
    
//     //     const { data, error, status } = await GetDownloadProof(downloadpayload);
    
//     //     if (status === 200) {
//     //         const fs = RNFetchBlob.fs
//     //         console.log(fs);
            
//     //         // const dirs = RNFetchBlob.fs.dirs;

//     //         // console.log(dirs.DocumentDir)
//     //         // console.log(dirs.CacheDir)
//     //         // console.log(dirs.DCIMDir)
//     //         // console.log(dirs.DownloadDir)



//     //         //const path = `${dirs.DownloadDir}/example.pdf`;
    
//     //         // try {
//     //         //     await RNFetchBlob.fs.writeFile(path, data, 'base64');
//     //         //     console.log(`PDF saved to ${path}`);
//     //         // } catch (error) {
//     //         //     console.error('Error saving PDF:', error);
//     //         // }
//     //     } else {
//     //         console.error('Error downloading PDF:', error);
//     //     }
//     // }



//     const renderItem = ({ item }: { item: Item }) => (
//         item?.docTitle == null ? <View style={styles.titleContainer}>
//             {/* <ChartItemSkelton /> */}
//         </View> :
//             <View style={styles.titleContainer}>
//                 <Text>{`${item.docTitle}.${item.extension}`}</Text>
//                 <TouchableOpacity
//                     onPress={() => handleDownload(item.docId)}
//                 >
//                     <Icon name="download" size={24} color="#000" />
//                 </TouchableOpacity>
//             </View>
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




import { ProofListData, ProofListPayload, Item, ProofsListDetailsProps } from "@/src/types";
import { View } from "../../Themed";
import GetProofDataList from "@/src/server/api-functions/Tasks/get-proof-data-list";
import React, { useEffect, useState } from "react";
import { Alert, RefreshControl, TouchableOpacity } from "react-native";
import { Text } from 'react-native';
import { FlatList, StyleSheet } from 'react-native';
import { screenHeight } from "@/src/style";
import { memo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as FileSystem from 'expo-file-system';
import PDFReader from 'react-native-pdf';
import GetDownloadProof from "@/src/server/api-functions/Tasks/download-proof";
import { DownloadProofPayload } from "@/src/types";
import RNFetchBlob from 'rn-fetch-blob';
import Base64 from 'base64-js'
//import RNFS, { DownloadFileOptions } from 'react-native-fs';
//import { PDFDocument } from 'pdf-lib';

const ProofsListDetails = memo(({ taskId, type }: ProofsListDetailsProps) => {
    const [refreshing, setRefreshing] = useState(true);
    const [pdfUri, setPdfUri] = useState<string | null>(null);

    const [proofDataList, setProofDataList] = useState<ProofListData[]>([]);


    const handleGetproofListData = async (payLoad: ProofListPayload) => {
        const { data, error, status } = await GetProofDataList(payLoad);
        if (status === 200) {
            const { aaData } = data
            setProofDataList(aaData);
            setRefreshing(false);

        } else {
            Alert.alert("error", error.message);
        }

    }

    const onRefresh = React.useCallback(() => {
        const defaultPayload: ProofListPayload = {
            taskId: taskId,
            objectType: type
        }
        handleGetproofListData(defaultPayload)
        setRefreshing(true);
    }, []);

    useEffect(() => {
        const updatedPayLoad: ProofListPayload = {
            taskId: taskId,
            objectType: type

        }
        updatedPayLoad
        handleGetproofListData(updatedPayLoad);
    }, [taskId, type]);

//     // Function to create a PDF from a stream
// async function createPdfFromStream(stream: ReadableStream<Uint8Array>, fileName: string) {
//     // Convert the stream to an array buffer
//     const arrayBuffer = await streamToArrayBuffer(stream);
    
//     // Load the PDF document from the array buffer
//     const pdfDoc = await PDFDocument.load(arrayBuffer);

//     // Serialize the PDF document to bytes (Uint8Array)
//     const pdfBytes = await pdfDoc.save();

//     // Create a blob from the PDF bytes
//     const blob = new Blob([pdfBytes], { type: 'application/pdf' });

//     // Create a link element to download the PDF
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = fileName;

//     // Append the link to the body and click it to start the download
//     document.body.appendChild(link);
//     link.click();

//     // Clean up by removing the link
//     document.body.removeChild(link);
// }

// // Utility function to convert a stream to an array buffer
// async function streamToArrayBuffer(stream: ReadableStream<Uint8Array>): Promise<ArrayBuffer> {
//     const reader = stream.getReader();
//     const chunks: Uint8Array[] = [];
//     let result = await reader.read();
    
//     while (!result.done) {
//         chunks.push(result.value);
//         result = await reader.read();
//     }

//     // Combine all chunks into a single array buffer
//     const combined = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
//     let offset = 0;
//     for (const chunk of chunks) {
//         combined.set(chunk, offset);
//         offset += chunk.length;
//     }

//     return combined.buffer;
// }






    const handleDownload = async (docId: number) => {
        console.log("doc Id got", docId);
    
        const downloadpayload: DownloadProofPayload = { docId: docId.toString() };
        const { data, error, status } = await GetDownloadProof(downloadpayload);
        
        if (status === 200) {
            //console.log("image got",data);
        }


 

        //console.log("image got",data);
        
    
        // if (error) {
        //     console.error("Error downloading file:", error);
        //     return;
        // }
    
        // const outputPath = `${RNFS.DocumentDirectoryPath}/file.pdf`;
    
        // try {
        //     // await createPdfFromStream(data, 'downloaded-file.pdf');
        //     console.log("File downloaded successfully");
        // } catch (error) {
        //     console.error("Error downloading file:", error);
        // }
    };



    const renderItem = ({ item }: { item: Item }) => (
        item?.docTitle == null ? <View style={styles.titleContainer}>
            {/* <ChartItemSkelton /> */}
        </View> :
            <View style={styles.titleContainer}>
                <Text>{`${item.docTitle}.${item.extension}`}</Text>
                <TouchableOpacity
                    onPress={() => handleDownload(item.docId)}
                >
                    <Icon name="download" size={24} color="#000" />
                </TouchableOpacity>
            </View>
    );



    return (
        <View >
            <FlatList showsVerticalScrollIndicator={false}
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
        marginBottom: 10, // Add margin bottom for gap between containers
    },
    chartContainer: {

        padding: 10
    },


});


export default ProofsListDetails;