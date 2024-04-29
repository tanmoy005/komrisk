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
  onPress?: () => void;
  selected?: boolean;
} & React.ComponentPropsWithoutRef<typeof TouchableOpacity>;

const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ text, btnColor, icon, leftIcon, style, type = 'default', onPress, selected, ...touchableOpacityProps }, ref) => {
    const [isPressed, setIsPressed] = useState<boolean>(false);
    const [isSelected, setIsSelected] = useState<boolean>(selected ?? false);
    const defaultButtonColor = type === 'default' || type === 'md-default' || type === 'btnIcon' || type === 'sm' ? btnColor : 'transparent';
    const textColor = type !== 'default' && type !== 'md-default' && type !== 'btnIcon' && style?.color ? style.color : type == 'outline' ? btnColor : "#fff";

    // State to handle dynamic color changes based on selected and pressed state
    const [dynamicBackgroundColor, setDynamicBackgroundColor] = useState(btnColor);

    // Effect to update the background color based on isSelected and isPressed
    useEffect(() => {
      if (isSelected) {
        setDynamicBackgroundColor('rgba(229, 227, 245, 1)');  // Selected state color
      } else if (isPressed) {
        setDynamicBackgroundColor('rgba(180, 180, 250, 1)'); // Pressed state color
      } else {
        setDynamicBackgroundColor(defaultButtonColor);  // Default color
      }
    }, [isSelected, isPressed, defaultButtonColor]);

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
    console.log("================================Testcolor", textColor)
    const textStyle: StyleProp<TextStyle> = {
      color: textColor,
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
        style={[buttonStyle, isPressed ? { backgroundColor: 'rgba(229, 227, 245, 1)' } : {}]}
        {...touchableOpacityProps}
      >
        {leftIcon && <Icon name={leftIcon} size={24} color={textColor} />}
        {text && <Text style={textStyle}>{text}</Text>}
        {icon && <Icon name={icon} size={style?.fontSize} color={textColor} />}
      </TouchableOpacity>
    );
  }
);

export default Button;
