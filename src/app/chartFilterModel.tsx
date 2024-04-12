import React from 'react'
import { View } from '../components/Themed'
import { StyleSheet } from 'react-native';


export default function ModalScreen() {
  return (
    <View style={styles.container}>xzcfsxczxc</View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 60
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 5,
        height: 1,
        width: '45%',
        backgroundColor: "#26262C3D"
    },
    profileImageContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginTop: 5
    },
    designation: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 14,
        color: '#26262C'
    }
});
