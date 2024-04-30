import CardTextContainer from '@/src/components/cards/CardTextContainer';
import { SmallHeading } from '@/src/components/headings/SmallHeading';
import { styles } from '@/src/style';
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Divider } from 'react-native-elements';
import { LastActivityComment } from '../../types';

interface LastActivityAccordianBodyProps {
    comments: LastActivityComment[]
}

export default function LastActivityAccordianBody({ comments }: LastActivityAccordianBodyProps) {
    return (
        <View style={styles.taskCard}>
            {/* <ScrollView> */}
            <CardTextContainer>
                {
                    comments && comments.map(({ comment, updatedOn }, index) => {
                        return (
                            <View key={index}>
                                <SmallHeading>{'Comments'}:</SmallHeading>
                                <Text style={styles.bodyInfoText}>{comment ? comment : 'NA'}</Text>
                                <Divider
                                    color='transparent'
                                    style={{
                                        // height: 10,
                                        marginVertical: 8,
                                        borderWidth: 0,
                                    }} />
                                <SmallHeading>{'Updated On'}:</SmallHeading>
                                <Text style={styles.bodyInfoText}>{updatedOn ? updatedOn : 'NA'}</Text>
                                <Divider
                                    color='#A097DC'
                                    style={{
                                        // height: 10,
                                        marginVertical: 8,
                                        borderWidth: 1,
                                    }} />
                            </View>
                        )
                    })
                }

            </CardTextContainer>
            {/* </ScrollView>    */}
        </View>

    )
}
