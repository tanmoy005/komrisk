
// import { AccordianCommonHeaderProps } from '@/src/types';
// import React, { useState } from 'react';
// import {
//     Text,
//     View,
//     TouchableOpacity
// } from 'react-native';
// import InputField from '../input-fields/InputField';
// import Button from '../Button';
// import { styles } from '@/src/style';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '@/src/store';
// import { addComment, updateComment } from '@/src/store/slices/task-comments-slice'; // Assuming your action creators are named addComment and updateComment
// import MuiIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// const AccordianCommonHeader = ({ title, descriptions, icons, type = 'chevron', taskId, commentText, setCommentText }: AccordianCommonHeaderProps) => {
//     const shortDescription = descriptions && descriptions.length > 64 ? `${descriptions.slice(0, 64)}...` : descriptions;
//     const [expanded, setExpanded] = useState(false)
//     const taskID = taskId;

//     // Retrieve the comment for this header from state

//     const comments = useSelector((state: RootState) => state.comments.commentsList);

//     const dispatch = useDispatch(); // Move inside the component body

//     function toggleItem() {
//         setExpanded(!expanded);
//     }

//     // Handle the submission of the comment having update
//     const handleSubmitComment = () => {

//         const existingCommentIndex = comments.findIndex(comment => comment[0].taskID === taskID);

//         if (existingCommentIndex !== -1) {
//             // Update the comment in the Redux store
//             dispatch(updateComment({ taskID, commentText }));
//         } else {
//             // Add a new comment to the Redux store
//             dispatch(addComment({ taskID, commentText }));
//         }

//         setCommentText(''); // Clear the comment input after submission
//     };

//     return (
//         <TouchableOpacity onPress={toggleItem}>
//             <View style={styles.commentContainer}>
//                 <View style={styles.expandSectionHeaderContainer}>
//                     <View style={styles.expandSectionHeader}>
//                         <View>
//                             <Text style={styles.accordTitle}>{title}</Text>
//                             <Text style={styles.shortDescription}>{shortDescription}</Text>
//                         </View>
//                         <MuiIcon name={expanded ? 'arrow-expand' : 'arrow-collapse'} size={24} color="#26262C" />
//                     </View>
//                     <View>
//                         <Text style={styles.bodyInfoText}>Name</Text>
//                         <Text style={styles.bodyInfoText}>DD/MM/YY   16:30</Text>
//                     </View>
//                 </View>

//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//                     <View style={styles.commentInputContainer}>
//                         <InputField
//                             value={commentText ?? ""}
//                             setInput={setCommentText}
//                             placeholder='Write here...'
//                             type='2'
//                             editable={true}

//                         />
//                     </View>
//                     <View>
//                         <Button
//                             btnColor={'#A097DC'}
//                             type='btnIcon'
//                             icon='chevron-right'
//                             style={{
//                                 width: 40,
//                                 height: 40,
//                                 fontWeight: '400',
//                                 fontSize: 20,
//                                 borderRadius: 5
//                             }}
//                             onPress={handleSubmitComment}
//                         />
//                     </View>
//                 </View>
//             </View>


//         </TouchableOpacity>
//     );
// }

// export default AccordianCommonHeader;

import { AccordianCommonHeaderProps } from '@/src/types';
import React, { useState,useEffect} from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import InputField from '../input-fields/InputField';
import Button from '../Button';
import { styles } from '@/src/style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import { addComment, updateComment } from '@/src/store/slices/task-comments-slice'; // Assuming your action creators are named addComment and updateComment
import MuiIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { hasValue } from '@/src/utils';

const AccordianCommonHeader = ({ title, shortDescription,descriptions, icons, type = 'chevron', taskId, commentText, setCommentText,setShortDescription }: AccordianCommonHeaderProps) => {
    //const shortDescription = descriptions && descriptions.length > 64 ? `${descriptions.slice(0, 64)}...` : descriptions;
    const [expanded, setExpanded] = useState(false)
    const taskID = taskId;
    //console.log("taskID",taskID);
    
    const [currentDescription, setCurrentDescription] = useState<string>(commentText??"");
    
    let initialDescription="Your Description";

    //console.log("commentText",commentText);
    
    

    //console.log("initialDescription",initialDescription);

 
    //console.log("currentDescription",currentDescription);

    // Retrieve the comment for this header from state

    const comments = useSelector((state: RootState) => state.comments.commentsList);

    console.log("comments",comments);
    

    const dispatch = useDispatch(); // Move inside the component body

    function toggleItem() {
        setExpanded(!expanded);
    }

    // useEffect(() => {
    //     setShortDescription(descriptions && descriptions.length > 64 ? `${descriptions.slice(0, 64)}...` : descriptions);
    // }, [descriptions]);

    // Handle the submission of the comment having update
    const handleSubmitComment = () => {

        // const taskid = comments.findIndex(comment => comment[0].taskID === taskID)
        // console.log("taskid",taskid);
        
        const existingCommentIndex = comments.findIndex(comment => comment[0].taskID === taskID);

        //console.log("existingCommentIndex",existingCommentIndex);
        

        if (existingCommentIndex !== -1) {
            // Update the comment in the Redux store
            dispatch(updateComment({ taskID, commentText }));
        } else {
            // Add a new comment to the Redux store
            dispatch(addComment({ taskID, commentText }));
        }

        
        //setCurrentDescription(commentText ??"");
        setCommentText('' ); // Clear the comment input after submission
    };

    useEffect(() => {
        if (hasValue(commentText)) {
            initialDescription = commentText ?? "";
            setCurrentDescription(initialDescription);
        }
    }, [commentText]);
    

   


    // Truncate the currentDescription to 64 characters with an ellipsis if it exceeds that length
   
    
    //console.log("final description",currentDescription);

    // // Update the currentDescription when descriptions change
    // useEffect(() => {
    //     initialDescription  = hasValue(commentText) ?commentText??"":initialDescription;
    //     console.log("initialDescription2",initialDescription);
    //     //shortDescription = initialDescription && initialDescription.length > 70? `${initialDescription.slice(0, 70)}...`: initialDescription;
    //     // setShortDescription("shortDescription");
    //     setCurrentDescription(initialDescription??"");
    //     // shortDescription = initialDescription && initialDescription.length > 64? `${initialDescription.slice(0, 64)}...`: initialDescription;
    //     // console.log("shortDescription",shortDescription);
    // }, [currentDescription]);







    return (
        <TouchableOpacity onPress={toggleItem}>
            <View style={styles.commentContainer}>
                <View style={styles.expandSectionHeaderContainer}>
                    <View style={styles.expandSectionHeader}>
                        <View>
                            <Text style={styles.accordTitle}>{title}</Text>
                            <Text style={styles.shortDescription}>{currentDescription}</Text>
                        </View>
                        <MuiIcon name={expanded ? 'arrow-expand' : 'arrow-collapse'} size={24} color="#26262C" />
                    </View>
                    {/* <View>
                        <Text style={styles.bodyInfoText}>Name</Text>
                        <Text style={styles.bodyInfoText}>DD/MM/YY   16:30</Text>
                    </View> */}
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={styles.commentInputContainer}>
                        <InputField
                            value={commentText ?? ""}
                            setInput={setCommentText}
                            placeholder='Write here...'
                            type='2'
                            editable={true}

                        />
                    </View>
                    <View>
                        <Button
                            btnColor={'#A097DC'}
                            type='btnIcon'
                            icon='chevron-right'
                            style={{
                                width: 40,
                                height: 40,
                                fontWeight: '400',
                                fontSize: 20,
                                borderRadius: 5
                            }}
                            onPress={handleSubmitComment}
                        />
                    </View>
                </View>
            </View>


        </TouchableOpacity>
    );
}

export default AccordianCommonHeader;