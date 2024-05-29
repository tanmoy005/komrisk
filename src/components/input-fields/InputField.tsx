import { styles } from '@/src/style';
import { InputFieldProps } from '@/src/types';
import React from 'react';
import { TextInput } from 'react-native';


const InputField = ({ value, setInput, placeholder, type, editable = true }: InputFieldProps) => {

    const type1 = {
        ...styles.input, ...styles.inputType1
    }

    return (
        <TextInput
            style={{ ...styles.input, ...styles['inputType' + type] }}
            // style={styles}
            onChangeText={(value: string) => setInput && setInput(value)}
            value={value}
            placeholder={placeholder}
            editable={editable}
        // aria-disabled={true}
        // right={<TextInput.Icon name="eye" />}
        />
    )
}
export default InputField