import { View } from "@/src/components/Themed";
import CardContainer from "@/src/components/cards/CardContainer";
import CardTextContainer from "@/src/components/cards/CardTextContainer";
import TaskCard from "@/src/components/cards/TaskCard";
import ChartItemSkelton from "@/src/components/skelton/ChartItemSkelton";
import { styles } from "@/src/style";
import { ChartListDataItem } from "@/src/types";
import { router } from "expo-router";
import React, { memo } from 'react';
import { Pressable } from "react-native";

type ChartItemProps = {
  data: ChartListDataItem;
};

const isObjectEmpty = (objectName: ChartListDataItem) => {
  return Object.keys(objectName).length === 0;
};

const ComplianceTaskDetails = memo(({ data }: ChartItemProps) => {
  const { taskName = "No Task Name Available", description = "No Description Available", dueDate = "No Due Date Available", owner = "No Owner Available", reviewer = "No Reviewer Available", complianceId } = data;

  const taskCardData = {
    firstSection: {
      heading: "Task Name",
      description: taskName,
    },
    secondSection: {
      heading: "Description",
      description: description,
    },
    thirdSection: {
      dateHeading: "Due Date",
      date: dueDate,
      sectionRight: [
        {
          taskDesg: "Owner",
          name: owner,
          pic: null, // Assuming pic is not used currently
        },
        {
          taskDesg: "Reviewer",
          name: reviewer,
          pic: null, // Assuming pic is not used currently
        },
      ],
    },
  };

  const navigateToChartReport = () => {
    router.push({
      pathname: `/chartReport/${complianceId}`,
      params: {
        type: "COMPLIANCE",
        taskId: 0, // Adjust taskId as needed
      },
    } as never);
  };

  return (
    <View>
      {!isObjectEmpty(data) ? (
        <Pressable onPress={navigateToChartReport}>
          <TaskCard taskCard={taskCardData} />
        </Pressable>
      ) : (
        <View style={styles.taskCard}>
          <CardContainer>
            <CardTextContainer>
              <ChartItemSkelton />
            </CardTextContainer>
          </CardContainer>
        </View>
      )}
    </View>
  );
});

export default ComplianceTaskDetails;
