import { Image, StyleSheet, Text, Pressable } from "react-native";
import { ChartListDataItem } from "@/src/types";
import { Link, router } from "expo-router";
import { View } from "./Themed";
import ChartItemSkelton from "./skelton/ChartItemSkelton";
import TaskCard from "./cards/TaskCard";
import { useEffect } from "react";
import { hasValue } from "../utils";

// import { Skeleton } from "moti/skeleton";
// import ProductDetailsView from "@/src/app/(tabs)/menu/[id]";

type ChartItemProps = {
  data: ChartListDataItem
}
const isObjectEmpty = (objectName: ChartListDataItem) => {
  return Object.keys(objectName).length === 0
}
interface NavigateChartList {
  pathname: string;
  params: ChartItemProps
}
const ChartListItem = ({ data }: ChartItemProps) => {
  console.log('data22223', data.complianceGenId);
  
  const dataToSttring = JSON.stringify(data);
  console.log('data45345345', dataToSttring);
  
  const navigateToChartList = () => {
    router.push({ pathname: `/chartReport/ShowDetailsReport`, params: { data: hasValue(data)?  JSON.stringify(data): ""} }); // Remove the braces in para
  }
  const { taskName, description, dueDate, owner, reviewer } = data
  const taskCardData = {
    firstSection: {
      heading: taskName,
      description: description
    },
    secondSection: {
      heading: null,
      description: null
    },
    thirdSection: {
      dateHeading: 'Due date',
      date: dueDate,
      sectionRight: [
        {
          taskDesg: 'Owner',
          name: owner,
          pic: null
        },
        {
          taskDesg: 'Reviewer',
          name: reviewer,
          pic: null
        },
        // {
        //   taskDesg: 'Assignee',
        //   name: 'Owner',
        //   pic: null
        // }
      ]
    }
  }
  // const taskCardData
  useEffect(() => {
    console.log('datauser', data);

  }, [data])
  console.log('data.complianceId', data.complianceId);

  return (
    // <Link href={`./menu/${data.id}`} asChild>
    // <Link href={`./chartReport/GetActivityStatusDataListDetailsInfo`} asChild>
    <Link href={`./${data.complianceId}`} asChild>
      <Pressable style={styles.rowContainer}>
        <View>
          {
            !isObjectEmpty(data) ?
              <Pressable onPress={navigateToChartList}>
                <TaskCard
                  taskCard={taskCardData}
                />
              </Pressable>
              :
              <ChartItemSkelton />
          }
          {/* <ChevronsAccordian title="Native development" descriptions={'string'}>
            <Text>React Native lets you create truly native apps and
              doesn't compromise your users' experiences. It provides a core set of platform
              agnostic native components </Text>
          </ChevronsAccordian> */}
          {/* <CommentAccordian title="Native development" descriptions={'string'}>
            <Text>React Native lets you create truly native apps and
              doesn't compromise your users' experiences. It provides a core set of platform
              agnostic native components </Text>
          </CommentAccordian> */}
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