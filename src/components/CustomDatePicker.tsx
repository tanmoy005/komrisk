import React, { useState } from 'react';
import { Button, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CustomeDatePickerProps } from '../types';


const CustomDatePicker = ({ setDate, date }: CustomeDatePickerProps): JSX.Element => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.warn("A date has been picked: ", date);
    setDate(date);
    hideDatePicker();
  };

  return (
    <View>
      <Button title="Show Date Picker" onPress={showDatePicker} />
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
