// ReassignModal.tsx
import React, { useState } from 'react';
import { Modal, Text, TextInput, Button, View, StyleSheet, TouchableOpacity } from 'react-native';

interface ReassignModalProps {
    visible: boolean;
    onSave: (reason: string) => void;
    onClose: () => void;
}

const ReassignModal: React.FC<ReassignModalProps> = ({ visible, onSave, onClose }) => {
    const [reason, setReason] = useState<string>('');

    const handleSave = () => {
        onSave(reason);
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.boldText}>Enter Reason :</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter reason"
                        value={reason}
                        onChangeText={setReason}
                    />
                    <View style = {{marginLeft:180}}>
                        <Button 
                            title="Save" 
                            onPress={handleSave} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%', // Adjust the width as needed
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 20,
    },

    closeButton: {
        position: 'absolute',
        top: 2,
        right: 10,
        padding: 5,
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 18, // Adjust the size as needed
        marginBottom: 10, // Add some space below the text
    },
});

export default ReassignModal;


