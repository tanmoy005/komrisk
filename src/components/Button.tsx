import React, { forwardRef, useEffect, useState } from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle, StyleProp } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';

interface ButtonProps extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {
  text?: string;
  icon?: string;
  leftIcon?: string;
  opacity?:number;
  style?: {
    padding?: number;
    paddingVertical?: number;
    paddingHorizontal?: number;
    fontWeight?: string;
    fontSize?: number;
    borderRadius?: number;
    width?: number,
    height?: number;
    color?: string;
  };
  type?: 'default' | 'outline' | 'md-outline' | 'btnIcon' | 'md-default';
  btnColor?: string;
  selectedBtnColor?: string;

  selectedTextColor?: string;
  selected?: boolean;
  onPress?: () => void;
}

const Button = forwardRef<TouchableOpacity, ButtonProps>(({
  text,
  btnColor = '#000',
  icon,
  leftIcon,
  style,
  type = 'default',
  onPress,
  selected = false,
  selectedBtnColor = 'blue',
  selectedTextColor = 'white',
  ...touchableOpacityProps
}, ref) => {
  useEffect(() => {
    if (selected) {
      setDynamicStyles({
        backgroundColor: selectedBtnColor,
        textColor: selectedTextColor,
        borderColor: selectedBtnColor,
      });
    } else {
      setDynamicStyles({
        backgroundColor: type === 'outline' || type === 'md-outline' ? 'transparent' : btnColor,
        textColor: style?.color || (type === 'outline' || type === 'md-outline' ? btnColor : "#fff"),
        borderColor: btnColor,
      });
    }
  }, [selected, btnColor, style?.color, selectedBtnColor, selectedTextColor, type]);

  const [dynamicStyles, setDynamicStyles] = useState({
    backgroundColor: btnColor,
    textColor: style?.color || "#fff",
    borderColor: btnColor,
  });

  const buttonStyle: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: dynamicStyles.backgroundColor,
    borderRadius: style?.borderRadius || 5,
    borderColor: dynamicStyles.borderColor,
    borderWidth: 2,
    padding: style?.padding || 10,
    paddingHorizontal: style?.paddingHorizontal || 10,
    paddingVertical: style?.paddingVertical || 5,
    width: style?.width,
    height: style?.height
  };

  const textStyle: StyleProp<TextStyle> = {
    color: dynamicStyles.textColor,
    fontSize: style?.fontSize || 16,
    fontWeight: style?.fontWeight === 'bold' ? 'bold' : '400',
    textAlign: 'center'
};


  const handlePress = () => {
    Haptics.selectionAsync();
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity
      ref={ref}
      onPress={handlePress}
      style={buttonStyle}
      activeOpacity={0.7}
      {...touchableOpacityProps}
    >
      {leftIcon && <Icon name={leftIcon} size={24} color={dynamicStyles.textColor} />}
      {text && <Text style={textStyle}>{text}</Text>}
      {icon && <Icon name={icon} size={style?.fontSize} color={dynamicStyles.textColor} />}
    </TouchableOpacity>
  );
});

export default Button;
