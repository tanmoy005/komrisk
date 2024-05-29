import CardTextContainer from '@/src/components/cards/CardTextContainer';
import { SmallHeading } from '@/src/components/headings/SmallHeading';
import { styles } from '@/src/style';
import React from 'react';
import { Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { PendingTaskItemDetailsResponse } from '@/src/types';

type Props = {
    pendingTaskDetails: PendingTaskItemDetailsResponse;
};

export default function     PendingTaskAccordianBody({ pendingTaskDetails }: Props) {
    return (
        <View style={styles.taskCard}>
            <CardTextContainer>
                <View>
                    <SmallHeading>{'Title'}</SmallHeading>
                    <Text style={styles.bodyInfoText}>{pendingTaskDetails?.task_name ?? "NA"}</Text>
                    <Divider
                        color='#A097DC'
                        style={{
                            // height: 10,
                            marginVertical: 8,
                            borderWidth: 1,
                        }} />
                    <SmallHeading>{'Complliance Id'}:</SmallHeading>
                    <Text style={styles.bodyInfoText}>{pendingTaskDetails?.compliance_id ?? 'NA'}</Text>
                    <Divider
                        color='transparent'
                        style={{
                            // height: 10,
                            marginVertical: 8,
                            borderWidth: 0,
                        }} />
                    <SmallHeading>{'Task Description'}:</SmallHeading>
                    <Text style={styles.bodyInfoText}>{pendingTaskDetails?.task_desc?? 'NA'}</Text>
                    <Divider
                        color='transparent'
                        style={{
                            // height: 10,
                            marginVertical: 8,
                            borderWidth: 0,
                        }} />
                    <SmallHeading>{'Law Name'}:</SmallHeading>
                    <Text style={styles.bodyInfoText}>{pendingTaskDetails?.name_of_law ?? 'NA'}</Text>
                </View>
            </CardTextContainer>
        </View>

    )
}
