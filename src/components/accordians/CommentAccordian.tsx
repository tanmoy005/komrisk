import React, { useState } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import AccordianCommonHeader from './AccordianCommonHeader';
import { AccordionItemPros } from '@/src/types';
import { Text } from 'react-native';


const CommentAccordian = ({ children, descriptions, title, setCommentText }: AccordionItemPros): JSX.Element => {
    const [expanded, setExpanded] = useState(false);

    const body = <View style={styles.accordBody}>{children}</View>;

    return (
        <View style={styles.accordContainer}>
            <AccordianCommonHeader
                title={title}
                descriptions={descriptions}
                setExpanded={setExpanded}
                expanded={expanded}
                type='comment'
                icons={{
                    open: 'arrow-collapse',
                    close: 'arrow-expand'
                }}
                setCommentText={setCommentText}
            />
            {expanded && body}
        </View>
    );
}

const styles = StyleSheet.create({
    accordContainer: {
        // paddingBottom: 4,
        width: '100%',
        padding: 4,
        backgroundColor: '#A097DC29',
        borderRadius: 5,

    },
    accordBody: {
        padding: 12
    }
});

export default CommentAccordian