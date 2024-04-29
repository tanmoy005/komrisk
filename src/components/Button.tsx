import React, { forwardRef, useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, TextStyle, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';

type ButtonProps = {
  text?: string;
  icon?: string;
  leftIcon?: string;
  style?: {
    padding?: number;
    paddingVertical?: number;
    paddingHorizontal?: number;
    fontWeight?: string;
    fontSize?: number;
    borderRadius?: number;
    width?: number,
    height?: number
    color?: string;
  };
  type?: string;
  btnColor?: string;
  selectedBtnColor?: string;
  selectedTextColor?: string;
  onPress?: () => void;
  selected?: boolean;
} & React.ComponentPropsWithoutRef<typeof TouchableOpacity>;

const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ text,
    btnColor: defaultbtnColor,
    icon,
    leftIcon,
    style,
    type = 'default',
    onPress,
    selected,
    selectedBtnColor,
    selectedTextColor,
    ...touchableOpacityProps }, ref) => {
    const [isPressed, setIsPressed] = useState<boolean>(false);
    // const [isSelected, setIsSelected] = useState<boolean>(selected ?? false);
    const [btnColor, setbtncolor] = useState(defaultbtnColor);

    const defaultButtonColor = type === 'default' || type === 'md-default' || type === 'btnIcon' || type === 'sm' ? btnColor : 'transparent';
    console.log('type8877', type);
    console.log('defaultButtonColor', defaultButtonColor);

    const textColor = type !== 'default' && type !== 'md-default' && type !== 'btnIcon' && style?.color ? style.color : (type === 'outline' || type === 'md-outline') ? btnColor : "#fff";

    // State to handle dynamic color changes based on selected and pressed state
    const [dynamicBackgroundColor, setDynamicBackgroundColor] = useState(btnColor);
    const [dynamicTextColor, setDynamicTextColor] = useState(textColor);

    // Effect to update the background color based on isSelected and isPressed

    useEffect(() => {
      console.log("isSelected", selected);

      if (selected) {
        setDynamicBackgroundColor(selectedBtnColor);  // Selected state color
        setDynamicTextColor(selectedTextColor);
        //setbtncolor('rgba(229, 227, 245, 1)');  // Selected state color
      } else if (isPressed) {
        setDynamicTextColor('#26262C')
        // if (btnColor === '#A097DC') {
        //   console.log('btnColorwww', btnColor);
        //   console.log('sdfsdfsadfsdfsdf');
        //   console.log('');
        if (type === 'outline' || type === 'md-outline') {
          setDynamicBackgroundColor(defaultButtonColor); // Pressed state color
        } else {
          setDynamicBackgroundColor('#E5E3F5');
        }
        //   setbtncolor('rgba(201, 196, 235, 1)'); // Pressed state color
        //   setDynamicTextColor('rgba(38, 38, 44, 1)');
        // }

      } else {
        setDynamicBackgroundColor(defaultButtonColor);

        // setbtncolor(defaultButtonColor);
        setDynamicTextColor(textColor)// Default color
      }
    }, [selected, isPressed, defaultButtonColor]);

    const buttonStyle: StyleProp<ViewStyle> = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: dynamicBackgroundColor,
      borderRadius: style?.borderRadius || 5,
      borderColor: btnColor,
      borderWidth: 2,
      padding: style?.padding || 10,
      paddingHorizontal: style?.paddingHorizontal || 10,
      paddingVertical: style?.paddingVertical || 5,
      width: style?.width,
      height: style?.height
    };
    console.log("================================Testcolor", textColor);
    console.log('dynamicTextColor', dynamicTextColor);

    const textStyle: StyleProp<TextStyle> = {
      color: dynamicTextColor,
      fontSize: style?.fontSize || 16,
      fontWeight: style?.fontWeight ?? '400',
      textAlign: 'center'
    };

    const handlePressIn = () => {
      setIsPressed(true);
      Haptics.selectionAsync(); // Trigger haptic feedback on press
    };

    const handlePressOut = () => {
      setIsPressed(false);
      if (onPress) onPress();
    };

    return (
      <TouchableOpacity
        ref={ref}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={buttonStyle}
        activeOpacity={0.5}
        {...touchableOpacityProps}
      >
        {leftIcon && <Icon name={leftIcon} size={24} color={dynamicTextColor} />}
        {text && <Text style={textStyle}>{text}</Text>}
        {icon && <Icon name={icon} size={style?.fontSize} color={textColor} />}
      </TouchableOpacity>
    );
  }
);

export default Button;
