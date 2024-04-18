import { StyleSheet, Pressable } from "react-native";
import { ChartListDataItem } from "@/src/types";
import { Link, router } from "expo-router";
import { View } from "../Themed";
import ChartItemSkelton from "../skelton/ChartItemSkelton";
import TaskCard from "../cards/TaskCard";
import { styles } from "../../style";
import CardContainer from "../cards/CardContainer";
import CardTextContainer from "../cards/CardTextContainer";

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
const ComplianceTaskDetails = ({ data }: ChartItemProps) => {

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
        }
      ]
    }
  }
  // const taskCardData
  const id = ['COMPLIANCE', data?.complianceId]

  return (
    <View >
      {
        !isObjectEmpty(data) ?
          <Link href={`/chartReport/${id}`} asChild>

            <Pressable
            // onPress={() => router.push({
            //   pathname: "/chartReport/[id]",
            //   params: {
            //     id: "chartReport"
            //   }
            // })}
            >
              <TaskCard
                taskCard={taskCardData}
              />
            </Pressable>
          </Link>
          :
          <View style={styles.taskCard}>
            <CardContainer>
              <CardTextContainer>
                <ChartItemSkelton />
              </CardTextContainer>
            </CardContainer>
          </View>
      }
    </View>
  );
};

export default ComplianceTaskDetails;
