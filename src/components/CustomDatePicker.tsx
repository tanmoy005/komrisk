import React, { useState } from 'react';
import { Button, Pressable, TextInput, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CustomeDatePickerProps } from '../types';
import { styles } from '../style';
import { DateFormatDDMMYYYY } from '../utils';


const CustomDatePicker = ({ setDate, date }: CustomeDatePickerProps): JSX.Element => {
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
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}
      <Pressable onPress={showDatePicker}>
        <TextInput
          style={{ ...styles.input, ...styles['inputType' + '3'] }}
          value={DateFormatDDMMYYYY(date && date.toString())}
          placeholder={'DD/MM/YYYY'}
          readOnly={true}
        />
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
