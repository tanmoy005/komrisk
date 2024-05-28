
import { ProofListData, ProofListPayload, Item, ProofsListDetailsProps } from "@/src/types";
import { View } from "../../Themed";
import GetProofDataList from "@/src/server/api-functions/Tasks/get-proof-data-list";
import React, { useEffect, useState } from "react";
import { Alert, Linking, Platform, RefreshControl, TouchableOpacity } from "react-native";
import { Text } from 'react-native';
import { FlatList, StyleSheet } from 'react-native';
import { screenHeight } from "@/src/style";
import { memo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as FileSystem from 'expo-file-system';
import PDFReader from 'react-native-pdf';
import GetDownloadProof from "@/src/server/api-functions/Tasks/download-proof";
import { DownloadProofPayload } from "@/src/types";
import { btoa } from 'react-native-quick-base64'; // Ensure you have a base64 encoding utility
import * as IntentLauncherAndroid from 'expo-intent-launcher';
import * as MediaLibrary from 'expo-media-library';





const ProofsListDetails = memo(({ taskId, type }: ProofsListDetailsProps) => {
    const [refreshing, setRefreshing] = useState(true);
    const [pdfUri, setPdfUri] = useState<string | null>(null);

    const [proofDataList, setProofDataList] = useState<ProofListData[]>([]);

    console.log("taskId got",taskId);
    


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






    // ========================== Working ============================== //

    const handleDownload = async (docId: number) => {
        //console.log("doc Id got", docId);

        const downloadpayload: DownloadProofPayload = { docId: docId.toString() };
        const response = await GetDownloadProof(downloadpayload);

        if (response.status === 200) {
            const arrayBufferString = response.data;

            //console.log("arrayBuffer", arrayBufferString);

            // Determine the type based on the content
            let type = 'application/octet-stream'; // default type
            if (arrayBufferString.startsWith('%PDF')) {
                type = 'application/pdf';
            }


            // Convert array buffer string to base64 string
            const base64String = btoa(arrayBufferString);
            //console.log("Base64 String length:", base64String.length);

            //console.log("base64String", base64String);
            saveBase64ToFile(base64String, "downloadedFile.pdf").then((path) => {
                if (path) {
                    console.log('File saved to:', path);
                    // openFile(path);
                    FileSystem.getContentUriAsync(path).then(path => {
                        console.log('path42423', path);

                        IntentLauncherAndroid.startActivityAsync('android.intent.action.VIEW', {
                            data: path,
                            flags: 1,
                            type: type
                        });
                    });
                } else {
                    console.log('File save failed');
                }
            });

            // const path = FileSystem.documentDirectory + 'downloadedFile.pdf';
            // console.log("File path11", path);

            // await FileSystem.writeAsStringAsync(path, base64String, {
            //     encoding: FileSystem.EncodingType.Base64,
            // });
            // downloadFile(FileSystem.documentDirectory ?? "", 'downloadedFile.pdf')
            // Alert.alert('Success', `File downloaded successfully to: ${path}`);
        } else {
            console.error('Failed to download file', response);
            Alert.alert('Error', 'Failed to download file');
        }
    };

    const downloadFile = async (fileUri: string, fileName: string) => {
        const downloadResumable = FileSystem.createDownloadResumable(
            fileUri,
            FileSystem.documentDirectory + fileName
        );

        try {
            const uri = await downloadResumable.downloadAsync();
            console.log('uri', uri);

            return uri; // Local path of the downloaded file
        } catch (e) {
            console.error('Error downloading file:', e);
            return null;
        }
    };
    const openFile = async (filePath:string) => {
        try {
          let contentUri;
          if (Platform.OS === 'android') {
            contentUri = filePath;
            console.log("contentUri0",contentUri);
            
          } else {
            console.log("contentUri1",contentUri);
            contentUri = filePath;
          }
      
          if (Platform.OS === 'android') {
           
            await IntentLauncherAndroid.startActivityAsync(
              'android.intent.action.VIEW',
              {
                data: contentUri,
                flags: 1,
              }
            );
          } else {
            await Linking.openURL(contentUri);
          }
        } catch (e) {
          console.error('Error opening file:', e);
        }
      };
  
    const saveBase64ToFile = async (base64String: string, fileName: string) => {
        const path = FileSystem.documentDirectory + fileName;
        try {
            await FileSystem.writeAsStringAsync(path, base64String, {
                encoding: FileSystem.EncodingType.Base64,
            });
            return path;
        } catch (e) {
            console.error('Error saving file:', e);
            return null;
        }
    };






    const renderItem = ({ item }: { item: Item }) => (
        item?.docTitle == null ? <View style={styles.titleContainer}>
            {/* <ChartItemSkelton /> */}
        </View> :
            <View style={styles.titleContainer}>
                <Text>{`${item.docTitle}`}</Text>
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