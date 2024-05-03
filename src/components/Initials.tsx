import React from 'react'
import { Text, View } from 'react-native'
import { styles } from '../style'
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { InitialsProps } from '../types';


const Initials = ({ size, fontSize }: InitialsProps) => {
    const userDetails = useSelector((state: RootState) => state.authUserDetails.payload);
    
    const firstName = userDetails?.userDetails?.firstName ?? "";
    const lastName = userDetails?.userDetails?.lastName ?? "";
    const avatarLetter = (firstName && lastName)? (firstName[0].toUpperCase() + lastName[0].toUpperCase()): '';
    return (
        <View style={{ ...styles.avatar, height: size, width: size }}>
            <Text style={{...styles.avatarText, fontSize: fontSize}}>{avatarLetter}</Text>
        </View>
    )
}

export default Initials