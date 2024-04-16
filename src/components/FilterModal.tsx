import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { screenWidth, styles } from '../style';

interface ModelProps {
  component: JSX.Element,
  modalVisible: boolean,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const FilterModal = ({ component, modalVisible, setModalVisible }: ModelProps) => {
  // const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        style={{ width: '100%' }}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
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


export default FilterModal;