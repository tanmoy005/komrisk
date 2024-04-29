
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
import { Text, View } from 'react-native'
import ProofsListDetails from '@/src/components/task/pendingTask/ProofsListDetails'
import { Button, StyleSheet, Alert, Modal, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';


const ProofSection = () => {


    // =========== Need for Upload and Visible Image ================ //

    //const [selectedImages, setSelectedImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState<{ uri: string, fileName: string | null | undefined }[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    //const [selectedImageUri, setSelectedImageUri] = useState(null);
    const [selectedImageUri, setSelectedImageUri] = useState<string | null | undefined>(null);




    // =========== Need for Upload and Visible Image ================ //

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Please allow access to your photo library.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            //allowsEditing: true,
            //aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true, // Enable multiple photo selection
        });

        console.log(result);

        if (!result.canceled) {
            const imagesData = result.assets.map(asset => ({
                uri: asset.uri,
                fileName: asset.fileName,
            }));
            setSelectedImages(imagesData);
        }
    };

    const openImage = (imageUri: string | null | undefined) => {
        setSelectedImageUri(imageUri);
        setModalVisible(true);
    };
    





    return (
        <CardContainer2>
            <View style={{ position: 'absolute', top: 0, left: 0, margin: 8 }}>

                <TouchableOpacity
                    style={styles.uploadButtonContainer}
                    onPress={pickImage}
                >
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="download" size={24} color="#5645C0" style={{ transform: [{ rotate: '180deg' }] }} />
                    </View>
                    <Text style={styles.uploadButtonText}>Upload</Text>
                </TouchableOpacity>
                {selectedImages.map((image, index) => (
                    <Text key={index} style={styles.filename} onPress={() => openImage(image.uri)}>
                        {image.fileName}
                    </Text>
                ))}
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

            <ProofsListDetails taskId={330038} type="COMPLIANCE_PROOF" />

        </CardContainer2>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    filename: {
        fontSize: 16,
        marginVertical: 5,
        textDecorationLine: 'underline',
        color: 'blue',
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

});

export default ProofSection