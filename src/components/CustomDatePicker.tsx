import React, { useState } from 'react';
import { Button, Pressable, Text, TextInput, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CustomeDatePickerProps } from '../types';
import { size24, styles } from '../style';
import { DateFormatDDMMYYYY } from '../utils';
import MuiIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomDatePicker = ({ setDate, date, label, _handleConfirm }: CustomeDatePickerProps): JSX.Element => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    // console.warn("A date has been picked: ", date);
    setDate(date);
    hideDatePicker();
    _handleConfirm &&  _handleConfirm(date);
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}
      <Pressable onPress={showDatePicker}>
        {/* <TextInput
          style={{ ...styles.input, ...styles['inputType' + '3'] }}
          value={DateFormatDDMMYYYY(date && date.toString())}
          placeholder={'DD/MM/YYYY'}
          readOnly={true}
        /> */}
        <View style={styles.datePickerLabelContainer}>
          <MuiIcon name="calendar" size={size24} color="rgba(120, 106, 205, 1)" />
          <Text style={{...styles.textStyle2, marginLeft: 2}}>{label}</Text>
        </View>
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={date || new Date()} //default set it current date
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default CustomDatePicker;
