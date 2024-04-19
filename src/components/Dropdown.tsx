import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from '../style';
import { DropDownListProps, Dropdown } from '../types';
import { Divider } from 'react-native-elements';
import { hasValue } from '../utils';


const DropDownList = ({ value, label, IconComponent }: DropDownListProps) => {
  console.log('value333333333333333', value);
  
  return (
    <View style={styles.dropdownItemContainer}>
      <View style={{width: '100%'}}>
        <View style={{
          flexDirection: 'row'
        }}>
          {IconComponent !== null && IconComponent}
          <Text style={styles.chartLabel}>{label}</Text>
        </View>
        <Divider style={{ ...styles.divider1, marginTop: 1 }} />
      </View>
    </View>
  )
}

const DropDown = ({ setSelectedValue, dropdownItems, selectedValue, minWidth, open, setOpen, onpress  }: Dropdown) => {

  const [_open, _setOpen] = useState(false);
  console.log('selectedValue', selectedValue);
  
  const handleOnpress =(value: string)=>{
    setSelectedValue(value);
    onpress && onpress();
  }

  return (
    <View>
      <DropDownPicker
        open={ open!==undefined? open : _open}
        value={selectedValue}
        items={dropdownItems}
        setOpen={setOpen!==undefined? setOpen : _setOpen}
        setValue={setSelectedValue}
        autoScroll={false}
        closeAfterSelecting={true}
        scrollViewProps={{
          scrollEnabled: true,
          persistentScrollbar: false,
        }}
        maxHeight={200}
        style={{ ...styles.dropdownPicker, minWidth: minWidth}}
        renderListItem={
          ({ label, value, IconComponent,  }) => {
            return (
              <Pressable onPress={()=>handleOnpress(value)}>
                <DropDownList IconComponent = {IconComponent} value={value} label={label} />
              </Pressable>
            )

          }
        }
        labelStyle={styles.chartLabel}
        dropDownContainerStyle={styles.dropdownListContainer}
      />
    </View>
  );
};

export default DropDown;
