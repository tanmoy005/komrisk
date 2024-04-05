import { FlatList, Image, SafeAreaView, StyleSheet, View } from "react-native";
import ActivityStatusInfo from "@/src/components/GetActivityStatusInfo";
import { styles } from "@/src/style";
// const Product = products[3];

const ActivityStatus = () => {
  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <View style={styles.imageContainer}>
        <Image style={{ width: 30 }} source={require('@/assets/images/Icons_Mo.png')} />
        <Image style={{ width: 100 }} source={require('@/assets/images/Komrisk-Logo-small.png')} />
      </View>
      <View style={styles.dashboardChartContainer}>
        <ActivityStatusInfo />
      </View>
    </SafeAreaView>
  );
};

export default ActivityStatus;