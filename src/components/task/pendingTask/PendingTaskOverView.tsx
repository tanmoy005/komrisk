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

const PendingTaskOverView = ({ pendingTaskDetails, lastActivitycomments,commentText, setCommentText }: PendingTaskOverViewProps) => {

    const [taskid, setTaskId] = useState(304)

    const comments = useSelector((state: RootState) => state.comments.commentsList);

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
                    descriptions={pendingTaskDetails.title}
                >
                    <PendingTaskAccordianBody
                        pendingTaskDetails={pendingTaskDetails}
                    />
                </ChevronsAccordian2>
                <Seperator24 />
                <SmallHeading>Activity</SmallHeading>
                <ChevronsAccordian2
                    title={'Last Activity'}
                    descriptions={`${pendingTaskDetails.lastActivity.updatedBy} added comments`}
                >
                    <LastActivityAccordianBody
                        // pendingTaskDetails={pendingTaskDetails}
                        comments={lastActivitycomments}
                    />
                </ChevronsAccordian2>
                <Seperator24 />
                <SmallHeading>Comments</SmallHeading>
                <AccordianCommonHeader
                    title="Last Comment"
                    descriptions="Your Description 1"
                    icons={{ open: 'open-icon-name', close: 'close-icon-name' }}
                    type="comment"
                    taskId={304}
                    commentText={commentText}
                    setCommentText={setCommentText}
                />
            </ScrollView>
        </CardContainer>
    )
}

export default PendingTaskOverView