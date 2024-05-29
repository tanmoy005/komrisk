
import ProofsListDetails from '@/src/components/task/pendingTask/ProofsListDetails';
import { AuthContext } from '@/src/provider/AuthProvider';
import { PendingTaskItemDetailsResponse } from '@/src/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CardContainer from '@/src/components/cards/CardContainer';


interface ProofSectionProps {
    onSelectedImagesChange: (images: { uri: string, fileName: string | null | undefined, type: string | null | undefined }[]) => void;
    pendingTaskDetails: PendingTaskItemDetailsResponse;
}

const ProofSection: React.FC<ProofSectionProps> = ({ onSelectedImagesChange, pendingTaskDetails }) => {
    const [selectedImages, setSelectedImages] = useState<{ uri: string, fileName: string | null | undefined, type: string | null | undefined }[]>([]);
    const [selectedImageUri, setSelectedImageUri] = useState<string | null | undefined>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const { token } = React.useContext(AuthContext);
    //console.log("token", token);

    useEffect(() => {
        onSelectedImagesChange(selectedImages);
    }, [selectedImages]);

    const pickDocument = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need media library permissions to make this work!');
                return;
            }
        }

        const result = await DocumentPicker.getDocumentAsync({});
        //console.log("result", result);

        if (!result.canceled) {
            //console.log("result", result);

            const filesData = result.assets.map(asset => ({
                uri: asset.uri,
                fileName: asset.name,
                type: asset.mimeType
            }));
            setSelectedImages(filesData);
        }
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Please allow access to your photo library.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
            allowsMultipleSelection: true,
        });

        if (!result.canceled) {
            //console.log("result", result);

            const filesData = result.assets.map(asset => ({
                uri: asset.uri,
                fileName: asset.fileName,
                type: asset.mimeType
            }));
            setSelectedImages(filesData);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Please allow access to your camera.');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        //console.log("result",result);


        if (!result.canceled) {
            //console.log("result", result);

            const filesData = result.assets.map(asset => ({
                uri: asset.uri,
                fileName: asset.fileName,
                type: asset.mimeType
            }));
            setSelectedImages(filesData);
        }
    };

    const handleFileSelection = () => {
        Alert.alert(
            'Select File',
            'Choose the type of file to upload',
            [
                { text: 'Document', onPress: pickDocument },
                { text: 'Image', onPress: pickImage },
                { text: 'Camera', onPress: takePhoto },
                { text: 'Cancel', style: 'cancel' }
            ],
            { cancelable: true }
        );
    };

    const taskIDString = pendingTaskDetails.task_id?? "0";
    const task_id = parseInt(taskIDString, 10);

    //console.log("selectedImages", selectedImages);

    return (
        <CardContainer>
            <View style={{ position: 'absolute', top: 0, left: 0, margin: 8 }}>
                <View style={{ flexDirection: 'row', }}>
                    <TouchableOpacity
                        style={styles.uploadButtonContainer}
                        onPress={handleFileSelection}
                    >
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons name="download" size={24} color="#5645C0" style={{ transform: [{ rotate: '180deg' }] }} />
                        </View>
                        <Text style={styles.uploadButtonText}>Upload</Text>
                    </TouchableOpacity>
                </View>
                {selectedImages.length === 0 ? (
                    <Text style={styles.noFileText}>No file chosen</Text>
                ) : selectedImages.length === 1 ? (
                    <Text style={styles.filenametext}>
                        {selectedImages[0].fileName}
                    </Text>
                ) : (
                    <Text style={styles.noFileText}>
                        {selectedImages.length} files selected
                    </Text>
                )}

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <Image source={{ uri: selectedImageUri ?? undefined }} style={styles.modalImage} />
                        <Button title="Close" onPress={() => setModalVisible(false)} />
                    </View>
                </Modal>
            </View>

            <View style={{ marginBottom: 80 }} />
            {/* Render Proofs component here */}

            {/* For Other User get proof list */}
            {/* <ProofsListDetails taskId={330038} type="COMPLIANCE_PROOF" /> */}

            {/* For Sayan Sarkar pdf download api */}
            {/* <ProofsListDetails taskId={6850084} type="COMPLIANCE_PROOF" /> */}
            
            <ProofsListDetails taskId={task_id} type="COMPLIANCE_PROOF" />
        </CardContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    filenametext: {
        fontSize: 16,
        marginVertical: 5,
        color: 'black',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    modalImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    uploadButton: {
        borderWidth: 1,
        borderColor: '#5645C0',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    uploadButtonText: {
        color: '#5645C0',
        fontWeight: 'bold',
    },
    chooseButtonText: {
        color: 'black',
    },
    iconContainer: {
        marginRight: 10,
    },
    uploadButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#5645C0',
        borderWidth: 1,
        padding: 10,
    },
    chooseButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#e6eaf0',
        marginRight: 80
    },
    noFileText: {
        color: 'black',
        fontSize: 16,
    },
});

export default ProofSection;
