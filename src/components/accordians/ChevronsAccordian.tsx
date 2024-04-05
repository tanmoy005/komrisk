import React, { useState } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import AccordianCommonHeader from './AccordianCommonHeader';
import { AccordionItemPros } from '@/src/types';



const ChevronsAccordian = ({ children, title, descriptions }: AccordionItemPros): JSX.Element => {
    const [expanded, setExpanded] = useState(false);

    const body = <View style={styles.accordBody}>{children}</View>;

    return (
        <View style={styles.accordContainer}>
            <AccordianCommonHeader
                title={title}
                descriptions={descriptions}
                setExpanded={setExpanded}
                expanded={expanded}
                icons={{
                    open: 'chevron-up',
                    close: 'chevron-down'
                }}
            />

            {expanded && body}
        </View>
    );
}

const styles = StyleSheet.create({
    accordContainer: {
        paddingBottom: 4
    },
    accordBody: {
        padding: 12
    }
});

export default ChevronsAccordian