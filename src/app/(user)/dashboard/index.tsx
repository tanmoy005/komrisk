import { FlatList, Image, SafeAreaView, StyleSheet, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import products from "@/assets/data/products";
import ProductListItem from "@/src/components/ProductListItem";
import PieChartData from "@/src/components/PieChart";
import { Card, Text } from 'react-native-elements';
import DropDown from "@/src/components/Dropdown";
// const Product = products[3];

const CenteredCard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        {/* <Text style={{fontSize: 10, color: 'red'}}>asfsdfsdf</Text> */}
        <Image style={{ width: 30 }} source={require('@/assets/images/Icons_Mo.png')} />
        <Image style={{ width: 100 }} source={require('@/assets/images/Komrisk-Logo-small.png')} />
        {/* <Image style={{ width: 50 }} source={'data:image/png;base64,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'} /> */}
      </View>
      <View style={styles.chartContainer}>
        <PieChartData />
        <View style={styles.chartSelctorContainer}>
          <Text>Chart Type</Text>
          <DropDown />
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white'
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30
  },
  chartSelctorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '75%'

  },
  chartContainer: {
    width: '100%',
    alignItems: 'center'
  },
  cardContainer: {
    width: '80%', // Adjust the width as needed
  },
});
export default CenteredCard;