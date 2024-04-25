import { Pressable, StyleProp, Text, TextStyle, View } from 'react-native';
import { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


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
} & React.ComponentPropsWithoutRef<typeof Pressable>;


const Button = forwardRef<View | null, ButtonProps>(
  ({ text, btnColor, icon, leftIcon, style, type = 'default', ...pressableProps }, ref) => {

    const backgroundColor = (type === 'default' || type === 'md-default' || type === 'btnIcon' || type === 'sm') ? btnColor : 'transparent';
    let _color;
    // console.log('style?.color', style?.color);

    if (type === 'default' || type === 'md-default' || type === 'btnIcon') {
      _color = '#fff';
    } else if (style?.color) {
      _color = style.color;
    } else {
      _color = btnColor;
    }
    // console.log('_color', _color);

    // const _color = (type === 'default' || 'btnIcon') ? '#fff' : btnColor;
    const btnTextStyle: StyleProp<TextStyle> = {
      color: _color,
      fontSize: style?.fontSize,
      fontWeight: '400',
      textAlign: 'center'
    }

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
    } else if (type === 'md-default') {
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
      <Pressable ref={ref} {...pressableProps} >
        <View style={{
          paddingVertical: paddingVertical,
          paddingHorizontal: paddingHorizontal,
          padding: padding,
          backgroundColor: backgroundColor,
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: btnColor,
          borderRadius: borderRadius,
          width: style?.width,
          height: style?.height,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {
            leftIcon &&
            <Icon name={leftIcon}
              size={24} color={_color}
            />
          }
          {
            text &&
            <Text style={btnTextStyle}>{text}</Text>
          }
          {
            icon &&
            <Icon name={icon}
              size={style?.fontSize} color={_color}
              style={btnTextStyle}
            />
          }
        </View>
      </Pressable>
    );
  }
);

export default Button;