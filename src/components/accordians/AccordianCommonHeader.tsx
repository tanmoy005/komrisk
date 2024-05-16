
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


    const comments = useSelector((state: RootState) => state.comments.commentsList);

    //console.log("comments",comments);
    

    const dispatch = useDispatch(); // Move inside the component body

    function toggleItem() {
        setExpanded(!expanded);
    }


    // Handle the submission of the comment having update
    const handleSubmitComment = () => {


        
        const existingCommentIndex = comments.findIndex(comment => comment[0].taskID === taskID);


        

        if (existingCommentIndex !== -1) {
            // Update the comment in the Redux store
            dispatch(updateComment({ taskID, commentText }));
        } else {
            // Add a new comment to the Redux store
            dispatch(addComment({ taskID, commentText }));
        }

        

        if(setCommentText!=undefined && setCommentText!=null){

            setCommentText('')
        } // Clear the comment input after submission
    };

    useEffect(() => {
        if (hasValue(commentText)) {
            initialDescription = commentText ?? "";
            setCurrentDescription(initialDescription);
        }
    }, [commentText]);
    





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