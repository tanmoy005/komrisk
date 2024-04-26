
import { AccordianCommonHeaderProps } from '@/src/types';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SmSectionSeperator from '../seperators/SmSectionSeperator';
import InputField from '../input-fields/InputField';
import Button from '../Button';
import { smFont, styles } from '@/src/style';
import setDataToAsyncStorage from '@/src/utils/associate/set-to-localstorage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/store';
import { addComment, updateComment } from '@/src/store/slices/task-comments-slice'; // Assuming your action creators are named addComment and updateComment

const AccordianCommonHeader = ({ title, descriptions, icons, expanded, setExpanded, type = 'chevron', taskId, commentText, setCommentText }: AccordianCommonHeaderProps) => {
    const shortDescription = descriptions.length > 64 ? `${descriptions.slice(0, 64)}...` : descriptions;

    const taskID = taskId;

    // Retrieve the comment for this header from state
    // const [commentText, setCommentText] = useState('');
    const comments = useSelector((state: RootState) => state.comments.commentsList);
    //console.log("Previous comment",comments);

    console.log("comments got", commentText)



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

        setCommentText(''); // Clear the comment input after submission
    };

    // Console log the comments array from the Redux store
    console.log("Submitted Comment", comments);

    // // Handle the submission of the comment
    // const handleSubmitComment = () => {                       
    //     // Add a new comment to the Redux store
    //     dispatch(addComment({ taskID, commentText }));

    //     setCommentText(''); // Clear the comment input after submission
    // };

    // // Console log the comments array from the Redux store
    // console.log("Submitted Comment", comments);

    return (
        <TouchableOpacity style={styles.accodianHeaderContainer} onPress={toggleItem}>
            <View style={styles.titleContainer}>
                <View>
                    <Text style={styles.accordTitle}>{title}</Text>
                    <Text style={styles.shortDescription}>{shortDescription}</Text>
                </View>
                <Icon name={expanded ? icons.open : icons.close} size={smFont} color="#26262C" />
            </View>
            {type === 'comment' && (
                <View>
                    <SmSectionSeperator />
                    <View>
                        <View style={styles.cardTextContainer}>
                            <Text style={styles.bodyInfoText}>Name</Text>
                            <Text style={styles.bodyInfoText}>DD/MM/YY   16:30</Text>
                        </View>
                        <SmSectionSeperator />
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
                </View>
            )}
        </TouchableOpacity>
    );
}

export default AccordianCommonHeader;

