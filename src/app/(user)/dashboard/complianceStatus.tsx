import { FlatList, Image, SafeAreaView, StyleSheet, View } from "react-native";

import ComplianceStatusInfo from "@/src/components/GetComplianceStatusInfo";
import { styles } from "@/src/style";
// const Product = products[3];

const ComplianceStatus = () => {
  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <View style={styles.imageContainer}>
        <Image style={{ width: 30 }} source={require('@/assets/images/Icons_Mo.png')} />
        <Image style={{ width: 100 }} source={require('@/assets/images/Komrisk-Logo-small.png')} />
      </View>
      <View style={styles.dashboardChartContainer}>
        <ComplianceStatusInfo />
      </View>
    </SafeAreaView>
  );
};


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: 'white'
//   },
//   imageContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginBottom: 30
//   },
//   chartSelctorContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '75%'

//   },
//   chartContainer: {
//     width: '100%',
//     alignItems: 'center',
//     marginTop: 75
//   },
//   cardContainer: {
//     width: '80%', // Adjust the width as needed
//   },
// });
export default ComplianceStatus;