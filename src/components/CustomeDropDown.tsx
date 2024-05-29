import { styles } from '@/src/style';
import { DropdownProps } from '@/src/types';
import { hasValue } from '@/src/utils';
import React, { useState } from 'react';
import {
  I18nManager,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const renderItem = (item: any) => {
  const isLocalImage = hasValue(item?.image?.uri);
  return (
    <View style={{ flexDirection: 'row' }}>
      {
      isLocalImage &&

          <Image
            source={ item.image.uri}
            style={[styles.image]}
          />
        
      }
      <Text>
        {item.lable}
      </Text>
    </View>
  );
};
const CustomeDropDown = ({ setSelectedValue, dropdownItems, selectedValue, minWidth, open, setOpen, onpress, leftIcon }: DropdownProps) => {
  const [image, setImage] = useState<{ uri: string }>({ uri: '' })


  return (

    <Dropdown
      style={{ ...styles.dropdownPicker, minWidth: minWidth }}
      selectedTextStyle={styles.chartLabel}
      itemTextStyle={styles.chartLabel}
      containerStyle={styles.dropdownListContainer}
      itemContainerStyle={styles.dropdownItemContainer}
      // placeholderStyle={styles.placeholderStyle}
      // inputSearchStyle={styles.inputSearchStyle}
      // search
      renderItem={renderItem}
      maxHeight={200}
      value={selectedValue}
      data={dropdownItems}
      valueField="value"
      labelField="lable"
      // placeholder="Select country"
      // searchPlaceholder="Search..."
      renderLeftIcon={() => {
        if (typeof image?.uri === 'string') {
          return <Image
            style={[styles.image]}
          />
        } else {
          return leftIcon && leftIcon()
        }
      }}

      onChange={e => {
        setImage(e.image);
        setSelectedValue(e.value);
        onpress && onpress();
      }}
    />

  );
};

export default CustomeDropDown;
const styles1 = StyleSheet.create({
  container: {
    width: 60,
  },
  item: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    padding: 6,
    alignItems: 'center',
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 3,
    marginVertical: 4,
  },
  selectedTextStyle: {
    flex: 1,
    fontSize: 12,
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  imageStyle: {
    width: 24,
    height: 24,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});