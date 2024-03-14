import React, { useState } from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DropDown = () => {
    const items = [
      { label: 'PIE', value: 'item1' },
      { label: 'BAR', value: 'item2' },
      { label: 'DONUT', value: 'item3' },
    ];
  const [selectedValue, setSelectedValue] = useState(items[0].value);
  const [open, setOpen] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <DropDownPicker
        open={open}
        value={selectedValue}
        items={items}
        setOpen={setOpen}
        setValue={setSelectedValue}
        // setItems={null}
        style={{ width: 100, alignItems: 'center', alignSelf: 'center' }}
        onChangeValue={(value) => console.log(value)} // Optional callback when the selected value changes
      />
    </View>
  );
};

export default DropDown;
