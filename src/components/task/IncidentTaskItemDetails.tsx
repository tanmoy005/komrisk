import CardTextContainer from '@/src/components/cards/CardTextContainer';
import { SmallHeading } from '@/src/components/headings/SmallHeading';
import { styles } from '@/src/style';
import { IncidentItemDetailsResponse } from '@/src/types';
import React from 'react';
import { Text, View } from 'react-native';
import { Divider } from 'react-native-elements';

type Props = {
    incidentItemData: IncidentItemDetailsResponse;
    itemType: string
};

export default function IncidentTaskItemDetails({ incidentItemData, itemType }: Props) {
    return (
        <CardTextContainer>
            <View>
                <SmallHeading>{'Title'}</SmallHeading>
                <Text style={styles.bodyInfoText}>{incidentItemData?.name ?? "NA"}</Text>
                <Divider
                    color='#A097DC'
                    style={{
                        // height: 10,
                        marginVertical: 8,
                        borderWidth: 1,
                    }} />
                <SmallHeading>{'Task Name'}:</SmallHeading>
                <Text style={styles.bodyInfoText}>{incidentItemData?.taskName ?? 'NA'}</Text>
                <Divider
                    color='transparent'
                    style={{
                        // height: 10,
                        marginVertical: 8,
                        borderWidth: 0,
                    }} />
                <SmallHeading>{'Task Type'}:</SmallHeading>
                <Text style={styles.bodyInfoText}>{incidentItemData?.taskType ?? 'NA'}</Text>
                <Divider
                    color='transparent'
                    style={{
                        // height: 10,
                        marginVertical: 8,
                        borderWidth: 0,
                    }} />
                <SmallHeading>{'Task Description'}:</SmallHeading>
                <Text style={styles.bodyInfoText}>{incidentItemData?.mapDesc ?? 'NA'}</Text>
                <Divider
                    color='transparent'
                    style={{
                        // height: 10,
                        marginVertical: 8,
                        borderWidth: 0,
                    }} />
                <SmallHeading>{'Owner Name'}:</SmallHeading>
                <Text style={styles.bodyInfoText}>{incidentItemData?.ownerName ?? 'NA'}</Text>
                <Divider
                    color='transparent'
                    style={{
                        // height: 10,
                        marginVertical: 8,
                        borderWidth: 0,
                    }} />
                <SmallHeading>{'Approver Name'}:</SmallHeading>
                <Text style={styles.bodyInfoText}>{incidentItemData?.approverName ?? 'NA'}</Text>
                <Divider
                    color='transparent'
                    style={{
                        // height: 10,
                        marginVertical: 8,
                        borderWidth: 0,
                    }} />
                <SmallHeading>{'Status'}:</SmallHeading>
                <Text style={styles.bodyInfoText}>{incidentItemData?.taskStatus ?? 'NA'}</Text>
                <Divider
                    color='transparent'
                    style={{
                        marginVertical: 8,
                        borderWidth: 0,
                    }} />
                {/* <SmallHeading>{'Penalty'}:</SmallHeading>
                <Text style={styles.bodyInfoText}>{incidentItemData?.approverName ?? 'NA'}</Text>
                <Divider
                    color='transparent'
                    style={{
                        marginVertical: 8,
                        borderWidth: 0,
                    }} />
                <SmallHeading>{'Law Category'}:</SmallHeading>
                <Text style={styles.bodyInfoText}>{incidentItemData?.approverName ?? 'NA'}</Text>
                <Divider
                    color='transparent'
                    style={{
                        // height: 10,
                        marginVertical: 8,
                        borderWidth: 0,
                    }} /> */}
            </View>
        </CardTextContainer>

    )
}
