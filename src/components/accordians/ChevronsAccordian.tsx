import React, { useState } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
//import AccordianCommonHeader from './AccordianCommonHeader';
import AccordianCommonHeader from '@/src/components/accordians/AccordianCommonHeader';
import { AccordionItemPros } from '@/src/types';



const ChevronsAccordian = ({ children, title, descriptions }: AccordionItemPros): JSX.Element => {
    const [expanded, setExpanded] = useState(false);

    const body = <View style={styles.accordBody}>{children}</View>;


    return (
        <View style={styles.accordContainer}>
            <AccordianCommonHeader
                title={title}
                descriptions={descriptions}
                icons={{
                    open: 'chevron-up',
                    close: 'chevron-down'
                }}
                setExpanded={setExpanded}
                expanded={expanded}
            />

            {/* {expanded && body} */}
            {expanded &&

                <View style={{ marginTop: 80 }}>
                    {
                        body
                    }
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    accordContainer: {
        paddingBottom: 4,
        // backgroundColor: '#A097DC29',
    },
    accordBody: {
        padding: 12
    }
});

export default ChevronsAccordian