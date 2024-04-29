import React from 'react'
import CardContainer from '../../cards/CardContainer'
import { SmallHeading } from '../../headings/SmallHeading'
import ChevronsAccordian2 from '../../accordians/ChevronsAccordian2'
import PendingTaskAccordianBody from '../PendingTaskAccordianBody'
import Seperator24 from '../../seperators/Seperator24'
import LastActivityAccordianBody from '../LastActivityAccordianBody'
import AccordianCommonHeader from '../../accordians/AccordianCommonHeader'
import { PendingTaskOverViewProps } from '@/src/types'

const PendingTaskOverView = ({ pendingTaskDetails, lastActivitycomments, commentText, setCommentText }: PendingTaskOverViewProps) => {
    return (
        <CardContainer >
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
            <AccordianCommonHeader
                title="Your Title 1"
                descriptions="Your Description 1"
                icons={{ open: 'open-icon-name', close: 'close-icon-name' }}
                type="comment"
                taskId={303}
                commentText={commentText}
                setCommentText={setCommentText}
            />
        </CardContainer>
    )
}

export default PendingTaskOverView