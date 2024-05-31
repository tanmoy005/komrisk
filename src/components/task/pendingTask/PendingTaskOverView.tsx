


import { RootState } from '@/src/store'
import { screenHeight } from '@/src/style'
import { PendingTaskOverViewProps } from '@/src/types'
import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import AccordianCommonHeader from '@/src/components/accordians/AccordianCommonHeader'
import CardContainer from '@/src/components/cards/CardContainer'
import { SmallHeading } from '@/src/components/headings/SmallHeading'
import Seperator24 from '@/src/components/seperators/Seperator24'
import PendingTaskAccordianBody from '@/src/components/task/PendingTaskAccordianBody'
import AccordianView from '@/src/components/accordians/AccordianView'

const PendingTaskOverView = ({ pendingTaskDetails,shortDescription, lastActivitycomments,commentText, setCommentText, setShortDescription}: PendingTaskOverViewProps) => {

    //const [taskid, setTaskId] = useState(307)

    const comments = useSelector((state: RootState) => state.comments.commentsList);

    
    const taskid = pendingTaskDetails.task_id
    

    useEffect(() => {
        // You can access the comments array here
        const filteredComments = comments.filter(comment => comment[0].taskID === taskid);

        if (filteredComments.length != 0) {

            setCommentText(filteredComments[0][0].commentText);

        }
    }, [taskid]);
 

      


    
    return (


        <CardContainer  >
            <ScrollView style={{ height: screenHeight * 0.60 }} showsVerticalScrollIndicator={false}>
                <SmallHeading>Task Details</SmallHeading>
                <AccordianView
                    title={'Task Name'}
                    descriptions={pendingTaskDetails.task_name}
                >
                    <PendingTaskAccordianBody
                        pendingTaskDetails={pendingTaskDetails}
                    />
                </AccordianView>
                <Seperator24 />
                <Seperator24 />
                <SmallHeading>Comments</SmallHeading>
                <AccordianCommonHeader
                    title="Last Comment"
                    descriptions= {shortDescription}
                    icons={{ open: 'open-icon-name', close: 'close-icon-name' }}
                    type="comment"
                    taskId={taskid ? parseInt(taskid) : undefined}
                    commentText={commentText}
                    setCommentText={setCommentText}
                    setShortDescription={setShortDescription}
                />
            </ScrollView>
        </CardContainer>
    )
}

export default PendingTaskOverView