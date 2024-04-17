import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from '../style';
import { DropDownListProps, Dropdown } from '../types';
import { Divider } from 'react-native-elements';


const DropDownList = ({ value, label, IconComponent }: DropDownListProps) => {
  return (
    <View style={styles.dropdownItemContainer}>
      <View style={{width: '100%'}}>
        <View style={{
          flexDirection: 'row'
        }}>
          {IconComponent !== null && IconComponent}
          <Text>{value}</Text>
        </View>
        <Divider style={{ ...styles.divider1, marginTop: 1 }} />
      </View>
    </View>
  )
}

const DropDown = ({ setSelectedValue, dropdownItems, selectedValue, minWidth }: Dropdown) => {

  const [open, setOpen] = useState(false);
  
  return (
    <View>
      <DropDownPicker
        open={open}
        value={selectedValue}
        items={dropdownItems}
        setOpen={setOpen}
        setValue={setSelectedValue}
        autoScroll={true}
        maxHeight={200}
        style={{ ...styles.dropdownPicker, minWidth: minWidth }}
        renderListItem={
          ({ label, value, IconComponent }) => {
            return (
              <Pressable onPress={()=>setSelectedValue(value)}>
                <DropDownList IconComponent = {IconComponent} value={value} label={label} />
              </Pressable>
            )

          }
        }
        dropDownContainerStyle={styles.dropdownListContainer}
      />
    </View>
  );
};

export default DropDown;
