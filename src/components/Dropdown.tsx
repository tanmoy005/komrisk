import { Dispatch } from '@reduxjs/toolkit';
import React, { SetStateAction, useState } from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { size32, styles } from '../style';

interface DropDownItem {
  label: string;
  value: string;
  icon?: () => JSX.Element;
}
interface Dropdown {
  dropdownItems: DropDownItem[];
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  selectedValue: any;
}

const DropDown = ({ setSelectedValue, dropdownItems, selectedValue }: Dropdown) => {

  // const [selectedValue, setSelectedValue] = useState(items[0].value);
  const [open, setOpen] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <DropDownPicker
        open={open}
        value={selectedValue}
        items={dropdownItems}
        setOpen={setOpen}
        setValue={setSelectedValue}
        // setItems={null}
        style={styles.dropdownPicker}
      // onChangeValue={(value) => //console.log(value)} // Optional callback when the selected value changes
      />
    </View>
  );
};

export default DropDown;
