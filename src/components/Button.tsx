import React, { forwardRef, useState } from 'react';
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
} & React.ComponentPropsWithoutRef<typeof TouchableOpacity>;

const Button = forwardRef<TouchableOpacity, ButtonProps>(
  ({ text, btnColor, icon, leftIcon, style, type = 'default', onPress, ...touchableOpacityProps }, ref) => {
    const [isPressed, setIsPressed] = useState(false);

    const defaultButtonColor = type === 'default' || type === 'md-default' || type === 'btnIcon' || type === 'sm' ? btnColor : 'transparent';
    const textColor = type !== 'default' && type !== 'md-default' && type !== 'btnIcon' && style?.color ? style.color : type == 'outline' ? btnColor : "#fff";

    const buttonStyle: StyleProp<ViewStyle> = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isPressed ? 'rgba(229, 227, 245, 1)' : defaultButtonColor,
      borderRadius: style?.borderRadius || 5,
      borderColor: btnColor,
      borderWidth: 2,
      padding: style?.padding || 10,
      paddingHorizontal: style?.paddingHorizontal || 10,
      paddingVertical: style?.paddingVertical || 5,
      width: style?.width,
      height: style?.height
    };
 console.log("================================Testcolor",textColor)
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
