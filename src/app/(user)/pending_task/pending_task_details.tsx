import React from 'react';
import { View } from 'react-native';
import AccordianCommonHeader from '../../../components/accordians/AccordianCommonHeader';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store'; // Assuming RootState is your root state type
import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

const Pending_Task_Details = () => {
    const [commentText, setCommentText] = useState("");
    const [taskid, setTaskId] = useState(303)


    const comments = useSelector((state: RootState) => state.comments.commentsList);


    useEffect(() => {
        // You can access the comments array here
        const filteredComments = comments.filter(comment => comment[0].taskID === taskid);
        if (filteredComments.length != 0) {
            setCommentText(filteredComments[0][0].commentText);
        }
    }, [taskid]);


    return (
        <>
            <Stack.Screen options={{ title: 'Pending Task Details' }} />
            <View style={styles.container}>
                <AccordianCommonHeader
                    title="Your Title 1"
                    descriptions="Your Description 1"
                    icons={{ open: 'open-icon-name', close: 'close-icon-name' }}
                   // expanded={true}
                    //setExpanded={() => { }}
                    type="comment"
                    taskId={303}
                    commentText={commentText}
                    setCommentText={setCommentText}
                />
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});

export default Pending_Task_Details;
