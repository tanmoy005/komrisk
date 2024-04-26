import React, { forwardRef } from 'react';
import { TouchableOpacity, Text, View, TextStyle, StyleProp } from 'react-native';
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
    const backgroundColor = (type === 'default' || type === 'md-default' || type === 'btnIcon' || type === 'sm') ? btnColor : 'transparent';
    let _color = '#fff';
    if (type !== 'default' && type !== 'md-default' && type !== 'btnIcon' && style?.color) {
      _color = style.color;
    } else if (type !== 'default' && type !== 'md-default' && type !== 'btnIcon') {
      _color = btnColor?? 'trans';
    }

    const btnTextStyle: StyleProp<TextStyle> = {
      color: _color,
      fontSize: style?.fontSize,
      fontWeight: '400',
      textAlign: 'center'
    };

    const handlePress = () => {
      Haptics.selectionAsync(); // Triggers a light haptic effect
      if (onPress) onPress(); // Call the passed onPress function if provided
    }; 
    
    let paddingHorizontal;
    let paddingVertical;
    let fontSize;
    let fontWeight;
    let borderRadius;
    let padding;
    let width;
    if (type === 'sm') {
      paddingVertical = 5;
      paddingHorizontal = 10;
      fontWeight = '400';
      fontSize = 12;
      borderRadius = 5;
    } else if (type === 'md-default' || type === 'md-outline') {
      padding = 10.5;
      fontWeight = '400';
      fontSize = 16;
      borderRadius = 5;
      width = 104;
    } else {
      paddingVertical = style?.paddingVertical;
      paddingHorizontal = style?.paddingHorizontal;
      fontWeight = style?.fontWeight;
      fontSize = style?.fontSize;
      borderRadius = style?.borderRadius;
      padding = style?.padding;
      width = style?.width;
    }

    return (
      <TouchableOpacity ref={ref} onPress={handlePress} {...touchableOpacityProps}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: backgroundColor,
          borderRadius: style?.borderRadius,
          borderColor: btnColor,
          borderWidth: 2,
          padding: style?.padding,
          paddingHorizontal: style?.paddingHorizontal,
          paddingVertical: style?.paddingVertical,
          width: style?.width,
          height: style?.height
        }}>
          {leftIcon && <Icon name={leftIcon} size={24} color={_color} />}
          {text && <Text style={btnTextStyle}>{text}</Text>}
          {icon && <Icon name={icon} size={style?.fontSize} color={_color} style={btnTextStyle} />}
        </View>
      </TouchableOpacity>
    );
  }
);

export default Button;
