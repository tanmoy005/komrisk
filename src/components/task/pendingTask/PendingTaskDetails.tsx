
import { View } from "@/src/components/Themed";
import CardContainer from "@/src/components/cards/CardContainer";
import CardTextContainer from "@/src/components/cards/CardTextContainer";
import TaskCard from "@/src/components/cards/TaskCard";
import ChartItemSkelton from "@/src/components/skelton/ChartItemSkelton";
import { styles } from "@/src/style";
import { TaskListDataItem } from "@/src/types";
import { router } from "expo-router";
import React from 'react';
import { Pressable } from "react-native";

interface PendingTaskDetailsProps {
  data: TaskListDataItem;
  taskType: string
}
const isObjectEmpty = (objectName: TaskListDataItem) => {
  return Object.keys(objectName).length === 0
}



  //const PendingTaskDetails  = memo(({ data,taskType }: PendingTaskDetailsProps) => {
  const PendingTaskDetails  = (({ data,taskType }: PendingTaskDetailsProps) => {


    
    const { taskName, description, dueDate, owner, reviewer,
      mapId,complianceId,title,nameOfLaw,department,opUnit,
      currOwner,impact, status,taskId,complianceGenId  } = data
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

  return (
    <View >
      {
        !isObjectEmpty(data) ?
          // <Link href={`/chartReport/id`} asChild>

          <Pressable
            onPress={() => router.push({
                pathname: `/task/[id]`,
              params: {
                type: "TaskListDataItem",                
                task_id:  data.taskId ,                               
                compliance_id:  data.complianceId ,
                map_id: data.mapId ,
                task_type: taskType, // Include taskType here

            
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
});

export default PendingTaskDetails;