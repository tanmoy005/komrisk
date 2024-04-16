import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { screenWidth, styles } from '../style';

interface ModelProps {
  component: JSX.Element,
  modalVisible: boolean,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const CustomModal = ({ component, modalVisible, setModalVisible }: ModelProps) => {
  
  return (
    <View style={styles.centeredView}>
      <Modal
        style={{ width: '100%' }}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
            {component}
          </View>
        </View>
      </Modal>
    </View>
  );
};


export default CustomModal;