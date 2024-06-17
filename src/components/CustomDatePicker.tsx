import { CustomeDatePickerProps } from '@/src/types';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MuiIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { size24, styles } from '@/src/style';
import { DateFormatDDMMYYYY } from '@/src/utils';

const CustomDatePicker = ({
  setDate,
  date = new Date(), // Default date if not provided
  label = '', // Default label if not provided
  _handleConfirm
}: CustomeDatePickerProps): JSX.Element => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
      hideDatePicker();
      _handleConfirm && _handleConfirm(selectedDate);
    }
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Pressable onPress={showDatePicker}>
        <View style={styles.datePickerLabelContainer}>
          <MuiIcon name="calendar" size={size24} color="rgba(120, 106, 205, 1)" />
          <Text style={{ ...styles.textStyle2, marginLeft: 2 }}>{label}</Text>
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
