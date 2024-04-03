import { Image, StyleSheet, Text, Pressable } from "react-native";
import Colors from "@/src/constants/Colors";
import { ChartListDataItem } from "@/src/types";
import { Link, useSegments } from "expo-router";
import { View } from "./Themed";
import ChartItemSkelton from "./skelton/ChartItemSkelton";

// import { Skeleton } from "moti/skeleton";
// import ProductDetailsView from "@/src/app/(tabs)/menu/[id]";

type ChartItemProps = {
  data: ChartListDataItem
}
const isObjectEmpty = (objectName: ChartListDataItem) => {
  return Object.keys(objectName).length === 0
}
const ChartListItem = ({ data }: ChartItemProps) => {

  return (
    // <Link href={`./menu/${data.id}`} asChild>
    <Link href={`./${data.complianceId}`} asChild>
      <Pressable style={styles.rowContainer}>
        <View>
          {
            !isObjectEmpty(data) ?
              <View>
                <Text style={styles.title}>Name : {data.taskName}</Text>
                <Text style={styles.text}>Op Unit : {data.opUnit} </Text>
                <Text style={styles.text}>Department : {data.department === null ? "NA" : data.department}</Text>
                <Text style={styles.subtitleContainer}>Description : {data.description === null ? "NA" : data.description}</Text>
              </View>
              :
              <ChartItemSkelton />
          }
          {/* <ChartItemSkelton /> */}
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
    width: '100%',
    flex: 1,
    flexDirection: 'column',
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

const styles2 = StyleSheet.create({
  shape: {
    justifyContent: 'center',
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  padded: {
    padding: 16,
  },
});