// import React, { useState } from 'react';
// import { View, Text, Pressable } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { styles } from '../style';
// import { DropDownListProps, Dropdown } from '../types';
// import { Divider } from 'react-native-elements';
// import { hasValue } from '../utils';


// const DropDownList = ({ value, label, IconComponent }: DropDownListProps) => {

//   return (
//     <View style={styles.dropdownItemContainer}>
//       <View style={{width: '100%'}}>
//         <View style={{
//           flexDirection: 'row'
//         }}>
//           {IconComponent !== null && IconComponent}
//           <Text style={styles.chartLabel}>{label}</Text>
//         </View>
//         <Divider style={{ ...styles.divider1, marginTop: 1 }} />
//       </View>
//     </View>
//   )
// }

// const DropDown = ({ setSelectedValue, dropdownItems, selectedValue, minWidth, open, setOpen, onpress  }: Dropdown) => {

//   const [_open, _setOpen] = useState(false);
//   const handleOnpress =(value: string)=>{
//     setSelectedValue(value);
//     onpress && onpress();
//     setOpen && setOpen(false);
//     _setOpen(false);
//   }

//   return (
//     <View>
//       <DropDownPicker
//         open={ open!==undefined? open : _open}
//         value={selectedValue}
//         items={dropdownItems}
//         setOpen={setOpen!==undefined? setOpen : _setOpen}
//         setValue={setSelectedValue}
//         autoScroll={false}
//         closeAfterSelecting={true}
//         scrollViewProps={{
//           scrollEnabled: true,
//           persistentScrollbar: false,
//         }}
//         maxHeight={200}
//         style={{ ...styles.dropdownPicker, minWidth: minWidth}}
//         renderListItem={
//           ({ label, value, IconComponent,  }) => {
//             return (
//               <Pressable onPress={()=>handleOnpress(value)}>
//                 <DropDownList IconComponent = {IconComponent} value={value} label={label} />
//               </Pressable>
//             )

//           }
//         }
//         labelStyle={styles.chartLabel}
//         dropDownContainerStyle={styles.dropdownListContainer}
//       />
//     </View>
//   );
// };

// export default DropDown;




// import React, { useState } from 'react';
// import { View, Text, Pressable, StyleSheet } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { styles } from '../style';
// import { DropDownListProps, DropdownProps } from '../types';
// import { Divider } from 'react-native-elements';
// import { hasValue } from '../utils';
// import { Dropdown, SelectCountry } from 'react-native-element-dropdown';



// const DropDownList = ({ value, label, IconComponent }: DropDownListProps) => {

//   return (
//     <View style={styles.dropdownItemContainer}>
//       <View style={{ width: '100%' }}>
//         <View style={{
//           flexDirection: 'row'
//         }}>
//           {IconComponent !== null && IconComponent}
//           <Text style={styles.chartLabel}>{label}</Text>
//         </View>
//         <Divider style={{ ...styles.divider1, marginTop: 1 }} />
//       </View>
//     </View>
//   )
// }
// const data = [
//   { label: 'Item 1', value: '1' },
//   { label: 'Item 2', value: '2' },
//   { label: 'Item 3', value: '3' },
//   { label: 'Item 4', value: '4' },
//   { label: 'Item 5', value: '5' },
//   { label: 'Item 6', value: '6' },
//   { label: 'Item 7', value: '7' },
//   { label: 'Item 8', value: '8' },
// ];
// const local_data = [
//   {
//     value: "1",
//     lable: "English",
//     image: {
//       source: require("../../assets/images/Pie.png"),
//     },
//   }
// ];
// const DropDown = ({ setSelectedValue, dropdownItems, selectedValue, minWidth, open, setOpen, onpress, leftIcon }: DropdownProps) => {

//   const [value, setValue] = useState<string | null>(null);
//   const [isFocus, setIsFocus] = useState(false);

//   const renderLabel = () => {
//     if (value || isFocus) {
//       return (
//         <Text style={[styles.label, isFocus && { color: 'blue' }]}>
//           Dropdown label
//         </Text>
//       );
//     }
//     return null;
//   };
//   console.log('dropdownItems', dropdownItems);
//   // const renderDropDownList = ({ value, label, IconComponent }: DropDownListProps) => {
//   const renderDropDownList = (item) => {
//     console.log('dropdownitemfsdfsdsdf', item);
//     const handlePressOnItem = () => {
//       onpress && onpress();
//     }
//     // const sendToParent = (data) => {
//     //   _props.func(data);
//     // }; 
//     return (
//       <Pressable onPress={handlePressOnItem}>
//         <View style={styles.dropdownItemContainer}>
//           <View style={{ width: '100%' }}>
//             <View style={{
//               flexDirection: 'row'
//             }}>
//               {/* {IconComponent !== null && IconComponent} */}
//               {/* <Text style={styles.chartLabel}>{label}</Text> */}
//               <Text style={styles.chartLabel}>{item.label}</Text>
//             </View>
//             <Divider style={{ ...styles.divider1, marginTop: 1 }} />
//           </View>
//         </View>
//       </Pressable>
//     )
//   }

//   return (
//     <View style={styles.container}>
//       {/* {renderLabel()} */}
//       {/* <Dropdown
//         style={{ ...styles.dropdownPicker, minWidth: minWidth }}
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.chartLabel}
//         itemTextStyle={styles.chartLabel}
//         // inputSearchStyle={styles.inputSearchStyle}
//         // iconStyle={styles.iconStyle}
//         data={dropdownItems}
//         maxHeight={300}
//         labelField="label"
//         valueField="value"
//         // placeholder={!isFocus ? 'Select item' : '...'}
//         value={value}
//         onFocus={() => setIsFocus(true)}
//         onBlur={() => setIsFocus(false)}
//         onChange={item => {
//           setValue(item.value);
//           setIsFocus(false);
//           onpress && onpress();
//         }}
//         containerStyle={styles.dropdownListContainer}
//         renderLeftIcon={() => leftIcon && leftIcon()}
//       // renderItem={renderDropDownList}
//       /> */}
//       <SelectCountry
//       style={{ ...styles1.dropdown}}
//       selectedTextStyle={styles.selectedTextStyle}
//       placeholderStyle={styles.placeholderStyle}
//       imageStyle={styles.imageStyle}
//       iconStyle={styles.iconStyle}
//       maxHeight={200}
//       value={value}
//       data={local_data}
//       valueField="value"
//       labelField="lable"
//       imageField="image"
//       onChange={(e) => {
//         setValue(e.value);
//         // sendToParent(e.value);
//       }}
//     />
//      {/* <SelectCountry 
//         style={{ ...styles.dropdownPicker, minWidth: minWidth }}
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.chartLabel}
//         itemTextStyle={styles.chartLabel}
//         // inputSearchStyle={styles.inputSearchStyle}
//         // iconStyle={styles.iconStyle}
//         data={local_data}
//         maxHeight={300}
//         valueField="value"
//         labelField="lable"
//         // placeholder={!isFocus ? 'Select item' : '...'}
//         value={value}
//         onFocus={() => setIsFocus(true)}
//         onBlur={() => setIsFocus(false)}
//         onChange={item => {
//           setValue(item.value);
//           setIsFocus(false);
//           onpress && onpress();
//         }}
//         containerStyle={styles.dropdownListContainer}
//         renderLeftIcon={() => leftIcon && leftIcon()}
//         imageField="Image"
//       // renderItem={renderDropDownList}
//       /> */}
//     </View>
//   );
// };

// export default DropDown;
// const styles1 = StyleSheet.create({
//   dropdown: {
//     margin: 16,
//     height: 50,
//     width: 150,
//     backgroundColor: '#EEEEEE',
//     borderRadius: 22,
//     paddingHorizontal: 8,
//   },
//   imageStyle: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
// })





import React, { useEffect, useState } from 'react';
import {
  I18nManager,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MuiIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-element-dropdown';
import { DropdownProps } from '../types';
import { size24, styles } from '../style';
const local_data = [
  {
    value: '1',
    lable: 'India',
    image: {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7tdv7EvQTq9b4q630tWtlsXw5--lzD2rh_5m8nIBMsw&s',
    },
  },
  {
    value: '2',
    lable: 'Romania',
    image: {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Romania.svg/800px-Flag_of_Romania.svg.png',
    },
  },
  {
    value: '3',
    lable: 'Israel',
    image: {
      uri: 'https://cdn.britannica.com/53/1753-004-03582EDA/Flag-Israel.jpg',
    },
  },
  {
    value: '4',
    lable: 'Sweden',
    image: {
      uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Romania.svg/800px-Flag_of_Romania.svg.png",
    },
  },
  {
    value: '5',
    lable: 'Bermuda',
    image: {
      uri: require('@/assets/images/Pie.png'),
    },
  },
];
const renderItem = (item: any) => {
  const isLocalImage = item && item.image && item.image.uri && typeof item.image.uri === 'string';
  return (
    <View style={{ flexDirection: 'row' }}>
      <Image
        source={isLocalImage ? item.image : item.image.uri}
        style={[styles.image]}
      />
      <Text>
        {item.lable}
      </Text>
    </View>
  );
};
const CustomeDropDown = ({ setSelectedValue, dropdownItems, selectedValue, minWidth, open, setOpen, onpress, leftIcon }: DropdownProps) => {
  const [country, setCountry] = useState('1');
  const [image, setImage] = useState<{ uri: string }>({ uri: '' })

  // useEffect(() => {
  //   console.log(image);
  // }, [image])

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
            source={image.uri}
            style={[styles.image]}
          />
        } else {
          return leftIcon && leftIcon()
        }
      }}
      // renderLeftIcon={}
      onChange={e => {
        setImage(e.image);
        console.log('imagesss', e.image);

        // setCountry(e.value);
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