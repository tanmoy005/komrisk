
import React, { memo } from 'react';
import { Pressable } from "react-native";
import { ChartListDataItem } from "@/src/types";
import { router } from "expo-router";
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
const ComplianceTaskDetails = memo(({ data }: ChartItemProps) => {
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

  return (
    <View >
      {
        !isObjectEmpty(data) ?
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
});

export default ComplianceTaskDetails;
