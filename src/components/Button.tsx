import { Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '@/src/constants/Colors';
import { forwardRef } from 'react';

type ButtonProps = {
  text: string;
  style?: {
    padding?: number;
    paddingVertical?: number;
    paddingHorizontal?: number;
    fontWeight?: string;
    fontSize?: number;
    borderRadius?: number;
  };
  type?: string;
  btnColor?: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps>(
  ({ text, btnColor, style, type = 'default', ...pressableProps }, ref) => {

    const backgroundColor = type === 'default' ? btnColor : 'transparent';
    const color = type === 'default' ? '#fff' : btnColor;

    return (
      <Pressable ref={ref} {...pressableProps} >
        <View style={{
          paddingVertical: style?.paddingVertical,
          paddingHorizontal: style?.paddingHorizontal,
          padding: style?.padding,
          backgroundColor: backgroundColor,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: btnColor,
          borderRadius: style?.borderRadius
        }}>
          <Text style={
            {
              color: color,
              fontSize: style?.fontSize,
              fontWeight: '400',
              textAlign: 'center'
            }
          }>{text}</Text>
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