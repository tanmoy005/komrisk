import { StyleSheet, Pressable } from "react-native";
import { ChartListDataItem } from "@/src/types";
import { Link } from "expo-router";
import { View } from "./Themed";
import ChartItemSkelton from "./skelton/ChartItemSkelton";
import TaskCard from "./cards/TaskCard";

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

  const { taskName, description, dueDate, owner, reviewer } = data
  const taskCardData = {
    firstSection: {
      heading: "Task Name",
      description: taskName
    },
    secondSection: {
      heading: 'Description',
      description: description
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

  return (
    <View style={styles.rowContainer}>
      {
        !isObjectEmpty(data) ?
          <Link href={`/chartReport/${data?.complianceId}`} asChild>
            <Pressable>
              <TaskCard
                taskCard={taskCardData}
              />
            </Pressable>
          </Link>
          :
          <ChartItemSkelton />
      }
    </View>
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