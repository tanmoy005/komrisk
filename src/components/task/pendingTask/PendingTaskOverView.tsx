// import React from 'react'
// import CardContainer from '../../cards/CardContainer'
// import { SmallHeading } from '../../headings/SmallHeading'
// import ChevronsAccordian2 from '../../accordians/ChevronsAccordian2'
// import PendingTaskAccordianBody from '../PendingTaskAccordianBody'
// import Seperator24 from '../../seperators/Seperator24'
// import LastActivityAccordianBody from '../LastActivityAccordianBody'
// import AccordianCommonHeader from '../../accordians/AccordianCommonHeader'
// import { PendingTaskOverViewProps } from '@/src/types'
// import { screenHeight } from '@/src/style'
// import { ScrollView } from 'react-native'
// import { useDispatch, useSelector} from 'react-redux';
// import { RootState } from '@/src/store';
// import { useState,useEffect } from 'react'

// const PendingTaskOverView = ({ pendingTaskDetails,shortDescription, lastActivitycomments,commentText, setCommentText, setShortDescription}: PendingTaskOverViewProps) => {

//     const [taskid, setTaskId] = useState(307)

//     const comments = useSelector((state: RootState) => state.comments.commentsList);

//     console.log("pendingTaskDetails got",pendingTaskDetails);
    

//     useEffect(() => {
//         // You can access the comments array here
//         const filteredComments = comments.filter(comment => comment[0].taskID === taskid);

//         if (filteredComments.length != 0) {

//             setCommentText(filteredComments[0][0].commentText);

//         }
//     }, [taskid]);
 
//     // const commentText = filteredComments[0][0].commentText; // Extract comment text
//     // setCommentText(commentText);
      


    
//     return (


//         <CardContainer  >
//             <ScrollView style={{ height: screenHeight * 0.60 }} showsVerticalScrollIndicator={false}>
//                 <SmallHeading>Task Details</SmallHeading>
//                 <ChevronsAccordian2
//                     title={'Task Name'}
//                     descriptions={pendingTaskDetails.task_name}
//                 >
//                     <PendingTaskAccordianBody
//                         pendingTaskDetails={pendingTaskDetails}
//                     />
//                 </ChevronsAccordian2>
//                 <Seperator24 />
//                 {/* <SmallHeading>Activity</SmallHeading> */}
//                 {/* <ChevronsAccordian2
//                     title={'Last Activity'}
//                     descriptions={`${pendingTaskDetails.lastActivity.updatedBy} added comments`}
//                 >
//                     <LastActivityAccordianBody
//                         // pendingTaskDetails={pendingTaskDetails}
//                         comments={lastActivitycomments}
//                     />
//                 </ChevronsAccordian2> */}
//                 <Seperator24 />
//                 <SmallHeading>Comments</SmallHeading>
//                 <AccordianCommonHeader
//                     title="Last Comment"
//                     descriptions= {shortDescription}
//                     icons={{ open: 'open-icon-name', close: 'close-icon-name' }}
//                     type="comment"
//                     taskId={307}
//                     commentText={commentText}
//                     setCommentText={setCommentText}
//                     setShortDescription={setShortDescription}
//                 />
//             </ScrollView>
//         </CardContainer>
//     )
// }

// export default PendingTaskOverView


import React from 'react'
import CardContainer from '../../cards/CardContainer'
import { SmallHeading } from '../../headings/SmallHeading'
import ChevronsAccordian2 from '../../accordians/ChevronsAccordian2'
import PendingTaskAccordianBody from '../PendingTaskAccordianBody'
import Seperator24 from '../../seperators/Seperator24'
import LastActivityAccordianBody from '../LastActivityAccordianBody'
import AccordianCommonHeader from '../../accordians/AccordianCommonHeader'
import { PendingTaskOverViewProps } from '@/src/types'
import { screenHeight } from '@/src/style'
import { ScrollView } from 'react-native'
import { useDispatch, useSelector} from 'react-redux';
import { RootState } from '@/src/store';
import { useState,useEffect } from 'react'

const PendingTaskOverView = ({ pendingTaskDetails,shortDescription, lastActivitycomments,commentText, setCommentText, setShortDescription}: PendingTaskOverViewProps) => {

    //const [taskid, setTaskId] = useState(307)

    const comments = useSelector((state: RootState) => state.comments.commentsList);

    console.log("pendingTaskDetails got",pendingTaskDetails);
    const taskid = pendingTaskDetails.task_id
    

    useEffect(() => {
        // You can access the comments array here
        const filteredComments = comments.filter(comment => comment[0].taskID === taskid);

        if (filteredComments.length != 0) {

            setCommentText(filteredComments[0][0].commentText);

        }
    }, [taskid]);
 
    // const commentText = filteredComments[0][0].commentText; // Extract comment text
    // setCommentText(commentText);
      


    
    return (


        <CardContainer  >
            <ScrollView style={{ height: screenHeight * 0.60 }} showsVerticalScrollIndicator={false}>
                <SmallHeading>Task Details</SmallHeading>
                <ChevronsAccordian2
                    title={'Task Name'}
                    descriptions={pendingTaskDetails.task_name}
                >
                    <PendingTaskAccordianBody
                        pendingTaskDetails={pendingTaskDetails}
                    />
                </ChevronsAccordian2>
                <Seperator24 />
                {/* <SmallHeading>Activity</SmallHeading> */}
                {/* <ChevronsAccordian2
                    title={'Last Activity'}
                    descriptions={`${pendingTaskDetails.lastActivity.updatedBy} added comments`}
                >
                    <LastActivityAccordianBody
                        // pendingTaskDetails={pendingTaskDetails}
                        comments={lastActivitycomments}
                    />
                </ChevronsAccordian2> */}
                <Seperator24 />
                <SmallHeading>Comments</SmallHeading>
                <AccordianCommonHeader
                    title="Last Comment"
                    descriptions= {shortDescription}
                    icons={{ open: 'open-icon-name', close: 'close-icon-name' }}
                    type="comment"
                    taskId={taskid}
                    commentText={commentText}
                    setCommentText={setCommentText}
                    setShortDescription={setShortDescription}
                />
            </ScrollView>
        </CardContainer>
    )
}

export default PendingTaskOverView