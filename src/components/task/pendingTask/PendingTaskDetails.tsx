// import { StyleSheet, Pressable } from "react-native";
// import { ChartListDataItem, PendingTask } from "@/src/types";
// import { Link, router } from "expo-router";
// import { View } from "../../Themed";
// import ChartItemSkelton from "../../skelton/ChartItemSkelton";
// import TaskCard from "../../cards/TaskCard";
// import { styles } from "../../../style";
// import CardContainer from "../../cards/CardContainer";
// import CardTextContainer from "../../cards/CardTextContainer";
// import React, { memo } from 'react';

// type PendingTaskDetailsProps = {
//   data: PendingTask
// }
// const isObjectEmpty = (objectName: ChartListDataItem) => {
//   return Object.keys(objectName).length === 0
// }



// const PendingTaskDetails  = memo(({ data }: PendingTaskDetailsProps) => {
//   const { taskName, description, dueDate, owner, reviewer, Assignee, taskId, activities } = data
//   const taskCardData = {
//     firstSection: {
//       heading: "Task Name",
//       description: taskName
//     },
//     secondSection: {
//       heading: 'Last Activity',
//       description: activities[activities.length -1]?.type
//     },
//     thirdSection: {
//       dateHeading: 'Actual Completion Date',
//       date: dueDate,
//       sectionRight: [
//         {
//           taskDesg: 'Owner',
//           name: owner,
//           pic: null
//         },
//         {
//           taskDesg: 'Reviewer',
//           name: reviewer,
//           pic: null
//         },
//         {
//           taskDesg: 'Assignee',
//           name: Assignee,
//           pic: null
//         }
//       ]
//     }
//   }
//   // const taskCardData

//   return (
//     <View >
//       {
//         !isObjectEmpty(data) ?
//           // <Link href={`/chartReport/id`} asChild>

//           <Pressable
//             onPress={() => router.push({
//                 pathname: `/task/[id]`,
//               params: {
//                 type: "PendingTask",
//                 id: taskId
            
//               }
//             } as never)}
//           >
//             <TaskCard
//               taskCard={taskCardData}
//             />
//           </Pressable>
//           // </Link>
//           :
//           <View style={styles.taskCard}>
//             <CardContainer>
//               <CardTextContainer>
//                 <ChartItemSkelton />
//               </CardTextContainer>
//             </CardContainer>
//           </View>
//       }
//     </View>
//   );
// });

// export default PendingTaskDetails;


import { StyleSheet, Pressable } from "react-native";
import { ChartListDataItem, PendingTask } from "@/src/types";
import { Link, router } from "expo-router";
import { View } from "../../Themed";
import { Text } from 'react-native';
import ChartItemSkelton from "../../skelton/ChartItemSkelton";
import TaskCard from "../../cards/TaskCard";
import { styles } from "../../../style";
import CardContainer from "../../cards/CardContainer";
import CardTextContainer from "../../cards/CardTextContainer";
import React, { memo } from 'react';
import { TaskListDataItem } from "@/src/types";

interface PendingTaskDetailsProps {
  data: TaskListDataItem;
}
const isObjectEmpty = (objectName: TaskListDataItem) => {
  return Object.keys(objectName).length === 0
}



//const PendingTaskDetails  = memo(({ data }: PendingTaskDetailsProps) => {
  const PendingTaskDetails  = (({ data }: PendingTaskDetailsProps) => {

    console.log("pending data got",data);
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
                task_desc: data.description ,
                compliance_id:  data.complianceId ,
                name_of_law:  data.nameOfLaw ,
                task_name:  data.taskName ,
                map_id: data.mapId ,
                due_date:data.dueDate
            
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

// export default PendingTaskDetails;

  export default PendingTaskDetails;