const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    primary: '#A097DC29',
    secondary:'#94287B14',
    btnPrimary: {
      backgroundColor: '#A097DC',
      paddingVertical: 20,
      paddingHorizontal: 48,
      fontWeight: '400',
      fontSize: 16,
      borderRadius: 5
    }
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
