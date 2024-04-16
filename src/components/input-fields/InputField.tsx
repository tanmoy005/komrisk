import { styles } from '@/src/style';
import { InputFieldProps } from '@/src/types';
import React from 'react'
import { StyleSheet, TextInput } from 'react-native'


const InputField = ({ value, setInput, placeholder, type}: InputFieldProps) => {

    const type1 = {
        ...styles.input,...styles.inputType1
    }
console.log('type', type);


    return (
        <TextInput
            style={{...styles.input, ...styles['inputType'+type]}}
            // style={styles}
            onChangeText={(value: string) => setInput && setInput(value)}
            value={value}
            placeholder={placeholder}
            // right={<TextInput.Icon name="eye" />}
        />
    )
}
// const styles: { [key: string]: any } = StyleSheet.create({

//     input: {
//         borderColor: '#D9D9D9',
//         borderWidth: 2,
//         borderRadius: 5,
//         width: '100%'
//     },
//     inputType1:{
//         padding: 13,
//         height: 33,
//         color: '#99A3A4',
        
//     },
//     inputType2:{
//         paddingHorizontal: 14,
//         paddingVertical: 7,
//         color: '#B6B6B9',
//         backgroundColor: '#fff'
//     }
// });
export default InputField