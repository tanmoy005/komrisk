import { FlatList, StyleSheet, View } from "react-native";
import products from "@/assets/data/products";
import ProductListItem from "@/src/components/ProductListItem";
import PieChartData from "@/src/components/PieChart";
import { Card, Text } from 'react-native-elements';
// const Product = products[3];

const CenteredCard = () => {
  return (
    <View style={styles.container}>
      <PieChartData />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: '80%', // Adjust the width as needed
  },
});
export default CenteredCard;