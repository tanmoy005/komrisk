import { StatusBar } from 'expo-status-bar';
import { Image, Platform, Pressable, StyleSheet } from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import Button from '../components/Button';
import { router } from 'expo-router';
import CustomModal from '../components/CustomModal';
import ChartFilter from './chartFilterModal';
import { filterSelectProps } from '../types';
import { useState } from 'react';
import { screenWidth } from '../style';

export default function FilterScreen({ setFilterModalVisible, setModalVisible }: filterSelectProps) {


    const handlefilterVisibilyty = () => {
        setModalVisible(false);
        setFilterModalVisible(true)
        // filterType
    }
    const buttnWidth = screenWidth*0.59;
    return (
        <View style={styles.container}>
            <View
                style={{
                    backgroundColor: "#red",
                    height: "50%",
                    justifyContent: "center",
                    alignItems: "stretch",
                    rowGap: 20
                }}
            >

                <Button
                    text='Chart Filter'
                    btnColor='rgba(120, 106, 205, 0.9)'
                    type='outline'
                    onPress={() =>
                        handlefilterVisibilyty()
                    }
                    style={{
                        paddingVertical: 20,
                        paddingHorizontal: 48,
                        fontWeight: '400',
                        fontSize: 16,
                        width: buttnWidth
                    }}
                />
                <Button
                    text='Filter 2'
                    btnColor='rgba(120, 106, 205, 0.9)'
                    type='outline'
                    onPress={() => router.push('/(user)/dashboard/complianceStatus')}
                    style={{
                        paddingVertical: 20,
                        paddingHorizontal: 48,
                        fontWeight: '400',
                        fontSize: 16,
                        width: buttnWidth
                    }}
                />
                <Button
                    text='Filter 3'
                    btnColor='rgba(120, 106, 205, 0.9)'
                    type='outline'
                    onPress={() => router.push('/(user)/dashboard/complianceStatus')}
                    style={{
                        paddingVertical: 20,
                        paddingHorizontal: 48,
                        fontWeight: '400',
                        fontSize: 16,
                        width: buttnWidth,
                        borderRadius: 3
                    }}
                />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 35
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
