import { StyleSheet, Pressable } from "react-native";
import { IncidentChartListDataItem } from "@/src/types";
import { Link, router } from "expo-router";
import { View } from "../Themed";
import ChartItemSkelton from "../skelton/ChartItemSkelton";
import TaskCard from "../cards/TaskCard";
import { styles } from "../../style";
import CardContainer from "../cards/CardContainer";
import CardTextContainer from "../cards/CardTextContainer";


type ChartItemProps = {
  data: IncidentChartListDataItem
}
const isObjectEmpty = (objectName: IncidentChartListDataItem) => {
  return Object.keys(objectName).length === 0
}
interface NavigateChartList {
  pathname: string;
  params: ChartItemProps
}
const IncidentTaskDetails = ({ data }: ChartItemProps) => {
  const { taskName, description, completionDate, owner, reviewer } = data
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
      dateHeading: 'Actual Completion Date',
      date: completionDate,
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
  const paramdata= {
    type: "INCIDENT",
    id: data?.incidentId,
    taskId: data?.taskId
  }
  const id = ['INCIDENT', data?.incidentId, data?.taskId]

  return (
    <View >
      {
        !isObjectEmpty(data) ?

          // <Link
            // href={`/chartReport/${id}`} asChild>
            <Pressable
              onPress={() => router.push({
                pathname: `/chartReport/[id]`,
                params: paramdata
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

export default IncidentTaskDetails;
