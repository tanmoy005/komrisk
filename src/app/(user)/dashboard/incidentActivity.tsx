import { FlatList, Image, SafeAreaView, StyleSheet, View } from "react-native";

import IncidentActivityInfo from "@/src/components/GetIncidentActivityInfo";
import { styles } from "@/src/style";
// const Product = products[3];

const IncidentActivity = () => {
  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <View style={styles.imageContainer}>
        <Image style={{ width: 30 }} source={require('@/assets/images/Icons_Mo.png')} />
        <Image style={{ width: 100 }} source={require('@/assets/images/Komrisk-Logo-small.png')} />
      </View>
      <View style={styles.dashboardChartContainer}>
        <IncidentActivityInfo />
      </View>
    </SafeAreaView>
  );
};


export default IncidentActivity;