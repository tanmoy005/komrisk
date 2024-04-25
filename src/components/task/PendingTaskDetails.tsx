import { StyleSheet, Pressable } from "react-native";
import { ChartListDataItem, PendinTask } from "@/src/types";
import { Link, router } from "expo-router";
import { View } from "../Themed";
import ChartItemSkelton from "../skelton/ChartItemSkelton";
import TaskCard from "../cards/TaskCard";
import { styles } from "../../style";
import CardContainer from "../cards/CardContainer";
import CardTextContainer from "../cards/CardTextContainer";

type PendingTaskDetailsProps = {
  data: PendinTask
}
const isObjectEmpty = (objectName: ChartListDataItem) => {
  return Object.keys(objectName).length === 0
}

const PendingTaskDetails = ({ data }: PendingTaskDetailsProps) => {

  const { taskName, description, dueDate, owner, reviewer, Assignee } = data
  const taskCardData = {
    firstSection: {
      heading: "Task Name",
      description: taskName
    },
    secondSection: {
      heading: 'Last Activity',
      description: 'description'
    },
    thirdSection: {
      dateHeading: 'Actual Completion Date',
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
        {
          taskDesg: 'Assignee',
          name: Assignee,
          pic: null
        }
      ]
    }
  }
  // const taskCardData

  return (
    <View >
      {
        !isObjectEmpty(data) ?
          // <Link href={`/chartReport/id`} asChild>

          <Pressable
            onPress={() => router.push({
              pathname: `/chartReport/[id]`,
              params: {
                type: "COMPLIANCE",
                id: data?.complianceId,
                taskId: 0,
              }
            } as never)}
          >
            <TaskCard
              taskCard={taskCardData}
            />
          </Pressable>
          // </Link>
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

export default PendingTaskDetails;
