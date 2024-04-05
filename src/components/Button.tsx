import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import Colors from '@/src/constants/Colors';
import { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { smFont } from '../style';


type ButtonProps = {
  text?: string;
  icon?: string;
  style?: {
    padding?: number;
    paddingVertical?: number;
    paddingHorizontal?: number;
    fontWeight?: string;
    fontSize?: number;
    borderRadius?: number;
    width?: number,
    height?: number
  };
  type?: string;
  btnColor?: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;


const Button = forwardRef<View | null, ButtonProps>(
  ({ text, btnColor, icon, style, type = 'default', ...pressableProps }, ref) => {

    const backgroundColor = (type === 'default' || 'btnIcon') ? btnColor : 'transparent';
    const color = (type === 'default' || 'btnIcon') ? '#fff' : btnColor;
    const btnTextStyle: StyleProp<TextStyle> = {
      color: color,
      fontSize: style?.fontSize,
      fontWeight: '400',
      textAlign: 'center'
    }

    return (
      <Pressable ref={ref} {...pressableProps} >
        <View style={{
          paddingVertical: style?.paddingVertical,
          paddingHorizontal: style?.paddingHorizontal,
          padding: style?.padding,
          backgroundColor: backgroundColor,
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: btnColor,
          borderRadius: style?.borderRadius,
          width: style?.width,
          height: style?.height,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {
            text &&
            <Text style={btnTextStyle}>{text}</Text>
          }
          {
            icon &&
            <Icon name={icon}
              size={style?.fontSize} color={color}
              style={btnTextStyle}
            />
          }
        </View>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    // backgroundColor: Colors.light.tint,
    padding: 15,
    alignItems: 'center',
    borderRadius: 100,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default Button;