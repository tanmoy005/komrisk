import { View } from "@/src/components/Themed";
import CardContainer from "@/src/components/cards/CardContainer";
import CardTextContainer from "@/src/components/cards/CardTextContainer";
import TaskCard from "@/src/components/cards/TaskCard";
import ChartItemSkelton from "@/src/components/skelton/ChartItemSkelton";
import { styles } from "@/src/style";
import { IncidentChartListDataItem } from "@/src/types";
import { router } from "expo-router";
import { Pressable } from "react-native";


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
