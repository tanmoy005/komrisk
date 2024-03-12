import { Image, StyleSheet, Text, Pressable } from "react-native";
import Colors from "@/src/constants/Colors";
import { ChartListDataItem, Product } from "@/src/types";
import { Link, useSegments } from "expo-router";
import { View } from "./Themed";
// import ProductDetailsView from "@/src/app/(tabs)/menu/[id]";

type ChartItemProps = {
  data: ChartListDataItem
}
const ChartListItem = ({ data }: ChartItemProps) => {
  // const segments=useSegments();
  // console.log(segments);

  return (
    // <Link href={`./menu/${data.id}`} asChild>
    <Link href={`./${data.complianceId}`} asChild>
      <Pressable style={styles.rowContainer}>
        <View >
          <Text style={styles.title}>Name : {data.taskName}</Text>
          <Text style={styles.text}>Op Unit : {data.opUnit} </Text>
          <Text style={styles.text}>Department : {data.department === null ? "NA" : data.department}</Text>
          <Text style={styles.subtitleContainer}>Description : {data.description === null ? "NA" : data.description}</Text>

        </View>
      </Pressable>
    </Link>
  );
};

export default ChartListItem;

const styles = StyleSheet.create({
  rowContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 10,
    // flex: 1,
    // flexDirection: 'column',
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
